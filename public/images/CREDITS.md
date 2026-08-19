# Photography — provenance and licence

These photographs are **art direction placeholders**, not client assets.

Every file in this directory is an [Unsplash](https://unsplash.com) photograph, used
under the [Unsplash Licence](https://unsplash.com/license): free to use for commercial
and non-commercial purposes, no permission or attribution required. Attribution is
recorded below anyway, so the source of each frame can be verified.

## Content integrity

**None of these images depicts GCC, its offices, its people, its clients or its work.**
They are architectural and city photography chosen to give the typography a setting.

Two consequences follow, and both matter:

- Alt text must stay descriptive of the *photograph* ("glass office towers on a Gulf
  waterfront at sunset"), never of the firm. Never write alt text, a caption or a
  heading that implies a building shown here is a GCC office or a GCC project.
- Frames used purely as a backdrop behind a headline carry `alt=""` and are marked
  decorative, because the headline already carries the meaning.

## Replacing these with commissioned photography

1. Drop the new file into this directory.
2. Update the matching import in `src/data/imagery.ts`.
3. Update the `alt` text so it describes the new photograph accurately.

No component needs to change. Sizes, crops, scrims, the grain treatment and the
sitewide colour grade are all applied by `src/components/ui/Figure.tsx`.

The art direction to brief a photographer against: Gulf financial districts and
architectural geometry, shot dark and atmospheric. No handshakes, no meeting-room
stock, no dunes, no tourist framing.

## Files

| File | Used for | Photographer | Source |
| --- | --- | --- | --- |
| `gulf-financial-district-night.jpg` | Homepage hero | Kevin Lee | https://unsplash.com/photos/sx0cAH8TEYk |
| `downtown-skyline-blue-hour.jpg` | Sitewide final CTA | ZQ Lee | https://unsplash.com/photos/DcyL0IoCY0A |
| `business-bay-reflection.jpg` | Investor outreach feature, segment panel | Darcey Beau | https://unsplash.com/photos/cV4qkkorDFY |
| `skyline-twilight.jpg` | Contact page | Ahmed Aldaie | https://unsplash.com/photos/WyfXOHgI49s |
| `etihad-towers-golden-hour.jpg` | Homepage introduction | Saeed Alsoomehi | https://unsplash.com/photos/ytrAZCINPM4 |
| `facade-warm-concrete.jpg` | About hero, segment panel | Ryan Ancill | https://unsplash.com/photos/IYolRpP1Oh4 |
| `facade-dark-curve.jpg` | Services hero | Ricardo Gomez Angel | https://unsplash.com/photos/saL6UM59j-c |
| `facade-ribs.jpg` | Investor Relations capability | Joel Filipe | https://unsplash.com/photos/-6zFVL4YuaM |
| `facade-steel-curve.jpg` | Investor Outreach capability | Zhang Kaiyv | https://unsplash.com/photos/hDOnQGPofuU |
| `facade-woven.jpg` | Media Relations capability | Danist Soh | https://unsplash.com/photos/T5nXYXCf50I |
| `facade-oculus.jpg` | Digital Communications capability | Jason Dent | https://unsplash.com/photos/LIWeSq3b17U |
| `facade-white-curve.jpg` | Segment panel | Sonnie Hiles | https://unsplash.com/photos/mQiZnKwGXW0 |
| `district-monochrome.jpg` | Regional street frame, segment panel | Yash Jain | https://unsplash.com/photos/wanP9sgaxsc |

Photographer names are recorded as published on Unsplash at the time of download and
are provided for verification only; the Unsplash Licence does not require crediting
them on the site.
