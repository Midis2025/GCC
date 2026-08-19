import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Fluid sizes come from the `--text-*` tokens in globals.css, so headings
 * scale with the viewport rather than stepping at each breakpoint.
 */
const sizes = {
  /** Reserved for the one statement per page that is allowed to dominate. */
  mega: "text-mega",
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
} as const;

export type HeadingSize = keyof typeof sizes;
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends ComponentPropsWithRef<"h2"> {
  /** Semantic level. Chosen for document outline, never for appearance. */
  level?: HeadingLevel;
  /** Visual size, decoupled from level so the outline stays correct. */
  size?: HeadingSize;
  /**
   * Typeface. Serif carries the major editorial headlines; sans is used for
   * smaller structural headings. Defaults by size.
   */
  font?: "serif" | "sans";
  /** Balanced wrapping - avoids orphan words in short headlines. */
  balance?: boolean;
}

export function Heading({
  level = 2,
  size,
  font,
  balance = true,
  className,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as const;

  const resolvedSize: HeadingSize =
    size ?? (level === 1 ? "h1" : level === 2 ? "h2" : level === 3 ? "h3" : "h4");

  const isMajor =
    resolvedSize === "mega" ||
    resolvedSize === "display" ||
    resolvedSize === "h1" ||
    resolvedSize === "h2";
  const resolvedFont = font ?? (isMajor ? "serif" : "sans");

  return (
    <Tag
      className={cn(
        sizes[resolvedSize],
        resolvedFont === "serif"
          ? "font-serif font-normal"
          : "font-sans font-medium tracking-tight",
        balance && "text-balance",
        className,
      )}
      {...props}
    />
  );
}
