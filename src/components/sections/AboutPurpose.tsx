import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pick } from "@/content";
import { aboutPurposeAr, aboutPurposeCriteriaLabelAr } from "@/content/ar/about";
import {
  aboutPurpose as aboutPurposeEn,
  aboutPurposeCriteriaLabel as aboutPurposeCriteriaLabelEn,
} from "@/data/about";

/**
 * Purpose.
 *
 * The page's one dark interruption, and the point where the argument is made
 * rather than described. It replaces the shared `StatementBand` on this route
 * only - that component is still used elsewhere and is untouched.
 *
 * The four criteria beside the copy are lifted from the paragraph's own words:
 * a company is judged on how clearly it explains "strategy, risk and the path
 * to value", and on whether that explanation "holds steady over successive
 * reporting periods". They are set as a measured column with a hairline
 * between each, so they read as the terms of an assessment rather than as a
 * feature list - no icons, no ticks, nothing that would turn a criterion into
 * a claim.
 *
 * They reveal one after another as the section enters view, which is the only
 * motion in here.
 */
export async function AboutPurpose() {
  const aboutPurpose = await pick({ en: aboutPurposeEn, ar: aboutPurposeAr });
  const criteriaLabel = await pick({
    en: aboutPurposeCriteriaLabelEn,
    ar: aboutPurposeCriteriaLabelAr,
  });

  return (
    <Section
      spacing="lg"
      tone="dark"
      aria-labelledby="about-purpose"
      className="relative isolate overflow-hidden"
    >
      {/* Ground. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(88%_78%_at_22%_8%,#1b2a39_0%,#101b27_50%,#0c141d_100%)]"
      />
      {/* Architectural field, weighted to the side the criteria sit on. */}
      <div
        aria-hidden="true"
        className="about-grid absolute inset-0 -z-10 [--about-grid-gap:5.5rem] lg:[--about-grid-gap:7.5rem]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.42),transparent)]"
      />

      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-x-24">
        <div>
          <Reveal>
            <SectionLabel>{aboutPurpose.label}</SectionLabel>
            <Heading id="about-purpose" level={2} size="display" className="mt-5 max-w-[14ch]">
              {aboutPurpose.heading}
            </Heading>
          </Reveal>

          <Reveal delay={140} className="mt-9 flex flex-col gap-5">
            {aboutPurpose.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {/*
          The criteria. A measured column: index, rule, term. The top rule of
          each row is the divider from the one above it, so the set reads as
          one continuous measure rather than four separate items.
        */}
        <div className="lg:pt-2">
          <Reveal delay={200}>
            <p className="text-label uppercase text-(--color-foreground-subtle)">
              {criteriaLabel}
            </p>
          </Reveal>

          <ol className="mt-7 flex flex-col">
            {aboutPurpose.criteria.map((criterion, index) => (
              <li key={criterion}>
                <Reveal delay={280 + index * 110}>
                  <div className="about-criterion group border-t border-(--color-foreground)/12 py-5 sm:py-6">
                    <span className="about-criterion-term font-display text-[1.375rem] leading-snug sm:text-[1.5rem]">
                      {criterion}
                    </span>

                    {/*
                      A hairline that finishes the row out to the right edge and
                      lengthens as the row lights up. Decorative and flexible,
                      so it takes whatever width the term leaves.
                    */}
                    <span
                      aria-hidden="true"
                      className="about-criterion-rule ms-auto hidden h-px flex-1 bg-(--color-accent)/45 sm:block"
                    />
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
