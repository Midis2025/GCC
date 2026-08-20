"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
    const node = cardElement.current;
    if (node) node.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    hold();
    setActiveIndex(index);
    setCard({ index, mode: "pointer" });
  }, []);

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

  /* --- Placement --------------------------------------------------------- */
  /*
    Desktop pushes the disc right and lets it run past the frame, so it bleeds
    off the edge of the page rather than sitting centred in a column. Below
    `lg` the globe is a stacked block under the copy and is simply centred.
  */
  const frame = useMemo(
    () => ({
      cx: wide ? 0.54 : 0.5,
      cy: wide ? 0.5 : 0.5,
      // On desktop the disc fills its layer edge to edge; because the layer
      // itself runs past the top and right of the section, that is what makes
      // the globe bleed off the page.
      radius: compact ? 0.4 : wide ? 0.52 : 0.42,
    }),
    [wide, compact],
  );

  const shown = card ? heroMarkets[card.index] : null;

  /* --- Standing labels --------------------------------------------------- */
  /*
    Anchors are the slot fractions resolved against the measured box, and the
    same values go to the canvas so the leaders it draws land exactly on the
    text rendered here. Recomputed only on resize: the label end of a leader is
    fixed, and it is the marker end that moves with the globe.
  */
  const [box, setBox] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox({ width, height });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const anchors = useMemo(() => {
    const { width, height } = box;
    if (!wide || width === 0) return undefined;

    return Object.fromEntries(
      heroMarkets.map((market) => {
        const slot = heroLabelSlots[market.code] ?? { x: 0.6, y: 0.5 };
        return [market.code, { x: width * slot.x, y: height * slot.y }];
      }),
    );
  }, [box, wide]);

  return (
    <div
      ref={wrapper}
      className={cn(
        // Stacked below the copy on small screens; from `lg` a layer that runs
        // off the top and the right of the section, so the disc is bigger than
        // the frame that holds it. That oversize is the whole effect - a globe
        // fully inside its box reads as an illustration of a globe.
        //
        // It reaches back to 38%, which does put the limb behind the end of the
        // headline. That is deliberate and matches the reference: the limb is
        // near-black under the hero lighting, so the type sits on it with more
        // contrast than it has over the photograph alone.
        //
        // `-z-[3]` puts it above the scrims and the drawn field but below the
        // container, which is `z-10` - so it is behind every word of type.
        "relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-[23rem]",
        "lg:absolute lg:left-[38%] lg:right-[-12%] lg:top-[-12%] lg:bottom-[-4%] lg:-z-[3] lg:aspect-auto lg:mx-0 lg:w-auto lg:max-w-none",
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
                "pointer-events-none absolute z-10 w-[9.5rem] transition-opacity duration-500",
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
