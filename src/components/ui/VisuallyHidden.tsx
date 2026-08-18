import type { ComponentPropsWithRef, ElementType } from "react";

import { cn } from "@/lib/utils";

export interface VisuallyHiddenProps extends ComponentPropsWithRef<"span"> {
  as?: ElementType;
}

/** Hides content visually while keeping it available to screen readers. */
export function VisuallyHidden({
  as: Component = "span",
  className,
  ...props
}: VisuallyHiddenProps) {
  return <Component className={cn("sr-only", className)} {...props} />;
}
