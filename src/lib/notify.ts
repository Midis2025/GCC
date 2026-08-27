import type { CrmResult, CrmSubmission } from "@/lib/crm";
import { siteConfig } from "@/data/site";

/**
 * ============================================================================
 * TRANSACTIONAL EMAIL
 * ============================================================================
 * Two messages follow a submission, and they do different jobs:
 *
 *   1. To the person - acknowledging receipt, and for investor registrations
 *      carrying the double opt-in link. It confirms that a FORM was received.
 *      It never says a meeting, a briefing place or an opportunity is
 *      confirmed, because at this point none is.
 *
 *   2. To the admin address - a structured notification. It SUPPLEMENTS the
 *      CRM record and does not replace it. If this ever becomes the only place
 *      a registration exists, the architecture has failed.
 *
 * Like the CRM adapter, no provider is wired up: sending domain, SPF, DKIM and
 * DMARC are all outstanding, and the brief requires outbound mail to leave from
 * a subdomain of the company's own domain before any campaign runs. So this is
 * the shape and the copy, with one function left to implement.
 */

export interface MailMessage {
  to: string;
  subject: string;
  /** Plain text. Deliberately not HTML - these are transactional, not design. */
  body: string;
}

export function isMailConfigured(): boolean {
  return Boolean(process.env.MAIL_PROVIDER && process.env.MAIL_API_KEY && process.env.MAIL_FROM);
}

/** Where admin notifications go. Server-only; never rendered to a page. */
export function adminRecipient(): string | undefined {
  return process.env.MAIL_ADMIN_TO || undefined;
}

/**
 * Sends a message.
 *
 * IMPLEMENTATION NOTE: read `MAIL_PROVIDER`, `MAIL_API_KEY` and `MAIL_FROM`,
 * and send. Every marketing message must carry a one-click unsubscribe header
 * (`List-Unsubscribe` and `List-Unsubscribe-Post`) as well as a visible link;
 * unsubscribes are honoured within 24 hours and suppressed permanently.
 * Transactional confirmations like the double opt-in mail are not marketing
 * and do not carry one.
 */
export async function sendMail(message: MailMessage): Promise<void> {
  if (!isMailConfigured()) {
    throw new Error("Mail is not configured. Set MAIL_PROVIDER, MAIL_API_KEY and MAIL_FROM.");
  }

  void message;
  throw new Error(
    `MAIL_PROVIDER="${process.env.MAIL_PROVIDER}" is configured but sendMail() has no implementation for it. See src/lib/notify.ts.`,
  );
}

/**
 * The acknowledgement sent to the person who submitted.
 *
 * COMPLIANCE: read the copy before changing it. It confirms receipt of a form
 * and nothing else. It does not confirm a place at a briefing, does not
 * promise a reply within any period, and contains no statement about
 * investments, opportunities or outcomes.
 */
export function buildConfirmationMail(
  submission: CrmSubmission,
  confirmUrl?: string,
): MailMessage {
  const isInvestor = submission.type === "investor-registration";

  const body = isInvestor
    ? [
        `Dear ${submission.name},`,
        "",
        `Thank you for registering with ${siteConfig.name}.`,
        "",
        "One step remains. Please confirm your email address using the link below, and we will add you to the list:",
        "",
        confirmUrl ?? "[confirmation link]",
        "",
        "Registration gives you invitations to briefings for which your sector interests are relevant, The Gulf Brief, quarterly Sector Notes and access to the interview library.",
        "",
        "You can unsubscribe from any message we send. We do not sell or share your details, and we do not send investment recommendations.",
        "",
        `${siteConfig.legalName}`,
        siteConfig.url,
      ].join("\n")
    : [
        `Dear ${submission.name},`,
        "",
        `Thank you for your enquiry. We have received it and a member of the team will read it.`,
        "",
        "For reference, the details you submitted:",
        "",
        submission.companyName ? `Company: ${submission.companyName}` : "",
        submission.listingVenue ? `Listing venue: ${submission.listingVenue}` : "",
        submission.ticker ? `Ticker: ${submission.ticker}` : "",
        submission.sector ? `Sector: ${submission.sector}` : "",
        submission.preferredDate ? `Preferred date: ${submission.preferredDate}` : "",
        submission.preferredTime
          ? `Preferred time: ${submission.preferredTime} (Gulf Standard Time)`
          : "",
        "",
        `${siteConfig.legalName}`,
        siteConfig.url,
      ]
        .filter((line) => line !== "")
        .join("\n");

  return {
    to: submission.email,
    subject: isInvestor
      ? `Confirm your registration - ${siteConfig.name}`
      : `We have received your enquiry - ${siteConfig.name}`,
    body,
  };
}

/**
 * The structured notification to the admin address.
 *
 * Includes the CRM outcome deliberately. If the CRM write failed, whoever
 * reads this needs to know that this email is currently the only copy of the
 * record - and needs to act on it.
 */
export function buildAdminMail(
  submission: CrmSubmission,
  crm: CrmResult,
  to: string,
): MailMessage {
  const lines: string[] = [
    `Form: ${submission.type}`,
    `Source: ${submission.source}`,
    `Submitted: ${submission.submittedAt}`,
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
  ];

  const optional: Array<[string, string | undefined]> = [
    ["Role", submission.role],
    ["Firm", submission.firm],
    ["Company", submission.companyName],
    ["Listing venue", submission.listingVenue],
    ["Ticker", submission.ticker],
    ["Sector", submission.sector],
    // A preference the enquirer stated, not a slot anything has reserved.
    ["Preferred date", submission.preferredDate],
    [
      "Preferred time",
      submission.preferredTime && `${submission.preferredTime} (Gulf Standard Time)`,
    ],
    ["Country", submission.country],
    ["Phone", submission.phone],
    ["Investor category", submission.investorCategory],
  ];

  for (const [label, value] of optional) {
    if (value) lines.push(`${label}: ${value}`);
  }

  if (submission.sectorsOfInterest?.length) {
    lines.push(`Sectors of interest: ${submission.sectorsOfInterest.join(", ")}`);
  }

  if (submission.generalContentOnly) {
    lines.push("");
    lines.push(
      "REVIEW REQUIRED: category is 'Other'. General content only - no briefing invitations until this record is reviewed.",
    );
  }

  if (submission.message) {
    lines.push("", "Message:", submission.message);
  }

  lines.push(
    "",
    `Consent: ${submission.consentGiven ? "given" : "NOT GIVEN"} at ${submission.consentAt}`,
    `Consent wording: ${submission.consentWording}`,
    `Opt-in status: ${submission.optInStatus}`,
    "",
    crm.stored
      ? `CRM record: ${crm.recordId ?? "(no id returned)"}`
      : `CRM NOT WRITTEN - ${crm.reason ?? "unknown"}. This email is currently the only copy of this record.`,
  );

  return {
    to,
    subject: `[${siteConfig.name}] ${submission.type} - ${submission.name}`,
    body: lines.join("\n"),
  };
}
