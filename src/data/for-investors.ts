/**
 * ============================================================================
 * FOR INVESTORS
 * ============================================================================
 * Written to investors, not about them. The rest of the site addresses the
 * companies who pay; this page addresses the audience being built, and it
 * fails if it reads like a sales page turned around.
 *
 * COMPLIANCE. The rules in `data/what-we-do.ts` apply here with one addition
 * that matters more on this page than anywhere else: nothing here may read as
 * an offer, solicitation or invitation to acquire securities, and nothing may
 * describe what an investor might gain. Registration buys access to briefings
 * and written content. That is the whole proposition and it is enough.
 */

export const forInvestorsHero = {
  eyebrow: "For Investors",
  title: "Briefings With International Companies",
  lead: "Gulf Connect convenes briefings with international listed companies working across sectors including energy, mining, pharmaceuticals and data centres, and publishes written commentary on those sectors for a Gulf audience.",
} as const;

export const forInvestorsIntro = {
  label: "Membership",
  heading: "Free, and by Registration",
  paragraphs: [
    "Registration is free. It exists so that invitations reach people for whom the company, the sector and the format are actually relevant, rather than being broadcast.",
    "Gulf Connect is paid by the companies it works with, on fixed professional fees for defined scopes of work. We are not paid by investors, we do not solicit investment and we do not make recommendations about any security.",
  ],
} as const;

/**
 * What registration actually provides.
 *
 * Concrete, because nobody joins a list to "stay informed". Each line names a
 * thing that exists or is scheduled to exist - see `data/insight.ts` for the
 * formats these refer to.
 */
export const investorBenefits = {
  label: "What You Receive",
  heading: "Four Things, Named",
  items: [
    {
      term: "Invitations to briefings and hosted sessions",
      description:
        "One-to-one and small-group briefings with international companies visiting the region, sent to registrants for whom the sector is relevant.",
    },
    {
      term: "The Gulf Brief",
      description:
        "A fortnightly written note on what is moving in Gulf capital markets and in the sectors we cover. Commentary only.",
    },
    {
      term: "Quarterly Sector Notes",
      description:
        "A longer written briefing on one sector each quarter, available to registered members.",
    },
    {
      term: "Access to the interview library",
      description:
        "Five Questions - a fixed-format interview with the chief executive of a company in one of the sectors we cover.",
    },
  ],
} as const;

/**
 * The privacy assurance.
 *
 * Short by design. Gulf family offices are private to the point of secrecy,
 * and four plain sentences do more work here than a page of policy - the
 * policy itself is linked, not summarised.
 */
export const investorAssurance = {
  label: "Your Details",
  heading: "What We Do With Them",
  items: [
    "We do not sell your details.",
    "We do not share them beyond what is needed to run the list.",
    "We do not send investment recommendations.",
    "You can unsubscribe from any message, and we act on it.",
  ],
} as const;

/**
 * ----------------------------------------------------------------------------
 * INVESTOR CATEGORY
 * ----------------------------------------------------------------------------
 * This select is a COMPLIANCE CONTROL, not a marketing field.
 *
 * Briefings are directed at institutional and professional audiences, and this
 * field records the basis on which each registrant was classified. Three rules
 * follow from that and none of them is negotiable:
 *
 *   1. It is REQUIRED. No empty submission.
 *   2. There is NO "prefer not to say" option. A record with no basis is a
 *      record that cannot be relied on.
 *   3. "Other" is a real answer with a consequence: those registrants receive
 *      general content only, and no briefing invitations, unless a human
 *      reviews the record. See `GENERAL_CONTENT_ONLY` in the API route.
 */
export const investorCategories = [
  { value: "institution", label: "Institution" },
  { value: "asset-manager", label: "Asset Manager" },
  { value: "family-office", label: "Family Office" },
  { value: "private-bank-broker", label: "Private Bank or Broker" },
  { value: "qualified-private-investor", label: "Qualified Private Investor" },
  { value: "other", label: "Other" },
] as const;

export type InvestorCategory = (typeof investorCategories)[number]["value"];

/**
 * The category whose registrants receive general content only.
 *
 * Held here rather than inline so the form, the API route and any future CRM
 * mapping all read the same constant.
 */
export const GENERAL_CONTENT_ONLY: InvestorCategory = "other";

/**
 * Sectors a registrant can express interest in. Matches the three we cover.
 *
 * These strings are BACKEND VALUES: they are what the checkbox submits, what
 * `api/submit` validates against and what the CRM stores, so they are the same
 * in every edition. What a registrant READS is looked up from
 * `forms.investor.sectorLabels` in the chrome dictionary by the value below -
 * which is how the Arabic edition shows Arabic sector names while writing the
 * same record as the English one.
 */
/*
  The sector options on the investor registration form.

  These strings are BOTH the visible labels and the values that reach the CRM -
  the form posts the English string and `api/submit` validates the submission
  against this array, so the two cannot be separated. Renaming an option
  therefore renames a CRM value; that is intended here, and the site has not
  launched, so there is no stored history to reconcile.

  "Other" is not a fifth option and should not become one without the client:
  a free-text sector field on a form that feeds a CRM is a data-quality problem
  rather than a courtesy. The four below are where the practice concentrates,
  not the limit of what it works on - the page copy around the form carries
  that qualification.
*/
export const investorSectors = [
  "Energy",
  "Mining",
  "Pharmaceuticals",
  "Data centres",
] as const;

/**
 * Consent wording.
 *
 * Its own checkbox, unticked, with its own words - never bundled into the
 * submit action and never pre-selected. UAE Federal Decree-Law No. 45 of 2021
 * governs this, and a database built on bundled consent is a database that
 * cannot be used.
 */
export const investorConsent = {
  label:
    "I agree to Gulf Connect contacting me by email with briefing invitations and written content, and I understand I can unsubscribe at any time.",
  note: "We will send a confirmation email. Your registration is complete once you confirm it from that email.",
} as const;

/**
 * Upcoming briefings.
 *
 * EMPTY BY DESIGN. The module renders nothing at all while this array is
 * empty - not an empty state, not a "watch this space", nothing. The brief is
 * explicit: an empty calendar is worse than no calendar, and inventing a
 * briefing would be inventing a business fact.
 *
 * Add real entries here and the section appears.
 */
export interface Briefing {
  /** ISO date. */
  date: string;
  /** The company or the briefing's own name. */
  title: string;
  /**
   * The sector the company works in.
   *
   * Optional, because a hosted session is not always about one company in one
   * sector. Where it is set the row shows it, and a registrant can see at a
   * glance whether the session matches the sectors they registered an interest
   * in. Free text rather than the three-value list: a briefing may sit across
   * two of them, and this is a label rather than a routing value.
   */
  sector?: string;
  /** Dubai, Abu Dhabi or Riyadh, in practice. Never abbreviated. */
  city: string;
  /** How the session runs - one-to-one, small group, roundtable, and so on. */
  format: string;
}

/**
 * Standing copy for the module.
 *
 * Held here rather than written into the page so the heading and the
 * supporting line are edited in the same file as the entries they describe.
 *
 * COMPLIANCE: the supporting line says what the sessions ARE. It does not say
 * what attending one produces, and nothing may be added to it that does.
 */
export const upcomingBriefingsContent = {
  label: "Calendar",
  heading: "Upcoming Briefings",
  intro:
    "Upcoming Gulf Connect briefings and hosted sessions with international companies.",
  /**
   * The invitation request.
   *
   * Routes to the investor side of the Contact toggle rather than to a booking
   * form of its own: a request for an invitation is a conversation, places are
   * allocated by hand, and `briefingProcess` step 05 states plainly that
   * registration does not guarantee a place at every briefing. A control that
   * looked like a seat reservation would contradict it.
   */
  cta: { label: "Request an Invitation", href: "/contact?enquiry=investor" },
} as const;

export const upcomingBriefings: Briefing[] = [];

/**
 * ----------------------------------------------------------------------------
 * PAGE-LEVEL COPY THAT USED TO BE WRITTEN INLINE
 * ----------------------------------------------------------------------------
 * MOVED, NOT REWRITTEN. Every string below is the one the page already
 * rendered, word for word, lifted out of the JSX so that it can have an Arabic
 * sibling in `content/ar/for-investors.ts`.
 */

/**
 * The map band.
 *
 * COMPLIANCE: it says where the companies come from and what registration
 * does. It does not say what an investor gains, and nothing may be added that
 * does. The standing map denial is separate and shared - `maps.denial`.
 */
export const investorsReach = {
  label: "Reach",
  heading: "Where the Companies Come From",
  paragraphs: [
    "The companies convened for briefings are international - listed small and mid-cap businesses working across sectors including energy, mining, pharmaceuticals and data centres, based well outside the region.",
    "Bringing them into a room with Gulf audiences is the whole of the exercise. Registration is what puts a professional investor on the list for those sessions.",
  ],
} as const;

/**
 * The five professional categories, set as type on a rule.
 *
 * COMPLIANCE: these are NOT claims about who has registered. They are the
 * options the form offers, stated so a professional investor can see the list
 * is meant for them before reaching the field, and `note` says exactly that.
 */
export const whoRegistersContent = {
  label: "Who Registers",
  heading: "A Professional List",
  note: "The categories the registration form asks you to select from. Registration is free, and the category you choose determines what you are sent.",
} as const;

/** The dark panel beside the registration form. */
export const registerPanelContent = {
  label: "Register",
  heading: "Join the List",
} as const;
