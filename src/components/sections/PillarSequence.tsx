"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Photo } from "@/data/imagery";
import { cn } from "@/lib/utils";

/**
 * Line marks.
 *
 * Drawn rather than illustrated: constructions in a single stroke weight, each
 * one a diagram of what its pillar says. They carry no label and are hidden
 * from assistive tech - the heading beside each is already the content, and a
 * mark that needed describing would be a mark that failed.
 *
 * Deliberately NOT icons in the product sense. No rounded container, no fill,
 * no glyph borrowed from an icon set; at 28px on a dark ground they read as
 * technical drawing, which is the register the rest of the page is in.
 *
 * Keyed by name rather than indexed by position. Indexing tied each drawing to
 * a slot in one particular list, so reordering that list silently handed a
 * pillar the wrong picture and a list of a different length ran off the end.
 */
const PILLAR_MARKS = {
  /* A dome on a horizon. Regional, architectural. */
  region: (
    <>
      <path d="M2 20.5h24" />
      <path d="M7 20.5a7 7 0 0 1 14 0" />
      <path d="M14 6.5v2" />
    </>
  ),
  /* Strands resolving into one node - separate parties brought together. */
  convene: (
    <>
      <path d="M2.5 7.5h6c3.2 0 4.4 3 7.5 5.4" />
      <path d="M2.5 14h13.5" />
      <path d="M2.5 20.5h6c3.2 0 4.4-3 7.5-5.4" />
      <circle cx="20.5" cy="14" r="2.6" />
    </>
  ),
  /*
   * The convene mark reversed: one node, and strands leaving it. A story is
   * pitched outward to a named list of outlets, so the drawing that says
   * "many into one" run backwards is exactly the right one for placement.
   */
  place: (
    <>
      <path d="M25.5 7.5h-6c-3.2 0-4.4 3-7.5 5.4" />
      <path d="M25.5 14H12" />
      <path d="M25.5 20.5h-6c-3.2 0-4.4-3-7.5-5.4" />
      <circle cx="7.5" cy="14" r="2.6" />
    </>
  ),
  /*
   * Registration marks around a centre - the corners a printer or an editor
   * frames material inside. Content produced and handed over, rather than a
   * placement rented, which is the distinction the pillar turns on.
   */
  produce: (
    <>
      <path d="M9.5 5.5H5.5V9.5" />
      <path d="M18.5 5.5H22.5V9.5" />
      <path d="M9.5 22.5H5.5V18.5" />
      <path d="M18.5 22.5H22.5V18.5" />
      <circle cx="14" cy="14" r="2.6" />
    </>
  ),
  /* Concentric rings closing on a single point. Selection, not volume. */
  focus: (
    <>
      <circle cx="14" cy="14" r="10.5" />
      <circle cx="14" cy="14" r="5.75" />
      <circle cx="14" cy="14" r="1.15" />
    </>
  ),
  /*
   * A graduated rule.
   *
   * A rising staircase was the obvious drawing and the wrong one: this site
   * makes no claim about outcomes anywhere, and a line stepping upward behind
   * "programmes run to a defined standard" would be the section quietly
   * promising growth. A measure states the standard instead.
   *
   * Graduations hang below the rule rather than crossing it - centred, they
   * rendered as three plus signs at 28px. Three of roughly equal length then
   * read as tally marks, so the middle one is now nearly four times the outer
   * two: one major division against two minor ones is what makes a row of
   * ticks resolve into a scale.
   */
  standard: (
    <>
      <path d="M2 10h24" />
      <path d="M6.5 10v2.5" />
      <path d="M14 10v9" />
      <path d="M21.5 10v2.5" />
    </>
  ),
} as const;

export type PillarMarkName = keyof typeof PILLAR_MARKS;

export interface Pillar {
  title: string;
  description: string;
  mark: PillarMarkName;
}

export interface PillarSequenceProps {
  id: string;
  label: string;
  heading: string;
  /** The line under the heading, in the sticky column. */
  intro: string;
  pillars: readonly Pillar[];
  photo: Photo;
}

function PillarMark({ mark }: { mark: PillarMarkName }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      className="why-mark shrink-0 text-(--color-accent)"
    >
      {PILLAR_MARKS[mark]}
    </svg>
  );
}

/**
 * Progress indicator, 01 through n.
 *
 * One object at every width. It was briefly two - a vertical rail beside the
 * sticky statement on desktop, a horizontal one above the panels on a phone -
 * on the reasoning that a rotated instrument is a different instrument. In
 * practice it just meant the section explained its own sequence two different
 * ways depending on the window, and the horizontal reading is the clearer of
 * the two anyway: the numbers spaced along a rule state "this many of these, you
 * are here" without needing to be scanned downward first.
 *
 * `aria-hidden`. What it communicates is a reading position - a visual fact
 * with nothing to announce; the numbering itself is real text on every panel,
 * and the ordered list of panels carries the sequence.
 */
function Progress({ count, active }: { count: number; active: number | null }) {
  /*
   * Nothing filled until a reading position is known. The fill is a claim
   * about where the visitor is, and before the first panel reaches the
   * activation band there is no such position to claim.
   */
  const progress = active === null ? 0 : (active + 1) / count;
  const style = { "--why-progress": progress } as CSSProperties;

  return (
    <div aria-hidden="true" className="flex w-full flex-col gap-3">
      {/*
        `justify-between` rather than an even grid: it puts 01 hard against the
        left edge, in line with the label rule, the headline and the paragraph
        above it, and the last flush with the end of the rule. A grid would inset
        both ends by half a cell and break the column's one shared edge.
      */}
      <ol className="flex w-full justify-between num font-display-sm text-[0.6875rem] tracking-[0.14em]">
        {Array.from({ length: count }, (_, index) => (
          <li
            key={index}
            data-state={
              active === null
                ? "upcoming"
                : index === active
                  ? "current"
                  : index < active
                    ? "past"
                    : "upcoming"
            }
            className="why-tick text-(--color-foreground)"
          />
        ))}
      </ol>

      {/* Track, with the bronze fill scaling along it from the left. */}
      <div className="relative h-px w-full overflow-hidden bg-white/12">
        <span style={style} className="why-progress-x absolute inset-0 bg-(--color-accent)" />
      </div>
    </div>
  );
}

/**
 * Pillars, as a scroll-driven sequence.
 *
 * A statement holds the left column while the panels pass the reading position
 * on the right, one at a time. Whichever panel is crossing the middle of the
 * viewport takes the bronze rail, the glow and the lift; the others go quiet.
 * The progress indicator beside the statement tracks the same index.
 *
 * Built for one section and then generalised. Nothing in the mechanism was
 * ever specific to the differentiation pillars it started as - the geometry,
 * the observer and the indicator all work off `pillars.length` - so the
 * content is a prop and the section is reusable.
 *
 * The panels are NOT cards and are deliberately not built like them: no box,
 * no corner radius, no shadow. Each one is a top hairline, a vertical rail and
 * a field of air, which is the same construction logic as the timeline above
 * it - marks on a rule rather than content in a container.
 *
 * ---------------------------------------------------------------------------
 * Why this is a client component
 * ---------------------------------------------------------------------------
 * The active index is a function of scroll position, which the server cannot
 * know. It is the second client component on the homepage, after
 * `CapabilityShowcase`.
 *
 * What that costs is one IntersectionObserver over four elements. There is no
 * scroll listener anywhere in here: the parallax runs on a scroll-progress
 * timeline in CSS, off the main thread, and the entry animations reuse the
 * shared observer inside `Reveal`. Nothing in this section reads layout during
 * a scroll, so nothing in it can force a reflow.
 *
 * ---------------------------------------------------------------------------
 * Content integrity
 * ---------------------------------------------------------------------------
 * No figures appear anywhere in this section by design - no investor counts,
 * transaction values or years of experience, since none have been supplied and
 * none would be verifiable. The four indices are ordinals, not quantities.
 */
export function PillarSequence({
  id,
  label,
  heading,
  intro,
  pillars,
  photo,
}: PillarSequenceProps) {

  /*
   * `null` until a panel actually reaches the reading position. That is the
   * state the section renders in on the server and on first paint, and it is
   * the state that keeps every panel at full strength - so a visitor with no
   * JavaScript, or one who lands mid-section and never scrolls, sees four
   * legible panels rather than three dimmed ones.
   */
  const [active, setActive] = useState<number | null>(null);
  const panelRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const panels = panelRefs.current.filter((panel): panel is HTMLLIElement => panel !== null);
    if (panels.length === 0 || typeof IntersectionObserver === "undefined") return;

    /*
     * The activation band: a thin horizontal strip across the middle of the
     * viewport, expressed as a negative rootMargin. A panel is "being read"
     * when it occupies that strip.
     *
     * Held as a set rather than resolved per entry because the callback only
     * reports what CHANGED. A panel that entered the band three scroll events
     * ago is not in this batch, and picking the active index from the batch
     * alone would drop back to whichever panel happened to fire last.
     */
    const inBand = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = panels.indexOf(entry.target as HTMLLIElement);
          if (index === -1) continue;
          if (entry.isIntersecting) inBand.add(index);
          else inBand.delete(index);
        }

        /*
         * An empty band keeps the previous index rather than clearing it. The
         * gap between two panels can cross the strip entirely at speed, and
         * releasing to "none" there would flash all four back to full
         * brightness for a frame or two on every scroll.
         */
        if (inBand.size > 0) setActive(Math.min(...inBand));
      },
      /*
       * An 8% strip, sitting at 42-50% of the viewport rather than dead
       * centre. Slightly high on purpose: a panel is being read from its
       * heading down, so the line that decides which one is current belongs a
       * little above the middle - and with the band centred it took until a
       * panel was half past the fold for it to take over.
       *
       * Wide enough that an ordinary scroll never steps over it between
       * callbacks, narrow enough that two panels rarely share it - and when
       * they do the upper one wins, which matches the direction of travel.
       */
      { rootMargin: "-42% 0px -50% 0px", threshold: 0 },
    );

    for (const panel of panels) observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  return (
    <Section
      spacing="lg"
      tone="dark"
      aria-labelledby={id}
      /*
        No `overflow-hidden` here, deliberately.

        It was on this section before and it was quietly costing the statement
        its sticky behaviour: an ancestor with a clipped overflow becomes the
        containing block a sticky element resolves against, and since that
        ancestor scrolls with the page, the element pinned to it scrolls too.
        globals.css spells the same trap out for `body` and names this section
        in the comment - the rail was supposed to stick and never did.

        Nothing needs the section-wide clip: the one oversized layer carries
        its own clipper, and each panel clips its own numeral.
      */
      className="relative isolate"
    >
      {/*
        Background, in four planes, and the photograph is now the first of them
        rather than an item in the left column.

        Plane 1 is the PHOTOGRAPH, full bleed behind both columns. It is drawn
        with `next/image` and `fill` rather than as a CSS `background-image`,
        which is the same thing to look at and a different thing to download:
        a background URL is one fixed file at every width, while this emits AVIF
        and WebP against `deviceSizes` and hands a phone a phone-sized file.
        `cover` never repeats and never stretches, so the usual background
        housekeeping - `no-repeat`, `background-size` - has nothing to do here.

        It is deliberately NOT blurred and NOT desaturated. The grade it needs
        is the wash above it, not damage to the file.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-30 overflow-hidden">
        <Figure
          photo={photo}
          ratio="auto"
          className="h-full w-full"
          sizes="100vw"
        />
      </div>

      {/*
        Plane 2 is the WASH, and it is the whole readability budget.

        Two gradients, because the section asks two different things of it. The
        vertical one is the floor - enough midnight everywhere that white type
        never lands on bare dusk sky. The horizontal one is local: the statement
        column is the only place a long paragraph sits over the photograph, so
        that side takes more and the open middle and right take less.

        Held deliberately short of the obvious answer, which is to crush the
        whole frame. At these values the seating, the rail and the tower cluster
        all stay legible - the photograph reads as a photograph rather than as a
        texture - and the type still clears AA everywhere against it.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_bottom,rgba(12,20,29,0.52)_0%,rgba(12,20,29,0.6)_55%,rgba(12,20,29,0.72)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(100deg,rgba(12,20,29,0.66)_0%,rgba(12,20,29,0.3)_46%,rgba(12,20,29,0.12)_100%)] rtl:bg-[linear-gradient(260deg,rgba(12,20,29,0.66)_0%,rgba(12,20,29,0.3)_46%,rgba(12,20,29,0.12)_100%)]"
      />

      {/*
        And a third, over the top band only.

        Measured rather than judged. With the two washes above, the ground under
        the FIRST panel`s description came out rgb(79,84,89) - the brightest part
        of the photograph, dusk sky, sitting exactly where the smallest copy in
        the section falls. Muted body text over that is 4.10:1, which is under
        the 4.5:1 AA floor for text this size. Everywhere else measured between
        6.8:1 and 7.2:1.

        The obvious fix - more density everywhere - would have cost the terrace,
        which is the half of the photograph worth showing. This is local to the
        sky instead: strongest at the very top, gone by 48%, so it never touches
        the seating. That takes the same spot to about 4.9:1 and leaves the rest
        of the frame as it was.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_bottom,rgba(12,20,29,0.38)_0%,rgba(12,20,29,0.2)_28%,transparent_48%)]"
      />

      {/*
        Plane 3 is the pattern, and it is now a whisper.

        It was the section`s only texture and carried it at full strength. Over
        a photograph it is a third layer competing with the other two, so it
        drops to a quarter opacity - present enough that the drawn language of
        the page survives, faint enough that it never reads as dirt on the
        glass. It is still the one thing here that moves with the scroll.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden opacity-25">
        <div className="why-plane absolute inset-x-0 -top-[8%] -bottom-[8%]">
          <div className="why-grid absolute inset-0 [--why-grid-gap:5rem] lg:[--why-grid-gap:7rem]" />
          <div className="why-khatam absolute inset-0" />
        </div>
      </div>

      <div className="grid gap-x-20 gap-y-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        {/* ---------------------------------------------------------------
            Statement. Sticky from `lg` up, where there is a column tall
            enough for it to hold against; below that it simply leads.
            --------------------------------------------------------------- */}
        <div>
          {/*
            The statement column, and it is plain again.

            It briefly carried a flex column with a definite height so that a
            photograph at the bottom of the stack could absorb whatever the type
            left over. There is no photograph in the column any more - it is the
            section`s ground - so the machinery that sized it is gone with it,
            along with the height, the ceiling and the floor.

            What is left is what the sticky needs and nothing else: a label, a
            heading, a paragraph and the indicator, pinned at the top of the
            column while the panels pass it. Content-height, so it can never be
            taller than the room beneath its own offset - which is the failure a
            fixed height was there to prevent in the first place.
          */}          <div className="lg:sticky lg:top-[calc(var(--header-h)+4.5rem)] lg:self-start">
            <Reveal>
              <SectionLabel>{label}</SectionLabel>
              <Heading id={id} level={2} size="display" className="mt-5 max-w-[12ch]">
                {heading}
              </Heading>
              <p className="mt-8 max-w-[40ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                {intro}
              </p>
            </Reveal>

            {/*
              The indicator sits directly under the paragraph it belongs to.
              `mt-8` matches the gap between the headline and that paragraph,
              so the three read as one block rather than as a statement with an
              instrument parked somewhere below it.

              It closes the column now that the frame below it has moved into
              the section ground, so it doubles as the rule the statement ends
              on. `shrink-0` is vestigial from the flex column that used to be
              here and is kept only because a flex context may return.
            */}
            <Reveal delay={150} className="mt-8 shrink-0">
              <Progress count={pillars.length} active={active} />
            </Reveal>

          </div>
        </div>

        {/* ---------------------------------------------------------------
            Panels.
            --------------------------------------------------------------- */}
        <ol
          className="why-panels flex flex-col"
          data-settled={active === null ? "false" : "true"}
        >
          {pillars.map((pillar, index) => (
            <li
              key={pillar.title}
              ref={(node) => {
                panelRefs.current[index] = node;
              }}
              data-active={active === index ? "true" : "false"}
              /*
                Panels sit flush, with no gap and no margin between them: each
                one's top hairline IS the rule separating it from the one
                above, which is what makes the column read as a continuous
                measure rather than as four floating plates.
              */
              className="why-panel relative isolate"
            >
              {/* Top hairline, neutral under bronze. */}
              <span aria-hidden="true" className="why-edge absolute inset-x-0 top-0 h-px" />
              <span aria-hidden="true" className="why-edge-lit absolute inset-x-0 top-0 h-px" />

              {/* Bronze rail, growing down out of the hairline. */}
              <span
                aria-hidden="true"
                className="why-rail absolute start-0 top-0 h-20 w-[2px] bg-(--color-accent)"
              />

              {/*
                Height, and why there is still a floor on it.

                These panels were each `42svh`, with a `30svh` floor on the
                last. Against content that measures about 216px - a mark row, a
                heading and two or three lines - that is roughly 160px of dead
                space inside every panel on a 900px window, and the section ran
                to about 1.7 viewports of mostly air.

                Cut to 30svh, and 24svh on the last. On the same window that is
                about 54px of breathing room per panel rather than 160, and the
                section comes in around 1.2 viewports.

                NOT removed altogether, and this is the constraint worth
                stating rather than discovering again later. The floor is what
                the scroll sequence runs on. At content height all three panels
                fit inside one screen, which means the activation band - an 8%
                strip at 42-50% of the viewport - crosses all of them in a
                fraction of a scroll: the third is current before the first has
                been read, the bronze rail flickers between them, and the
                progress indicator beside the statement jumps rather than
                advances. A sequence needs somewhere to happen.

                30svh is the point where each panel still gets most of a screen
                to itself and the empty space stops being the thing you notice.

                `min-h` and not `h`: the description wraps to three lines on a
                narrow desktop column, and a fixed height would clip it.
              */}
              <div
                className={cn(
                  "relative flex flex-col justify-center overflow-hidden py-7 ps-7 pe-5 sm:py-9 sm:ps-10 sm:pe-8",
                  /*
                    The last panel keeps a shorter floor. The sequence has
                    finished by the time it is active, so the room it needs is
                    only the room its own content asks for.
                  */
                  index === pillars.length - 1 ? "lg:min-h-[24svh]" : "lg:min-h-[30svh]",
                )}
              >
                {/* Glow, keyed to the rail's corner. */}
                <span aria-hidden="true" className="why-glow absolute inset-0 -z-10" />

                {/*
                  This panel carried the 01/02/03 format twice: a ghost numeral
                  behind it at up to 9.5rem, and a small bronze one on the row
                  above the mark. Both are gone.

                  The mark and its rule stay and now open the row on their own -
                  the mark is what identifies the pillar, and it always was.
                */}
                <Reveal delay={index * 110}>
                  <div className="flex items-center gap-4">
                    <span aria-hidden="true" className="h-px w-6 bg-(--color-accent)/35" />
                    <PillarMark mark={pillar.mark} />
                  </div>
                </Reveal>

                {/*
                  Staggered against the index above it. The offsets are small -
                  110ms between panels, 90ms between the lines inside one - so
                  the section resolves as a sequence rather than performing one.
                */}
                <Reveal delay={index * 110 + 90}>
                  <h3 className="mt-5 max-w-[24ch] text-h4 font-medium tracking-tight">
                    {pillar.title}
                  </h3>
                </Reveal>

                <Reveal delay={index * 110 + 180}>
                  <p className="mt-3.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {pillar.description}
                  </p>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
