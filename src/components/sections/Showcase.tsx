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
 * ---------------------------------------------------------------------------
 * The 2026 recomposition
 * ---------------------------------------------------------------------------
 * The mechanism is untouched. What changed is the composition, because the
 * panel was the smaller half of the split and the rows all carried equal
 * weight - which made a feature interaction read as a list with a thumbnail
 * beside it.
 *
 * - The proportions invert. The photograph is now the LARGER column (1.12fr
 *   against 0.88fr) and bleeds past the container into the right gutter, so
 *   it reads as a full-bleed frame the page is cropped by rather than as a
 *   picture sitting inside a margin.
 * - The active row is set larger than the inactive ones, and the inactive
 *   titles go quiet. Scale carries the state, not just colour.
 * - The summary belongs to the active row only, on `lg` and up. It expands on
 *   a `grid-template-rows` transition rather than being unmounted, so the
 *   copy stays in the DOM and in the accessibility tree at all times - a
 *   screen reader and find-in-page still get all four summaries.
 * - A gold rail runs the height of the list with a lit segment that travels to
 *   the active row, so the section states its own position.
 * - The number sits over the photograph and the title crosses its lower
 *   boundary, which is what stops the panel reading as a rectangle parked
 *   beside the text.
 *
 * Below `lg` none of this applies: the layout inverts to stacked rows, every
 * summary is visible, and each row carries its own inline photograph.
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
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start lg:gap-x-20">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
          <Reveal>
            <SectionLabel>{label}</SectionLabel>
            <Heading id={id} level={2} size="display" className="mt-5 max-w-[13ch]">
              {heading}
            </Heading>
          </Reveal>

          {/*
            The rail. A full-height track with one lit segment that travels to
            the active row.

            Position is computed from the index rather than measured from the
            DOM, which is only sound because every row is the same height on
            `lg` - the summary is the one variable-height part and it lives
            inside a fixed-height reveal there. It is `aria-hidden`: what it
            communicates is which row is under the pointer, and that is already
            in the accessibility tree as focus.
          */}
          <div className="relative mt-[var(--space-heading)]">
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 hidden h-full w-px bg-(--color-border) lg:block"
            >
              <span
                style={{
                  height: `${100 / items.length}%`,
                  transform: `translateY(${active * 100}%)`,
                }}
                className="absolute inset-x-0 top-0 block bg-(--color-accent) transition-transform duration-[600ms] ease-[var(--ease-out-expo)]"
              />
            </div>

            <ul className="border-t border-(--color-border) lg:border-t-0 lg:pl-10">
              {items.map((item, index) => {
                const isActive = active === index;

                return (
                  <li
                    key={item.key}
                    className="border-b border-(--color-border) lg:border-b-0"
                  >
                    <Reveal delay={index * 80}>
                      <Link
                        href={item.href}
                        onMouseEnter={() => setActive(index)}
                        onFocus={() => setActive(index)}
                        onTouchStart={() => setActive(index)}
                        className="group block py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) sm:py-10 lg:py-9"
                      >
                        <div className="flex items-start gap-5 sm:gap-8">
                          <span
                            aria-hidden="true"
                            className={cn(
                              "mt-2 shrink-0 num font-display-sm text-[0.9375rem] transition-colors duration-500",
                              isActive
                                ? "text-(--color-accent)"
                                : "text-(--color-foreground-subtle)",
                            )}
                          >
                            {item.number}
                          </span>

                          <div className="min-w-0 flex-1">
                            {/*
                              Scale carries the state on `lg`, not just colour:
                              the active title sets at h2 and the others at h3,
                              which is what makes one row read as the feature
                              and the rest as its index.

                              Both sizes are rendered and one is hidden, rather
                              than swapping a class on a single element. A font
                              size change mid-transition cannot be interpolated
                              and would snap; cross-fading two elements can.
                            */}
                            <span className="relative block">
                              <Heading
                                level={3}
                                size="h3"
                                className={cn(
                                  "origin-left transition-[color,opacity,transform] duration-500 ease-out lg:absolute lg:inset-x-0 lg:top-0",
                                  isActive
                                    ? "translate-x-1.5 text-(--color-accent) lg:pointer-events-none lg:opacity-0"
                                    : "translate-x-0 text-(--color-foreground) lg:opacity-100",
                                )}
                              >
                                {item.title}
                              </Heading>

                              <Heading
                                aria-hidden="true"
                                level={3}
                                size="h2"
                                className={cn(
                                  "hidden origin-left text-(--color-accent) transition-[opacity,transform] duration-500 ease-out lg:block",
                                  isActive
                                    ? "translate-x-1.5 opacity-100"
                                    : "pointer-events-none absolute inset-x-0 top-0 translate-x-0 opacity-0",
                                )}
                              >
                                {item.title}
                              </Heading>
                            </span>

                            {/*
                              The summary. Always in the DOM; on `lg` it is
                              collapsed for inactive rows on a
                              `grid-template-rows` transition, which animates
                              height without ever unmounting the text.

                              `visibility` rather than `display` on the inner
                              wrapper - `display: none` would remove it from the
                              accessibility tree, which is the thing this
                              arrangement exists to avoid.
                            */}
                            <div
                              className={cn(
                                "grid transition-[grid-template-rows,opacity] duration-[600ms] ease-[var(--ease-out-expo)] lg:mt-0",
                                "grid-rows-[1fr] opacity-100",
                                !isActive && "lg:grid-rows-[0fr] lg:opacity-0",
                              )}
                            >
                              <p className="overflow-hidden mt-3.5 max-w-[54ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted) lg:mt-0 lg:pt-4">
                                {item.summary}
                              </p>
                            </div>

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
                              "mt-3 hidden shrink-0 transition-[transform,color] duration-500 ease-out sm:block",
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
        </div>

        {/*
          The panel. Pointer-driven, so large viewports only.

          It bleeds one gutter past the container into the right margin. A
          negative margin of exactly `--gutter` rather than a full-bleed
          wrapper, so it stays inside the Container's grid and nothing can push
          the page wider than 100vw - body overflow-x is a guard here, not the
          mechanism.

          Not sticky any more. The LIST is sticky now instead, which is the
          right way round: the list is the navigation and the photograph is
          what it drives, so pinning the index and letting the feature move is
          what makes the section read as a showcase rather than as a picture
          that follows you down the page.
        */}
        <div aria-hidden="true" className="hidden lg:block lg:-mr-(--gutter)">
          <div>
            <div className="relative aspect-[3/4] overflow-hidden">
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

              {/*
                The number, set over the photograph at display scale.

                Top-left, in the heaviest part of the `soft` scrim, so an
                oversized numeral has a ground dark enough to sit on at every
                frame in the set. It is the one element that tells you the
                panel and the list are the same object.
              */}
              <span
                key={`n-${items[active].key}`}
                className="showcase-index pointer-events-none absolute left-7 top-6 z-10 num font-display leading-none text-[#f4f1eb]/85 text-[clamp(3.5rem,6vw,5.5rem)]"
              >
                {items[active].number}
              </span>
            </div>

            {/*
              The title crosses the photograph's lower boundary.

              A plate pulled up over the frame's edge by a third of its own
              height, so the panel stops being a rectangle with a caption
              inside it and becomes two shapes that overlap. `-mt-` on a
              relative block rather than absolute positioning, so the note
              below still flows after it and nothing has to be measured.
            */}
            <div className="relative z-10 -mt-9 ml-7 mr-14 bg-(--color-canvas) py-6 pl-7 pr-8 shadow-[var(--shadow-lg)]">
              <span
                key={`t-${items[active].key}`}
                className="showcase-title block font-display text-[1.625rem] leading-snug text-balance"
              >
                {items[active].title}
              </span>
            </div>

            {note && (
              <p className="mt-8 ml-7 max-w-[42ch] text-sm leading-relaxed text-(--color-foreground-subtle)">
                {note}
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
