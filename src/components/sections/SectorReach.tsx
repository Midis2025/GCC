"use client";

import { useState, type CSSProperties } from "react";

import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { industries } from "@/data/industries";
import { gulfMarkets } from "@/data/homepage";

const CANVAS = { w: 640, h: 300 };
const HUB = { x: 320, y: 150 };
const SECTOR_X = 92;
const MARKET_X = 548;

const delay = (ms: number) => ({ "--net-delay": `${ms}ms` }) as CSSProperties;

/** Evenly spaced down the canvas, inset from the edges. */
const spread = (count: number, index: number) => 34 + (index * (CANVAS.h - 68)) / (count - 1);

/**
 * Sectors, through one discipline, into markets.
 *
 * Six lines converge on a point and seven leave it. That is the whole idea, and
 * it is the page's argument in one shape: the sectors above differ, the markets
 * below differ, and what sits between them is a single approach rather than a
 * different one per combination.
 *
 * Drawn, not diagrammed. No boxes, no arrowheads, no labelled process blocks -
 * a flowchart would turn an editorial point into an org chart. The lines are
 * hairlines, the nodes are small, and the only colour is bronze.
 *
 * Motion reuses `.net-link` / `.net-node`, the same mechanism behind the Gulf
 * orientation diagram and the narrative diagram: connectors draw from the
 * centre outward, nodes fade in behind them, all of it keyed off `data-visible`
 * on the enclosing `Reveal`. Dash lengths come from real geometry so a short
 * link and a long one draw at the same apparent speed.
 *
 * Hidden from assistive technology. Both lists it draws are rendered as real
 * text elsewhere in this section, and the hub is a decorative restatement of
 * the heading.
 */
function ReachDiagram({ activeMarket }: { activeMarket: number | null }) {
  return (
    <svg
      viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`}
      className="h-auto w-full"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/*
          `userSpaceOnUse`, not the default. A gradient in objectBoundingBox
          units resolves against each stroked element's own box, and a perfectly
          horizontal line has a zero-height box - which makes the paint
          undefined and drops that line silently.
        */}
        <linearGradient
          id="reach-in"
          gradientUnits="userSpaceOnUse"
          x1={SECTOR_X}
          y1={HUB.y}
          x2={HUB.x}
          y2={HUB.y}
        >
          <stop offset="0%" stopColor="#b8945f" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#b8945f" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="reach-out"
          gradientUnits="userSpaceOnUse"
          x1={HUB.x}
          y1={HUB.y}
          x2={MARKET_X}
          y2={HUB.y}
        >
          <stop offset="0%" stopColor="#b8945f" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#b8945f" stopOpacity="0.14" />
        </linearGradient>
      </defs>

      {/* Sectors in. */}
      <g stroke="url(#reach-in)" strokeWidth="1">
        {industries.map((industry, index) => {
          const y = spread(industries.length, index);
          return (
            <line
              key={industry.slug}
              className="net-link"
              x1={SECTOR_X}
              y1={y}
              x2={HUB.x}
              y2={HUB.y}
              style={
                {
                  ...delay(160 + index * 70),
                  "--dash-length": Math.hypot(HUB.x - SECTOR_X, HUB.y - y),
                } as CSSProperties
              }
            />
          );
        })}
      </g>

      {/* Markets out. The active one brightens. */}
      <g strokeWidth="1">
        {gulfMarkets.map((market, index) => {
          const y = spread(gulfMarkets.length + 1, index);
          return (
            <line
              key={market.code}
              className="net-link reach-out"
              data-on={activeMarket === index ? "true" : "false"}
              stroke="url(#reach-out)"
              x1={HUB.x}
              y1={HUB.y}
              x2={MARKET_X}
              y2={y}
              style={
                {
                  ...delay(560 + index * 70),
                  "--dash-length": Math.hypot(MARKET_X - HUB.x, y - HUB.y),
                } as CSSProperties
              }
            />
          );
        })}
        {/* The international step, dashed so it reads as distinct. */}
        <line
          className="net-node reach-out"
          data-on={activeMarket === gulfMarkets.length ? "true" : "false"}
          stroke="#b8945f"
          strokeOpacity="0.4"
          strokeDasharray="3 6"
          x1={HUB.x}
          y1={HUB.y}
          x2={MARKET_X}
          y2={spread(gulfMarkets.length + 1, gulfMarkets.length)}
          style={delay(560 + gulfMarkets.length * 70)}
        />
      </g>

      {/* Endpoints. */}
      {industries.map((industry, index) => (
        <circle
          key={`s-${industry.slug}`}
          className="net-node"
          cx={SECTOR_X}
          cy={spread(industries.length, index)}
          r="2.5"
          fill="#b8945f"
          fillOpacity="0.55"
          style={delay(360 + index * 70)}
        />
      ))}
      {[...gulfMarkets, { code: "INT" }].map((market, index) => (
        <circle
          key={`m-${market.code}`}
          className="net-node reach-dot"
          data-on={activeMarket === index ? "true" : "false"}
          cx={MARKET_X}
          cy={spread(gulfMarkets.length + 1, index)}
          r="2.5"
          fill="#b8945f"
          style={delay(760 + index * 60)}
        />
      ))}

      {/* The hub. */}
      <g className="net-node" style={delay(120)}>
        <circle cx={HUB.x} cy={HUB.y} r="5" fill="#b8945f" />
        <circle cx={HUB.x} cy={HUB.y} r="16" fill="none" stroke="#b8945f" strokeOpacity="0.35" />
        <circle cx={HUB.x} cy={HUB.y} r="31" fill="none" stroke="#b8945f" strokeOpacity="0.13" />
      </g>

      {/*
        Three labels, and no more.

        Without them the frame is two columns of dots with lines between: the
        shape is legible but what it is a shape OF is not. Labelling each
        endpoint was the obvious alternative and the wrong one - six sector
        names, one of them "Technology & Digital Infrastructure", plus seven
        markets, turns a diagram into a table. Naming the three groups says
        sectors, through one approach, into markets, which is the whole point
        and all of it.
      */}
      <g
        className="net-node fill-current text-[10.5px] uppercase"
        style={{ ...delay(980), letterSpacing: "0.16em" }}
        opacity="0.5"
      >
        <text x={SECTOR_X} y={18} textAnchor="middle">
          Sectors
        </text>
        <text x={MARKET_X} y={18} textAnchor="middle">
          Markets
        </text>
      </g>

      <g
        className="net-node fill-current text-[10.5px] uppercase"
        style={{ ...delay(1040), letterSpacing: "0.16em" }}
        opacity="0.72"
      >
        <text x={HUB.x} y={HUB.y + 58} textAnchor="middle">
          <tspan x={HUB.x} dy="0">
            One approach to
          </tspan>
          <tspan x={HUB.x} dy="15">
            market communication
          </tspan>
        </text>
      </g>
    </svg>
  );
}

/**
 * Applied across Gulf markets.
 *
 * Closes the page on the region rather than on a sector, and answers two things
 * at once: the market list, and the connection between the six sectors above
 * and the markets they are covered in.
 *
 * The markets are a horizontal strip rather than a row of bordered chips -
 * pointing at one turns it bronze, extends a rule under it and brightens its
 * line in the diagram. Below `sm` the strip wraps into a comfortable grid
 * rather than scrolling sideways: a horizontal scroller hides options off the
 * edge of a phone and gives no sign they are there.
 *
 * CONTENT INTEGRITY. "International" is listed exactly as it is elsewhere on
 * the site - a market orientation, not an office, a registration or a
 * relationship. Nothing here quantifies coverage.
 */
export function SectorReach() {
  const [activeMarket, setActiveMarket] = useState<number | null>(null);
  const markets = [...gulfMarkets.map((m) => m.label), "International"];

  return (
    <Section spacing="lg" aria-labelledby="industries-markets">
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-x-20">
        <div>
          <Reveal>
            <SectionLabel>Markets</SectionLabel>
            <Heading id="industries-markets" level={2} size="h2" className="mt-5 max-w-[15ch]">
              Applied Across Gulf Markets
            </Heading>
          </Reveal>

          {/* The market strip. */}
          <Reveal delay={140} className="mt-9">
            <ul className="flex flex-col">
              {markets.map((label, index) => (
                <li key={label}>
                  <button
                    type="button"
                    aria-pressed={activeMarket === index}
                    data-active={activeMarket === index ? "true" : "false"}
                    onMouseEnter={() => setActiveMarket(index)}
                    onMouseLeave={() => setActiveMarket(null)}
                    onFocus={() => setActiveMarket(index)}
                    onBlur={() => setActiveMarket(null)}
                    onClick={() =>
                      setActiveMarket((value) => (value === index ? null : index))
                    }
                    className="ind-market group relative block w-full border-t border-(--color-border) py-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                  >
                    <span
                      aria-hidden="true"
                      className="ind-market-rule absolute inset-x-0 top-0 h-px bg-(--color-accent)"
                    />
                    <span className="ind-market-label flex items-center gap-4 text-[1.0625rem]">
                      <span
                        aria-hidden="true"
                        className="num font-display-sm text-[0.625rem] tracking-[0.14em] text-(--color-accent)"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href="/services" variant="outline" withArrow>
                View Our Capabilities
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={180} variant="fade">
          <div className="surface-dark relative isolate overflow-hidden p-6 sm:p-9">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(72%_80%_at_50%_50%,#182636_0%,#101b27_58%,#0c141d_100%)]"
            />

            <ReachDiagram activeMarket={activeMarket} />

            {/*
              The diagram's caption, and the accessible statement of what it
              draws. Six sectors in, one approach, the markets out - said in
              text so the SVG can be hidden outright.
            */}
            <p className="mt-7 max-w-[46ch] text-sm leading-relaxed text-(--color-foreground-subtle)">
              Six sectors, one approach to market communication, applied across Gulf markets and
              international investor audiences.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
