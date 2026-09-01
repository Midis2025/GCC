import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { segmentPhotos } from "@/data/imagery";
import { pick } from "@/content";
import { coverageAr } from "@/content/ar/for-investors";
import { coverage as coverageEn } from "@/data/investors-depth";

/** The frame for each sector. Shared with the homepage mosaic on purpose. */
const SECTOR_PHOTO = {
  "critical-minerals": segmentPhotos.criticalMinerals,
  "ai-data-infrastructure": segmentPhotos.aiInfrastructure,
  "life-sciences": segmentPhotos.lifeSciences,
} as const;

/**
 * ============================================================================
 * WHAT WE COVER
 * ============================================================================
 * The three sectors, as wide horizontal bands rather than three columns.
 *
 * The shape is the point. This page already carries a scroll-driven sequence,
 * a typographic band and a split-screen form; three columns would have been a
 * fourth grid. Full-width bands with the photograph on alternating sides give
 * each sector a whole row and let the page breathe between them.
 *
 * The photographs are the same three the homepage mosaic uses for the same
 * three sectors, which is deliberate rather than lazy: one sector, one frame,
 * across the site. A different picture of a data centre on each page would be
 * variety for its own sake and would make the two pages look unrelated.
 *
 * ---------------------------------------------------------------------------
 * COMPLIANCE
 * ---------------------------------------------------------------------------
 * Each `focus` list names SUBJECT MATTER, never a company and never a
 * position. `coverage.disclaimer` sits under the bands in standing text and
 * states that this is informational rather than research, a recommendation or
 * advice - three sector panels on a page addressed to investors is the easiest
 * arrangement here to mistake for coverage with a view. It is not collapsible.
 */
export async function CoverageSectors() {
  const coverage = await pick({ en: coverageEn, ar: coverageAr });

  return (
    <Section spacing="lg" tone="muted" aria-labelledby="investors-coverage">
      <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-x-24">
        <Reveal>
          <SectionLabel>{coverage.label}</SectionLabel>
          <Heading
            id="investors-coverage"
            level={2}
            size="display"
            className="mt-5 max-w-[14ch]"
          >
            {coverage.heading}
          </Heading>
        </Reveal>

        <Reveal delay={140}>
          <p className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
            {coverage.intro}
          </p>
        </Reveal>
      </div>

      <ul className="mt-[var(--space-heading)] flex flex-col">
        {coverage.sectors.map((sector, index) => {
          /* Alternating sides, so the row does not settle into a rhythm. */
          const imageFirst = index % 2 === 0;

          return (
            <li key={sector.key} className="border-t border-(--color-border)">
              <div className="grid gap-x-14 gap-y-8 py-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:py-16">
                <Reveal
                  variant="media"
                  delay={index * 90}
                  className={imageFirst ? "lg:order-1" : "lg:order-2"}
                >
                  <Figure
                    photo={SECTOR_PHOTO[sector.key as keyof typeof SECTOR_PHOTO]}
                    ratio="wide"
                    overlay="veil"
                    zoom
                    className="w-full"
                    sizes="(min-width: 1024px) 38vw, 100vw"
                  />
                </Reveal>

                <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                  <Reveal delay={index * 90 + 100}>
                    <div className="flex items-baseline gap-5">
                      <span
                        aria-hidden="true"
                        className="num font-display-sm text-[0.6875rem] tracking-[0.16em] text-(--color-accent)"
                      >
                        {sector.number}
                      </span>
                      <h3 className="font-display text-h3 tracking-tight">{sector.name}</h3>
                    </div>

                    <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                      {sector.description}
                    </p>

                    {/*
                      Subject matter, set as a quiet inline row rather than a
                      bulleted list - these are topics the coverage concerns,
                      not features being offered.
                    */}
                    <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
                      {sector.focus.map((entry) => (
                        <li
                          key={entry}
                          className="flex items-center gap-2.5 text-[0.875rem] text-(--color-foreground-subtle)"
                        >
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 shrink-0 rounded-full bg-(--color-accent)"
                          />
                          {entry}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* CONTENT INTEGRITY. Standing text. See the note above. */}
      <Reveal delay={420}>
        <p className="mt-10 max-w-[64ch] border-t border-(--color-border) pt-8 text-sm leading-relaxed text-(--color-foreground-subtle)">
          {coverage.disclaimer}
        </p>
      </Reveal>
    </Section>
  );
}
