"use client";

import { useEffect, useRef, useState } from "react";

import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { aboutHowWeWork } from "@/data/about";

/**
 * How we work.
 *
 * The four engagement types as a scroll-driven sequence rather than a row of
 * four equal columns. Whichever stage is crossing the reading position takes
 * the bronze index, the rule and full strength; the others go quiet. An
 * oversized ghosted numeral sits behind each one for depth.
 *
 * Built on the same mechanism as the differentiation section on the homepage -
 * one IntersectionObserver over four elements, a narrow activation band across
 * the middle of the viewport, and no scroll listener anywhere. The styling
 * hangs off `data-active` in globals.css rather than a wall of variants here.
 *
 * The dimming has a floor for the same reason it does there: an inactive
 * description still has to be readable. See the note on `.about-stage` in
 * globals.css for the contrast arithmetic.
 */
export function AboutEngagements() {
  const modes = aboutHowWeWork.modes;

  /*
   * `null` until a stage actually reaches the reading position - the state the
   * section renders in on the server and on first paint, and the one that
   * keeps every stage at full strength. A visitor with no JavaScript, or one
   * who never scrolls this far, sees four legible entries rather than three
   * dimmed ones.
   */
  const [active, setActive] = useState<number | null>(null);
  const stageRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const stages = stageRefs.current.filter((stage): stage is HTMLLIElement => stage !== null);
    if (stages.length === 0 || typeof IntersectionObserver === "undefined") return;

    /*
     * Held as a set rather than resolved per entry: the callback only reports
     * what CHANGED, so a stage that entered the band several scroll events ago
     * is not in this batch, and picking from the batch alone would drop back
     * to whichever fired last.
     */
    const inBand = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = stages.indexOf(entry.target as HTMLLIElement);
          if (index === -1) continue;
          if (entry.isIntersecting) inBand.add(index);
          else inBand.delete(index);
        }
        /* An empty band keeps the previous index rather than flashing to none. */
        if (inBand.size > 0) setActive(Math.min(...inBand));
      },
      { rootMargin: "-42% 0px -50% 0px", threshold: 0 },
    );

    for (const stage of stages) observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <Section
      spacing="lg"
      tone="dark"
      aria-labelledby="about-engagements"
      className="relative isolate"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(90%_70%_at_78%_10%,#1a2836_0%,#0f1924_52%,#0c141d_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="about-parallax absolute inset-x-0 -top-[8%] -bottom-[8%]">
          <div className="about-grid absolute inset-0 [--about-grid-gap:5.5rem] lg:[--about-grid-gap:8rem]" />
        </div>
      </div>

      <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-x-20">
        <Reveal>
          <SectionLabel>{aboutHowWeWork.label}</SectionLabel>
          <Heading id="about-engagements" level={2} size="display" className="mt-5 max-w-[15ch]">
            {aboutHowWeWork.heading}
          </Heading>
        </Reveal>

        <Reveal delay={120}>
          <p className="max-w-[48ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
            {aboutHowWeWork.intro}
          </p>
        </Reveal>
      </div>

      <ol
        className="about-stages mt-[var(--space-heading)] flex flex-col"
        data-settled={active === null ? "false" : "true"}
      >
        {modes.map((mode, index) => (
          <li
            key={mode.term}
            ref={(node) => {
              stageRefs.current[index] = node;
            }}
            data-active={active === index ? "true" : "false"}
            /*
              Stages sit flush: each one's top hairline is the rule between it
              and the one above, so the column reads as a continuous measure
              rather than as four plates.
            */
            className="about-stage group relative isolate"
          >
            <span aria-hidden="true" className="about-stage-edge absolute inset-x-0 top-0 h-px" />
            <span
              aria-hidden="true"
              className="about-stage-edge-lit absolute inset-x-0 top-0 h-px"
            />

            <div className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 overflow-hidden py-9 sm:gap-x-12 sm:py-12 lg:grid-cols-[8rem_minmax(0,1fr)]">
              {/*
                Oversized ghost index, clipped by the stage rather than bleeding
                past it, and sized in vw so it stays proportional to the column.
              */}
              <span
                aria-hidden="true"
                className="about-stage-ghost pointer-events-none absolute right-0 -top-4 -z-10 num font-display leading-none text-(--color-foreground) text-[clamp(4.5rem,10vw,9rem)]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* The index in the margin, and its rule. */}
              <div className="flex flex-col items-start">
                <span
                  aria-hidden="true"
                  className="about-stage-index num font-display text-[1.75rem] leading-none sm:text-[2.25rem]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="about-stage-rule mt-4 block h-px w-10 bg-(--color-accent) sm:w-14"
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-h4 font-medium tracking-tight">{mode.term}</h3>
                <p className="mt-3.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                  {mode.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
