import type { ComponentPropsWithRef, ElementType } from "react";

import { Container, type ContainerWidth } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/** Section rhythm comes from spacing tokens, not per-section margins. */
const spacing = {
  none: "",
  sm: "py-[var(--space-section-sm)]",
  md: "py-[var(--space-section-md)]",
  lg: "py-[var(--space-section-lg)]",
} as const;

const tones = {
  canvas: "",
  muted: "surface-muted",
  dark: "surface-dark",
} as const;

export interface SectionProps extends ComponentPropsWithRef<"section"> {
  /** Use "div" when nested inside another landmark. */
  as?: ElementType;
  spacing?: keyof typeof spacing;
  width?: ContainerWidth;
  /** Re-points the semantic colour tokens for this section and its children. */
  tone?: keyof typeof tones;
  /** Set false to lay out children yourself (full-bleed media). */
  contained?: boolean;
}

/**
 * Vertical rhythm, width and surface tone for every page section.
 *
 * Pass `aria-labelledby` referencing the section heading id so the landmark
 * has an accessible name.
 */
export function Section({
  as: Component = "section",
  spacing: spacingKey = "md",
  width = "default",
  tone = "canvas",
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component className={cn(spacing[spacingKey], tones[tone], className)} {...props}>
      {contained ? <Container width={width}>{children}</Container> : children}
    </Component>
  );
}
