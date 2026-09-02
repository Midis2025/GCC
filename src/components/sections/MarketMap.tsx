"use client";

import { useState } from "react";

import { useLocale } from "@/components/layout/LocaleProvider";
import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gulfMarkets } from "@/data/homepage";
import { globeMarkets } from "@/data/outreach-globe";

export interface MarketMapProps {
  id: string;
  label: string;
  heading: string;
  paragraphs: readonly string[];
  /**
   * CONTENT INTEGRITY. Required, not optional, and deliberately has no default.
   *
   * A located dot is the single easiest element on this site to misread as a
   * presence, and what has to be denied changes with the context - the About
   * page denies investor relationships, the media page denies media
   * relationships and guaranteed coverage. A default would be the wrong denial
   * somewhere, so every caller states its own.
   */
  disclaimer: string;
  /**
   * Heading above the market selector.
   *
   * Defaults to the dictionary's own word for "Markets" - the same one the
   * footer uses - rather than to an English literal, so a caller that does not
   * state one is still correct in both languages.
   */
  selectorLabel?: string;
  tone?: "canvas" | "muted";
  /**
   * The six markets, in the language being rendered.
   *
   * A prop rather than an import, because this is a Client Component and
   * `pick` is a server-side API. Every caller is a Server Component and hands
   * over whichever list the request needs; the English list stays the default,
   * so a caller that passes nothing behaves exactly as it did before.
   *
   * `code` is an ISO identifier and is identical in both languages, which is
   * what lets the projection below stay where it is: coordinates are looked up
   * by code, never by name.
   */
  markets?: readonly { code: string; label: string; city: string }[];
}

/**
 * MARKET MAP — Premium Card Grid
 * ============================================================================
 * The six Gulf markets displayed as a 2×3 grid of elegant dark cards with
 * gold accent borders. Selecting a market (via the chip buttons on the left,
 * or by hovering/clicking a card directly) highlights that card. Each card
 * shows the market name, financial centre city, and a one-line descriptor
 * drawn from `globeMarkets`.
 *
 * Replaces the SVG constellation map, which was abstract and hard to read.
 * The card grid is immediately legible, scales to every viewport without
 * custom projection maths, and carries the same disclaimer in the same
 * position for content-integrity parity.
 */
export function MarketMap({
  id,
  label,
  heading,
  paragraphs,
  disclaimer,
  selectorLabel,
  tone = "canvas",
  markets = gulfMarkets,
}: MarketMapProps) {
  const { t } = useLocale();
  const [active, setActive] = useState(0);

  /** Enrich each market with the description from globeMarkets. */
  const enriched = markets.map((market) => {
    const geo = globeMarkets.find((g) => g.code === market.code);
    return {
      ...market,
      description: geo?.description ?? "",
    };
  });

  const current = enriched[active];

  return (
    <Section spacing="lg" tone={tone} aria-labelledby={id}>
      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-x-20">
        {/* ------------------------------------------------------------------
            Copy and the selector chips.
            ------------------------------------------------------------------ */}
        <div>
          <Reveal>
            <SectionLabel>{label}</SectionLabel>
            <Heading id={id} level={2} size="h2" className="mt-5 max-w-[15ch]">
              {heading}
            </Heading>
          </Reveal>

          <Reveal delay={120} className="mt-8 flex flex-col gap-5">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={180} className="mt-10">
            <p className="text-label uppercase text-(--color-foreground-subtle)">
              {selectorLabel ?? t.footer.markets}
            </p>

            {/*
              Wraps rather than scrolls. A horizontal scroller hides options
              off the edge of a phone and gives no sign they are there; six
              short names wrap to three tidy rows at 360px and every one of
              them is visible without a gesture.
            */}
            <ul className="mt-5 flex flex-wrap gap-x-2.5 gap-y-2.5">
              {enriched.map((market, index) => (
                <li key={market.code}>
                  <button
                    type="button"
                    aria-pressed={active === index}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    data-active={active === index ? "true" : "false"}
                    className="about-market group relative block px-4 py-2.5 text-[0.9375rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring)"
                  >
                    {/* Border as a sibling, so it can brighten without a repaint of the text. */}
                    <span
                      aria-hidden="true"
                      className="about-market-frame absolute inset-0 border border-(--color-border)"
                    />
                    <span className="relative">{market.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ------------------------------------------------------------------
            Premium market card grid (replaces the SVG constellation map).

            2 columns × 3 rows on md+. Each card is a pressable surface with:
              - Market name as a headline
              - Financial centre city in gold
              - One-line descriptor
              - Full gold accent border on the active card; subtle border on rest

            The active card is driven by the same `active` index as the chip
            selector on the left, so both controls stay in sync.
            ------------------------------------------------------------------ */}
        <Reveal delay={160} variant="fade">
          <div
            className="surface-dark relative isolate overflow-hidden p-6 sm:p-8"
            style={{
              background:
                "radial-gradient(80% 70% at 60% 35%, #182636 0%, #101b27 55%, #0c141d 100%)",
            }}
          >
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {enriched.map((market, index) => {
                const isActive = active === index;
                return (
                  <li key={market.code}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      className="group w-full text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring)"
                    >
                      <div
                        className="relative flex h-full flex-col gap-2 rounded-[2px] p-4 transition-all duration-300 ease-out sm:p-5"
                        style={{
                          background: isActive
                            ? "rgba(184,148,95,0.08)"
                            : "rgba(255,255,255,0.03)",
                          border: isActive
                            ? "1px solid rgba(184,148,95,0.55)"
                            : "1px solid rgba(244,241,235,0.09)",
                          boxShadow: isActive
                            ? "0 0 28px rgba(184,148,95,0.12), inset 0 1px 0 rgba(184,148,95,0.15)"
                            : "none",
                        }}
                      >
                        {/* Gold top accent line on active card */}
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 top-0 h-px"
                            style={{
                              background:
                                "linear-gradient(90deg, transparent, rgba(184,148,95,0.8), transparent)",
                            }}
                          />
                        )}

                        {/* Market name */}
                        <span
                          className="block text-[0.8125rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-300"
                          style={{
                            color: isActive
                              ? "rgba(184,148,95,1)"
                              : "rgba(244,241,235,0.55)",
                          }}
                        >
                          {market.label}
                        </span>

                        {/* Financial centre */}
                        <span
                          className="block font-display text-[1.125rem] leading-tight transition-colors duration-300 sm:text-[1.25rem]"
                          style={{
                            color: isActive
                              ? "rgba(244,241,235,0.98)"
                              : "rgba(244,241,235,0.75)",
                          }}
                        >
                          {market.city}
                        </span>

                        {/* One-line descriptor */}
                        {market.description && (
                          <span
                            className="mt-1 block text-[0.8125rem] leading-relaxed transition-colors duration-300"
                            style={{
                              color: isActive
                                ? "rgba(244,241,235,0.6)"
                                : "rgba(244,241,235,0.35)",
                            }}
                          >
                            {market.description}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/*
              CONTENT INTEGRITY. Not decoration, not collapsible, and never
              behind an interaction. See the note on the `disclaimer` prop.
            */}
            <p className="mt-6 max-w-[48ch] text-sm leading-relaxed text-(--color-foreground-subtle)">
              {disclaimer}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
