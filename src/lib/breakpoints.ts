/**
 * Breakpoints mirrored from the Tailwind theme in `src/app/globals.css`.
 *
 * Keep both in sync: Tailwind owns the CSS-side utilities, this module exists
 * so TypeScript (matchMedia, conditional rendering) can use the same values.
 */
export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/** `(min-width: 768px)` — for `window.matchMedia`. */
export function minWidthQuery(breakpoint: Breakpoint): string {
  return `(min-width: ${BREAKPOINTS[breakpoint]}px)`;
}

/** `(max-width: 767.98px)` — the exclusive counterpart of `minWidthQuery`. */
export function maxWidthQuery(breakpoint: Breakpoint): string {
  return `(max-width: ${BREAKPOINTS[breakpoint] - 0.02}px)`;
}
