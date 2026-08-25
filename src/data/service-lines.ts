/**
 * ============================================================================
 * SERVICE PAGE CONTENT
 * ============================================================================
 * COMPLIANCE - the rules in the header of `data/what-we-do.ts` apply to every
 * string in this file. Read them before editing.
 *
 * The short version: describe the WORK, never the OUTCOME. Nothing here may
 * promise, forecast or imply investor interest, media coverage, funds raised
 * or any effect on a share price, and nothing may describe compensation that
 * is contingent on any of those.
 *
 * Two strings in this file are VERBATIM client-approved copy and must not be
 * edited, shortened or paraphrased: `mediaArabic.honestLine` and the
 * `notWhatWeDo` block on the roadshows page. They are simultaneously the
 * strongest trust signals on the site and the lines that keep an unlicensed
 * firm on the right side of a regulatory question.
 */

export interface ServicePageContent {
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  lead: string;
  metaDescription: string;
}

/* ---------------------------------------------------------------------------
   01 - Investor Roadshows
   --------------------------------------------------------------------------- */

export const investorRoadshows = {
  slug: "investor-roadshows",
  number: "01",
  title: "Investor Roadshows",
  eyebrow: "What We Do",
  lead: "A structured sequence of one-to-one meetings and a hosted group session with qualified Gulf investors, built around the company's sector and corporate story.",
  metaDescription:
    "Structured investor meeting programmes in Dubai, Abu Dhabi and Riyadh: one-to-one meetings, a hosted group session, briefing pack, post-programme report and 60-day follow-up.",

  intro: {
    label: "The Programme",
    heading: "What a Programme Is",
    paragraphs: [
      "An investor roadshow is a prepared sequence of meetings, not a diary of introductions. Gulf Connect identifies the investors for whom a company's sector and stage are genuinely relevant, prepares both sides, convenes the meetings and reports on what was said.",
      "Preparation is most of the work. The company's story is set out in terms a Gulf audience reads it in, the sector context is written down, and every participant arrives briefed. What follows a meeting is a matter for the parties in it.",
    ],
  },

  format: {
    label: "Format",
    heading: "A Two-Day Programme",
    intro:
      "The standard programme runs across Dubai and Abu Dhabi over two days. It contains:",
    items: [
      {
        term: "Eight to ten one-to-one meetings",
        description:
          "Scheduled across the two cities with qualified investors selected for sector relevance.",
      },
      {
        term: "A hosted group session",
        description: "A luncheon for approximately fifteen to twenty participants.",
      },
      {
        term: "A briefing pack",
        description:
          "Prepared in advance for the company and for participants, covering the sector and the corporate story.",
      },
      {
        term: "A post-programme report",
        description:
          "A written account of the meetings held, who attended and what was discussed.",
      },
      {
        term: "Sixty-day follow-up",
        description:
          "Structured follow-up with participants over the two months after the programme.",
      },
    ],
  },

  tiers: {
    label: "Formats",
    heading: "Four Programme Formats",
    /** Prices are NOT published. The brief routes pricing to enquiry. */
    note: "Scope is agreed in advance and priced as a fixed professional fee. Fees are not published; a programme is quoted against a defined scope.",
    items: [
      {
        name: "Introduction",
        duration: "1 day",
        includes: [
          "One city",
          "Four to five one-to-one meetings",
          "Briefing pack",
          "Post-programme report",
        ],
      },
      {
        name: "Roadshow",
        duration: "2 days",
        includes: [
          "Dubai and Abu Dhabi",
          "Eight to ten one-to-one meetings",
          "Hosted group session",
          "Briefing pack and post-programme report",
          "Sixty-day follow-up",
          "Media work included",
        ],
      },
      {
        name: "Capital Programme",
        duration: "3-4 days",
        includes: [
          "Dubai, Abu Dhabi and Riyadh",
          "Extended meeting schedule",
          "Hosted group session",
          "Briefing pack and post-programme report",
          "Sixty-day follow-up",
          "Media work and owned content included",
        ],
      },
      {
        name: "Conference Wrap",
        duration: "Around a regional conference",
        includes: [
          "Meetings scheduled around an existing conference attendance",
          "Briefing pack",
          "Post-programme report",
        ],
      },
    ],
  },

  media: {
    heading: "Media Included",
    paragraphs: [
      "The two- and three-day formats include media work: the company's story is developed, positioned and pitched to a named list of regional outlets, and owned content is produced around the programme.",
      "That is what separates a Gulf Connect programme from an events schedule. How editorial, paid and owned media are kept separate is set out on the media page.",
    ],
  },

  /**
   * VERBATIM COMPLIANCE COPY. Do not edit.
   *
   * A deliberate block on a sales page. The brief is right that it builds more
   * trust than anything else on the page, but that is not why it is here: it
   * is here because each line is a statement of what an unlicensed firm does
   * not do, and removing any of them changes the regulatory position.
   */
  notWhatWeDo: {
    label: "Boundaries",
    heading: "What We Do Not Do",
    items: [
      "We do not solicit investment.",
      "We do not take success fees.",
      "We do not guarantee outcomes.",
    ],
    note: "Gulf Connect is paid a fixed professional fee for preparing, convening and reporting on a programme. Nothing we are paid is contingent on what follows from it.",
  },

  cta: { label: "Discuss a programme", href: "/contact?enquiry=company" },
} as const;

/* ---------------------------------------------------------------------------
   02 - The Gulf Programme
   --------------------------------------------------------------------------- */

export const gulfProgramme = {
  slug: "gulf-programme",
  number: "02",
  title: "The Gulf Programme",
  eyebrow: "What We Do",
  lead: "A six-month investor communications programme. Continuity rather than a single visit: meetings, content, media cycles and Arabic distribution, run to a calendar and reported on monthly.",
  metaDescription:
    "A six-month investor communications programme across Gulf markets: investor meetings, content production, media pitching cycles, Arabic distribution and monthly written reporting.",

  intro: {
    label: "Continuity",
    heading: "Why Six Months",
    paragraphs: [
      "A single visit produces a set of meetings. A programme sustained over six months produces something a visit cannot: a company that regional investors and journalists have seen more than once, in a consistent form, saying consistent things.",
      "The Gulf Programme is built for that. It runs to a calendar rather than to an announcement cycle, and it is reported in writing every month so the work is visible to the people paying for it.",
    ],
  },

  structure: {
    label: "Structure",
    heading: "What Six Months Contains",
    months: [
      {
        span: "Month 1",
        focus: "Foundation",
        items: [
          "Corporate story and sector positioning set down",
          "Investor and outlet mapping",
          "Programme calendar agreed",
        ],
      },
      {
        span: "Month 2",
        focus: "First cycle",
        items: [
          "First investor meetings",
          "First content pieces produced",
          "Media pitching cycle opens",
        ],
      },
      {
        span: "Month 3",
        focus: "Arabic",
        items: [
          "Certified translation of core materials",
          "Arabic distribution begins",
          "Interview production",
        ],
      },
      {
        span: "Month 4",
        focus: "Programme",
        items: [
          "Hosted group session",
          "Extended meeting schedule",
          "Second media pitching cycle",
        ],
      },
      {
        span: "Month 5",
        focus: "Consolidation",
        items: [
          "Follow-up with participants",
          "Further content production",
          "Regional distribution",
        ],
      },
      {
        span: "Month 6",
        focus: "Review",
        items: [
          "Final meetings",
          "Programme review and written summary",
          "Next-period recommendations",
        ],
      },
    ],
  },

  tiers: {
    label: "Structures",
    heading: "Standard and Premium",
    note: "Both are agreed as a fixed professional fee against a defined scope. Fees are not published.",
    items: [
      {
        name: "Standard",
        includes: [
          "Investor meetings across the six months",
          "Content production to an agreed cadence",
          "One media pitching cycle per quarter",
          "Certified translation of core materials",
          "Monthly written reporting",
        ],
      },
      {
        name: "Premium",
        includes: [
          "Extended meeting schedule across Dubai, Abu Dhabi and Riyadh",
          "Higher content cadence, including video",
          "Media pitching cycle each month",
          "Arabic distribution programme",
          "Hosted group session",
          "Monthly written reporting and a quarterly review",
        ],
      },
    ],
  },

  reporting: {
    label: "Reporting",
    heading: "Measured in Writing, Monthly",
    paragraphs: [
      "Every month the client receives a written report covering the meetings held, the content published and the outlets pitched. It records the work carried out, not an interpretation of its effect.",
      "Clients renew on evidence of work. Saying so plainly signals that we expect to be measured on it.",
    ],
    items: [
      "Meetings held, and with whom",
      "Content published, by format",
      "Outlets pitched, and the status of each",
      "Arabic materials produced and distributed",
    ],
  },

  cta: { label: "Discuss a programme", href: "/contact?enquiry=company" },
} as const;

/* ---------------------------------------------------------------------------
   03 - Media & Arabic Communications
   --------------------------------------------------------------------------- */

export const mediaArabic = {
  slug: "media-arabic-communications",
  number: "03",
  title: "Media & Arabic Communications",
  eyebrow: "What We Do",
  lead: "Regional business media in English and Arabic. Earned, paid and owned kept explicitly separate, with certified financial translation and Arabic-language corporate communication.",
  metaDescription:
    "Regional business media in English and Arabic: earned, paid and owned media kept separate, certified financial translation, Arabic corporate communication and media readiness.",

  whyMedia: {
    label: "Why Media",
    heading: "How the Region Reads a Company",
    paragraphs: [
      "Regional business media are the primary channel through which economic data, market updates and corporate news reach Gulf institutional and private investors. A company that is not present in that channel is read, if at all, through someone else's framing.",
      "Coverage also extends a programme beyond the meeting room, and produces material the client keeps and reuses.",
    ],
  },

  /**
   * The three layers, kept explicitly separate.
   *
   * This separation is a COMPLIANCE REQUIREMENT before it is an explanation.
   * Earned coverage is decided by the publication; paid placement is always
   * disclosed; owned content is ours to produce. Blurring them is precisely
   * the failure the disclosure regime exists to prevent - do not merge these
   * into a single "media services" block.
   */
  layers: {
    label: "Three Layers",
    heading: "Earned, Paid and Owned",
    items: [
      {
        key: "earned",
        name: "Earned",
        summary: "Editorial coverage, decided by the publication.",
        description:
          "We develop the story, position it for a specific audience and pitch it to a named list of regional outlets. Whether it runs, when it runs and in what form is decided by the editor, and by nobody else.",
      },
      {
        key: "paid",
        name: "Paid",
        summary: "Sponsored placement, always disclosed.",
        description:
          "Where a paid placement is appropriate it is identified as such to the reader, and invoiced at media cost plus a stated fee. A paid placement is never presented as editorial.",
      },
      {
        key: "owned",
        name: "Owned",
        summary: "Content we produce, that the client keeps.",
        description:
          "Interviews, film and written material produced by Gulf Connect and handed to the client to reuse and distribute. This is an asset the company owns rather than a placement it rents.",
      },
    ],
  },

  /**
   * Regional reach, for the market map.
   *
   * COMPLIANCE. Two denials have to survive any edit to this block.
   *
   * The map places six markets at their true coordinates, and a located dot is
   * the easiest thing on this site to misread as a bureau or a masthead the
   * firm controls. So `disclaimer` denies offices, registrations AND media
   * relationships, and it states that no coverage is guaranteed - the same
   * point `honestLine` makes below, kept beside the picture that might
   * otherwise imply the opposite.
   *
   * The second paragraph must keep "decided by their editors". A map of
   * markets next to a promise of reach is precisely the combination this firm
   * may not publish.
   */
  reach: {
    label: "Regional Reach",
    heading: "Six Markets, Two Languages",
    paragraphs: [
      "A Gulf media programme is not one audience. Each market has its own business press, its own conventions for what a listed company says in public, and its own balance between English and Arabic readership.",
      "We develop a story, position it for the markets where it is relevant and pitch it to a named list of outlets in both languages. Which of them run it, and when, is decided by their editors.",
    ],
    selectorLabel: "Markets covered",
    disclaimer:
      "Market orientation shown for reference. It does not represent offices, registrations or media relationships in any jurisdiction, and no coverage in any market is guaranteed.",
  },

  arabic: {
    label: "Arabic",
    heading: "Arabic Is Not an Afterthought",
    paragraphs: [
      "Almost no international small or mid-cap company publishes or appears in Arabic. For a firm addressing Gulf audiences that is the clearest gap there is, and closing it is a discipline rather than a translation task.",
      "A general translation agency is not adequate for a listed company's disclosure. Terminology carries specific meaning in a regulatory context, and a term rendered loosely in Arabic can say something the English original does not. Gulf Connect works with certified financial translation and reviews terminology against the company's own reporting.",
    ],
    items: [
      "Certified financial translation",
      "Arabic-language corporate communication",
      "Terminology review against the company's reporting",
      "Regional Arabic distribution",
    ],
  },

  readiness: {
    label: "Readiness",
    heading: "Prepared, Not Merely Booked",
    paragraphs: [
      "An interview is only as good as the preparation behind it. Media readiness covers briefing on the outlet and the journalist, rehearsal of the difficult questions, and broadcast preparation where the format calls for it.",
      "The intention is to raise the standard a company appears at, not simply to secure a slot in a schedule.",
    ],
    items: ["Media briefing", "Interview preparation", "Broadcast readiness"],
  },

  /**
   * VERBATIM CLIENT-APPROVED COPY. MANDATORY. DO NOT EDIT.
   *
   * Reproduced exactly as supplied, including the em dash. It is both a
   * compliance line and, per the brief, the strongest trust signal on the
   * site. Do not shorten it, do not split it across elements, and do not
   * paraphrase it into house voice.
   */
  honestLine:
    "Editorial coverage is decided by the publication, never by us. We are paid for the work of developing, positioning and pitching your story — not for the outcome. Be sceptical of any firm that tells you otherwise.",

  cta: { label: "Discuss a programme", href: "/contact?enquiry=company" },
} as const;

/* ---------------------------------------------------------------------------
   04 - Advisory
   --------------------------------------------------------------------------- */

export const advisory = {
  slug: "advisory",
  number: "04",
  title: "Advisory",
  eyebrow: "What We Do",
  lead: "Briefings on how a company would be read in Gulf markets: regional listing assessment, market-entry considerations and conference strategy.",
  metaDescription:
    "Regional listing assessment, Gulf market-entry briefings, conference strategy and regional communication considerations for international listed companies.",

  intro: {
    label: "Advisory",
    heading: "Before a Programme, a View",
    paragraphs: [
      "Not every company that looks at the Gulf should run a programme in it, and the ones that should do not all need the same one. Advisory work is the assessment that comes first.",
      "It is written work: a considered view of how a company would be read in the region, which questions it should expect, and what would need to be in place before it presents itself. Gulf Connect does not make investment recommendations and does not advise on the merits of any security.",
    ],
  },

  areas: {
    label: "Areas",
    heading: "What Advisory Covers",
    items: [
      {
        term: "Regional listing assessment",
        description:
          "How a company's structure, sector and disclosure would be read against regional listing conventions, and what a regional listing would involve in practice.",
      },
      {
        term: "Gulf market-entry briefings",
        description:
          "A written briefing on the market a company is considering: how business is conducted, who the relevant audiences are and what regional counterparties will expect.",
      },
      {
        term: "Conference strategy",
        description:
          "Which regional conferences are worth attending for a given sector and stage, what to prepare for each, and how to use the surrounding days.",
      },
      {
        term: "Regional communication considerations",
        description:
          "How disclosure, language and cadence differ in the region, and what a company would need to change to be understood consistently.",
      },
    ],
  },

  cta: { label: "Discuss a programme", href: "/contact?enquiry=company" },
} as const;
