import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { roadshowPhases } from "@/data/services-depth";

/**
 * ============================================================================
 * BEFORE, DURING AND AFTER
 * ============================================================================
 * The three phases of a roadshow as a horizontal journey on a single rule.
 *
 * The rule runs behind the three columns with a station at each, the same
 * construction the five-stage Approach uses - which is deliberate. Both are
 * sequences of work over time, and the site should say that the same way
 * twice rather than inventing a second grammar for the same idea.
 *
 * What differs is the weight: three phases at this scale carry a summary and a
 * list each, where Approach carries a line. The station is the shared part,
 * not the whole treatment.
 *
 * Below `sm` the rule turns into a vertical spine, because a horizontal rule
 * across a stacked column is a line pointing nowhere.
 *
 * COMPLIANCE: every item is work performed or a document delivered. Nothing
 * here is an outcome - see the header of `data/services-depth.ts`.
 */
export function PhaseJourney() {
  return (
    <Section spacing="lg" tone="muted" aria-labelledby="roadshow-phases">
      <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-x-24">
        <Reveal>
          <SectionLabel>{roadshowPhases.label}</SectionLabel>
          <Heading id="roadshow-phases" level={2} size="display" className="mt-5 max-w-[13ch]">
            {roadshowPhases.heading}
          </Heading>
        </Reveal>

        <Reveal delay={140}>
          <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
            {roadshowPhases.intro}
          </p>
        </Reveal>
      </div>

      <ol className="relative mt-[var(--space-heading)] grid gap-x-12 gap-y-12 sm:grid-cols-3">
        {/*
          The connecting rule. Vertical spine below `sm`, horizontal above it,
          sitting behind the stations at the marker's own centreline. One
          element per breakpoint rather than a segment per column, so it cannot
          fall out of alignment at an intermediate width.
        */}
        <span
          aria-hidden="true"
          className="absolute start-[0.4375rem] top-2 bottom-2 w-px bg-(--color-border) sm:hidden"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-[0.4375rem] hidden h-px bg-(--color-border) sm:block"
        />

        {roadshowPhases.phases.map((phase, index) => (
          <li key={phase.key} className="relative ps-8 sm:ps-0">
            {/*
              Station marker for the vertical spine. A DIRECT child of the
              <li>, never inside <Reveal>: the reveal applies a transform, and
              a transformed element becomes the containing block for its
              absolutely positioned descendants - which would anchor this dot
              to the padded content box instead of the list item.
            */}
            <span
              aria-hidden="true"
              className="absolute start-0 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-(--color-surface-muted) sm:hidden"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
            </span>

            <Reveal delay={index * 130}>
              <span
                aria-hidden="true"
                className="hidden h-3.5 w-3.5 items-center justify-center rounded-full bg-(--color-surface-muted) sm:flex"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
              </span>

              <p className="num font-display leading-none text-(--color-accent)/25 text-[clamp(2.5rem,4vw,3.5rem)] sm:mt-6">
                {phase.number}
              </p>

              <h3 className="mt-5 text-h4 font-medium tracking-tight">{phase.term}</h3>

              <p className="mt-3.5 max-w-[38ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                {phase.summary}
              </p>

              <ul className="mt-7 flex flex-col gap-3 border-t border-(--color-border) pt-6">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3.5 text-[0.9375rem] leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-3.5 shrink-0 bg-(--color-accent)"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
