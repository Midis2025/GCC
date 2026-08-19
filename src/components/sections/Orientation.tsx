import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { orientationContent } from "@/data/homepage";

/**
 * Orientation strip.
 *
 * Sits immediately under the hero and does the job a credibility bar normally
 * does - except that no track record has been supplied, so it states how the
 * practice is organised rather than what it has achieved. Every figure is a
 * count of something named elsewhere on the site; see the integrity note on
 * `orientationContent`.
 *
 * Visually it is the page's first hard cut: an asymmetric band on the dark
 * surface, oversized numerals against a hairline grid, with no cards.
 * Because it follows a full-bleed photographic hero and precedes a light
 * editorial section, it also carries the dark-to-light transition.
 */
export function Orientation() {
  return (
    <section className="surface-dark relative isolate" aria-labelledby="orientation-heading">
      <Container>
        <div className="grid gap-x-16 gap-y-9 border-b border-(--color-border) py-[var(--space-section-md)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)]">
          <Reveal variant="mask">
            <Heading id="orientation-heading" level={2} size="h2" className="max-w-[13ch]">
              {orientationContent.statement}
            </Heading>
            <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
              {orientationContent.supporting}
            </p>
          </Reveal>

          {/*
            A real <dl>: each figure is the term its label defines. Numerals
            are aria-hidden and the readable label carries the meaning, so a
            screen reader gets "Connected capabilities - investor relations,
            outreach..." rather than a bare "04".
          */}
          <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-3">
            {orientationContent.facts.map((fact, index) => (
              <Reveal key={fact.label} delay={140 + index * 110} className="flex flex-col">
                <dt className="order-2 mt-5 text-[0.9375rem] font-medium text-(--color-foreground)">
                  {fact.label}
                </dt>

                <span
                  aria-hidden="true"
                  className="order-1 block border-t border-(--color-accent)/40 pt-5 num text-numeral leading-none text-(--color-accent)"
                >
                  {fact.figure}
                </span>

                <dd className="order-3 mt-2.5 text-sm leading-relaxed text-(--color-foreground-muted)">
                  {fact.description}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
