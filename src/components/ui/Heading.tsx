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
   * Weight treatment. Defaults by size: the large sizes take the lighter
   * display setting, the small ones step up. Override only when a heading sits
   * somewhere its size does not predict, such as inside a dense card.
   */
  weight?: "display" | "strong";
  /** Balanced wrapping - avoids orphan words in short headlines. */
  balance?: boolean;
}

/**
 * The site runs on one typeface, so a heading is distinguished from body copy
 * by weight, size and tracking rather than by family. `mega` through `h2` take
 * `.font-display` (500); `h3` and `h4` take `.font-display-sm` (600), because
 * a medium weight stops reading as a heading once the size drops far enough.
 */
export function Heading({
  level = 2,
  size,
  weight,
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
  const resolvedWeight = weight ?? (isMajor ? "display" : "strong");

  return (
    <Tag
      className={cn(
        sizes[resolvedSize],
        resolvedWeight === "display" ? "font-display" : "font-display-sm",
        balance && "text-balance",
        className,
      )}
      {...props}
    />
  );
}
