/**
 * ============================================================================
 * FOR INVESTORS — THE DEEPER SECTIONS
 * ============================================================================
 * Content that gives a professional investor a reason to register beyond the
 * form itself: what the coverage is actually about, and what happens after a
 * registration is made.
 *
 * ---------------------------------------------------------------------------
 * COMPLIANCE. This file addresses INVESTORS, which makes it the highest-risk
 * copy on the site. Four rules, and none of them is negotiable:
 *
 * 1. NOTHING here is a recommendation, a rating or an opinion on any security.
 *    The sectors below describe what the coverage is ABOUT. They do not
 *    analyse, compare or favour anything, and `coverage.disclaimer` says so in
 *    standing text that must stay visible.
 *
 * 2. NOTHING promises an invitation. Registration puts a reader on a list;
 *    participation in any given briefing remains subject to suitability and
 *    capacity, and step 05 says exactly that. Do not soften it into a
 *    guarantee by removing the qualification.
 *
 * 3. NOTHING is a figure. No count of registrants, briefings, companies or
 *    sessions appears here and none may be added - the only numbers are
 *    ordinals in the sequence.
 *
 * 4. NOTHING solicits. The firm is not paid by investors, does not solicit
 *    investment and does not make recommendations - which the page already
 *    states above these sections and which nothing here may contradict.
 */

/**
 * The sectors the coverage concerns.
 *
 * Each `focus` list names subject matter, not companies and not positions.
 * "Supply chains" is a topic; "a company's supply-chain advantage" would be a
 * view, and the difference is the whole compliance position of this section.
 *
 * ---------------------------------------------------------------------------
 * EXAMPLES OF BREADTH, NOT A BOUNDARY
 * ---------------------------------------------------------------------------
 * This list used to open with "The focus is deliberately narrow". It no longer
 * does, and that is a client-directed change of position rather than a change
 * of wording: the consultancy works across sectors, and these four are where
 * the coverage sits today. The intro says so, so that adding a fifth is an
 * entry in an array rather than a contradiction of the paragraph above it.
 */
export const coverage = {
  label: "What We Cover",
  heading: "Sectors We Cover",
  intro:
    "Briefings and written content are published across sectors, currently concentrating on energy, mining, pharmaceuticals and data centres. A reader who follows one of them should find the coverage worth their time, rather than finding a little of everything - and the list grows with the businesses the practice works with.",
  sectors: [
    {
      key: "energy",
      name: "Energy",
      description:
        "Production, generation and the transition projects reshaping both. Coverage follows project development, corporate updates and the infrastructure the sector depends on.",
      focus: ["Production and generation", "Transition projects", "Power infrastructure", "Project development"],
    },
    {
      key: "mining",
      name: "Mining",
      description:
        "Resource development and the materials underpinning energy transition and industrial supply. Coverage follows project development, corporate updates and the structure of the supply chains involved.",
      focus: ["Resource development", "Strategic materials", "Supply chains", "Project development"],
    },
    {
      key: "pharmaceuticals",
      name: "Pharmaceuticals",
      description:
        "Healthcare innovation, biotechnology and medical technology, with attention to corporate development and to how companies in the sector approach international markets.",
      focus: ["Healthcare innovation", "Biotechnology", "Medical technology", "International activity"],
    },
    {
      key: "data-centres",
      name: "Data Centres",
      description:
        "The physical layer beneath artificial intelligence: data centres, compute capacity and the power and connectivity they depend on, alongside the corporate development of the companies building it.",
      focus: ["Data centres", "Compute capacity", "Power requirements", "Digital infrastructure"],
    },
  ],
  /*
   * CONTENT INTEGRITY. Standing text, not a footnote, and not collapsible.
   * Three sector panels on a page addressed to investors is the single easiest
   * arrangement on this site to mistake for research coverage with a view.
   */
  disclaimer:
    "Content is informational and is published for context. It is not investment research, a recommendation, or advice on any security.",
} as const;

/**
 * How a briefing actually reaches a registrant.
 *
 * Written as a process rather than as an offer, and step 05 is the reason the
 * section can exist at all: it states plainly that registration does not
 * entitle anyone to every session. Removing or softening that step would turn
 * an honest description into a promise the firm cannot keep.
 */
export const briefingProcess = {
  label: "How Briefings Work",
  heading: "From Registration to the Room",
  steps: [
    {
      term: "Join the invitation list",
      description:
        "Registration is free and takes a minute. The category and sectors selected determine what is sent.",
    },
    {
      term: "Briefings are announced",
      description:
        "When a session is scheduled, it is communicated to the registrants for whom the company, sector and format are relevant.",
    },
    {
      term: "You select what interests you",
      description:
        "Invitations are not obligations. A registrant indicates which sessions they would like to attend, and ignores the rest.",
    },
    {
      term: "Material is provided",
      description:
        "Company and background material is circulated ahead of a session, so the discussion starts from a shared base rather than an introduction.",
    },
    {
      term: "Participation is confirmed",
      /*
       * COMPLIANCE. The load-bearing sentence in this file. Registration puts
       * a reader on a list; it does not entitle them to any given session. Do
       * not remove the qualification to make the step read more warmly.
       */
      description:
        "Attendance remains subject to the suitability of the session and to capacity. Registration places you on the list; it does not guarantee a place at every briefing.",
    },
  ],
} as const;
