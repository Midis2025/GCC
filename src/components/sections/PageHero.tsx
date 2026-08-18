import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

export interface PageHeroProps {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  /** Supporting paragraph. Kept to a controlled measure. */
  lead?: string;
  /** Buttons or links rendered under the lead. */
  actions?: ReactNode;
  /** Editorial index, e.g. "02", shown on service detail pages. */
  index?: string;
  className?: string;
}

/**
 * Shared interior-page hero.
 *
 * Dark surface, typography-led, and shorter than the homepage hero so interior
 * pages get to their content quickly. It pads for the fixed header itself,
 * which is why interior pages need no top spacing of their own.
 *
 * Renders the page's single H1.
 */
export function PageHero({ eyebrow, title, lead, actions, index, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "surface-dark relative isolate overflow-hidden",
        "pb-[clamp(3.5rem,7vw,6rem)] pt-[calc(var(--header-h)+clamp(3.5rem,9vw,7rem))]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(110%_130%_at_78%_0%,#1b2937_0%,#111c27_48%,#0c141d_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.35),transparent)]"
      />

      <Container>
        <div className="max-w-[52rem]">
          <p className="flex items-center gap-3 text-label font-medium uppercase text-(--color-accent)">
            {index && <span className="font-serif normal-case">{index}</span>}
            <span aria-hidden="true" className="h-px w-8 bg-(--color-accent)" />
            <span>{eyebrow}</span>
          </p>

          <Heading level={1} size="h1" className="mt-7 max-w-[19ch]">
            {title}
          </Heading>

          {lead && (
            <p className="mt-7 max-w-[56ch] text-lead text-(--color-foreground-muted)">{lead}</p>
          )}

          {actions && (
            <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4">
              {actions}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
