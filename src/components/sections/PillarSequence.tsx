"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Photo } from "@/data/imagery";

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
          >
            {String(index + 1).padStart(2, "0")}
          </li>
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
        Background, in three planes.

        Plane 1 is the ground: the same radial this section has always used, so
        the surface still belongs to the page it sits on.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[radial-gradient(85%_75%_at_18%_12%,#1a2836_0%,#0f1924_52%,#0c141d_100%)]"
      />

      {/*
        Plane 2 is the pattern, and the only thing that moves with the scroll.
        Inset negatively by more than the drift distance so neither end of the
        travel brings an edge into frame.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
        <div className="why-plane absolute inset-x-0 -top-[8%] -bottom-[8%]">
          <div className="why-grid absolute inset-0 [--why-grid-gap:5rem] lg:[--why-grid-gap:7rem]" />
          <div className="why-khatam absolute inset-0" />
        </div>
      </div>

      {/*
        Plane 3 is a single cool lift under the statement column, so the type
        has a ground of its own rather than sitting on the pattern.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(58%_52%_at_8%_28%,rgba(26,40,54,0.72)_0%,transparent_72%)]"
      />

      <div className="grid gap-x-20 gap-y-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        {/* ---------------------------------------------------------------
            Statement. Sticky from `lg` up, where there is a column tall
            enough for it to hold against; below that it simply leads.
            --------------------------------------------------------------- */}
        <div>
          {/*
            The sticky block is a flex column with a height ceiling, and both
            parts of that matter.

            The statement, the indicator and the photograph together are taller
            than the statement alone was, and a sticky element taller than the
            space below the header cannot be seen in full - it pins to the top and
            its bottom sits off-screen for the whole scroll. Sizing the block
            to the space that is actually available keeps it in view, and the
            flex column then lets the photograph absorb whatever is left after
            the type has taken what it needs - so the composition holds on a
            short laptop and on a tall monitor without a breakpoint for either.

            A definite height, not a ceiling. `max-height` alone leaves the
            block content-sized whenever the content is shorter, which means no
            free space for `flex-1` to distribute and a frame stuck at its
            minimum: a 3.5:1 sliver on a laptop. Given a real height the frame
            takes the remainder and lands near 2:1 there and squarer on a tall
            display. The `min-h` floor is what stops a very short window
            squeezing it back to nothing.
          */}
          <div className="lg:sticky lg:top-[calc(var(--header-h)+4.5rem)] lg:flex lg:h-[calc(100svh-var(--header-h)-7.5rem)] lg:min-h-[26rem] lg:flex-col">
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

              `shrink-0`: inside the flex column below `lg`'s height ceiling,
              the photograph is the element that gives, never this one.
            */}
            <Reveal delay={150} className="mt-8 shrink-0">
              <Progress count={pillars.length} active={active} />
            </Reveal>

            {/*
              The photograph. Flush left with the indicator, the paragraph and
              the headline - one edge down the whole column.

              Two sizings in one element rather than two elements. Below `lg`
              the frame sets its own 16:10 and the column simply flows. From
              `lg` up it drops the ratio and stretches as a flex item, taking
              whatever the type left over - a skyline reads as happily at 2:1
              on a laptop as it does nearly square on a tall display.

              It is a FLEX CHILD there, not an `h-full` one. A percentage height
              resolves against the parent's specified height, and a parent whose
              height comes from `min-height` with `height: auto` gives back
              auto - so `h-full` collapsed, the fill image contributed nothing,
              and the frame rendered at zero. Stretching it gives it a real used
              height, which is what the absolutely positioned image needs.
            */}
            <Reveal
              delay={220}
              className="mt-9 lg:mt-8 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col"
            >
              <Figure
                photo={photo}
                ratio="auto"
                overlay="veil"
                className="aspect-[16/10] w-full lg:aspect-auto lg:min-h-[9rem] lg:flex-1"
                sizes="(min-width: 1024px) 34vw, 100vw"
              />
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
                className="why-rail absolute left-0 top-0 h-20 w-[2px] bg-(--color-accent)"
              />

              {/*
                Height, and why it is set at all.

                Left to its own content each panel came out around 170px, which
                put the whole section inside a single screen: all four were
                visible at once, the second was already the active one before
                the first had been read, and the sticky statement ran out of
                container almost immediately. A sequence needs somewhere to
                happen.

                42svh gives each panel most of a screen to itself and the
                section about 1.7 viewports of travel - enough for the four to
                arrive one at a time, short of the point where scrolling
                becomes a chore. Content centres in the band rather than
                sitting at the top of it, so the extra room reads as
                composition rather than as padding.

                `min-h` and not `h`: the description wraps to three lines on a
                narrow desktop column, and a fixed height would clip it.
              */}
              <div className="relative flex flex-col justify-center overflow-hidden py-9 pl-7 pr-5 sm:py-11 sm:pl-10 sm:pr-8 lg:min-h-[42svh]">
                {/* Glow, keyed to the rail's corner. */}
                <span aria-hidden="true" className="why-glow absolute inset-0 -z-10" />

                {/*
                  Oversized index. Clipped by the panel rather than bleeding
                  past it, and sized in `vw` so it stays proportional to the
                  column instead of dominating a narrow one.
                */}
                <span
                  aria-hidden="true"
                  className="why-numeral pointer-events-none absolute -top-3 right-2 -z-10 num font-display leading-none text-(--color-foreground) text-[clamp(5rem,11vw,9.5rem)] sm:right-4"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <Reveal delay={index * 110}>
                  <div className="flex items-center gap-4">
                    <p className="num font-display-sm text-sm text-(--color-accent)">
                      {String(index + 1).padStart(2, "0")}
                    </p>
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
