/**
 * ============================================================================
 * INDUSTRIES
 * ============================================================================
 * CONTENT INTEGRITY - read before editing.
 *
 * These entries describe SECTORS and the communication demands each one
 * carries in Gulf capital markets. They are not a client list, a track record,
 * or a claim that Gulf Connect has advised a company in any of them.
 *
 * That distinction drives the wording: every `challenge` and `focus` line is
 * written about the sector, never about the firm. Nothing here says "we have",
 * "our clients" or "we delivered".
 *
 * `industriesContent.note` is rendered prominently on the page and marks the
 * coverage as indicative pending confirmation, exactly as
 * `audienceContent.note` does for client segments. Do not remove it until Gulf Connect
 * confirms which sectors it actually covers.
 *
 * Do NOT add: named clients, mandate counts, sector league tables, market
 * shares, or any figure describing Gulf Connect's activity in a sector.
 */

export interface Industry {
  slug: string;
  title: string;
  /** One line on what the sector is, in capital-markets terms. */
  summary: string;
  /**
   * The communication problem characteristic of the sector. Descriptive of
   * the sector's conditions - never a claim about work Gulf Connect has done.
   */
  challenge: string;
  /** Where communication effort concentrates for companies in this sector. */
  focus: readonly string[];
  /**
   * Three words set very large and very faint behind the active sector panel.
   *
   * DECORATIVE, and constrained accordingly. Each one is a noun already used in
   * that sector's own `summary`, `challenge` or `focus` lines - "capital",
   * "risk" and "governance" are all in the financial services entry, and so on
   * down the list. They are typography, not content: they add emphasis and no
   * meaning, and nothing here may introduce a term the sector's own copy does
   * not already use. A keyword that said something new would be a claim set in
   * 12rem type.
   *
   * Rendered `aria-hidden`, because a screen reader announcing three
   * disconnected nouns between a heading and a paragraph is noise.
   */
  keywords: readonly [string, string, string];
}

export const industriesHero = {
  eyebrow: "Industries",
  title: "Every Sector Explains Itself Differently.",
  lead: "An investment case is read against sector expectations before it is read on its own terms. What a market wants explained, how often, and in what language changes from one industry to the next.",
} as const;

export const industriesContent = {
  label: "Sector Coverage",
  heading: "Sectors Across Gulf Capital Markets",
  intro:
    "The disciplines are constant - a defined investment case, consistent disclosure, relevant audiences. What changes by sector is which questions arrive first, which metrics carry the story, and which investors are in a position to act.",
  /** Marks the list as indicative. Mirrors `audienceContent.note`. */
  note: "Indicative sectors, to be confirmed.",
} as const;

export const industries: Industry[] = [
  {
    slug: "financial-services",
    title: "Financial Services",
    summary:
      "Banks, insurers and asset managers, where disclosure is shaped as much by the regulator as by the market.",
    challenge:
      "Reporting is dense, comparability across peers is close, and analysts arrive with a fixed set of ratios. The narrative work sits in explaining strategy and risk appetite around numbers the market can already read for itself.",
    focus: [
      "Regulatory and results disclosure",
      "Capital and risk narrative",
      "Analyst and ratings engagement",
      "Governance communication",
    ],
    keywords: ["Capital", "Risk", "Governance"],
  },
  {
    slug: "energy-and-utilities",
    title: "Energy & Utilities",
    summary:
      "Producers, utilities and the transition businesses being built alongside them.",
    challenge:
      "Long capital cycles and commodity exposure sit awkwardly against quarterly reporting, and transition strategy invites scrutiny from investors applying criteria the sector has not historically reported against.",
    focus: [
      "Capital allocation narrative",
      "Transition and energy strategy",
      "Long-cycle project communication",
      "International investor engagement",
    ],
    keywords: ["Energy", "Transition", "Capital"],
  },
  {
    slug: "real-estate-and-development",
    title: "Real Estate & Development",
    summary:
      "Developers, owners and the listed vehicles holding Gulf property portfolios.",
    challenge:
      "Value sits in assets whose worth is an estimate, and delivery is measured in years. Investors want visibility on the pipeline, the balance sheet behind it and the assumptions under a valuation.",
    focus: [
      "Portfolio and pipeline disclosure",
      "Valuation and NAV communication",
      "Delivery and milestone reporting",
      "Recurring-income narrative",
    ],
    keywords: ["Assets", "Pipeline", "Valuation"],
  },
  {
    slug: "industrials-and-manufacturing",
    title: "Industrials & Manufacturing",
    summary:
      "Manufacturers and industrial groups, often diversified across several end markets.",
    challenge:
      "A group operating in five markets is frequently valued as though it operates in its weakest one. Segment reporting and a clear account of where capital is directed do more work here than most companies expect.",
    focus: [
      "Segment reporting and clarity",
      "Margin and input-cost narrative",
      "Capital expenditure communication",
      "Diversification rationale",
    ],
    keywords: ["Scale", "Margins", "Capital"],
  },
  {
    slug: "transport-and-logistics",
    title: "Transport & Logistics",
    summary:
      "Ports, freight, aviation and the infrastructure the region's trade position rests on.",
    challenge:
      "Volumes move with global trade, so results read as a proxy for conditions the company does not control. Separating structural position from cyclical noise is the recurring communication problem.",
    focus: [
      "Volume and throughput reporting",
      "Infrastructure investment narrative",
      "Cyclicality and resilience framing",
      "Cross-border investor engagement",
    ],
    keywords: ["Trade", "Volume", "Infrastructure"],
  },
  {
    slug: "technology-and-digital",
    title: "Technology & Digital Infrastructure",
    summary:
      "Technology businesses and the data, connectivity and payments infrastructure behind them.",
    challenge:
      "Companies are assessed on trajectory rather than on current earnings, which puts unusual weight on how growth, unit economics and the path to profitability are defined - and on holding those definitions steady between reporting periods.",
    focus: [
      "Growth and unit-economics narrative",
      "Metric definition and consistency",
      "Pre-IPO and listing communication",
      "Institutional investor education",
    ],
    keywords: ["Growth", "Metrics", "Connectivity"],
  },
];

export const industriesApproach = {
  label: "How It Applies",
  heading: "Sector Knowledge Is Not the Same as a Sector Template",
  paragraphs: [
    "Knowing how a sector reports is useful only to the point where it stops describing the company in front of you. Two industrial groups on the same exchange can need entirely different programmes, because one is understood by the market and the other is not.",
    "We use sector context to work out which questions a company will be asked and which comparisons it will be judged against. The programme itself is then built around that company's position, not around a sector playbook.",
  ],
} as const;

/**
 * The turn from sector knowledge to the markets it is applied in.
 *
 * A restatement, deliberately. "Different sectors. Different questions." is the
 * hero's own proposition - every sector explains itself differently - and "one
 * disciplined approach" is `industriesContent.intro` saying the disciplines are
 * constant. It introduces nothing and claims nothing; it exists to mark the
 * point where the page stops being about sectors and starts being about where
 * they are covered.
 */
export const industriesTransition = {
  statement:
    "Different sectors. Different questions. One disciplined approach to market communication.",
} as const;

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
