"use client";

import { LocaleLink } from "@/components/layout/LocaleLink";
import { useState } from "react";

import { useLocale } from "@/components/layout/LocaleProvider";
import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Localised } from "@/content";
import type { capabilities as CapabilitiesEn } from "@/data/capabilities";
import { capabilityPhotos } from "@/data/imagery";
import { cn } from "@/lib/utils";

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="26"
      height="12"
      viewBox="0 0 26 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M0 6h23" />
      <path d="M18 1l5 5-5 5" />
    </svg>
  );
}

/**
 * Interactive capability system.
 *
 * Four full-width rows on a dark surface; pointing at or tabbing to a row
 * swaps the photograph in the sticky panel beside it. The four images are all
 * mounted and cross-faded on opacity rather than swapped by `src`, so moving
 * between rows never shows a decoding flash.
 *
 * Interaction notes:
 * - `onFocus` mirrors `onMouseEnter`, so the panel tracks keyboard traversal
 *   exactly as it tracks the pointer.
 * - `onTouchStart` mirrors it too, which is what makes the panel work on a
 *   touch device wide enough to be rendering it. A tablet in landscape is past
 *   the `lg` breakpoint and gets the sticky panel, but it never fires
 *   `mouseenter`, so without this the panel sat on capability 01 for the whole
 *   section. Touching a row now swaps the image on the way to following the
 *   link.
 * - The panel is `aria-hidden`; it is a visual accompaniment to a row whose
 *   text is already the accessible content, and announcing it on every focus
 *   move would be noise.
 * - Below `lg` there is no panel to drive: the layout inverts and each row
 *   carries its own photograph inline, so every capability shows its own image
 *   without an interaction being needed to reveal it.
 */
/**
 * The four capabilities.
 *
 * Takes its copy as a PROP rather than importing it, because this is a client
 * component and page copy reaches the client only through a server parent.
 *  resolves the language and hands the right set down.
 */
export function CapabilityShowcase({
  capabilities,
}: {
  capabilities: Localised<typeof CapabilitiesEn>;
}) {
  const { t } = useLocale();
  const [active, setActive] = useState(0);

  return (
    <Section spacing="lg" tone="dark" aria-labelledby="capabilities-heading">
      <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)]">
        <div>
          <Reveal>
            <SectionLabel>{t.nav.items.whatWeDo}</SectionLabel>
            <Heading id="capabilities-heading" level={2} size="display" className="mt-5 max-w-[11ch]">
              {t.sections.ourCapabilities}
            </Heading>
          </Reveal>

          <ul className="mt-[var(--space-heading)] border-t border-(--color-border)">
            {capabilities.map((capability, index) => {
              const isActive = active === index;
              const photo = capabilityPhotos[capability.slug];

              return (
                <li key={capability.slug} className="border-b border-(--color-border)">
                  <Reveal delay={index * 80}>
                    {/*
                      `LocaleLink`, so a reader on the Arabic home page who
                      follows a capability arrives at the Arabic service page.
                      Nothing else about the row changes.
                    */}
                    <LocaleLink
                      href={capability.href}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onTouchStart={() => setActive(index)}
                      className="group block py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) sm:py-10"
                    >
                      {/*
                        The index that opened each row is gone with the
                        01/02/03 format. Which row is active is still carried -
                        by the title colour, the rule and the photograph
                        changing beside it - so nothing about the control was
                        load-bearing on the numeral.

                        The flex wrapper stays: the row still has a second
                        child after this one.
                      */}
                      <div className="flex items-start gap-5 sm:gap-8">
                        <div className="min-w-0 flex-1">
                          {/*
                            The title shifts a few pixels right on activation.
                            Transform only - nothing here reflows, so hovering
                            down the list costs no layout work.
                          */}
                          <Heading
                            level={3}
                            size="h3"
                            className={cn(
                              "origin-left transition-[color,transform] duration-500 ease-out",
                              isActive
                                ? "ltr:translate-x-1.5 rtl:-translate-x-1.5 text-(--color-accent)"
                                : "translate-x-0 text-(--color-foreground)",
                            )}
                          >
                            {capability.title}
                          </Heading>

                          <p className="mt-3.5 max-w-[54ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                            {capability.summary}
                          </p>

                          {/*
                            The areas of work, at last.

                            `capabilities[].areas` has held seven to eleven
                            concrete entries per discipline since the file was
                            written and nothing has ever rendered them - the
                            homepage said what each capability was and never
                            what it contained.

                            Four of them, not all. Eleven short phrases under
                            each of four rows is a wall; four is enough to make
                            the discipline concrete and short enough to stay a
                            row rather than becoming a list. The full set is
                            still in the data for a service page to use.

                            Real text, not a hover reveal: this is the
                            accessible content of the row, and the panel beside
                            it is `aria-hidden`. Substance belongs on the side
                            a screen reader can reach.
                          */}
                          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                            {capability.areas.slice(0, 4).map((area) => (
                              <li
                                key={area}
                                className="flex items-center gap-2.5 text-[0.8125rem] text-(--color-foreground-subtle)"
                              >
                                <span
                                  aria-hidden="true"
                                  className="h-1 w-1 shrink-0 rounded-full bg-(--color-accent)"
                                />
                                {area}
                              </li>
                            ))}
                          </ul>

                          {/* Inline photography, small viewports only. */}
                          <div className="mt-6 lg:hidden">
                            <Figure
                              photo={photo}
                              ratio="wide"
                              overlay="veil"
                              zoom
                              sizes="(min-width: 640px) 90vw, 100vw"
                            />
                          </div>
                        </div>

                        <span
                          aria-hidden="true"
                          className={cn(
                            "mt-2 hidden shrink-0 transition-[transform,color] duration-500 ease-out sm:block",
                            isActive
                              ? "ltr:translate-x-1.5 rtl:-translate-x-1.5 text-(--color-accent)"
                              : "translate-x-0 text-(--color-foreground-subtle)",
                          )}
                        >
                          <Arrow />
                        </span>
                      </div>
                    </LocaleLink>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sticky companion panel. Pointer-driven, so large viewports only. */}
        <div aria-hidden="true" className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+3rem)]">
            <div className="relative aspect-[4/5] overflow-hidden">
              {capabilities.map((capability, index) => (
                <div
                  key={capability.slug}
                  className={cn(
                    /*
                      400ms, just inside the row's own 500ms colour and
                      transform moves. At 700ms the photograph was still
                      arriving well after the title had finished turning
                      bronze, so running down the list left the panel trailing
                      the row it was meant to be illustrating.
                    */
                    "absolute inset-0 transition-opacity duration-[400ms] ease-out",
                    active === index ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Figure
                    photo={capabilityPhotos[capability.slug]}
                    ratio="auto"
                    overlay="soft"
                    grain
                    className="h-full w-full"
                    sizes="40vw"
                  />
                </div>
              ))}

              {/* Caption plate, tracking the active row. */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-7">
                <p className="font-display text-[1.5rem] leading-snug text-[#f4f1eb]">
                  {capabilities[active].title}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-(--color-foreground-subtle)">
              Companies rarely need all four at once. The balance is set by where a business
              currently stands with the market.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
