import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { openingQuestions } from "@/data/home-depth";

/**
 * ============================================================================
 * BEFORE COMMUNICATION COMES UNDERSTANDING
 * ============================================================================
 * The three questions an engagement opens with, set as three questions rather
 * than three claims. That framing is not a stylistic choice: a question commits
 * the firm to where the work starts and to nothing about where it ends, which
 * is simultaneously the honest position and the compliant one.
 *
 * The composition is a stepped column - each question indented further than
 * the one above it on `lg`, so the set descends across the section rather than
 * stacking flush. Three flush-left blocks would have been the fourth list on
 * the page; the stagger makes it read as a sequence being worked through.
 *
 * The questions are set at display scale and the supporting note beneath each
 * at body scale, so the question is what the eye takes and the note is what it
 * finds on returning. Numerals are oversized and quiet, behind rather than
 * beside.
 */
export function OpeningQuestions() {
  return (
    <Section
      spacing="lg"
      tone="dark"
      aria-labelledby="home-opening-questions"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(78%_70%_at_18%_8%,#1a2836_0%,#0f1924_52%,#0c141d_100%)]"
      />
      <div
        aria-hidden="true"
        className="about-grid absolute inset-0 -z-10 [--about-grid-gap:7rem]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.4),transparent)]"
      />

      <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-x-24">
        <Reveal>
          <SectionLabel>{openingQuestions.label}</SectionLabel>
          <Heading
            id="home-opening-questions"
            level={2}
            size="display"
            className="mt-5 max-w-[16ch]"
          >
            {openingQuestions.heading}
          </Heading>
        </Reveal>

        <Reveal delay={140}>
          <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
            {openingQuestions.intro}
          </p>
        </Reveal>
      </div>

      {/*
        The stepped column. Each question is inset further than the last from
        `lg` up, using a per-item custom property rather than three hard-coded
        classes - so adding a fourth question steps correctly without anyone
        having to remember to add a matching indent.
      */}
      <ol className="mt-[var(--space-heading)] flex flex-col">
        {openingQuestions.questions.map((entry, index) => (
          <li
            key={entry.number}
            style={{ "--step": index } as React.CSSProperties}
            className="border-t border-white/12 lg:[margin-left:calc(var(--step)*4rem)]"
          >
            <Reveal delay={index * 130}>
              <div className="relative overflow-hidden py-10 sm:py-12">
                {/*
                  Oversized numeral, clipped by its own row and sized in vw so
                  it stays proportional rather than dominating a narrow column.
                */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 right-0 -z-10 num font-display leading-none text-(--color-foreground)/[0.06] text-[clamp(5rem,12vw,10rem)]"
                >
                  {entry.number}
                </span>

                <div className="flex items-baseline gap-5 sm:gap-8">
                  <span
                    aria-hidden="true"
                    className="shrink-0 num font-display-sm text-[0.6875rem] tracking-[0.16em] text-(--color-accent)"
                  >
                    {entry.number}
                  </span>

                  <div className="min-w-0">
                    <h3 className="max-w-[26ch] font-display text-h3 leading-snug text-balance">
                      {entry.question}
                    </h3>
                    <p className="mt-5 max-w-[58ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                      {entry.note}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
