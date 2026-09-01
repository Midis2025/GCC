import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { PhaseJourney } from "@/components/sections/PhaseJourney";
import { Section } from "@/components/sections/Section";
import { OtherServiceLines } from "@/components/sections/OtherServiceLines";
import { StageSequence } from "@/components/sections/StageSequence";
import { Button } from "@/components/ui/Button";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getDictionary, pick } from "@/content";
import { investorRoadshowsAr } from "@/content/ar/service-lines";
import { capabilityPhotos } from "@/data/imagery";
import { investorRoadshows as pageEn } from "@/data/service-lines";
import { createMetadata } from "@/lib/seo";

/*
  Metadata stays English-sourced at module scope.

  `createMetadata` runs where `next/root-params` is not available, and the
  route's canonical, its path and its slug are the same in both editions. The
  page's visible copy below is localised; its <title> follows the site's
  existing metadata architecture, which is out of scope for this change.
*/
export const metadata = createMetadata({
  title: pageEn.title,
  path: `/what-we-do/${pageEn.slug}`,
  description: pageEn.metaDescription,
});

/**
 * Investor Roadshows - the entry product.
 *
 * The page where specificity sells: named cities, a stated number of meetings,
 * a named group format, a briefing pack, a report and a follow-up window. The
 * brief is right that concrete beats adjectival here, and every number on this
 * page describes what is PREPARED rather than what results.
 *
 * The "What we do not do" block is deliberate and sits on the page rather than
 * in a footnote. It is three statements about an unlicensed firm's boundaries,
 * and it is the most load-bearing copy on the page - see `data/service-lines.ts`.
 *
 * Design: existing system throughout. The hero reuses the conference-hall frame
 * already in the library; no new photography is introduced.
 */
export default async function InvestorRoadshowsPage() {
  const page = await pick({ en: pageEn, ar: investorRoadshowsAr });
  const t = await getDictionary();

  return (
    <>
      <PageHero
        variant="feature"
        photo={capabilityPhotos["investor-outreach"]}
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

      {/* What a programme is. */}
      <Section spacing="lg" aria-labelledby="roadshow-intro">
        <div className="grid gap-x-20 gap-y-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            <SectionLabel>{page.intro.label}</SectionLabel>
            <Heading id="roadshow-intro" level={2} size="h2" className="mt-5 max-w-[14ch]">
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

      {/* The two-day format. */}
      <Section spacing="lg" tone="muted" aria-labelledby="roadshow-format">
        <Reveal>
          <SectionLabel>{page.format.label}</SectionLabel>
          <Heading id="roadshow-format" level={2} size="display" className="mt-5 max-w-[14ch]">
            {page.format.heading}
          </Heading>
          <p className="mt-7 max-w-[56ch] text-lead text-(--color-foreground-muted)">
            {page.format.intro}
          </p>
        </Reveal>

        <Reveal delay={140} className="mt-[var(--space-heading)]">
          <DefinitionList items={page.format.items} numbered columns={2} />
        </Reveal>
      </Section>

      {/*
        Before, during and after.

        The page said what a programme costs to attend and what tier it sits
        in, and never said what the work actually contains. Three phases on one
        rule - the same station construction the five-stage Approach uses,
        because both are sequences of work over time and the site should say
        that the same way twice rather than invent a second grammar.
      */}
      <PhaseJourney />

      {/*
        The four formats, as a scroll-driven sequence.

        Whichever format is crossing the reading position takes the bronze
        index and full strength while the others go quiet, with the oversized
        ghosted numeral behind each. Same mechanism as the About page - one
        observer, no scroll listener.
      */}
      <StageSequence
        id="roadshow-tiers"
        label={page.tiers.label}
        heading={page.tiers.heading}
        intro={page.tiers.note}
        stages={page.tiers.items.map((tier) => ({
          term: tier.name,
          /*
            The duration goes in the description line rather than the margin
            index. "Around a regional conference" is a phrase, not a numeral,
            and setting it at index size would break the column it sits in.
          */
          description: tier.duration,
          items: tier.includes,
        }))}
      />

      {/* Media included. */}
      <Section spacing="md" tone="dark" aria-labelledby="roadshow-media">
        <div className="grid gap-x-20 gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <Reveal>
            <Heading id="roadshow-media" level={2} size="h2" className="max-w-[12ch]">
              {page.media.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-5">
              {page.media.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8">
              {/*
                The service line is named from the chrome dictionary, so this
                button, the header dropdown and the footer all call it the same
                thing in whichever language is rendering.
              */}
              <Button href="/what-we-do/media-arabic-communications" variant="outline" withArrow>
                {t.nav.services.mediaArabic}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/*
        COMPLIANCE. Three statements of what this firm does not do, on the
        page rather than in the footer. Do not move, merge or soften.
      */}
      <Section spacing="lg" aria-labelledby="roadshow-boundaries">
        <div className="grid gap-x-20 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            <SectionLabel>{page.notWhatWeDo.label}</SectionLabel>
            <Heading
              id="roadshow-boundaries"
              level={2}
              size="h2"
              className="mt-5 max-w-[12ch]"
            >
              {page.notWhatWeDo.heading}
            </Heading>
          </Reveal>

          <div>
            <ul className="flex flex-col">
              {page.notWhatWeDo.items.map((item, index) => (
                <Reveal key={item} delay={index * 90}>
                  <li className="border-t border-(--color-border) py-6 text-[1.25rem] leading-snug sm:text-[1.375rem]">
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={320}>
              <p className="mt-8 max-w-[60ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                {page.notWhatWeDo.note}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <OtherServiceLines currentSlug={page.slug} />
      <CTASection />
    </>
  );
}
