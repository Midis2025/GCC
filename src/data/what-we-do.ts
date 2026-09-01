/**
 * ============================================================================
 * WHAT WE DO - service architecture
 * ============================================================================
 * COMPLIANCE - read before editing. These rules are not stylistic.
 *
 * Gulf Connect is not licensed to conduct financial services activity in the
 * UAE, and the wording on these pages determines whether it would need to be.
 * The following must not appear anywhere in this file, in any form:
 *
 *   capital raising / fundraising / raise capital / placement /
 *   third party marketing / introducing investors to invest /
 *   matching investors with companies / any offer, solicitation or invitation
 *   to acquire securities
 *
 *   any success fee, commission, equity or performance-linked compensation
 *
 *   any guarantee, forecast or implication of media coverage, investor
 *   interest, funds raised or share price effect
 *
 *   any claim that past programmes produced financings or investments
 *
 * Write about the WORK - what is prepared, convened, produced and reported.
 * Never about the OUTCOME. If a line is uncertain, leave it out and flag it.
 *
 * British English throughout. The company is "Gulf Connect", never "GCC".
 */

export interface ServiceLine {
  number: string;
  slug: string;
  title: string;
  href: string;
  /** Two lines on the overview page. */
  summary: string;
  /** One-line strapline used in listings. */
  strapline: string;
  /**
   * Which frame from the library represents this line in the showcase panel.
   *
   * A key rather than a `Photo`, so this file stays free of imports from the
   * imagery module and the two can be reasoned about separately. Resolved in
   * `serviceLinePhotos`.
   */
  photoKey: "roadshows" | "programme" | "media" | "advisory";
}

export const whatWeDoHero = {
  eyebrow: "What We Do",
  title: "Four Lines of Work, One Programme",
  lead: "Gulf Connect introduces international companies to Gulf investors and partners. We convene qualified investors for structured meetings, develop and pitch the company story to regional business media in English and Arabic, and produce content the client keeps.",
} as const;

export const serviceLines: ServiceLine[] = [
  {
    number: "01",
    slug: "investor-roadshows",
    title: "Investor Roadshows",
    href: "/what-we-do/investor-roadshows",
    photoKey: "roadshows",
    strapline: "Structured investor meeting programmes in Gulf markets.",
    summary:
      "A structured sequence of one-to-one meetings and a hosted group session with qualified Gulf investors, prepared around the company's sector and corporate story.",
  },
  {
    number: "02",
    slug: "gulf-programme",
    title: "The Gulf Programme",
    href: "/what-we-do/gulf-programme",
    photoKey: "programme",
    strapline: "A six-month investor communications programme.",
    summary:
      "Continuity rather than a single visit. Six months of investor meetings, content production, media pitching cycles, Arabic distribution and written monthly reporting.",
  },
  {
    number: "03",
    slug: "media-arabic-communications",
    title: "Media & Arabic Communications",
    href: "/what-we-do/media-arabic-communications",
    photoKey: "media",
    strapline: "Regional business media, Arabic communication, translation and content.",
    summary:
      "Earned, paid and owned media kept explicitly separate, with certified financial translation and Arabic-language corporate communication for regional distribution.",
  },
  {
    number: "04",
    slug: "advisory",
    title: "Advisory",
    href: "/what-we-do/advisory",
    photoKey: "advisory",
    strapline: "Regional market entry, listing assessment and conference strategy.",
    summary:
      "Briefings on how a company would be read in Gulf markets: regional listing assessment, market-entry considerations and conference strategy.",
  },
];

/**
 * The commercial model, stated on the overview page.
 *
 * The brief treats this as a differentiator rather than a caveat, and it is
 * placed accordingly - on the page, in normal body copy, not in a footnote.
 * The three exclusions are compliance statements; they are not marketing lines
 * and must not be softened into any.
 */
export const commercialModelContent = {
  label: "Commercial Model",
  heading: "Fixed Fees for Defined Scopes",
  paragraphs: [
    "Gulf Connect works on fixed professional fees agreed in advance against a defined scope of work. A programme is priced on what is prepared, convened, produced and reported - not on what follows from it.",
    "That is a deliberate structure rather than a pricing preference. It keeps the firm's interest in the quality of the work rather than in a transaction, and it is what allows the commercial relationship to be disclosed plainly wherever our content concerns a company that has engaged us.",
  ],
  exclusionsLabel: "What we are not paid for",
  exclusions: [
    {
      term: "No success fees",
      description: "Fees are not contingent on any transaction, meeting outcome or announcement.",
    },
    {
      term: "No compensation linked to capital raised",
      description: "We do not solicit investment and we hold no client funds.",
    },
    {
      term: "No compensation linked to share price",
      description: "Nothing we are paid varies with share price or trading volume.",
    },
  ],
} as const;

/**
 * Page-level copy that used to be written inline in `app/[lang]/what-we-do`.
 *
 * MOVED, NOT REWRITTEN. Every string below is the one the page already
 * rendered, character for character, lifted out of the JSX so that it has an
 * Arabic sibling in `content/ar/what-we-do.ts`. If any of it reads differently
 * from what the English page said before, that is a bug.
 */
export const whatWeDoShowcase = {
  label: "Service Lines",
  heading: "Four Ways We Work",
  note: "Most companies do not need all four at once. The balance is set by where a business currently stands with the region.",
} as const;

/** The single-line pause between the commercial model and the process. */
export const whatWeDoTransition = {
  statement: "One market. Four ways of working in it.",
} as const;

/**
 * The map band.
 *
 * COMPLIANCE: describes the ROUTE the work runs along - meetings prepared and
 * convened, a story developed and pitched, content produced and handed over.
 * It names no outcome and must not acquire one.
 */
export const whatWeDoReach = {
  label: "Global Connection",
  heading: "International Companies. Gulf Markets.",
  paragraphs: [
    "Every programme runs between two places: where a company is, and where the audiences relevant to it are. The work is the route between them - meetings prepared and convened, a story developed and pitched, content produced and handed over.",
    "Dubai and Abu Dhabi carry most of it, with Riyadh where a company's sector makes it relevant.",
  ],
} as const;

/** The closing band on each of the four service pages. */
export const otherServiceLinesContent = {
  label: "Also",
  heading: "The Other Three Lines",
} as const;
