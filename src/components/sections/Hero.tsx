import type { CSSProperties } from "react";
import NextImage from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { HeroBackdrop } from "@/components/visuals/HeroBackdrop";
import { backdrops } from "@/data/imagery";
import { gulfMarkets, heroContent } from "@/data/homepage";
import { imageConfig } from "@/data/site";

/** Animation delay as an inline custom property, for the on-mount reveals. */
const at = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/**
 * Homepage hero.
 *
 * A layered composition rather than a headline sitting on a photograph:
 * photography, a directional scrim, film grain, a fine mullion field, the
 * type, and a floating market card - six planes, each doing one job.
 *
 * Motion runs on mount rather than on scroll. Above-the-fold content must
 * never wait on an IntersectionObserver, so the reveals are pure CSS with
 * staggered delays and the frame eases off a slight overscale as it arrives.
 * The whole sequence resolves inside ~1.5s and then stops - nothing loops.
 *
 * Art direction is swappable: a path set on `imageConfig.hero` overrides the
 * default photograph, and clearing the photography entirely falls back to the
 * authored architectural backdrop with no code change.
 */
export function Hero() {
  const override = imageConfig.hero;
  const photo = backdrops.hero;

  return (
    <section className="tokens-dark relative isolate flex min-h-[max(40rem,90svh)] flex-col justify-end overflow-hidden bg-(--midnight)">
      {/* Plane 1 - photography */}
      <div aria-hidden="true" className="absolute inset-0 -z-30">
        {override.src ? (
          <NextImage
            src={override.src}
            alt=""
            fill
            preload
            sizes="100vw"
            className="hero-settle photo-grade object-cover"
          />
        ) : (
          <NextImage
            src={photo.src}
            alt=""
            fill
            preload
            sizes="100vw"
            placeholder="blur"
            style={{ objectPosition: photo.position }}
            className="hero-settle photo-grade object-cover"
          />
        )}
      </div>

      {/*
        Plane 2 - directional scrim. Two gradients rather than one: the
        diagonal anchors the type column on the left, the vertical protects the
        CTAs and the market card along the bottom edge. Together they hold the
        headline well clear of AA over the brightest part of the frame.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(104deg,#0c141d_6%,rgba(12,20,29,0.9)_38%,rgba(12,20,29,0.55)_72%,rgba(12,20,29,0.42)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_top,rgba(12,20,29,0.92)_0%,rgba(12,20,29,0.35)_38%,transparent_72%)]"
      />

      {/* Plane 3 - grain and the drawn mullion field, echoing the fallback backdrop */}
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="rule-field absolute inset-y-0 right-0 -z-10 hidden w-[58%] [--rule-gap:7rem] lg:block"
      />
      <HeroBackdrop variant="overlay" />

      <Container className="relative z-10 pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--header-h)+clamp(5rem,14vw,10rem))]">
        <div className="grid gap-y-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-x-16">
          <div className="max-w-[52rem]">
            <p
              className="reveal flex items-center gap-3.5 text-label font-medium uppercase text-(--color-accent)"
              data-visible="true"
            >
              <span aria-hidden="true" className="h-px w-10 shrink-0 bg-(--color-accent)" />
              <span className="max-w-[48ch]">{heroContent.eyebrow}</span>
            </p>

            {/*
              Line-by-line reveal. Each line is its own clipping block so the
              text wipes up from behind its own edge, and the H1 stays a single
              accessible string - the spans carry no semantics.
            */}
            <Heading level={1} size="mega" className="mt-8 max-w-[15ch]" balance={false}>
              {heroContent.headlineLines.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <span
                    className="reveal block"
                    data-visible="true"
                    data-variant="mask"
                    style={at(140 + index * 130)}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </Heading>

            <p
              className="reveal mt-9 max-w-[54ch] text-lead text-(--color-foreground-muted)"
              data-visible="true"
              style={at(620)}
            >
              {heroContent.supporting}
            </p>

            <div
              className="reveal mt-11 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4"
              data-visible="true"
              style={at(760)}
            >
              <Button href={heroContent.primaryCta.href} size="lg" withArrow>
                {heroContent.primaryCta.label}
              </Button>
              <Button href={heroContent.secondaryCta.href} size="lg" variant="outline">
                {heroContent.secondaryCta.label}
              </Button>
            </div>
          </div>

          {/*
            Floating market card. Glass over the photograph, and real content
            rather than decoration - the same six markets named throughout the
            site. Carries the integrity caption inline so the list can never be
            read as an office footprint.
          */}
          <aside
            className="reveal w-full border border-white/12 bg-[rgba(12,20,29,0.52)] p-6 backdrop-blur-md sm:p-7 lg:w-[19rem] lg:shrink-0"
            data-visible="true"
            style={at(900)}
            aria-label="Markets"
          >
            <p className="text-label font-medium uppercase text-(--color-accent)">
              Gulf Market Coverage
            </p>

            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-2.5 lg:grid-cols-1 lg:gap-y-0">
              {gulfMarkets.map((market) => (
                <li
                  key={market.code}
                  className="flex items-baseline justify-between gap-4 text-[0.9375rem] text-(--color-foreground) lg:border-b lg:border-white/10 lg:py-2.5 lg:last:border-0"
                >
                  <span>{market.label}</span>
                  <span
                    aria-hidden="true"
                    className="font-serif text-xs text-(--color-foreground-subtle)"
                  >
                    {market.code}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs leading-relaxed text-(--color-foreground-subtle)">
              Market orientation only. Not offices or registrations.
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
