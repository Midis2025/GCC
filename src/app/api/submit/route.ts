import { NextResponse } from "next/server";

import { areaOfInterestOptions, preferredTimeOptions } from "@/data/contact";
import {
  GENERAL_CONTENT_ONLY,
  investorCategories,
  investorConsent,
  investorSectors,
} from "@/data/for-investors";
import {
  CRM_FORM_TYPE,
  deliverToCrm,
  isCrmConfigured,
  type CrmResult,
  type CrmSubmission,
} from "@/lib/crm";
import { confirmationUrl } from "@/lib/optin";
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
/** `YYYY-MM-DD`, the value an `<input type="date">` produces. */
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

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

/**
 * Preferred meeting date and time, checked identically for both forms.
 *
 * Two deliberate limits on what this can enforce.
 *
 * The date is checked for shape and for being a real day, and NOT for being in
 * the future. The browser and this process are routinely in different
 * timezones and occasionally on different dates, so a strict server-side "not
 * in the past" would reject days a Gulf visitor can see are still ahead of
 * them. Today belongs to the field, where the visitor's own clock is the one
 * being read; here it could only ever be enforced against the wrong clock.
 *
 * `required` differs by caller because the FIELD differs by caller: the
 * company enquiry always shows the pair, the investor form shows it on the
 * Contact page and not on For Investors. A registration arriving without it is
 * therefore legitimate, and `source` is client-supplied so it cannot be used
 * to tell the two apart. So presence is enforced where the field lives, and
 * this enforces what it can be certain of - that anything it stores is a value
 * the form could actually have produced.
 */
function checkMeetingPreference(
  payload: Payload,
  errors: Record<string, string>,
  required: boolean,
): void {
  const preferredDate = str(payload, "preferredDate");
  if (!preferredDate) {
    if (required) errors.preferredDate = "Please choose a preferred date.";
  } else if (!ISO_DATE_PATTERN.test(preferredDate) || Number.isNaN(Date.parse(preferredDate))) {
    errors.preferredDate = "Please choose a preferred date.";
  }

  /*
   * Checked against the fixed list, the same way the investor category is: a
   * value the form never offered has no meaning to whoever reads the record,
   * so it is rejected rather than stored.
   */
  const preferredTime = str(payload, "preferredTime");
  if (!preferredTime) {
    if (required) errors.preferredTime = "Please choose a preferred time.";
  } else if (!preferredTimeOptions.some((option) => option.value === preferredTime)) {
    errors.preferredTime = "Please choose a preferred time.";
  }
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

    // Present from the Contact page, absent from For Investors - so checked
    // whenever it is there, and never demanded.
    checkMeetingPreference(payload, errors, false);
  }

  if (type === "company-enquiry") {
    if (!str(payload, "companyName")) errors.companyName = "Please enter your company name.";

    /*
     * Sector is required on this form, and enforced here as well as in the
     * browser. It is the field that decides whether an enquiry is answerable,
     * and it is free text by design - see the note in `CompanyForm`.
     */
    if (!str(payload, "sector")) errors.sector = "Please tell us which sector you operate in.";

    /*
     * Area of interest is optional, and checked against the fixed list when it
     * is present. The same reasoning as the investor category and the
     * preferred time: a value the form never offered is a value nobody
     * downstream can route on, so it is rejected rather than stored.
     */
    const areaOfInterest = str(payload, "areaOfInterest");
    if (areaOfInterest && !areaOfInterestOptions.some((o) => o.value === areaOfInterest)) {
      errors.areaOfInterest = "Please choose an area of interest.";
    }

    const message = str(payload, "message");
    if (!message) errors.message = "Please tell us briefly what you are looking for.";
    else if (message.length < 20) errors.message = "Please add a little more detail.";

    /*
     * The company enquiry always carries the meeting preference, so here it is
     * required as well as checked.
     */
    checkMeetingPreference(payload, errors, true);
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

function toMarketCode(countryStr: string): string {
  if (!countryStr) return "intl";
  const lower = countryStr.toLowerCase().trim();
  if (lower.includes("uae") || lower.includes("emirates") || lower === "ae") return "ae";
  if (lower.includes("saudi") || lower === "sa") return "sa";
  if (lower.includes("qatar") || lower === "qa") return "qa";
  if (lower.includes("kuwait") || lower === "kw") return "kw";
  if (lower.includes("bahrain") || lower === "bh") return "bh";
  if (lower.includes("oman") || lower === "om") return "om";
  return "intl";
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
    formType: CRM_FORM_TYPE[type],
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
    areaOfInterest: str(payload, "areaOfInterest") || undefined,
    preferredDate: str(payload, "preferredDate") || undefined,
    preferredTime: str(payload, "preferredTime") || undefined,
    message: str(payload, "message") || undefined,

    firm: str(payload, "firm") || undefined,
    investorCategory: category || undefined,
    sectorsOfInterest: strArray(payload, "sectorsOfInterest").filter((s) =>
      (investorSectors as readonly string[]).includes(s),
    ),
    generalContentOnly: type === "investor-registration" && category === GENERAL_CONTENT_ONLY,
    /*
     * The same rule, stored the way an email platform reads it.
     *
     *   "Other"       -> general content only, NOT eligible for briefings
     *   anything else -> eligible
     *
     * Undefined on a company enquiry: that is correspondence, not an audience,
     * and a false here would read as an issuer who was excluded rather than as
     * one who was never a candidate. See `briefingEligible` in `lib/crm.ts`.
     */
    briefingEligible:
      type === "investor-registration" ? category !== GENERAL_CONTENT_ONLY : undefined,

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

  /* --- Backend Connection ------------------------------------------------ */
  let crm: CrmResult = { stored: false, reason: "Backend not reachable." };
  const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "https://gcc-backend-two.vercel.app";

  try {
    const isCompany = type === "company-enquiry";
    const endpoint = isCompany ? `${backendUrl}/api/contact/company` : `${backendUrl}/api/contact/investor`;
    const marketCode = toMarketCode(str(payload, "country"));
    
    const backendBody = isCompany
      ? {
          name: str(payload, "name"),
          company: str(payload, "companyName") || str(payload, "company"),
          email: str(payload, "email"),
          phone: str(payload, "phone") || undefined,
          market: marketCode,
          /*
           * The backend's `area` is the enquiry's area of interest, so it now
           * takes the value of the field that actually asks for one. Before
           * that field existed this carried the free-text sector, which is why
           * the sector remains the fallback - an enquiry submitted without an
           * area still reaches the backend exactly as it did before.
           *
           * `sector` is sent alongside it so the sector is not lost now that
           * `area` no longer doubles as it. It is a field the backend did not
           * previously receive; if it is not stored there, the sector is still
           * carried on the CRM record above.
           */
          area: str(payload, "areaOfInterest") || str(payload, "sector") || "general",
          sector: str(payload, "sector") || undefined,
          message: str(payload, "message"),
          preferredDate: str(payload, "preferredDate") || undefined,
          preferredTime: str(payload, "preferredTime") || undefined,
          formType: "company",
        }
      : {
          name: str(payload, "name"),
          company: str(payload, "firm") || str(payload, "company"),
          email: str(payload, "email"),
          phone: str(payload, "phone") || undefined,
          market: marketCode,
          area: str(payload, "investorCategory") || "investor-relations",
          message: `Investor Registration from ${str(payload, "firm")} (${str(payload, "role")}). Category: ${str(payload, "investorCategory")}. Sectors: ${strArray(payload, "sectorsOfInterest").join(", ") || "General"}.`,
          preferredDate: str(payload, "preferredDate") || undefined,
          preferredTime: str(payload, "preferredTime") || undefined,
          formType: "investor",
        };

    const backendRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendBody),
    });

    if (backendRes.ok) {
      const backendData = await backendRes.json();
      crm = {
        stored: true,
        recordId: backendData?.data?.trackingId || backendData?.data?.enquiry?.id,
      };
    } else {
      const errorText = await backendRes.text();
      crm = { stored: false, reason: `Backend returned status ${backendRes.status}: ${errorText}` };
    }
  } catch (backendErr) {
    if (isCrmConfigured()) {
      try {
        crm = await deliverToCrm(submission);
      } catch (error) {
        crm = {
          stored: false,
          reason: error instanceof Error ? error.message : "CRM write failed.",
        };
      }
    } else {
      crm = {
        stored: false,
        reason: backendErr instanceof Error ? backendErr.message : "Failed to connect to backend service.",
      };
    }
  }

  /* --- Email -------------------------------------------------------------- */
  const mailErrors: string[] = [];

  if (isMailConfigured()) {
    try {
      /*
       * The double opt-in link.
       *
       * Signed with `OPTIN_SECRET` and undefined when that is not set, in
       * which case `buildConfirmationMail` falls back to its `[confirmation
       * link]` placeholder rather than inventing an unsigned URL that the
       * /confirm route would then have to honour. See `lib/optin.ts`.
       */
      await sendMail(
        buildConfirmationMail(
          submission,
          submission.type === "investor-registration"
            ? confirmationUrl(submission.email)
            : undefined,
        ),
      );
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
