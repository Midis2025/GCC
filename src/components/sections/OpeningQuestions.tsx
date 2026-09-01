import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pick } from "@/content";
import { openingQuestionsAr } from "@/content/ar/home-depth";
import { openingQuestions as openingQuestionsEn } from "@/data/home-depth";
import { cn } from "@/lib/utils";

/**
 * ONE GRID, used by the header and by every question row.
 *
 * This is the whole of the layout fix. The header and the rows previously had
 * unrelated templates - a 1fr/1fr header and a stacked row - so the intro
 * paragraph, the questions and the supporting notes each began at a different
 * horizontal position and nothing lined up down the section.
 *
 * Declared once and applied to both, so the heading and every question share a
 * left edge, the intro and every note share a left edge, and there is no way
 * for the two halves of the section to drift apart in a later edit.
 *
 * Even columns. The split was 1fr/0.9fr, sized to a narrower content cap; with
 * the cap widened the copy column can carry its own weight, and two equal
 * columns are what make the row read as a pair rather than as a wide thing
 * beside a narrow one.
 *
 * The gutter is fluid rather than stepped - one `clamp` across the whole
 * range instead of a breakpoint ladder. It resolves to about 51px at 1024,
 * 64px at 1280, 72px at 1440, 80px at 1600 and 96px at 1920, so the space
 * between the columns grows with the room available to it and never sits at a
 * desktop value on a tablet.
 *
 * Both halves of the section apply this, which is what keeps the heading and
 * the questions on one left edge and the intro and the notes on another.
 */
const GRID =
  "grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-[clamp(2rem,5vw,7rem)]";

/**
 * ============================================================================
 * BEFORE COMMUNICATION COMES UNDERSTANDING
 * ============================================================================
 * The three questions an engagement opens with, set as three questions rather
 * than three claims. That framing is not a stylistic choice: a question commits
 * the firm to where the work starts and to nothing about where it ends, which
 * is simultaneously the honest position and the compliant one.
 *
 * ---------------------------------------------------------------------------
 * THE STAIRCASE IS GONE, AND IT TOOK AN RTL BUG WITH IT
 * ---------------------------------------------------------------------------
 * Each row used to be inset further than the one above it, on a per-item
 * custom property. Two things were wrong with it.
 *
 * The visible one: the rule sits on the TOP of each <li>, so indenting the
 * item indented its rule too. Measured at 1440, the three dividers began at
 * 72px, 136px and 200px and all ended at the container edge - three lines
 * starting at three arbitrary positions and running to a common one, which
 * reads as a mistake rather than as a stagger.
 *
 * The invisible one: it was `margin-left`, a physical property. In Arabic the
 * rows are laid out from the right, so the indent stepped in from the wrong
 * side - it trimmed the far end of each divider and moved no content at all.
 * Every question started at the same place in the Arabic edition regardless of
 * its position in the set.
 *
 * What made this read as a sequence was never the indent. It is the rules
 * between the rows and the questions themselves, and both are untouched.
 *
 * ---------------------------------------------------------------------------
 * WHY THE ROWS ARE TWO COLUMNS NOW
 * ---------------------------------------------------------------------------
 * The question was set at display scale with its note stacked beneath it, both
 * left-aligned inside a row running the full width of the section. That left
 * the right half of all three rows empty while the divider above them spanned
 * the lot, which is where the section's stretched, hollow feeling came from.
 *
 * Question left, note right, first baselines aligned. The pairing is now
 * structural rather than something the reader infers from proximity.
 */
export async function OpeningQuestions() {
  const openingQuestions = await pick({ en: openingQuestionsEn, ar: openingQuestionsAr });

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

      {/*
        The inner content container.

        THE SECTION ITSELF IS ALREADY FULL-BLEED and always was: `Section`
        paints its background on the <section> element, which is a block at
        100% of the viewport, and the two gradient layers above are
        `absolute inset-0` on it. Measured at 1920, 1728, 1600, 1440, 1366,
        1280, 1024, 834, 768, 430, 412, 390, 375, 360 and 320: the dark ground
        starts at x=0 and ends at the viewport edge at every one of them. There
        is nothing to widen here - only the CONTENT was too tightly held.

        This is the readable column inside that full-bleed ground. Horizontal
        padding comes from `Container`'s `--gutter` one level up, so this
        section starts on the same vertical as the sections above and below it;
        the cap is the only thing set here.

        103rem is 1648px, up from 92rem / 1472px. The old value left 224px of
        dead canvas down each side of a 1920 display - 96px of gutter plus
        128px of cap - which is the space that made the section look boxed in.
        It is now 136px, and below about 1740px the gutter is the binding
        constraint and the cap does nothing at all.
      */}
      <div className="mx-auto w-full max-w-[103rem]">
        {/*
          `items-end` sets the intro's last line on the heading's baseline
          rather than floating it against the top of a much taller block.
        */}
        <div className={cn(GRID, "gap-y-8 lg:items-end")}>
          <Reveal>
            <SectionLabel>{openingQuestions.label}</SectionLabel>
            {/*
              21ch, not 16ch.

              At 16ch `text-wrap: balance` had nowhere to go and broke the
              headline over FOUR lines - "Before / Communication / Comes /
              Understanding" - which is what made the left column tall enough to
              strand the paragraph beside it. 21ch is the measure at which
              balance settles on the two lines the headline is written as.

              The type size is untouched. This is the width it wraps inside.
            */}
            <Heading
              id="home-opening-questions"
              level={2}
              size="display"
              className="mt-5 max-w-[21ch]"
            >
              {openingQuestions.heading}
            </Heading>
          </Reveal>

          <Reveal delay={140}>
            {/*
              64ch, up from 52ch, and it is a ceiling rather than a width.

              The column is now half the content area - about 610px at 1440 and
              775px at 1920 - and a paragraph capped at 52ch stopped 200px short
              of the end of it on a large display, which is the empty gap this
              section kept being criticised for. 64ch is roughly 710px: it fills
              the column on the widest displays, is inert below about 1500px
              where the column is the narrower constraint, and stays inside the
              measure that keeps a line readable.
            */}
            <p className="max-w-[64ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
              {openingQuestions.intro}
            </p>
          </Reveal>
        </div>

        <ol className="mt-[var(--space-heading)] flex flex-col">
          {openingQuestions.questions.map((entry, index) => (
            <li
              key={entry.question}
              className={cn(
                "border-t border-white/12",
                /* Last question: no bottom padding on top of the section's. */
                index === openingQuestions.questions.length - 1 && "[&>div]:pb-0",
              )}
            >
              <Reveal delay={index * 130}>
                <div className={cn(GRID, "gap-y-4 py-9 sm:py-11 lg:items-baseline")}>
                  {/*
                    26ch, unchanged.

                    It is the measure at which the two long questions break
                    where they read best - after "need" and after "actually" -
                    and the short one still fits on a single line. Tightening it
                    to 24ch to match the column split off a two-word second line
                    on "What evidence supports the narrative?", which is the
                    kind of wrap that has no reason behind it.
                  */}
                  <h3 className="max-w-[26ch] font-display text-h3 leading-snug text-balance">
                    {entry.question}
                  </h3>
                  {/*
                    Unchanged in size and colour - this is a ceiling, not a
                    width, and it only engages on the widest displays.

                    68ch is about 745px. Below roughly 1600px the column is
                    narrower than that and holds the paragraph instead; above
                    it, the note fills the column rather than leaving a gap
                    between itself and the edge of the row. 68ch is at the top
                    of the comfortable measure for type this size but still
                    inside it, and no line here is long enough to reach it on a
                    laptop.
                  */}
                  <p className="max-w-[68ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {entry.note}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
