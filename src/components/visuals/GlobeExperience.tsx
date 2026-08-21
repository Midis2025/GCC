"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { GlobeMarket } from "@/data/outreach-globe";
import { globeMarkets, globePanelContent } from "@/data/outreach-globe";
import { outreachContent } from "@/data/homepage";
import { GLOW_REACH, glowBox } from "@/lib/globe";
import { cn } from "@/lib/utils";

/**
 * The canvas is the only genuinely heavy part of this feature, so it is the
 * only part that is code-split. Everything else - the panel copy, the market
 * rail, the caption - is real server-rendered text that is present before any
 * of this JavaScript arrives, which is what keeps the section legible to
 * crawlers and to anyone the canvas never loads for.
 *
 * `ssr: false` because the renderer measures its own element and reads
 * `devicePixelRatio` on mount; there is nothing meaningful to prerender.
 */
const GlobeCanvas = dynamic(
  () => import("@/components/visuals/GlobeCanvas").then((module) => module.GlobeCanvas),
  {
    ssr: false,
    loading: () => <GlobePlaceholder />,
  },
);

/** How long a deliberate selection outranks the scroll position. */
const SELECTION_HOLD_MS = 7000;

interface Tooltip {
  market: GlobeMarket | null;
  visible: boolean;
}

/**
 * Investor outreach globe.
 *
 * Owns which market is active and how that gets decided, which is the only
 * genuinely subtle part of the feature. Three inputs compete for it:
 *
 *   scroll     - the section's own progress through the viewport steps through
 *                the seven markets in order, so simply reading the page tells
 *                the story without anyone having to touch anything.
 *   selection  - clicking a node or a rail item wins outright for 7s, so a
 *                deliberate choice is never yanked away by a stray scroll.
 *   hover      - previews a market in the tooltip without changing the active
 *                one, so exploring the globe does not lose your place.
 *
 * The globe is decorative and `aria-hidden`; the rail beneath it drives the
 * same state from the keyboard, and the panel is a live region, so a change of
 * market is announced rather than silently redrawn.
 */
export function GlobeExperience({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tooltip, setTooltip] = useState<Tooltip>({ market: null, visible: false });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compact, setCompact] = useState(false);
  const [panelFloats, setPanelFloats] = useState(false);

  const wrapper = useRef<HTMLDivElement>(null);
  const tooltipElement = useRef<HTMLDivElement>(null);
  const heldUntil = useRef(0);

  /* --- Environment ------------------------------------------------------ */
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 640px)");
    // Mirrors Tailwind's `lg`, which is where the panel starts floating over
    // the globe rather than sitting beneath it.
    const wide = window.matchMedia("(min-width: 1024px)");

    const sync = () => {
      setReducedMotion(motion.matches);
      setCompact(small.matches);
      setPanelFloats(wide.matches);
    };

    sync();
    motion.addEventListener("change", sync);
    small.addEventListener("change", sync);
    wide.addEventListener("change", sync);

    return () => {
      motion.removeEventListener("change", sync);
      small.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
    };
  }, []);

  /* --- Scroll storytelling ---------------------------------------------- */
  useEffect(() => {
    let queued = false;

    const measure = () => {
      queued = false;

      if (performance.now() < heldUntil.current) return;

      const element = wrapper.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const travel = rect.height + window.innerHeight;
      if (travel <= 0) return;

      // 0 as the top edge enters the viewport, 1 as the bottom edge leaves it.
      const progress = (window.innerHeight - rect.top) / travel;

      // The approach and the departure are dead time; the markets step through
      // the middle stretch, where the section is actually being looked at.
      const staged = (progress - 0.22) / 0.56;
      const index = Math.floor(staged * globeMarkets.length);

      setActiveIndex(Math.max(0, Math.min(globeMarkets.length - 1, index)));
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* --- Interaction ------------------------------------------------------ */
  const select = useCallback((index: number) => {
    heldUntil.current = performance.now() + SELECTION_HOLD_MS;
    setActiveIndex(index);
  }, []);

  const handleHover = useCallback((index: number | null, x: number, y: number) => {
    if (index === null) {
      // Keeps the copy in place through the fade-out - blanking it first would
      // collapse the box before it had finished disappearing.
      setTooltip((current) => ({ ...current, visible: false }));
      return;
    }

    // Positioned through the element rather than through React state: a render
    // per pointer move, only to translate a 200px box, would be the most
    // expensive thing on the page.
    const node = tooltipElement.current;
    if (node) node.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    setTooltip({ market: globeMarkets[index], visible: true });
  }, []);

  const market = globeMarkets[activeIndex];

  /*
    Where the disc sits in the STAGE - the square box the layout reserves for
    it. Pushed right and up once the panel starts floating over the lower-left,
    so the Gulf never ends up behind the thing describing it.

    These three numbers are the approved placement and are unchanged. What
    changes is that they are no longer handed straight to the canvas: the disc
    carries a glow that reaches 1.32 radii, which at this placement overruns
    the stage by 13% on the right and 14% at the top, and the canvas was
    cutting it off dead straight at those edges. `glowBox` turns the placement
    into the canvas it actually needs and restates the disc against it, so the
    globe keeps exactly this size and position and the light gets somewhere to
    fade out.
  */
  const { inset, frame } = useMemo(
    () =>
      glowBox({
        cx: panelFloats ? 0.55 : 0.5,
        cy: panelFloats ? 0.44 : 0.5,
        radius: compact ? 0.38 : 0.44,
      }),
    [panelFloats, compact],
  );

  return (
    <div ref={wrapper} className={cn("relative", className)}>
      {/* --- Stage: the globe, with the panel floating over it on desktop --- */}
      <div className="relative">
        <div className="relative mx-auto aspect-square w-full max-w-[21rem] sm:max-w-[26rem] md:max-w-[30rem] lg:max-w-none">
          {/*
            The canvas is the glow's box, so it sits slightly proud of the
            stage on the sides the light overruns. The stage itself is
            untouched, which is what keeps the section height, the panel and
            the rail exactly where they were.

            The tooltip lives in here rather than on the stage because
            `onHover` reports the pointer in CANVAS pixels: anchored to the
            stage it would now be out by the inset.
          */}
          <div className="absolute" style={inset}>
            <GlobeCanvas
              activeIndex={activeIndex}
              onSelect={select}
              onHover={handleHover}
              reducedMotion={reducedMotion}
              compact={compact}
              frame={frame}
              className="h-full w-full"
            />

            {/* Pointer-anchored tooltip. Hidden rather than unmounted, so the
                transform written above survives between hovers. */}
            <div
              ref={tooltipElement}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-0 top-0 z-20 transition-opacity duration-200",
                tooltip.visible ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="-translate-x-1/2 -translate-y-[calc(100%+1.25rem)] whitespace-nowrap border border-white/15 bg-[rgba(9,15,22,0.9)] px-3 py-2 backdrop-blur-md">
                <p className="text-[0.6875rem] uppercase leading-none tracking-[0.14em] text-(--color-accent)">
                  {tooltip.market?.label ?? ""}
                </p>
                <p className="mt-1.5 text-[0.8125rem] leading-none text-(--color-foreground)">
                  {tooltip.market?.city ?? ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*
          Information panel. Floats over the lower-left of the globe on desktop
          and hangs slightly into the column gutter, which is what stops it
          reading as a box parked inside the graphic. Below `lg` it sits under
          the globe instead - at 21rem across, overlapping would cover the very
          thing it describes.
        */}
        {/*
          Deliberately NOT an aria-live region. Scrolling the page steps through
          seven markets on its own, and announcing each one would talk over
          someone who is simply reading past the section. The rail below is the
          control, its buttons report their own pressed state, and this panel is
          the next thing in the reading order after them.
        */}
        <div
          className={cn(
            "relative z-10 mt-6 border border-white/12 p-6 backdrop-blur-[14px] sm:p-7",
            "bg-[linear-gradient(152deg,rgba(21,32,44,0.84)_0%,rgba(12,19,28,0.74)_52%,rgba(9,15,22,0.82)_100%)]",
            "shadow-[0_32px_70px_-38px_rgba(0,0,0,0.85)]",
            "lg:absolute lg:bottom-1 lg:-left-6 lg:mt-0 lg:w-[17.5rem] lg:p-6",
          )}
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(184,148,95,0.7)_45%,transparent)]"
          />

          <p className="flex items-center gap-3 text-label uppercase text-(--color-accent)">
            <span aria-hidden="true" className="h-px w-5 shrink-0 bg-(--color-accent)" />
            {globePanelContent.eyebrow}
          </p>

          {/* Keyed so each market change replays the fade rather than swapping
              the text in place. */}
          <div key={market.code} className="reveal" data-visible="true" data-variant="fade">
            <p className="mt-3.5 font-display text-[1.1875rem] leading-tight tracking-[-0.022em] text-(--color-foreground)">
              {market.label}
            </p>
            <p className="mt-1.5 text-[0.6875rem] uppercase leading-none tracking-[0.13em] text-(--color-foreground-subtle)">
              {market.city}
            </p>

            <p className="mt-4 text-[0.875rem] leading-relaxed text-(--color-foreground-muted)">
              {market.description}
            </p>

            <p className="mt-5 text-label uppercase text-(--color-foreground-subtle)">
              {globePanelContent.focusLabel}
            </p>
            <ul className="mt-2.5 flex flex-col gap-1.5">
              {market.focus.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[0.8125rem]">
                  <span
                    aria-hidden="true"
                    className="size-[3px] shrink-0 rounded-full bg-(--color-accent)"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/*
        Market rail. The keyboard and screen-reader route to everything the
        globe does, and the progress indicator for the scroll sequence at the
        same time. Plain toggle buttons rather than an ARIA tablist: there is no
        tab panel here, and a half-implemented tablist is worse than none.
      */}
      <div
        role="group"
        aria-label="Gulf markets"
        className="mt-7 flex flex-wrap gap-x-1 gap-y-0.5 lg:mt-9"
      >
        {globeMarkets.map((entry, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={entry.code}
              type="button"
              aria-pressed={isActive}
              onClick={() => select(index)}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 text-[0.6875rem] uppercase tracking-[0.13em]",
                "transition-colors duration-300 ease-[var(--ease-out-soft)]",
                isActive
                  ? "text-(--color-accent)"
                  : "text-(--color-foreground-subtle) hover:text-(--color-foreground)",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-px transition-all duration-500 ease-[var(--ease-out-soft)]",
                  isActive ? "w-5 bg-(--color-accent)" : "w-2 bg-white/25",
                )}
              />
              {entry.label}
            </button>
          );
        })}
      </div>

      {/*
        CONTENT INTEGRITY: a globe with nodes and connection arcs on it is a
        stronger implied claim than the schematic it replaced, so this caption
        matters more here, not less. It states that the geometry is market
        orientation and nothing else.
      */}
      <p className="mt-6 max-w-[48ch] text-sm leading-relaxed text-(--color-foreground-subtle)">
        {outreachContent.disclaimer}
      </p>
    </div>
  );
}

/** Holds the globe's space and its silhouette while the chunk arrives. */
function GlobePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
      {/*
        Sized against the canvas box rather than the stage. That box is the
        glow's bounding square, so the disc inside it is always `1 / GLOW_REACH`
        of it across - derived rather than eyeballed, so the silhouette cannot
        drift out of step with the globe that replaces it.
      */}
      <div
        className="aspect-square rounded-full bg-[radial-gradient(circle_at_32%_28%,#1b2937,#101b25_55%,#0a1017)] opacity-70"
        style={{ width: `${100 / GLOW_REACH}%` }}
      />
    </div>
  );
}
