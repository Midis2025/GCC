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
 * The form type as the CRM stores it.
 *
 * Snake case, because that is the convention every CRM property namespace on
 * the table uses and a property named `company-enquiry` cannot be created in
 * HubSpot at all. Kept as a separate mapping rather than by renaming
 * `SubmissionType`, so the value posted by the forms, the value validated by
 * the route and the value written to the CRM can each be what its own system
 * expects without one of them being wrong everywhere else.
 */
export const CRM_FORM_TYPE: Record<SubmissionType, "company_enquiry" | "investor_registration"> = {
  "company-enquiry": "company_enquiry",
  "investor-registration": "investor_registration",
};

/**
 * The record written to the CRM.
 *
 * Deliberately flat and provider-neutral. `deliverToCrm` maps it onto whatever
 * shape the chosen CRM wants; nothing above this file knows that shape.
 */
export interface CrmSubmission {
  type: SubmissionType;
  /** The same fact as `type`, in the form the CRM stores. See `CRM_FORM_TYPE`. */
  formType: "company_enquiry" | "investor_registration";
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
  /**
   * Which service line the enquiry concerns.
   *
   * One of the slugs in `areaOfInterestOptions`, so the value stored is the
   * same string the service pages deep-link with and a record can be routed on
   * it without anybody interpreting free text.
   */
  areaOfInterest?: string;
  /**
   * When the enquirer would prefer to meet. `YYYY-MM-DD` and one of the hours
   * the form offers, in Gulf Standard Time.
   *
   * A stated preference, not an appointment. Nothing was checked for
   * availability and nothing is held, so whoever works this record still has
   * to reply and arrange it.
   */
  preferredDate?: string;
  preferredTime?: string;
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
  /**
   * Whether this registrant may be added to briefing invitation audiences.
   *
   * The same rule as `generalContentOnly`, stored the way the sending system
   * needs to read it: an email platform builds an audience by including a true
   * flag, not by excluding a true flag, and a suppression expressed only as
   * its inverse is the kind of thing that gets inverted by accident when
   * somebody builds the segment.
   *
   *   category === "Other"  ->  briefingEligible false, general content only
   *   anything else         ->  briefingEligible true
   *
   * Set on investor registrations only. Undefined on a company enquiry, which
   * is correspondence and not an audience.
   */
  briefingEligible?: boolean;

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

/**
 * ----------------------------------------------------------------------------
 * SUBSCRIPTION STATE - what the CRM has to be able to record
 * ----------------------------------------------------------------------------
 * Three states and one suppression flag, and they are not the same thing:
 *
 *   pending    registered, confirmation email sent, NOT yet a member. Receives
 *              nothing but the confirmation itself.
 *   confirmed  followed the link. On the list.
 *   suppressed unsubscribed, or bounced. PERMANENT - a suppressed address is
 *              never sent to again, and a later re-registration does not lift
 *              it. Lifting a suppression is a human act in the CRM, not
 *              something this site can do.
 *
 * Suppression is a separate state rather than a deletion because a deleted
 * record cannot be checked against: the whole point is that the next import,
 * the next campaign and the next re-registration all find the address and skip
 * it.
 */
export type SubscriptionState = "pending" | "confirmed" | "suppressed";

export interface SubscriptionResult {
  /** True only when the provider actually recorded the change. */
  updated: boolean;
  /** Set when nothing was recorded, and why. */
  reason?: string;
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

/**
 * ============================================================================
 * SUBSCRIPTION TRANSITIONS
 * ============================================================================
 * Two more adapter functions, left unimplemented for the same reason
 * `deliverToCrm` is: the provider has not been chosen, and the contact-property
 * model differs between the candidates.
 *
 * Both are called by real routes - `/confirm` and `/unsubscribe` - so the
 * journeys exist end to end and can be walked. Neither pretends: while the CRM
 * is unconfigured they return `updated: false` with a reason, and the pages say
 * so rather than telling somebody they are confirmed or unsubscribed when no
 * system recorded it.
 */

/**
 * Moves a registration from `pending` to `confirmed`.
 *
 * The second half of double opt-in. Called only after the signed token in the
 * confirmation link has been verified, so `email` is the address that was
 * registered and not one supplied by whoever opened the link.
 *
 * IMPLEMENTATION NOTE: find the contact by email, set the opt-in property to
 * confirmed and stamp the confirmation timestamp. Store the timestamp - it,
 * not the registration timestamp, is what evidences consent for a marketing
 * send. If no pending contact exists, return `updated: false` rather than
 * creating one: a confirmation for a registration that was never stored is not
 * a registration.
 */
export async function confirmOptIn(email: string): Promise<SubscriptionResult> {
  if (!isCrmConfigured()) {
    return {
      updated: false,
      reason:
        "CRM is not configured. Set CRM_PROVIDER and CRM_API_KEY, then implement confirmOptIn().",
    };
  }

  void email;
  throw new Error(
    `CRM_PROVIDER="${process.env.CRM_PROVIDER}" is configured but confirmOptIn() has no implementation for it. See src/lib/crm.ts.`,
  );
}

/**
 * Suppresses an address permanently.
 *
 * One-click unsubscribe lands here. Suppression rather than deletion, and
 * permanent rather than a preference - see `SubscriptionState`.
 *
 * IMPLEMENTATION NOTE: set the suppression flag AND add the address to the
 * provider's own suppression list where it has one. Both, not either: the CRM
 * flag is what a segment reads, the provider list is what stops a send that
 * bypassed the segment. The brief requires unsubscribes to be honoured within
 * 24 hours; doing it synchronously here means within seconds.
 */
export async function suppressContact(email: string): Promise<SubscriptionResult> {
  if (!isCrmConfigured()) {
    return {
      updated: false,
      reason:
        "CRM is not configured. Set CRM_PROVIDER and CRM_API_KEY, then implement suppressContact().",
    };
  }

  void email;
  throw new Error(
    `CRM_PROVIDER="${process.env.CRM_PROVIDER}" is configured but suppressContact() has no implementation for it. See src/lib/crm.ts.`,
  );
}
