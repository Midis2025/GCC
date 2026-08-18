import type { ReactNode } from "react";

import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

export interface ProseSectionProps {
  id: string;
  label?: string;
  heading: string;
  paragraphs?: readonly string[];
  /** Rendered after the paragraphs, inside the right column. */
  children?: ReactNode;
  tone?: "canvas" | "muted" | "dark";
  spacing?: "sm" | "md" | "lg";
  /** Single column, centred measure - used for shorter statements. */
  narrow?: boolean;
  className?: string;
}

/**
 * Split heading/body section used across the interior pages.
 *
 * Two columns on large screens (statement left, copy right), one column below.
 * Keeping this in one component is what stops the interior pages drifting into
 * slightly different spacing and measures per page.
 */
export function ProseSection({
  id,
  label,
  heading,
  paragraphs,
  children,
  tone = "canvas",
  spacing = "lg",
  narrow = false,
  className,
}: ProseSectionProps) {
  return (
    <Section spacing={spacing} tone={tone} aria-labelledby={id} className={className}>
      <div
        className={cn(
          narrow
            ? "max-w-[46rem]"
            : "grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20",
        )}
      >
        <Reveal>
          {label && <SectionLabel>{label}</SectionLabel>}
          <Heading id={id} level={2} className={cn(label && "mt-7", "max-w-[18ch]")}>
            {heading}
          </Heading>
        </Reveal>

        <Reveal delay={120}>
          {paragraphs && paragraphs.length > 0 && (
            <div className="flex flex-col gap-5">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          {children}
        </Reveal>
      </div>
    </Section>
  );
}
