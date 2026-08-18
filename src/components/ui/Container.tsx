import type { ComponentPropsWithRef, ElementType } from "react";

import { cn } from "@/lib/utils";

const widths = {
  /** Long-form reading column. */
  narrow: "max-w-[46rem]",
  /** Default page width. */
  default: "max-w-[78rem]",
  /** Editorial full-bleed grids. */
  wide: "max-w-[88rem]",
  full: "max-w-none",
} as const;

export type ContainerWidth = keyof typeof widths;

export interface ContainerProps extends ComponentPropsWithRef<"div"> {
  as?: ElementType;
  width?: ContainerWidth;
}

/**
 * The single place page width and horizontal gutters are decided.
 * Gutters step up with the viewport so mobile stays comfortable and desktop
 * keeps generous margins without the content drifting apart.
 */
export function Container({
  as: Component = "div",
  width = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12 xl:px-16", widths[width], className)}
      {...props}
    />
  );
}
