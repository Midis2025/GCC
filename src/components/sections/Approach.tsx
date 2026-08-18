import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { approachContent } from "@/data/homepage";

/**
 * Process section.
 *
 * Horizontal five-column progression on large screens, vertical timeline on
 * mobile. The connecting rule is drawn with a border on the list item rather
 * than an absolutely positioned element, so it cannot drift out of alignment
 * at intermediate widths.
 */
export function Approach() {
  return (
    <Section spacing="lg" aria-labelledby="approach-heading">
      <Reveal className="max-w-3xl">
        <SectionLabel>{approachContent.label}</SectionLabel>
        <Heading id="approach-heading" level={2} className="mt-7 max-w-[20ch]">
          {approachContent.heading}
        </Heading>
      </Reveal>

      <ol className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6">
        {approachContent.steps.map((step, index) => (
          <li key={step.number}>
            <Reveal delay={index * 80}>
              <div className="flex items-center gap-4 lg:block">
                <span className="font-serif text-[0.9375rem] text-(--color-accent)">
                  {step.number}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-(--color-border) lg:mt-5 lg:block lg:w-full"
                />
              </div>

              <h3 className="mt-5 text-h4 font-medium tracking-tight lg:mt-6">{step.title}</h3>
              <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-(--color-foreground-muted)">
                {step.description}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
