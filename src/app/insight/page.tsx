import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { StageSequence } from "@/components/sections/StageSequence";
import { backdrops } from "@/data/imagery";
import { insightContent, insightFormats, itemsByFormat } from "@/data/insight";
import { formatDate } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Insight",
  path: "/insight",
  description:
    "The Gulf Brief, Five Questions, Sector Notes and From the Room - four recurring formats covering Gulf capital markets and the sectors Gulf Connect works in.",
});

/**
 * Insight - the content library.
 *
 * Organised by format, not by date. Each of the four gets a standing block
 * with its name, cadence and description, and its own items listed beneath it.
 *
 * While the library is empty, the formats still render - that is the point of
 * organising this way. A reader learns what The Gulf Brief is and when it
 * arrives before a single one has been published, which is exactly what a
 * chronological feed cannot do from a standing start.
 *
 * What does NOT render is a placeholder item. No skeleton cards, no "coming
 * soon" tiles, no sample posts. One honest sentence, then the formats.
 */
export default function InsightPage() {
  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.insights}
        eyebrow={insightContent.eyebrow}
        title={insightContent.title}
        lead={insightContent.lead}
      />

      {/*
        The four formats, as the site's scroll-driven sequence.

        Each format holds the reading position in turn, its index turning
        bronze as it does. That treatment does real work on a page whose
        library is empty: with nothing published, a static list of four
        headings reads as four things that have not happened, and a sequence
        reads as a standing schedule.

        Published pieces are passed as `links`, so a format with items lists
        them under its description and a format without renders nothing extra.
      */}
      <StageSequence
        id="insight-formats"
        label="Formats"
        heading="Four Recurring Series"
        /*
          The empty note is the sequence's intro line while nothing is
          published, and disappears the moment anything is - phrased as a
          statement of fact rather than a promise with a date on it.
        */
        intro={
          insightFormats.every((format) => itemsByFormat(format.id).length === 0)
            ? insightContent.emptyNote
            : undefined
        }
        stages={insightFormats.map((format) => ({
          anchor: format.id,
          term: format.name,
          meta: format.cadence,
          description: format.description,
          links: itemsByFormat(format.id).map((item) => ({
            href: `/insight/${item.slug}`,
            label: item.title,
            meta: formatDate(item.date),
          })),
        }))}
      />

      <CTASection />
    </>
  );
}
