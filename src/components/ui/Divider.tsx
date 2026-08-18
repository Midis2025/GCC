import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/utils";

export interface DividerProps extends ComponentPropsWithRef<"hr"> {
  /** Accent-coloured rather than the default hairline. */
  accent?: boolean;
}

/** Hairline rule. Presentational, so it is hidden from assistive tech. */
export function Divider({ accent = false, className, ...props }: DividerProps) {
  return (
    <hr
      aria-hidden="true"
      className={cn(
        "h-px w-full border-0",
        accent ? "bg-(--color-accent)" : "bg-(--color-border)",
        className,
      )}
      {...props}
    />
  );
}
