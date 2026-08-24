import { CTASection } from "@/components/sections/CTASection";
import { EditorialStatement } from "@/components/sections/EditorialStatement";
import { IndustriesApproach } from "@/components/sections/IndustriesApproach";
import { IndustriesHero } from "@/components/sections/IndustriesHero";
import { IndustriesIntro } from "@/components/sections/IndustriesIntro";
import { SectorExplorer } from "@/components/sections/SectorExplorer";
import { SectorReach } from "@/components/sections/SectorReach";
import { backdrops } from "@/data/imagery";
import { industriesTransition } from "@/data/industries";
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
 * Read as one argument rather than as a stack of sector cards. The order is the
 * argument: every sector explains itself differently, here is what stays
 * constant and what does not, explore the six, understand where the work
 * concentrates in each, sector knowledge informs a programme without becoming a
 * template, and that is applied across the region.
 *
 * Six blocks, no two built the same way: an asymmetric hero with the sector
 * names floating over one city, an editorial opening with a contents rule, a
 * scroll-driven explorer that is an accordion on a phone, a split statement
 * against oversized ghosted type, a full-bleed transition, a markets strip
 * beside a drawn diagram, and the sitewide call to action.
 *
 * ---------------------------------------------------------------------------
 * What this page does NOT do
 * ---------------------------------------------------------------------------
 * Every section is Industries-specific except `EditorialStatement`, which the
 * about page also uses, and `CTASection`. The shared building blocks -
 * `PageHero`, `StatementBand`, `Figure`, `Reveal`, `Section` - are untouched,
 * because each is used by other routes and this was a redesign of one page.
 *
 * `CTASection` is left exactly as it is. It is already a full-bleed dark
 * photographic band with a display heading, the supporting copy and both
 * actions, which is the closing treatment this page wants; it renders on ten
 * other routes, so redesigning it here would have redesigned all of them. The
 * one thing the brief asks for that it does not do is parallax on its
 * photograph - adding that would change every page on the site.
 *
 * ---------------------------------------------------------------------------
 * Client JavaScript
 * ---------------------------------------------------------------------------
 * Two components: `SectorExplorer`, whose active sector is a function of scroll
 * position and pointer, and `SectorReach`, which needs hover state. Between
 * them that is one IntersectionObserver and two `useState`. No scroll listener
 * anywhere - parallax runs on CSS scroll-progress timelines and the entry
 * animations reuse the shared observer inside `Reveal`.
 *
 * ---------------------------------------------------------------------------
 * Content integrity
 * ---------------------------------------------------------------------------
 * This page describes SECTORS, not clients. Every line is written about an
 * industry's conditions rather than about work GCC has done in it, and
 * `industriesContent.note` marks the coverage as indicative pending
 * confirmation - rendered in standing text beside the opening, never behind an
 * interaction. See the header of `data/industries.ts`.
 */
export default function IndustriesPage() {
  return (
    <>
      {/* 1 - Every sector explains itself differently. */}
      <IndustriesHero />

      {/* 2 - What is constant, what is not, and how many follow. */}
      <IndustriesIntro />

      {/* 3 - The six, one at a time. */}
      <SectorExplorer />

      {/* 4 - Sector knowledge informs a programme; it does not dictate it. */}
      <IndustriesApproach />

      {/* 5 - The turn from sectors to the markets they are covered in. */}
      <EditorialStatement
        id="industries-transition"
        statement={industriesTransition.statement}
        photo={backdrops.industriesTransition}
        photoStrength="faint"
        compact
      />

      {/* 6 - Where it is applied. */}
      <SectorReach />

      {/* 7 - The ask. */}
      <CTASection />
    </>
  );
}
