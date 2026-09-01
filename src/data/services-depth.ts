/**
 * ============================================================================
 * SERVICE PAGES — THE DEEPER SECTIONS
 * ============================================================================
 * Depth for the four service pages: what a piece of work actually contains,
 * stated at the level a prospective client needs before making contact.
 *
 * ---------------------------------------------------------------------------
 * COMPLIANCE. Every rule in `data/what-we-do.ts` applies. Three bite hardest:
 *
 * 1. Everything below describes WORK PERFORMED. Nothing describes a result.
 *    Meetings are prepared, convened and reported; stories are developed and
 *    pitched. No sentence says an investor invests, an editor publishes, or a
 *    company benefits.
 *
 * 2. No figures. There is no count of meetings, outlets, investors or
 *    programmes anywhere here, and none may be added. Where the roadshow tiers
 *    in `service-lines.ts` do give counts, those are counts of what is
 *    PREPARED under a defined scope, which is a description of the product.
 *
 * 3. No capital-raising language. No placement, solicitation, third-party
 *    marketing, success fees or performance-linked compensation.
 */

/**
 * Investor Roadshows: the shape of a programme, before, during and after.
 *
 * The three phases exist to answer the question the page could not previously
 * answer - "what am I actually buying" - with work rather than adjectives.
 *
 * The "after" phase matters most commercially and is the one most firms leave
 * vague. It is specific here on purpose: a written summary, follow-up actions,
 * communication observations. Every item is something delivered, not something
 * achieved.
 */
export const roadshowPhases = {
  label: "The Shape of a Programme",
  heading: "Before, During and After",
  intro:
    "A roadshow is not the two days in the room. Most of the work sits either side of them, and a programme that skips it arrives unprepared and leaves without a record.",
  phases: [
    {
      key: "before",
      number: "01",
      term: "Before",
      summary: "Preparation, and the decisions that make the meetings worth holding.",
      items: [
        "Corporate narrative review",
        "Meeting materials prepared",
        "Investor audience defined",
        "Management briefing",
        "Scheduling and confirmations",
      ],
    },
    {
      key: "during",
      number: "02",
      term: "During",
      summary: "The programme itself, coordinated day by day rather than left to a diary.",
      items: [
        "One-to-one meetings",
        "A hosted group session",
        "Daily coordination",
        "Selected media activity where included",
      ],
    },
    {
      key: "after",
      number: "03",
      term: "After",
      summary:
        "The record. What was asked, what was said, and what a company should do with it.",
      items: [
        "Written meeting summary",
        "Follow-up actions",
        "Communication observations",
        "Sixty-day follow-up where included",
      ],
    },
  ],
} as const;

/**
 * Media & Arabic: the distinction the whole service rests on.
 *
 * COMPLIANCE: "understood" is a description of communication, not a claim
 * about coverage or sentiment. Do not rewrite this into anything that promises
 * a company will be understood - the sentence says what the work is aimed at,
 * and the honest line elsewhere on that page says who decides the outcome.
 */
export const mediaStrategy = {
  statement: "Being visible and being understood are not the same problem.",
  paragraphs: [
    "Visibility is a question of appearing. Understanding is a question of what a reader can accurately say about a business afterwards, and the second does not follow automatically from the first.",
    "A company that appears often and is read inconsistently has a communication problem that more appearances will not solve. The work starts with what the market should be able to state, and treats placement as the means rather than the objective.",
  ],
} as const;

/**
 * Advisory: five areas, each with what it addresses and what it involves.
 *
 * `executive-preparation` is new and is supported by work the site already
 * describes - meeting preparation on the roadshow page, media readiness on the
 * media page. It is named here as its own area because a company can want it
 * without wanting either of those programmes.
 *
 * COMPLIANCE: `regional-listing` is the highest-risk entry on this page. It
 * describes COMMUNICATION considerations around a listing, never the merits of
 * listing, never a recommendation to list, and never advice on any security.
 * The qualifier in its `involves` list is not optional.
 */
export const advisoryAreas = {
  label: "In Detail",
  heading: "What Advisory Actually Produces",
  intro:
    "Advisory work is written. Each area below results in a document a management team can read, circulate and act on, rather than a conversation that has to be remembered.",
  /* Moved out of `AdvisoryAreas` unchanged, so it can be translated. */
  involvesLabel: "What it involves",
  areas: [
    {
      key: "market-entry",
      number: "01",
      term: "Market Entry Briefings",
      addresses:
        "A company considering the Gulf without a clear picture of how the market differs structurally from its home market.",
      involves: [
        "How business is conducted regionally",
        "Which audiences are relevant, and why",
        "What regional counterparties expect",
        "Where a company's sector currently sits in regional attention",
      ],
    },
    {
      key: "regional-listing",
      number: "02",
      term: "Regional Listing Assessment",
      addresses:
        "How a company's structure, sector and disclosure would be read against regional listing conventions.",
      involves: [
        "Disclosure practice against regional convention",
        "Communication implications of a regional listing",
        "Questions a company should expect to be asked",
        "Not advice on the merits of listing, or on any security",
      ],
    },
    {
      key: "conference-strategy",
      number: "03",
      term: "Conference Strategy",
      addresses:
        "Management time spent at events chosen by reputation rather than by relevance to a specific objective.",
      involves: [
        "Which events suit a given sector and stage",
        "What objective an appearance should serve",
        "Who should be engaged around it",
        "What communication should surround attendance",
      ],
    },
    {
      key: "executive-preparation",
      number: "04",
      term: "Executive Preparation",
      addresses:
        "Leadership presenting the same business differently in a meeting, an interview and on a stage.",
      involves: [
        "Message development and rehearsal",
        "Anticipated questions and difficult ground",
        "Consistency across meetings, media and events",
        "Broadcast readiness where relevant",
      ],
    },
    {
      key: "communication-considerations",
      number: "05",
      term: "Regional Communication Considerations",
      addresses:
        "Disclosure, language and cadence that work at home and do not travel unchanged.",
      involves: [
        "How regional disclosure practice differs",
        "Where Arabic materially changes the requirement",
        "Communication cadence through a regional year",
        "What would need to change to be read consistently",
      ],
    },
  ],
} as const;
