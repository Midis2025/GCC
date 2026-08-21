"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { globePanelContent, heroLabelSlots, heroMarkets } from "@/data/outreach-globe";

import { cn } from "@/lib/utils";

/**
 * Above the fold, so the split matters more here than it does in the outreach
 * section: the headline, the paragraph and the CTAs are server-rendered and
 * animate on their own CSS timers, and none of them waits on this chunk. The
 * globe arrives when it arrives, into a box whose size is already reserved.
 */
const GlobeCanvas = dynamic(
  () => import("@/components/visuals/GlobeCanvas").then((module) => module.GlobeCanvas),
  { ssr: false, loading: () => null },
);

/** Dwell per market during the opening sequence, before the visitor scrolls. */
const TOUR_STEP_MS = 5200;
/** How long a hover or a keyboard focus outranks the scroll position. */
const HOLD_MS = 6000;

/** Matches the 1.25rem in the card's own "sit to my left" transform. */
const CARD_GAP = 20;
/** How much of the viewport the card must always keep clear of. */
const CARD_EDGE = 8;

/**
 * Keeps the pointer-anchored card inside the viewport.
 *
 * The card is placed to the LEFT of the pointer and centred on it, which on a
 * desktop hero lands it in the quiet band between the type and the disc. On a
 * phone there is no such band: the disc is centred in a 264px column, so a
 * 240px card hung off the left of a marker rendered at roughly x = -217 -
 * entirely off-screen, which is the one thing a label must never be.
 *
 * So the translate is clamped rather than the geometry redesigned. Nothing
 * changes on desktop, where the unclamped position is already inside the
 * bounds; on mobile the card slides along until it fits. When the viewport is
 * too narrow to hold it clear of the pointer at all, the lower bound wins and
 * the card sits against the left edge, overlapping the globe but readable.
 */
function clampCard(
  node: HTMLDivElement,
  layer: HTMLDivElement | null,
  x: number,
  y: number,
): { x: number; y: number } {
  const inner = node.firstElementChild as HTMLElement | null;
  if (!layer || !inner || inner.offsetWidth === 0) return { x, y };

  const box = layer.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const w = inner.offsetWidth;
  const h = inner.offsetHeight;

  // Bounds on the translate, derived from where the card itself then lands.
  const minX = CARD_EDGE - box.left + w + CARD_GAP;
  const maxX = vw - CARD_EDGE - box.left + CARD_GAP;
  const minY = CARD_EDGE - box.top + h / 2;
  const maxY = vh - CARD_EDGE - box.top - h / 2;

  return {
    x: maxX < minX ? minX : Math.min(Math.max(x, minX), maxX),
    y: maxY < minY ? minY : Math.min(Math.max(y, minY), maxY),
  };
}

type CardMode = "pointer" | "anchored";

/**
 * Hero globe.
 *
 * The same renderer as the outreach section, placed very differently: the disc
 * is pushed right and allowed to run past the edge of its frame, so it reads as
 * a globe the page is looking at rather than a graphic sitting in a box.
 *
 * What is active is decided by, in order of precedence:
 *
 *   hover / focus - pointing at a marker or tabbing to one wins for 6s.
 *   scroll        - once the visitor starts scrolling the hero away, the seven
 *                   markets step through in order.
 *   opening tour  - before any of that happens the sequence advances itself, so
 *                   a visitor who lands and reads the headline still sees the
 *                   story tell itself once.
 *
 * The canvas is decorative and `aria-hidden`. Everything it conveys is also in
 * the visually-hidden list at the end of this component, whose buttons drive
 * the same state from the keyboard - so the markers are reachable without a
 * pointer and the card is real text either way.
 */
export function HeroGlobe({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [card, setCard] = useState<{ index: number; mode: CardMode } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compact, setCompact] = useState(false);
  const [wide, setWide] = useState(false);

  const wrapper = useRef<HTMLDivElement>(null);
  const cardElement = useRef<HTMLDivElement>(null);
  /** Last pointer report, in canvas pixels, so the card can be re-clamped. */
  const lastPoint = useRef({ x: 0, y: 0 });
  const heldUntil = useRef(0);
  /** Cleared by the first scroll: the opening tour runs only once, if at all. */
  const touring = useRef(true);

  /* --- Environment ------------------------------------------------------ */
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 640px)");
    const large = window.matchMedia("(min-width: 1024px)");

    const sync = () => {
      setReducedMotion(motion.matches);
      setCompact(small.matches);
      setWide(large.matches);
    };

    sync();
    motion.addEventListener("change", sync);
    small.addEventListener("change", sync);
    large.addEventListener("change", sync);

    return () => {
      motion.removeEventListener("change", sync);
      small.removeEventListener("change", sync);
      large.removeEventListener("change", sync);
    };
  }, []);

  /* --- Opening tour ------------------------------------------------------ */
  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      if (!touring.current || performance.now() < heldUntil.current) return;
      if (document.hidden) return;

      setActiveIndex((current) => (current + 1) % heroMarkets.length);
    }, TOUR_STEP_MS);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  /* --- Scroll storytelling ---------------------------------------------- */
  useEffect(() => {
    let queued = false;

    const measure = () => {
      queued = false;

      const element = wrapper.current;
      if (!element) return;

      const hero = element.closest("section");
      const height = hero?.getBoundingClientRect().height ?? window.innerHeight;

      // Scrolling the hero away is the whole runway. Nothing has scrolled yet
      // means the opening tour still owns the sequence.
      const progress = window.scrollY / Math.max(1, height * 0.85);
      if (progress <= 0.02) return;

      touring.current = false;
      if (performance.now() < heldUntil.current) return;

      const index = Math.floor(progress * heroMarkets.length);
      setActiveIndex(Math.max(0, Math.min(heroMarkets.length - 1, index)));
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- Interaction ------------------------------------------------------ */
  const hold = () => {
    touring.current = false;
    heldUntil.current = performance.now() + HOLD_MS;
  };

  const handleHover = useCallback((index: number | null, x: number, y: number) => {
    if (index === null) {
      setCard((current) => (current?.mode === "pointer" ? null : current));
      return;
    }

    // Moved through the element rather than through state: chasing the pointer
    // with a React render would be the most expensive thing in the hero.
    lastPoint.current = { x, y };
    const node = cardElement.current;
    if (node) {
      const point = clampCard(node, wrapper.current, x, y);
      node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
    }

    hold();
    setActiveIndex(index);
    setCard({ index, mode: "pointer" });
  }, []);

  /*
    Re-clamp once the card is carrying the market it is about.

    The clamp above runs on the pointer report, which is one render before the
    new copy is in the box - so it measures the PREVIOUS market's height, and
    the descriptions differ by about 40px. Re-running it here, against the same
    pointer position and the settled size, is what keeps the bottom edge inside
    a short viewport.
  */
  useLayoutEffect(() => {
    if (card?.mode !== "pointer") return;
    const node = cardElement.current;
    if (!node) return;
    const point = clampCard(node, wrapper.current, lastPoint.current.x, lastPoint.current.y);
    node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
  }, [card]);

  const handleSelect = useCallback((index: number) => {
    hold();
    setActiveIndex(index);
    setCard({ index, mode: "pointer" });
  }, []);

  const handleFocusMarket = useCallback((index: number) => {
    hold();
    setActiveIndex(index);
    setCard({ index, mode: "anchored" });
  }, []);

  /* --- Measurement -------------------------------------------------------- */
  /**
   * The layer's own size, how far it hangs past the right of the viewport, and
   * where the type column ends. Everything positional below is derived from
   * this one measurement, so the globe, the leaders and the labels can never
   * disagree about the geometry they are placed against.
   */
  const [box, setBox] = useState({ width: 0, height: 0, overhang: 0, safeLeft: 0 });

  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;

    const measure = () => {
      const rect = element.getBoundingClientRect();
      const viewport = document.documentElement.clientWidth;

      /*
        Where the headline actually ends, measured rather than assumed.

        A fixed percentage was wrong: because the type scales on both axes, the
        headline finishes anywhere between 51% and 67% of the viewport
        depending on the window, so any constant either let labels land on the
        type at one size or pushed them needlessly right at another.

        The h1's own box is no use either - it is `max-w-[26ch]`, so its right
        edge is the measure rather than the words. Its lines carry `w-fit`
        precisely so that they can be measured here.
      */
      const lines = element.closest("section")?.querySelectorAll("h1 span.reveal");
      const textRight = lines?.length
        ? Math.max(...Array.from(lines, (line) => line.getBoundingClientRect().right))
        : 0;

      const safeLeft = Math.max(0, textRight + 32 - rect.left);

      setBox({
        width: rect.width,
        height: rect.height,
        overhang: Math.max(0, rect.right - viewport),
        safeLeft,
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();

    return () => observer.disconnect();
  }, []);

  /* --- Placement --------------------------------------------------------- */
  /*
    Expressed against a box that is now the whole section.

    The globe is approved and must not move, so this reproduces the geometry it
    had when the layer ran from 52% of the viewport to 8% past its right edge: a
    disc centred at 80% of the width, with a radius of half the smaller of that
    old 56%-wide box and the section height. Written out rather than reduced to
    constants precisely so the arithmetic stays checkable against what it
    replaced.

    Below `lg` the globe is a stacked block under the copy and is centred.
  */
  const frame = useMemo(() => {
    if (!wide) return { cx: 0.5, cy: 0.5, radius: compact ? 0.4 : 0.42 };

    const { width, height } = box;
    if (width === 0 || height === 0) return { cx: 0.8, cy: 0.46, radius: 0.28 };

    const radiusPx = 0.5 * Math.min(width * 0.56, height);

    return {
      cx: 0.8,
      // Lifted slightly so the disc's lower edge falls behind the standing bar
      // rather than being cut by it.
      cy: 0.46,
      radius: radiusPx / Math.min(width, height),
    };
  }, [wide, compact, box]);

  const shown = card ? heroMarkets[card.index] : null;

  /* --- Standing labels --------------------------------------------------- */
  /*
    Slot fractions resolved against the measured box, then clamped. The same
    values go to the canvas so the leaders it draws land exactly on the text
    rendered here.
  */
  const anchors = useMemo(() => {
    const { width, height, overhang, safeLeft } = box;
    if (!wide || width === 0) return undefined;

    // A label sits to the right of its anchor, so the anchor has to leave room
    // for the whole box inside the visible part of the layer, and must clear
    // the type column on the other side. Clamping here rather than tuning the
    // slots per breakpoint is what makes one arrangement survive 1024 through
    // 2560 without a table of exceptions.
    const labelWidth = width > 760 ? 168 : 148;
    const maxX = Math.max(safeLeft, width - overhang - labelWidth);
    const maxY = height - 70;

    return Object.fromEntries(
      heroMarkets.map((market) => {
        const slot = heroLabelSlots[market.code] ?? { x: 0.5, y: 0.5 };
        return [
          market.code,
          {
            x: Math.min(Math.max(width * slot.x, safeLeft), maxX),
            y: Math.min(Math.max(height * slot.y, 70), maxY),
          },
        ];
      }),
    );
  }, [box, wide]);

  return (
    <div
      ref={wrapper}
      className={cn(
        // Stacked below the copy on small screens; from `lg` it covers the
        // whole section.
        //
        // Full-bleed on purpose. The layer used to start at 52% of the
        // viewport, and the globe's atmosphere reaches about 1.3 radii - some
        // 107px further left than that at 1920 - so the glow was being cut off
        // dead straight at the element's edge. That cut was the vertical seam
        // that made the hero look like two sections bolted together. A canvas
        // the size of the section has no edge for it to hit, so the glow falls
        // off into the background the way light actually does.
        //
        // Where the disc sits is unchanged: `frame` below reproduces the old
        // geometry exactly against the new box, and dragging is gated to the
        // disc so the interactive area has not grown either.
        //
        // `-z-[3]` puts it above the scrims but below the container, which is
        // `z-10` - so it is behind every word of type.
        "relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-[23rem]",
        "lg:absolute lg:inset-0 lg:-z-[3] lg:aspect-auto lg:mx-0 lg:w-auto lg:max-w-none",
        className,
      )}
    >
      <GlobeCanvas
        activeIndex={activeIndex}
        onSelect={handleSelect}
        onHover={handleHover}
        reducedMotion={reducedMotion}
        compact={compact}
        frame={frame}
        variant="hero"
        labelAnchors={anchors}
        /*
          Below `lg` the standing labels are not rendered - there is nowhere to
          fan seven of them around a disc a third of the size - so the markets
          would otherwise be unnamed dots on a phone. This turns on the
          renderer's own on-globe label for the active market, the same one the
          outreach globe already uses, so the name travels with the marker and
          can be neither clipped by the viewport nor piled on top of another.
        */
        markerLabels={!wide}
        className="h-full w-full"
      />

      {/*
        Standing labels. The reference names every market on the globe at once,
        and that is the thing that makes it read as a map rather than as a
        decoration - so they are always on, not hover-only.

        Name and city only. The full description belongs to whichever market is
        active, and to the hover card; seven descriptions at once on a moving
        globe is the clutter the brief asks to avoid. `lg` and up only, because
        below that the disc is a third of the size and there is nowhere to fan
        seven labels to.
      */}
      {anchors &&
        heroMarkets.map((market, index) => {
          const anchor = anchors[market.code];
          const isActive = index === activeIndex;

          return (
            <div
              key={market.code}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute z-10 w-[8.5rem] transition-opacity duration-500 xl:w-[9.5rem]",
                // The ground behind a label is a rotating globe, so it is never
                // one colour: a marker sits over dark ocean one moment and the
                // lit Gulf the next. A soft shadow is what keeps 12px grey
                // legible over both without putting a plate behind every label.
                "[text-shadow:0_1px_14px_rgba(4,8,14,0.95)]",
                isActive ? "opacity-100" : "opacity-65",
              )}
              style={{
                left: anchor.x,
                top: anchor.y,
                transform: "translate(0.75rem, -50%)",
              }}
            >
              {/*
                Name and city set at the same size and weight, one above the
                other, then the description beneath in smaller grey - the
                reference's annotation style, and the reason it reads as a map
                legend rather than as a row of chips.
              */}
              <p
                className={cn(
                  "text-[0.9375rem] leading-snug transition-colors duration-500",
                  isActive ? "text-(--color-foreground)" : "text-(--color-foreground-muted)",
                )}
              >
                {market.label}
              </p>
              {!market.international && (
                <p
                  className={cn(
                    "text-[0.9375rem] leading-snug transition-colors duration-500",
                    isActive ? "text-(--color-accent)" : "text-(--color-foreground-muted)",
                  )}
                >
                  {market.city}
                </p>
              )}
              <p className="mt-2 text-[0.75rem] leading-snug text-(--color-foreground-subtle)">
                {market.description}
              </p>
            </div>
          );
        })}

      {/* --- Floating information card ------------------------------------ */}
      <div
        ref={cardElement}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-20",
          "transition-opacity duration-300 ease-[var(--ease-out-soft)]",
          shown ? "opacity-100" : "opacity-0",
          // Anchored mode is keyboard territory: the pointer transform is
          // meaningless there, so it is parked at a readable spot instead.
          card?.mode === "anchored" && "!translate-x-0 !translate-y-0",
        )}
        style={card?.mode === "anchored" ? { transform: "none", left: "8%", top: "16%" } : undefined}
      >
        <div
          className={cn(
            "relative w-[15rem] border border-white/14 p-5 backdrop-blur-[14px]",
            "bg-[linear-gradient(152deg,rgba(21,32,44,0.9)_0%,rgba(12,19,28,0.82)_52%,rgba(9,15,22,0.88)_100%)]",
            "shadow-[0_28px_60px_-32px_rgba(0,0,0,0.9)]",
            // Beside the marker rather than above it. The markers sit near the
            // centre of a disc that is already hard against the right edge, so
            // a card above one covers the globe and a card below one runs out
            // of hero; to its left is the quiet band between the type and the
            // disc, which is the only place it costs nothing.
            card?.mode === "pointer" && "-translate-x-[calc(100%+1.25rem)] -translate-y-1/2",
          )}
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(184,148,95,0.75)_45%,transparent)]"
          />

          <p className="font-display text-[1.0625rem] leading-tight tracking-[-0.02em] text-(--color-foreground)">
            {shown?.label ?? ""}
          </p>
          <p className="mt-1.5 text-[0.6875rem] uppercase leading-none tracking-[0.13em] text-(--color-accent)">
            {shown?.city ?? ""}
          </p>

          <p className="mt-3.5 text-[0.8125rem] leading-relaxed text-(--color-foreground-muted)">
            {shown?.description ?? ""}
          </p>

          <p className="mt-4 text-label uppercase text-(--color-foreground-subtle)">
            {globePanelContent.focusLabel}
          </p>
          <ul className="mt-2 flex flex-col gap-1">
            {(shown?.focus ?? []).map((item) => (
              <li key={item} className="flex items-center gap-2 text-[0.75rem]">
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

      {/*
        The keyboard and screen-reader route to the globe. Visually hidden
        rather than absent: the markers themselves cannot take focus - they are
        painted pixels - so this is what makes them reachable, and it carries
        the full text of every market whether or not the canvas ever loads.
      */}
      <div className="sr-only">
        <h2>Gulf market coverage</h2>
        <ul>
          {heroMarkets.map((market, index) => (
            <li key={market.code}>
              <button
                type="button"
                aria-pressed={index === activeIndex}
                onFocus={() => handleFocusMarket(index)}
                onClick={() => handleFocusMarket(index)}
              >
                {market.label}
                {market.city ? `, ${market.city}` : ""}. {market.description}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
