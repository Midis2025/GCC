import Link from "next/link";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  /** Larger treatments for the footer. */
  size?: "sm" | "md" | "lg";
}

/**
 * Logo height per placement.
 *
 * Fluid rather than stepped, for the same reason the page gutter is: the header
 * is 4.5rem tall on a phone and 5.5rem from `lg`, and a mark that jumps between
 * two fixed sizes sits at a visibly different proportion of the bar either side
 * of the breakpoint. These clamps track the bar instead, so the lockup holds
 * roughly 44% of the header height at every width.
 *
 * Only the height is set. The SVG carries its own `viewBox`, so the width
 * follows from the artwork's 289.19 x 73.53 ratio and can never be squashed.
 */
const sizes = {
  /** Header. ~28px on a 320 phone, ~38px on a large desktop. */
  sm: "h-[clamp(1.75rem,1.4rem+1.1vw,2.375rem)]",
  md: "h-[clamp(2.25rem,1.85rem+1.5vw,3rem)]",
  /** Footer identity band. */
  lg: "h-[clamp(2.5rem,2rem+2.2vw,3.75rem)]",
} as const;

/**
 * The supplied logo, inlined.
 *
 * Inline rather than an <img> pointing at `/images/logo.svg` - which is still
 * the source asset - for two reasons, both of which an external reference gets
 * wrong:
 *
 * 1. COLOUR. The artwork is white and bronze, i.e. drawn for a dark ground. The
 *    header is transparent over the hero and then settles onto ivory on scroll,
 *    so a fixed white lockup disappears the moment the visitor scrolls. Inlined,
 *    the white parts become `currentColor` and the bronze becomes
 *    `--color-accent`, both of which the surface tokens already re-point per
 *    section - so the mark inverts on the dark hero and footer and reads as
 *    graphite-and-deep-bronze on the light header, with no variant prop.
 *
 * 2. TYPE. The wordmark is live text set in Plus Jakarta Sans Bold, which is
 *    the site's own family. An <img> renders in an isolated document that
 *    cannot see the page's webfont, so it would fall back to whatever the
 *    visitor has installed and the authored letter positions would be wrong.
 *    Inlined, it uses the very font the page already loads.
 *
 * Geometry is untouched: the paths, the viewBox, the type size and the per-pair
 * kerning offsets are exactly as supplied.
 */
function LogoLockup({ className }: { className?: string }) {
  return (
    <svg
      // Intrinsic size as well as a viewBox, so the box is reserved at its
      // correct ratio before any CSS applies and the header cannot shift.
      width="289.19"
      height="73.53"
      viewBox="0 0 289.19 73.53"
      xmlns="http://www.w3.org/2000/svg"
      // The link that wraps this carries the accessible name.
      aria-hidden="true"
      focusable="false"
      className={cn("block w-auto", className)}
    >
      <g fill="var(--color-accent)">
        <path d="M72.75,26.16h-5.53c-.66-1.82-1.48-3.56-2.45-5.21-5.54-9.41-15.83-15.75-27.59-15.75-17.6,0-31.92,14.21-31.92,31.68,0,14.14,9.38,26.14,22.3,30.2,1.69.53,3.45.93,5.25,1.18v5.25c-1.79-.21-3.54-.54-5.25-1C11.68,68.3,0,53.94,0,36.88,0,16.51,16.64,0,37.17,0c14.78,0,27.55,8.56,33.54,20.96.81,1.67,1.49,3.41,2.04,5.21Z" />
        <path d="M72.75,36.98v.19c0,1.68-.11,3.33-.33,4.94-2.15,15.82-14.48,28.41-30.17,30.96-1.67.27-3.39.43-5.13.46v-5.13c1.75-.04,3.47-.23,5.13-.55,12.83-2.45,22.91-12.78,24.98-25.74h-5.21c-1.95,10.13-9.77,18.19-19.77,20.5-1.66.38-3.37.61-5.13.65v-26.29h5.13v20.32c7.16-2.09,12.74-7.9,14.51-15.19h-9.79v-5.13h25.78Z" />
      </g>

      <path
        fill="currentColor"
        d="M61.56,26.16h-5.89c-1.15-1.96-2.61-3.71-4.31-5.21-3.78-3.32-8.75-5.34-14.19-5.34-11.82,0-21.43,9.54-21.43,21.27,0,8.29,4.81,15.49,11.8,18.99,1.64.82,3.4,1.44,5.25,1.82v5.3c-1.82-.3-3.57-.78-5.25-1.42-9.97-3.84-17.05-13.46-17.05-24.69,0-14.6,11.97-26.47,26.68-26.47,8.69,0,16.43,4.15,21.3,10.55,1.22,1.6,2.26,3.35,3.09,5.21Z"
      />

      {/*
        The two wordmark lines. `font-size` and the tspan offsets are in user
        units, so they scale with the viewBox exactly as the artwork does.
      */}
      <g
        fontFamily="var(--font-sans), 'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="26.07"
        fontWeight="700"
      >
        <text fill="var(--color-accent)" transform="translate(83.85 32.28)">
          <tspan x="0" y="0">
            GULF CONNECT
          </tspan>
        </text>

        <text fill="currentColor" transform="translate(83.85 61.14)">
          <tspan x="0" y="0">
            CONSU
          </tspan>
          <tspan x="97.95" y="0" letterSpacing="-.06em">
            L
          </tspan>
          <tspan x="110.54" y="0" letterSpacing="-.05em">
            T
          </tspan>
          <tspan x="123.36" y="0" letterSpacing="0em">
            AN
          </tspan>
          <tspan x="161.24" y="0" letterSpacing="-.01em">
            C
          </tspan>
          <tspan x="181.15" y="0" letterSpacing="0em">
            Y
          </tspan>
        </text>
      </g>
    </svg>
  );
}

/**
 * Home link carrying the logo.
 *
 * `shrink-0` matters in the header: the bar is a flex row and at 320px the
 * lockup, the menu button and their gap are close enough to the available width
 * that without it the artwork would be the thing that gives.
 */
export function Logo({ className, size = "sm" }: LogoProps) {
  return (
    <Link
      href="/"
      /*
        Named for what the artwork says, not for the short site name. The mark
        used to read "GCC"; it now spells the wordmark out, and an accessible
        name of "GCC" against a logo a sighted visitor reads as "Gulf Connect
        Consultancy" is exactly the mismatch WCAG's Label in Name is about.
      */
      aria-label={`${siteConfig.wordmark} - home`}
      className={cn(
        "inline-flex shrink-0 items-center text-(--color-foreground)",
        "transition-opacity duration-300 hover:opacity-70",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)",
        className,
      )}
    >
      <LogoLockup className={sizes[size]} />
    </Link>
  );
}
