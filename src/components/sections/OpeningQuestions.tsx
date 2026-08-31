import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { openingQuestions } from "@/data/home-depth";
import { cn } from "@/lib/utils";

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
            className={cn(
              "border-t border-white/12 lg:[margin-left:calc(var(--step)*4rem)]",
              /* Last question: no bottom padding on top of the section's. */
              index === openingQuestions.questions.length - 1 &&
                "[&>div>div]:pb-0 sm:[&>div>div]:pb-0",
            )}
          >
            <Reveal delay={index * 130}>
              <div className="relative overflow-hidden py-10 sm:py-12">
                {/*
                  Oversized numeral, sized in vw so it stays proportional
                  rather than dominating a narrow column.

                  The offset is in `em` and not `rem`, which is the whole
                  reason the digits are no longer cut off at the top.

                  `leading-none` makes the line box 1em, but this font's
                  content area is 1.26em (ascent 1038 + descent 222 over 1000
                  upem). The half-leading is therefore -0.13em and the digits'
                  cap tops land 0.163em below the top of the span - a distance
                  that scales with the font size, which here is a clamp running
                  from 5rem to 10rem.

                  A fixed `-top-6` could not satisfy that. It cleared the edge
                  only while the numeral was above ~9.2rem, so the tops were
                  intact on a wide desktop and cut by 4px at 1024, 9px at 768
                  and 11px on a phone. `em` makes the offset track the size it
                  is compensating for: 0.05em leaves 0.113em of headroom at
                  every viewport, so this cannot regress at a breakpoint nobody
                  thought to check.

                  The row keeps `overflow-hidden`. The numeral is still cropped
                  at the right and bottom, which is what keeps it reading as a
                  ghost behind the row rather than a graphic on it.
                */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-[0.05em] end-0 -z-10 num font-display leading-none text-(--color-foreground)/[0.06] text-[clamp(5rem,12vw,10rem)]"
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
