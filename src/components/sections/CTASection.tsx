import NextImage from "next/image";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { backdrops, ctaSkyline } from "@/data/imagery";
import { getDictionary, pick } from "@/content";
import { ctaContentAr } from "@/content/ar/homepage";
import { ctaContent as ctaContentEn } from "@/data/homepage";

/**
 * Final call to action.
 *
 * The last full-bleed photographic moment on every page, and the counterpart
 * to the hero: where the hero anchors its type to the left over a wide frame,
 * this centres a single oversized statement. A heavy scrim plus grain keeps it
 * firmly in the palette rather than letting the photograph take over.
 *
 * A secondary action sits beside the primary one so the section offers a route
 * for visitors not yet ready to make contact.
 */
export async function CTASection() {
  const ctaContent = await pick({ en: ctaContentEn, ar: ctaContentAr });
  const t = await getDictionary();

  const photo = backdrops.cta;

  return (
    <section
      /*
        `min-h-[22.5vw]` is the skyline's own aspect written as a floor - 100
        divided by 4.455, rounded up so it cannot fall a pixel short. The band is content-height on most viewports and this
        never engages; above about 1400px the copy is shorter than a full-width
        skyline, and without the floor the section would clip the spire.

        `justify-center` only matters when the floor is what sets the height:
        it keeps the copy in the middle of the band rather than stacked at the
        top with the skyline below it.
      */
      className="tokens-dark relative isolate flex min-h-[22.5vw] flex-col justify-center overflow-hidden bg-(--midnight) py-[var(--space-section-lg)]"
      aria-labelledby="cta-heading"
    >
      {/*
        The crop is set through custom properties rather than `objectPosition`,
        which is what `Figure` does everywhere else on the site and what this
        band was not doing. `.object-pos` in globals.css reads `--obj-pos-sm`
        below 640px and `--obj-pos` above it.

        It matters here more than almost anywhere: this band is about 4.4:1 on a
        desktop and TALLER THAN IT IS WIDE on a phone, so `cover` crops it on
        opposite axes at the two ends and one value cannot serve both. Written
        as `objectPosition` the mobile value was simply discarded.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <NextImage
          src={photo.src}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          quality={90}
          style={
            {
              "--obj-pos": photo.position,
              "--obj-pos-sm": photo.positionMobile ?? photo.position,
            } as CSSProperties
          }
          className="photo-grade object-pos object-cover"
        />
      </div>

      {/*
        The scrim, and it is directional now rather than a radial.

        It was `radial-gradient(90% 100% at 50% 50%, 0.86 -> 0.95 -> solid)`,
        which is to say between 86% and 100% midnight everywhere. Whatever
        photograph sat underneath it, the band rendered as flat navy with type
        on it - the picture was paying for bytes and delivering nothing.

        The copy is LEFT aligned and the actions sit right, so the density
        belongs on the left and can fall away across the frame. Heaviest behind
        the heading and the paragraph, lightest across the middle where the
        tower line and the interchange are, and lifting slightly again at the
        right edge so the outline button has a ground.

        The second layer is a bottom band. The actions sit low on a wide screen
        and the drawn skyline silhouette meets the photograph along that edge;
        both want a little more weight under them than the middle needs.

        `rtl:` carries the mirrored angle. The LAYOUT flips for Arabic - copy
        right, actions left - so the gradient has to flip with it, while the
        photograph underneath must not.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(12,20,29,0.93)_0%,rgba(12,20,29,0.82)_26%,rgba(12,20,29,0.54)_58%,rgba(12,20,29,0.62)_100%)] rtl:bg-[linear-gradient(260deg,rgba(12,20,29,0.93)_0%,rgba(12,20,29,0.82)_26%,rgba(12,20,29,0.54)_58%,rgba(12,20,29,0.62)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(12,20,29,0.5)_0%,rgba(12,20,29,0.18)_34%,transparent_60%)]"
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      {/*
        The skyline, on the bottom edge and full width.

        After the scrim and the grain so it reads as a foreground horizon
        rather than another layer of the backdrop, and before the content, so
        the heading and actions sit in front of it. Its top 43% is transparent
        - see the note on `ctaSkyline` - so the type has empty sky behind it,
        and where the buttons do meet the buildings the silhouette is darker
        than the photograph it covers, which helps them rather than hurting.

        `w-full h-auto`: the intrinsic size comes from the static import, so
        the browser reserves the right box and the aspect is the file's own.
        Nothing is cropped and nothing is stretched.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <NextImage
          src={ctaSkyline.src}
          alt=""
          sizes="100vw"
          className="block h-auto w-full"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.5),transparent)]"
      />

      {/*
        The type plate, and it has to be HERE rather than with the other
        scrims.

        Everything above this point - the photograph, the directional scrim,
        the grain - is painted before the drawn skyline silhouette, and the
        silhouette is deliberately painted last so it reads as a foreground
        horizon. Which means no scrim above can protect the copy: measured at
        1440, the heading came out 2.18:1 and the paragraph 1.39:1 against what
        the silhouette and the lit sky left behind them. Both fail at any size.

        So this one sits after the silhouette and before the content, and it is
        shaped to the copy rather than to the frame: dense down the left where
        the heading and paragraph are, gone by three quarters across, so the
        tower line and the interchange in the middle and right of the
        photograph are untouched. That is the whole point of replacing the
        radial - the picture stays a picture, and only the strip under the type
        is paid for.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(12,20,29,0.95)_0%,rgba(12,20,29,0.88)_24%,rgba(12,20,29,0.55)_48%,rgba(12,20,29,0.12)_70%,transparent_84%)] rtl:bg-[linear-gradient(260deg,rgba(12,20,29,0.95)_0%,rgba(12,20,29,0.88)_24%,rgba(12,20,29,0.55)_48%,rgba(12,20,29,0.12)_70%,transparent_84%)]"
      />

      {/*
        Left aligned and split, so the closing block shares the same left edge
        as every section above it. The actions sit in the right column on wide
        screens rather than under the copy, which keeps the band shallow and
        stops the page ending on a tall stack of centred elements.
      */}
      <Container className="relative z-10">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <div>
            <Reveal variant="mask">
              <Heading id="cta-heading" level={2} size="display" className="max-w-[14ch]">
                {ctaContent.heading}
              </Heading>
            </Reveal>

            <Reveal delay={140}>
              {/*
                A stronger foreground than `--color-foreground-muted`, and
                scoped to this band only.

                The token is rgba(244,241,235,0.66) in dark mode, which is right
                for a paragraph on flat midnight and thin over a photograph -
                two thirds opacity means a third of whatever is behind it comes
                through the letterforms themselves, so the copy picks up the
                city as texture even when the ground beneath it measures well.
                0.86 keeps the same hue and the same hierarchy against the
                heading while holding the letterforms solid.

                Written inline rather than by changing the token, because the
                token is correct everywhere else on the site.
              */}
              <p className="mt-6 max-w-[50ch] text-lead text-[rgb(244_241_235_/_0.86)]">
                {ctaContent.supporting}
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={260}
            className="flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4 lg:justify-end lg:pb-1"
          >
            <Button href={ctaContent.cta.href} size="lg" withArrow>
              {ctaContent.cta.label}
            </Button>
            {/*
              Was `/services`, a route retired by the restructure that now only
              308s. This band renders on every page, so every page carried a
              button through a redirect.
            */}
            <Button href="/what-we-do" size="lg" variant="outline">
              {t.nav.exploreCapabilities}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
