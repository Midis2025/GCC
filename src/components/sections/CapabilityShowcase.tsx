"use client";

import Link from "next/link";
import { useState } from "react";

import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { capabilities } from "@/data/capabilities";
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
 * - The panel is `aria-hidden`; it is a visual accompaniment to a row whose
 *   text is already the accessible content, and announcing it on every focus
 *   move would be noise.
 * - Below `lg` there is no hover to depend on, so the layout inverts: each row
 *   carries its own image inline and the sticky panel is not rendered.
 */
export function CapabilityShowcase() {
  const [active, setActive] = useState(0);

  return (
    <Section spacing="lg" tone="dark" aria-labelledby="capabilities-heading">
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)]">
        <div>
          <Reveal>
            <SectionLabel>What We Do</SectionLabel>
            <Heading id="capabilities-heading" level={2} size="display" className="mt-7 max-w-[11ch]">
              Our Capabilities
            </Heading>
          </Reveal>

          <ul className="mt-14 border-t border-(--color-border)">
            {capabilities.map((capability, index) => {
              const isActive = active === index;
              const photo = capabilityPhotos[capability.slug];

              return (
                <li key={capability.slug} className="border-b border-(--color-border)">
                  <Reveal delay={index * 80}>
                    <Link
                      href={capability.href}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      className="group block py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) sm:py-10"
                    >
                      <div className="flex items-start gap-5 sm:gap-8">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "mt-1 shrink-0 font-serif text-[0.9375rem] transition-colors duration-500",
                            isActive
                              ? "text-(--color-accent)"
                              : "text-(--color-foreground-subtle)",
                          )}
                        >
                          {capability.number}
                        </span>

                        <div className="min-w-0 flex-1">
                          {/*
                            The title shifts a few pixels right on activation.
                            Transform only - nothing here reflows, so hovering
                            down the list costs no layout work.
                          */}
                          <Heading
                            level={3}
                            size="h3"
                            font="serif"
                            className={cn(
                              "origin-left transition-[color,transform] duration-500 ease-out",
                              isActive
                                ? "translate-x-1.5 text-(--color-accent)"
                                : "translate-x-0 text-(--color-foreground)",
                            )}
                          >
                            {capability.title}
                          </Heading>

                          <p className="mt-3.5 max-w-[54ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                            {capability.summary}
                          </p>

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
                              ? "translate-x-1.5 text-(--color-accent)"
                              : "translate-x-0 text-(--color-foreground-subtle)",
                          )}
                        >
                          <Arrow />
                        </span>
                      </div>
                    </Link>
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
                    "absolute inset-0 transition-opacity duration-700 ease-out",
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
                <p className="font-serif text-sm text-(--color-accent)">
                  {capabilities[active].number}
                </p>
                <p className="mt-2 font-serif text-[1.5rem] leading-snug text-[#f4f1eb]">
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
