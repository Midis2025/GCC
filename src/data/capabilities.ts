export interface Capability {
  title: string;
  slug: string;
  href: string;
  /** One-line strategic summary used on the homepage row. */
  summary: string;
  /** Longer description for the services pages. */
  description: string;
  /** Concrete areas of work. Descriptive, never outcome-guaranteeing. */
  areas: string[];
}

/**
 * The four principal capabilities.
 *
 * Copy describes activity, not outcomes: no reference to guaranteed
 * introductions, funding, valuation or transaction completion.
 *
 * ---------------------------------------------------------------------------
 * Capabilities are DISCIPLINES. Service lines are what you buy.
 * ---------------------------------------------------------------------------
 * These four are how the work is described professionally - investor
 * relations, targeting and outreach, media, digital. The client sitemap sells
 * four differently-cut products: Investor Roadshows, The Gulf Programme, Media
 * & Arabic Communications and Advisory. Both framings are true, and they are
 * not the same list, which is why this file still exists alongside
 * `data/what-we-do.ts` rather than being folded into it.
 *
 * `href` is therefore a MAPPING, not an identity - each discipline points at
 * the service page where that work is actually bought. Two of them land on the
 * media page, because both media relations and digital communication are sold
 * there. The old `/services/*` and `/investor-outreach` targets they used to
 * carry are gone; they now only redirect, so leaving them would have sent
 * every row on the homepage through a 308.
 *
 * `slug` is NOT a route. It keys `capabilityPhotos` in `data/imagery.ts` and
 * is left alone deliberately - renaming it would silently drop the photograph
 * out of every row.
 */
export const capabilities: Capability[] = [
  {
    title: "Investor Relations",
    slug: "investor-relations",
    href: "/what-we-do/gulf-programme",
    summary:
      "IR programmes built on a defined investment narrative, consistent disclosure and informed dialogue with the market.",
    description:
      "We work with management teams to establish how a company is understood by investors, from the investment case itself to the calendar, materials and disciplines that keep it consistent through the reporting year.",
    areas: [
      "IR strategy and programme development",
      "Investment narrative and positioning",
      "Investor communications",
      "Corporate presentations",
      "Results and earnings communications",
      "Investor meeting preparation",
      "Shareholder communications",
      "Market perception and messaging",
    ],
  },
  {
    title: "Investor Targeting & Market Outreach",
    slug: "investor-outreach",
    href: "/what-we-do/investor-roadshows",
    summary:
      "Identifying and engaging investors whose mandate, geography and investment profile align with a company's objectives.",
    description:
      "Outreach begins with research. We map the investor landscape relevant to a company's sector, scale and strategy, then build an engagement programme around the audiences where a conversation is genuinely warranted.",
    areas: [
      "Institutional investor targeting",
      "Family office outreach",
      "Regional investor mapping",
      "Cross-border investor engagement",
      "Investor introductions",
      "Investor meeting programmes",
      "Non-deal roadshows",
      "Conference targeting",
      "Investor intelligence",
      "Pre-meeting preparation",
      "Post-meeting feedback",
    ],
  },
  {
    title: "Media Relations",
    slug: "media-relations",
    href: "/what-we-do/media-arabic-communications",
    summary:
      "Corporate and financial media engagement that supports how a company is read by the market.",
    description:
      "Media work is treated as an extension of the corporate narrative rather than a separate exercise, considered in terms of what the market needs to understand, and when.",
    areas: [
      "Corporate narrative development",
      "Financial media engagement",
      "Executive profiling",
      "Thought leadership",
      "Announcement strategy",
      "Media preparation",
      "Reputation positioning",
    ],
  },
  {
    title: "Digital Communications",
    slug: "digital-communications",
    href: "/what-we-do/media-arabic-communications",
    summary:
      "Investor-facing digital communication that holds the corporate narrative consistent across owned and public channels.",
    description:
      "Digital channels shape how investors and journalists form a view of a company. We align them with the same standards applied to disclosure and IR materials.",
    areas: [
      "Digital investor communications",
      "Corporate social strategy",
      "Executive digital positioning",
      "Investor-facing content",
      "Digital campaigns",
      "Online corporate reputation",
      "Announcement amplification",
      "Website and digital IR communications",
    ],
  },
];
