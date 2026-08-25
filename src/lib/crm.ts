/**
 * ============================================================================
 * CRM ADAPTER
 * ============================================================================
 * Every form on this site posts to a server route, and that route writes to
 * the CRM. The inbox is a notification channel, never the database.
 *
 * That ordering is a business requirement rather than an architectural
 * preference: the value of this site is the investor list it accumulates, and
 * a list that lives in someone's mailbox is not a list. Every record therefore
 * carries its source, its timestamp and the lawful basis it was collected
 * under from the moment it is created - retrofitting that later is painful,
 * and for a database business it is expensive.
 *
 * ----------------------------------------------------------------------------
 * WHY THIS IS AN ADAPTER AND NOT A HUBSPOT CLIENT
 * ----------------------------------------------------------------------------
 * The CRM has not been chosen. The brief lists "CRM selection and access" as
 * outstanding from the client, with HubSpot and Zoho both under consideration.
 *
 * Writing this against one of them would have meant guessing, and a guess here
 * is not a small one - the field mapping, the consent model and the
 * double-opt-in mechanics all differ between the two. So the transport is a
 * single function with a documented payload, and choosing a provider means
 * implementing `deliverToCrm` and setting two environment variables. Nothing
 * above this layer changes.
 *
 * Until then `isCrmConfigured()` is false, and every caller is expected to
 * tell the truth about that rather than showing a success state for a record
 * that was never stored.
 */

/** Which form produced the record. Stored against it. */
export type SubmissionType = "company-enquiry" | "investor-registration";

/**
 * The record written to the CRM.
 *
 * Deliberately flat and provider-neutral. `deliverToCrm` maps it onto whatever
 * shape the chosen CRM wants; nothing above this file knows that shape.
 */
export interface CrmSubmission {
  type: SubmissionType;
  /** Where the record came from - route path, so campaign attribution works later. */
  source: string;
  /** ISO 8601, set on the server. Never trusted from the client. */
  submittedAt: string;

  name: string;
  email: string;
  country?: string;
  role?: string;
  phone?: string;

  /* Company enquiries. */
  companyName?: string;
  listingVenue?: string;
  ticker?: string;
  sector?: string;
  message?: string;

  /* Investor registrations. */
  firm?: string;
  investorCategory?: string;
  sectorsOfInterest?: string[];
  /**
   * Set when the category is one that receives general content only.
   *
   * A compliance control, not a preference: briefings are directed at
   * institutional and professional audiences, and a registrant who selected
   * "Other" has not established that basis. They receive written content and
   * no briefing invitations unless a human reviews the record.
   */
  generalContentOnly?: boolean;

  /* Consent - captured, never assumed. */
  consentGiven: boolean;
  /** ISO 8601 at the moment the box was ticked and submitted. */
  consentAt: string;
  /** The exact wording consented to, stored so it can be evidenced later. */
  consentWording: string;

  /**
   * Double opt-in state. Investor registrations start `pending` and only
   * become `confirmed` when the link in the confirmation email is followed.
   * Company enquiries are not a marketing list and are `not-applicable`.
   */
  optInStatus: "pending" | "confirmed" | "not-applicable";
}

export interface CrmResult {
  /** True only when a record was actually written. */
  stored: boolean;
  /** Provider record id, where one comes back. */
  recordId?: string;
  /** Set when the CRM is not configured, or when the write failed. */
  reason?: string;
}

/**
 * Whether a CRM is wired up.
 *
 * Both variables are server-only and must never be prefixed `NEXT_PUBLIC_` -
 * that prefix inlines a value into the client bundle, and an API key in a
 * browser is an API key in public.
 */
export function isCrmConfigured(): boolean {
  return Boolean(process.env.CRM_PROVIDER && process.env.CRM_API_KEY);
}

/**
 * Writes a submission to the CRM.
 *
 * IMPLEMENTATION NOTE for whoever wires this up:
 *
 * - Read the provider from `CRM_PROVIDER` and the credential from
 *   `CRM_API_KEY`. Add whatever else that provider needs (portal id, list id,
 *   data-centre region) as further server-only variables.
 * - Map `CrmSubmission` onto the provider's contact/lead object. Keep
 *   `source`, `submittedAt`, `consentGiven`, `consentAt`, `consentWording`,
 *   `optInStatus` and `investorCategory` as first-class stored fields - they
 *   are the fields that make the record defensible, not metadata.
 * - Return the provider's record id so it can be logged against the
 *   notification email.
 * - Throw on failure. The caller catches and degrades; it does not pretend.
 */
export async function deliverToCrm(submission: CrmSubmission): Promise<CrmResult> {
  if (!isCrmConfigured()) {
    return {
      stored: false,
      reason:
        "CRM is not configured. Set CRM_PROVIDER and CRM_API_KEY, then implement deliverToCrm().",
    };
  }

  /*
   * Intentionally not implemented.
   *
   * Reaching here means the environment claims a CRM is configured but no
   * transport has been written for it. Failing loudly is correct: the
   * alternative is a form that reports success while silently discarding
   * registrations, which for this business is the worst possible failure.
   */
  void submission;
  throw new Error(
    `CRM_PROVIDER="${process.env.CRM_PROVIDER}" is configured but deliverToCrm() has no implementation for it. See src/lib/crm.ts.`,
  );
}
