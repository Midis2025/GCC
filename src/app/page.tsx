import { Approach } from "@/components/sections/Approach";
import { Capabilities } from "@/components/sections/Capabilities";
import { CTASection } from "@/components/sections/CTASection";
import { GulfOutreach } from "@/components/sections/GulfOutreach";
import { Hero } from "@/components/sections/Hero";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { Intro } from "@/components/sections/Intro";
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
 * Composed entirely of server components. The only client JavaScript on the
 * page is the header scroll state, the mobile menu and the reveal observer.
 *
 * Heading outline: one H1 in the hero, one H2 per section.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Capabilities />
      <GulfOutreach />
      <Approach />
      <WhyGCC />
      <InsightsPreview />
      <CTASection />
    </>
  );
}
