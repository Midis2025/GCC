import Link from "next/link";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  /** Larger treatments for the footer. */
  size?: "sm" | "md" | "lg";
}

/**
 * Wordmark.
 *
 * TODO: replace the text node with the supplied logo asset (inline SVG
 * preferred so it inherits `currentColor` on dark sections). Keep the home
 * link wrapper and the accessible name.
 */
export function Logo({ className, size = "sm" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} - home`}
      className={cn(
        /*
          The wordmark is a three-letter acronym, so it gets more weight and
          wider tracking than any heading on the site. Tight tracking closes
          "GCC" into a single unreadable mass; the extra letter-spacing is what
          makes it read as a mark rather than as a word.
        */
        "inline-flex items-baseline gap-2 font-semibold tracking-[0.06em] text-(--color-foreground)",
        "transition-opacity duration-300 hover:opacity-70",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)",
        size === "sm" && "text-[1.1875rem]",
        size === "md" && "text-[1.5rem]",
        size === "lg" && "text-[2rem]",
        className,
      )}
    >
      <span>{siteConfig.name}</span>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-(--color-accent)" />
    </Link>
  );
}
