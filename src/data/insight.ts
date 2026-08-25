/**
 * ============================================================================
 * INSIGHT - the content library
 * ============================================================================
 * Organised by NAMED FORMAT, not chronologically. There is no News tab and
 * there will not be one: everything published lives inside a recurring format
 * with a name and a cadence, because a reader who knows what Five Questions is
 * comes back for the next one, and nobody comes back for "our latest articles".
 *
 * Renaming a format later loses whatever audience has accumulated under it, so
 * the four are fixed from day one even though the library launches near-empty.
 *
 * ----------------------------------------------------------------------------
 * COMPLIANCE - applies to every item ever added
 * ----------------------------------------------------------------------------
 * No recommendation, opinion or analysis concerning the value, price or
 * expected performance of a specific security. This reaches commentary,
 * seminars and published opinion, not only paid posts. Commentary on a sector
 * is fine; a view on what a named share is worth is not.
 *
 * Where an item concerns a company that has engaged Gulf Connect, the
 * commercial relationship is disclosed at the TOP of the item - see
 * `clientDisclosureTemplate` in `data/site.ts`. Set `clientDisclosure: true`
 * and `clientName` on the item and the page renders it. Never leave it to the
 * author to remember to write the line by hand.
 */

export type InsightFormatId =
  | "gulf-brief"
  | "five-questions"
  | "sector-notes"
  | "from-the-room";

export interface InsightFormat {
  id: InsightFormatId;
  name: string;
  cadence: string;
  /** Standing description shown on the format's row and archive. */
  description: string;
  /** Written, video, or both. Drives nothing yet; kept for later filtering. */
  medium: "written" | "video";
}

/**
 * The four formats.
 *
 * A taxonomy, deliberately - not four hard-coded systems. Adding a fifth is a
 * data change; the landing page, the filters and the item template all read
 * from this array.
 */
export const insightFormats: InsightFormat[] = [
  {
    id: "gulf-brief",
    name: "The Gulf Brief",
    cadence: "Fortnightly",
    medium: "written",
    description:
      "Short written commentary on what is moving in Gulf capital markets and in critical minerals, AI and data infrastructure, and life sciences. Sector context first.",
  },
  {
    id: "five-questions",
    name: "Five Questions",
    cadence: "Fortnightly",
    medium: "video",
    description:
      "A chief executive interview in a fixed format - the same five question areas every time, so the series is comparable from one company to the next.",
  },
  {
    id: "sector-notes",
    name: "Sector Notes",
    cadence: "Quarterly",
    medium: "written",
    description:
      "A longer written briefing on one sector each quarter. Available to registered members.",
  },
  {
    id: "from-the-room",
    name: "From the Room",
    cadence: "After each programme",
    medium: "video",
    description:
      "A short film from a completed programme, recorded on location. Requires real footage, so these follow the programmes themselves.",
  },
];

export function getFormat(id: InsightFormatId): InsightFormat | undefined {
  return insightFormats.find((format) => format.id === id);
}

/**
 * ----------------------------------------------------------------------------
 * ITEM SHAPE
 * ----------------------------------------------------------------------------
 * The fields a CMS record must carry. Kept flat and explicit so this file can
 * be swapped for a CMS fetch without any page changing shape.
 *
 * `language` exists now and is unused now. The brief plans Arabic as a
 * parallel language rather than a retrofit, and a content model that has to
 * grow a language field later is a content model that gets migrated later.
 */
export interface InsightItem {
  slug: string;
  title: string;
  format: InsightFormatId;
  /** ISO date. */
  date: string;
  author: string;
  excerpt: string;
  /** Body copy as paragraphs. A CMS would supply rich text here. */
  content: string[];
  /** Path under /public, or an external embed URL. Optional. */
  featuredMedia?: string;
  /**
   * True when the item concerns a company that has engaged Gulf Connect.
   * Renders the standing client disclosure at the top of the item.
   */
  clientDisclosure: boolean;
  /** Required when `clientDisclosure` is true. Names the company in the line. */
  clientName?: string;
  /** Gated items require registration. Sector Notes are gated by default. */
  gated: boolean;
  language: "en" | "ar";
  seoTitle?: string;
  seoDescription?: string;
}

/**
 * The library.
 *
 * EMPTY AT BUILD, and that is the plan rather than an oversight. The brief
 * sequences it explicitly: build completes with the site on noindex and no
 * promotion, six pieces are published, and only then is the site referenced
 * anywhere. A visible Insight section holding one item actively damages the
 * firm, so the landing page renders formats and their standing descriptions
 * while this array is empty, and never a placeholder card.
 *
 * The homepage module is stricter still: it hides entirely below three items.
 */
export const insightItems: InsightItem[] = [];

export function getInsightItem(slug: string): InsightItem | undefined {
  return insightItems.find((item) => item.slug === slug);
}

export function itemsByFormat(format: InsightFormatId): InsightItem[] {
  return insightItems
    .filter((item) => item.format === format)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Most recent first. Used by the landing page and the homepage module. */
export function latestInsightItems(limit: number): InsightItem[] {
  return [...insightItems].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

/**
 * Whether the homepage "Latest from Insight" module should render.
 *
 * Three is the threshold from the brief, and it is a floor rather than a
 * target: a module designed for three items showing one reads as a site with
 * nothing to say.
 */
export const HOMEPAGE_INSIGHT_THRESHOLD = 3;

export const insightContent = {
  eyebrow: "Insight",
  title: "Written for the Gulf, About the Sectors We Cover",
  lead: "Four recurring formats rather than a feed. Each has a name, a cadence and a standing description, so a reader who values one knows when the next arrives.",
  /**
   * Shown while the library is empty. Honest rather than apologetic: it says
   * the formats exist and publication has not begun, which is true, instead of
   * dressing an empty shelf as a coming-soon campaign.
   */
  emptyNote:
    "Publication begins shortly. The formats below are the recurring series this library is organised around.",
} as const;
