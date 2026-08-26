import type { MapNode } from "@/components/visuals/ConnectedWorldMap";

/**
 * ============================================================================
 * MAP CONFIGURATIONS
 * ============================================================================
 * One map component, several readings of it. Each page passes the connections
 * that suit its argument, so the same visual system does not render an
 * identical picture four times.
 *
 * ---------------------------------------------------------------------------
 * COMPLIANCE. This file places a firm's name on a world map, which makes it
 * one of the easiest things on the site to over-claim with. Three rules:
 *
 * 1. A CONNECTION IS NOT A PRESENCE. Every line means cross-border company and
 *    market connectivity and nothing else. It does not mean an office, a
 *    registration, a licence, a mandate or a relationship, and every section
 *    that renders a map carries that denial in standing text.
 *
 * 2. THE HUB IS THE UAE, and it is the only place the firm is said to be. Dubai
 *    is where Gulf Connect is based; that is a fact the site already states.
 *    Riyadh and the other Gulf markets are MARKETS, never bases.
 *
 * 3. NO COUNTERPARTIES. The origins are broad regions or financial centres any
 *    international issuer would recognise. They are not clients, not investors
 *    and not partners, and none may be replaced with the name of one.
 *
 * `detail` lines are shown one at a time when a node is selected. Keep them to
 * a single factual clause about the WORK, never about an outcome.
 */

/* --------------------------------------------------------------------------
   Shared geography. Coordinates are real; the projection places them.
   -------------------------------------------------------------------------- */

const DUBAI: MapNode = {
  id: "dubai",
  lon: 55.27,
  lat: 25.2,
  label: "Dubai",
  kind: "hub",
  detail: "Gulf Connect is based in Dubai. Investor meetings, media and regional communication.",
};

const ABU_DHABI: MapNode = {
  id: "abu-dhabi",
  lon: 54.37,
  lat: 24.45,
  label: "Abu Dhabi",
  kind: "regional",
  side: "left",
  /* Pushed down so it clears Dubai's label; the two are 90km apart. */
  labelDy: 13,
  detail: "Institutional capital and a sovereign-linked ecosystem. Structured meetings and briefings.",
};

const RIYADH: MapNode = {
  id: "riyadh",
  lon: 46.72,
  lat: 24.71,
  label: "Riyadh",
  kind: "regional",
  side: "left",
  /* Lifted clear of Abu Dhabi, which sits just south-east of it. */
  labelDy: -11,
  detail: "Regional market engagement, where a company's sector makes it relevant.",
};

const LONDON: MapNode = {
  id: "london",
  lon: -0.13,
  lat: 51.5,
  label: "London",
  kind: "origin",
  side: "left",
  detail: "Cross-border issuers and management teams.",
};

const GENEVA: MapNode = {
  id: "geneva",
  lon: 6.14,
  lat: 46.2,
  label: "Geneva",
  kind: "origin",
  side: "left",
  compact: true,
  detail: "Cross-border issuers and management teams.",
};

const NORTH_AMERICA: MapNode = {
  id: "north-america",
  lon: -74,
  lat: 40.7,
  label: "North America",
  kind: "origin",
  side: "left",
  detail: "International companies working in the sectors Gulf Connect covers.",
};

const ASIA: MapNode = {
  id: "asia",
  lon: 103.8,
  lat: 1.35,
  label: "Asia-Pacific",
  kind: "origin",
  compact: true,
  detail: "International companies working in the sectors Gulf Connect covers.",
};

/* --------------------------------------------------------------------------
   Per-page configurations
   -------------------------------------------------------------------------- */

/**
 * Insight: global sector context meeting Gulf audiences.
 *
 * The captions name the three sectors rather than the four services, because
 * an Insight reader is here for the subject matter.
 */
export const insightMap = {
  nodes: [DUBAI, ABU_DHABI, RIYADH, LONDON, GENEVA, NORTH_AMERICA, ASIA],
  connections: ["london", "north-america", "geneva", "asia", "riyadh", "abu-dhabi"],
  captions: [
    {
      term: "International Companies",
      detail: "Cross-border issuers and management teams in the sectors covered.",
    },
    {
      term: "Gulf Markets",
      detail: "Dubai, Abu Dhabi and, where relevant to a sector, Riyadh.",
    },
    {
      term: "Recurring Content",
      detail: "Sector and market context published to a stated cadence.",
    },
  ],
} as const;

/**
 * What We Do: international companies into the three markets programmes run in.
 *
 * Fewer international origins than Insight and more regional weight, because
 * this page is about the work rather than about the subject matter.
 */
export const whatWeDoMap = {
  nodes: [DUBAI, ABU_DHABI, RIYADH, LONDON, NORTH_AMERICA, ASIA],
  connections: ["london", "north-america", "asia", "riyadh", "abu-dhabi"],
  captions: [
    { term: "Meetings", detail: "Structured one-to-one meetings and hosted sessions." },
    { term: "Media", detail: "Story development and pitching to regional business media." },
    {
      term: "Arabic Communications",
      detail: "Certified financial translation and regional distribution.",
    },
  ],
} as const;

/**
 * For Investors: the same geography read from the other side.
 *
 * COMPLIANCE: the captions name the professional categories the registration
 * form offers. They are not claims about who has registered, and nothing here
 * may imply that a connection results in investment. See `data/for-investors`.
 */
export const investorsMap = {
  nodes: [DUBAI, ABU_DHABI, RIYADH, LONDON, NORTH_AMERICA, ASIA],
  connections: ["london", "north-america", "asia", "abu-dhabi", "riyadh"],
  captions: [
    {
      term: "Who Registers",
      detail: "Institutions, asset managers, family offices, private banks and qualified private investors.",
    },
    {
      term: "What Is Convened",
      detail: "Briefings with international companies, communicated when scheduled.",
    },
    {
      term: "Not Solicitation",
      detail: "Gulf Connect is not paid by investors and makes no recommendations.",
    },
  ],
} as const;
