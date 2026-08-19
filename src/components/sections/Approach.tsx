import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { approachContent } from "@/data/homepage";

/**
 * Process timeline.
 *
 * A single continuous rule with five stations on it - horizontal on large
 * screens, a vertical spine on small ones. The rule is one element per
 * breakpoint drawn behind the row, and each station punches a gap in it with a
 * matching background rather than the rule being segmented per item, so the
 * line can never fall out of alignment at intermediate widths.
 *
 * Distinct from every other section on the page by construction: no cards, no
 * photography, no borders around content - just numerals sitting on a line.
 */
export function Approach() {
  return (
    <Section spacing="lg" tone="muted" aria-labelledby="approach-heading">
      <div className="grid gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-x-20">
        <Reveal>
          <SectionLabel>{approachContent.label}</SectionLabel>
          <Heading id="approach-heading" level={2} size="display" className="mt-7 max-w-[16ch]">
            {approachContent.heading}
          </Heading>
        </Reveal>

        <Reveal delay={120}>
          <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-3">
            Five stages, run in sequence and then revisited. The last one is what keeps a programme
            from hardening into a script.
          </p>
        </Reveal>
      </div>

      <ol className="relative mt-[calc(var(--space-section-sm)+1rem)] grid gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-7">
        {/*
          The connecting rule. Vertical spine below `lg`, horizontal above it,
          sitting behind the stations at the numeral's own centreline.
        */}
        <span
          aria-hidden="true"
          className="absolute left-[0.4375rem] top-2 bottom-2 w-px bg-(--color-border) sm:hidden"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-[0.4375rem] hidden h-px bg-(--color-border) lg:block"
        />

        {approachContent.steps.map((step, index) => (
          <li key={step.number} className="relative pl-8 sm:pl-0">
            {/*
              Station marker for the vertical spine. A DIRECT child of the <li>,
              never inside <Reveal>: the reveal animation applies a transform,
              and a transformed element becomes the containing block for its
              absolutely positioned descendants - which would anchor this dot to
              the padded content box instead of the list item, dropping it on
              top of the numeral.
            */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-(--color-surface-muted) sm:hidden"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
            </span>

            <Reveal delay={index * 90}>
              {/*
                From `sm` up the marker sits in normal flow above the numeral,
                so it needs no containing block at all - and it stays present in
                the two-column range between `sm` and `lg`, where neither spine
                is drawn.
              */}
              <span
                aria-hidden="true"
                className="hidden h-3.5 w-3.5 items-center justify-center rounded-full bg-(--color-surface-muted) sm:flex"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
              </span>

              <p className="font-serif text-numeral leading-none text-(--color-accent)/25 sm:mt-7">
                {step.number}
              </p>

              <h3 className="mt-4 text-h4 font-medium tracking-tight">{step.title}</h3>
              <p className="mt-3 max-w-[38ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                {step.description}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
