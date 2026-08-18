import Link from "next/link";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  /** Larger treatment for the footer. */
  size?: "sm" | "md";
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
        "inline-flex items-baseline gap-2 font-serif tracking-tight text-(--color-foreground)",
        "transition-opacity duration-300 hover:opacity-70",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)",
        size === "sm" ? "text-[1.375rem]" : "text-[1.75rem]",
        className,
      )}
    >
      <span>{siteConfig.name}</span>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-(--color-accent)" />
    </Link>
  );
}
