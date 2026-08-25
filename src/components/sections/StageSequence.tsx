"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export interface StageItem {
  term: string;
  description: string;
  /** Optional bullet list under the description, for richer stages. */
  items?: readonly string[];
  /** Overrides the index label. Use for things like "Month 1". */
  label?: string;
  /**
   * An id for this stage, so it can be linked to directly.
   *
   * The Insight article pages link back to their format at `/insight#gulf-brief`
   * and similar; without this the sequence has nothing for those links to land
   * on and they silently do nothing.
   */
  anchor?: string;
  /** A short uppercase line under the term. A cadence, a duration, a span. */
  meta?: string;
  /**
   * Real links belonging to this stage, listed after everything else.
   *
   * Exists for the Insight page, where each format is a stage and the pieces
   * published under it have to be reachable. Kept as links rather than folded
   * into `items` because a list of titles nobody can click is not a library -
   * and an empty array renders nothing, which is what an unpublished format
   * should look like.
   */
  links?: readonly { href: string; label: string; meta?: string }[];
}

export interface StageSequenceProps {
  id: string;
  label: string;
  heading: string;
  intro?: string;
  stages: readonly StageItem[];
  tone?: "dark" | "muted" | "canvas";
}

/**
 * ============================================================================
 * STAGE SEQUENCE
 * ============================================================================
 * A scroll-driven column. Whichever stage is crossing the reading position
 * takes the bronze index, the rule and full strength; the others go quiet, and
 * an oversized ghosted numeral sits behind each one for depth.
 *
 * Generalised from `AboutEngagements`, which was hard-wired to one list on one
 * page. Nothing about the mechanism was specific to that content, so it now
 * takes its stages as a prop - the About page, the roadshow formats and the
 * six-month programme all use the same sequence.
 *
 * Mechanism, unchanged: one IntersectionObserver over the stage elements, a
 * narrow activation band across the middle of the viewport, and no scroll
 * listener anywhere. The styling hangs off `data-active` in globals.css.
 *
 * The dimming has a floor for the reason set out on `.about-stage` there: an
 * inactive description still has to be readable, and 0.66 is where that stops
 * being true if pushed further.
 */
export function StageSequence({
  id,
  label,
  heading,
  intro,
  stages,
  tone = "dark",
}: StageSequenceProps) {
  /*
   * `null` until a stage reaches the reading position - the state the section
   * renders in on the server and on first paint, and the one that keeps every
   * stage at full strength. A visitor with no JavaScript, or one who never
   * scrolls this far, sees legible entries rather than dimmed ones.
   */
  const [active, setActive] = useState<number | null>(null);
  const stageRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const nodes = stageRefs.current.filter((stage): stage is HTMLLIElement => stage !== null);
    if (nodes.length === 0 || typeof IntersectionObserver === "undefined") return;

    /*
     * Held as a set because the callback reports only what CHANGED - a stage
     * that entered the band several scroll events ago is not in this batch,
     * and picking from the batch alone would drop back to whichever fired last.
     */
    const inBand = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = nodes.indexOf(entry.target as HTMLLIElement);
          if (index === -1) continue;
          if (entry.isIntersecting) inBand.add(index);
          else inBand.delete(index);
        }
        /* An empty band keeps the previous index rather than flashing to none. */
        if (inBand.size > 0) setActive(Math.min(...inBand));
      },
      { rootMargin: "-42% 0px -50% 0px", threshold: 0 },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isDark = tone === "dark";

  return (
    <Section spacing="lg" tone={tone} aria-labelledby={id} className="relative isolate">
      {isDark && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[radial-gradient(90%_70%_at_78%_10%,#1a2836_0%,#0f1924_52%,#0c141d_100%)]"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <div className="about-parallax absolute inset-x-0 -top-[8%] -bottom-[8%]">
              <div className="about-grid absolute inset-0 [--about-grid-gap:5.5rem] lg:[--about-grid-gap:8rem]" />
            </div>
          </div>
        </>
      )}

      <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-x-20">
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
          <Heading id={id} level={2} size="display" className="mt-5 max-w-[15ch]">
            {heading}
          </Heading>
        </Reveal>

        {intro && (
          <Reveal delay={120}>
            <p className="max-w-[48ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
              {intro}
            </p>
          </Reveal>
        )}
      </div>

      <ol
        className="about-stages mt-[var(--space-heading)] flex flex-col"
        data-settled={active === null ? "false" : "true"}
      >
        {stages.map((stage, index) => (
          <li
            key={stage.term}
            ref={(node) => {
              stageRefs.current[index] = node;
            }}
            id={stage.anchor}
            data-active={active === index ? "true" : "false"}
            /*
              Stages sit flush: each one's top hairline is the rule between it
              and the one above, so the column reads as a continuous measure
              rather than as separate plates.
            */
            className="about-stage group relative isolate scroll-mt-[calc(var(--header-h)+2rem)]"
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
                  className="about-stage-index num font-display leading-none text-[1.75rem] sm:text-[2.25rem]"
                >
                  {stage.label ?? String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="about-stage-rule mt-4 block h-px w-10 bg-(--color-accent) sm:w-14"
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-h4 font-medium tracking-tight">{stage.term}</h3>

                {stage.meta && (
                  <p className="mt-3 text-label uppercase text-(--color-foreground-subtle)">
                    {stage.meta}
                  </p>
                )}

                {/*
                  Skipped when empty rather than rendered blank. Some callers
                  carry their detail entirely in `items` - the roadshow formats
                  and the six-month structure both do - and an empty paragraph
                  there leaves a margin the eye reads as a missing line.
                */}
                {stage.description && (
                  <p className="mt-3.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {stage.description}
                  </p>
                )}

                {stage.items && stage.items.length > 0 && (
                  <ul className="mt-5 flex flex-col gap-2">
                    {stage.items.map((entry) => (
                      <li
                        key={entry}
                        className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-px w-3 shrink-0 bg-(--color-accent)"
                        />
                        <span>{entry}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {stage.links && stage.links.length > 0 && (
                  <ul className="mt-8 border-t border-(--color-foreground)/12">
                    {stage.links.map((link) => (
                      <li key={link.href} className="border-b border-(--color-foreground)/12">
                        <Link
                          href={link.href}
                          className="group flex flex-col gap-1.5 py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                        >
                          <span className="font-display text-[1.0625rem] leading-snug transition-colors duration-500 group-hover:text-(--color-accent)">
                            {link.label}
                          </span>
                          {link.meta && (
                            <span className="shrink-0 text-sm text-(--color-foreground-subtle)">
                              {link.meta}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
