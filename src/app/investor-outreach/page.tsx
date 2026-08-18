import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ProseSection } from "@/components/sections/ProseSection";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GulfNetwork } from "@/components/visuals/GulfNetwork";
import { gulfMarkets, outreachContent } from "@/data/homepage";
import {
  investorCategories,
  outreachCoverage,
  outreachCrossBorder,
  outreachHero,
  outreachMethodology,
  outreachPhilosophy,
  outreachPreparation,
  outreachRoadshows,
} from "@/data/investor-outreach";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Investor Outreach",
  path: "/investor-outreach",
  description:
    "Investor identification, market mapping and targeted outreach across Gulf capital markets, and engagement with international investors looking at the region.",
});

export default function InvestorOutreachPage() {
  return (
    <>
      <PageHero
        eyebrow={outreachHero.eyebrow}
        title={outreachHero.title}
        lead={outreachHero.lead}
        actions={
          <>
            <Button href="/contact" size="lg" withArrow>
              Start a Conversation
            </Button>
            <Button href="/services" size="lg" variant="outline">
              View All Capabilities
            </Button>
          </>
        }
      />

      <ProseSection
        id="outreach-philosophy"
        label={outreachPhilosophy.label}
        heading={outreachPhilosophy.heading}
        paragraphs={outreachPhilosophy.paragraphs}
      />

      {/* Gulf market coverage, with the same integrity caption as the homepage. */}
      <Section spacing="lg" tone="dark" aria-labelledby="outreach-coverage">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
          <Reveal>
            <SectionLabel>{outreachCoverage.label}</SectionLabel>
            <Heading id="outreach-coverage" level={2} className="mt-7 max-w-[16ch]">
              {outreachCoverage.heading}
            </Heading>

            <div className="mt-8 flex max-w-[56ch] flex-col gap-5">
              {outreachCoverage.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {gulfMarkets.map((market) => (
                <li
                  key={market.code}
                  className="border-b border-(--color-border) pb-2 text-[0.9375rem]"
                >
                  {market.label}
                </li>
              ))}
              <li className="border-b border-(--color-border) pb-2 text-[0.9375rem]">
                International Capital
              </li>
            </ul>
          </Reveal>

          <Reveal delay={140} className="lg:pl-6">
            <GulfNetwork />
            <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-(--color-foreground-subtle)">
              {outreachContent.disclaimer}
            </p>
          </Reveal>
        </div>
      </Section>

      <Section spacing="lg" aria-labelledby="outreach-categories">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <SectionLabel>Investor Categories</SectionLabel>
            <Heading id="outreach-categories" level={2} className="mt-7 max-w-[16ch]">
              Audiences We Map and Engage
            </Heading>
            <p className="mt-7 max-w-[48ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
              Which categories are relevant depends entirely on the company. Most programmes engage
              two or three of them seriously rather than all five.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <DefinitionList items={investorCategories} />
          </Reveal>
        </div>
      </Section>

      <ProseSection
        id="outreach-methodology"
        label={outreachMethodology.label}
        heading={outreachMethodology.heading}
        tone="muted"
      >
        <DefinitionList items={outreachMethodology.steps} numbered />
      </ProseSection>

      <ProseSection
        id="outreach-roadshows"
        label={outreachRoadshows.label}
        heading={outreachRoadshows.heading}
        paragraphs={outreachRoadshows.paragraphs}
      >
        <CheckList items={outreachRoadshows.items} className="mt-10" />
      </ProseSection>

      <ProseSection
        id="outreach-cross-border"
        label={outreachCrossBorder.label}
        heading={outreachCrossBorder.heading}
        paragraphs={outreachCrossBorder.paragraphs}
        tone="muted"
      />

      <ProseSection
        id="outreach-preparation"
        label={outreachPreparation.label}
        heading={outreachPreparation.heading}
        paragraphs={outreachPreparation.paragraphs}
      >
        <DefinitionList items={outreachPreparation.items} className="mt-10" />
      </ProseSection>

      <CTASection />
    </>
  );
}
