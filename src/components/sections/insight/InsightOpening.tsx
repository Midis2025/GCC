import { Section } from "@/components/sections/Section";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { backdrops, segmentPhotos } from "@/data/imagery";
import { insightContent } from "@/data/insight";
import { insightPosition, insightSectors } from "@/data/insight-page";

/** The four words behind the hero image. Decorative; the page states them properly below. */
const HERO_WORDS = ["Markets", "Sectors", "People", "Context"] as const;

/**
 * ============================================================================
 * INSIGHT — HERO
 * ============================================================================
 * An asymmetric editorial opening rather than the shared `PageHero`.
 *
 * `PageHero` renders type over a full-bleed photograph, which is right for a
 * service page introducing a single idea. This page is a publication, and a
 * publication's front page sets its masthead beside its lead image rather than
 * on top of it - so the copy holds a narrow left column and the photograph
 * takes the right and bleeds to the page edge.
 *
 * The four words sit behind the frame at very low opacity. They are decorative
 * and `aria-hidden`: each one is stated properly further down the page, and a
 * screen reader announcing "markets sectors people context" over the heading
 * would be noise.
 *
 * Motion: the frame arrives on a clip reveal from `Reveal variant="media"` and
 * the photograph inside it settles from 1.03 to 1.00 over 1.4s. Both are keyed
 * off `data-visible`, and `.insight-hero-scale` carries the reduced-motion
 * case in globals.css.
 */
export function InsightHero() {
  return (
    <section className="surface-dark relative isolate overflow-hidden" aria-labelledby="insight-hero">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(70%_80%_at_12%_10%,#1a2836_0%,#0f1924_54%,#0c141d_100%)]"
      />
      <div
        aria-hidden="true"
        className="about-grid absolute inset-0 -z-10 [--about-grid-gap:8rem]"
      />

      <Container>
        <div className="grid items-center gap-x-16 gap-y-12 pt-[calc(var(--header-h)+var(--space-section-md))] pb-[var(--space-section-lg)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-20">
          <div>
            <Reveal>
              <span
                aria-hidden="true"
                className="about-rule mb-7 block h-px w-16 bg-[linear-gradient(90deg,var(--color-accent),transparent)]"
              />
              <SectionLabel>{insightContent.eyebrow}</SectionLabel>
            </Reveal>

            <Reveal delay={120} variant="mask">
              <Heading id="insight-hero" level={1} size="display" className="mt-7 max-w-[16ch]">
                {insightContent.title}
              </Heading>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-9 max-w-[54ch] text-lead text-(--color-foreground-muted)">
                {insightContent.lead}
              </p>
            </Reveal>
          </div>

          {/* The frame. Bleeds one gutter into the right margin from `lg`. */}
          <div className="relative lg:-mr-(--gutter)">
            <Reveal variant="media" delay={340}>
              <div className="relative overflow-hidden">
                <Figure
                  photo={backdrops.insights}
                  ratio="wide"
                  overlay="side"
                  className="insight-hero-scale w-full sm:aspect-[16/10] lg:aspect-[4/3]"
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  preload
                />

                {/*
                  The four words, stacked over the frame at very low opacity.
                  Faintness lives in the COLOUR rather than in an opacity an
                  animation could override - the trap documented on the
                  industries keywords and on `.arabic-mark`.
                */}
                <ul
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center gap-1 px-8 sm:px-10 lg:px-12"
                >
                  {HERO_WORDS.map((word, index) => (
                    <li
                      key={word}
                      style={{ "--word-index": index } as React.CSSProperties}
                      className="insight-hero-word num font-display-sm uppercase tracking-[0.22em] text-[clamp(0.75rem,1.1vw,0.9375rem)]"
                    >
                      {word}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

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
