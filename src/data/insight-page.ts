/**
 * ============================================================================
 * INSIGHT — THE PAGE
 * ============================================================================
 * Standing content for the Insight page: what each format is, what it may
 * cover, and how the library sits inside the rest of the business.
 *
 * The page has no published items and may not pretend otherwise. Everything
 * below is therefore STANDING content - descriptions of recurring formats and
 * of editorial territory - never an article, a date, an author or a headline
 * presented as something already written.
 *
 * ---------------------------------------------------------------------------
 * COMPLIANCE. This is content ABOUT content for a professional investor
 * audience, which puts it under the strictest reading of the rules in
 * `data/what-we-do.ts`. Four that bite here:
 *
 * 1. NOTHING is a recommendation, a rating, a price view or a forecast. The
 *    formats provide context; they do not advise. Where a format could be
 *    mistaken for research, it carries its own standing qualifier and that
 *    qualifier is not decoration.
 *
 * 2. `editorialThemes` are QUESTIONS AND SUBJECTS, never article titles. They
 *    are labelled as themes rather than published work at the point of use,
 *    and must never acquire a date, an author or a link.
 *
 * 3. NOTHING claims an outcome. Insight is not said to produce coverage,
 *    interest, meetings or capital.
 *
 * 4. The Arabic section is FORWARD-LOOKING and must stay conditional. There is
 *    no Arabic edition; saying the architecture supports one is a statement
 *    about the system, and it must not become a claim that one exists.
 */

/**
 * Context before commentary. The page's opening position.
 */
export const insightPosition = {
  label: "The Position",
  heading: "Context Before Commentary",
  paragraphs: [
    "The Insight formats are built to provide context around Gulf capital markets, the sectors covered and the companies operating within them. The emphasis is on structured information, recurring formats and useful market perspective rather than investment recommendations or security-specific calls.",
    "The objective is to help professional audiences understand the themes, businesses and regional developments shaping conversations across the Gulf.",
  ],
} as const;

/**
 * The sectors the library follows. Not a closed list - see the intro.
 *
 * COMPLIANCE: each `covers` list is SUBJECT MATTER. "Supply chains" is a
 * topic; "a company's supply-chain advantage" would be a view. The standing
 * qualifier under the panels says the coverage is contextual, not advisory.
 *
 * The set is not closed. These are the sectors followed today; the intro says
 * so in as many words, and a sector may be added without the section changing
 * shape - it is a list, not a fixed composition.
 */
export const insightSectors = {
  label: "Territory",
  heading: "What We Follow",
  intro:
    "Sectors followed consistently rather than covered occasionally. A reader who follows one of them should find the material worth their time. The list below is where the coverage sits today, not the limit of what it can cover.",
  sectors: [
    {
      key: "energy",
      name: "Energy",
      covers: [
        "Production and generation",
        "Transition projects",
        "Power infrastructure",
        "Corporate development",
        "International issuers",
      ],
    },
    {
      key: "mining",
      name: "Mining",
      covers: [
        "Resource development",
        "Development projects",
        "Supply chains",
        "Strategic materials",
        "International issuers",
      ],
    },
    {
      key: "pharmaceuticals",
      name: "Pharmaceuticals",
      covers: [
        "Clinical pipelines",
        "Healthcare innovation",
        "Medical technology",
        "Research",
        "International corporate development",
      ],
    },
    {
      key: "data-centres",
      name: "Data Centres",
      covers: [
        "Data centres",
        "Compute infrastructure",
        "Power requirements",
        "Digital infrastructure",
        "AI deployment",
      ],
    },
  ],
  disclaimer:
    "Coverage is contextual. It is not investment research, a recommendation, or advice on any security.",
} as const;

/**
 * ============================================================================
 * MENA'S DIGITAL NEWS
 * ============================================================================
 * The daily feed, and the one format that does not live on this site.
 *
 * ---------------------------------------------------------------------------
 * AWAITING CLIENT CONFIRMATION
 * ---------------------------------------------------------------------------
 * The brief marks this item "Speak to Peter", so the wording and the
 * destination are both still open. Everything a change would touch is in this
 * one object - the description, the CTA label and the channel URL - and the
 * section that renders it reads all three from here. Changing the link later
 * is a one-line edit in this file and nothing else.
 *
 * `channelHref` is the WhatsApp group supplied with the brief. If it is
 * cleared, `MenasDigitalNewsSection` renders the format without a call to
 * action rather than a button that goes nowhere.
 *
 * ---------------------------------------------------------------------------
 * COMPLIANCE. A news feed, and described as one. It carries developments and
 * context; it does not carry recommendations, price views or forecasts, and
 * the standing qualifier below says so in the same place every other format's
 * does.
 */
export const menasDigitalNewsDetail = {
  subline:
    "A daily digital news feed covering relevant developments across Gulf markets and Gulf Connect's core sectors.",
  paragraphs: [
    "The shortest of the formats and the most frequent: a daily read for people who follow the region continuously rather than in quarters.",
  ],
  /* Moved out of the format section's JSX unchanged, so it can translate. */
  coversLabel: "What it may cover",
  covers: [
    "Gulf market developments",
    "Energy",
    "Mining",
    "Pharmaceuticals",
    "Data centres",
    "Regional business news",
    "International companies in Gulf conversations",
  ],
  /* COMPLIANCE. Standing qualifier, as every other format carries. */
  note: "A news feed — not investment recommendations.",
  cta: {
    label: "Join MENA's Digital News",
    /** TODO: confirm with the client before launch. WhatsApp channel. */
    href: "https://chat.whatsapp.com/Im5OKXVMWDjAeFaO0xiDTG",
    /** Set beside the button so nobody is surprised by where it goes. */
    note: "The feed is distributed on WhatsApp. The link opens outside this site.",
  },
} as const;

/** The Gulf Brief, in full. */
export const gulfBriefDetail = {
  subline: "Fortnightly written context on Gulf capital markets and the sectors we follow.",
  paragraphs: [
    "Short enough to read in the time between two meetings, and written to be useful to someone who follows the region rather than to someone encountering it for the first time.",
  ],
  /* Moved out of the format section's JSX unchanged, so it can translate. */
  coversLabel: "What it may cover",
  covers: [
    "Regional market developments",
    "Sector news",
    "Corporate communication themes",
    "Gulf business context",
    "Relevant market structure",
    "International companies entering Gulf conversations",
  ],
  /* COMPLIANCE. Standing qualifier. Not a footnote and not collapsible. */
  note: "Commentary only — not investment recommendations.",
} as const;

/**
 * Editorial themes.
 *
 * COMPLIANCE: these are SUBJECTS the library may examine. They are not
 * articles, they carry no date, author or link, and the section that renders
 * them labels them as themes rather than published research. Do not let them
 * drift into headlines.
 */
export const editorialThemes = {
  label: "Territory",
  heading: "Topics We May Explore",
  note: "Editorial themes, not published research.",
  themes: [
    {
      title: "How Gulf institutions assess international growth companies",
      tag: "Market structure",
    },
    {
      title: "Why Arabic-language communication matters in regional markets",
      tag: "Communication",
    },
    {
      title: "The role of infrastructure in AI and data-centre expansion",
      tag: "Data centres",
    },
    {
      title: "Mineral supply chains and Gulf industrial strategy",
      tag: "Mining",
    },
    {
      title: "What international issuers often misunderstand about Gulf market engagement",
      tag: "Market entry",
    },
    {
      title: "How media, meetings and digital communication reinforce one another",
      tag: "Communication",
    },
  ],
} as const;

/** Five Questions: the fixed interview structure. */
export const fiveQuestionsDetail = {
  subline:
    "A consistent executive interview format designed to make company stories easier to follow.",
  areas: [
    { term: "The Business" },
    { term: "The Strategy" },
    { term: "The Market" },
    { term: "Execution" },
    { term: "What Comes Next" },
  ],
  /* COMPLIANCE. The format is a structure for a conversation, not analysis. */
  note: "An interview format. Not investment analysis.",
  consistency: {
    heading: "Consistency Makes Comparison Easier",
    paragraphs: [
      "Using the same broad question areas across interviews gives viewers a familiar structure.",
      "The format keeps the focus on the business, strategy, execution and context rather than on promotional language.",
    ],
  },
} as const;

/** Sector Notes: the research-shaped format. */
export const sectorNotesDetail = {
  subline: "Longer-form written briefings on sectors relevant to Gulf capital markets.",
  examinesLabel: "What a note may examine",
  categoriesLabel: "Sample topic categories",
  examines: [
    "Market structure",
    "Regional relevance",
    "Infrastructure",
    "Supply chains",
    "Regulatory context where appropriate",
    "Corporate themes",
    "Sector development",
  ],
  /* Sample TOPIC CATEGORIES, not report titles. */
  categories: ["Energy", "Mining", "Pharmaceuticals", "Data Centres"],
  note: "Informational briefings. Not security recommendations.",
  gated: {
    heading: "Some Briefings Are Available by Registration",
    paragraph:
      "Selected longer-form content may be available to registered professional audiences. Registration helps Gulf Connect understand sector interests and distribute relevant material appropriately.",
    cta: { label: "Join the list", href: "/for-investors#register" },
  },
} as const;

/** From the Room: the programme film format. */
export const fromTheRoomDetail = {
  subline: "Short films and programme content captured around Gulf Connect engagements.",
  /* COMPLIANCE: environment and discussion, never outcome. */
  showsLabel: "What it can show",
  shows: [
    "Programme environment",
    "Management communication",
    "Discussion themes",
    "Regional context",
    "Event setting",
  ],
} as const;

/**
 * How Insight connects to the rest of the business.
 *
 * COMPLIANCE: "extends the conversation" and "provide continuity" describe
 * what the content does. Nothing here says the content produces coverage,
 * interest, meetings or capital.
 */
export const insightSystem = {
  label: "The System",
  heading: "Insight Is Part of the Communication System",
  paragraphs: [
    "Insight extends the conversation beyond a single meeting or media appearance. Recurring formats provide continuity, give audiences useful context and create reusable communication around the sectors and companies Gulf Connect works with.",
  ],
  nodes: [
    { key: "roadshows", term: "Investor Roadshows", href: "/what-we-do/investor-roadshows" },
    { key: "programme", term: "The Gulf Programme", href: "/what-we-do/gulf-programme" },
    { key: "media", term: "Media & Arabic", href: "/what-we-do/media-arabic-communications" },
    { key: "briefings", term: "Investor Briefings", href: "/for-investors" },
  ],
} as const;

/**
 * English and Arabic.
 *
 * COMPLIANCE: strictly forward-looking and strictly conditional. There is no
 * Arabic edition of this site. "Should support" is a statement about the
 * content architecture - which is true, `InsightItem.language` exists - and
 * must never be edited into a claim that Arabic content is available.
 */
export const bilingualIntent = {
  label: "Language",
  heading: "Built for English and Arabic Communication",
  paragraph:
    "The Insight architecture supports English-language publishing at launch, and Arabic-language content when the approved Arabic programme is introduced.",
  english: "English",
  arabic: "العربية",
  note: "No Arabic edition is published at present.",
} as const;

/** The four editorial principles. */
export const editorialPrinciples = {
  label: "Standards",
  heading: "How We Approach Insight",
  principles: [
    {
      term: "Specific",
      description: "Named sectors, markets and themes rather than generic commentary.",
    },
    {
      term: "Structured",
      description: "Recurring formats with a clear purpose and a stated cadence.",
    },
    {
      term: "Relevant",
      description: "Content designed for professional Gulf audiences.",
    },
    {
      term: "Compliant",
      description:
        "No investment recommendations, no security-price forecasts and no undisclosed client relationships.",
    },
  ],
} as const;

/** The closing call to action. */
export const insightCta = {
  label: "Register",
  heading: "Receive Gulf Connect Insight",
  paragraph:
    "Join the investor list for relevant briefings, The Gulf Brief, selected Sector Notes and new Five Questions interviews.",
  primary: { label: "Join the list", href: "/for-investors#register" },
  secondary: { label: "For Investors", href: "/for-investors" },
} as const;
