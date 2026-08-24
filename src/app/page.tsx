import { Approach } from "@/components/sections/Approach";
import { CapabilityShowcase } from "@/components/sections/CapabilityShowcase";
import { CTASection } from "@/components/sections/CTASection";
import { GulfOutreach } from "@/components/sections/GulfOutreach";
import { Hero } from "@/components/sections/Hero";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { Intro } from "@/components/sections/Intro";
import { Orientation } from "@/components/sections/Orientation";
import { Segments } from "@/components/sections/Segments";
import { WhyGCC } from "@/components/sections/WhyGCC";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  path: "/",
  description:
    "GCC advises companies on investor relations, investor targeting and strategic communications across Gulf and international capital markets.",
});

/**
 * Homepage.
 *
 * Sequenced as a visual journey rather than a stack of equal bands. The
 * surface alternates deliberately - photographic dark, flat dark, light,
 * photographic dark, light stone, flat dark, light, light stone, photographic
 * dark - so no two adjacent sections share a treatment, and each one is built
 * on a different structural idea: layered hero, numeral band, editorial split,
 * interactive list, feature with diagram, timeline, floating plates, mosaic,
 * publication grid, centred statement.
 *
 * Every section is a server component except two: `CapabilityShowcase`, which
 * needs pointer and focus state, and `WhyGCC`, whose active panel is a
 * function of scroll position. Both cost one IntersectionObserver and no
 * scroll listener. The only other client JavaScript on the page is the header
 * scroll state, the mobile menu and the shared reveal observer.
 *
 * Heading outline: one H1 in the hero, one H2 per section.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Orientation />
      <Intro />
      <CapabilityShowcase />
      <GulfOutreach />
      <Approach />
      <WhyGCC />
      <Segments />
      <InsightsPreview />
      <CTASection />
    </>
  );
}
