import Link from "next/link";

import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { serviceLines } from "@/data/what-we-do";

/**
 * The other three service lines, at the foot of a service page.
 *
 * Not the same thing as `ServiceNav`, which is the scroll-spy rail on the old
 * services index and is bound to the capability list. This is a plain
 * cross-link block: four lines exist, you have read one, here are the rest.
 *
 * It exists because the brief removed the services dropdown. With no hover
 * menu, a reader who lands on a service page from search or a link has no way
 * back to the architecture except the nav item that returns them to the
 * overview - so each page carries its siblings.
 *
 * Design: the indexed row already used on the overview page and the homepage
 * capability list. No new pattern.
 */
export function OtherServiceLines({ currentSlug }: { currentSlug: string }) {
  const others = serviceLines.filter((line) => line.slug !== currentSlug);

  return (
    <Section spacing="lg" tone="muted" aria-labelledby="other-service-lines">
      <Reveal>
        <SectionLabel>Also</SectionLabel>
        <Heading
          id="other-service-lines"
          level={2}
          size="h2"
          className="mt-5 max-w-[16ch]"
        >
          The Other Three Lines
        </Heading>
      </Reveal>

      <ul className="mt-[var(--space-heading)] border-t border-(--color-border)">
        {others.map((line, index) => (
          <li key={line.slug} className="border-b border-(--color-border)">
            <Reveal delay={index * 80}>
              <Link
                href={line.href}
                className="group flex flex-col gap-2 py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="num font-display-sm text-[0.8125rem] text-(--color-accent)"
                >
                  {line.number}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.375rem] leading-snug transition-colors duration-500 group-hover:text-(--color-accent)">
                    {line.title}
                  </span>
                  <span className="mt-1.5 block max-w-[52ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {line.strapline}
                  </span>
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
