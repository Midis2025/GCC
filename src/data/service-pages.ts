/**
 * Detail content for the individual service routes.
 *
 * Keyed by the capability slug in `data/capabilities.ts`. Language describes
 * process and deliverables only - it makes no reference to guaranteed
 * introductions, funding, valuation or transaction outcomes.
 *
 * Note: the investor-outreach capability has its own top-level page at
 * /investor-outreach, so it is not repeated here.
 */
export interface ServicePageContent {
  /** Opening statement under the hero. */
  intro: readonly string[];
  approach: {
    heading: string;
    paragraphs: readonly string[];
  };
  deliverables: {
    heading: string;
    items: readonly { term: string; description: string }[];
  };
  suitedTo: readonly string[];
}

export const servicePages: Record<string, ServicePageContent> = {
  "investor-relations": {
    intro: [
      "An investor relations programme exists to make a company legible to the market: what it does, how it creates value, what it is measured on and what management is accountable for.",
      "We build and run those programmes, or strengthen the ones companies already have.",
    ],
    approach: {
      heading: "From Investment Case to Operating Rhythm",
      paragraphs: [
        "Work usually begins with the investment case. We establish how the company should be described, which metrics carry the story, and where the current explanation is doing less work than it should.",
        "That narrative is then built into the materials and the calendar - results communications, presentations, meeting preparation and shareholder updates - so the same account of the business holds through the reporting year rather than being reassembled each quarter.",
      ],
    },
    deliverables: {
      heading: "What an Engagement Typically Includes",
      items: [
        {
          term: "IR strategy and programme",
          description:
            "The plan, calendar and disciplines a company operates across the reporting year.",
        },
        {
          term: "Investment narrative",
          description: "Positioning, key messages and the evidence that supports them.",
        },
        {
          term: "Results communications",
          description:
            "Materials and messaging for reporting periods, prepared to a consistent standard.",
        },
        {
          term: "Corporate presentations",
          description: "Investor decks and supporting documents built around the narrative.",
        },
        {
          term: "Meeting preparation",
          description:
            "Briefing, likely questions and rehearsal ahead of investor and analyst meetings.",
        },
        {
          term: "Perception and messaging review",
          description:
            "Assessment of how the company is currently understood and where the gaps are.",
        },
      ],
    },
    suitedTo: [
      "Listed companies establishing or resetting an IR programme",
      "Companies preparing for a listing",
      "IR and finance teams seeking additional capacity",
      "Boards reviewing how the company is understood by the market",
    ],
  },

  "media-relations": {
    intro: [
      "Media coverage shapes how a company is read by investors, counterparties and its own stakeholders, often before any of them read a financial statement.",
      "We treat media engagement as an extension of the corporate narrative rather than a separate campaign.",
    ],
    approach: {
      heading: "Considered Engagement, Not Constant Presence",
      paragraphs: [
        "The starting point is what the market needs to understand about a business, and when. Not every development warrants an announcement, and visibility pursued for its own sake tends to weaken the value of the announcements that matter.",
        "We advise on which stories are worth telling, how they should be framed, which financial and trade media are relevant, and how executives should be prepared before they enter the room.",
      ],
    },
    deliverables: {
      heading: "What an Engagement Typically Includes",
      items: [
        {
          term: "Corporate narrative development",
          description: "The account of the business that underpins all external engagement.",
        },
        {
          term: "Financial media engagement",
          description: "Relationships and briefings with relevant regional and international media.",
        },
        {
          term: "Announcement strategy",
          description: "Sequencing, framing and timing of corporate announcements.",
        },
        {
          term: "Executive profiling",
          description: "Positioning senior leadership where it supports the corporate story.",
        },
        {
          term: "Thought leadership",
          description: "Substantive commentary in areas where the company has genuine standing.",
        },
        {
          term: "Media preparation",
          description: "Briefing and rehearsal ahead of interviews and public appearances.",
        },
      ],
    },
    suitedTo: [
      "Companies entering or expanding in Gulf markets",
      "Businesses with a corporate story that is not currently well understood",
      "Executives taking on a more public role",
      "Companies preparing for a period of heightened attention",
    ],
  },

  "digital-communications": {
    intro: [
      "Investors, journalists and prospective partners research companies through their own channels long before they request a meeting.",
      "Digital communication is where a corporate narrative is either reinforced or quietly contradicted.",
    ],
    approach: {
      heading: "Owned Channels Held to the Same Standard",
      paragraphs: [
        "Corporate websites, investor pages and executive profiles are frequently the least maintained part of a company's communication, while being among the most consulted.",
        "We align them with the standards applied to disclosure and IR materials: accurate, current, consistent in language, and structured so that someone assessing the business can find what they need without assistance.",
      ],
    },
    deliverables: {
      heading: "What an Engagement Typically Includes",
      items: [
        {
          term: "Digital IR communications",
          description: "Investor-facing pages, materials and the structure that holds them.",
        },
        {
          term: "Corporate social strategy",
          description: "What a company says on its own channels, and how often.",
        },
        {
          term: "Executive digital positioning",
          description: "Senior leadership presence, aligned with the corporate narrative.",
        },
        {
          term: "Investor-facing content",
          description: "Material written for an audience assessing the business, not a general one.",
        },
        {
          term: "Announcement amplification",
          description: "Coordinated distribution of corporate news across owned channels.",
        },
        {
          term: "Online corporate reputation",
          description: "Monitoring and managing how the company appears in search and social.",
        },
      ],
    },
    suitedTo: [
      "Companies whose digital presence lags their corporate profile",
      "Businesses preparing for investor scrutiny",
      "Executives establishing a professional public presence",
      "Companies coordinating announcements across multiple channels",
    ],
  },
};

export function getServicePage(slug: string): ServicePageContent | undefined {
  return servicePages[slug];
}
