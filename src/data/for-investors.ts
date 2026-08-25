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
  lead: "Gulf Connect convenes briefings with international listed companies working in critical minerals, AI and data infrastructure, and life sciences, and publishes written commentary on those sectors for a Gulf audience.",
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
        "A fortnightly written note on what is moving in Gulf capital markets and in the three sectors we cover. Commentary only.",
    },
    {
      term: "Quarterly Sector Notes",
      description:
        "A longer written briefing on one sector each quarter, available to registered members.",
    },
    {
      term: "Access to the interview library",
      description:
        "Five Questions - a fixed-format interview with the chief executive of a company in one of the three sectors.",
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

/** Sectors a registrant can express interest in. Matches the three we cover. */
export const investorSectors = [
  "Critical minerals",
  "AI and data infrastructure",
  "Life sciences",
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
    "I agree to Gulf Connect Consultancy FZCO contacting me by email with briefing invitations and written content, and I understand I can unsubscribe at any time.",
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
  title: string;
  city: string;
  format: string;
}

export const upcomingBriefings: Briefing[] = [];
