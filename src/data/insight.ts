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
 * the five are fixed from day one even though the library launches near-empty.
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
  | "menas-digital-news"
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
 * The five formats.
 *
 * A taxonomy, deliberately - not five hard-coded systems. Adding a sixth is a
 * data change; the landing page, the filters and the item template all read
 * from this array.
 */
export const insightFormats: InsightFormat[] = [
  {
    /*
     * The daily feed, and the only format that lives off-site.
     *
     * It is a WhatsApp channel rather than a page in this library, so it has
     * no archive here and will never carry published items - the format
     * section on the Insight page routes to the channel instead. The wording
     * and the destination are held in `menasDigitalNewsDetail`
     * (`data/insight-page.ts`) and are marked as awaiting final client
     * confirmation, so both can be changed in one place.
     */
    id: "menas-digital-news",
    name: "MENA's Digital News",
    cadence: "Daily",
    medium: "written",
    description:
      "A daily digital news feed covering relevant developments across Gulf markets and Gulf Connect's core sectors.",
  },
  {
    id: "gulf-brief",
    name: "The Gulf Brief",
    cadence: "Fortnightly",
    medium: "written",
    description:
      "Short written commentary on what is moving in Gulf capital markets and across the sectors the practice follows. Sector context first.",
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
 * SECTOR - the second taxonomy
 * ----------------------------------------------------------------------------
 * The sectors the library follows, as ids. The names and what each one covers
 * are held once in `insightSectors` (`data/insight-page.ts`); these are the
 * keys that file already uses, lifted here so an item can be classified
 * without the content model importing page copy.
 *
 * Format is the primary axis and sector is the secondary one: a piece is a
 * Gulf Brief first and a mining piece second.
 *
 * NOT A CLOSED LIST. These are the sectors the library follows today, named
 * because a piece has to be filed somewhere - they are not the boundary of
 * what the consultancy works on. Adding one is an entry here, an entry in
 * `insightSectors`, and a frame in `segmentPhotos`; nothing else.
 */
export type InsightSectorId = "energy" | "mining" | "pharmaceuticals" | "data-centres";

export const insightSectorIds: InsightSectorId[] = [
  "energy",
  "mining",
  "pharmaceuticals",
  "data-centres",
];

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
  /**
   * The sector the item sits in, from the three the library follows.
   *
   * A second axis alongside `format`, and optional because not every item has
   * one - a Gulf Brief on market structure belongs to no single sector. Where
   * it is set, `itemsBySector` can build a sector archive the same way
   * `itemsByFormat` builds a format one.
   */
  sector?: InsightSectorId;
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
  /**
   * The Arabic edition of this item, where one is planned or exists.
   *
   * A STATUS rather than a switch, because "is there an Arabic version" has
   * three answers and not two: none is intended, one is being prepared, or one
   * is published. Nothing on the site reads `published` yet - there is no
   * Arabic edition and no language switcher - so this records the state of a
   * translation without asserting that a reader can reach it.
   *
   * `slug` is the Arabic item's own slug, set only once its status is
   * `published`. It exists so a future `/ar` route has somewhere to point.
   */
  arabic?: {
    status: "none" | "in-progress" | "published";
    slug?: string;
  };
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

/**
 * The same filter on the sector axis.
 *
 * Exists so a sector archive can be built from the same array the format
 * sections already read, rather than from a second source that has to be kept
 * in step. Nothing renders it while the library is empty.
 */
export function itemsBySector(sector: InsightSectorId): InsightItem[] {
  return insightItems
    .filter((item) => item.sector === sector)
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
  lead: "Five recurring formats rather than a feed. Each has a name, a cadence and a standing description, so a reader who values one knows when the next arrives.",
  /**
   * Shown while the library is empty. Honest rather than apologetic: it says
   * the formats exist and publication has not begun, which is true, instead of
   * dressing an empty shelf as a coming-soon campaign.
   */
  emptyNote:
    "Publication begins shortly. The formats below are the recurring series this library is organised around.",
  /**
   * The accessible name of the format navigation.
   *
   * Not visible copy, but it is what a screen reader announces when it reaches
   * that landmark, so it is copy all the same. Moved out of the page's JSX
   * unchanged so it has an Arabic sibling.
   */
  formatsNavLabel: "Insight formats",

  /*
    The home page module.

    MOVED, NOT REWRITTEN, from `InsightsPreview`. The module renders only once
    three items exist, so none of this is on the page today - it is here so
    that the module is correct in both languages the day it appears.
  */
  previewLabel: "Insights",
  previewHeading: "Perspectives on Gulf Capital Markets",
  /** Fallback where an item names a format that is no longer in the taxonomy. */
  fallbackFormatName: "Insight",
} as const;
