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
| `executives-skyline-dusk.jpg` | Investor outreach band and page hero | https://images.unsplash.com/photo-1560142249-f8718fd9cd88 |
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
