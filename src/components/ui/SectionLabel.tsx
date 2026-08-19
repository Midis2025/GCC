import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/utils";

export interface SectionLabelProps extends ComponentPropsWithRef<"p"> {
  /** Draws a short accent rule before the text. */
  withRule?: boolean;
}

/**
 * Small uppercase eyebrow used above section headings.
 * Wide tracking and small size carry the editorial register.
 */
export function SectionLabel({ withRule = true, className, children, ...props }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-label uppercase text-(--color-foreground-muted)",
        className,
      )}
      {...props}
    >
      {withRule && <span aria-hidden="true" className="h-px w-8 bg-(--color-accent)" />}
      <span>{children}</span>
    </p>
  );
}
