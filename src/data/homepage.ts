/**
 * Homepage narrative content.
 *
 * All copy is original. It contains no claims about network size, client
 * counts, years of experience, offices, awards, regulatory status or results.
 */

export const heroContent = {
  eyebrow: "Gulf Capital Markets / Investor Relations / Strategic Communications",
  headline: "Connecting Companies, Capital and Opportunity Across the Gulf.",
  /**
   * The same headline, broken for the line-by-line reveal in the hero.
   * Presentation only - the phrasing must stay identical to `headline`, which
   * remains the single source for metadata and any non-animated rendering.
   */
  headlineLines: ["Connecting Companies,", "Capital and Opportunity", "Across the Gulf."],
  supporting:
    "GCC advises companies on investor visibility, capital-markets communication and engagement with the investor audiences most relevant to their strategy, across Gulf and international markets.",
  primaryCta: { label: "Explore Our Capabilities", href: "/services" },
  secondaryCta: { label: "Start a Conversation", href: "/contact" },
} as const;

/**
 * Orientation strip, directly below the hero.
 *
 * CONTENT INTEGRITY: every figure here is a count of something described
 * elsewhere on this site - four capabilities, six named markets, one corporate
 * narrative. None of them is a performance claim.
 *
 * Do NOT add years of experience, client counts, assets raised, mandates
 * completed or deal values. None have been supplied, none would be verifiable,
 * and a figure of that kind in this position reads as a track record.
 */
export const orientationContent = {
  statement: "One narrative. Four capabilities. Six Gulf markets.",
  supporting:
    "The practice is organised so that investor relations, outreach, media and digital work draw on a single account of the business.",
  facts: [
    {
      figure: "04",
      label: "Connected capabilities",
      description: "Investor relations, outreach, media and digital communications.",
    },
    {
      figure: "06",
      label: "Gulf markets",
      description: "UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman.",
    },
    {
      figure: "01",
      label: "Corporate narrative",
      description: "One account of the business, adapted in expression, not substance.",
    },
  ],
} as const;

export const introContent = {
  label: "Dubai / GCC / Global Markets",
  heading: "Regional Perspective. Global Market Standards.",
  paragraphs: [
    "Effective capital-market communication is not a question of visibility alone. Companies are assessed on the clarity of their strategy, the consistency of their disclosure and the relevance of the audiences they reach.",
    "We work with management teams and boards to define how a company is understood by the market, then build the narrative, materials and engagement programme that hold that understanding steady over time.",
  ],
  principles: [
    {
      title: "Strategic clarity",
      description: "A defined investment case, expressed consistently.",
    },
    {
      title: "Investor understanding",
      description: "Knowing how each audience evaluates the company.",
    },
    {
      title: "Relevant market access",
      description: "Engagement directed by mandate fit, not volume.",
    },
    {
      title: "Corporate narrative",
      description: "One account of the business across IR, media and digital.",
    },
    {
      title: "Consistent communication",
      description: "Discipline maintained across the reporting year.",
    },
    {
      title: "Long-term relationships",
      description: "Dialogue built to outlast a single announcement.",
    },
  ],
} as const;

/**
 * Markets shown in the outreach visual and the hero coverage panel.
 * Indicates market orientation only. Not offices, registrations or relationships.
 *
 * `city` is the market's principal financial centre, carried purely as a
 * geographic reference point. It is NOT an office location - anywhere it is
 * rendered, the market-orientation caption must be rendered with it.
 */
export const gulfMarkets = [
  { code: "AE", label: "UAE", city: "Dubai" },
  { code: "SA", label: "Saudi Arabia", city: "Riyadh" },
  { code: "QA", label: "Qatar", city: "Doha" },
  { code: "KW", label: "Kuwait", city: "Kuwait City" },
  { code: "BH", label: "Bahrain", city: "Manama" },
  { code: "OM", label: "Oman", city: "Muscat" },
] as const;

/** Caption that must accompany any rendering of `gulfMarkets`. */
export const marketOrientationNote = "Market orientation only. Not offices or registrations.";

/** Hero market-coverage panel copy. */
export const marketPanelContent = {
  eyebrow: "Gulf Market Coverage",
  statement: "Regional Focus Across Key Gulf Markets",
  note: marketOrientationNote,
} as const;

export const outreachContent = {
  label: "Investor Outreach",
  heading: "Investor Outreach Across the Gulf",
  paragraphs: [
    "We help companies identify and engage the investor audiences relevant to their strategy across Gulf capital markets, and support communication with international investors seeking considered exposure to the region.",
    "The objective is relevance rather than reach. Each programme starts with research into mandate, geography and investment profile before a meeting is proposed.",
  ],
  /**
   * Required for content integrity: the diagram indicates market orientation
   * and must never read as an office footprint or investor relationship claim.
   */
  disclaimer:
    "Market orientation shown for reference. It does not represent offices, registrations or investor relationships in any jurisdiction.",
  categories: [
    "Investor Identification",
    "Market Mapping",
    "Targeted Outreach",
    "Investor Engagement",
    "Roadshow Support",
    "Cross-Border Connectivity",
  ],
  cta: { label: "Explore Investor Outreach", href: "/investor-outreach" },
} as const;

export const approachContent = {
  label: "Our Approach",
  heading: "A More Focused Approach to Market Engagement",
  steps: [
    {
      number: "01",
      title: "Understand",
      description:
        "Build a clear view of the company, its strategy, its market and its investment proposition.",
    },
    {
      number: "02",
      title: "Position",
      description: "Develop a concise narrative aligned with the audiences that matter.",
    },
    {
      number: "03",
      title: "Target",
      description:
        "Identify the investors, market participants and channels relevant to the mandate.",
    },
    {
      number: "04",
      title: "Engage",
      description: "Execute coordinated investor, media and digital outreach.",
    },
    {
      number: "05",
      title: "Refine",
      description:
        "Use market feedback and engagement insight to strengthen communication over time.",
    },
  ],
} as const;

export const whyContent = {
  label: "Why GCC",
  heading: "Built for the Way Gulf Markets Work",
  pillars: [
    {
      title: "Gulf Perspective",
      description:
        "Communication shaped around the realities, calendars and expectations of regional capital markets.",
    },
    {
      title: "Integrated Communications",
      description:
        "Investor relations, media and digital communications treated as one connected corporate narrative.",
    },
    {
      title: "Focused Outreach",
      description: "Audience selection driven by relevance and mandate fit rather than volume.",
    },
    {
      /**
       * TODO: the brief proposes a "Senior-Level Thinking" pillar. Held back
       * until GCC confirms the operating model supports that claim. Neutral,
       * verifiable label used in the meantime.
       */
      title: "Disciplined Execution",
      description:
        "Programmes run to a defined standard, with preparation and follow-up treated as part of the work.",
    },
  ],
} as const;

export const audienceContent = {
  label: "Who We Work With",
  heading: "Selected Markets",
  /** TODO: confirm final client segments. Categories only - implies no clients. */
  note: "Indicative categories, to be confirmed.",
  segments: [
    "Listed Companies",
    "Private Companies",
    "Pre-IPO Businesses",
    "International Companies Entering the Gulf",
    "Growth Companies",
    "Leadership & IR Teams",
  ],
} as const;

export const ctaContent = {
  heading: "Start a Conversation",
  supporting:
    "For companies seeking stronger investor visibility and strategic communications across Gulf and international markets.",
  cta: { label: "Contact GCC", href: "/contact" },
} as const;
