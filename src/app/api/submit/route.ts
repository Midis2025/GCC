import { NextResponse } from "next/server";

import {
  GENERAL_CONTENT_ONLY,
  investorCategories,
  investorConsent,
  investorSectors,
} from "@/data/for-investors";
import { deliverToCrm, isCrmConfigured, type CrmResult, type CrmSubmission } from "@/lib/crm";
import {
  adminRecipient,
  buildAdminMail,
  buildConfirmationMail,
  isMailConfigured,
  sendMail,
} from "@/lib/notify";

/**
 * ============================================================================
 * FORM SUBMISSION ENDPOINT
 * ============================================================================
 * The single server entry point for both forms.
 *
 * Frontend form -> this route -> CRM -> email. Nothing on the client talks to
 * a CRM or a mail provider directly, and no credential is ever prefixed
 * `NEXT_PUBLIC_`, so nothing reaches the browser bundle.
 *
 * ----------------------------------------------------------------------------
 * WHAT THIS ROUTE WILL NOT DO
 * ----------------------------------------------------------------------------
 * It will not report success for a record it did not store.
 *
 * While the CRM is unconfigured, every response says so through `stored:
 * false`, and the form renders a state that tells the visitor plainly rather
 * than thanking them for a registration that went nowhere. For a business
 * whose asset IS the list, a form that silently discards submissions is worse
 * than a form that is visibly switched off.
 *
 * Validation runs here regardless of configuration, because client-side
 * validation is a convenience and never a control.
 */

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_FIELD = 2000;

type Payload = Record<string, unknown>;

function str(payload: Payload, key: string): string {
  const value = payload[key];
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD) : "";
}

function strArray(payload: Payload, key: string): string[] {
  const value = payload[key];
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string").slice(0, 20);
}

interface Validation {
  ok: boolean;
  errors: Record<string, string>;
}

function validate(type: string, payload: Payload): Validation {
  const errors: Record<string, string> = {};

  if (!str(payload, "name")) errors.name = "Please enter your full name.";

  const email = str(payload, "email");
  if (!email) errors.email = "Please enter your work email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";

  /*
   * Consent is validated server-side and not merely required in the markup.
   * A submission without it is rejected outright rather than stored with a
   * false flag - an unconsented record is not a record this business can use.
   */
  if (payload.consent !== true) {
    errors.consent = "Please confirm you agree to be contacted.";
  }

  if (type === "investor-registration") {
    if (!str(payload, "firm")) errors.firm = "Please enter your firm.";
    if (!str(payload, "role")) errors.role = "Please enter your role.";
    if (!str(payload, "country")) errors.country = "Please enter your country.";

    /*
     * The category is a compliance control. Required, and validated against
     * the fixed list so a crafted payload cannot introduce a value that no
     * downstream rule knows how to treat.
     */
    const category = str(payload, "investorCategory");
    if (!category) {
      errors.investorCategory = "Please select an investor category.";
    } else if (!investorCategories.some((option) => option.value === category)) {
      errors.investorCategory = "Please select an investor category.";
    }
  }

  if (type === "company-enquiry") {
    if (!str(payload, "companyName")) errors.companyName = "Please enter your company name.";
    const message = str(payload, "message");
    if (!message) errors.message = "Please tell us briefly what you are looking for.";
    else if (message.length < 20) errors.message = "Please add a little more detail.";
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

export async function POST(request: Request) {
  let payload: Payload;

  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const type = str(payload, "type");
  if (type !== "company-enquiry" && type !== "investor-registration") {
    return NextResponse.json({ ok: false, error: "Unknown form type." }, { status: 400 });
  }

  const { ok, errors } = validate(type, payload);
  if (!ok) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const now = new Date().toISOString();
  const category = str(payload, "investorCategory");

  const submission: CrmSubmission = {
    type,
    source: str(payload, "source") || "/",
    submittedAt: now,

    name: str(payload, "name"),
    email: str(payload, "email"),
    country: str(payload, "country") || undefined,
    role: str(payload, "role") || undefined,
    phone: str(payload, "phone") || undefined,

    companyName: str(payload, "companyName") || undefined,
    listingVenue: str(payload, "listingVenue") || undefined,
    ticker: str(payload, "ticker") || undefined,
    sector: str(payload, "sector") || undefined,
    message: str(payload, "message") || undefined,

    firm: str(payload, "firm") || undefined,
    investorCategory: category || undefined,
    sectorsOfInterest: strArray(payload, "sectorsOfInterest").filter((s) =>
      (investorSectors as readonly string[]).includes(s),
    ),
    generalContentOnly: type === "investor-registration" && category === GENERAL_CONTENT_ONLY,

    consentGiven: true,
    consentAt: now,
    consentWording: investorConsent.label,

    /*
     * Investor registrations enter the list PENDING and are only confirmed
     * when the link in the confirmation email is followed. A company enquiry
     * is correspondence, not a marketing list, so double opt-in does not
     * apply to it.
     */
    optInStatus: type === "investor-registration" ? "pending" : "not-applicable",
  };

  /* --- CRM ---------------------------------------------------------------- */
  let crm: CrmResult = { stored: false, reason: "CRM not configured." };

  if (isCrmConfigured()) {
    try {
      crm = await deliverToCrm(submission);
    } catch (error) {
      crm = {
        stored: false,
        reason: error instanceof Error ? error.message : "CRM write failed.",
      };
    }
  }

  /* --- Email -------------------------------------------------------------- */
  const mailErrors: string[] = [];

  if (isMailConfigured()) {
    try {
      await sendMail(buildConfirmationMail(submission));
    } catch (error) {
      mailErrors.push(error instanceof Error ? error.message : "Confirmation email failed.");
    }

    const admin = adminRecipient();
    if (admin) {
      try {
        await sendMail(buildAdminMail(submission, crm, admin));
      } catch (error) {
        mailErrors.push(error instanceof Error ? error.message : "Admin email failed.");
      }
    }
  }

  /*
   * Server-side record of last resort.
   *
   * If neither the CRM nor mail is configured, this line is the only trace the
   * submission ever existed. It is not a substitute for either - it exists so
   * a submission made during the pre-launch period is at least visible in the
   * deployment logs rather than silently dropped.
   */
  if (!crm.stored) {
    console.warn("[submit] record not persisted to CRM", {
      type: submission.type,
      email: submission.email,
      submittedAt: submission.submittedAt,
      reason: crm.reason,
      mailErrors,
    });
  }

  return NextResponse.json({
    ok: true,
    stored: crm.stored,
    /*
     * Reported so the form can be honest. `pending` means the visitor still
     * has to confirm from their inbox; the UI says so rather than declaring
     * them registered.
     */
    optInStatus: submission.optInStatus,
    mailSent: isMailConfigured() && mailErrors.length === 0,
  });
}
