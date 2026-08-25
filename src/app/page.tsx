import { ArabicGap } from "@/components/sections/ArabicGap";
import { ContinuityCompare } from "@/components/sections/ContinuityCompare";
import { MarketContexts } from "@/components/sections/MarketContexts";
import { OpeningQuestions } from "@/components/sections/OpeningQuestions";
import { RegionalCase } from "@/components/sections/RegionalCase";
import { Approach } from "@/components/sections/Approach";
import { CapabilityShowcase } from "@/components/sections/CapabilityShowcase";
import { CTASection } from "@/components/sections/CTASection";
import { GlobeFeature } from "@/components/sections/GlobeFeature";
import { Hero } from "@/components/sections/Hero";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { Intro } from "@/components/sections/Intro";
import { InvestorInvitation } from "@/components/sections/InvestorInvitation";
import { Orientation } from "@/components/sections/Orientation";
import { PillarSequence } from "@/components/sections/PillarSequence";
import { Segments } from "@/components/sections/Segments";
import { photos } from "@/data/imagery";
import { proposition, whyGulfNow } from "@/data/home";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  path: "/",
  description:
    "Gulf Connect introduces international companies to Gulf investors and partners, convenes qualified investors for structured meetings, and places company stories with regional business media in English and Arabic.",
});

/**
 * Home.
 *
 * A two-sided entry point. The issuer path and the investor path are both
 * visible from the hero, which is the brief's single most important structural
 * requirement: the site serves companies who pay and investors who are the
 * asset being built, and it fails if it only serves one.
 *
 * ---------------------------------------------------------------------------
 * Why the order is what it is
 * ---------------------------------------------------------------------------
 * The page carries both the client-required sections and the editorial
 * sections that predate them, and the sequence below is not the order either
 * arrived in. It alternates ground deliberately:
 *
 *   Proposition   dark      what we do
 *   Intro         canvas    how we think about the work
 *   Globe         dark      why the Gulf, why now
 *   Regional case canvas    why the region is not a branch office
 *   Questions     dark      where an engagement starts
 *   Segments      canvas    who it is for
 *   Capabilities  dark      the disciplines, in detail
 *   Continuity    canvas    a visit against a programme
 *   Approach      muted     how an engagement runs
 *   Arabic gap    dark      the differentiator
 *   Markets       canvas    where programmes run
 *   Invitation    muted     the other audience
 *   Insight       muted     what we have published
 *
 * Four sections were added to that spine and every one of them was placed by
 * tone as well as by argument. The regional case sits after the globe rather
 * than after Intro because Intro is canvas and so is it; continuity is canvas
 * rather than muted because Approach below it is muted. Read the column above
 * before inserting anything: no two neighbours share a ground.
 *
 * Three of these bands are full dark - the globe, the capabilities and the
 * Arabic gap - and the requested running order put all three within four
 * sections of each other. Read at speed that collapses into one long dark
 * stretch and the transitions the design depends on stop registering. Selected
 * Markets and Our Approach moved earlier to separate them, which costs the
 * Arabic gap two positions and buys back the page's rhythm.
 *
 * Every section named in the brief is present and none moved out of its part
 * of the argument: what we do, why here, who for, how, what makes us different,
 * the other audience, the proof, the ask.
 *
 * ---------------------------------------------------------------------------
 * What is deliberately not here
 * ---------------------------------------------------------------------------
 * - No contact form. The brief keeps the form on Contact and closes the home
 *   page with a single call to action instead; two places to submit the same
 *   enquiry is two places for one record to enter the system.
 *
 * - No Insight module until three items exist. `InsightsPreview` returns null
 *   below that threshold, so at launch the page runs from the investor
 *   invitation straight to the call to action with no gap and no placeholder.
 *
 * - No client logo wall. Two or three logos advertise how new a firm is.
 */
export default function HomePage() {
  return (
    <>
      {/* Two paths, above the fold. */}
      <Hero />

      {/* The standing orientation strip. Counts of named things only. */}
      <Orientation />

      {/*
        Convene, Place, Produce - as the scroll-driven pillar sequence.

        This is the site's signature section and the three things the firm does
        are what it should be carrying. A statement holds the left column while
        each of the three passes the reading position on the right, taking the
        bronze rail and the indicator with it.
      */}
      <PillarSequence
        id="home-proposition"
        label={proposition.label}
        heading={proposition.heading}
        intro={proposition.intro}
        pillars={proposition.items.map((item) => ({
          title: item.term,
          description: item.description,
          mark: item.mark,
        }))}
        photo={photos.whyMarket}
      />

      {/*
        Regional Perspective. Global Market Standards.

        The editorial split - statement and copy in a narrow left column, a
        tall photograph breaking the section's bottom edge on the right, and
        the question plate overhanging into the gutter between them. Restored
        unchanged from before the restructure.
      */}
      <Intro />

      {/*
        Why the Gulf, why now - carried by the globe.

        The section argues that international companies in a handful of sectors
        have no structured route to Gulf capital. The globe draws exactly that:
        arcs running in from Europe, North America and Asia onto the Gulf
        markets, resolving as the band enters view.

        COMPLIANCE: the globe's caption states that it implies no offices,
        registrations or investor relationships, and it travels with the
        component.
      */}
      <GlobeFeature
        id="home-why-gulf"
        label={whyGulfNow.label}
        heading={whyGulfNow.heading}
        paragraphs={whyGulfNow.paragraphs}
        categoriesLabel="Where the appetite sits"
        categories={whyGulfNow.sectors}
      />

      {/*
        Why the Gulf is not a branch office of somewhere else.

        Typography-led on a rule field, and the only section of its kind here:
        the page already carries a photographic split, a mosaic, a globe and a
        sticky panel, so a fifth image in a row would have flattened the
        rhythm. Four numbered reasons under a sticky claim.
      */}
      <RegionalCase />

      {/*
        The three questions an engagement opens with.

        A stepped dark column - each question inset further than the one above
        it - so the set descends through the section rather than stacking
        flush. Questions rather than claims: they commit the firm to where the
        work starts and to nothing about where it ends.
      */}
      <OpeningQuestions />

      {/*
        Selected Markets - the photographic mosaic.

        Restored, with its categories re-cut to the launch positioning. The
        panels are not links and carry no arrow: these are audiences, not
        destinations. See `audienceContent` for what each entry is sourced
        from, and why three of the originals are gone.
      */}
      <Segments />

      {/*
        Our Capabilities - the interactive dark showcase.

        Pointing at, tabbing to or touching a row cross-fades the photograph in
        the panel beside it. Restored unchanged; only the four destinations
        changed, from the retired `/services/*` routes to the service pages
        that now sell the work. See the header of `data/capabilities.ts`.
      */}
      <CapabilityShowcase />

      {/*
        One visit against a running programme.

        COMPLIANCE: this compares two shapes of WORK, never two sets of
        results. No ticks, no crosses, no scoring, and no column labelled
        better - see the header of .
      */}
      <ContinuityCompare />

      {/*
        Our Approach - the five-stage rule.

        Numerals on a single continuous line: horizontal from `lg`, a vertical
        spine below it. Restored unchanged; "Target" and "Engage" were reworded
        to say communications rather than outreach - see `approachContent`.
      */}
      <Approach />

      {/* The clearest differentiator. */}
      <ArabicGap />

      {/*
        Dubai, Abu Dhabi and Riyadh, as three staggered editorial panels.

        CONTENT INTEGRITY: the standing caption denies offices, registrations,
        licences and relationships. Three cities named under a firm's logo,
        over photographs of those cities, is the easiest thing on this site to
        misread as a footprint.
      */}
      <MarketContexts />

      {/* The other audience. */}
      <InvestorInvitation />

      {/*
        Perspectives on Gulf Capital Markets.

        The old editorial layout - one lead article with a large photograph, the
        rest as a compact indexed column beside it - now reading from the
        current Insight taxonomy and hidden entirely below three published
        items.
      */}
      <InsightsPreview />

      {/* One closing call to action, routing to Contact. */}
      <CTASection />
    </>
  );
}
