import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { segmentPhotos } from "@/data/imagery";
import { insightPosition, insightSectors } from "@/data/insight-page";

/**
 * Context before commentary.
 *
 * A statement against two short paragraphs, divided by a gold rule that draws
 * itself as the section arrives. Light ground directly after the dark hero, so
 * the page's first transition is a hard one.
 */
export function InsightPosition() {
  return (
    <Section spacing="lg" aria-labelledby="insight-position">
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-20">
        <Reveal>
          <SectionLabel>{insightPosition.label}</SectionLabel>
          <Heading id="insight-position" level={2} size="display" className="mt-5 max-w-[11ch]">
            {insightPosition.heading}
          </Heading>
        </Reveal>

        {/*
          A vertical gold rule between the two columns, drawing downward as the
          section enters. It exists only where there are two columns to divide;
          below `lg` it would be a line under a heading, pointing nowhere.
        */}
        <Reveal delay={200} className="hidden lg:block">
          <span
            aria-hidden="true"
            className="insight-divider block h-full w-px bg-[linear-gradient(180deg,var(--color-accent),transparent)]"
          />
        </Reveal>

        <Reveal delay={140} className="flex flex-col gap-6">
          {insightPosition.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

/**
 * What we follow: three staggered sector panels.
 *
 * COMPLIANCE: each list is subject matter, and the standing qualifier beneath
 * says the coverage is contextual rather than advisory. Three sector panels on
 * a page addressed to professional audiences is the easiest arrangement here
 * to mistake for research with a view.
 */
export function InsightSectors() {
  const photo = {
    "critical-minerals": segmentPhotos.criticalMinerals,
    "ai-data-infrastructure": segmentPhotos.aiInfrastructure,
    "life-sciences": segmentPhotos.lifeSciences,
  } as const;

  return (
    <Section spacing="lg" tone="muted" aria-labelledby="insight-sectors" width="wide">
      <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-x-24">
        <Reveal>
          <SectionLabel>{insightSectors.label}</SectionLabel>
          <Heading id="insight-sectors" level={2} size="display" className="mt-5 max-w-[10ch]">
            {insightSectors.heading}
          </Heading>
        </Reveal>

        <Reveal delay={140}>
          <p className="max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
            {insightSectors.intro}
          </p>
        </Reveal>
      </div>

      <ul className="mt-[var(--space-heading)] grid gap-x-8 gap-y-12 sm:grid-cols-3 lg:gap-x-12">
        {insightSectors.sectors.map((sector, index) => (
          <li
            key={sector.key}
            style={{ "--drop": index } as React.CSSProperties}
            className="sm:[margin-top:calc(var(--drop)*3rem)]"
          >
            <Reveal variant="media" delay={index * 140}>
              <Figure
                photo={photo[sector.key as keyof typeof photo]}
                ratio="tall"
                overlay="soft"
                zoom
                className="w-full"
                sizes="(min-width: 640px) 30vw, 100vw"
              />
            </Reveal>

            <Reveal delay={index * 140 + 120}>
              <div className="mt-7">
                <span
                  aria-hidden="true"
                  className="num font-display-sm text-[0.625rem] tracking-[0.14em] text-(--color-accent)"
                >
                  {sector.number}
                </span>
                <h3 className="mt-4 font-display text-h3 tracking-tight text-balance">
                  {sector.name}
                </h3>
                <ul className="mt-6 flex flex-col gap-2.5 border-t border-(--color-border) pt-5">
                  {sector.covers.map((entry) => (
                    <li
                      key={entry}
                      className="text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)"
                    >
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* COMPLIANCE. Standing text. */}
      <Reveal delay={520}>
        <p className="mt-14 max-w-[62ch] text-sm leading-relaxed text-(--color-foreground-subtle)">
          {insightSectors.disclaimer}
        </p>
      </Reveal>
    </Section>
  );
}
