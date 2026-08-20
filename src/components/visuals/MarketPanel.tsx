import type { CSSProperties } from "react";

import { gulfMarkets, marketPanelContent } from "@/data/homepage";
import { cn } from "@/lib/utils";

/** Animation delay as an inline custom property, for the on-mount reveals. */
const at = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/**
 * Bronze at its bright (dark-surface) value. Written literally rather than as
 * `var(--color-accent)` because these are hairline strokes and washes at very
 * low alpha, where an opacity modifier on a token would compile to a
 * `color-mix()` per utility for no readability gain.
 */
const BRONZE = "184,148,95";

export interface MarketPanelProps {
  /** Milliseconds before the panel begins its reveal. */
  delay?: number;
  className?: string;
}

/**
 * Gulf market coverage panel.
 *
 * A floating glass plate over the hero photograph, built to read as an
 * institutional market-presence statement rather than as an information box:
 * an eyebrow, a display-set claim, then the six markets set as a typographic
 * grid with their principal financial centres beneath them.
 *
 * Three things keep it on the premium side of the line. The markets are set in
 * a 3x2 grid with hairline heads rather than a bulleted column, so the block
 * reads as a plate of type; the only colour is bronze, and only ever as a
 * hairline or a 3px indicator; and the whole thing carries the market-
 * orientation caption inline, so the list can never be read as an office
 * footprint.
 *
 * Motion is on mount, not on scroll - this sits above the fold, so it must
 * never wait on an IntersectionObserver. The plate fades up first, the markets
 * stagger in behind it, and the sequence stops. Hover moves nothing: the border
 * and the crown rule simply come up a step.
 */
export function MarketPanel({ delay = 900, className }: MarketPanelProps) {
  return (
    <aside
      aria-label="Gulf market coverage"
      data-visible="true"
      style={at(delay)}
      className={cn(
        "reveal group relative isolate overflow-hidden",
        // Sizing. Full width on mobile, a reduced plate on tablet, and the
        // floating 440-480px panel from `lg` up. The minimum height holds the
        // proportion on the rare wide-and-short viewport where the type sets
        // shorter than the plate should be.
        "w-full p-6 sm:p-7 md:max-w-[26rem] lg:w-[27.5rem] lg:max-w-none lg:shrink-0 lg:p-7 xl:w-[30rem]",
        "lg:min-h-[17.5rem]",
        // Glass. The gradient runs across the diagonal rather than straight
        // down, so the plate picks up a sense of a light source instead of
        // reading as a flat tinted rectangle.
        "border border-white/12 backdrop-blur-[14px]",
        "bg-[linear-gradient(152deg,rgba(21,32,44,0.76)_0%,rgba(12,19,28,0.63)_52%,rgba(9,15,22,0.74)_100%)]",
        "shadow-[0_36px_80px_-40px_rgba(0,0,0,0.85),0_2px_10px_-4px_rgba(0,0,0,0.5)]",
        "transition-colors duration-500 ease-[var(--ease-out-soft)] hover:border-white/25",
        className,
      )}
    >
      {/*
        Decoration planes. All negative-z so they sit above the plate's own
        background but behind the type; `isolate` on the aside keeps that
        negative stacking from escaping into the hero.
      */}

      {/* Crown rule - a single bronze hairline along the top edge. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-px opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: `linear-gradient(to right, transparent 0%, rgba(${BRONZE},0.55) 22%, rgba(${BRONZE},0.8) 52%, rgba(${BRONZE},0.1) 88%, transparent 100%)`,
        }}
      />

      {/* Inner top highlight, so the glass has an edge rather than a border. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-24 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.07),transparent)]"
      />

      {/* Network field - the outreach diagram's language, at a whisper. */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 480 300"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="gcc-panel-net" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0%" stopColor="#f4f1eb" stopOpacity="0.02" />
            <stop offset="50%" stopColor={`rgb(${BRONZE})`} stopOpacity="0.13" />
            <stop offset="100%" stopColor="#f4f1eb" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        <g stroke="url(#gcc-panel-net)" strokeWidth="1">
          <path d="M40 236 L134 268 L228 284 L318 262 L392 218 L452 152" />
          <path d="M258 76 L40 236" />
          <path d="M258 76 L228 284" />
          <path d="M258 76 L452 152" />
        </g>

        <g fill={`rgb(${BRONZE})`} fillOpacity="0.11">
          {[
            [40, 236],
            [134, 268],
            [228, 284],
            [318, 262],
            [392, 218],
            [452, 152],
            [258, 76],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" />
          ))}
        </g>
      </svg>

      {/* --- Content ------------------------------------------------------ */}

      <p
        className="reveal flex items-center gap-3 text-label uppercase text-(--color-accent)"
        data-visible="true"
        style={at(delay + 110)}
      >
        <span aria-hidden="true" className="h-px w-6 shrink-0 bg-(--color-accent)" />
        <span>{marketPanelContent.eyebrow}</span>
      </p>

      {/*
        The claim. Display-set and held to ~20 characters so it breaks into two
        balanced lines inside the plate - at full width it ran to a single long
        line on desktop and three ragged ones on mobile.
      */}
      <p
        className="reveal mt-3.5 max-w-[17rem] text-balance font-display text-[1.125rem] leading-[1.28] tracking-[-0.022em] text-(--color-foreground) lg:text-[1.1875rem]"
        data-visible="true"
        style={at(delay + 190)}
      >
        {marketPanelContent.statement}
      </p>

      {/*
        Markets. Three columns from `sm` up, two on the narrowest phones - a
        stacked column ran the plate past 400px tall and turned it back into a
        list. Each cell is headed by its own hairline rather than separated by
        one, which is what makes the block read as a set grid.
      */}
      <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3 sm:gap-x-6">
        {gulfMarkets.map((market, index) => (
          <li
            key={market.code}
            data-visible="true"
            style={at(delay + 300 + index * 70)}
            className="reveal border-t border-white/14 pt-2.5 transition-colors duration-300 ease-[var(--ease-out-soft)] hover:border-[rgba(184,148,95,0.5)]"
          >
            <span className="flex items-center gap-2">
              {/* Location indicator: a bronze point inside a faint halo. */}
              <span
                aria-hidden="true"
                className="size-[3px] shrink-0 rounded-full bg-(--color-accent)"
                style={{ boxShadow: `0 0 0 3px rgba(${BRONZE},0.14)` }}
              />
              <span className="text-[0.9375rem] leading-tight text-(--color-foreground)">
                {market.label}
              </span>
            </span>
            <span className="mt-1.5 block pl-[11px] text-[0.6875rem] uppercase leading-none tracking-[0.13em] text-(--color-foreground-subtle)">
              {market.city}
            </span>
          </li>
        ))}
      </ul>

      {/*
        CONTENT INTEGRITY: this caption is not decoration. The panel names six
        markets and six cities beside them, and without it the pairing reads as
        an office footprint. It ships with the markets or the markets do not
        ship.
      */}
      <p
        className="reveal mt-4 border-t border-white/10 pt-2.5 text-xs leading-relaxed text-(--color-foreground-subtle)"
        data-visible="true"
        style={at(delay + 760)}
      >
        {marketPanelContent.note}
      </p>
    </aside>
  );
}
