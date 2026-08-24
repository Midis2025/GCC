import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { industries, industriesContent } from "@/data/industries";

/**
 * Sector coverage.
 *
 * An editorial opening rather than another two-column text block: heading and
 * copy across the top, then a measured rule carrying 01 through 06 beneath
 * them, running the full width of the page.
 *
 * The rule is a contents page. Six sectors follow and they are presented one at
 * a time in an explorer, which means the reader cannot see how many there are
 * by scrolling - this is where the page tells them, before the explorer starts
 * hiding five of six behind a selection.
 *
 * The indices draw in one after another as the section enters view, and the
 * rule under them expands from the left. Both are CSS, keyed off `Reveal`.
 */
export function IndustriesIntro() {
  return (
    <Section spacing="lg" aria-labelledby="industries-intro">
      <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-x-24">
        <Reveal>
          <SectionLabel>{industriesContent.label}</SectionLabel>
          <Heading id="industries-intro" level={2} size="display" className="mt-5 max-w-[16ch]">
            {industriesContent.heading}
          </Heading>
        </Reveal>

        <Reveal delay={140}>
          <p className="max-w-[52ch] text-lead text-(--color-foreground-muted)">
            {industriesContent.intro}
          </p>
          {/*
            CONTENT INTEGRITY. Marks the coverage as indicative pending
            confirmation, and mirrors the client-segment note on the homepage.
            It stays visible - see the header of `data/industries.ts`.
          */}
          <p className="mt-6 text-sm text-(--color-foreground-subtle)">{industriesContent.note}</p>
        </Reveal>
      </div>

      {/*
        The contents rule. Indices sit ON the line rather than above it, each
        one clearing a gap in the rule with a background match, so the line
        reads as continuous and the numbers as stations on it.
      */}
      <Reveal delay={220} className="mt-[var(--space-heading)]">
        <div className="relative">
          <span
            aria-hidden="true"
            className="about-rule absolute inset-x-0 top-1/2 block h-px -translate-y-1/2 bg-(--color-border)"
          />

          <ol className="relative flex justify-between">
            {industries.map((industry, index) => (
              <li
                key={industry.slug}
                className="ind-contents-index num font-display-sm bg-(--color-canvas) px-2 text-[0.6875rem] tracking-[0.14em] text-(--color-foreground-subtle) first:pl-0 last:pr-0"
                style={{ "--reveal-delay": `${360 + index * 90}ms` } as React.CSSProperties}
              >
                <span className="sr-only">{industry.title}, </span>
                {industry.number}
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </Section>
  );
}
