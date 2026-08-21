import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { StatementBand } from "@/components/sections/StatementBand";
import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { backdrops, industryPhotos } from "@/data/imagery";
import { industries, industriesApproach, industriesContent, industriesHero } from "@/data/industries";
import { gulfMarkets } from "@/data/homepage";
import { cn } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Industries",
  path: "/industries",
  description:
    "Sector context across Gulf capital markets: financial services, energy, real estate, industrials, logistics and technology, and the communication demands each carries.",
});

/**
 * Industries.
 *
 * Six sectors as full-width alternating bands rather than a card grid - the
 * services index already owns the sticky-rail-plus-blocks pattern, and the
 * segment mosaic on the homepage already owns the panel grid. Here each sector
 * gets a wide photographic band with the index numeral overlapping the image
 * edge, which is a shape used nowhere else on the site.
 *
 * Content integrity: this page describes SECTORS, not clients. Every line is
 * written about the industry's conditions rather than about GCC's work in it,
 * and `industriesContent.note` marks the coverage as indicative pending
 * confirmation. See the header comment in `data/industries.ts`.
 */
export default function IndustriesPage() {
  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.industries}
        eyebrow={industriesHero.eyebrow}
        title={industriesHero.title}
        lead={industriesHero.lead}
      />

      {/* Opening statement, with the indicative-coverage note held beside it. */}
      <Section spacing="lg" aria-labelledby="industries-intro">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <Reveal>
            <SectionLabel>{industriesContent.label}</SectionLabel>
            <Heading id="industries-intro" level={2} size="display" className="mt-5 max-w-[16ch]">
              {industriesContent.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-[52ch] text-lead text-(--color-foreground-muted)">
              {industriesContent.intro}
            </p>
            <p className="mt-5 text-sm text-(--color-foreground-subtle)">
              {industriesContent.note}
            </p>
          </Reveal>
        </div>
      </Section>

      {/*
        Sector bands. The photograph runs to one viewport edge and the content
        column sits opposite, alternating down the page. The oversized numeral
        overlaps the join between the two, which is what stops each band
        reading as a plain two-column row.
      */}
      <ul>
        {industries.map((industry, index) => {
          const imageLeft = index % 2 === 0;

          return (
            <li key={industry.slug}>
              <Section
                spacing="md"
                tone={imageLeft ? "canvas" : "muted"}
                aria-labelledby={`industry-${industry.slug}`}
                id={industry.slug}
                className="scroll-mt-[calc(var(--header-h)+2rem)]"
              >
                <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
                  <Reveal
                    variant="media"
                    className={cn(
                      "relative",
                      // One gutter, read from the token rather than restated,
                      // so the frame stays flush to the page edge at every
                      // width instead of only at lg and xl.
                      imageLeft ? "lg:-ml-(--gutter)" : "lg:order-2 lg:-mr-(--gutter)",
                    )}
                  >
                    <Figure
                      photo={industryPhotos[industry.slug]}
                      ratio="wide"
                      overlay="veil"
                      sizes="(min-width: 1024px) 48vw, 100vw"
                    />
                  </Reveal>

                  <div className={cn("relative", !imageLeft && "lg:order-1")}>
                    {/*
                      Ghosted numeral, pulled toward the image so it sits over
                      the gutter between the columns.
                    */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute -top-10 hidden num text-numeral leading-none text-(--color-accent)/15 lg:block",
                        imageLeft ? "-left-10" : "-right-10",
                      )}
                    >
                      {industry.number}
                    </span>

                    <Reveal>
                      <span className="num font-display-sm text-sm text-(--color-accent) lg:hidden">
                        {industry.number}
                      </span>

                      <Heading
                        id={`industry-${industry.slug}`}
                        level={2}
                        size="h2"
                        className="mt-3 max-w-[16ch] lg:mt-0"
                      >
                        {industry.title}
                      </Heading>

                      <p className="mt-5 max-w-[50ch] text-lead text-(--color-foreground-muted)">
                        {industry.summary}
                      </p>

                      <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                        {industry.challenge}
                      </p>
                    </Reveal>

                    <Reveal delay={120}>
                      <h3 className="mt-8 text-label uppercase text-(--color-foreground-subtle)">
                        Where the work concentrates
                      </h3>
                      <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                        {industry.focus.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 border-b border-(--color-border) py-2.5 text-[0.9375rem]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1 w-1 shrink-0 bg-(--color-accent)"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  </div>
                </div>
              </Section>
            </li>
          );
        })}
      </ul>

      <StatementBand
        id="industries-approach"
        label={industriesApproach.label}
        heading={industriesApproach.heading}
        paragraphs={industriesApproach.paragraphs}
      />

      {/* Markets, so the page closes on the region rather than on a sector. */}
      <Section spacing="md" aria-labelledby="industries-markets">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <Reveal>
            <SectionLabel>Markets</SectionLabel>
            <Heading id="industries-markets" level={2} size="h2" className="mt-5 max-w-[16ch]">
              Applied Across Gulf Markets
            </Heading>
          </Reveal>

          <Reveal delay={120}>
            <ul className="flex flex-wrap gap-x-3 gap-y-3">
              {gulfMarkets.map((market) => (
                <li
                  key={market.code}
                  className="border border-(--color-border) px-4 py-2 text-[0.9375rem]"
                >
                  {market.label}
                </li>
              ))}
              <li className="border border-(--color-accent)/45 px-4 py-2 text-[0.9375rem] text-(--color-accent)">
                International
              </li>
            </ul>

            <div className="mt-8">
              <Button href="/services" variant="outline" withArrow>
                View Our Capabilities
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
