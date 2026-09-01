/**
 * About page content.
 *
 * Describes how the firm works. Contains no claims about size, history,
 * headcount, offices, clients or credentials, none of which have been supplied.
 */

export const aboutHero = {
  eyebrow: "About Gulf Connect",
  title: "Built Around the Gulf. Connected to Global Capital.",
  lead: "A Dubai-based investor communications firm working across the GCC states, introducing international companies to Gulf investors, partners and media.",
} as const;

/**
 * ----------------------------------------------------------------------------
 * PRINCIPALS
 * ----------------------------------------------------------------------------
 * CONTENT INTEGRITY - read before editing, and do not extend.
 *
 * Every line below comes from the client's own factual direction and nothing
 * else. No awards, no former employers, no company names, no years of
 * experience, no deal history, no qualifications. If a fact is not here it was
 * not supplied, and it may not be inferred, researched or improved upon.
 *
 * The register is set deliberately too: a principal should read as one capable
 * person. No "all-star team", no "global powerhouse", no cumulative years of
 * experience, and nothing that implies a larger firm standing behind them. The
 * brief is explicit that overstating the size of the team is the failure mode
 * of the predecessor material.
 *
 * ---------------------------------------------------------------------------
 * ONE ENTRY, AND THE SECOND ONE IS NOT COMING BACK
 * ---------------------------------------------------------------------------
 * This list held two people. The client has directed that the second is not to
 * appear publicly in connection with Gulf Connect - no name, no biography, no
 * location, no attribution, nothing in metadata.
 *
 * The heading and the intro were rewritten because they COUNTED: "Two
 * Principals", "run by two principals, working between Geneva and Dubai".
 * Removing a person and leaving a sentence that says there are two of them
 * would have been worse than leaving the person in.
 *
 * DO NOT invent a second principal, a founder, an advisory board or a
 * "leadership team" to fill the space. The section renders one entry cleanly -
 * see the grid note in `AboutPrincipals`.
 *
 * Photographs are outstanding. The list renders without them rather than with
 * silhouettes.
 */
export const aboutPrincipals = {
  label: "Principal",
  heading: "Run From Dubai",
  intro: "Gulf Connect is run from Dubai.",
  people: [
    {
      name: "Peter Lee",
      /** Supplied: Dubai-based. */
      location: "Dubai",
      bio: "Based in Dubai, with a background across financial services, technology and international business development, and operating experience in UAE market entry and licensing.",
    },
  ],
} as const;

/**
 * Who we work with.
 *
 * A statement about who the firm is set up to serve, not a claim about who it
 * has served - there are no clients to name and none may be implied.
 *
 * ---------------------------------------------------------------------------
 * THE SECTORS ARE EXAMPLES
 * ---------------------------------------------------------------------------
 * The second paragraph used to read "Three sectors, because they are the ones
 * regional capital is actively looking at" - a closed list, and the client has
 * directed that the positioning be broader than that. It now names the four as
 * examples of the range and says plainly that the work is not limited to them.
 *
 * Keep that sentence when adding or editing a sector. A list of four with no
 * qualifier around it reads as a boundary however it is introduced.
 */
export const aboutClients = {
  label: "Who We Work With",
  heading: "International Listed Small and Mid-Caps",
  paragraphs: [
    "Gulf Connect works with international listed small and mid-cap companies - the size of business for which a structured route into Gulf markets does not otherwise exist.",
    "The work is cross-sector. Energy, mining, pharmaceuticals and data centres are where it sits most often, because they are what regional capital is actively looking at, but they are examples of the range rather than the limit of it.",
  ],
  sectors: [
    {
      term: "Energy",
      description:
        "Producers, generators and transition projects assessed on development timelines as much as on current output.",
    },
    {
      term: "Mining",
      description:
        "Producers and developers whose asset base and offtake position need explaining to an audience that reads resources differently.",
    },
    {
      term: "Pharmaceuticals",
      description:
        "Companies assessed on pipeline and milestones rather than on current earnings.",
    },
    {
      term: "Data centres",
      description:
        "The compute, connectivity and data-centre businesses behind regional digital investment.",
    },
  ],
} as const;

export const aboutPositioning = {
  label: "Positioning",
  heading: "A Communications Firm Built for Capital Markets",
  paragraphs: [
    "Gulf Connect advises companies on investor relations, investor targeting, media relations and digital communications. The work is organised around a single question: does the market understand this business the way its leadership intends?",
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
  selectorLabel: "Markets",
  /**
   * CONTENT INTEGRITY. The same wording as `aboutRegion.disclaimer`, and
   * referenced rather than retyped.
   *
   * This section renders the same six markets on the same map, so it has to
   * carry the same denial - offices, registrations, investor relationships.
   * Two hand-written copies of a compliance line on one page is two chances
   * for an edit to change one and leave the other standing.
   */
  disclaimer: aboutRegion.disclaimer,
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

/**
 * ----------------------------------------------------------------------------
 * PAGE-LEVEL COPY THAT USED TO BE WRITTEN INLINE
 * ----------------------------------------------------------------------------
 * MOVED, NOT REWRITTEN. Every string below is the one the page already
 * rendered, word for word, lifted out of the components so that it can have an
 * Arabic sibling in `content/ar/about.ts`.
 */

/** The pull quote beside the positioning section, and its ghosted echo. */
export const aboutPositioningQuote = {
  /** Set very faintly behind the quote. Decorative, and aria-hidden. */
  ghost: "Clarity",
  quote: "Clarity is a commercial position.",
} as const;

/** Heading over the four criteria beside `aboutPurpose`. */
export const aboutPurposeCriteriaLabel = "What the market weighs" as const;

/**
 * The commercial model, as About states it.
 *
 * COMPLIANCE: `basis` and the exclusions come from `commercialModel` in
 * `data/site.ts` and are not repeated here. What is here is the framing around
 * them, which was written into `AboutHowWeWork` and had no Arabic.
 */
export const aboutCommercial = {
  label: "How We Work",
  heading: "Fixed Fees, Defined Scope, Written Reporting",
  /** Follows `commercialModel.basis` in the same paragraph. */
  detail:
    "Every engagement is agreed in advance against what will be prepared, convened, produced and reported, and reported on in writing while it runs.",
  exclusionsLabel: "What we are not paid for",
} as const;

/**
 * The Riyadh band.
 *
 * CONTENT INTEGRITY: a city name over a photograph of that city, under a
 * firm's logo, is easy to read as a footprint. The line asserts nothing about
 * presence - it restates that the six markets are read separately.
 */
export const aboutRiyadhContent = {
  eyebrow: "Riyadh",
  statement: "Six markets, read separately.",
} as const;

/** The principles section's own label and heading. */
export const aboutPrinciplesContent = {
  label: "Principles",
  heading: "How the Work Is Held",
} as const;

/**
 * The team section.
 *
 * Rendered only when `data/team.ts` holds real people, which it does not. The
 * copy is held here so that the section is correct in both languages the day
 * a real entry is added.
 */
export const aboutTeamContent = {
  label: "Team",
  heading: "The People Behind the Work",
} as const;
