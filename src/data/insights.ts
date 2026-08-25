export interface Insight {
  slug: string;
  category: string;
  /** ISO date. */
  date: string;
  title: string;
  excerpt: string;
  /**
   * True while the entry is a layout placeholder rather than published Gulf Connect
   * research. The UI labels these and they are excluded from the sitemap.
   */
  isPlaceholder: boolean;
}

/**
 * ============================================================================
 * INSIGHTS
 * ============================================================================
 * These entries are LAYOUT PLACEHOLDERS. They are titled as subject areas Gulf Connect
 * may choose to write about - they are not published research and are not
 * presented as such. The UI marks them accordingly.
 *
 * To publish real content: replace these entries and set isPlaceholder to
 * false. To hide the section entirely: empty this array - the homepage section
 * and the Insights route render nothing rather than showing empty state.
 */
export const insights: Insight[] = [
  {
    slug: "investor-targeting-in-gulf-markets",
    category: "Investor Relations",
    date: "2026-01-01",
    title: "What relevance means when targeting Gulf investors",
    excerpt:
      "Mandate, geography and holding profile determine which conversations are worth having. A short view on building a target list that reflects them.",
    isPlaceholder: true,
  },
  {
    slug: "communicating-through-the-reporting-year",
    category: "Capital Markets",
    date: "2026-01-01",
    title: "Communicating consistently across the reporting year",
    excerpt:
      "Results season sets the rhythm, but the periods in between determine how well a company is understood when it matters.",
    isPlaceholder: true,
  },
  {
    slug: "cross-border-investor-engagement",
    category: "Market Outreach",
    date: "2026-01-01",
    title: "Cross-border engagement between Gulf and international investors",
    excerpt:
      "Regional companies seeking international capital and international companies seeking Gulf visibility face a similar problem framed from opposite directions.",
    isPlaceholder: true,
  },
];

/** Sorted newest first. */
export function getInsights(): Insight[] {
  return [...insights].sort((a, b) => b.date.localeCompare(a.date));
}

/** True when any entry is still a placeholder, so the UI can label the section. */
export function hasPlaceholderInsights(): boolean {
  return insights.some((insight) => insight.isPlaceholder);
}
