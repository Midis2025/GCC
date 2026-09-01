import { CTASection } from "@/components/sections/CTASection";
import { OtherServiceLines } from "@/components/sections/OtherServiceLines";
import { EditorialStatement } from "@/components/sections/EditorialStatement";
import { MarketMap } from "@/components/sections/MarketMap";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { capabilityPhotos } from "@/data/imagery";
import { pick } from "@/content";
import { mediaArabicAr } from "@/content/ar/service-lines";
import { mediaStrategyAr } from "@/content/ar/services-depth";
import { mediaArabic as pageEn } from "@/data/service-lines";
import { gulfMarketsAr } from "@/content/ar/homepage";
import { gulfMarkets as gulfMarketsEn } from "@/data/homepage";
import { mediaStrategy as mediaStrategyEn } from "@/data/services-depth";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: pageEn.title,
  path: `/what-we-do/${pageEn.slug}`,
  description: pageEn.metaDescription,
});

/**
 * Media & Arabic Communications.
 *
 * The differentiator, and the page most likely to attract regulatory
 * attention. Two things on it are load-bearing:
 *
 * 1. The three layers are kept EXPLICITLY separate - earned decided by the
 *    publication, paid always disclosed, owned produced by us. That separation
 *    is a compliance requirement before it is an explanation, and it is why the
 *    three sit side by side as equals rather than as a single media offer.
 *
 * 2. `page.honestLine` is verbatim client-approved copy and is mandatory. It is
 *    set at statement size because it is the strongest trust signal on the site
 *    and because a compliance line nobody reads is not a compliance line.
 *
 * Design: existing system. The hero reuses the broadcast frame already in the
 * library; the three layers use the same indexed-panel treatment as elsewhere.
 */
export default async function MediaArabicPage() {
  const page = await pick({ en: pageEn, ar: mediaArabicAr });
  const mediaStrategy = await pick({ en: mediaStrategyEn, ar: mediaStrategyAr });
  /* The market list is chrome-adjacent copy shared with the footer and About. */
  const gulfMarkets = await pick({ en: gulfMarketsEn, ar: gulfMarketsAr });

  return (
    <>
      <PageHero
        variant="feature"
        photo={capabilityPhotos["media-relations"]}
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        actions={
          <Button href={page.cta.href} size="lg" withArrow>
            {page.cta.label}
          </Button>
        }
      />

      {/* Why media. */}
      <Section spacing="lg" aria-labelledby="media-why">
        <div className="grid gap-x-20 gap-y-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            <SectionLabel>{page.whyMedia.label}</SectionLabel>
            <Heading id="media-why" level={2} size="h2" className="mt-5 max-w-[14ch]">
              {page.whyMedia.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-6">
            {page.whyMedia.paragraphs.map((paragraph) => (
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
        The distinction the whole service rests on, set as a statement band.

        A single line on a photograph between two dense sections - the "why
        media" argument above and the map below - so the page has one place
        where the eye is given nothing to read but one sentence.

        COMPLIANCE: "understood" describes what the work is aimed at, not a
        claim about coverage or sentiment. The honest line further down this
        page says who decides the outcome. Do not rewrite this into a promise
        that a company will be understood.
      */}
      <EditorialStatement
        id="media-strategy"
        statement={mediaStrategy.statement}
        photo={capabilityPhotos["digital-communications"]}
        compact
      />

      {/*
        Regional reach, as a map.

        The six Gulf markets at their true coordinates, one selectable at a
        time. It replaced a drawn hub-and-branch diagram of the three layers:
        that diagram restated the separation the panels below already set out
        in full, so it was decoration standing in the way of the panels, while
        the thing this page could not show at all was WHERE the work reaches.

        COMPLIANCE: the disclaimer under the frame denies offices,
        registrations and media relationships, and states that no coverage is
        guaranteed. A map of markets is the element on this page most likely to
        be read as a promise of reach - see `mediaArabic.reach`.
      */}
      <MarketMap
        id="media-reach"
        label={page.reach.label}
        heading={page.reach.heading}
        paragraphs={page.reach.paragraphs}
        selectorLabel={page.reach.selectorLabel}
        disclaimer={page.reach.disclaimer}
        markets={gulfMarkets}
        tone="muted"
      />

      {/*
        The three layers in full.

        COMPLIANCE: do not merge these panels, do not reorder them so paid
        leads, and do not remove the "decided by the publication" and "always
        disclosed" clauses.
      */}
      <Section spacing="lg" tone="dark" aria-labelledby="media-layers">
        <Reveal>
          <SectionLabel>{page.layers.label}</SectionLabel>
          <Heading id="media-layers" level={2} size="display" className="mt-5 max-w-[14ch]">
            {page.layers.heading}
          </Heading>
        </Reveal>

        <ul className="mt-[var(--space-heading)] grid gap-x-12 gap-y-10 lg:grid-cols-3">
          {page.layers.items.map((layer, index) => (
            <li key={layer.key}>
              <Reveal delay={index * 100}>
                <div className="flex h-full flex-col border-t-2 border-(--color-accent)/45 pt-7">
                  <p className="num font-display-sm text-[0.6875rem] uppercase tracking-[0.18em] text-(--color-accent)">
                    {layer.name}
                  </p>

                  <h3 className="mt-5 max-w-[22ch] font-display text-[1.375rem] leading-snug">
                    {layer.summary}
                  </h3>

                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {layer.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/*
        THE HONEST LINE.

        Verbatim client-approved copy. Mandatory. Do not edit, shorten, split
        or paraphrase - see `data/service-lines.ts`.
      */}
      <Section spacing="lg" aria-labelledby="media-honest-line">
        <Reveal variant="mask">
          <blockquote>
            <p
              id="media-honest-line"
              className="max-w-[34ch] font-display text-h2 leading-[1.16] text-balance"
            >
              {page.honestLine}
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={200} className="mt-10">
          <span
            aria-hidden="true"
            className="about-rule block h-px w-full max-w-[16rem] bg-[linear-gradient(90deg,var(--color-accent),transparent)]"
          />
        </Reveal>
      </Section>

      {/* Arabic. */}
      <Section spacing="lg" tone="muted" aria-labelledby="media-arabic">
        <div className="grid gap-x-20 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Reveal>
              <SectionLabel>{page.arabic.label}</SectionLabel>
              <Heading id="media-arabic" level={2} size="display" className="mt-5 max-w-[13ch]">
                {page.arabic.heading}
              </Heading>
            </Reveal>

            <Reveal delay={120} className="mt-8 flex flex-col gap-5">
              {page.arabic.paragraphs.map((paragraph) => (
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
              {page.arabic.itemsLabel}
            </p>
            <div className="mt-6">
              <CheckList items={page.arabic.items} columns={1} />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Media readiness. */}
      <Section spacing="lg" aria-labelledby="media-readiness">
        <div className="grid gap-x-20 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Reveal>
              <SectionLabel>{page.readiness.label}</SectionLabel>
              <Heading
                id="media-readiness"
                level={2}
                size="h2"
                className="mt-5 max-w-[14ch]"
              >
                {page.readiness.heading}
              </Heading>
            </Reveal>

            <Reveal delay={120} className="mt-8 flex flex-col gap-5">
              {page.readiness.paragraphs.map((paragraph) => (
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
            <div className="mt-0">
              <CheckList items={page.readiness.items} columns={1} />
            </div>
          </Reveal>
        </div>
      </Section>

      <OtherServiceLines currentSlug={page.slug} />
      <CTASection />
    </>
  );
}
