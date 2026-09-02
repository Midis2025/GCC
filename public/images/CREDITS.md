# Photography — provenance and licence

These photographs are **art direction placeholders**, not client assets.

Every file in this directory is an [Unsplash](https://unsplash.com) photograph, used
under the [Unsplash Licence](https://unsplash.com/license): free to use for commercial
and non-commercial purposes, no permission or attribution required. The source of each
frame is recorded below anyway, so any of them can be verified.

Only free Unsplash photographs are used. Nothing here comes from Unsplash+
(`plus.unsplash.com/premium_photo-…`), which is a separate paid licence.

## Brand assets (not photography)

Some files in this directory are client artwork, or built from it, and the Unsplash
note above does not apply to them:

- `logo.svg` — supplied by the client.
- `favicon.png` — supplied by the client. The squared copies actually served are
  `/public/favicon.png`, `/public/apple-icon.png` and `/src/app/favicon.ico`.
- `og-default.png` — the 1200×630 link-preview card. Built from `logo.svg`'s mark
  paths, the palette in `globals.css` and `shortDescription` from `data/site.ts`,
  set in Plus Jakarta Sans. Regenerate it if the logo, the palette or that line
  changes; it is a static file and nothing renders it at runtime.
- `heropic.png`, and its byte-identical copy `ChatGPT Image Aug 20, 2026, 11_53_53
  AM.png` — an early layout mockup. Neither is referenced by any page.

### Client-supplied landmark cutouts

Three PNGs supplied by the client, copied in byte-for-byte and not regenerated,
recoloured or re-cut. They are **not** Unsplash and the note at the top of this file
does not apply to them; their licence is whatever the client holds.

| File | Subject | Source PNG | Size |
| --- | --- | --- | --- |
| `uae/dubai-marina-cutout.png` | Dubai Marina at night, towers and reflection | `Dubai Marina.png` | 1254×1254 RGBA |
| `uae/dubai-museum-of-the-future-night-cutout.png` | Museum of the Future at night on its landscaped mound | `new one.png` | 1536×1024 RGBA |
| `uae/dubai-skyline-band-cutout.png` | Dubai skyline band under "Start a Conversation" | `start convp.png` | RGBA |

The three MARKET cutouts that used to head this table — Burj Khalifa, Kingdom
Centre and Etihad Towers — are gone, replaced by full night photographs. See
"Client-supplied market photographs" below.

These are a different KIND of asset from everything else here: a subject on a
transparent ground, with no spare edges. `Photo.cutout` marks them in
`src/data/imagery.ts` and `Figure` reads that flag to do three things — contain
rather than cover, suppress any scrim, and paint NO background on the frame. All
three are set on the asset rather than at the call site, because each is wrong in
the same way if forgotten: a cover crops the landmark, and a scrim or a background
draws the rectangle the transparency exists to avoid.

`Photo.cutoutScale` enlarges one inside its frame where its own board carries
transparent margin. Every value is derived from the alpha bounding box of that
file and checked against it, so the board may overflow the frame but the subject
never does:

| Asset | Subject within its board | Scale | Subject at 1440 |
| --- | --- | --- | --- |
| Dubai Marina | 1254×847 — 100% w, 68% h | none | 100% of frame width |
| Museum of the Future | 1500×937 — 98% w, 91% h | none | 100% of frame width |

Marina and the Museum span their boards horizontally already, so there is no slack
to take and any scale would push them out of frame.

Transparency survives delivery. `next/image` re-encodes them and the alpha is
carried in every format it serves: AVIF and WebP keep a real alpha channel, and the
PNG fallback is written as palette + `tRNS`, which is a 256-entry alpha table rather
than a lost one.

**Photographs these replaced.** All remain in this directory, with their entries
below, and only their imports were removed: `dubai-museum-future-towers.jpg`
and `uae/sheikh-zayed-road-dusk.jpg`.

### The Museum of the Future cutout

`new one.png` → `uae/dubai-museum-of-the-future-night-cutout.png`, copied in
byte-for-byte and verified by SHA-1. 1536×1024 RGBA.

**The transparency is real, and was measured rather than trusted.** An RGBA
header proves only that an alpha channel exists — a photograph exported from
most tools carries one that is 255 everywhere and renders as a rectangle. This
file is **32.6% fully transparent**, a further **4.5% partial alpha** at the
edges and the glow, and all four corners read alpha 0. It survives delivery
too: 36.5% of the pixels in what `next/image` actually serves are non-opaque,
measured at all 14 widths.

**The frame's ratio follows the board.** A contained cutout paints nothing
outside its own proportion, so any disagreement between board and frame is
empty column. This board is 3:2 where the previous one was square, so the
frame's below-`lg` ratio changed from `aspect-square` to `aspect-[3/2]`. Left
square, it would have painted 350×233 in a 350px column with a third of the
height standing empty. Above `lg` the frame is a flex child taking whatever
height the type leaves it — measured between 0.87 and 1.44 — and the board is
wider than all of those, so contain fits it to the WIDTH.

Result, measured at 1920, 1600, 1440, 1366, 1280, 1024, 834, 768, 430, 412,
390, 375, 360 and 320: the landmark spans **100% of the column width at every
one**, contained, with no background painted and no horizontal overflow.

**The composition changed with it.** The previous cutout carried the Emirates
Towers behind the torus; this one is the museum on its own mound with palms and
flagpoles at the base and nothing behind. The alt text was rewritten to match —
an alt describing a different picture is worse than a shorter one.

### Client-supplied market photographs

The three homepage market panels are **photographs again**, not cutouts. The
client supplied full night frames of the same three cities and every one is
8-bit RGB with **no alpha channel** — read from the PNG headers, colour type 2,
not assumed. A cutout flag on a file with no transparency does not float a
landmark; it letterboxes a rectangle inside the card. So these are rendered the
way the frame was built for a photograph: cover, the midnight ground beneath,
and `position` deciding the crop.

| File | Subject | Source PNG | Size | Crop |
| --- | --- | --- | --- | --- |
| `uae/dubai-burj-khalifa-night.png` | Burj Khalifa at night from the lake, podium and mall beneath | `Burj Khalifa new.png` | 1024×1536 RGB | 50% 50% |
| `uae/abu-dhabi-etihad-towers-night.png` | Etihad Towers at night across the marina | `DHABIIIIIII.png` | 1024×1536 RGB | 50% 50% |
| `uae/riyadh-king-fahd-road-night.png` | A twisted tower on King Fahd Road, lit palms, wet carriageway | `RIYADH (1).png` | 1086×1448 RGB | 50% 50% |

Copied in byte-for-byte, verified by SHA-1 against the supplied originals. Not
regenerated, recoloured, re-cut or re-encoded. Licence is whatever the client
holds.

**The centre crop was measured, not defaulted.** Each was profiled row by row
for lit pixels — on a night shot the first lit row from the top is the roofline —
and the candidate crops were then rendered and looked at. Into the 4:5 card,
Dubai and Abu Dhabi lose 256px of height (16.7%) and Riyadh 90px (6.2%). All
three run their subject from a roofline near the top to a reflection at the
bottom edge, so anchoring to the top would keep unused headroom and cut the
element that grounds each frame: the mall deck under the Burj, the gold podium
under Etihad Towers, the wet road under the Riyadh tower.

**Resolution, honestly.** Measured against the real rendered card at 13
viewports, not against the 30vw in `sizes`. One case is short: at a 1920
viewport the card is 539px, so a 2× display asks 1078px and the two 1024px files
give 1024 — a 1.05× enlargement, 5%. Everywhere else there is 1.2×–2.6× spare and
Riyadh's 1086px clears even that case. Worth a re-export at ~1280 if the client
can.

**FLAGGED — Etihad Towers now appears twice on the homepage.** This set used to
carry a rule that the Abu Dhabi panel may not be Etihad Towers, because
`segmentPhotos.listed` (the "Listed Small and Mid-Cap Companies" panel in the
Segments mosaic) is Etihad Towers on the same page. That is still true —
`etihad-towers-abu-dhabi.jpg` is served by the homepage, verified in the
rendered HTML. The client supplied Etihad Towers for this panel anyway and the
instruction was explicit, so it is used, but the clash is real and is not
silently accepted. The fix belongs to the other panel and is one line: point
`segmentPhotos.listed` at `abuDhabiNight` or `louvreAbuDhabiDome`, both in the
library and neither on the homepage. Not done here because changing the Segments
mosaic was not what was asked for.

**FLAGGED — the Riyadh landmark changed.** The panel this replaces was Kingdom
Centre and its arch. The tower filling the new frame is a different one, with
Kingdom Centre small on the horizon to the right. No copy anywhere names either
building and the alt text is empty, so nothing on the page is made untrue, but
it is a change of subject and not only of photograph.

**Cutouts these replaced.** `uae/dubai-burj-khalifa-cutout.png`,
`uae/riyadh-kingdom-centre-cutout.png` and
`uae/abu-dhabi-etihad-towers-cutout.png` are deleted — 4.4MB between them,
nothing renders them, and git holds them if these ever have to be rolled back.
Their source PNGs (`Burj Khalifa.png`, `Kingdom Centre.png`, `Abu Dhabi.png`)
remain in this directory untouched.

Also supplied and deliberately UNUSED / HELD:

- `Museum of Future.png` — 1336×1177 **RGB, no alpha channel**. Supplied as a
  replacement for the Museum of the Future frame and briefly used as one, then
  reverted: the landmark is wanted in full with a transparent background, and
  this file has no transparency to show. It could not be given any without
  erasing its sky and inventing what stands behind it, which would be a
  fabricated asset. Superseded by `new one.png`, which is the same landmark
  properly cut. Held.
- `Museum of the Future.png` — the 1254×1254 square cutout that
  `new one.png` replaced. Genuine transparency, but the older composition
  (torus plus Emirates Towers, no landscaping) and a square board that no
  longer matches the 3:2 frame. Held.
- `1.png` — a Burj Khalifa cutout at 640×960, and `Riyadh.png` at 466×466.
  Both were superseded first by the larger cutouts and now by the night
  photographs. Held.
- `Burj Khalifa.png`, `Kingdom Centre.png`, `Abu Dhabi.png` — the source PNGs
  for the three market cutouts that the night photographs replaced. Held, in
  case the client wants the cutout treatment back.
- `Palm Jumeirah.jpg` and duplicate `112-172534.jpg` (900×600) — no section on
  the site has Palm Jumeirah as its subject. Held.
- `The Dubai Frame.avif` and duplicate `Dubai Frame.avif` — no section has Dubai
  Frame as its subject. Held.
- `Louvre Abu Dhabi.avif` and duplicate `public.avif` — no section has Louvre Abu
  Dhabi as its subject. Held.
- Low-resolution preview images (`advisory.png` 348×218, `gulf programme.png` 348×218,
  `investor roadshows.png` 348×218, `media n arabic comm.png` 348×218, `data centre.png` 466×466,
  `mining gcc.png` 466×466, `pharmaceuticals.png` 466×466, `listed small companies .png` 466×466,
  `inmternational companies entering the gulf.png` 466×466) — held in reserve.
  Rendered in desktop panels (400px–1400px wide), these low-resolution previews cause
  visible blurriness and pixelation; the site maintains the sharp 1800px–3840px master
  library photographs to guarantee crisp rendering across 2×/3× Retina displays.

### Client-supplied page banners

Five 3840×1200 compositions (3.2:1 aspect ratio), one per interior route, copied in byte for byte. Not
Unsplash; their licence is whatever the client holds.

| File | Route | Source PNG | Weight | Dimensions |
| --- | --- | --- | --- | --- |
| `banners/what-we-do.png` | /what-we-do | `24.png` / `what-we-do.png` | 8.0MB | 3840×1200 |
| `banners/for-investors.png` | /for-investors | `30.png` | 4.7MB | 3840×1200 |
| `banners/insight.png` | /insight | `29.png` | 4.7MB | 3840×1200 |
| `banners/about.png` | /about | `26.png` | 4.6MB | 3840×1200 |
| `banners/contact.png` | /contact | `28.png` | 3.5MB | 3840×1200 |

**The text is in the pixels.** Each carries an eyebrow, a paragraph and a headline
burned into the artwork, and the headline is word for word the page's own `<h1>`.
That drives three decisions, all in `PageHero`: the hero's own eyebrow, title and
lead render to assistive technology only, so nothing is printed twice and the page
keeps exactly one `<h1>`; the banner is never cropped, because `cover` on a
composition whose subject is type cuts sentences in half; and it is ENGLISH ONLY.

**Arabic routes do not get these.** There is no Arabic edition of the artwork, and
overlaying Arabic copy on baked English — or showing both — is worse than showing
neither, so the Arabic routes keep the photographic hero they already had. Identical
artwork in Arabic needs either an Arabic set or a text-free set from the client.

**None of that weight reaches a visitor.** `next/image` emits AVIF and WebP against
`deviceSizes`, which caps at 2048 — a downscale from 3840 at every step. Measured at
a 1920 viewport: 55–143KB AVIF against an 8–15MB source, about 99% smaller.

**Notes for the client.**

- `banners/about.png` carries legible EMAAR branding on four towers. The rule at the
  top of this file rules out third-party branding; this is a client-supplied asset
  so it is used as given, but it is the one frame here worth reshooting.
- All five banners are 3840×1200 re-cuts at 3.2:1, which makes a 450px band at 1440.
  `PageHero` lays the banner out at `h-auto` from the intrinsic size of the static import,
  so the hero band takes the shape of whatever file it is given without distortion.

## Content integrity

**None of these images depicts GCC, its offices, its people, its clients or its work.**
They are photographs chosen to give the typography a setting and to say what a section
is about.

Three consequences follow, and all of them matter:

- Alt text must stay descriptive of the *photograph* ("delegates seated in a darkened
  conference hall"), never of the firm. Never write alt text, a caption or a heading
  that implies a room shown here is a GCC office, a GCC event or a GCC project.
- The people in these frames are not GCC's people. Frames showing identifiable faces
  are avoided; the ones with figures in them are silhouettes, crowds seen from behind,
  or subjects too small or too dark to identify. Never caption one as a named person.
- Frames used purely as a backdrop behind a headline carry `alt=""` and are marked
  decorative, because the headline already carries the meaning.

## Replacing these with commissioned photography

1. Drop the new file into this directory.
2. Update the matching import in `src/data/imagery.ts`.
3. Update the `alt` text so it describes the new photograph accurately.

No component needs to change. Sizes, crops, scrims, the grain treatment and the
sitewide colour grade are all applied by `src/components/ui/Figure.tsx`.

The art direction to brief a photographer against: **the work, shot dark.** Investor
meetings, conference halls, financial media, market data and premium Gulf interiors,
with Gulf financial districts as the setting rather than the subject. Cinematic,
desaturated, cool, strong negative space. No handshakes, no bright open-plan
meeting-room stock, no dunes, no tourist framing, and nothing carrying legible
third-party branding.

## The 2026 imagery pass — resolution and location accuracy

Two problems were addressed together: frames that were too small to stay sharp, and
frames whose subject did not match the section they sat in.

### Resolution

Every photograph still in use was re-downloaded from its own Unsplash id at **3840px on
the long edge**, replacing sources that were mostly 2000px. Same photographs, same
licence, same crops — only the pixel count changed. `fit=max` was used, so no frame was
re-cropped or had its aspect ratio altered by the refetch.

This matters because of how the site serves images. `next.config.ts` caps `deviceSizes`
at 2048, so a 2000px source was being *upscaled* into the 2048 bucket on large displays —
which is exactly the softness that prompted this pass. Anything comfortably above 2048
makes that bucket a genuine downscale, and leaves pixels in hand for the frames that are
cropped by `object-position` rather than shown whole.

Delivery is unchanged and still handled by `next/image`: AVIF and WebP, a responsive
`srcset`, lazy loading below the fold. Nobody downloads a 3840px JPEG; the large source
exists so the derivatives are sharp.

**Not re-downloaded, and why.** Five frames in use predate the id-recording convention and
have no source URL on file, so there is nothing to refetch them from. They remain at
2000px: `business-bay-reflection.jpg`, `doha-skyline-day.jpg`,
`gulf-financial-district-night.jpg`, `skyline-twilight.jpg` and
`downtown-dubai-blue-hour.jpg`. The dead `sector-*` set and `etihad-towers-golden-hour.jpg`
were skipped deliberately — nothing renders them.

### The three market panels — replaced, then replaced again

`cityPhotos` went through two passes. The first fixed identity: the panels name Dubai,
Abu Dhabi and Riyadh, and none of the three frames then in place identified its city.
That pass got the landmarks right and the frames were still described as soft.

The second pass found why, and it was not the pixel count. All three replacements were
long-lens frames of one or two towers standing in a large field of empty sky — Riyadh was
roughly three-quarters flat haze, Abu Dhabi three-fifths flat blue. A 4:5 card filled
mostly with a smooth gradient carries almost no high-frequency detail, so it reads as
low-resolution however large the file is. Two delivery faults were compounding it, both
recorded in the code:

- **`images.qualities` was unset in `next.config.ts`.** Next 16 changed that default from
  *all allowed* to `[75]` and clamps silently, so every photograph on the site was being
  re-encoded at q75 with no way to raise one. The list is now `[75, 90]`; only these three
  panels ask for 90.
- **These panels were passing `overlay="soft"` to `Figure`.** Nothing is set over these
  frames — the city, country and description all sit *below* the panel — so a scrim that
  runs to 90% at the foot and 24% two-thirds of the way up was flattening three daylight
  photographs to hold type that is not there. They now pass `veil`.

The set in use is below. Each was chosen for density as much as for landmark: architecture
carries across most of the height in all three, and they are lit differently on purpose so
the row is not three variations of one photograph. None is a night shot.

| File | City | Landmark | Source pixels | Light | Source |
| --- | --- | --- | --- | --- | --- |
| `uae/dubai-downtown-sheikh-zayed-road.jpg` | Dubai | Burj Khalifa above the Sheikh Zayed Road interchange, with the metro viaduct | 2668×4000 | Dusk, warm grade | https://images.unsplash.com/photo-1657106251952-2d584ebdf886 |
| `uae/abu-dhabi-world-trade-centre.jpg` | Abu Dhabi | Burj Mohammed Bin Rashid at the World Trade Center, Khalifa Street | 2800×3500 | Clear daylight | https://images.unsplash.com/photo-1655921779880-69f4c192e4f6 |
| `uae/riyadh-kingdom-centre-skyline.jpg` | Riyadh | Kingdom Centre and its arch over the Olaya district | 3280×4100 | Late afternoon | https://images.unsplash.com/photo-1778846266217-6a7783e6eabd |

**Abu Dhabi is deliberately not Etihad Towers.** That is the obvious frame and it is the
one this panel may not use: `segmentPhotos.listed` is already Etihad Towers and sits on
the same page. Burj Mohammed Bin Rashid is the other Abu Dhabi landmark that reads at card
size, and it is a different building rather than the same one from a second angle.

**Two of the three were cut to 4:5 in the download, not by `object-fit`.** Next chooses its
variant from the width in `sizes`, so a landscape source going into a tall box loses a
third of that width to the cover crop and lands *short* of the pixels the box needs —
Riyadh measured 1080×852 served into an 800×1000 device-pixel card, a 1.17× enlargement.
Cropping to ratio at source fixes that and spends every delivered pixel on the frame. Abu
Dhabi was cut for composition too: the full photograph has a strip of parked traffic along
the bottom. Dubai is left at its native 2:3 and cropped by `position: "50% 0%"`, which
holds the Burj Khalifa's spire — it sits a few pixels below the top edge, so any vertical
offset takes the tip off.

Measured after the change, at 1440 CSS px: **1.60× oversample at 100%, 1.28× at 125%,
1.25× at 150%, 1.35× at 200%, 1.20× at 300%**, and 1.37× on a 390px phone at 3×. Nothing
is enlarged at any step.

Retired with this pass: `uae/downtown-dubai-burj-khalifa.jpg`,
`uae/abu-dhabi-corniche-skyline.jpg` and `uae/riyadh-kingdom-centre.jpg`. Deleted rather
than left in the tree — a frame that was rejected for composition should not be one import
away from being used again.

### `uae/editorial-broadcast-gallery.jpg` — removed from the repository

This is the one deletion. It sat on the Arabic Gap panel, and the subject was wrong in a
way that is only visible once you look closely: **the monitors in that gallery are running
a church worship service.** The lyrics are legible across two screens, and there is a drum
kit and a pair of guitars on the camera feeds.

On the section arguing that this firm publishes in Arabic for Gulf business audiences,
that is not merely a dull photograph — it is the wrong content, and the legible
third-party text breaks the rule stated at the top of this file on its own. The file was
deleted rather than left in place, because a frame like that should not be one import away
from being used again.

### Media frames, re-cast

| File | Now used for | Source |
| --- | --- | --- |
| `uae/broadcast-interview-camera.jpg` | The Arabic Gap panel (homepage) | https://images.unsplash.com/photo-1535540878298-a155c6d065ef |
| `uae/broadcast-microphones.jpg` | Media Relations capability | https://images.unsplash.com/photo-1567598110120-04e7c2390863 |

The Arabic Gap panel needs a ground, not just a picture: the Arabic mark sits over it at
low opacity, so the frame has to be dark across most of its area with the light confined
to one place. The interview lens does that; the microphones do not, being bright and
even, which is why they went to the capability panel instead.

`media-broadcast-camera.jpg` came off the capability panel for two reasons — a heavy
magenta cast from the stage lighting, and the need to keep the two media frames on the
homepage from both being cameras. It is still in use on the What We Do showcase.

## Files in use

Source is given as the Unsplash CDN URL, which is the exact frame downloaded and can be
opened directly to verify it. Photographer names were recorded for the first set at
download time; for the second set they were not captured, and are left blank rather
than filled in with an unverified guess. The Unsplash Licence does not require
crediting them on the site.

### UAE photography — added in the UAE identity pass

Sourced to fill three specific gaps rather than to refresh the set wholesale: the
library had no laboratory frame at all, and two pages were opening on photographs
already carrying a prominent slot elsewhere on the site.

All three are free Unsplash photographs (`images.unsplash.com/photo-…`), downloaded at
2400px — wider than any frame in the earlier sets, which top out at 2000px. None shows
an identifiable face and none carries legible third-party branding.

`abu-dhabi-night.jpg` is **not** new. It was already in the set at 2000px and was
re-downloaded at 2400px, in place, when the For Investors hero needed it — the same
photograph, higher resolution, so every existing use benefits and no duplicate file
was added. Its row stays in the table below.

Landmark frames live in `uae/`. The aspect ratio decided the placement of each one as
much as the subject did — two of these are portrait sources and would have survived a
full-bleed hero band only as a letterbox sliver, so they went to the square and tall
frames instead:

| File | Used for | Aspect | Source |
| --- | --- | --- | --- |
| `uae/sheikh-zayed-road-dusk.jpg` | Regional Perspective (homepage) | 9:16 | https://images.unsplash.com/photo-1543579596-2c11997c7706 |
| `uae/etihad-towers-abu-dhabi.jpg` | Selected Markets — tall anchor panel | 3:4 | https://images.unsplash.com/photo-1735163968182-a7da197d71ab |
| `uae/dubai-trade-centre-towers.jpg` | What We Do hero | 3:2 | https://images.unsplash.com/photo-1597171149529-7a8f69abe77b |
| `uae/business-bay-dubai-canal.jpg` | Insight hero | ~7:6 | https://images.unsplash.com/photo-1564005991505-41c5fd1cdb71 |
| `uae/editorial-broadcast-gallery.jpg` | The Arabic Gap panel (homepage) | 3:2 | https://images.unsplash.com/photo-1550615511-c317ce7f1d03 |

| File | Used for | Source |
| --- | --- | --- |
| `uae-life-sciences-lab.jpg` | Selected Markets — Life Sciences | https://images.unsplash.com/photo-1581594549595-35f6edc7b762 |
| `dubai-museum-future-towers.jpg` | Homepage pillar sequence (Convene, Place, Produce) | https://images.unsplash.com/photo-1643228307101-eaf8a15abbba |
| `louvre-abu-dhabi-dome.jpg` | Advisory page hero | https://images.unsplash.com/photo-1552252415-5eb87e0fc788 |

### Subject photography — added in the imagery pass

| File | Used for | Source |
| --- | --- | --- |
| `ir-boardroom-window.jpg` | Investor Relations capability | https://images.unsplash.com/photo-1638312105950-27539b2efce4 |
| `outreach-conference-hall.jpg` | Investor Targeting & Market Outreach capability | https://images.unsplash.com/photo-1540575467063-178a50c2df87 |
| `media-broadcast-camera.jpg` | Media Relations capability | https://images.unsplash.com/photo-1567506476376-1282584643ca |
| `digital-market-data.jpg` | Digital Communications capability | https://images.unsplash.com/photo-1649003515353-c58a239cf662 |
| `capital-markets-desk.jpg` | Insight card (services hero moved to uae/dubai-trade-centre-towers.jpg) | https://images.unsplash.com/photo-1639428530618-e70b1ff28da2 |
| `downtown-dubai-night.jpg` | Homepage globe band — "Why the Gulf now" (Ahmed Galal) | https://images.unsplash.com/photo-1623638498061-2fcab5587cb0 |
| `executives-skyline-dusk.jpg` | Not currently placed — superseded by `downtown-dubai-night.jpg` on the globe band | https://images.unsplash.com/photo-1560142249-f8718fd9cd88 |
| `strategy-session-night.jpg` | Insights index and article headers | https://images.unsplash.com/photo-1758520145408-dedb359d1c49 |
| `corporate-corridor-night.jpg` | Not currently placed — see note below | https://images.unsplash.com/photo-1768396747960-ae6ba3c855bc |
| `abu-dhabi-night.jpg` | For Investors hero, lead insight card (re-downloaded at 2400px) | https://images.unsplash.com/photo-1624317937315-0ced8736c9e9 |
| `investor-briefing-room.jpg` | Insight card | https://images.unsplash.com/photo-1627931539006-d5c4677e05ea |
| `leadership-review-night.jpg` | Segment panel — Private Companies | https://images.unsplash.com/photo-1758520145132-b0ecdb967295 |
| `corporate-lobby-dark.jpg` | Contact enquiry band, segment panel | https://images.unsplash.com/photo-1782834293617-4161d0b7344e |
| `riyadh-night-aerial.jpg` | Regional frame (about, investor outreach), segment panel | https://images.unsplash.com/photo-1663900108404-a05e8bf82cda |
| `downtown-dubai-dusk.jpg` | About hero, segment panel — Growth Companies | https://images.unsplash.com/photo-1708361089093-beef4c4584e7 |
| `office-night-windows.jpg` | Segment panel — Leadership & IR Teams | https://images.unsplash.com/photo-1772059409102-86d89782265b |

### A note on `corporate-corridor-night.jpg`

It opened the about page until the hero was changed to a Gulf financial
district, and it is kept here rather than deleted: it is a good frame, it is
the only premium interior in the set, and restoring it is one line in
`src/data/imagery.ts`. Nothing on the site renders it at present.

### A note on signage in the Dubai frames

`downtown-dubai-dusk.jpg`, `downtown-dubai-blue-hour.jpg` and
`skyline-twilight.jpg` all carry a developer's name on towers in the frame, as
most photographs of Downtown Dubai do. It is incidental city signage and
implies no relationship of any kind. Where such a frame is placed, the crop and
the scrim are set so the most legible of it falls outside the frame or under
the heaviest part of the wash — the about hero is cropped and scrimmed on
exactly that basis. Commissioned photography would remove the question
entirely.

### City and sector photography — original set

| File | Used for | Photographer | Source |
| --- | --- | --- | --- |
| `downtown-dubai-blue-hour.jpg` | Homepage hero backdrop (held in reserve — the hero currently opens on the globe) | Timo Volz | https://unsplash.com/photos/yP8oPC3_v38 |
| `gulf-financial-district-night.jpg` | Sitewide final CTA | Kevin Lee | https://unsplash.com/photos/sx0cAH8TEYk |
| `business-bay-reflection.jpg` | Financial Services sector, engagement card, segment panel | Darcey Beau | https://unsplash.com/photos/cV4qkkorDFY |
| `skyline-twilight.jpg` | Contact page hero | Ahmed Aldaie | https://unsplash.com/photos/WyfXOHgI49s |
| `etihad-towers-golden-hour.jpg` | Not currently placed — superseded by uae/etihad-towers-abu-dhabi.jpg | Saeed Alsoomehi | https://unsplash.com/photos/ytrAZCINPM4 |
| `doha-skyline-day.jpg` | Utility routes (404, privacy, terms) | Em Kwan | https://unsplash.com/photos/qReCgLOaNew |
| `sector-energy-dusk.jpg` | Energy & Utilities sector | Andrey Sharpilo | https://unsplash.com/photos/-kKIqAizsgs |
| `sector-logistics-port.jpg` | Transport & Logistics sector, Industries hero | Venti Views | https://unsplash.com/photos/sWOvgOOFk1g |
| `sector-development-cranes.jpg` | Real Estate & Development sector, Selected Work hero | Ivan Bandura | https://unsplash.com/photos/t4Ot1iDE0hQ |
| `sector-industrial-mono.jpg` | Industrials & Manufacturing sector | Marc Kleen | https://unsplash.com/photos/GgVEflVPBgA |
| `sector-technology-racks.jpg` | Technology & Digital Infrastructure sector | Kaur Kristjan | https://unsplash.com/photos/2JJ3wBHu4_0 |

## Removed in the imagery pass

The abstract architectural set was retired: four capabilities that do four different
things all carried a curved building, which gave a reader nothing to tell them apart
with. These files were deleted rather than left in place unused, so this directory
holds only what the site actually renders.

They are recoverable from git history if a frame is ever wanted again — the commit
before this one still has them. Sources are recorded here so any of them can also be
downloaded fresh.

| File | Photographer | Source |
| --- | --- | --- |
| `facade-warm-concrete.jpg` | Ryan Ancill | https://unsplash.com/photos/IYolRpP1Oh4 |
| `facade-dark-curve.jpg` | Ricardo Gomez Angel | https://unsplash.com/photos/saL6UM59j-c |
| `facade-ribs.jpg` | Joel Filipe | https://unsplash.com/photos/-6zFVL4YuaM |
| `facade-steel-curve.jpg` | Zhang Kaiyv | https://unsplash.com/photos/hDOnQGPofuU |
| `facade-woven.jpg` | Danist Soh | https://unsplash.com/photos/T5nXYXCf50I |
| `facade-oculus.jpg` | Jason Dent | https://unsplash.com/photos/LIWeSq3b17U |
| `facade-white-curve.jpg` | Sonnie Hiles | https://unsplash.com/photos/mQiZnKwGXW0 |
| `district-monochrome.jpg` | Yash Jain | https://unsplash.com/photos/wanP9sgaxsc |
| `doha-waterfront-muted.jpg` | Riza Mohammed | https://unsplash.com/photos/lH5qhXh3Exo |

### A note on the sector photographs

These illustrate the **sector**, not a client, a project or a facility GCC has
worked on. None of them depicts a real engagement. Keep alt text describing the
photograph, and never caption one in a way that implies it shows GCC's work —
`src/data/projects.ts` explains the same constraint for the engagement pages.

Photographer names in the tables above are recorded as published on Unsplash at the
time of download and are provided for verification only.
