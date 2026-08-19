/**
 * ============================================================================
 * PROJECTS / ENGAGEMENTS
 * ============================================================================
 * READ THIS BEFORE EDITING. THE ENTRIES BELOW ARE LAYOUT PLACEHOLDERS.
 *
 * No engagement, mandate or client has been supplied for this site, and none
 * may be invented. Every entry here is flagged `isPlaceholder: true`, which
 * makes the UI:
 *
 *   - label each card and each detail page "Sample";
 *   - render a standing notice at the top of the index;
 *   - mark the routes noindex, so nothing reaches search results;
 *   - exclude them from sitemap.xml.
 *
 * They exist so the page architecture is complete and reviewable, in exactly
 * the way `data/insights.ts` does for editorial content.
 *
 * ---------------------------------------------------------------------------
 * TO PUBLISH REAL WORK
 * ---------------------------------------------------------------------------
 * Replace these entries and set `isPlaceholder: false`. Two constraints apply
 * whatever GCC supplies:
 *
 *   1. CONFIDENTIALITY. IR and communications mandates are rarely nameable.
 *      The shape below is deliberately anonymised - sector, market, situation
 *      and scope, with no company name - because that is what a firm in this
 *      position can usually publish. Name a client only with written consent.
 *
 *   2. NO OUTCOME CLAIMS. `outcome` describes what was produced or put in
 *      place. It must never claim a share price, valuation, funding, index
 *      inclusion or transaction result, none of which a communications adviser
 *      can attribute to its own work.
 *
 * TO REMOVE THE SECTION ENTIRELY: empty this array. The index renders an
 * honest empty state and the nav entry can then be dropped from
 * `data/navigation.ts`.
 */

export interface Project {
  slug: string;
  /** Anonymised descriptor, e.g. "Listed industrial group". */
  client: string;
  /** Sector label. Should match a title in `data/industries.ts`. */
  sector: string;
  /** Market, e.g. "Saudi Arabia". */
  market: string;
  /** Short headline for the card. */
  title: string;
  /** The situation the company was in. */
  situation: string;
  /** What the engagement consisted of. Activity, never outcomes. */
  scope: readonly string[];
  /** What was produced or put in place. Never a market or financial result. */
  outcome: string;
  /** True while the entry is a layout placeholder rather than real work. */
  isPlaceholder: boolean;
}

export const projectsHero = {
  eyebrow: "Selected Work",
  title: "Engagements, Described by Their Substance.",
  lead: "Investor relations mandates are rarely nameable. What can be described is the situation a company was in, the work the engagement consisted of, and what was put in place by the end of it.",
} as const;

export const projectsContent = {
  label: "Selected Engagements",
  heading: "How the Work Takes Shape",
  intro:
    "Every engagement is scoped to the company's stage, market and objectives. These profiles show the forms that scoping most often takes.",
  /**
   * Rendered whenever any entry is a placeholder. Deliberately unambiguous -
   * a visitor must not be able to read these as completed client work.
   */
  placeholderNotice:
    "The engagement profiles below are illustrative examples used to establish this page's layout. They do not describe completed client work, and are excluded from search indexing until real engagements are supplied and approved for publication.",
  confidentialityNote:
    "Engagements are described without naming clients. Investor relations and communications mandates are ordinarily confidential.",
} as const;

export const projects: Project[] = [
  {
    slug: "pre-ipo-narrative-programme",
    client: "Privately held industrial group",
    sector: "Industrials & Manufacturing",
    market: "Saudi Arabia",
    title: "Building an investment case ahead of a listing",
    situation:
      "A diversified group preparing to list, with a strong operating record but no single account of what the business was or how it created value. Each division described itself differently.",
    scope: [
      "Investment narrative development",
      "Segment positioning and messaging",
      "Corporate presentation and materials",
      "Management preparation and rehearsal",
      "IR calendar and disclosure framework",
    ],
    outcome:
      "A single investment case adopted across the group, with the presentation, Q&A and disclosure calendar built around it before the first investor meeting.",
    isPlaceholder: true,
  },
  {
    slug: "cross-border-outreach-programme",
    client: "Listed real estate company",
    sector: "Real Estate & Development",
    market: "United Arab Emirates",
    title: "Reaching international investors from a regional base",
    situation:
      "A well-covered domestic company with almost no international shareholder base, and an investment case that assumed local knowledge an outside investor would not have.",
    scope: [
      "Investor landscape mapping",
      "Mandate-fit qualification",
      "Narrative adapted for non-regional audiences",
      "Non-deal roadshow programme",
      "Post-meeting feedback and review",
    ],
    outcome:
      "A qualified target list, a version of the investment case that stood up without local context, and a structured meeting programme with feedback captured against each conversation.",
    isPlaceholder: true,
  },
  {
    slug: "results-communication-reset",
    client: "Listed financial institution",
    sector: "Financial Services",
    market: "Qatar",
    title: "Making the reporting year hold together",
    situation:
      "Results communication reassembled from scratch each quarter, producing four different emphases in a year and a market view that drifted with whichever number led the release.",
    scope: [
      "Perception and messaging review",
      "Results messaging framework",
      "Quarterly materials and templates",
      "Analyst and media preparation",
      "Reporting calendar and cadence",
    ],
    outcome:
      "A results framework carried through the reporting year, with each quarter building on the last rather than restating the company from the beginning.",
    isPlaceholder: true,
  },
  {
    slug: "digital-ir-presence",
    client: "Listed logistics operator",
    sector: "Transport & Logistics",
    market: "Oman",
    title: "Bringing owned channels up to disclosure standard",
    situation:
      "An investor section that lagged the company's reporting by two quarters, and executive profiles that described a strategy the business had since moved on from.",
    scope: [
      "Digital IR audit",
      "Investor-facing content structure",
      "Executive digital positioning",
      "Announcement distribution across owned channels",
      "Maintenance and update process",
    ],
    outcome:
      "An investor section held to the same standard as the disclosure it carries, and a defined process for keeping it current between reporting periods.",
    isPlaceholder: true,
  },
  {
    slug: "media-positioning-programme",
    client: "Regional energy business",
    sector: "Energy & Utilities",
    market: "United Arab Emirates",
    title: "A corporate story the market could follow",
    situation:
      "Substantial investment underway and almost no external account of it, leaving coverage to be driven by announcements rather than by any explanation of the strategy behind them.",
    scope: [
      "Corporate narrative development",
      "Announcement strategy and sequencing",
      "Financial and trade media engagement",
      "Executive profiling and preparation",
      "Thought leadership programme",
    ],
    outcome:
      "An announcement sequence tied to the corporate narrative, with executives briefed and the strategy explained ahead of the individual developments that followed from it.",
    isPlaceholder: true,
  },
  {
    slug: "ir-programme-establishment",
    client: "Recently listed technology company",
    sector: "Technology & Digital Infrastructure",
    market: "United Arab Emirates",
    title: "Standing up an IR function after listing",
    situation:
      "A company through its listing with no IR programme behind it: no calendar, no defined metrics, and growth described differently in each of its first two reporting periods.",
    scope: [
      "IR strategy and programme design",
      "Metric definition and consistency",
      "Investor and analyst engagement plan",
      "Shareholder communications",
      "In-house team support and handover",
    ],
    outcome:
      "A running IR programme with a defined calendar, a stable set of reported metrics, and an internal team equipped to operate it.",
    isPlaceholder: true,
  },
];

/** Sorted for display. Order is authored, so this simply returns a copy. */
export function getProjects(): Project[] {
  return [...projects];
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** True when any entry is still a placeholder, so the UI can label the page. */
export function hasPlaceholderProjects(): boolean {
  return projects.some((project) => project.isPlaceholder);
}

/** True when there is real, publishable work to show. */
export function hasProjects(): boolean {
  return projects.length > 0;
}
