import { Section } from "@/components/sections/Section";
import {
  BilingualSection,
  EditorialPrinciplesSection,
  InsightCtaSection,
  InsightSystemSection,
} from "@/components/sections/insight/InsightClosing";
import {
  EditorialThemesSection,
  FiveQuestionsSection,
  FixedFormatStatement,
  FromTheRoomSection,
  GulfBriefSection,
  SectorNotesSection,
} from "@/components/sections/insight/InsightFormats";
import {
  InsightHero,
  InsightPosition,
  InsightSectors,
} from "@/components/sections/insight/InsightOpening";
import { Reveal } from "@/components/ui/Reveal";
import { insightFormats } from "@/data/insight";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Insight",
  path: "/insight",
  description:
    "The Gulf Brief, Five Questions, Sector Notes and From the Room - four recurring formats covering Gulf capital markets and the sectors Gulf Connect works in.",
});

/**
 * ============================================================================
 * INSIGHT
 * ============================================================================
 * An editorial product rather than a content listing.
 *
 * ---------------------------------------------------------------------------
 * The organising decision
 * ---------------------------------------------------------------------------
 * Each of the four formats gets its OWN section with its own composition,
 * rather than four entries in one sequence. That is what lets the page say
 * something true about them: The Gulf Brief is a written column, Five Questions
 * is a film, Sector Notes is a document and From the Room is a room. Four rows
 * of one component said only that there are four of them.
 *
 * Each format section keeps the id the old sequence carried - `#gulf-brief`,
 * `#five-questions`, `#sector-notes`, `#from-the-room` - so the navigation
 * below and the deep links from individual article pages both keep working.
 *
 * ---------------------------------------------------------------------------
 * Rhythm
 * ---------------------------------------------------------------------------
 * No two neighbours share a ground, and no two share a composition:
 *
 *   Hero            dark      asymmetric, photograph bleeding right
 *   Position        canvas    statement | rule | two paragraphs
 *   What We Follow  muted     three staggered sector panels
 *   Navigation      canvas    four-column masthead
 *   Gulf Brief      canvas    editorial split, photograph left
 *   Topics          dark      numbered headline list
 *   Five Questions  dark*     cinematic still over a five-station measure
 *   Fixed Format    muted     typography only, no image
 *   Sector Notes    canvas    research document on a rule field
 *   From the Room   dark      full-bleed photographic
 *   System          dark*     drawn diagram
 *   EN / AR         muted     two words either side of a connector
 *   Principles      canvas    staggered, oversized numerals
 *   CTA             dark      image-backed
 *
 * (*) Topics into Five Questions, and From the Room into System, are the two
 * dark-on-dark joins. Both are deliberate: the pairs are one argument each -
 * what the library may write about and the format it writes in; what a film
 * shows and where the library sits - and separating either with a light band
 * would have broken the argument to satisfy a rule about alternation.
 *
 * ---------------------------------------------------------------------------
 * Empty-state logic
 * ---------------------------------------------------------------------------
 * There are no published items and the page never pretends otherwise. Every
 * format section renders its own `PublishedItems`, which returns null when the
 * format has none - no skeletons, no "coming soon", no sample entries with
 * invented dates or authors.
 *
 * `editorialThemes` are the one thing that could be mistaken for a contents
 * page, and they are handled carefully: no dates, no authors, no links, and a
 * standing label above the list rather than under it. See the note on
 * `EditorialThemesSection`.
 *
 * The page carries no `CTASection`. The sitewide band routes to Contact, and a
 * reader who has come this far down Insight wants the investor list instead.
 */
export default function InsightPage() {
  return (
    <>
      <InsightHero />
      <InsightPosition />
      <InsightSectors />

      {/*
        Format navigation.

        NAVIGATION, not a filter, and the distinction is what lets it exist on
        a page with an empty library: a filter implies a body of work to sift
        and would return nothing, where these anchor onto four standing format
        sections that each explain themselves.

        A four-column masthead from `sm` up and a horizontal scroller below it.
        Verified that it scrolls, that the last item is reachable and that
        every anchor resolves.
      */}
      <Section spacing="md" aria-label="Insight formats">
        <nav>
          <ul className="-mx-(--gutter) flex snap-x snap-mandatory gap-x-6 overflow-x-auto px-(--gutter) pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {insightFormats.map((format, index) => (
              <li key={format.id} className="w-[13rem] shrink-0 snap-start sm:w-auto">
                <Reveal delay={index * 90}>
                  <a
                    href={`#${format.id}`}
                    className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                  >
                    <span className="relative block h-px w-full bg-(--color-border)">
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

      <GulfBriefSection />
      <EditorialThemesSection />

      <FiveQuestionsSection />
      <FixedFormatStatement />

      <SectorNotesSection />
      <FromTheRoomSection />

      <InsightSystemSection />
      <BilingualSection />
      <EditorialPrinciplesSection />
      <InsightCtaSection />
    </>
  );
}
