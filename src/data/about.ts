/**
 * About page content.
 *
 * Describes how the firm works. Contains no claims about size, history,
 * headcount, offices, clients or credentials, none of which have been supplied.
 */

export const aboutHero = {
  eyebrow: "About GCC",
  title: "Built Around the Gulf. Connected to Global Capital.",
  lead: "GCC works at the point where regional capital markets meet international investment audiences, advising companies on how they are understood by both.",
} as const;

export const aboutPositioning = {
  label: "Positioning",
  heading: "A Communications Firm Built for Capital Markets",
  paragraphs: [
    "GCC advises companies on investor relations, investor targeting, media relations and digital communications. The work is organised around a single question: does the market understand this business the way its leadership intends?",
    "That question rarely has a purely promotional answer. It is settled by the quality of a company's investment narrative, the consistency of its disclosure and the relevance of the audiences it engages.",
  ],
} as const;

export const aboutPurpose = {
  label: "Purpose",
  heading: "Clarity Is a Commercial Position",
  paragraphs: [
    "Capital is not short of options. Companies competing for institutional attention are judged on how clearly they explain strategy, risk and the path to value, and on whether that explanation holds steady over successive reporting periods.",
    "We treat communication as part of how a company is assessed rather than as an activity that sits beside it. The intent is a business that is well understood by the people whose judgement affects it.",
  ],
  /**
   * The four things the paragraph above says a company is judged on, lifted
   * out as visual anchors beside it.
   *
   * Extracted, not written: "strategy, risk and the path to value" and "holds
   * steady over successive reporting periods" are the paragraph's own words.
   * They add emphasis and no meaning, which is the only basis on which a
   * keyword may appear on this page - anything that asserted something the
   * copy does not already say would be a new claim wearing a small typeface.
   */
  criteria: ["Strategy", "Risk", "Path to Value", "Consistency"],
} as const;

export const aboutRegion = {
  label: "Regional Understanding",
  heading: "Markets That Reward Precision",
  paragraphs: [
    "Gulf capital markets have their own reporting rhythms, regulatory expectations, investor bases and language conventions. Regional institutions, family offices and sovereign-linked capital each assess opportunities differently, and international investors approach the region with their own frame of reference.",
    "Working across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman means recognising those differences in practice rather than treating the region as a single audience.",
  ],
  /**
   * CONTENT INTEGRITY. This caption is not decoration and it is not optional.
   *
   * The section renders the six markets on a map at their true coordinates,
   * and a located dot is the single easiest element on this site to misread as
   * a presence. The wording is unchanged from the version that accompanied the
   * earlier list; it must stay visible in every layout, at every breakpoint,
   * and it must never be moved behind an interaction.
   */
  disclaimer:
    "Market orientation shown for reference. It does not represent offices, registrations or investor relationships in any jurisdiction.",
} as const;

/**
 * The transition between regional understanding and how the firm works.
 *
 * A restatement, deliberately: it is the hero's own proposition - "Built
 * Around the Gulf. Connected to Global Capital." - said again in four words at
 * the point in the page where the reader has just finished the regional
 * section and is about to start the operational one. It introduces nothing.
 */
export const aboutTransition = {
  statement: "Regional understanding. Global investor perspective.",
} as const;

/**
 * The closing statement, before the call to action.
 *
 * A statement of how the firm reads its own discipline, not a claim about it.
 * It asserts nothing measurable - no scale, no outcome, no track record - and
 * says the same thing `aboutPurpose` and `aboutCommunication` already say,
 * which is what makes it safe to set at this size.
 *
 * Presented as an editorial statement and never as a quotation or an
 * endorsement: there is no speaker, and attributing it to one would invent a
 * person.
 */
export const aboutPhilosophy = {
  label: "In Practice",
  statement:
    "The strongest market communication is clear, consistent and understood across every audience.",
} as const;

export const aboutHowWeWork = {
  label: "How We Work",
  heading: "Engagements Built to Hold Up Over Time",
  intro:
    "Every engagement is scoped to the company's stage, market and objectives. In practice, most of our work takes one of the following forms.",
  modes: [
    {
      term: "Ongoing advisory",
      description:
        "A continuing IR or communications programme run across the reporting year, with defined materials, calendar and cadence.",
    },
    {
      term: "Programme design",
      description:
        "Establishing the investment narrative, positioning and communication architecture a company will operate for itself.",
    },
    {
      term: "Defined mandates",
      description:
        "Targeted work around a specific requirement, such as an outreach programme, a results cycle or a narrative review.",
    },
    {
      term: "Team support",
      description:
        "Working alongside existing IR, finance and communications teams to add capacity and an outside perspective.",
    },
  ],
} as const;

export const aboutCommunication = {
  label: "Approach",
  heading: "One Narrative, Consistently Told",
  paragraphs: [
    "Investor relations, media and digital communication are frequently run as separate exercises, which is how companies end up describing themselves differently depending on the audience.",
    "We work from a single corporate narrative and adapt its expression rather than its substance. What an investor reads in a results presentation, a journalist hears in a briefing and a stakeholder sees on a company's own channels should be recognisably the same account of the business.",
  ],
  /**
   * The three expressions of the one narrative, for the diagram beside the
   * copy. Each `of` line is the audience the paragraph above already names -
   * an investor reading a presentation, a journalist in a briefing, a
   * stakeholder on the company's own channels.
   */
  narrative: {
    centre: "Corporate Narrative",
    channels: [
      { term: "Investor Relations", of: "What an investor reads" },
      { term: "Media", of: "What a journalist hears" },
      { term: "Digital Communications", of: "What a stakeholder sees" },
    ],
  },
  principles: [
    {
      term: "Accuracy before emphasis",
      description: "Positioning is built on what can be supported and disclosed.",
    },
    {
      term: "Preparation as substance",
      description: "Meeting preparation and follow-up are treated as core work, not administration.",
    },
    {
      term: "Relevance over volume",
      description: "Fewer, better-matched conversations rather than broad distribution.",
    },
    {
      term: "Continuity",
      description: "Programmes designed to be sustained beyond a single announcement or quarter.",
    },
  ],
} as const;
