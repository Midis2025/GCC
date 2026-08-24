import type { StaticImageData } from "next/image";

import abuDhabiNight from "../../public/images/abu-dhabi-night.jpg";
import businessBayReflection from "../../public/images/business-bay-reflection.jpg";
import capitalMarketsDesk from "../../public/images/capital-markets-desk.jpg";
import corporateCorridorNight from "../../public/images/corporate-corridor-night.jpg";
import corporateLobbyDark from "../../public/images/corporate-lobby-dark.jpg";
import digitalMarketData from "../../public/images/digital-market-data.jpg";
import downtownDubaiBlueHour from "../../public/images/downtown-dubai-blue-hour.jpg";
import downtownDubaiDusk from "../../public/images/downtown-dubai-dusk.jpg";
import dohaSkylineDay from "../../public/images/doha-skyline-day.jpg";
import etihadTowersGoldenHour from "../../public/images/etihad-towers-golden-hour.jpg";
import executivesSkylineDusk from "../../public/images/executives-skyline-dusk.jpg";
import gulfFinancialDistrictNight from "../../public/images/gulf-financial-district-night.jpg";
import investorBriefingRoom from "../../public/images/investor-briefing-room.jpg";
import irBoardroomWindow from "../../public/images/ir-boardroom-window.jpg";
import leadershipReviewNight from "../../public/images/leadership-review-night.jpg";
import mediaBroadcastCamera from "../../public/images/media-broadcast-camera.jpg";
import officeNightWindows from "../../public/images/office-night-windows.jpg";
import outreachConferenceHall from "../../public/images/outreach-conference-hall.jpg";
import riyadhNightAerial from "../../public/images/riyadh-night-aerial.jpg";
import sectorDevelopmentCranes from "../../public/images/sector-development-cranes.jpg";
import sectorEnergyDusk from "../../public/images/sector-energy-dusk.jpg";
import sectorIndustrialMono from "../../public/images/sector-industrial-mono.jpg";
import sectorLogisticsPort from "../../public/images/sector-logistics-port.jpg";
import sectorTechnologyRacks from "../../public/images/sector-technology-racks.jpg";
import skylineTwilight from "../../public/images/skyline-twilight.jpg";
import strategySessionNight from "../../public/images/strategy-session-night.jpg";

/**
 * ============================================================================
 * PHOTOGRAPHY
 * ============================================================================
 * Art direction: the work this firm does, shot dark and atmospheric, with Gulf
 * financial districts as the setting rather than the subject. Investor
 * meetings, conference halls, financial media, market data and premium
 * corporate interiors - cinematic, desaturated and cool, so a photograph
 * darkens into the palette instead of shouting over the typography.
 *
 * This set replaced an earlier one built almost entirely from abstract
 * architectural facades. The facades read as one repeated texture: four
 * capabilities that do four different things all carried a curved building,
 * and the eye had nothing to tell them apart with. Each frame now depicts the
 * activity of the section it sits in.
 *
 * What stays out: handshakes, bright open-plan meeting-room stock, dunes,
 * tourist framing, and anything carrying legible third-party branding.
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
   *
   * Which axis matters depends on the frame, not on the photograph: a source
   * wider than its container is cropped horizontally and the Y value is inert;
   * a source narrower than its container is cropped vertically and the X value
   * is inert. The capability panel (4:5) and the inline capability frame
   * (16:10) sit either side of that line, which is why those entries carry a
   * deliberate value on both axes.
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
   * Retained through the imagery pass: the homepage hero currently opens on
   * the globe rather than on photography, and this is the frame to restore if
   * that ever reverses.
   */
  hero: {
    src: downtownDubaiBlueHour,
    alt: "",
    position: "50% 38%",
  },
  /**
   * Final call to action, sitewide.
   *
   * Deliberately the darkest, hardest frame in the set. It closes pages that
   * opened on calmer photography, so the two bookend rather than repeat.
   */
  cta: {
    src: gulfFinancialDistrictNight,
    alt: "",
    position: "50% 62%",
  },
  /**
   * Investor outreach feature, and the investor outreach page hero.
   *
   * Executives in silhouette at a high window over a business district at
   * dusk. Outreach is people meeting people, and the frame this replaces (a
   * still-water reflection of a business district) said only "Gulf". It also
   * survives the treatment this section applies: the band scrims the
   * photograph back to 97% at the left edge, so a frame built from a legible
   * subject on a dark ground holds its shape where a detailed cityscape turned
   * to mud.
   */
  outreach: {
    src: executivesSkylineDusk,
    alt: "",
    position: "50% 45%",
  },
  /**
   * Services index hero. Market data on screens in a darkened room.
   *
   * The capability cards below this hero now carry people, cameras and charts;
   * an architectural facade at the top of that page belonged to the old set
   * and read as a stock header. A capital-markets environment states what the
   * services are in service of.
   */
  services: {
    src: capitalMarketsDesk,
    alt: "",
    position: "50% 45%",
  },
  /** Contact hero. A Gulf skyline at twilight. */
  contact: {
    src: skylineTwilight,
    alt: "",
    position: "50% 58%",
  },
  /**
   * The enquiry band on the contact page, below the hero.
   *
   * A dark stone lobby, rather than the night skyline this slot used to share
   * with the sitewide CTA. Two things follow. The page no longer opens on one
   * skyline and repeats a second 900px later, which read as a tiling error;
   * and the enquiry panel now sits on an interior, which is the closest a
   * photograph gets to the thing the panel is for.
   *
   * It is also the darkest frame in the set, which this slot needs - the panel
   * sits directly on the image, and anything brighter has to be scrimmed so
   * far back that the photograph stops being architecture and becomes a grey
   * wash.
   */
  enquiry: {
    src: corporateLobbyDark,
    alt: "",
    position: "50% 50%",
  },
  /**
   * Insights index and article headers. An evening working session seen
   * through the glass of an office floor.
   *
   * Insights are written by people thinking about markets, so the header shows
   * that rather than another waterfront. The frame is mostly dark foreground
   * with a single lit room in it, which gives an article title somewhere to
   * sit.
   */
  insights: {
    src: strategySessionNight,
    alt: "",
    position: "50% 45%",
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
  /**
   * About hero. A lift lobby at night, lit low, its stone floor reflecting the
   * ceiling.
   *
   * The page is about how the firm works, and an interior is the register that
   * belongs to it - closer to the room a conversation happens in than the
   * ribbed concrete exterior that used to sit here. Symmetrical and receding,
   * so the split hero has a photograph with a direction in it rather than a
   * texture.
   *
   * Photographic, deliberately. The first frame tried here was a brighter
   * marble-and-brass reception hall, and it was an architectural render:
   * lighting with no source, plants with no weight. It read as a visualisation
   * of a building rather than a building, which is the one thing the art
   * direction cannot carry.
   */
  aboutPortrait: {
    src: corporateCorridorNight,
    alt: "A lift lobby at night, lit low, its polished stone floor reflecting the ceiling.",
    position: "50% 50%",
  },
  introTowers: {
    src: etihadTowersGoldenHour,
    alt: "Glass office towers on a Gulf waterfront at sunset.",
    position: "50% 40%",
  },
  /**
   * The regional frame, on the about and investor outreach pages. Riyadh at
   * night, from the air.
   *
   * Riyadh is named repeatedly in the copy on both pages and appeared nowhere
   * in the photography; the frame it replaces was a monochrome street in an
   * unidentifiable business district. Shown at 21:9 here, so the crop takes
   * the band of towers and drops most of the sky.
   */
  regionStreet: {
    src: riyadhNightAerial,
    alt: "The Riyadh skyline at night from above, its towers lit against the city grid.",
    position: "50% 42%",
  },
  /**
   * The differentiation section on the homepage, beside the sticky statement.
   *
   * That column held a heading, a line of copy and a progress rail, and then
   * stopped - leaving the lower half of it empty for the whole length of the
   * scroll. A market frame under "Built for the Way Gulf Markets Work" is the
   * one photograph the statement actually calls for.
   *
   * Reused from the contact hero rather than introduced as a seventeenth
   * frame. It appears nowhere else on the homepage, which is the constraint
   * that matters; the two never share a page.
   *
   * Crop favours the lower band. The frame is nearly half twilight sky, and a
   * centred crop in a wide slot returns mostly empty violet - dropping to 58%
   * takes the towers and the lit streets instead.
   */
  whyMarket: {
    src: skylineTwilight,
    alt: "Downtown Dubai at twilight, its towers and streets lit under a violet sky.",
    position: "50% 58%",
  },
} as const satisfies Record<string, Photo>;

/**
 * One photograph per capability, keyed by the slug in `data/capabilities.ts`.
 *
 * These four work hardest. On the homepage they are cross-faded into a single
 * panel as the pointer moves down the list, so they are read in sequence and
 * against each other within a second or two - and four variations on "curved
 * building", which is what this used to be, gave the eye nothing to register
 * as a change.
 *
 * Each frame now depicts the activity: a meeting, a hall, a camera, a screen.
 * They are also deliberately different in structure - figures at a window, a
 * crowd from behind, a foreground object against a lit ground, and a flat
 * field of data - so the crossfade reads as a change of subject rather than as
 * a change of exposure.
 *
 * Positions carry a value on both axes because these frames are used at two
 * ratios that crop on opposite axes: 4:5 in the desktop panel, 16:10 inline on
 * small viewports.
 */
export const capabilityPhotos: Record<string, Photo> = {
  "investor-relations": {
    src: irBoardroomWindow,
    alt: "People in silhouette against the full-height glazing of a high floor, a city spread out below.",
    position: "46% 52%",
  },
  "investor-outreach": {
    src: outreachConferenceHall,
    alt: "Delegates seated in a darkened conference hall beneath a wall of soft lights.",
    position: "50% 58%",
  },
  "media-relations": {
    src: mediaBroadcastCamera,
    alt: "A broadcast camera on a tripod at the back of a hall, facing a lit stage.",
    position: "64% 50%",
  },
  "digital-communications": {
    src: digitalMarketData,
    alt: "A candlestick price chart and market quotes on a dark trading screen.",
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
 * Decorative, and drawn from the market-and-analysis end of the set rather
 * than from architecture: an insight is a view on a market, so the cards carry
 * markets and the work of reading them.
 *
 * Index 0 is the only one shown large - it leads both the index page and the
 * homepage preview at 16:10 - and it is the frame whose native proportion is
 * closest to that, so the lead card is very nearly the photograph as shot. The
 * other two appear as 9rem square thumbnails, which is a crop severe enough
 * that a frame needs its subject in the middle to survive it.
 */
export const insightPhotos: Photo[] = [
  { src: abuDhabiNight, alt: "", position: "50% 50%" },
  { src: investorBriefingRoom, alt: "", position: "50% 45%" },
  { src: capitalMarketsDesk, alt: "", position: "50% 45%" },
];

/**
 * Panels for the client-segment grid. Ordered to match
 * `audienceContent.segments`:
 *
 *   0  Listed Companies                           a business district at night
 *   1  Private Companies                          two people over a document
 *   2  Pre-IPO Businesses                         a dark stone lobby
 *   3  International Companies Entering the Gulf  Riyadh from the air
 *   4  Growth Companies                           a skyline at the turn of dusk
 *   5  Leadership & IR Teams                      an office floor lit at night
 *
 * Each panel is matched to the shape of its cell as much as to its label,
 * because `PANEL_LAYOUT` gives them wildly different proportions: index 0 is a
 * tall anchor spanning two rows, indexes 1 and 3 are landscape, 2 and 4 are
 * squarer, and index 5 runs the full twelve columns at a fixed height, which
 * makes it a letterbox somewhere past 5:1.
 *
 * That last cell is why the office floor sits there. A frame shot at 2.66:1 is
 * the only one in the set that survives a crop that severe; the pair over a
 * document, which is where the label would have pointed, came back as a band
 * of two faces with the tops of both heads cut off.
 *
 * None of these frames appears anywhere else on the homepage, and that
 * constraint sets several of the choices - the capability panel, the outreach
 * band and the insight cards are all on the same scroll, and a panel repeating
 * one of them would read as a mistake rather than as a motif.
 */
export const segmentPhotos: Photo[] = [
  /*
   * Index 0 is the tall anchor panel, so it needs the frame with the most
   * weight. Pale frames read as holes at that size and are kept out of it.
   */
  { src: businessBayReflection, alt: "", position: "50% 45%" },
  { src: leadershipReviewNight, alt: "", position: "50% 45%" },
  { src: corporateLobbyDark, alt: "", position: "45% 50%" },
  { src: riyadhNightAerial, alt: "", position: "50% 50%" },
  { src: downtownDubaiDusk, alt: "", position: "50% 45%" },
  { src: officeNightWindows, alt: "", position: "50% 50%" },
];
