import { AdvisoryAreas } from "@/components/sections/AdvisoryAreas";
import { CTASection } from "@/components/sections/CTASection";
import { OtherServiceLines } from "@/components/sections/OtherServiceLines";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { backdrops } from "@/data/imagery";
import { pick } from "@/content";
import { advisoryAr } from "@/content/ar/service-lines";
import { advisory as pageEn } from "@/data/service-lines";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: pageEn.title,
  path: `/what-we-do/${pageEn.slug}`,
  description: pageEn.metaDescription,
});

/**
 * Advisory.
 *
 * Deliberately the shortest of the four service pages. It is written work
 * rather than a programme, and a page that padded it out would misrepresent
 * the size of the engagement.
 *
 * COMPLIANCE: the intro states plainly that Gulf Connect does not make
 * investment recommendations and does not advise on the merits of any
 * security. That sentence is not decoration - "advisory" is a word that
 * carries regulated meaning, and the page has to say which sense it is using.
 *
 * Design: existing system. The hero reuses the interior frame already in the
 * library rather than introducing photography.
 */
export default async function AdvisoryPage() {
  const page = await pick({ en: pageEn, ar: advisoryAr });

  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.advisory}
        eyebrow={page.eyebrow}
        index={page.number}
        title={page.title}
        lead={page.lead}
        actions={
          <Button href={page.cta.href} size="lg" withArrow>
            {page.cta.label}
          </Button>
        }
      />

      <Section spacing="lg" aria-labelledby="advisory-intro">
        <div className="grid gap-x-20 gap-y-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            <SectionLabel>{page.intro.label}</SectionLabel>
            <Heading id="advisory-intro" level={2} size="h2" className="mt-5 max-w-[14ch]">
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

      <Section spacing="lg" tone="muted" aria-labelledby="advisory-areas">
        <Reveal>
          <SectionLabel>{page.areas.label}</SectionLabel>
          <Heading id="advisory-areas" level={2} size="display" className="mt-5 max-w-[14ch]">
            {page.areas.heading}
          </Heading>
        </Reveal>

        <Reveal delay={140} className="mt-[var(--space-heading)]">
          <DefinitionList items={page.areas.items} numbered columns={2} />
        </Reveal>
      </Section>

      {/*
        The five areas in detail: what each addresses, and what each involves.

        This page was the thinnest of the four service lines - a hero, an
        intro, one summary list and the footer. Advisory is also the least
        tangible of the four, with no room and no publication to point at, so
        naming the situation each area exists to address is how the work is
        made concrete.

        COMPLIANCE: the listing-assessment entry ends on the boundary of the
        work - not advice on the merits of listing, or on any security. That
        item is a qualifier, not a bullet. See `AdvisoryAreas`.
      */}
      <AdvisoryAreas />

      <OtherServiceLines currentSlug={page.slug} />
      <CTASection />
    </>
  );
}
