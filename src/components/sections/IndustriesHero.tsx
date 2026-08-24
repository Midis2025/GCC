import NextImage from "next/image";
import type { CSSProperties } from "react";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { backdrops } from "@/data/imagery";
import { industries, industriesHero } from "@/data/industries";

/** Animation delay as an inline custom property, for the on-mount reveals. */
const at = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/**
 * Where each sector label sits over the photograph, as a percentage of the
 * frame. Scattered rather than listed: a column of six labels down the side of
 * an image is a caption, and the point of putting them on the photograph at all
 * is that they read as things happening in a city rather than as a menu.
 *
 * Positions are chosen against the crop, not at random - each one lands on a
 * darker part of the skyline, and none sits in the lower-left where the frame
 * meets the type column at `lg`.
 */
const LABEL_POSITIONS: Array<{ top: string; left: string }> = [
  { top: "16%", left: "12%" },
  { top: "27%", left: "58%" },
  { top: "43%", left: "26%" },
  { top: "56%", left: "66%" },
  { top: "70%", left: "16%" },
  { top: "82%", left: "50%" },
];

/**
 * Industries hero.
 *
 * 55/45 rather than the shared `PageHero`'s full bleed: the type holds the left
 * and a single cinematic frame takes the right, with the six sector names
 * floating over it at low contrast. `PageHero` is used by every other route and
 * is not touched.
 *
 * The sector labels are the hero's one idea. The headline says every sector
 * explains itself differently; setting the six of them across one city, at a
 * weight that has to be looked for, says the same thing before the reader has
 * scrolled. They are `aria-hidden` - all six are real, ordered text a screen
 * later, and announcing them here would be reading the table of contents twice.
 *
 * Motion runs on mount, not on scroll: above-the-fold content must never wait
 * on an IntersectionObserver, so the reveals are the CSS-only mechanism the
 * other heroes use. The photograph carries `hero-settle` for the slow scale off
 * an overscale, and a parallax drift on the wrapper above it that runs on a
 * scroll-progress timeline and costs the main thread nothing.
 */
export function IndustriesHero() {
  const photo = backdrops.industries;

  return (
    <section
      className="tokens-dark relative isolate flex min-h-[max(32rem,80svh)] flex-col justify-end overflow-hidden bg-(--midnight) pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--header-h)+clamp(4rem,9vw,7rem))]"
      aria-labelledby="industries-hero-heading"
    >
      {/*
        The frame. A right-hand column from `lg` up, full bleed below it. Run
        wider than the 45% it visually occupies so its left edge sits under the
        opaque part of the wash rather than showing as a seam.
      */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-20 w-full lg:w-[62%]">
        <div className="about-parallax absolute inset-0">
          <NextImage
            src={photo.src}
            alt=""
            fill
            preload
            sizes="(min-width: 1024px) 62vw, 100vw"
            placeholder="blur"
            style={{ objectPosition: photo.position }}
            className="hero-settle photo-grade object-cover"
          />
        </div>

        {/*
          Sector labels, over the photograph and under the scrim. Below `lg`
          they are dropped entirely - the frame is behind the headline there,
          and six more strings over it would be clutter competing with the one
          sentence that matters.
        */}
        <div className="absolute inset-0 hidden lg:block">
          {industries.map((industry, index) => (
            <span
              key={industry.slug}
              className="ind-hero-label absolute whitespace-nowrap text-label uppercase text-[#f4f1eb]"
              style={
                {
                  ...LABEL_POSITIONS[index],
                  "--reveal-delay": `${700 + index * 130}ms`,
                } as CSSProperties
              }
            >
              <span className="ind-hero-tick" aria-hidden="true" />
              {industry.title}
            </span>
          ))}
        </div>
      </div>

      {/* Scrims: vertical below `lg` where the frame is behind type, diagonal above. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(12,20,29,0.94)_0%,rgba(12,20,29,0.72)_44%,rgba(12,20,29,0.42)_100%)] lg:bg-[linear-gradient(96deg,#0c141d_44%,rgba(12,20,29,0.86)_56%,rgba(12,20,29,0.42)_78%,rgba(12,20,29,0.28)_100%)]"
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      <div
        aria-hidden="true"
        className="rule-field absolute inset-y-0 left-0 -z-10 hidden w-[38%] opacity-40 [--rule-gap:6rem] [mask-image:linear-gradient(90deg,transparent,black_22%,black_58%,transparent_100%)] lg:block"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.42),transparent)]"
      />

      <Container className="relative z-10">
        <div className="lg:max-w-[52%]">
          <p
            className="reveal flex flex-wrap items-center gap-x-3.5 gap-y-2 text-label uppercase text-(--color-accent)"
            data-visible="true"
          >
            <span aria-hidden="true" className="h-px w-10 bg-(--color-accent)" />
            <span>{industriesHero.eyebrow}</span>
          </p>

          <Heading
            id="industries-hero-heading"
            level={1}
            size="display"
            className="reveal mt-7 max-w-[15ch]"
            data-visible="true"
            data-variant="mask"
            style={at(140)}
          >
            {industriesHero.title}
          </Heading>

          <div className="reveal mt-9" data-visible="true" style={at(320)}>
            <span
              aria-hidden="true"
              className="about-rule block h-px w-24 bg-[linear-gradient(90deg,var(--color-accent),rgba(184,148,95,0.15))]"
            />
          </div>

          <p
            className="reveal mt-8 max-w-[54ch] text-lead text-(--color-foreground-muted)"
            data-visible="true"
            style={at(420)}
          >
            {industriesHero.lead}
          </p>
        </div>
      </Container>
    </section>
  );
}
