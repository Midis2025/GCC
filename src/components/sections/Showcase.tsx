"use client";

import Link from "next/link";
import { useState } from "react";

import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Photo } from "@/data/imagery";
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

export interface ShowcaseItem {
  key: string;
  number: string;
  title: string;
  summary: string;
  href: string;
  photo: Photo;
}

export interface ShowcaseProps {
  id: string;
  label: string;
  heading: string;
  items: ShowcaseItem[];
  /** Standing line under the sticky panel. Optional. */
  note?: string;
}

/**
 * ============================================================================
 * SHOWCASE
 * ============================================================================
 * The site's signature interaction, generalised.
 *
 * Full-width rows on a dark surface; pointing at, tabbing to or touching a row
 * swaps the photograph in the sticky panel beside it. Every image is mounted
 * and cross-faded on opacity rather than swapped by `src`, so moving between
 * rows never shows a decoding flash.
 *
 * This began life as `CapabilityShowcase`, hard-wired to the old capability
 * list. Nothing about the interaction was specific to that content - it is a
 * pattern for "n things, each with a picture" - so it now takes its items as a
 * prop and the old component is gone. The behaviour is unchanged in every
 * respect, deliberately: same 400ms crossfade, same 500ms row transitions,
 * same sticky offset, same inline-image inversion below `lg`.
 *
 * Interaction notes, carried over intact:
 * - `onFocus` mirrors `onMouseEnter`, so the panel tracks keyboard traversal
 *   exactly as it tracks the pointer.
 * - `onTouchStart` mirrors it too. A tablet in landscape is past the `lg`
 *   breakpoint and gets the sticky panel, but it never fires `mouseenter` -
 *   without this the panel sat on the first item for the whole section.
 * - The panel is `aria-hidden`; it accompanies a row whose text is already the
 *   accessible content, and announcing it on every focus move would be noise.
 * - Below `lg` there is no panel to drive: the layout inverts and each row
 *   carries its own photograph inline.
 */
export function Showcase({ id, label, heading, items, note }: ShowcaseProps) {
  const [active, setActive] = useState(0);

  if (items.length === 0) return null;

  return (
    <Section spacing="lg" tone="dark" aria-labelledby={id}>
      <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)]">
        <div>
          <Reveal>
            <SectionLabel>{label}</SectionLabel>
            <Heading id={id} level={2} size="display" className="mt-5 max-w-[13ch]">
              {heading}
            </Heading>
          </Reveal>

          <ul className="mt-[var(--space-heading)] border-t border-(--color-border)">
            {items.map((item, index) => {
              const isActive = active === index;

              return (
                <li key={item.key} className="border-b border-(--color-border)">
                  <Reveal delay={index * 80}>
                    <Link
                      href={item.href}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onTouchStart={() => setActive(index)}
                      className="group block py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) sm:py-10"
                    >
                      <div className="flex items-start gap-5 sm:gap-8">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "mt-1 shrink-0 num font-display-sm text-[0.9375rem] transition-colors duration-500",
                            isActive
                              ? "text-(--color-accent)"
                              : "text-(--color-foreground-subtle)",
                          )}
                        >
                          {item.number}
                        </span>

                        <div className="min-w-0 flex-1">
                          {/*
                            The title shifts a few pixels right on activation.
                            Transform only - nothing here reflows, so running
                            down the list costs no layout work.
                          */}
                          <Heading
                            level={3}
                            size="h3"
                            className={cn(
                              "origin-left transition-[color,transform] duration-500 ease-out",
                              isActive
                                ? "translate-x-1.5 text-(--color-accent)"
                                : "translate-x-0 text-(--color-foreground)",
                            )}
                          >
                            {item.title}
                          </Heading>

                          <p className="mt-3.5 max-w-[54ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                            {item.summary}
                          </p>

                          {/* Inline photography, small viewports only. */}
                          <div className="mt-6 lg:hidden">
                            <Figure
                              photo={item.photo}
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
              {items.map((item, index) => (
                <div
                  key={item.key}
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
                    photo={item.photo}
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
                <p className="num font-display-sm text-sm text-(--color-accent)">
                  {items[active].number}
                </p>
                <p className="mt-2 font-display text-[1.5rem] leading-snug text-[#f4f1eb]">
                  {items[active].title}
                </p>
              </div>
            </div>

            {note && (
              <p className="mt-6 text-sm leading-relaxed text-(--color-foreground-subtle)">
                {note}
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
