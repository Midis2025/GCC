/**
 * ============================================================================
 * HOMEPAGE — THE DEEPER SECTIONS
 * ============================================================================
 * Content added to answer the reader who wants to know what the firm actually
 * does before deciding whether to make contact. It lives in its own file
 * rather than in `data/home.ts` because that file holds the page's spine - the
 * hero, the three verbs, the two calls to action - and this holds the argument
 * underneath it. Two different editing jobs.
 *
 * ---------------------------------------------------------------------------
 * COMPLIANCE. Every rule from `data/what-we-do.ts` applies to every string in
 * this file, and three of them bite hardest here because this is the most
 * discursive copy on the site:
 *
 * 1. NOTHING is a figure that cannot be sourced. There is no count of
 *    investors, meetings, programmes, placements or outcomes anywhere below,
 *    and none may be added. The only numbers are ordinals.
 *
 * 2. NOTHING promises a result. Meetings are convened and stories are pitched;
 *    investors are not said to invest and editors are not said to publish. Where
 *    a sentence could be read either way it names the activity, not the effect.
 *
 * 3. NOTHING describes the firm as a capital-raising adviser. No placement, no
 *    solicitation, no third-party marketing, no success fees.
 *
 * The register to write in: specific, calm and structural. The test for any new
 * sentence is whether a compliance officer could ask "how do you know that?"
 * and be answered by pointing at the work rather than at a claim.
 */

/**
 * Why the Gulf is not a branch office of another financial centre.
 *
 * The argument the whole business rests on, stated once and properly. It is an
 * observation about market structure - investor types, relationship cadence,
 * media ecosystem, language - all of which are checkable, none of which is a
 * forecast or a measurement.
 */
export const gulfDifference = {
  label: "The Regional Case",
  heading: "Gulf Markets Are Not an Extension of London or New York",
  paragraphs: [
    "International companies frequently arrive in the Gulf with an investor-relations approach built for another financial centre, and find that the parts which travel are the materials rather than the method. The difficulty is not translation.",
    "The investor base is structured differently. Institutions, sovereign-linked capital, family offices and private banks each assess an opportunity through their own frame, and the route to a conversation with one is rarely the route to a conversation with another.",
    "Relationships run on a different cadence. A single visit introduces a company; it does not establish one. Regional participants tend to weigh a business over repeated contact, which makes the interval between engagements as consequential as the engagements themselves.",
    "The media ecosystem is its own environment, operating in English and Arabic, with its own editorial priorities and its own sense of what regional context a story needs before it is worth carrying.",
  ],
  /*
   * The closing line. States the firm's position without claiming an outcome:
   * programmes are built around the region's structure, which is a description
   * of method, not a promise about what the method produces.
   */
  closing:
    "Gulf Connect builds programmes around how the region actually works rather than importing a template and hoping it carries.",
} as const;

/**
 * The three questions that open an engagement.
 *
 * Deliberately questions rather than claims. They describe where the work
 * starts and commit the firm to nothing about where it ends - which is both
 * the honest framing and the compliant one.
 */
export const openingQuestions = {
  label: "Where the Work Starts",
  heading: "Before Communication Comes Understanding",
  intro:
    "The strongest engagement programmes begin with clarity about the business itself. The communication framework is developed before any decision about meetings, media or content.",
  questions: [
    {
      question: "What does the company need the market to understand?",
      note: "Not what it would like said about it. The specific thing a reader, an analyst or a journalist should be able to state accurately after an encounter with the business.",
    },
    {
      question: "Which audiences are actually relevant to that objective?",
      note: "Relevance is set by mandate, geography and sector rather than by reach. A smaller number of appropriate conversations is the point of the exercise.",
    },
    {
      question: "What evidence supports the narrative?",
      note: "Every claim in a corporate story has to be traceable to something disclosed. Where it is not, the story is revised rather than the evidence stretched.",
    },
  ],
} as const;

/**
 * One visit against a continuous programme.
 *
 * COMPLIANCE: this section compares two SHAPES OF WORK, never two sets of
 * results. It does not say a programme performs better, produces more
 * meetings, or leads anywhere a visit does not. It says a programme contains
 * more work, which is a fact about the scope of an engagement.
 *
 * Do not add a comparative outcome claim to either column.
 */
export const continuity = {
  label: "Continuity",
  heading: "Market Presence Is Built Through Continuity",
  intro:
    "A single visit and a running programme are different pieces of work, not the same work at different sizes. Repeated, disciplined communication gives a market more context to read a company by than one appearance can.",
  columns: [
    {
      key: "visit",
      label: "One Visit",
      term: "A defined moment",
      description:
        "A programme of meetings prepared, held and reported over a short window. It introduces a company to a set of relevant participants and leaves a record of what was discussed.",
      items: [
        "Market briefing",
        "Selected meetings",
        "Media preparation",
        "Written follow-up",
      ],
    },
    {
      key: "programme",
      label: "Continuous Programme",
      term: "A standing position",
      description:
        "The same disciplines run over months rather than days, so a company is present between visits as well as during them, and each engagement builds on what the last one surfaced.",
      items: [
        "Ongoing investor meetings",
        "A content cadence",
        "Media pitching cycles",
        "Arabic distribution",
        "Written reporting",
        "Market feedback",
      ],
    },
  ],
} as const;

/**
 * The three cities.
 *
 * CONTENT INTEGRITY. Every description here is a broad, publicly observable
 * characterisation of a market. None of them claims an office, a registration,
 * a licence, a relationship or any degree of access - and none may be edited to
 * imply one. The caption under the section says so in standing text, and it is
 * not optional.
 *
 * Riyadh is included because the service pages already name it as a market
 * where programmes run where appropriate. It is described as a market, in the
 * same terms as the other two.
 */
export const marketContexts = {
  label: "Where Programmes Run",
  heading: "Three Markets. Different Contexts.",
  intro:
    "Programmes are built across Dubai and Abu Dhabi and, where a company's sector makes it relevant, Riyadh. The three are not interchangeable, and a programme that treats them as one audience is a programme that has not started properly.",
  cities: [
    {
      key: "dubai",
      city: "Dubai",
      country: "United Arab Emirates",
      description:
        "International business, financial services, private capital and the regional headquarters of companies operating across the wider Gulf.",
    },
    {
      key: "abu-dhabi",
      city: "Abu Dhabi",
      country: "United Arab Emirates",
      description:
        "Institutional capital and a sovereign-linked ecosystem, with concentrations in energy, infrastructure and strategic industry.",
    },
    {
      key: "riyadh",
      city: "Riyadh",
      country: "Saudi Arabia",
      description:
        "Developing capital markets with growing institutional participation, alongside corporates and regional investment activity.",
    },
  ],
  disclaimer:
    "Market context shown for reference. It does not represent offices, registrations, licences or relationships in any jurisdiction.",
} as const;
