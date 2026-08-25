import { ArabicGap } from "@/components/sections/ArabicGap";
import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { InvestorInvitation } from "@/components/sections/InvestorInvitation";
import { GlobeFeature } from "@/components/sections/GlobeFeature";
import { LatestInsight } from "@/components/sections/LatestInsight";
import { Orientation } from "@/components/sections/Orientation";
import { PillarSequence } from "@/components/sections/PillarSequence";
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
 * The order is the argument - here is what we do, here is why the Gulf and why
 * now, here is the one thing almost nobody else does, here is what we have
 * published, and here is an invitation if you are on the other side of the
 * table. One primary call to action at the end, routing to Contact.
 *
 * ---------------------------------------------------------------------------
 * What is deliberately not here
 * ---------------------------------------------------------------------------
 * - No contact form. The brief keeps the form on Contact and closes the home
 *   page with a single call to action instead; two places to submit the same
 *   enquiry is two places for one record to enter the system.
 *
 * - No "Latest from Insight" module until three items exist. `LatestInsight`
 *   returns null below that threshold, so at launch the page runs from the
 *   Arabic gap to the investor invitation with no gap and no placeholder. An
 *   empty module announces an empty library more loudly than its absence does.
 *
 * - No client logo wall. Two or three logos advertise how new a firm is.
 *
 * The sections retired with the old structure - the capability showcase, the
 * approach timeline, the segment mosaic, the differentiation panels - are left
 * in the codebase rather than deleted. Several are reusable, none is reachable,
 * and the brief asks for compatible sections to be reused rather than binned.
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

        The content is unchanged: the same three verbs, the same three
        paragraphs from `data/home.ts`. Only the treatment moved.
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
        Why the Gulf, why now - carried by the globe.

        The section argues that international companies in a handful of sectors
        have no structured route to Gulf capital. The globe draws exactly that:
        arcs running in from Europe, North America and Asia onto the Gulf
        markets, resolving as the band enters view. It is the one section on
        the site whose argument the diagram states directly.

        No call to action on it, deliberately. This band makes an observation
        about the market; the reader is routed onward from the hero above and
        the invitation below, not from the middle of an argument.

        Content unchanged - same label, heading, paragraphs and sectors from
        `data/home.ts`. COMPLIANCE: the globe's own caption states that it
        implies no offices, registrations or investor relationships, and it
        travels with the component.
      */}
      <GlobeFeature
        id="home-why-gulf"
        label={whyGulfNow.label}
        heading={whyGulfNow.heading}
        paragraphs={whyGulfNow.paragraphs}
        categoriesLabel="Where the appetite sits"
        categories={whyGulfNow.sectors}
      />

      {/* The clearest differentiator, on the home page rather than buried. */}
      <ArabicGap />

      {/* Hidden entirely below three published items. */}
      <LatestInsight />

      {/* The other audience. */}
      <InvestorInvitation />

      {/* One closing call to action, routing to Contact. */}
      <CTASection />
    </>
  );
}
