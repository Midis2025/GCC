import { CTASection } from "@/components/sections/CTASection";
import { OtherServiceLines } from "@/components/sections/OtherServiceLines";
import { PageHero } from "@/components/sections/PageHero";
import { StageSequence } from "@/components/sections/StageSequence";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { insightPhotos } from "@/data/imagery";
import { pick } from "@/content";
import { gulfProgrammeAr } from "@/content/ar/service-lines";
import { gulfProgramme as pageEn } from "@/data/service-lines";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: pageEn.title,
  path: `/what-we-do/${pageEn.slug}`,
  description: pageEn.metaDescription,
});

/**
 * The Gulf Programme - the six-month retainer.
 *
 * The page has to make the case for continuity over a single visit, so the
 * six-month structure is set out month by month as a measured column rather
 * than described in prose. Six rows of concrete work is the argument.
 *
 * It closes on reporting, deliberately: monthly written reporting on meetings
 * held, content published and outlets pitched. Saying plainly that the work is
 * reported signals the firm expects to be measured on it - and every item
 * reported is an activity, never an outcome.
 *
 * Design: existing system. Hero reuses a frame already in the library.
 */
export default async function GulfProgrammePage() {
  const page = await pick({ en: pageEn, ar: gulfProgrammeAr });

  return (
    <>
      <PageHero
        variant="feature"
        photo={insightPhotos[1]}
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        actions={
          <Button href={page.cta.href} size="lg" withArrow>
            {page.cta.label}
          </Button>
        }
      />

      {/* Why six months. */}
      <Section spacing="lg" aria-labelledby="programme-intro">
        <div className="grid gap-x-20 gap-y-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            <SectionLabel>{page.intro.label}</SectionLabel>
            <Heading id="programme-intro" level={2} size="h2" className="mt-5 max-w-[12ch]">
              {page.intro.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-6">
            {page.intro.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </Section>

      {/*
        The six months, as a scroll-driven sequence.

        Each month takes the reading position in turn, its index turning
        bronze as it does. A table was the first attempt and was wrong at
        390px - six columns of short phrases either wrap into noise or scroll
        sideways out of view. A sequence stacks cleanly and reads as a
        progression, which is what six months of a programme actually is.
      */}
      <StageSequence
        id="programme-structure"
        label={page.structure.label}
        heading={page.structure.heading}
        stages={page.structure.months.map((month) => ({
          term: month.focus,
          /*
            The span is set as real text rather than folded into the margin
            index. Rewriting "Month 1" into "01" for the index worked only
            because the six spans happen to be single months - a span of
            "Months 1-2" would have come out as nonsense - and the sequence
            already numbers its own entries.
          */
          meta: month.span,
          description: month.detail,
          items: month.items,
        }))}
      />

      {/* Standard and Premium. No prices. */}
      <Section spacing="lg" aria-labelledby="programme-tiers">
        <Reveal>
          <SectionLabel>{page.tiers.label}</SectionLabel>
          <Heading id="programme-tiers" level={2} size="display" className="mt-5 max-w-[14ch]">
            {page.tiers.heading}
          </Heading>
        </Reveal>

        <ul className="mt-[var(--space-heading)] grid gap-x-16 gap-y-12 lg:grid-cols-2">
          {page.tiers.items.map((tier, index) => (
            <li key={tier.name}>
              <Reveal delay={index * 100}>
                <div className="border-t border-(--color-border) pt-7">
                  <h3 className="text-h3 font-medium tracking-tight">{tier.name}</h3>
                  <div className="mt-7">
                    <CheckList items={tier.includes} columns={1} />
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={220}>
          <p className="mt-12 max-w-[62ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-subtle)">
            {page.tiers.note}
          </p>
        </Reveal>
      </Section>

      {/* Reporting. */}
      <Section spacing="lg" tone="muted" aria-labelledby="programme-reporting">
        <div className="grid gap-x-20 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Reveal>
              <SectionLabel>{page.reporting.label}</SectionLabel>
              <Heading
                id="programme-reporting"
                level={2}
                size="h2"
                className="mt-5 max-w-[14ch]"
              >
                {page.reporting.heading}
              </Heading>
            </Reveal>

            <Reveal delay={120} className="mt-8 flex flex-col gap-5">
              {page.reporting.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal delay={160} className="lg:pt-3">
            <p className="text-label uppercase text-(--color-foreground-subtle)">
              {page.reporting.itemsLabel}
            </p>
            <div className="mt-6">
              <CheckList items={page.reporting.items} columns={1} />
            </div>
          </Reveal>
        </div>
      </Section>

      <OtherServiceLines currentSlug={page.slug} />
      <CTASection />
    </>
  );
}
