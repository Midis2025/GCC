/**
 * Market data for the investor outreach globe.
 *
 * CONTENT INTEGRITY. Every string here describes either a market or a
 * capability. None of it claims an office, a registration, a licence, a client,
 * a mandate or an investor relationship in any jurisdiction, and the globe that
 * renders it carries `outreachContent.disclaimer` beneath it at all times.
 *
 * `focus` items are drawn from `outreachContent.categories` - the same outreach
 * capabilities listed as text in this section. They describe what an engagement
 * programme involves, not work that has been carried out.
 *
 * Coordinates are the market's principal financial centre, used to place a node
 * on a sphere. A coordinate is a geographic fact, not a presence.
 */

export interface GlobeMarket {
  /** ISO 3166-1 alpha-2, or `INT` for the international step. */
  code: string;
  label: string;
  city: string;
  description: string;
  focus: readonly string[];
  /** Degrees. Positive lon is east, positive lat is north. */
  lon: number;
  lat: number;
  /**
   * Where the globe turns to when this market becomes active. Gulf markets
   * frame themselves; the international step pulls back to a view that holds
   * the Gulf and the outbound arcs in the same disc.
   */
  view: { lon: number; lat: number };
  /** The international step is drawn and described differently. */
  international?: boolean;
}

export const globeMarkets: readonly GlobeMarket[] = [
  {
    code: "AE",
    label: "UAE",
    city: "Dubai",
    description:
      "Regional gateway for Gulf capital markets and international engagement.",
    focus: ["Investor Identification", "Targeted Outreach", "Cross-Border Connectivity"],
    lon: 55.27,
    lat: 25.2,
    view: { lon: 55.27, lat: 25.2 },
  },
  {
    code: "SA",
    label: "Saudi Arabia",
    city: "Riyadh",
    description: "A major regional market with growing institutional participation.",
    focus: ["Market Mapping", "Investor Engagement", "Roadshow Support"],
    lon: 46.68,
    lat: 24.71,
    view: { lon: 46.68, lat: 24.71 },
  },
  {
    code: "QA",
    label: "Qatar",
    city: "Doha",
    description: "Important Gulf financial centre.",
    focus: ["Investor Identification", "Market Mapping", "Investor Engagement"],
    lon: 51.53,
    lat: 25.29,
    view: { lon: 51.53, lat: 25.29 },
  },
  {
    code: "KW",
    label: "Kuwait",
    city: "Kuwait City",
    description: "Established private capital ecosystem.",
    focus: ["Investor Identification", "Targeted Outreach", "Investor Engagement"],
    lon: 47.99,
    lat: 29.38,
    view: { lon: 47.99, lat: 29.38 },
  },
  {
    code: "BH",
    label: "Bahrain",
    city: "Manama",
    description: "Regional financial services hub.",
    focus: ["Market Mapping", "Targeted Outreach", "Cross-Border Connectivity"],
    lon: 50.59,
    lat: 26.23,
    view: { lon: 50.59, lat: 26.23 },
  },
  {
    code: "OM",
    label: "Oman",
    city: "Muscat",
    description: "Part of the wider Gulf investment landscape.",
    focus: ["Market Mapping", "Investor Identification", "Roadshow Support"],
    lon: 58.41,
    lat: 23.59,
    view: { lon: 58.41, lat: 23.59 },
  },
  {
    code: "INT",
    label: "International Capital",
    city: "Global Investor Audiences",
    description:
      "Connecting Gulf companies with relevant international investor audiences.",
    focus: ["Cross-Border Connectivity", "Targeted Outreach", "Roadshow Support"],
    // Anchored on the Gulf so the outbound arcs read as leaving from it.
    lon: 55.27,
    lat: 25.2,
    // Pulled west and slightly north: Europe, Africa and the Gulf share the
    // visible hemisphere, so the arcs have somewhere to travel to on screen.
    view: { lon: 24, lat: 27 },
    international: true,
  },
];

/**
 * Endpoints for the outbound connection arcs.
 *
 * Deliberately UNLABELLED on the globe. They exist to show that engagement
 * extends beyond the Gulf; naming them would turn an orientation graphic into a
 * claim about specific international markets. Chosen for spread across the
 * visible hemisphere rather than for significance.
 */
export const internationalArcs: readonly { lon: number; lat: number }[] = [
  { lon: -0.13, lat: 51.51 }, // North-west Europe
  { lon: 8.54, lat: 47.37 }, // Central Europe
  { lon: -74.01, lat: 40.71 }, // North America
  { lon: 103.82, lat: 1.35 }, // South-east Asia
  { lon: 114.17, lat: 22.32 }, // East Asia
  { lon: 72.88, lat: 19.08 }, // South Asia
];

/** Panel chrome. Kept here so the component holds no copy of its own. */
export const globePanelContent = {
  eyebrow: "Market Focus",
  focusLabel: "Focus",
  hint: "Drag to rotate. Select a market to explore.",
} as const;

/* ==========================================================================
   HERO VARIANT
   ========================================================================== */

/**
 * Hero copy for the same seven markets.
 *
 * The hero states each market a little differently from the outreach section -
 * shorter, and framed around what the market is rather than what an engagement
 * programme does there - and its `focus` lines name the practice's capabilities
 * rather than the outreach sub-disciplines.
 *
 * Only the prose differs. Geography, view angles and the international flag are
 * taken from `globeMarkets` below, so the two globes can never disagree about
 * where a market is or which one is which.
 */
const heroCopy: Record<string, { description: string; focus: readonly string[] }> = {
  AE: {
    description:
      "Regional gateway for Gulf capital markets and international investor engagement.",
    focus: ["Investor Relations", "Market Outreach", "Capital Communication"],
  },
  SA: {
    description: "Major regional market with growing institutional participation.",
    focus: ["Investor Relations", "Investor Targeting", "Capital Communication"],
  },
  QA: {
    description: "Important Gulf financial centre.",
    focus: ["Investor Relations", "Market Outreach", "Digital Communications"],
  },
  KW: {
    description: "Established private capital ecosystem.",
    focus: ["Investor Targeting", "Market Outreach", "Capital Communication"],
  },
  BH: {
    description: "Regional financial services hub.",
    focus: ["Investor Relations", "Market Outreach", "Media Relations"],
  },
  OM: {
    description: "Part of the wider Gulf investment landscape.",
    focus: ["Investor Targeting", "Capital Communication", "Digital Communications"],
  },
  INT: {
    description: "Global investors and institutional networks worldwide.",
    focus: ["Cross-Border Engagement", "Market Outreach", "Investor Relations"],
  },
};

/** The hero's seven markets: shared geography, hero prose. */
export const heroMarkets: readonly GlobeMarket[] = globeMarkets.map((market) => ({
  ...market,
  description: heroCopy[market.code]?.description ?? market.description,
  focus: heroCopy[market.code]?.focus ?? market.focus,
}));

/**
 * Where each market's standing label sits, as fractions of the globe layer.
 *
 * Fixed slots rather than labels pinned to the markers. The six Gulf markets
 * sit within a few degrees of each other, so labels anchored to them would be
 * one illegible pile; fanning them out and drawing a leader back to each marker
 * is what a printed map does, and what the reference does.
 *
 * Laid out against the layer box rather than radially about the disc, because
 * the constraint that actually governs them is not the globe - it is the
 * headline. Every slot has to clear the type column at every width, and the
 * type column is a rectangle, so slots that are also rectangles are the ones
 * that can be reasoned about. `x` is the label's left edge and is capped at
 * 0.66 so a ~10rem label cannot reach the right edge of the viewport.
 */
export const heroLabelSlots: Record<string, { x: number; y: number }> = {
  // The reference's arrangement, as fractions of the globe layer - which is now
  // the whole hero section. `x` is the label's left edge, `y` its vertical
  // centre.
  //
  // The reference sets its copy 3% from the left edge; this site sets it at the
  // container margin, so the headline ends further across and the two left-hand
  // labels sit further right here than the reference puts them.
  //
  // These are intended positions, not final ones. `HeroGlobe` clamps every
  // anchor to the visible part of the layer, because the layer deliberately
  // overhangs the viewport and a slot that is comfortable at 1920 would
  // otherwise push a label off the edge at 1024.
  SA: { x: 0.531, y: 0.41 },
  BH: { x: 0.531, y: 0.6 },
  KW: { x: 0.576, y: 0.21 },
  OM: { x: 0.688, y: 0.67 },
  INT: { x: 0.766, y: 0.16 },
  AE: { x: 0.778, y: 0.5 },
  QA: { x: 0.811, y: 0.29 },
};
