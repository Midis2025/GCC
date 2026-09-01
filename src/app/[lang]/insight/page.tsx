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
  MenasDigitalNewsSection,
  SectorNotesSection,
} from "@/components/sections/insight/InsightFormats";
import { PageHero } from "@/components/sections/PageHero";
import {
  InsightPosition,
  InsightSectors,
} from "@/components/sections/insight/InsightOpening";
import { Reveal } from "@/components/ui/Reveal";
import { insightFormatList, pick } from "@/content";
import { insightContentAr } from "@/content/ar/insight";
import { backdrops } from "@/data/imagery";
import { insightContent as insightContentEn } from "@/data/insight";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Insight",
  path: "/insight",
  description:
    "MENA's Digital News, The Gulf Brief, Five Questions, Sector Notes and From the Room - five recurring formats covering Gulf capital markets and the sectors Gulf Connect works in.",
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
 * Each of the five formats gets its OWN section with its own composition,
 * rather than five entries in one sequence. That is what lets the page say
 * something true about them: MENA's Digital News is a daily feed, The Gulf
 * Brief is a written column, Five Questions is a film, Sector Notes is a
 * document and From the Room is a room. Five rows of one component said only
 * that there are five of them.
 *
 * Each format section keeps the id the old sequence carried -
 * `#menas-digital-news`, `#gulf-brief`, `#five-questions`, `#sector-notes`,
 * `#from-the-room` - so the navigation below and the deep links from
 * individual article pages both keep working.
 *
 * ---------------------------------------------------------------------------
 * Rhythm
 * ---------------------------------------------------------------------------
 * No two neighbours share a ground, and no two share a composition:
 *
 *   Hero            dark      the shared PageHero, as every other route
 *   Position        canvas    statement | rule | two paragraphs
 *   What We Follow  muted     three staggered sector panels
 *   Navigation      canvas    five-column masthead
 *   Digital News    muted     typographic, no image, external CTA
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
export default async function InsightPage() {
  const insightContent = await pick({ en: insightContentEn, ar: insightContentAr });
  /*
    The five formats, in the language being read. `id` is the taxonomy key in
    both editions, so the anchors this nav writes - `#five-questions` and the
    rest - resolve against the same sections either way.
  */
  const insightFormats = await insightFormatList();

  return (
    <>
      {/*
        The shared page hero, as every other route uses.

        This page briefly had a bespoke asymmetric opening - copy in a narrow
        column beside a photograph bleeding to the page edge. It was a better
        composition in isolation and the wrong decision for the site: a visitor
        moving between What We Do, For Investors, About and Insight met a
        different masthead on one of them, which reads as a page from a
        different site rather than as a page with its own character.

        The page's character comes from the fourteen sections below it. The
        entrance should be the one every route shares.
      */}
      <PageHero
        variant="feature"
        photo={backdrops.insights}
        eyebrow={insightContent.eyebrow}
        title={insightContent.title}
        lead={insightContent.lead}
      />

      <InsightPosition />
      <InsightSectors />

      {/*
        Format navigation.

        NAVIGATION, not a filter, and the distinction is what lets it exist on
        a page with an empty library: a filter implies a body of work to sift
        and would return nothing, where these anchor onto four standing format
        sections that each explain themselves.

        A five-column masthead from `lg` up, two columns at `sm`, and a
        horizontal scroller below that. Verified that it scrolls, that the last
        item is reachable and that every anchor resolves.

        Five rather than four since MENA's Digital News joined the taxonomy:
        the list is built from `insightFormats`, so the only thing that had to
        change here was the column count.
      */}
      <Section spacing="md" aria-label={insightContent.formatsNavLabel}>
        <nav>
          <ul className="-mx-(--gutter) flex snap-x snap-mandatory gap-x-6 overflow-x-auto px-(--gutter) pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 sm:overflow-visible sm:px-0 lg:grid-cols-5 lg:gap-x-8">
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

                    {/*
                      The format index is gone with the 01/02/03 format. The
                      name takes over its top margin so the cards still line up
                      under the rule above them.
                    */}
                    <span className="mt-5 block font-display text-[1.25rem] leading-snug transition-colors duration-500 group-hover:text-(--color-accent)">
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
        The daily feed, placed first because it is the most frequent of the
        five and the one a reader can act on immediately. Muted ground and no
        photography, so it does not read as a second copy of the editorial
        split that follows it. See the component.
      */}
      <MenasDigitalNewsSection />

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
