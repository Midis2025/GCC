import type { ComponentPropsWithRef, ElementType } from "react";

import { cn } from "@/lib/utils";

const widths = {
  /**
   * Long-form reading column. The one place a hard measure is correct: an
   * article body set across 1700px is unreadable no matter how wide the
   * display is.
   */
  narrow: "max-w-[var(--page-max-narrow)]",
  /** Default. Uncapped below ~2000px - see --page-max in globals.css. */
  default: "max-w-[var(--page-max)]",
  /** Editorial grids, which take a little more before they stop growing. */
  wide: "max-w-[var(--page-max-wide)]",
  full: "max-w-none",
} as const;

export type ContainerWidth = keyof typeof widths;

export interface ContainerProps extends ComponentPropsWithRef<"div"> {
  as?: ElementType;
  width?: ContainerWidth;
}

/**
 * The single place page width and horizontal gutters are decided.
 *
 * A section paints its own background edge to edge; this only insets the
 * CONTENT inside it. The padding is one fluid token (`--gutter`) rather than a
 * ladder of breakpoint utilities, which is what lets a section bleed a
 * photograph back out to the edge with `calc(var(--gutter) * -1)` and stay in
 * step at every width.
 */
export function Container({
  as: Component = "div",
  width = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full px-(--gutter)", widths[width], className)}
      {...props}
    />
  );
}
