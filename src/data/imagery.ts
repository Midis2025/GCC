import type { StaticImageData } from "next/image";

import abuDhabiNight from "../../public/images/abu-dhabi-night.jpg";
import businessBayReflection from "../../public/images/business-bay-reflection.jpg";
import businessBayCanal from "../../public/images/uae/business-bay-dubai-canal.jpg";
import capitalMarketsDesk from "../../public/images/capital-markets-desk.jpg";
import corporateCorridorNight from "../../public/images/corporate-corridor-night.jpg";
import corporateLobbyDark from "../../public/images/corporate-lobby-dark.jpg";
import digitalMarketData from "../../public/images/digital-market-data.jpg";
import downtownDubaiBlueHour from "../../public/images/downtown-dubai-blue-hour.jpg";
import downtownDubaiDusk from "../../public/images/downtown-dubai-dusk.jpg";
import dubaiMuseumFutureTowers from "../../public/images/dubai-museum-future-towers.jpg";
import dubaiTradeCentreTowers from "../../public/images/uae/dubai-trade-centre-towers.jpg";
import editorialBroadcastGallery from "../../public/images/uae/editorial-broadcast-gallery.jpg";
import etihadTowersAbuDhabi from "../../public/images/uae/etihad-towers-abu-dhabi.jpg";
import sheikhZayedRoadDusk from "../../public/images/uae/sheikh-zayed-road-dusk.jpg";
import dohaSkylineDay from "../../public/images/doha-skyline-day.jpg";
import executivesSkylineDusk from "../../public/images/executives-skyline-dusk.jpg";
import gulfFinancialDistrictNight from "../../public/images/gulf-financial-district-night.jpg";
import investorBriefingRoom from "../../public/images/investor-briefing-room.jpg";
import irBoardroomWindow from "../../public/images/ir-boardroom-window.jpg";
import leadershipReviewNight from "../../public/images/leadership-review-night.jpg";
import louvreAbuDhabiDome from "../../public/images/louvre-abu-dhabi-dome.jpg";
import mediaBroadcastCamera from "../../public/images/media-broadcast-camera.jpg";
import outreachConferenceHall from "../../public/images/outreach-conference-hall.jpg";
import riyadhNightAerial from "../../public/images/riyadh-night-aerial.jpg";
import sectorDevelopmentCranes from "../../public/images/sector-development-cranes.jpg";
import sectorEnergyDusk from "../../public/images/sector-energy-dusk.jpg";
import sectorEnergySolarField from "../../public/images/sector-energy-solar-field.jpg";
import sectorIndustrialMono from "../../public/images/sector-industrial-mono.jpg";
import sectorLogisticsPort from "../../public/images/sector-logistics-port.jpg";
import sectorManufacturingRobotics from "../../public/images/sector-manufacturing-robotics.jpg";
import sectorTechnologyRacks from "../../public/images/sector-technology-racks.jpg";
import skylineTwilight from "../../public/images/skyline-twilight.jpg";
import strategySessionNight from "../../public/images/strategy-session-night.jpg";
import uaeLifeSciencesLab from "../../public/images/uae-life-sciences-lab.jpg";

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
 * them depicts Gulf Connect, its offices, its people or its work. See
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
  /**
   * A different crop below 640px, where the frame is usually far narrower and
   * taller in proportion than the same frame on a desktop.
   *
   * One `object-position` cannot serve both. A wide skyline cropped to a
   * near-square phone frame loses whichever side the centre crop discards -
   * on a landscape source the desktop crop is governed by the Y value and the
   * phone crop by the X value, so the same string is doing two unrelated jobs
   * at the two widths. Setting this only where the mobile crop actually loses
   * the subject; left undefined, `position` applies at every width.
   */
  positionMobile?: string;
  /**
   * Per-frame override of the sitewide grade, for a photograph that is
   * objectively out of step with the collection around it.
   *
   * Use sparingly and for tone only. If a frame needs this to be usable at
   * all, the frame is wrong - replace the photograph rather than filtering it
   * into submission.
   */
  grade?: { saturate?: number; contrast?: number; brightness?: number };
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
   * For Investors hero. Abu Dhabi's financial district after dark.
   *
   * That page opened on the boardroom-window frame borrowed from the homepage
   * capability panel - the same photograph in two of the most prominent slots
   * on the site, on two different pages. A reader who scrolled the homepage
   * and then followed "For investors" met the identical picture twice inside a
   * minute.
   *
   * Abu Dhabi rather than Dubai, deliberately: the page names Dubai, Abu Dhabi
   * and Riyadh, the homepage is already carrying Dubai twice over, and the
   * investor institutions this page addresses are disproportionately Abu Dhabi
   * ones. Shot at night, so it sits with the rest of the set.
   */
  investors: {
    src: abuDhabiNight,
    alt: "",
    position: "50% 62%",
    /* On a phone the frame is far taller; the skyline needs to sit lower still. */
    positionMobile: "50% 70%",
  },

  /**
   * Advisory hero. The Louvre Abu Dhabi dome, from beneath.
   *
   * Advisory is the least literal of the four service lines - judgement and
   * structure rather than a room full of people - and it was opening on the
   * same Downtown Dubai frame the About page uses for its portrait. A piece of
   * precise, repeating geometry says "considered structure" without pretending
   * to depict a meeting that has not happened.
   */
  advisory: {
    src: louvreAbuDhabiDome,
    alt: "",
    position: "50% 58%",
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
    /*
      Dubai's World Trade Centre district. It replaces a market-data desk -
      a legitimate capital-markets interior, but one that could have been shot
      in any city on earth, opening the page that describes what the firm sells
      in the Gulf.

      A 3:2 source, chosen for this slot on purpose: a full-bleed hero band is
      the widest frame on the site, and the two portrait frames downloaded in
      the same pass would have been reduced to a narrow horizontal strip here.
    */
    src: dubaiTradeCentreTowers,
    alt: "",
    position: "50% 42%",
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
    /*
      Business Bay and the Dubai canal from above. The Insight library is
      written about Gulf markets, and its header now says so before a word is
      read; the strategy-session interior it replaces said "a meeting".
    */
    src: businessBayCanal,
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
  /**
   * The transition band on the about page - "Regional understanding. Global
   * investor perspective." - between the market map and how the firm works.
   *
   * Abu Dhabi at night, and the teal in it is why. The band sits between a
   * dark drawn map and a light section, so it has to read as a photograph in
   * one glance from behind a heavy scrim; a warmer frame went muddy at that
   * opacity while this one holds its shape.
   *
   * The about page shows no insight cards, so it never meets the other use of
   * this frame.
   */
  aboutTransition: {
    src: abuDhabiNight,
    alt: "",
    position: "50% 52%",
  },
  /**
   * Industries index hero. Abu Dhabi at night.
   *
   * A city rather than a sector. The container terminal that opened this page
   * before was one of the six sectors listed below it, which quietly promoted
   * logistics above the other five before the reader had reached them - a hero
   * on a page about six industries cannot be a photograph of one of them.
   */
  industries: {
    src: abuDhabiNight,
    alt: "",
    position: "50% 55%",
  },
  /**
   * The transition band on the industries page, between sector knowledge and
   * the markets it is applied in. Downtown Dubai at blue hour.
   *
   * Sits at very low opacity behind a statement, which is the whole reason
   * this frame works here and nowhere else on the site: it is the brightest
   * skyline in the set, so it survives being pushed almost all the way back
   * into the ground where a darker one would simply disappear.
   */
  industriesTransition: {
    src: downtownDubaiBlueHour,
    alt: "",
    position: "50% 46%",
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
   * About hero. Downtown Dubai at dusk, from above.
   *
   * The headline it sits beside is "Built Around the Gulf. Connected to Global
   * Capital.", and a Gulf financial district is what that sentence is about. A
   * lift lobby stood here first and was the quieter, more oblique choice - an
   * interior, on the reasoning that the page is about how the firm works. It
   * was too oblique: an anonymous corridor opens a page about the Gulf without
   * saying Gulf anywhere.
   *
   * Crop favours the right of the frame. Only the width is ever cut here - the
   * hero column is narrower than the photograph at every breakpoint, so the Y
   * value is inert and the X does all the work. At 58% the tower carrying the
   * most legible signage sits at the left edge on a wide screen and is cropped
   * out altogether on a phone, where the window narrows to the middle of the
   * frame and closes on the Burj Khalifa.
   *
   * On that signage: this is a photograph of a real city and the developer's
   * name is on several towers in it, as it is in most photographs of Downtown
   * Dubai. It is incidental to the frame and implies nothing - the same
   * condition as the twilight skyline already on the contact hero. Commissioned
   * photography would remove the question; see `public/images/CREDITS.md`.
   */
  aboutPortrait: {
    src: downtownDubaiDusk,
    alt: "Downtown Dubai at dusk from above, its towers lit under a violet sky.",
    position: "58% 50%",
  },
  introTowers: {
    /*
      Sheikh Zayed Road at dusk - the business spine of Dubai, dense with
      towers, read from above.

      A 9:16 source in a square frame, which is the right way round: the crop
      keeps the middle vertical band, and on a skyline that severe crop still
      contains the subject. It would have been the wrong choice in any of the
      wide hero bands, where it would have survived as a letterbox sliver.

      The Etihad Towers frame it replaces is superseded rather than moved: the
      tall anchor on Selected Markets now carries a sharper 2400px Etihad
      composition downloaded in the same pass, so Abu Dhabi keeps its place on
      the homepage and the older 2000px frame is left unplaced. It stays in
      /public/images and in CREDITS.md, one import away from being restored.
    */
    src: sheikhZayedRoadDusk,
    alt: "Sheikh Zayed Road in Dubai at dusk, its office towers lit against a fading sky.",
    position: "50% 45%",
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
  /**
   * The Arabic gap panel. A broadcast gallery, shot dark.
   *
   * An editorial environment rather than a landmark: the section is about
   * publishing and appearing in a second language, and a skyline says nothing
   * about that. A wall of monitors in a darkened gallery says "this is where
   * coverage is made", which is the register the section is arguing in.
   *
   * It also has to work as a GROUND, not just a picture - the Arabic mark sits
   * over it at low opacity, and a busy or bright frame would leave that mark
   * either invisible or fighting the detail underneath. This one is dark
   * across most of its area with the light confined to the screens.
   *
   * Deliberately not `mediaBroadcastCamera`, which is the obvious choice and
   * the wrong one: that frame is already on this page in the capability panel,
   * and again on the media service page. Two pictures of the same subject on
   * one scroll reads as an accident.
   */
  arabicGap: {
    src: editorialBroadcastGallery,
    alt: "",
    position: "50% 45%",
    /* The screens sit centre-left; a phone crop holds them rather than the desk. */
    positionMobile: "42% 45%",
  },
  whyMarket: {
    /*
      The Museum of the Future, with Emirates Towers behind it.

      It replaces a Downtown Dubai twilight frame that the contact hero also
      used - the same photograph in the two most prominent slots on two
      different pages. This one is unmistakably Dubai to anyone who has been
      there and reads as contemporary institutional architecture to anyone who
      has not, which is the balance the whole set is trying to strike: regional
      identity without tourist framing.
    */
    src: dubaiMuseumFutureTowers,
    alt: "The Museum of the Future in Dubai, its calligraphic facade lit by low sun, with the Emirates Towers behind it.",
    /*
      Slightly below centre. The torus sits low in the frame with sky above it,
      and a centred crop in the tall sticky column fills the top third with
      empty sky while cutting the flyover the building stands on.
    */
    position: "50% 56%",
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
 * One photograph per service line, for the showcase panel on What We Do.
 *
 * Drawn entirely from frames already in the library rather than sourced anew:
 * the brief rules out introducing stock photography for the rebuilt pages, and
 * these four are the existing frames whose subjects match the four lines - a
 * conference hall, an evening working session, a broadcast camera and an
 * interior.
 */
export const serviceLinePhotos = {
  roadshows: {
    src: outreachConferenceHall,
    alt: "Delegates seated in a darkened conference hall beneath a wall of soft lights.",
    position: "50% 58%",
  },
  programme: {
    src: strategySessionNight,
    alt: "An office floor at night, seen through glass, with a working session under way.",
    position: "50% 45%",
  },
  media: {
    src: mediaBroadcastCamera,
    alt: "A broadcast camera on a tripod at the back of a hall, facing a lit stage.",
    position: "64% 50%",
  },
  advisory: {
    src: corporateCorridorNight,
    alt: "A lift lobby at night, lit low, its polished stone floor reflecting the ceiling.",
    position: "50% 50%",
  },
} as const satisfies Record<string, Photo>;

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
  /**
   * A concentrated-solar field in the desert, seen from the air.
   *
   * Replaces the storage tanks at dusk, which were the wrong frame twice over.
   * They read as extraction rather than as the sector - the entry beside them
   * is about "the transition businesses being built alongside" producers - and
   * they were near-identical in subject to the industrials frame two sections
   * below, so the page said "tanks" twice and meant two different things.
   *
   * The tank photograph is not retired: `projectPhotos` still uses it on the
   * engagements page, which is why this is a new file rather than an edit to
   * the shared one.
   */
  "energy-and-utilities": {
    src: sectorEnergySolarField,
    alt: "A concentrated-solar field in the desert, its mirrors ringing a central tower.",
    position: "50% 52%",
  },
  "real-estate-and-development": {
    src: sectorDevelopmentCranes,
    alt: "Tower cranes over a development site against a clear sky.",
    position: "50% 55%",
  },
  /**
   * A robotic arm on a production line.
   *
   * Replaces the monochrome tanks for the same reason the energy frame changed:
   * the sector entry is about manufacturers and diversified industrial groups,
   * and a tank farm is neither. The original file stays in use on the
   * engagements page through `projectPhotos`.
   */
  "industrials-and-manufacturing": {
    src: sectorManufacturingRobotics,
    alt: "A robotic arm on an automated production line.",
    position: "50% 45%",
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
export const segmentPhotos = {
  /*
   * Keyed, not indexed.
   *
   * This was a plain array read as `segmentPhotos[index]`, which meant the
   * ORDER of the labels in `audienceContent` silently decided which picture
   * each one got. Re-cutting those labels to the launch positioning promptly
   * put "Critical Minerals" over a desk meeting and "Life Sciences" over the
   * Riyadh skyline, and the fix at the time was to reorder the labels against
   * the pictures - which works until the next edit reorders them back.
   *
   * Keys make the pairing explicit and survive reordering. The mosaic's shape
   * still constrains two of them, and that constraint is real:
   *
   * - `listed` fills the tall anchor (5 cols x 2 rows), so it needs the frame
   *   with the most weight. Pale frames read as holes at that size.
   * - `international` runs the full-width letterbox, which resolves to roughly
   *   2.66:1. Only a frame whose subject survives losing its top and bottom
   *   belongs there - a skyline does, a robotic arm does not.
   */
  /*
    Etihad Towers, Abu Dhabi. A 3:4 source in the mosaic's tall anchor - the
    one panel on the page whose proportions suit a portrait frame - and the
    only Abu Dhabi landmark on the homepage now that Regional Perspective has
    moved to Dubai.
  */
  listed: { src: etihadTowersAbuDhabi, alt: "", position: "50% 40%" },
  leadership: { src: leadershipReviewNight, alt: "", position: "50% 45%" },

  /*
   * The three sector frames. These already existed in the library for the
   * retired industries page and were sitting unused while the sector labels
   * on the homepage ran over generic office and skyline stock - server racks
   * for data infrastructure and a container terminal for minerals say what
   * those categories are; a dark lobby says nothing.
   *
   * `lifeSciences` is the compromise in the set. There is no laboratory or
   * research photograph in the library and none may be invented, so it carries
   * the automated production line - precision manufacturing, which is at least
   * adjacent. It is the one frame here worth replacing when real photography
   * is commissioned.
   */
  aiInfrastructure: { src: sectorTechnologyRacks, alt: "", position: "50% 50%" },
  criticalMinerals: { src: sectorLogisticsPort, alt: "", position: "50% 50%" },
  /*
    A laboratory, at last.

    This panel carried an automated production line - precision manufacturing,
    adjacent to life sciences at best - because the library held no laboratory
    frame. It needed a heavy per-frame grade to stop a bright daylit picture
    shouting in a row of dark night ones, and a photograph that has to be
    filtered into submission is the wrong photograph.

    Gloved hands drawing from a vial inside a fume hood: dark on its own terms,
    so it needs no override, unmistakably life sciences, and no identifiable
    face - which is a requirement of every frame here, not a preference. See
    public/images/CREDITS.md.
  */
  lifeSciences: { src: uaeLifeSciencesLab, alt: "", position: "50% 50%" },

  international: { src: downtownDubaiDusk, alt: "", position: "50% 42%" },
} as const satisfies Record<string, Photo>;

export type SegmentPhotoKey = keyof typeof segmentPhotos;
