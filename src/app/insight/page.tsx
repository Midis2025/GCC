import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Reveal } from "@/components/ui/Reveal";
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
        Format navigation.

        It is NAVIGATION, not a filter, and the distinction is the whole reason
        it can exist on a page with an empty library. A filter row implies a
        body of work to sift; these are anchors onto the four standing format
        descriptions below, so following one lands on a real explanation of what
        that series is and when it arrives rather than on an empty result set.

        Every target is an id already carried by the sequence below - the same
        ids the article pages deep-link back to - so this adds a route through
        the page and no new state, no client JavaScript and nothing that can
        fall out of step with the content.

        Scrolls horizontally on a phone rather than wrapping to three ragged
        rows. `-mx-(--gutter)` with matching padding lets it bleed to the screen
        edge as a scroller should, while the first item still lines up with the
        heading above it.
      */}
      <Section spacing="md" aria-label="Insight formats">
        <nav>
          {/*
            A masthead rather than a row of links.

            Each format is a column: index, name, cadence and its own gold rule
            that draws on hover. A publication's contents page states what runs
            and how often before it lists anything, and with the library empty
            that is the only honest thing this page can put above the fold -
            four standing series and their schedule.

            Below `sm` it becomes a horizontal scroller: four columns at 375px
            would be four ragged single-word stacks, and the columns each hold
            their width and scroll instead. Verified reachable - the last item
            can be scrolled to and every anchor resolves.
          */}
          <ul className="-mx-(--gutter) flex snap-x snap-mandatory gap-x-6 overflow-x-auto px-(--gutter) pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {insightFormats.map((format, index) => (
              <li
                key={format.id}
                className="w-[13rem] shrink-0 snap-start sm:w-auto"
              >
                <Reveal delay={index * 90}>
                  <a
                    href={`#${format.id}`}
                    className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                  >
                    <span className="relative block h-px w-full bg-(--color-border)">
                      {/*
                        Transform rather than width, so the rule animates on the
                        compositor and cannot reflow the column beside it.
                      */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 block origin-left scale-x-0 bg-(--color-accent) transition-transform duration-[600ms] ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      />
                    </span>

                    <span
                      aria-hidden="true"
                      className="mt-5 block num font-display-sm text-[0.625rem] tracking-[0.14em] text-(--color-accent)"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="mt-3 block font-display text-[1.25rem] leading-snug transition-colors duration-500 group-hover:text-(--color-accent)">
                      {format.name}
                    </span>

                    <span className="mt-2.5 block text-label uppercase text-(--color-foreground-subtle)">
                      {format.cadence}
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

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
