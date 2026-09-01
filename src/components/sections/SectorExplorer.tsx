"use client";

import NextImage from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { industryPhotos } from "@/data/imagery";
import { industries } from "@/data/industries";

/** Height of one sector's scroll band, in svh. Six of these make the track. */
const BAND_SVH = 52;

/**
 * The four focus lines, as a 2x2 measured grid.
 *
 * Shared by both layouts, which is the reason it is a component rather than
 * inline markup: the desktop panel and the mobile accordion body render the
 * identical block, and two copies of this that could drift apart is exactly
 * the kind of duplication worth spending a function on.
 */
function FocusGrid({ focus }: { focus: readonly string[] }) {
  return (
    <>
      <h4 className="text-label uppercase text-(--color-foreground-subtle)">
        Where the work concentrates
      </h4>

      <ul className="mt-5 grid gap-x-10 sm:grid-cols-2">
        {focus.map((item) => (
          <li key={item} className="ind-focus group relative">
            <div className="border-t border-(--color-foreground)/12 py-4">
              <span className="ind-focus-text text-[0.9375rem] leading-snug">{item}</span>
            </div>
            {/* The rule that lengthens on hover, over the top border. */}
            <span aria-hidden="true" className="ind-focus-rule absolute inset-x-0 top-0 h-px" />
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * ============================================================================
 * SECTOR EXPLORER
 * ============================================================================
 * Six sectors, presented one at a time.
 *
 * Desktop is a split explorer: an index of six down the left, and the active
 * sector's photograph and copy filling the right. The selection follows the
 * pointer, the keyboard and the scroll position - hovering or focusing an index
 * row selects it, and scrolling the section selects whichever band the reading
 * position is currently in, so a visitor who never touches the index still sees
 * all six.
 *
 * Below `lg` it is an accordion instead, one sector open at a time. That is a
 * genuinely different component rather than the same one narrowed: a split
 * explorer at 390px is a nav with nowhere to put the panel, and a sticky scroll
 * track on a phone fights the scroll gesture it depends on.
 *
 * ---------------------------------------------------------------------------
 * On the duplication
 * ---------------------------------------------------------------------------
 * The sector copy is in the markup twice - once in the desktop panel, once in
 * the accordion body - because the two layouts cannot be expressed as one tree.
 * The cost is bounded and worth stating plainly: whichever layout is inactive
 * is `display: none`, which removes it from the accessibility tree and from
 * find-in-page entirely, so assistive technology encounters each sector exactly
 * once. What it costs is DOM nodes and duplicated text in the HTML source.
 *
 * The alternative - picking a layout from a media query at runtime - renders
 * the wrong one on the server, then swaps it after hydration. That trades a
 * silent, invisible cost for a visible one.
 *
 * ---------------------------------------------------------------------------
 * Images
 * ---------------------------------------------------------------------------
 * All six are mounted in the desktop panel and cross-faded on opacity rather
 * than swapped by `src`, so changing sector never shows a decode flash. The
 * cost is six requests where one would do; at the panel's `sizes` that is a few
 * hundred kilobytes of WebP, and it is the same trade the capability panel on
 * the homepage makes. The accordion, by contrast, mounts one image per sector
 * and lets them lazy-load, because there is no instant transition to protect.
 */
export function SectorExplorer() {
  const [active, setActive] = useState(0);
  /** Mobile accordion. `null` closes all; one at a time by design. */
  const [open, setOpen] = useState<number | null>(0);

  const bandRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const bands = bandRefs.current.filter((band): band is HTMLDivElement => band !== null);
    if (bands.length === 0 || typeof IntersectionObserver === "undefined") return;

    /*
     * The activation band, expressed as a negative rootMargin: a thin strip
     * across the middle of the viewport. Whichever scroll band occupies it is
     * the sector being read.
     *
     * Held as a set because the callback reports only what CHANGED - a band
     * that entered several scroll events ago is not in this batch.
     */
    const inBand = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = bands.indexOf(entry.target as HTMLDivElement);
          if (index === -1) continue;
          if (entry.isIntersecting) inBand.add(index);
          else inBand.delete(index);
        }
        if (inBand.size > 0) setActive(Math.min(...inBand));
      },
      { rootMargin: "-46% 0px -46% 0px", threshold: 0 },
    );

    for (const band of bands) observer.observe(band);
    return () => observer.disconnect();
  }, []);

  const current = industries[active];

  return (
    <Section
      spacing="lg"
      tone="dark"
      aria-labelledby="sector-explorer-heading"
      className="relative isolate"
    >
      {/* Ground, and an architectural field drifting slowly behind it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(92%_70%_at_74%_6%,#1b2a39_0%,#101b27_52%,#0c141d_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="about-parallax absolute inset-x-0 -top-[6%] -bottom-[6%]">
          <div className="about-grid absolute inset-0 [--about-grid-gap:5.5rem] lg:[--about-grid-gap:8rem]" />
        </div>
      </div>

      <Reveal>
        <SectionLabel>Sectors</SectionLabel>
        <Heading
          id="sector-explorer-heading"
          level={2}
          size="display"
          className="mt-5 max-w-[14ch]"
        >
          Six Sectors, Six Sets of Questions
        </Heading>
      </Reveal>

      {/* ====================================================================
          DESKTOP - the explorer
          ==================================================================== */}
      <div className="mt-[var(--space-heading)] hidden lg:block">
        <div className="relative" style={{ height: `${industries.length * BAND_SVH}svh` }}>
          {/*
            Scroll bands. Invisible, non-interactive, and the only reason the
            track is tall: each one is a stretch of scrolling that belongs to
            one sector, and the observer above turns "which band am I in" into
            the active index.
          */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {industries.map((industry, index) => (
              <div
                key={industry.slug}
                ref={(node) => {
                  bandRefs.current[index] = node;
                }}
                style={{ height: `${BAND_SVH}svh` }}
              />
            ))}
          </div>

          {/*
            Auto height, aligned to the top, with real padding under it.

            This carried a fixed `h-[min(46rem,80svh)]` with `items-center`,
            and that was wrong in both directions at once. The panel's content
            is taller than that box on every common laptop - 807px inside 720px
            at 1440x900, 812px inside 614px at 1366x768 - and centring an
            overflow splits it evenly, so the photograph slid up under the fixed
            header while the last row of focus items fell below the fold. At
            1280x720 that was 87px of content nobody could reach, because a
            sticky element cannot be scrolled to.

            Nothing here is a height any more. The box takes the height of what
            is in it, `items-start` puts the panel and the index on the same top
            edge, and the padding underneath guarantees clearance from the
            section boundary.
          */}
          <div className="sticky top-[calc(var(--header-h)+2rem)] pb-10">
            <div className="grid w-full grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)] items-start gap-x-14 xl:gap-x-20">
              {/* ---------------- Index ---------------- */}
              <nav aria-label="Sectors">
                <ol className="flex flex-col">
                  {industries.map((industry, index) => (
                    <li key={industry.slug}>
                      <button
                        type="button"
                        aria-current={active === index ? "true" : undefined}
                        data-active={active === index ? "true" : "false"}
                        onClick={() => setActive(index)}
                        onMouseEnter={() => setActive(index)}
                        onFocus={() => setActive(index)}
                        className="ind-nav group relative block w-full border-t border-(--color-foreground)/12 py-5 text-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) xl:py-6"
                      >
                        <span
                          aria-hidden="true"
                          className="ind-nav-edge absolute inset-x-0 top-0 h-px bg-(--color-accent)"
                        />

                        <span className="flex items-center gap-5">
                          <span className="ind-nav-title font-display text-[1.25rem] leading-snug xl:text-[1.4375rem]">
                            {industry.title}
                          </span>
                          {/* The gold line that extends on selection. */}
                          <span
                            aria-hidden="true"
                            className="ind-nav-rule ms-auto hidden h-px w-14 bg-(--color-accent) xl:block"
                          />
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>

              {/* ---------------- Active sector ---------------- */}
              <div className="relative">
                {/*
                  The photograph. All six mounted, cross-faded.

                  The ceiling is what keeps the whole panel inside the viewport,
                  and it has to exist because this block is sticky: an element
                  taller than the space below the header cannot be scrolled to,
                  so anything past that edge is unreachable rather than merely
                  below the fold.

                  `100svh - 520px` is the room left once the header offset, the
                  padding underneath and the roughly 350px of type below the
                  frame have taken theirs - so the frame gets what is actually
                  spare, and gets more of it on a tall display than on a short
                  one. The 11rem floor stops it collapsing to a sliver in a very
                  short window.

                  `max-height` against `aspect-ratio` widens the crop rather
                  than letterboxing it: the box stops growing, and `object-cover`
                  takes a shallower slice of the same photograph.
                */}
                <div className="relative aspect-[16/10] max-h-[max(11rem,calc(100svh-520px))] overflow-hidden">
                  {industries.map((industry, index) => (
                    <div
                      key={industry.slug}
                      data-on={active === index ? "true" : "false"}
                      className="ind-frame absolute inset-0"
                    >
                      <NextImage
                        src={industryPhotos[industry.slug].src}
                        alt=""
                        fill
                        sizes="52vw"
                        placeholder="blur"
                        style={{ objectPosition: industryPhotos[industry.slug].position }}
                        className="photo-grade object-cover"
                      />
                    </div>
                  ))}

                  {/*
                    The overlay the brief asks for, and the reason the frame
                    can sit on a navy page without reading as a bright rectangle
                    pasted onto it.
                  */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,20,29,0.76)_0%,rgba(12,20,29,0.44)_46%,rgba(12,20,29,0.3)_100%)]"
                  />
                  <div aria-hidden="true" className="grain absolute inset-0" />

                  {/* Index and title, on the frame. */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-7">
                    <p className="max-w-[20ch] font-display text-[1.75rem] leading-snug text-[#f4f1eb]">
                      {current.title}
                    </p>
                  </div>
                </div>

                {/*
                  Copy. Keyed on the slug so React replaces the subtree when the
                  sector changes, which is what re-runs the entry animation -
                  without the key it would mutate text in place and the panel
                  would change without appearing to.
                */}
                <div key={current.slug} className="ind-panel-copy relative isolate mt-8">
                  {/*
                    Oversized keywords, behind the copy.

                    They were anchored to the top of the whole panel, which put
                    them behind the photograph - and since they sit on a lower
                    layer, the frame cut each word in half wherever the two
                    overlapped. Anchoring them to the copy block instead gives
                    them a ground of their own: they are background typography
                    for the paragraphs, which is what they were for.

                    Decorative and aria-hidden - see the note on
                    `Industry.keywords`.
                  */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-2 end-0 -z-10 select-none text-end"
                  >
                    {current.keywords.map((word, index) => (
                      <span
                        key={word}
                        className="ind-keyword block font-display leading-[0.94] tracking-tight text-[clamp(2.25rem,3.8vw,3.5rem)]"
                        style={{ "--kw-delay": `${index * 90}ms` } as CSSProperties}
                      >
                        {word}
                      </span>
                    ))}
                  </div>

                  <p className="max-w-[54ch] text-lead text-(--color-foreground-muted)">
                    {current.summary}
                  </p>
                  <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {current.challenge}
                  </p>

                  <div className="mt-8">
                    <FocusGrid focus={current.focus} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          BELOW lg - the accordion
          ==================================================================== */}
      <ul className="mt-[var(--space-heading)] flex flex-col lg:hidden">
        {industries.map((industry, index) => {
          const isOpen = open === index;
          const photo = industryPhotos[industry.slug];

          return (
            <li key={industry.slug} className="border-t border-(--color-foreground)/12 last:border-b">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`sector-panel-${industry.slug}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                  data-open={isOpen ? "true" : "false"}
                  className="ind-acc group flex w-full items-center gap-5 py-6 text-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                >
                  <span className="ind-nav-title flex-1 font-display text-[1.1875rem] leading-snug">
                    {industry.title}
                  </span>

                  {/*
                    Plus / minus, drawn from two rules. The vertical one rotates
                    to nothing when the panel opens, which reads as the sign
                    changing rather than as an icon spinning.
                  */}
                  <span aria-hidden="true" className="relative block h-3.5 w-3.5 shrink-0">
                    <span className="absolute start-0 top-1/2 h-px w-full -translate-y-1/2 bg-(--color-accent)" />
                    <span className="ind-acc-bar absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-(--color-accent)" />
                  </span>
                </button>
              </h3>

              {/*
                Height animated with a grid track rather than max-height. A
                `1fr` row collapsing to `0fr` animates to the content's real
                height, so there is no guessed maximum to overshoot and no jump
                when a long panel exceeds it.
              */}
              <div
                id={`sector-panel-${industry.slug}`}
                data-open={isOpen ? "true" : "false"}
                className="ind-acc-panel grid"
              >
                <div className="overflow-hidden">
                  <div className="pb-9">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <NextImage
                        src={photo.src}
                        alt=""
                        fill
                        loading="lazy"
                        sizes="100vw"
                        placeholder="blur"
                        style={{ objectPosition: photo.position }}
                        className="photo-grade object-cover"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,20,29,0.66)_0%,rgba(12,20,29,0.2)_60%,transparent_100%)]"
                      />
                    </div>

                    <p className="mt-6 text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                      {industry.summary}
                    </p>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                      {industry.challenge}
                    </p>

                    <div className="mt-8">
                      <FocusGrid focus={industry.focus} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
