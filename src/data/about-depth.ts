/**
 * ============================================================================
 * ABOUT — THE DEEPER SECTIONS
 * ============================================================================
 * Two additions to the About page: what communication is for, and what sits
 * around the meetings a programme is usually judged by.
 *
 * ---------------------------------------------------------------------------
 * COMPLIANCE. The About page is where a firm is most tempted to describe the
 * good its work does, and the temptation has to be resisted sentence by
 * sentence. Two rules:
 *
 * 1. `communicationEffects` describes what COMMUNICATION does, never what
 *    Gulf Connect achieves for a client. "Clarifies what the business is" is a
 *    statement about clarity; "clarifies the market's view of your business"
 *    would be a claim about an effect on third parties. The difference is the
 *    whole section.
 *
 * 2. `workBehindTheRoom` names work performed. No item is a result, and the
 *    section exists precisely to make the point that the visible part of a
 *    programme is not the whole of it - which is an argument about scope, not
 *    about outcome.
 */

/**
 * What good communication does.
 *
 * Four verbs, deliberately intransitive in effect: each describes a property
 * of the communication rather than a change it produces in a market. Read them
 * against the rule above before editing any of them.
 */
export const communicationEffects = {
  label: "Why It Matters",
  heading: "What Good Communication Does",
  intro:
    "Communication is not decoration on a business; it is how a business is understood by people who will never see the inside of it. Four things separate the kind that works from the kind that fills a calendar.",
  effects: [
    {
      number: "01",
      term: "Clarifies",
      description:
        "What the business is, what it does and where it is going - stated the same way whether a reader has five minutes or an afternoon.",
    },
    {
      number: "02",
      term: "Connects",
      description:
        "Corporate strategy to the audiences for whom it is actually relevant, rather than to whoever happens to be available.",
    },
    {
      number: "03",
      term: "Reinforces",
      description:
        "One account of the business across meetings, media and a company's own channels, so the three do not quietly contradict each other.",
    },
    {
      number: "04",
      term: "Compounds",
      description:
        "Understanding through repetition. A market that has encountered a company four times reads the fifth encounter differently from the first.",
    },
  ],
} as const;

/**
 * The work behind the room.
 *
 * The point of the section: a programme is usually judged by the meetings,
 * and the meetings are the smallest part of it. Three columns of work, no
 * claims about what any of it produces.
 */
export const workBehindTheRoom = {
  label: "The Work",
  heading: "A Meeting Is the Visible Part",
  intro:
    "An engagement is remembered as a set of meetings. Most of what determines whether those meetings are worth holding happens before anyone sits down, and most of what makes them useful afterwards happens once everyone has left.",
  stages: [
    {
      key: "before",
      term: "Before",
      items: ["Research", "Narrative", "Materials", "Preparation"],
    },
    {
      key: "in-the-room",
      term: "In the Room",
      items: ["Structured discussion", "Management communication", "Relevant questions"],
    },
    {
      key: "after",
      term: "After",
      items: ["Follow-up", "Written reporting", "Content", "Refinement"],
    },
  ],
} as const;
