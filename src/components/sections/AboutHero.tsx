import NextImage from "next/image";
import type { CSSProperties } from "react";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { photos } from "@/data/imagery";
import { aboutHero } from "@/data/about";

/** Animation delay as an inline custom property, for the on-mount reveals. */
const at = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/**
 * About hero.
 *
 * An asymmetric editorial opening rather than the shared `PageHero`: the type
 * holds the left of the page and the photograph takes a full-height column
 * down the right, bleeding to the viewport edge instead of sitting inside the
 * gutter. `PageHero` is used by every other route on the site and is not
 * touched - this page gets its own opening and nothing else changes.
 *
 * Motion runs on mount, not on scroll. Above-the-fold content must never wait
 * on an IntersectionObserver, so the reveals are the same CSS-only mechanism
 * the other heroes use: `.reveal` with `data-visible` already set and a
 * staggered `--reveal-delay`. The whole sequence resolves inside about 1.2s
 * and then stops.
 *
 * The photograph carries two independent movements. `hero-settle` eases it off
 * a 9% overscale on load - the site's existing hero treatment. The parallax
 * drift sits on a wrapper above it and runs on a scroll-progress timeline, so
 * it costs the main thread nothing and simply does not happen in a browser
 * without `animation-timeline`.
 *
 * Content integrity: the photograph is architecture, not premises. Its `alt`
 * is empty and it is marked decorative - the headline carries the meaning, and
 * an announced description here would only add noise.
 */
export function AboutHero() {
  const photo = photos.aboutPortrait;

  return (
    <section
      className="tokens-dark relative isolate flex min-h-[max(32rem,80svh)] flex-col justify-end overflow-hidden bg-(--midnight) pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--header-h)+clamp(4rem,9vw,7rem))]"
      aria-labelledby="about-hero-heading"
    >
      {/*
        The photograph. A right-hand column from `lg` up, full bleed below it -
        both rendered by one element, so there is no client-side breakpoint
        check and no second decode.
      */}
      {/*
        62%, not 46%.

        At 46% the photograph's left edge landed at the exact point the scrim
        had already started to fade, so the frame began as a visible vertical
        seam down the middle of the hero. Running it wider puts that edge back
        under the opaque part of the wash, where it cannot be seen - the
        photograph appears to emerge out of the dark rather than to start.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 end-0 -z-20 w-full lg:w-[62%]"
      >
        <div className="about-parallax absolute inset-0">
          <NextImage
            src={photo.src}
            alt=""
            fill
            preload
            sizes="(min-width: 1024px) 46vw, 100vw"
            placeholder="blur"
            style={{ objectPosition: photo.position }}
            className="hero-settle photo-grade object-cover"
          />
        </div>
      </div>

      {/*
        Scrims. Below `lg` the photograph is behind the type and needs a heavy
        vertical wash; from `lg` up it is beside the type and needs only a
        feathered left edge, so the two meet without a seam.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(12,20,29,0.94)_0%,rgba(12,20,29,0.72)_44%,rgba(12,20,29,0.42)_100%)] lg:bg-[linear-gradient(96deg,#0c141d_44%,rgba(12,20,29,0.88)_56%,rgba(12,20,29,0.32)_76%,transparent_96%)]"
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      {/* Architectural field behind the type, at a whisper. */}
      <div
        aria-hidden="true"
        className="rule-field absolute inset-y-0 start-0 -z-10 hidden w-[38%] opacity-40 [--rule-gap:6rem] [mask-image:linear-gradient(90deg,transparent,black_22%,black_58%,transparent_100%)] lg:block"
      />

      {/* Closing hairline, so the hero cuts rather than fades into the page. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.42),transparent)]"
      />

      <Container className="relative z-10">
        <div className="lg:max-w-[54%]">
          <p
            className="reveal flex flex-wrap items-center gap-x-3.5 gap-y-2 text-label uppercase text-(--color-accent)"
            data-visible="true"
          >
            <span aria-hidden="true" className="h-px w-10 bg-(--color-accent)" />
            <span>{aboutHero.eyebrow}</span>
          </p>

          <Heading
            id="about-hero-heading"
            level={1}
            size="display"
            className="reveal mt-7 max-w-[16ch]"
            data-visible="true"
            data-variant="mask"
            style={at(140)}
          >
            {aboutHero.title}
          </Heading>

          {/*
            The gold accent rule. Draws itself outward from the left edge the
            headline sits on, which is the one piece of movement in the hero
            that is not a fade - it gives the eye something to follow from the
            headline down into the paragraph.
          */}
          <div className="reveal mt-9" data-visible="true" style={at(320)}>
            <span
              aria-hidden="true"
              className="about-rule block h-px w-24 bg-[linear-gradient(90deg,var(--color-accent),rgba(184,148,95,0.15))]"
            />
          </div>

          <p
            className="reveal mt-8 max-w-[52ch] text-lead text-(--color-foreground-muted)"
            data-visible="true"
            style={at(420)}
          >
            {aboutHero.lead}
          </p>
        </div>
      </Container>
    </section>
  );
}
