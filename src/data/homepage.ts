/**
 * Homepage narrative content.
 *
 * All copy is original. It contains no claims about network size, client
 * counts, years of experience, offices, awards, regulatory status or results.
 */

export const heroContent = {
  eyebrow: "Gulf Capital Markets / Investor Relations / Strategic Communications",
  headline: "Connecting Companies, Capital and Opportunity Across the Gulf.",
  supporting:
    "GCC advises companies on investor visibility, capital-markets communication and engagement with the investor audiences most relevant to their strategy, across Gulf and international markets.",
  primaryCta: { label: "Explore Our Capabilities", href: "/services" },
  secondaryCta: { label: "Start a Conversation", href: "/contact" },
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
 * Markets shown in the outreach visual.
 * Indicates market orientation only. Not offices, registrations or relationships.
 */
export const gulfMarkets = [
  { code: "AE", label: "UAE" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "QA", label: "Qatar" },
  { code: "KW", label: "Kuwait" },
  { code: "BH", label: "Bahrain" },
  { code: "OM", label: "Oman" },
] as const;

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
