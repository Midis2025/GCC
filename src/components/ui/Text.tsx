import type { ComponentPropsWithRef, ElementType } from "react";

import { cn } from "@/lib/utils";

const sizes = {
  lead: "text-lead",
  base: "text-base",
  sm: "text-sm",
  xs: "text-xs",
} as const;

const tones = {
  default: "text-(--color-foreground)",
  muted: "text-(--color-foreground-muted)",
} as const;

export interface TextProps extends ComponentPropsWithRef<"p"> {
  as?: ElementType;
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  /** Caps line length for comfortable reading. */
  balance?: boolean;
}

export function Text({
  as: Component = "p",
  size = "base",
  tone = "default",
  balance = false,
  className,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(sizes[size], tones[tone], "leading-relaxed", balance && "text-pretty", className)}
      {...props}
    />
  );
}
