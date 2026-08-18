import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { introContent } from "@/data/homepage";

/**
 * Positioning statement.
 *
 * Split layout: the statement holds the left column, supporting copy and the
 * principles list sit right. Collapses to a single column below `lg`, with the
 * principles becoming a two-up grid on tablet so the section does not run long.
 */
export function Intro() {
  return (
    <Section spacing="lg" aria-labelledby="intro-heading">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
        <Reveal>
          <SectionLabel>{introContent.label}</SectionLabel>
          <Heading id="intro-heading" level={2} className="mt-7 max-w-[16ch]">
            {introContent.heading}
          </Heading>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col gap-6">
            {introContent.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lead text-(--color-foreground-muted)">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {introContent.principles.map((principle) => (
              <li key={principle.title} className="border-t border-(--color-border) pt-5">
                <h3 className="text-[0.9375rem] font-medium text-(--color-foreground)">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-(--color-foreground-muted)">
                  {principle.description}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
