import type { ReactNode } from "react";

import { Heading, type HeadingLevel } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: string;
  /** Must match the `aria-labelledby` on the parent <Section>. */
  id?: string;
  /** Small label above the title. */
  eyebrow?: string;
  description?: string;
  level?: HeadingLevel;
  align?: "left" | "center";
  /** Actions rendered alongside the header on wider viewports. */
  actions?: ReactNode;
  className?: string;
}

/** Eyebrow + title + description block shared by every content section. */
export function SectionHeader({
  title,
  id,
  eyebrow,
  description,
  level = 2,
  align = "left",
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className,
      )}
    >
      <div className={cn("flex max-w-2xl flex-col gap-3", align === "center" && "items-center")}>
        {eyebrow && (
          <p className="text-sm font-medium tracking-wide text-(--color-foreground-muted) uppercase">
            {eyebrow}
          </p>
        )}
        <Heading id={id} level={level}>
          {title}
        </Heading>
        {description && (
          <Text size="lead" tone="muted" balance>
            {description}
          </Text>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
