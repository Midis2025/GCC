import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { audienceContent, whyContent } from "@/data/homepage";

/**
 * Differentiation pillars, followed by the client-segment categories.
 *
 * No figures appear anywhere in this section by design - no investor counts,
 * transaction values or years of experience, since none have been supplied and
 * none would be verifiable.
 */
export function WhyGCC() {
  return (
    <Section spacing="lg" tone="muted" aria-labelledby="why-heading">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <SectionLabel>{whyContent.label}</SectionLabel>
          <Heading id="why-heading" level={2} className="mt-7 max-w-[14ch]">
            {whyContent.heading}
          </Heading>
        </Reveal>

        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {whyContent.pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 80}>
              <div className="border-t border-(--color-foreground)/15 pt-6">
                <h3 className="text-h4 font-medium tracking-tight">{pillar.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-[var(--space-section-sm)]">
        <div className="border-t border-(--color-foreground)/15 pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <SectionLabel>{audienceContent.label}</SectionLabel>
            {/* Marked as indicative until GCC confirms its actual segments. */}
            <p className="text-sm text-(--color-foreground-subtle)">{audienceContent.note}</p>
          </div>

          <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {audienceContent.segments.map((segment) => (
              <li
                key={segment}
                className="border-b border-(--color-foreground)/12 pb-4 font-serif text-[1.125rem]"
              >
                {segment}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
