import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Showcase } from "@/components/sections/Showcase";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { backdrops, serviceLinePhotos } from "@/data/imagery";
import { commercialModelContent, serviceLines, whatWeDoHero } from "@/data/what-we-do";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "What We Do",
  path: "/what-we-do",
  description:
    "Investor roadshows, a six-month Gulf programme, media and Arabic communications, and advisory - on fixed professional fees for defined scopes of work.",
});

/**
 * What We Do - the service overview.
 *
 * All four lines on one page rather than behind a nav dropdown. The brief is
 * explicit about why: the four lines ARE the architecture of the business, a
 * dropdown hides them behind a hover, and the offer is easier to understand
 * when they are seen together.
 *
 * The commercial model sits on this page in body copy rather than in a
 * footnote, because it is a differentiator rather than a caveat. Fixed fees,
 * and three plain statements about what the firm is not paid for.
 *
 * Design: the existing system throughout - `PageHero`, `Section`, `Reveal`,
 * the indexed-row treatment already used for capabilities. No new components
 * and no new imagery; the hero reuses the frame that opened the services index
 * this page replaces.
 */
export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.services}
        eyebrow={whatWeDoHero.eyebrow}
        title={whatWeDoHero.title}
        lead={whatWeDoHero.lead}
      />

      {/*
        The four lines, in the site's signature showcase.

        Pointing at, tabbing to or touching a row cross-fades the photograph in
        the sticky panel beside it. This is the interaction the homepage used
        to carry for the old capability list; the brief removed the services
        dropdown so that the four lines are seen together, and seeing them
        together is exactly what this pattern is for.
      */}
      <Showcase
        id="service-lines"
        label="Service Lines"
        heading="Four Ways We Work"
        note="Most companies do not need all four at once. The balance is set by where a business currently stands with the region."
        items={serviceLines.map((line) => ({
          key: line.slug,
          number: line.number,
          title: line.title,
          summary: line.summary,
          href: line.href,
          photo: serviceLinePhotos[line.photoKey],
        }))}
      />

      {/*
        The commercial model.

        COMPLIANCE: the three exclusions are statements about compensation and
        they are load-bearing. Do not soften, merge or move them into a
        footnote - see the header of `data/what-we-do.ts`.
      */}
      <Section spacing="lg" tone="muted" aria-labelledby="commercial-model">
        <div className="grid gap-x-20 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Reveal>
              <SectionLabel>{commercialModelContent.label}</SectionLabel>
              <Heading
                id="commercial-model"
                level={2}
                size="h2"
                className="mt-5 max-w-[14ch]"
              >
                {commercialModelContent.heading}
              </Heading>
            </Reveal>

            <Reveal delay={120} className="mt-8 flex flex-col gap-5">
              {commercialModelContent.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>

          <div className="lg:pt-2">
            <Reveal delay={160}>
              <p className="text-label uppercase text-(--color-foreground-subtle)">
                {commercialModelContent.exclusionsLabel}
              </p>
            </Reveal>

            <dl className="mt-7 flex flex-col">
              {commercialModelContent.exclusions.map((item, index) => (
                <Reveal key={item.term} delay={200 + index * 90}>
                  <div className="border-t border-(--color-border) py-6">
                    <dt className="flex items-baseline gap-4 text-[1.0625rem] font-medium">
                      <span
                        aria-hidden="true"
                        className="num font-display-sm text-[0.625rem] tracking-[0.14em] text-(--color-accent)"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.term}
                    </dt>
                    <dd className="mt-2.5 max-w-[46ch] pl-8 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                      {item.description}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
