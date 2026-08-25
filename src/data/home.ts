/**
 * ============================================================================
 * HOME
 * ============================================================================
 * A two-sided page. The site serves companies who pay and investors who are
 * the asset being built, and it fails if it only serves one - so both paths are
 * visible from the hero rather than one being buried behind the other.
 *
 * COMPLIANCE: the rules in `data/what-we-do.ts` apply to every string here.
 * Nothing on this page may read as capital raising, as an offer or
 * solicitation, or as a promise of coverage, interest or outcome. The
 * positioning line is the compliant formulation from the brief and should not
 * be "improved" into something punchier.
 */

export const homeHero = {
  eyebrow: "Gulf Connect",
  title: "We Connect International Companies With Gulf Capital, Partners and Media.",
  lead: "Critical minerals, AI and data infrastructure, and life sciences - convened across Dubai, Abu Dhabi and Riyadh.",
  actions: {
    company: { label: "For companies", href: "/what-we-do" },
    investor: { label: "For investors", href: "/for-investors" },
  },
} as const;

/**
 * The three things the firm does, in the order it does them.
 *
 * Convene, Place, Produce. Each is a verb about work performed, which is the
 * distinction the whole site turns on - "convene qualified investors for
 * structured meetings" describes an activity, "connect you with investors who
 * will invest" describes an outcome nobody can promise.
 */
export const proposition = {
  label: "What We Do",
  heading: "Convene, Place, Produce",
  /*
   * The line under the heading in the sticky column. It counts the entries and
   * says nothing about what they achieve - three verbs describing work, which
   * is the same discipline the entries themselves are written under.
   */
  intro: "Three kinds of work, and every engagement is some combination of them.",
  items: [
    {
      number: "01",
      term: "Convene",
      /* The line mark drawn beside this entry. See `PillarSequence`. */
      mark: "convene",
      description:
        "Curated investor meetings across Dubai, Abu Dhabi and Riyadh. We identify the investors for whom a company's sector and stage are relevant, prepare both sides and stage the meetings.",
    },
    {
      number: "02",
      term: "Place",
      mark: "place",
      description:
        "We develop, position and pitch your story to a named list of regional business media, in English and in Arabic. Editorial coverage is decided by the publication; the work we are paid for is the pitch.",
    },
    {
      number: "03",
      term: "Produce",
      mark: "produce",
      description:
        "Interviews, film and written material produced around a programme and handed to the client. Content you keep, reuse and distribute rather than rent.",
    },
  ],
} as const;

/**
 * Why the Gulf, why now.
 *
 * The structural point and nothing more. No market forecasts, no figures that
 * cannot be sourced, no claim about the size or direction of any pool of
 * capital - the argument is about a missing route, which is observable, rather
 * than about an opportunity, which would be a projection.
 */
export const whyGulfNow = {
  label: "The Opportunity",
  heading: "A Route That Does Not Exist Yet",
  paragraphs: [
    "Gulf capital has appetite for hard assets: critical minerals, the energy transition, digital infrastructure, healthcare and life sciences. Those are the sectors regional institutions, family offices and sovereign-linked capital are actively looking at.",
    "International small and mid-cap companies working in exactly those sectors have no structured route to that audience. They are too small for the banks that convene these meetings and too far away to build the relationships themselves. That gap is the reason this firm exists.",
  ],
  sectors: [
    "Hard assets",
    "Critical minerals",
    "Energy transition",
    "Digital infrastructure",
    "Healthcare and life sciences",
  ],
} as const;

/**
 * The Arabic gap.
 *
 * On the home page rather than buried in a service page, because it is the
 * clearest differentiator the firm has. Kept to a single block: the point is
 * one observation, and elaborating it here would take room from the fact that
 * almost nobody else does this.
 */
export const arabicGap = {
  label: "The Arabic Gap",
  statement:
    "Almost no international small or mid-cap company publishes or appears in Arabic. We do.",
  paragraph:
    "Certified financial translation, Arabic-language corporate communication and regional distribution. A general translation agency is not adequate for a listed company's disclosure, and terminology carries specific meaning in a regulatory context.",
  cta: { label: "Media & Arabic Communications", href: "/what-we-do/media-arabic-communications" },
} as const;

/**
 * The investor invitation.
 *
 * One line and a button, routing to For Investors. It is deliberately short:
 * the home page's job is to make an investor aware the list exists, and the
 * page it routes to does the explaining.
 */
export const investorInvitation = {
  label: "For Investors",
  statement:
    "Gulf Connect convenes qualified Gulf investors for briefings with international companies.",
  cta: { label: "Join the invitation list", href: "/for-investors#register" },
} as const;
