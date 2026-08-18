/**
 * Investor Outreach page content.
 *
 * Compliance note: this page describes a communications and targeting service.
 * Copy deliberately avoids any language that could be read as guaranteeing
 * introductions, meetings, funding, valuation or transaction outcomes, and
 * makes no claim about the size or composition of any investor network.
 */

export const outreachHero = {
  eyebrow: "Investor Outreach",
  title: "Connecting Companies With Relevant Capital Audiences.",
  lead: "Investor outreach is a research exercise before it is a communications one. The purpose is not broad promotion, but identifying the investors for whom a company is genuinely relevant, and preparing both sides for a useful conversation.",
} as const;

export const outreachPhilosophy = {
  label: "Philosophy",
  heading: "Relevance Decides Everything",
  paragraphs: [
    "A target list assembled on size alone produces meetings that go nowhere. Mandate, geography, sector coverage, typical position size and holding period determine whether an investor can act on a company at all.",
    "We start from those constraints. The result is usually a shorter list than companies expect, and a materially higher proportion of conversations that are worth the management time they consume.",
    "Outreach also works in both directions. Regional companies seeking international capital and international companies seeking Gulf visibility face the same problem framed from opposite ends, and both are served by the same discipline.",
  ],
} as const;

export const outreachCoverage = {
  label: "Market Coverage",
  heading: "Gulf Markets and International Capital",
  paragraphs: [
    "We work across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman, and support engagement with international investors looking at the region.",
    "Each market has a distinct investor base, disclosure culture and set of expectations around access to management. Treating the Gulf as a single audience is the most common error in regional outreach.",
  ],
} as const;

export const investorCategories = [
  {
    term: "Institutional Investors",
    description:
      "Regional and international institutions with defined mandates, coverage universes and process requirements.",
  },
  {
    term: "Family Offices",
    description:
      "Single and multi-family offices, whose decision-making, horizons and information needs differ markedly from institutions.",
  },
  {
    term: "Private Capital",
    description:
      "Private investment vehicles and holding structures active across regional and cross-border opportunities.",
  },
  {
    term: "Asset Managers",
    description:
      "Managers running regional, emerging-market or thematic strategies with relevant allocation criteria.",
  },
  {
    term: "Strategic Investors",
    description:
      "Corporates and industry participants evaluating an opportunity on strategic as well as financial grounds.",
  },
] as const;

export const outreachMethodology = {
  label: "Methodology",
  heading: "How an Outreach Programme Is Built",
  steps: [
    {
      term: "Define the objective",
      description:
        "Establish what the company is seeking from engagement, and what would constitute a useful outcome.",
    },
    {
      term: "Map the landscape",
      description:
        "Identify the investor universe relevant to the company's sector, scale, structure and geography.",
    },
    {
      term: "Qualify the list",
      description:
        "Filter by mandate fit, existing exposure and the practical likelihood of a productive conversation.",
    },
    {
      term: "Prepare the materials",
      description:
        "Ensure the investment narrative, presentation and supporting documents are ready before any approach.",
    },
    {
      term: "Engage",
      description:
        "Approach investors with a specific, accurate account of why the company may be relevant to them.",
    },
    {
      term: "Review",
      description:
        "Capture what was learned from each conversation and feed it back into positioning and targeting.",
    },
  ],
} as const;

export const outreachRoadshows = {
  label: "Roadshows and Meetings",
  heading: "Programmes Structured Around Management Time",
  paragraphs: [
    "Non-deal roadshows, conference participation and standalone meeting programmes all consume the scarcest resource a company has, which is senior management attention.",
    "We build schedules around that constraint: sequencing meetings sensibly, briefing management on each investor beforehand, and ensuring the logistics do not become the company's problem.",
  ],
  items: [
    "Non-deal roadshow planning and scheduling",
    "Conference selection and targeting",
    "Meeting programme coordination",
    "Investor briefing notes for management",
    "Logistics and calendar management",
    "Virtual and in-person meeting formats",
  ],
} as const;

export const outreachCrossBorder = {
  label: "Cross-Border Engagement",
  heading: "Two Directions, One Discipline",
  paragraphs: [
    "For Gulf companies, international engagement means presenting a regional business in terms an outside investor can evaluate without local context - addressing structure, governance and disclosure directly rather than assuming familiarity.",
    "For international companies, Gulf engagement means understanding how regional capital assesses opportunities, who the relevant decision-makers are, and why an approach calibrated for another market often does not translate.",
  ],
} as const;

export const outreachPreparation = {
  label: "Preparation and Follow-Up",
  heading: "The Work Either Side of the Meeting",
  paragraphs: [
    "Most of the value in an outreach programme sits outside the meeting itself. Preparation determines whether management can answer the questions that actually get asked; follow-up determines whether a first conversation leads anywhere.",
  ],
  items: [
    {
      term: "Pre-meeting briefing",
      description:
        "Who the investor is, what they hold, how they assess opportunities and what they are likely to probe.",
    },
    {
      term: "Message preparation",
      description: "The specific points to land, and the questions that need a considered answer.",
    },
    {
      term: "Post-meeting feedback",
      description:
        "Candid capture of investor reaction, including objections the company may prefer not to hear.",
    },
    {
      term: "Programme review",
      description:
        "What the pattern of responses says about positioning, targeting and the investment case.",
    },
  ],
} as const;
