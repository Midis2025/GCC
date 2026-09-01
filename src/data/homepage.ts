/**
 * Homepage narrative content.
 *
 * All copy is original. It contains no claims about network size, client
 * counts, years of experience, offices, awards, regulatory status or results.
 */

/**
 * The hero.
 *
 * Two paths, visible together. The site serves companies who pay and investors
 * who are the asset being built, and the brief's single most important
 * structural point is that it fails if it only serves one - so neither button
 * is subordinate to the other beyond the primary/outline distinction the
 * design system already draws.
 *
 * COMPLIANCE: the headline is the compliant formulation - we CONNECT companies
 * with capital, partners and media. It does not say we raise capital, find
 * investors who will invest, or secure coverage, and it must not be rewritten
 * into anything that does.
 *
 * The subline names the three sectors and the three cities. Specifics rather
 * than adjectives is the register the whole site is written in.
 */
export const heroContent = {
  eyebrow: "Gulf Capital / Gulf Partners / Gulf Media",
  headline: "We Connect International Companies With Gulf Capital, Partners and Media.",
  /**
   * The same headline, broken for the line-by-line reveal in the hero.
   * Presentation only - the phrasing must stay identical to `headline`, which
   * remains the single source for metadata and any non-animated rendering.
   */
  headlineLines: [
    "We Connect International",
    "Companies With Gulf Capital,",
    "Partners and Media.",
  ],
  /**
   * The one word of the headline set in bronze. Presentation only - it is a
   * suffix of the last authored line, so `headline` remains the single source
   * for metadata and the H1 stays one uninterrupted string.
   */
  headlineAccent: "Media.",
  supporting:
    "Critical minerals, AI and data infrastructure, and life sciences - convened across Dubai, Abu Dhabi and Riyadh.",
  /** One path per audience. Companies first; investors are not an afterthought. */
  primaryCta: { label: "For companies", href: "/what-we-do" },
  secondaryCta: { label: "For investors", href: "/for-investors" },
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
  label: "Dubai / Gulf / Global Markets",
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

/**
 * Hero standing bar.
 *
 * CONTENT INTEGRITY. Same rule as `orientationContent`: the only figure
 * permitted here is a count of something named elsewhere on this site. "06" is
 * the six markets listed in `gulfMarkets` and nothing more.
 *
 * The second slot was specified as "100+ Investor Networks". It is deliberately
 * NOT rendered that way. A network-size figure is exactly the class of claim
 * this site is built to avoid - it is unverifiable, none has been supplied, and
 * in a hero standing bar it reads as a track record. `Global` states the same
 * reach without asserting a quantity. If Gulf Connect supplies a substantiated figure,
 * this is the one line to change.
 */
export const heroStats = [
  {
    figure: "06",
    label: "Gulf Markets",
    note: "Deep regional coverage",
    mark: "markets",
  },
  {
    figure: "Global",
    label: "Investor Networks",
    /**
     * Specified as "Institutional relationships across the globe". Reworded:
     * an investor relationship is precisely what `outreachContent.disclaimer`
     * states this site does not claim, in any jurisdiction. Reach can be
     * described; relationships cannot.
     */
    note: "Reach across international investor audiences",
    mark: "network",
  },
  {
    figure: "Cross-Border",
    label: "Engagement",
    note: "Connecting companies with the right capital",
    mark: "engagement",
  },
  {
    figure: "Strategic",
    label: "Communication",
    /** Specified as "market impact". Reworded: a result, and unverifiable. */
    note: "Clarity, relevance and consistency",
    mark: "communication",
  },
] as const;

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
  /*
    The supporting line beside the heading.

    It was written inline in `Approach`, which was tenable while the component
    rendered in one language. It renders on What We Do as well as here, so it
    is content and it belongs in a content module. MOVED, NOT REWRITTEN: same
    two sentences, same wording.
  */
  intro:
    "Five stages, run in sequence and then revisited. The last one is what keeps a programme from hardening into a script.",
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
      /*
        COMPLIANCE. "Communication channels", not "channels", and "relevant
        investors", not "investors". A stage headed "Target" sitting next to a
        bare list of investors reads as identifying people to raise money from;
        what it describes is selecting an audience to communicate with. The
        word the sentence turns on is the one that says so.
      */
      description:
        "Identify relevant investors, market participants and communication channels appropriate to the mandate.",
    },
    {
      number: "04",
      title: "Engage",
      /*
        COMPLIANCE. "Communications", not "outreach". This firm is not
        licensed to solicit, and "execute outreach" to investors is the phrase
        that most easily reads as solicitation. The activity is communication
        and structured meetings, and the noun now says which.
      */
      description: "Execute coordinated investor, media and digital communications.",
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
  label: "Why Gulf Connect",
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
       * until Gulf Connect confirms the operating model supports that claim. Neutral,
       * verifiable label used in the meantime.
       */
      title: "Disciplined Execution",
      description:
        "Programmes run to a defined standard, with preparation and follow-up treated as part of the work.",
    },
  ],
} as const;

/**
 * Who the practice is built for.
 *
 * Every entry has to be traceable to copy the client has already approved -
 * this is a claim about who the firm serves, and an unsupported category here
 * invents an audience.
 *
 * Three of the originals were dropped for exactly that reason. "Private
 * Companies" and "Pre-IPO Businesses" contradict the launch positioning, which
 * is international LISTED small and mid-cap companies; "Growth Companies"
 * appears nowhere in the approved material and means whatever a reader wants
 * it to. They are replaced by the three sectors the brief names, so the panel
 * count and the mosaic layout are unchanged.
 *
 * Sources, entry by entry:
 * - Listed small and mid-cap: `home.whyGulfNow`, "International small and
 *   mid-cap companies working in exactly those sectors".
 * - The three sectors: `home.homeHero.lead` and `whyGulfNow.sectors`.
 * - International companies entering the Gulf: `whyGulfNow`, "too far away to
 *   build the relationships themselves".
 * - Leadership and IR teams: `about.aboutHowWeWork`, "Working alongside
 *   existing IR, finance and communications teams".
 *
 * CONTENT INTEGRITY: `note` stays visible in every layout. These are the
 * audiences the practice is built for, and the section must never be readable
 * as a list of companies the firm has worked with.
 */
export const audienceContent = {
  label: "Who We Work With",
  heading: "Selected Markets",
  note: "The audiences and sectors this practice is built for. Not a client list.",
  /*
    Each label names its own photograph.

    Order used to decide the pairing, because `Segments` read
    `segmentPhotos[index]`. That made the two things impossible to edit
    independently: re-cutting the labels to the launch positioning put
    "Critical Minerals" over a desk meeting and "Life Sciences" over the Riyadh
    skyline, and correcting it meant sequencing the labels against the pictures
    rather than against the argument.

    Naming the frame ends that. The order below is now free to be editorial -
    the primary audience first, the three sectors together, the two remaining
    audiences after - and `international` sits last because the mosaic's final
    cell is a full-width letterbox that only a skyline survives.
  */
  segments: [
    { label: "Listed Small and Mid-Cap Companies", photo: "listed" },
    { label: "Leadership and IR Teams", photo: "leadership" },
    { label: "AI and Data Infrastructure", photo: "aiInfrastructure" },
    { label: "Critical Minerals", photo: "criticalMinerals" },
    { label: "Life Sciences", photo: "lifeSciences" },
    { label: "International Companies Entering the Gulf", photo: "international" },
  ],
} as const;

export const ctaContent = {
  heading: "Start a Conversation",
  supporting:
    "For companies seeking stronger investor visibility and strategic communications across Gulf and international markets.",
  cta: { label: "Contact Gulf Connect", href: "/contact" },
} as const;
