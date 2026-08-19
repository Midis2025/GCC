import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { StatementBand } from "@/components/sections/StatementBand";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GulfNetwork } from "@/components/visuals/GulfNetwork";
import { backdrops, capabilityPhotos, photos } from "@/data/imagery";
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
import { cn } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Investor Outreach",
  path: "/investor-outreach",
  description:
    "Investor identification, market mapping and targeted outreach across Gulf capital markets, and engagement with international investors looking at the region.",
});

/**
 * Investor outreach.
 *
 * The deepest page on the site, so its sections are sequenced to keep changing
 * shape: photographic hero, sticky-statement philosophy, dark coverage split
 * with the market diagram, an editorial index of investor categories, a
 * zig-zag methodology timeline, an image-backed roadshow split, a centred
 * cross-border statement, and a preparation list.
 *
 * Compliance: every section describes process. Nothing here promises
 * introductions, meetings, funding, valuation or transaction outcomes, and no
 * claim is made about the size or composition of any investor network.
 */
export default function InvestorOutreachPage() {
  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.outreach}
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
      >
        <ul className="flex flex-wrap gap-x-3 gap-y-3 border-t border-white/15 pt-8">
          {gulfMarkets.map((market) => (
            <li
              key={market.code}
              className="border border-white/20 px-4 py-2 text-[0.9375rem] text-(--color-foreground-muted)"
            >
              {market.label}
            </li>
          ))}
          <li className="border border-(--color-accent)/45 px-4 py-2 text-[0.9375rem] text-(--color-accent)">
            International Capital
          </li>
        </ul>
      </PageHero>

      {/* Philosophy - sticky statement, prose right, closing on a pull-quote. */}
      <Section spacing="lg" aria-labelledby="outreach-philosophy">
        <div className="grid gap-x-20 gap-y-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            <div className="lg:sticky lg:top-[calc(var(--header-h)+4rem)]">
              <SectionLabel>{outreachPhilosophy.label}</SectionLabel>
              <Heading
                id="outreach-philosophy"
                level={2}
                size="display"
                className="mt-5 max-w-[11ch]"
              >
                {outreachPhilosophy.heading}
              </Heading>
            </div>
          </Reveal>

          <div>
            <Reveal delay={120} className="flex flex-col gap-6">
              {outreachPhilosophy.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={200}>
              <blockquote className="mt-12 border-l-2 border-(--color-accent) pl-7">
                <p className="max-w-[30ch] font-display text-h3 leading-snug text-balance">
                  A shorter list than companies expect, and a materially higher proportion of
                  conversations worth the management time.
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Market coverage - dark split carrying the diagram. */}
      <Section
        spacing="lg"
        tone="dark"
        aria-labelledby="outreach-coverage"
        className="relative isolate overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(80%_90%_at_75%_10%,#1a2836_0%,#0f1924_55%,#0c141d_100%)]"
        />

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
          <div>
            <Reveal>
              <SectionLabel>{outreachCoverage.label}</SectionLabel>
              <Heading id="outreach-coverage" level={2} size="display" className="mt-5 max-w-[14ch]">
                {outreachCoverage.heading}
              </Heading>
            </Reveal>

            <Reveal delay={120} className="mt-8 flex max-w-[56ch] flex-col gap-5">
              {outreachCoverage.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal delay={160} className="border border-white/12 bg-white/[0.035] p-7 backdrop-blur-sm sm:p-9">
            <GulfNetwork />
            <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-(--color-foreground-subtle)">
              {outreachContent.disclaimer}
            </p>
          </Reveal>
        </div>
      </Section>

      {/*
        Investor categories, set as an editorial index: term left, description
        right, separated by full-width rules. A table of contents rather than a
        grid of cards.
      */}
      <Section spacing="lg" aria-labelledby="outreach-categories">
        <div className="grid gap-x-20 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <Reveal>
            <SectionLabel>Investor Categories</SectionLabel>
            <Heading id="outreach-categories" level={2} size="display" className="mt-5 max-w-[14ch]">
              Audiences We Map and Engage
            </Heading>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-[48ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
              Which categories are relevant depends entirely on the company. Most programmes engage
              two or three of them seriously rather than all five.
            </p>
          </Reveal>
        </div>

        <dl className="mt-[var(--space-heading)] border-t border-(--color-border)">
          {investorCategories.map((category, index) => (
            <Reveal key={category.term} delay={index * 60}>
              <div className="grid gap-x-12 gap-y-3 border-b border-(--color-border) py-8 lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.25fr)] lg:items-baseline">
                <span aria-hidden="true" className="num font-display-sm text-sm text-(--color-accent)">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <dt className="font-display text-h3">{category.term}</dt>
                <dd className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                  {category.description}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/*
        Methodology - a zig-zag timeline. One central spine on large screens
        with steps alternating either side; a single left spine below that.
      */}
      <Section spacing="lg" tone="muted" aria-labelledby="outreach-methodology">
        <Reveal className="max-w-2xl">
          <SectionLabel>{outreachMethodology.label}</SectionLabel>
          <Heading id="outreach-methodology" level={2} size="display" className="mt-5">
            {outreachMethodology.heading}
          </Heading>
        </Reveal>

        <ol className="relative mt-[var(--space-heading)] max-w-5xl">
          <span
            aria-hidden="true"
            className="absolute left-[0.4375rem] top-3 bottom-3 w-px bg-(--color-foreground)/15 lg:left-1/2 lg:-translate-x-1/2"
          />

          {outreachMethodology.steps.map((step, index) => {
            const isRight = index % 2 === 1;

            return (
              <li
                key={step.term}
                className={cn(
                  "relative pb-11 pl-9 last:pb-0",
                  "lg:grid lg:grid-cols-2 lg:gap-x-16 lg:pl-0",
                )}
              >
                <Reveal
                  delay={index * 80}
                  className={cn(
                    "relative",
                    isRight ? "lg:col-start-2 lg:pl-12" : "lg:col-start-1 lg:pr-12 lg:text-right",
                  )}
                >
                  {/*
                    Marker, centred on the spine at each breakpoint.

                    Below `lg` the spine is at 0.4375rem and this box starts at
                    the list item's 2.25rem padding, so -2.25rem lands it flush.

                    At `lg` the spine runs down the centre of a two-column grid
                    with a 4rem gutter, so the column edge is 2rem from it. The
                    marker's own half-width (0.4375rem) has to come off as well,
                    which is what makes the offset 2.4375rem rather than the
                    column padding.
                  */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-9 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-(--color-surface-muted)",
                      isRight ? "lg:-left-[2.4375rem]" : "lg:left-auto lg:-right-[2.4375rem]",
                    )}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
                  </span>

                  <span className="num font-display-sm text-sm text-(--color-accent)">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2.5 font-display text-h3">{step.term}</h3>
                  <p
                    className={cn(
                      "mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)",
                      !isRight && "lg:ml-auto",
                    )}
                  >
                    {step.description}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* Roadshows - image left, checklist right. */}
      <Section spacing="lg" aria-labelledby="outreach-roadshows">
        <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <Reveal variant="media" className="lg:sticky lg:top-[calc(var(--header-h)+4rem)]">
            <Figure
              photo={capabilityPhotos["investor-outreach"]}
              ratio="tall"
              overlay="veil"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </Reveal>

          <div>
            <Reveal>
              <SectionLabel>{outreachRoadshows.label}</SectionLabel>
              <Heading id="outreach-roadshows" level={2} size="display" className="mt-5 max-w-[15ch]">
                {outreachRoadshows.heading}
              </Heading>

              <div className="mt-8 flex flex-col gap-5">
                {outreachRoadshows.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-[60ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <CheckList items={outreachRoadshows.items} columns={1} className="mt-10" />
            </Reveal>
          </div>
        </div>
      </Section>

      <StatementBand
        id="outreach-cross-border"
        label={outreachCrossBorder.label}
        heading={outreachCrossBorder.heading}
        paragraphs={outreachCrossBorder.paragraphs}
      />

      {/* Preparation and follow-up. */}
      <Section spacing="lg" aria-labelledby="outreach-preparation">
        <div className="grid gap-x-20 gap-y-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <Reveal>
              <SectionLabel>{outreachPreparation.label}</SectionLabel>
              <Heading
                id="outreach-preparation"
                level={2}
                size="display"
                className="mt-5 max-w-[13ch]"
              >
                {outreachPreparation.heading}
              </Heading>

              <div className="mt-8 flex flex-col gap-5">
                {outreachPreparation.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={160} className="mt-10">
              <Figure
                photo={photos.regionStreet}
                ratio="wide"
                overlay="veil"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </Reveal>
          </div>

          <dl className="flex flex-col lg:pt-3">
            {outreachPreparation.items.map((item, index) => (
              <Reveal key={item.term} delay={index * 70}>
                <div className="border-l-2 border-(--color-accent)/35 py-5 pl-7 transition-colors duration-500 hover:border-(--color-accent)">
                  <dt className="text-[1.0625rem] font-medium">{item.term}</dt>
                  <dd className="mt-2 max-w-[54ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {item.description}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
