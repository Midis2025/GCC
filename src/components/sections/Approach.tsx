import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pick } from "@/content";
import { approachContentAr } from "@/content/ar/homepage";
import { approachContent as approachContentEn } from "@/data/homepage";

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
 *
 * The ground is a prop because the section is used on two pages that seat it
 * differently. On the homepage it follows the dark capability showcase and
 * muted is the right lift. On What We Do it follows the commercial model,
 * which is already muted, and two muted bands in succession read as one long
 * section with a heading dropped into the middle of it.
 */
export async function Approach({ tone = "muted" }: { tone?: "muted" | "canvas" } = {}) {
  const approachContent = await pick({ en: approachContentEn, ar: approachContentAr });

  return (
    <Section spacing="lg" tone={tone} aria-labelledby="approach-heading">
      <div className="grid gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-x-20">
        <Reveal>
          <SectionLabel>{approachContent.label}</SectionLabel>
          <Heading id="approach-heading" level={2} size="display" className="mt-5 max-w-[16ch]">
            {approachContent.heading}
          </Heading>
        </Reveal>

        <Reveal delay={120}>
          <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-3">
            {approachContent.intro}
          </p>
        </Reveal>
      </div>

      <ol className="relative mt-[var(--space-heading)] grid gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-7">
        {/*
          The connecting rule. Vertical spine below `lg`, horizontal above it,
          sitting behind the stations at the numeral's own centreline.
        */}
        <span
          aria-hidden="true"
          className="absolute start-[0.4375rem] top-2 bottom-2 w-px bg-(--color-border) sm:hidden"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-[0.4375rem] hidden h-px bg-(--color-border) lg:block"
        >
          {/*
            The bronze fill. Advances across the rule as the section passes
            through the viewport, on a scroll-progress timeline in CSS - so it
            is genuine scroll progression with no listener, no observer and no
            client component. See `.approach-progress` in globals.css, which
            also carries the fallback for browsers without `view()` and the
            reduced-motion case.
          */}
          <span className="approach-progress absolute inset-0 block origin-left bg-(--color-accent)" />
        </span>

        {approachContent.steps.map((step, index) => (
          <li key={step.number} className="approach-stage group relative ps-8 sm:ps-0">
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
              className="absolute start-0 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-(--color-surface-muted) sm:hidden"
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

              {/*
                The numeral is set at display scale now rather than at the old
                `text-numeral`. Five stages set at body-adjacent size read as a
                caption row; at this size each stage has its own mass and the
                row becomes a measure with five stations on it.
              */}
              <p className="approach-num num font-display leading-none text-(--color-accent)/25 text-[clamp(3rem,5vw,4.5rem)] sm:mt-5">
                {step.number}
              </p>

              <h3 className="mt-5 text-h4 font-medium tracking-tight transition-colors duration-500">
                {step.title}
              </h3>
              <p className="mt-3.5 max-w-[38ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted) transition-colors duration-500">
                {step.description}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
