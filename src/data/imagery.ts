import type { StaticImageData } from "next/image";

import businessBayReflection from "../../public/images/business-bay-reflection.jpg";
import districtMonochrome from "../../public/images/district-monochrome.jpg";
import downtownDubaiBlueHour from "../../public/images/downtown-dubai-blue-hour.jpg";
import dohaSkylineDay from "../../public/images/doha-skyline-day.jpg";
import dohaWaterfrontMuted from "../../public/images/doha-waterfront-muted.jpg";
import sectorDevelopmentCranes from "../../public/images/sector-development-cranes.jpg";
import sectorEnergyDusk from "../../public/images/sector-energy-dusk.jpg";
import sectorIndustrialMono from "../../public/images/sector-industrial-mono.jpg";
import sectorLogisticsPort from "../../public/images/sector-logistics-port.jpg";
import sectorTechnologyRacks from "../../public/images/sector-technology-racks.jpg";
import etihadTowersGoldenHour from "../../public/images/etihad-towers-golden-hour.jpg";
import facadeDarkCurve from "../../public/images/facade-dark-curve.jpg";
import facadeOculus from "../../public/images/facade-oculus.jpg";
import facadeRibs from "../../public/images/facade-ribs.jpg";
import facadeSteelCurve from "../../public/images/facade-steel-curve.jpg";
import facadeWarmConcrete from "../../public/images/facade-warm-concrete.jpg";
import facadeWhiteCurve from "../../public/images/facade-white-curve.jpg";
import facadeWoven from "../../public/images/facade-woven.jpg";
import gulfFinancialDistrictNight from "../../public/images/gulf-financial-district-night.jpg";
import skylineTwilight from "../../public/images/skyline-twilight.jpg";

/**
 * ============================================================================
 * PHOTOGRAPHY
 * ============================================================================
 * Art direction: Gulf financial districts and architectural geometry, shot
 * dark and atmospheric. No handshakes, no meeting-room stock, no dunes, no
 * tourist framing - the imagery is there to give the typography a setting,
 * not to depict the firm.
 *
 * PROVENANCE: these are Unsplash photographs, licensed for commercial use
 * without attribution. They are art direction, NOT client assets, and none of
 * them depicts GCC, its offices, its people or its work. See
 * `public/images/CREDITS.md` for the source of each file.
 *
 * To replace with commissioned photography: drop the new file into
 * /public/images, update the import above, and keep the `alt` accurate. No
 * component needs to change.
 *
 * Every entry is imported statically rather than referenced by path string.
 * That is what lets next/image emit intrinsic width/height (so nothing shifts
 * as images load) and generate a blurDataURL for the placeholder.
 */
export interface Photo {
  src: StaticImageData;
  /**
   * Empty string marks the photograph as decorative - correct for the frames
   * that sit behind a headline, where the text already carries the meaning and
   * an announced description would only add noise.
   */
  alt: string;
  /**
   * object-position for the crop. Set where the default centre crop loses the
   * subject at portrait or ultra-wide aspect ratios.
   */
  position?: string;
}

/** Full-bleed frames that sit behind type. Decorative by design. */
export const backdrops = {
  /**
   * Homepage hero. Downtown Dubai at blue hour.
   *
   * Blue hour rather than full night: the towers still read as architecture
   * instead of dissolving into points of light, which is what lets the frame
   * carry a headline without becoming a black rectangle behind it. The crop
   * favours the upper band, where the skyline sits - centring it would fill
   * the lower third of the hero with foreground rooftops that the scrim then
   * has to hide anyway.
   *
   * Replaces the Sheikh Zayed Road night shot, which moves to the sitewide
   * CTA below rather than being retired.
   */
  hero: {
    src: downtownDubaiBlueHour,
    alt: "",
    position: "50% 38%",
  },
  /**
   * Final call to action, sitewide. The former homepage hero.
   *
   * Deliberately the darker, harder frame of the two: it closes a page that
   * opened on the calmer blue-hour skyline, so the pair bookend rather than
   * repeat. The previous CTA photograph was itself a blue-hour Downtown Dubai
   * shot, which sat too close to the new hero to keep both on one page.
   */
  cta: {
    src: gulfFinancialDistrictNight,
    alt: "",
    position: "50% 62%",
  },
  /** Investor outreach feature. */
  outreach: {
    src: businessBayReflection,
    alt: "",
    position: "50% 50%",
  },
  /** Services index hero. */
  services: {
    src: facadeDarkCurve,
    alt: "",
    position: "62% 50%",
  },
  /** Contact hero. */
  contact: {
    src: skylineTwilight,
    alt: "",
    position: "50% 58%",
  },
  /** Insights index and article headers. */
  insights: {
    src: dohaWaterfrontMuted,
    alt: "",
    position: "50% 55%",
  },
  /**
   * Utility routes - 404, privacy, terms. One frame shared across all three:
   * they are low-traffic pages that still need a proper opening, and a
   * dedicated photograph each would be weight for no gain.
   */
  utility: {
    src: dohaSkylineDay,
    alt: "",
    position: "50% 62%",
  },
  /** Industries index hero. */
  industries: {
    src: sectorLogisticsPort,
    alt: "",
    position: "50% 50%",
  },
  /** Projects index hero. */
  projects: {
    src: sectorDevelopmentCranes,
    alt: "",
    position: "50% 55%",
  },
} as const satisfies Record<string, Photo>;

/** Photographs that carry content and are described for assistive tech. */
export const photos = {
  aboutPortrait: {
    src: facadeWarmConcrete,
    alt: "Late afternoon light across the ribbed concrete facade of a modern office building.",
    position: "50% 45%",
  },
  introTowers: {
    src: etihadTowersGoldenHour,
    alt: "Glass office towers on a Gulf waterfront at sunset.",
    position: "50% 40%",
  },
  regionStreet: {
    src: districtMonochrome,
    alt: "A central business district avenue lined with office towers, in black and white.",
    position: "50% 50%",
  },
} as const satisfies Record<string, Photo>;

/**
 * One photograph per capability, keyed by the slug in `data/capabilities.ts`.
 * Architectural abstracts rather than literal illustrations of the service:
 * the point is to give each capability a distinct visual signature the eye can
 * track as it moves down the list, not to pretend a photograph can depict
 * investor relations.
 */
export const capabilityPhotos: Record<string, Photo> = {
  "investor-relations": {
    src: facadeRibs,
    alt: "Repeating curved architectural ribs receding into shadow.",
    position: "50% 50%",
  },
  "investor-outreach": {
    src: facadeSteelCurve,
    alt: "Curved steel-and-glass balconies sweeping around an open atrium.",
    position: "50% 50%",
  },
  "media-relations": {
    src: facadeWoven,
    alt: "A woven metal building facade curving against a clear sky.",
    position: "50% 50%",
  },
  "digital-communications": {
    src: facadeOculus,
    alt: "White structural fins fanning across a building's exterior.",
    position: "50% 50%",
  },
};

/**
 * One photograph per sector, keyed by the slug in `data/industries.ts`.
 *
 * Unlike the capability set, these are literal: an energy sector panel shows
 * energy infrastructure. The subject is the industry itself, so an
 * architectural abstract would be doing less work than a direct frame.
 *
 * Financial services reuses a Gulf business-district frame rather than
 * introducing a seventh photograph - the district IS the sector, and a stock
 * trading-floor shot would be exactly the cheap imagery the art direction
 * rules out.
 */
export const industryPhotos: Record<string, Photo> = {
  "financial-services": {
    src: businessBayReflection,
    alt: "A Gulf business district reflected in still water at night.",
    position: "50% 45%",
  },
  "energy-and-utilities": {
    src: sectorEnergyDusk,
    alt: "Storage tanks silhouetted against a low sun.",
    position: "50% 50%",
  },
  "real-estate-and-development": {
    src: sectorDevelopmentCranes,
    alt: "Tower cranes over a development site against a clear sky.",
    position: "50% 55%",
  },
  "industrials-and-manufacturing": {
    src: sectorIndustrialMono,
    alt: "Industrial storage tanks and an external stairway, in black and white.",
    position: "50% 50%",
  },
  "transport-and-logistics": {
    src: sectorLogisticsPort,
    alt: "A container terminal at dusk, seen from above.",
    position: "50% 50%",
  },
  "technology-and-digital": {
    src: sectorTechnologyRacks,
    alt: "Server racks in a darkened equipment room.",
    position: "50% 50%",
  },
};

/**
 * Engagement cards, keyed by project slug.
 *
 * Each one reuses the photograph of the sector the engagement sits in, so a
 * card reads as belonging to its industry without needing a caption to say so.
 */
export const projectPhotos: Record<string, Photo> = {
  "pre-ipo-narrative-programme": { src: sectorIndustrialMono, alt: "", position: "50% 50%" },
  "cross-border-outreach-programme": {
    src: sectorDevelopmentCranes,
    alt: "",
    position: "50% 55%",
  },
  "results-communication-reset": { src: businessBayReflection, alt: "", position: "50% 45%" },
  "digital-ir-presence": { src: sectorLogisticsPort, alt: "", position: "50% 50%" },
  "media-positioning-programme": { src: sectorEnergyDusk, alt: "", position: "50% 50%" },
  "ir-programme-establishment": { src: sectorTechnologyRacks, alt: "", position: "50% 50%" },
};

/**
 * Insight cards, assigned by index.
 *
 * Decorative: an architectural abstract gives each entry a distinct card
 * without implying the photograph illustrates the article - which matters
 * while the entries are still layout placeholders rather than published work.
 */
export const insightPhotos: Photo[] = [
  { src: facadeWoven, alt: "", position: "50% 50%" },
  { src: facadeWhiteCurve, alt: "", position: "50% 60%" },
  { src: facadeRibs, alt: "", position: "50% 50%" },
];

/**
 * Panels for the client-segment grid. Ordered to match
 * `audienceContent.segments`, and re-used rather than expanded: six distinct
 * photographs would out-weigh a section whose content is six short labels.
 */
export const segmentPhotos: Photo[] = [
  /*
   * Index 0 is the tall anchor panel, so it needs the frame with the most
   * weight. The pale facade shots read as holes at that size and are placed in
   * the smaller cells instead.
   */
  { src: businessBayReflection, alt: "", position: "50% 45%" },
  { src: districtMonochrome, alt: "", position: "50% 50%" },
  { src: facadeSteelCurve, alt: "", position: "40% 50%" },
  { src: facadeWarmConcrete, alt: "", position: "50% 50%" },
  { src: facadeWhiteCurve, alt: "", position: "50% 55%" },
  { src: facadeOculus, alt: "", position: "50% 50%" },
];
