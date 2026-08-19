import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { photos } from "@/data/imagery";
import { introContent } from "@/data/homepage";

/**
 * Positioning statement.
 *
 * Editorial split: the statement and copy hold a narrow left column while a
 * tall photograph runs the right, deliberately breaking the section's bottom
 * edge so the band does not read as a rectangle stacked on a rectangle. A
 * floating caption plate overlaps the image from the text side, tying the two
 * columns together across the gutter.
 *
 * The six principles then run underneath as an indexed hairline grid - no
 * cards, no boxes, just rules and numerals, which is a different rhythm from
 * anything above it on the page.
 */
export function Intro() {
  return (
    <Section spacing="lg" aria-labelledby="intro-heading" className="relative overflow-hidden">
      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-start">
        <div className="lg:pt-6">
          <Reveal>
            <SectionLabel>{introContent.label}</SectionLabel>
            <Heading id="intro-heading" level={2} size="display" className="mt-7 max-w-[13ch]">
              {introContent.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120} className="mt-9 flex max-w-[54ch] flex-col gap-6">
            {introContent.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lead text-(--color-foreground-muted)">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {/*
          The photograph is pulled to the viewport edge on large screens. A
          negative right margin rather than a full-bleed wrapper keeps it
          inside the Container's grid, so nothing can push the page wider than
          100vw - body overflow-x is a guard, not the layout mechanism.
        */}
        <Reveal variant="media" delay={200} className="relative lg:-mr-12 xl:-mr-16">
          <Figure
            photo={photos.introTowers}
            ratio="tall"
            overlay="veil"
            sizes="(min-width: 1024px) 46vw, 100vw"
          />

          <div className="absolute -bottom-6 left-4 max-w-[19rem] border-l-2 border-(--color-accent) bg-(--color-canvas) py-5 pl-6 pr-5 shadow-[var(--shadow-lg)] sm:-bottom-8 sm:left-6 lg:-left-14">
            <p className="text-label font-medium uppercase text-(--color-foreground-subtle)">
              The question behind the work
            </p>
            <p className="mt-3 font-serif text-[1.0625rem] leading-snug text-balance">
              Does the market understand this business the way its leadership intends?
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-[calc(var(--space-section-sm)+2rem)] border-t border-(--color-border) pt-2">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
          {introContent.principles.map((principle, index) => (
            <li key={principle.title}>
              <Reveal
                delay={index * 70}
                className="flex h-full gap-5 border-b border-(--color-border) py-8 sm:py-9 lg:border-b-0 lg:pr-10"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-sm leading-none text-(--color-accent)"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.0625rem] font-medium tracking-tight">{principle.title}</h3>
                  <p className="mt-2.5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
