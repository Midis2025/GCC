"use client";

import { useEffect, useRef } from "react";

export interface CountUpProps {
  /** Final value. Integers only - these are counts, not measurements. */
  value: number;
  /**
   * Zero-pad the result to this many digits, so "4" renders as "04" and the
   * figure keeps the editorial two-digit form the design uses throughout.
   */
  padTo?: number;
  /** Milliseconds before counting starts, to match a sibling reveal's stagger. */
  delay?: number;
  duration?: number;
  className?: string;
}

/** Ease-out cubic. Fast at the start, settling rather than stopping dead. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const format = (value: number, padTo: number) => String(value).padStart(padTo, "0");

/**
 * Counts a figure up when it first scrolls into view.
 *
 * The value is rendered at its FINAL state on the server, so without
 * JavaScript - or before hydration - the correct figure is what appears. The
 * count is enhancement, never the source of truth.
 *
 * The animation writes to `textContent` directly rather than through state.
 * Driving it with setState would re-render the component on every frame for a
 * value React has no other reason to know about, and would mean calling
 * setState synchronously from an effect to reset the figure to zero. Writing
 * to the node is the same approach `Reveal` takes for its fail-open path, and
 * it keeps the whole animation off React's render path.
 *
 * Resetting to zero on mount is safe because the enclosing `<Reveal>` holds
 * the element at `opacity: 0` until it scrolls into view, so the reset is
 * never painted.
 *
 * Timing is driven by requestAnimationFrame against a timestamp rather than by
 * a per-frame increment, so the duration holds regardless of frame rate, and
 * the loop cancels on unmount. `prefers-reduced-motion` skips the animation
 * entirely and leaves the final value untouched.
 *
 * ACCESSIBILITY: the animating text is rendered as-is, so the caller must
 * ensure the figure is either `aria-hidden` or paired with accessible text. On
 * the orientation strip the numeral is already hidden and the term and
 * description carry the meaning - a screen reader gets "Gulf markets - UAE,
 * Saudi Arabia..." rather than a number ticking up from zero.
 */
export function CountUp({
  value,
  padTo = 2,
  delay = 0,
  duration = 1100,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") return;

    element.textContent = format(0, padTo);

    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let start: number | undefined;

    const step = (now: number) => {
      start ??= now;
      const progress = Math.min((now - start) / duration, 1);

      element.textContent = format(Math.round(easeOut(progress) * value), padTo);

      if (progress < 1) frame = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        observer.disconnect();
        timer = setTimeout(() => {
          frame = window.requestAnimationFrame(step);
        }, delay);
      },
      // Matches the Reveal observer, so the figure counts as its block arrives.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
      if (frame) window.cancelAnimationFrame(frame);
      // Restore the final value, so a remount never leaves a partial count.
      element.textContent = format(value, padTo);
    };
  }, [value, padTo, delay, duration]);

  return (
    <span ref={ref} className={className}>
      {format(value, padTo)}
    </span>
  );
}
