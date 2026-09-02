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
import downtownDubaiNight from "../../public/images/downtown-dubai-night.jpg";
import dubaiBurjKhalifaCutout from "../../public/images/uae/dubai-burj-khalifa-cutout.png";
import dubaiMarinaCutout from "../../public/images/uae/dubai-marina-cutout.png";
import dubaiMuseumOfTheFutureCutout from "../../public/images/uae/dubai-museum-of-the-future-cutout.png";
import riyadhKingdomCentreCutout from "../../public/images/uae/riyadh-kingdom-centre-cutout.png";
import abuDhabiEtihadTowersCutout from "../../public/images/uae/abu-dhabi-etihad-towers-cutout.png";
import dubaiSkylineBandCutout from "../../public/images/uae/dubai-skyline-band-cutout.png";
import bannerAbout from "../../public/images/banners/about.png";
import bannerContact from "../../public/images/banners/contact.png";
import bannerForInvestors from "../../public/images/banners/for-investors.png";
import bannerInsight from "../../public/images/banners/insight.png";
import bannerWhatWeDo from "../../public/images/banners/what-we-do.png";
import dubaiTradeCentreTowers from "../../public/images/uae/dubai-trade-centre-towers.jpg";
import broadcastInterviewCamera from "../../public/images/uae/broadcast-interview-camera.jpg";
import broadcastMicrophones from "../../public/images/uae/broadcast-microphones.jpg";
import etihadTowersAbuDhabi from "../../public/images/uae/etihad-towers-abu-dhabi.jpg";
import dohaSkylineDay from "../../public/images/doha-skyline-day.jpg";
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
 *
 * ----------------------------------------------------------------------------
 * CUTOUTS ARE A SECOND CLASS OF ASSET
 * ----------------------------------------------------------------------------
 * Three entries here are client-supplied PNG cutouts - a landmark on a
 * transparent ground rather than a photograph with edges to crop. They are not
 * interchangeable with the rest of the library and carry two rules:
 *
 *  - They are rendered with `fit="contain"` on `Figure`. `cover` would crop a
 *    subject that has nothing to spare, taking the spire off a tower or the
 *    base out from under it.
 *  - They take NO scrim. A scrim over a cutout darkens the panel around it as
 *    well, which turns the transparency into a visible grey rectangle - the
 *    opposite of what the transparency is for.
 *
 * `position` is meaningless on them and is deliberately absent: nothing is
 * cropped, so there is no crop to place.
 *
 * The three photographs they displaced are NOT deleted. They stay in
 * /public/images with their entries in CREDITS.md, and only their imports were
 * removed here:
 *
 *   uae/dubai-museum-of-the-future-cutout.png  <- dubai-museum-future-towers.jpg
 *   uae/dubai-marina-cutout.png                <- uae/sheikh-zayed-road-dusk.jpg
 *   uae/dubai-burj-khalifa-cutout.png          <- uae/dubai-downtown-sheikh-zayed-road.jpg
 *
 * Restoring any of them is one import and one `src`. That matters more than
 * usual here: the Dubai market panel is a cutout while its two neighbours are
 * photographs, and if that mix is judged wrong the way back is the file above.
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
  /**
   * Marks a PNG cutout - a subject on a transparent ground rather than a
   * photograph with edges to crop.
   *
   * Set on the asset, not at the call site, because the two rules it implies
   * hold everywhere the asset is used and a caller cannot be trusted to
   * remember both: `Figure` contains rather than covers it, and suppresses any
   * scrim. A scrim over a cutout darkens the panel around the subject as well,
   * which turns the transparency into a visible rectangle.
   */
  cutout?: boolean;
  /**
   * Enlarges a cutout inside its frame, to use up the transparent margin
   * baked into its own canvas.
   *
   * These PNGs are 1254x1254 boards with the landmark somewhere inside them,
   * so `object-contain` fits the BOARD to the frame and the landmark lands
   * smaller than the frame by however much padding the board carries. Measured
   * from the alpha channel of each file:
   *
   *   burj khalifa   subject 974x1250 of 1254x1254   78% wide, 100% tall
   *   dubai marina   subject 1254x847 of 1254x1254   100% wide, 68% tall
   *   museum         subject 1254x1183 of 1254x1254  100% wide, 94% tall
   *
   * The scale is chosen so the SUBJECT approaches the frame while staying
   * inside it; the board is allowed to overflow, because everything of it
   * outside the subject is transparent. A value here is only ever safe when it
   * has been checked against that bounding box - see the note on each asset.
   *
   * Left undefined the cutout is simply contained, which is right for any
   * board whose subject already spans it.
   */
  cutoutScale?: number;
}

/**
 * ============================================================================
 * INTERNAL PAGE BANNERS
 * ============================================================================
 * Client-supplied 3840x2160 compositions, one per interior route. They are a
 * THIRD class of asset here and behave like neither of the other two.
 *
 * ---------------------------------------------------------------------------
 * THE TEXT IS IN THE PIXELS
 * ---------------------------------------------------------------------------
 * Each carries an eyebrow, a paragraph and a headline burned into the image,
 * and the headline is word for word the page's own <h1>:
 *
 *   what-we-do      "FOUR LINES OF WORK, ONE PROGRAMME"
 *   for-investors   "BRIEFINGS WITH INTERNATIONAL COMPANIES"
 *   insight         "WRITTEN FOR THE GULF, ABOUT THE SECTORS WE COVER"
 *   about           "BUILT AROUND THE GULF. CONNECTED TO GLOBAL CAPITAL."
 *   contact         "START A CONVERSATION"
 *
 * Three consequences, all handled in `PageHero` rather than here:
 *
 *  - The hero's own eyebrow, title and lead would print the same words twice,
 *    so on a bannered hero they are rendered to assistive technology only. The
 *    page keeps exactly one <h1> and it stays in the DOM.
 *  - They are never cropped. `cover` on a composition whose subject is TYPE
 *    cuts sentences in half, so the hero takes the banner's own 16:9 and the
 *    section grows to fit it.
 *  - ENGLISH ONLY. There is no Arabic edition of this artwork, and overlaying
 *    Arabic copy on baked English, or showing both, is worse than showing
 *    neither. The Arabic routes keep the photographic hero they already have.
 *    Flagged for the client: identical artwork in Arabic needs either an
 *    Arabic set or a text-free set.
 *
 * ---------------------------------------------------------------------------
 * EACH BANNER SETS ITS OWN HERO HEIGHT
 * ---------------------------------------------------------------------------
 * The hero band takes the ASPECT OF THE FILE - `PageHero` lays the banner out
 * at `h-auto` from the intrinsic size of the static import - so the shape of
 * the artwork decides the shape of the hero.
 *
 * All five banners are 3840x1200 compositions (3.2:1 aspect ratio), producing
 * a balanced ~450px band at 1440px viewport width across all interior routes.
 *
 * Delivery: these are 8-15MB PNGs and none of that reaches a visitor.
 * `next/image` emits AVIF and WebP derivatives against `deviceSizes`, which
 * caps at 2048 - a downscale from 3840 at every step.
 */
export const banners = {
  whatWeDo: {
    src: bannerWhatWeDo,
    /* The banner's own words, so a screen reader gets what a sighted reader sees. */
    alt: "",
  },
  forInvestors: { src: bannerForInvestors, alt: "" },
  insight: { src: bannerInsight, alt: "" },
  about: { src: bannerAbout, alt: "" },
  contact: { src: bannerContact, alt: "" },
} as const satisfies Record<string, Photo>;

/**
 * The skyline band under "Start a Conversation".
 *
 * A 1350x303 cutout - 4.46:1 - of the Dubai waterfront, client-supplied, on a
 * transparent ground. It is neither a backdrop nor a card frame: it is a
 * horizon laid along the bottom edge of the closing band, silhouetted on the
 * section's own dark ground.
 *
 * MEASURED FROM ITS ALPHA, because the layout depends on it:
 *
 *   row   0    the Burj spire, and almost nothing else
 *   43%        5% of the row is covered
 *   60%        half the row is covered - the skyline mass starts here
 *
 * So the top 43% of this asset is very nearly empty, which is what lets the
 * heading and copy sit over it without anything behind them, and what makes it
 * safe to run full-bleed rather than shrinking it into a corner.
 *
 * The section carries a `min-h` of 22.4vw for it - 100/4.46, the asset's own
 * aspect - so a full-width skyline is never taller than the band it sits in.
 * Without that the spire is clipped at 1440 and the tallest towers go at 1920.
 */
export const ctaSkyline = {
  src: dubaiSkylineBandCutout,
  alt: "",
  cutout: true,
} as const satisfies Photo;

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
   * The registration panel on For Investors.
   *
   * A different frame from that page's hero, which is the whole reason this
   * exists as its own entry. The panel first reused `backdrops.investors` and
   * the page then rendered the same Abu Dhabi skyline twice - once behind the
   * headline and again behind the form a few screens down. Caught by counting
   * distinct images per page rather than by eye.
   *
   * Business Bay reflected in still water: dark and quiet, and legible under
   * the heavy diagonal scrim the panel lays over it.
   */
  register: {
    src: businessBayReflection,
    alt: "",
    position: "50% 52%",
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
   * The globe band on the homepage - "Why the Gulf now".
   *
   * Downtown Dubai and Business Bay at true night, long lens from across the
   * creek. It replaces executives in silhouette at a high window: a legible
   * human subject competed with the globe beside it, and the section is an
   * argument about a market rather than a picture of a meeting.
   *
   * Chosen for its top two thirds, which are almost black. The band scrims the
   * photograph back to 97% at the left edge and 62% at the right, and a frame
   * with that much empty sky survives it as architecture instead of turning to
   * mud - the towers read where the globe is, the headline sits over sky.
   *
   * No legible third-party branding, per the art direction above: this frame is
   * shot far enough back that the towers are a skyline, not signage.
   */
  outreach: {
    src: downtownDubaiNight,
    alt: "",
    /*
      Lower than the middle, deliberately. The skyline sits across the lower
      third of the frame and a centred crop pushes it under the fold of the
      band; this keeps the towers behind the globe and the empty sky behind the
      headline.
    */
    position: "50% 62%",
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
      Dubai Marina at night, the towers reflected in the water.

      CUTOUT, client-supplied. A square asset in a square frame, which is why
      this slot took it rather than one of the wide bands: at 662px on a
      desktop the 1254px source is still oversampled, and nothing has to be
      cropped to make it fit.

      It replaces a Sheikh Zayed Road aerial. That photograph is not deleted -
      it stays in /public/images and in CREDITS.md, one import away from being
      restored if the cutout treatment is ever reversed.

      No `position`: nothing is cropped.
    */
    src: dubaiMarinaCutout,
    alt: "The Dubai Marina skyline at night, its towers lit and reflected in the water.",
    cutout: true,
    /*
      NO `cutoutScale`, deliberately.

      The skyline spans its board edge to edge - 100% of the width - so it is
      already as wide as the frame allows and any scale at all would push the
      end towers out of view. The board's 32% of empty sky above it costs
      nothing now that the frame paints no background: what sits there is the
      section, not a grey box.
    */
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
   * across most of its area with the light confined to the lens.
   *
   * ---------------------------------------------------------------------------
   * WHY THE PREVIOUS FRAME HAD TO GO
   * ---------------------------------------------------------------------------
   * It was `editorialBroadcastGallery`, and the subject was wrong in a way that
   * is only visible once you look at it closely: the monitors in that gallery
   * are running a church worship service. The lyrics are legible across two
   * screens, and there is a drum kit and a pair of guitars on the camera feeds.
   *
   * On the section arguing that this firm publishes in Arabic for Gulf
   * business audiences, that is not merely dull - it is the wrong content, and
   * it carries legible third-party text, which the rules in `CREDITS.md` rule
   * out on their own.
   *
   * This frame keeps everything that slot needs - a broadcast subject, dark
   * across most of its area, light confined to one place, no branding and no
   * identifiable face - and says "interview" rather than "gallery".
   *
   * Still deliberately not the frame on the media capability panel. That one is
   * now `broadcastMicrophones`, so the two are different objects: a lens here,
   * microphones there. Two pictures of the same subject on one scroll reads as
   * an accident.
   */
  arabicGap: {
    src: broadcastInterviewCamera,
    alt: "",
    /* The lens sits left of centre; both crops hold it rather than the body. */
    position: "38% 50%",
    positionMobile: "34% 50%",
  },
  whyMarket: {
    /*
      The Museum of the Future, with the Emirates Towers behind it.

      CUTOUT. Same subject as the photograph it replaces, supplied by the
      client on a transparent ground. The frame it sits in is inside a
      `tone="dark"` section and `Figure` paints the panel midnight, so the
      transparency resolves onto the section's own ground rather than onto a
      box added for it.

      No `position`: rendered with `fit="contain"`, so the whole torus and the
      towers behind it stay in frame. The photograph needed a crop held below
      centre to keep the flyover; a cutout has nothing to crop.
    */
    src: dubaiMuseumOfTheFutureCutout,
    alt: "The Museum of the Future in Dubai, its calligraphic facade lit at dusk, with the Emirates Towers behind it.",
    cutout: true,
    /*
      NO `cutoutScale`. The subject spans this board horizontally and fills 94%
      of it vertically, so contain already puts it within a few per cent of the
      frame on both axes. There is nothing to reclaim.
    */
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
  /*
    Microphones rather than the venue camera that was here.

    Two reasons. The camera frame carried a heavy magenta cast from the stage
    lighting, which is the one colour on the site with nowhere to sit; and the
    Arabic gap panel on the same page now needs a broadcast subject of its own,
    so keeping a camera in both places would have put two of them on one
    scroll. A pair of studio microphones says the same thing about the work and
    is a different object.
  */
  "media-relations": {
    src: broadcastMicrophones,
    alt: "Two professional broadcast microphones on boom arms in a studio.",
    position: "50% 50%",
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
  /*
   * Investor Roadshows — 3840×2560. A large conference hall, delegates in
   * silhouette against a warm ambient glow. The scale of the room signals the
   * breadth of an outreach campaign rather than a single meeting.
   */
  roadshows: {
    src: outreachConferenceHall,
    alt: "Delegates seated in a large conference hall under a warm ambient glow.",
    position: "50% 58%",
  },
  /*
   * The Gulf Programme — 3840×2880. A boardroom at night with floor-to-ceiling
   * glass and a city skyline beyond. The scale and the city backdrop carry the
   * premium, six-month continuity nature of the programme.
   */
  programme: {
    src: irBoardroomWindow,
    alt: "A boardroom at night with panoramic glass overlooking a Gulf city skyline.",
    position: "50% 42%",
  },
  /*
   * Media & Arabic Communications — 3840×2560. A professional broadcast camera
   * on location, facing a lit stage; sharper and more on-set than the studio
   * tripod variant, contextually placing the service in live financial media.
   */
  media: {
    src: broadcastInterviewCamera,
    alt: "A professional broadcast camera set up on location facing a lit interview stage.",
    position: "50% 50%",
  },
  /*
   * Advisory — 3840×2880. A capital markets desk at night with multiple
   * financial screens, placing the work firmly in the analytical advisory space.
   */
  advisory: {
    src: capitalMarketsDesk,
    alt: "A capital markets desk at night with multiple financial data screens.",
    position: "50% 45%",
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
 */
export const segmentPhotos = {
  listed: {
    src: etihadTowersAbuDhabi,
    alt: "",
    position: "50% 40%",
  },
  leadership: {
    src: leadershipReviewNight,
    alt: "",
    position: "50% 45%",
  },
  dataCentres: {
    src: sectorTechnologyRacks,
    alt: "",
    position: "50% 50%",
  },
  mining: {
    src: sectorLogisticsPort,
    alt: "",
    position: "50% 50%",
  },
  energy: {
    src: sectorEnergyDusk,
    alt: "",
    position: "50% 55%",
  },
  pharmaceuticals: {
    src: uaeLifeSciencesLab,
    alt: "",
    position: "50% 50%",
  },
  international: {
    src: downtownDubaiDusk,
    alt: "",
    position: "50% 42%",
  },
} as const satisfies Record<string, Photo>;

export type SegmentPhotoKey = keyof typeof segmentPhotos;

/**
 * The three markets, for `MarketContexts` on the homepage.
 *
 * Chosen against what is already on that page rather than purely on merit.
 * The homepage carries fourteen photographs by the time this section renders,
 * and three of the obvious choices were already spoken for: Downtown Dubai at
 * dusk closes the segment mosaic, Etihad Towers anchors it, and Sheikh Zayed
 * Road opens Regional Perspective. Repeating any of them a few screens later
 * would read as a mistake rather than as a motif.
 *
 * So Dubai takes the blue-hour frame that was held in reserve for a hero the
 * page no longer uses, Abu Dhabi takes the night skyline that heads For
 * Investors on another route, and Riyadh takes the aerial that appears only on
 * About. Nothing here repeats within the page.
 *
 * `alt` is empty on all three: the city name is set as a heading directly
 * beneath each frame, so an announced description would only repeat it.
 */
/**
 * The three market panels.
 *
 * ---------------------------------------------------------------------------
 * EACH ONE HAS TO NAME ITS OWN CITY WITHOUT THE LABEL
 * ---------------------------------------------------------------------------
 * That is the first job of this set:
 *
 *   Dubai      Burj Khalifa over the Sheikh Zayed Road interchange
 *   Abu Dhabi  Burj Mohammed Bin Rashid at the World Trade Center
 *   Riyadh     Kingdom Centre, its arch unmistakable, over the city below
 *
 * ---------------------------------------------------------------------------
 * THE SECOND JOB IS DENSITY, AND IT IS WHY THIS SET WAS REPLACED AGAIN
 * ---------------------------------------------------------------------------
 * The previous three named their cities correctly and still read as soft. The
 * cause was composition, not resolution: they were long-lens frames of one or
 * two towers standing in a large field of empty sky - Riyadh was roughly
 * three-quarters flat haze, Abu Dhabi three-fifths flat blue. A tall card
 * filled mostly with a smooth gradient carries almost no high-frequency
 * detail, so it reads as low-resolution however many pixels the file has.
 *
 * Each of these carries architecture across most of its height instead. That,
 * plus the two delivery faults found alongside them - the `qualities`
 * allowlist in next.config.ts, which was silently pinning every frame on the
 * site to q75, and the scrim these panels were passing to Figure - is what
 * the sharpness complaint was actually about.
 *
 * ---------------------------------------------------------------------------
 * NOT ETIHAD TOWERS
 * ---------------------------------------------------------------------------
 * The obvious Abu Dhabi frame is Etihad Towers, and it is the one photograph
 * this panel may not use: `segmentPhotos.listed` is already Etihad Towers and
 * sits on this same page. Burj Mohammed Bin Rashid, on Khalifa Street, is the
 * other Abu Dhabi landmark that reads at card size, and it is a genuinely
 * different building rather than the same one from a second angle.
 *
 * `position` on each holds the landmark through the crop - see the note on
 * each. Verified at 1440 and again at 390, where the cards are taller still.
 */
export const cityPhotos = {
  dubai: {
    /*
      CUTOUT, client-supplied. The Burj Khalifa with its podium and the palms
      around it, on a transparent ground.

      THIS PANEL IS NOW UNLIKE THE OTHER TWO, and that is a decision rather
      than an oversight. The client supplied cutouts for Dubai and Riyadh but
      not for Abu Dhabi, and the Riyadh file is 466px - too small for a frame
      this size. So Dubai is a cutout and its two neighbours are photographs
      until a matching Abu Dhabi asset exists.

      What keeps the row coherent meanwhile: the card, its 4:5 ratio, the
      stagger and the midnight panel are all unchanged, so the three still read
      as one set. Only what sits inside the Dubai panel has changed.

      No `position`: rendered with `fit="contain"`, so the spire stays in
      frame without a crop to hold it there.
    */
    src: dubaiBurjKhalifaCutout,
    alt: "",
    cutout: true,
    /*
      1.18, and the arithmetic behind it.

      The card is 4:5. Contain fits this square board to the card's WIDTH, so
      it paints 400x400 in a 400x500 card and the bottom fifth of the card is
      empty - while the tower itself, 78% of the board's width, paints at only
      312 of the 400 available.

      Scaling the board to 472 puts the tower at 368x472: it now uses the
      card's height rather than its width, which is the right axis for the
      tallest building in the world. The board overflows the card by 36px each
      side, and every one of those pixels is transparent - the tower's own
      edges sit 11% (52px at this scale) inside the board.

      1.25 would fill the card's height exactly and leave the tower touching
      both edges. 1.18 keeps roughly 14px of air top and bottom.
    */
    cutoutScale: 1.18,
  },
  "abu-dhabi": {
    /*
      CUTOUT, client-supplied. Etihad Towers on the Corniche.

      This is the asset the row was waiting for. Dubai and Riyadh became
      cutouts first and Abu Dhabi stayed a photograph because none existed;
      all three now match.

      It is 640x960 against 1254x1254 for the other two - the smallest of the
      set. In a 400x500 card, contain fits it to the card's HEIGHT (its 0.67
      board is taller than the 0.8 card), so it paints 333x500 and needs 666px
      at 2x against 640 available: 0.96x, a 4% enlargement. Visible only under
      magnification, and the alternative was leaving one photograph in a row of
      cutouts. Worth re-exporting at 1254 if the client can.
    */
    src: abuDhabiEtihadTowersCutout,
    alt: "",
    cutout: true,
    /*
      2800x3500 is exactly 4:5, so nothing is cropped and the centre is the
      only honest value. The frame was cut to that ratio at source rather than
      left to object-fit: the full photograph has a strip of parked traffic
      along the bottom, and trimming it in the download keeps every delivered
      pixel on the architecture.
    */
    position: "50% 50%",
  },
  riyadh: {
    /*
      CUTOUT, client-supplied. Kingdom Centre and its arch, the palms along
      Olaya and the traffic beneath - the same landmark as the photograph it
      replaces.

      This arrived after the first cutout pass and resolves the problem that
      held Riyadh back then: the earlier Riyadh file was 466px, too small for
      a 400x500 card without a visible enlargement. This one is 1254px, the
      same board as the other three.

      Two of the three market panels are now cutouts. Abu Dhabi remains a
      photograph until a matching asset exists for it.
    */
    src: riyadhKingdomCentreCutout,
    alt: "",
    cutout: true,
    /*
      1.10, and the arithmetic behind it.

      Measured from the alpha: the subject is 1089x1212 of the 1254x1254 board -
      87% of its width, 97% of its height - with 97px of margin on the left and
      69px on the right. Contain fits the board to the card WIDTH, so it paints
      400x400 in a 400x500 card and the tower reaches only 348 of the 400
      available, with a fifth of the card empty below it.

      Scaling the board to 440 puts the tower at 383x427. The board overflows
      the card by 20px each side, which is inside the 34px and 24px of
      transparent margin it carries there, so nothing visible is cut.

      1.15 is the point at which the tower touches both side edges. 1.10 keeps
      about 8px of air either side and 30px above the palms at the base.
    */
    cutoutScale: 1.1,
    /*
      3280x4100 is exactly 4:5, cut from a 5200x4100 landscape at source.

      That crop had to happen in the download rather than in object-fit. Next
      picks its variant from the width in `sizes`, so a landscape frame going
      into a tall box loses a third of that width to the cover crop and ends
      up SHORT of the pixels the box needs - measured at 1080x852 served into
      an 800x1000 device-pixel card, a 1.17x enlargement. Cropping to ratio
      first makes the served variant land exactly on the frame.

      Kingdom Centre stands almost exactly on the centre line and the city
      reads outward from it in both directions, so the crop is centred.
    */
    position: "50% 50%",
  },
} as const satisfies Record<string, Photo>;
