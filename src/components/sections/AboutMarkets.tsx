"use client";

import { useState } from "react";

import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { aboutRegion } from "@/data/about";
import { gulfMarkets } from "@/data/homepage";
import { globeMarkets } from "@/data/outreach-globe";

/**
 * ============================================================================
 * PROJECTION
 * ============================================================================
 * Equirectangular, over a box drawn around the Gulf: 44.5-60.5E, 21.5-30.5N.
 * Nothing clever - at this extent the distortion of a plate carree is smaller
 * than the stroke width, and a projection with a name nobody can check is
 * worse than a projection anyone can.
 *
 * The point of projecting at all rather than arranging six dots by eye is that
 * the relative positions are then true: Kuwait really does sit that far north
 * of Riyadh, Muscat really is that far east of Dubai. A diagram that is going
 * to place markets geographically should be right about it.
 *
 * Coordinates come from `data/outreach-globe.ts`, which already holds each
 * market's principal financial centre for the globe on another route. A
 * coordinate is a geographic fact, not a presence - the same note that file
 * carries applies here, and the disclaimer under this map states it.
 */
const BOX = { west: 44.5, east: 60.5, south: 21.5, north: 30.5 };
const CANVAS = { w: 640, h: 420 };

const projectX = (lon: number) =>
  ((lon - BOX.west) / (BOX.east - BOX.west)) * CANVAS.w;
const projectY = (lat: number) =>
  ((BOX.north - lat) / (BOX.north - BOX.south)) * CANVAS.h;

/**
 * Where each market's label hangs relative to its node.
 *
 * Only one label is ever visible, so labels cannot collide with each other -
 * the only thing this has to solve is staying inside the frame. Kuwait sits
 * near the top edge and Muscat near the right, which is why neither takes the
 * placement its neighbours do.
 */
const LABEL_PLACE: Record<string, "above" | "below"> = {
  AE: "below",
  SA: "below",
  QA: "below",
  KW: "below",
  BH: "above",
  OM: "above",
};

/** Graticule, every two degrees. Drawn, not decorative noise. */
const MERIDIANS = [46, 48, 50, 52, 54, 56, 58, 60];
const PARALLELS = [22, 24, 26, 28, 30];

interface PlacedMarket {
  code: string;
  label: string;
  city: string;
  x: number;
  y: number;
  place: "above" | "below";
}

/**
 * The six markets, placed.
 *
 * `gulfMarkets` is the list this page and the homepage both render as text and
 * is the source of the order; `globeMarkets` supplies the coordinate. Joining
 * them here rather than duplicating either means the map can never drift out
 * of step with the list beside it.
 */
const placed: PlacedMarket[] = gulfMarkets.map((market) => {
  const geo = globeMarkets.find((entry) => entry.code === market.code);

  return {
    code: market.code,
    label: market.label,
    city: market.city,
    x: geo ? projectX(geo.lon) : CANVAS.w / 2,
    y: geo ? projectY(geo.lat) : CANVAS.h / 2,
    place: LABEL_PLACE[market.code] ?? "below",
  };
});

/**
 * Regional understanding.
 *
 * The six Gulf markets on an abstract map instead of in a row of bordered
 * chips. Selecting one - by pointer, by keyboard or by touch - lights its
 * position in bronze, draws connecting lines out to the other five and reveals
 * its financial centre beside the node.
 *
 * ---------------------------------------------------------------------------
 * How the interaction is arranged, and why
 * ---------------------------------------------------------------------------
 * The map is inert. Every control is a real `<button>` in the list beside it,
 * and the SVG is `aria-hidden` throughout. Three things follow, and all of
 * them are the reason it is built this way:
 *
 * - It is keyboard operable without inventing focus behaviour for SVG nodes.
 * - It is touch operable at any size, because the targets are text buttons
 *   rather than 4px circles. The brief for a phone was a clean selector rather
 *   than a fiddly map; this is that selector at every width, and the map comes
 *   along as the thing it drives.
 * - A screen reader gets six market names and no duplicated geometry.
 *
 * ---------------------------------------------------------------------------
 * Content integrity
 * ---------------------------------------------------------------------------
 * A dot on a map is the single easiest element on this site to misread as an
 * office. `aboutRegion.disclaimer` sits under the frame at every breakpoint,
 * is never behind an interaction, and says exactly what the map is: market
 * orientation, not offices, registrations or investor relationships. The
 * connecting lines are orientation too - they say these six are considered
 * together, which is what the copy beside them already says.
 */
export function AboutMarkets() {
  const [active, setActive] = useState(0);
  const current = placed[active];

  return (
    <Section spacing="lg" aria-labelledby="about-region">
      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-x-20">
        {/* ------------------------------------------------------------------
            Copy and the selector.
            ------------------------------------------------------------------ */}
        <div>
          <Reveal>
            <SectionLabel>{aboutRegion.label}</SectionLabel>
            <Heading id="about-region" level={2} size="h2" className="mt-5 max-w-[15ch]">
              {aboutRegion.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120} className="mt-8 flex flex-col gap-5">
            {aboutRegion.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={180} className="mt-10">
            <p className="text-label uppercase text-(--color-foreground-subtle)">Markets</p>

            {/*
              Wraps rather than scrolls. A horizontal scroller hides options
              off the edge of a phone and gives no sign they are there; six
              short names wrap to three tidy rows at 360px and every one of
              them is visible without a gesture.
            */}
            <ul className="mt-5 flex flex-wrap gap-x-2.5 gap-y-2.5">
              {placed.map((market, index) => (
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
            The map.
            ------------------------------------------------------------------ */}
        <Reveal delay={160} variant="fade">
          <div className="surface-dark relative isolate overflow-hidden p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_60%_35%,#182636_0%,#101b27_55%,#0c141d_100%)]"
            />

            <svg
              viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`}
              className="h-auto w-full"
              role="presentation"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                {/* Soft lift behind the selected market. */}
                <radialGradient id="about-market-glow">
                  <stop offset="0%" stopColor="#b8945f" stopOpacity="0.32" />
                  <stop offset="55%" stopColor="#b8945f" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#b8945f" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Graticule. */}
              <g stroke="#f4f1eb" strokeOpacity="0.055" strokeWidth="1">
                {MERIDIANS.map((lon) => (
                  <line
                    key={`m${lon}`}
                    x1={projectX(lon)}
                    y1={0}
                    x2={projectX(lon)}
                    y2={CANVAS.h}
                  />
                ))}
                {PARALLELS.map((lat) => (
                  <line
                    key={`p${lat}`}
                    x1={0}
                    y1={projectY(lat)}
                    x2={CANVAS.w}
                    y2={projectY(lat)}
                  />
                ))}
              </g>

              {/*
                The lattice. Every market joined to every other, drawn once per
                PAIR rather than once per ordered pair - fifteen lines, not
                thirty, so no two strokes sit on top of each other doubling
                their own opacity.

                It is always there, and that is the point: without it the frame
                was six dots in space until something was selected, and the six
                being considered together is what the copy beside it is about.
              */}
              <g strokeWidth="1" stroke="#b8945f" strokeOpacity="0.08">
                {placed.map((from, fromIndex) =>
                  placed.slice(fromIndex + 1).map((to) => (
                    <line
                      key={`lattice-${from.code}-${to.code}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                    />
                  )),
                )}
              </g>

              {/*
                Connectors out of the selected market, over the lattice. All
                thirty are in the DOM at all times and only opacity changes, so
                switching markets never costs a re-layout of the SVG and never
                shows a half-drawn line.
              */}
              <g strokeWidth="1" stroke="#b8945f">
                {placed.map((from, fromIndex) =>
                  placed.map((to, toIndex) => {
                    if (fromIndex === toIndex) return null;
                    return (
                      <line
                        key={`${from.code}-${to.code}`}
                        className="about-market-link"
                        data-on={fromIndex === active ? "true" : "false"}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                      />
                    );
                  }),
                )}
              </g>

              {/* Glow under the selected market. */}
              <circle
                className="about-market-glow"
                cx={current.x}
                cy={current.y}
                r="86"
                fill="url(#about-market-glow)"
              />

              {/* Nodes. */}
              {placed.map((market, index) => (
                <g
                  key={market.code}
                  className="about-market-node"
                  data-on={index === active ? "true" : "false"}
                >
                  <circle cx={market.x} cy={market.y} r="3.25" fill="#b8945f" />
                  <circle
                    className="about-market-ring"
                    cx={market.x}
                    cy={market.y}
                    r="11"
                    fill="none"
                    stroke="#b8945f"
                  />
                </g>
              ))}

              {/*
                The contextual label: the market's financial centre, beside its
                node. One at a time, which is what keeps the frame clean and
                why label collisions never have to be solved.
              */}
              <text
                className="about-market-label fill-current"
                x={current.x}
                y={current.place === "above" ? current.y - 24 : current.y + 32}
                textAnchor="middle"
                style={{ letterSpacing: "0.14em" }}
              >
                {current.city.toUpperCase()}
              </text>
            </svg>

            {/*
              CONTENT INTEGRITY. Not decoration, and not collapsible. See the
              note on `aboutRegion.disclaimer`.
            */}
            <p className="mt-6 max-w-[48ch] text-sm leading-relaxed text-(--color-foreground-subtle)">
              {aboutRegion.disclaimer}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
