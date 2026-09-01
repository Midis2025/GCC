import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pick } from "@/content";
import { aboutCommunicationAr, aboutPrinciplesContentAr } from "@/content/ar/about";
import {
  aboutCommunication as aboutCommunicationEn,
  aboutPrinciplesContent as aboutPrinciplesContentEn,
} from "@/data/about";

/**
 * Core principles.
 *
 * A 2x2 editorial grid built from typography, spacing and hairlines - no
 * cards, no radius, no shadow. Each cell is a bronze index, a term, a
 * description and a rule that grows on hover; the grid lines are the cells'
 * own top borders, so what separates them is the same hairline that opens
 * them.
 *
 * The four are `aboutCommunication.principles`, unchanged. They previously sat
 * as a bordered list under a photograph in the approach section; the approach
 * copy and its diagram now have a section of their own, which is what left
 * these free to be set at a size they can carry.
 *
 * Hover is restrained on purpose and pointer-only: the rule lengthens, the
 * index shifts a few pixels and a very soft gradient lifts behind the cell.
 * Nothing moves position, nothing scales, and on touch none of it applies -
 * see `.about-principle` in globals.css.
 */
export async function AboutPrinciples() {
  const aboutCommunication = await pick({ en: aboutCommunicationEn, ar: aboutCommunicationAr });
  const content = await pick({ en: aboutPrinciplesContentEn, ar: aboutPrinciplesContentAr });

  return (
    <Section spacing="lg" tone="muted" aria-labelledby="about-principles">
      {/*
        Heading only, no supporting paragraph.

        A line under it was drafted and cut: it came out as a near-copy of the
        one introducing the differentiation section on the homepage, and four
        principles that each carry their own sentence do not need a fifth
        sentence explaining that there are four of them.
      */}
      <Reveal>
        <SectionLabel>{content.label}</SectionLabel>
        <Heading id="about-principles" level={2} size="display" className="mt-5 max-w-[13ch]">
          {content.heading}
        </Heading>
      </Reveal>

      <dl className="mt-[var(--space-heading)] grid gap-x-14 gap-y-0 sm:grid-cols-2 lg:gap-x-20">
        {aboutCommunication.principles.map((principle, index) => (
          <Reveal key={principle.term} delay={index * 90} className="h-full">
            <div className="about-principle group relative isolate h-full border-t border-(--color-border) pt-8 pb-10 sm:pt-9 sm:pb-12">
              {/* Soft lift on hover. Sits behind everything in the cell. */}
              <span aria-hidden="true" className="about-principle-wash absolute -inset-x-5 -inset-y-2 -z-10" />

              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="about-principle-index num font-display-sm text-[0.6875rem] tracking-[0.14em] text-(--color-accent)"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="about-principle-rule block h-px w-10 bg-(--color-accent)"
                />
              </div>

              <dt className="mt-6 text-h4 font-medium tracking-tight">{principle.term}</dt>
              <dd className="mt-3.5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                {principle.description}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
