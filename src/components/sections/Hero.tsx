import type { CSSProperties } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { HeroGlobe } from "@/components/visuals/HeroGlobe";
import { HeroStats } from "@/components/sections/HeroStats";
import { heroContent, marketOrientationNote } from "@/data/homepage";

/** Animation delay as an inline custom property, for the on-mount reveals. */
const at = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/**
 * Homepage hero.
 *
 * The globe is the subject. Everything else is arranged around it: a deep
 * field, a hold behind the type column, the copy on the left, the market
 * annotations on the right, and the standing bar along the foot.
 *
 * This section no longer opens on photography. Every other hero on the site
 * still does - `PageHero` and `backdrops` are untouched - but a lit skyline
 * behind a lit earth is two subjects competing for the same frame, and the
 * earth carries more meaning here than the skyline did.
 *
 * Motion runs on mount rather than on scroll. Above-the-fold content must
 * never wait on an IntersectionObserver, so the reveals are pure CSS with
 * staggered delays. The whole sequence resolves inside ~1.5s and then stops -
 * nothing loops except the globe's own drift.
 */
export function Hero() {
  return (
    // Full viewport, not "most of it".
    //
    // At 90svh the section stopped short of the fold and left a strip of the
    // next section showing under the standing bar, which on a large monitor
    // read as the hero having run out rather than as an invitation to scroll.
    // `100svh` closes it. The floor in rem is what stops a short laptop window
    // from crushing the composition instead: below that the section simply
    // grows and the bar goes under the fold, which is the right trade.
    <section className="tokens-dark relative isolate flex min-h-[max(38rem,100svh)] flex-col overflow-hidden bg-(--midnight)">
      {/*
        Plane 1 - the ground.

        No photograph. The hero used to open on a Dubai skyline; the globe is
        now the subject, and a lit skyline behind a lit earth is two subjects
        arguing. What replaces it is a deep field with a single cool lift behind
        the globe, so the sphere has somewhere to sit rather than floating on
        flat black.

        The photograph is not deleted - `backdrops.hero` and the `imageConfig`
        override still exist and every other hero on the site still uses them.
        Restoring it here is re-adding one <NextImage>.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[radial-gradient(120%_100%_at_72%_44%,#101d2b_0%,#0a121b_46%,#06090f_100%)]"
      />

      {/* Vignette, so the frame closes at the corners rather than running out. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(90%_75%_at_50%_50%,transparent_38%,rgba(4,7,11,0.55)_100%)]"
      />

      {/*
        Plane 2 - grain only. The mullion field and the drawn backdrop are both
        gone from this section: they are fine line work, the globe is fine line
        work, and over each other they read as interference. Grain stays,
        because it is what keeps a full-bleed gradient from banding.
      */}
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      {/*
        Plane 3 - a soft hold behind the type column, so the headline never has
        to compete with the globe's limb for contrast.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 -z-[4] w-[58%] bg-[linear-gradient(90deg,rgba(6,10,16,0.86)_0%,rgba(6,10,16,0.5)_44%,rgba(6,10,16,0.14)_80%,transparent_100%)]"
      />

      {/*
        The copy takes the space the standing bar does not, and centres itself
        in it. With the section pinned to the viewport this is what keeps the
        composition balanced at any height - on a tall monitor the type sits in
        the middle of the frame rather than being shoved against the bar by a
        `justify-end`, and on a short one it simply tightens up.

        The top padding is header clearance and nothing more; the rest of the
        spacing is now the centring.
      */}
      <Container className="relative z-10 flex flex-1 flex-col justify-center pb-[clamp(0.5rem,1.6svh,2.5rem)] pt-[calc(var(--header-h)+clamp(0.75rem,2svh,3rem))]">
        <p
          className="reveal flex items-center gap-3.5 text-label uppercase text-(--color-accent)"
          data-visible="true"
        >
          <span aria-hidden="true" className="h-px w-10 shrink-0 bg-(--color-accent)" />
          {/* Unconstrained: the eyebrow reads as one line on desktop, and a
              measure tight enough to wrap it left the rule floating against a
              two-line block. */}
          <span>{heroContent.eyebrow}</span>
        </p>

        {/*
          The headline spans the full container rather than sharing a row with
          the market card. Squeezed into a column beside the card it re-wrapped
          each authored line in two, which broke both the phrasing and the
          line-by-line reveal - "Capital and / Opportunity" is not a line break
          anyone would choose. The card moves to the row beneath instead.

          Each line is its own clipping block so the text wipes up from behind
          its own edge; the H1 stays a single accessible string, and the spans
          carry no semantics.
        */}
        {/*
          Sized inline, against both axes of the viewport, and capped at 4rem
          rather than the shared `mega` maximum of 5rem.

          The cap is what makes the composition possible: at 5rem the headline
          runs to 70% of the viewport and there is nowhere for seven annotated
          labels to go. At 4rem it settles at just under half, which is where
          the reference puts it, and the authored line breaks still hold.

          The height term matters just as much now the section is pinned to
          100svh: a 1280x705 laptop is wide enough to ask for 4rem and far too
          short to hold it alongside a paragraph, two buttons and a standing
          bar. `min()` lets whichever axis is scarcer win, so the type gives way
          on a short screen instead of pushing the bar under the fold.

          Inline rather than in the token, so every other page keeps its scale.
        */}
        <Heading
          level={1}
          size="mega"
          className="mt-[clamp(1rem,2.6svh,1.75rem)] max-w-[26ch]"
          style={{ fontSize: "clamp(2.375rem, min(1rem + 4.3vw, 8svh), 4rem)" }}
          balance={false}
        >
          {heroContent.headlineLines.map((line, index) => {
            // The accent word is a suffix of whichever line carries it. Split
            // rather than hard-coded, so changing the copy cannot leave a
            // stray span behind on the wrong line.
            const accent = heroContent.headlineAccent;
            const carriesAccent = line.endsWith(accent);
            const lead = carriesAccent ? line.slice(0, -accent.length) : line;

            return (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                {/*
                  `w-fit` so the box hugs the words. Nothing visual depends on
                  it - a full-width block looks identical - but `HeroGlobe`
                  measures these to find where the type column actually ends,
                  and a full-width box would report the measure instead of the
                  line.
                */}
                <span
                  className="reveal block w-fit"
                  data-visible="true"
                  data-variant="mask"
                  style={at(140 + index * 130)}
                >
                  {lead}
                  {carriesAccent && <span className="text-(--color-accent)">{accent}</span>}
                </span>
              </span>
            );
          })}
        </Heading>

        {/*
          The copy column is held to ~50% from `lg` so the globe has the right
          of the frame to itself. The paragraph measure is unchanged - it was
          already narrower than this - so nothing about the reading experience
          moves; only the empty space to its right does.
        */}
        <div className="mt-[clamp(1.25rem,3.4svh,2.25rem)] max-w-[54rem] lg:max-w-[52%]">
          <p
            className="reveal max-w-[54ch] text-lead text-(--color-foreground-muted)"
            data-visible="true"
            style={at(620)}
          >
            {heroContent.supporting}
          </p>

          <div
            className="reveal mt-[clamp(1.25rem,3.4svh,2.25rem)] flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4"
            data-visible="true"
            style={at(760)}
          >
            <Button href={heroContent.primaryCta.href} size="lg" withArrow>
              {heroContent.primaryCta.label}
            </Button>
            <Button href={heroContent.secondaryCta.href} size="lg" variant="outline">
              {heroContent.secondaryCta.label}
            </Button>
          </div>
        </div>

      </Container>

      {/*
        Below `lg` the globe is a block in the flow beneath the CTAs, exactly
        where the market card used to sit. From `lg` its own classes lift it out
        into a full-height layer pinned to the right of the SECTION rather than
        the container - it has to reach the viewport edge to bleed, and the
        container stops 78rem short of it on a wide screen.

        Its left edge is set at 70% so the disc starts clear of the headline at
        every width the headline is capped at. One instance, two placements, so
        there is never a second canvas running off-screen.
      */}
      <HeroGlobe className="mt-12 px-5 sm:px-8 lg:mt-0 lg:px-0" />

      {/*
        CONTENT INTEGRITY: required, and not in the reference.

        The globe now names six markets and six cities and draws lit connection
        lines between them - a materially stronger implication than the card it
        replaced. `gulfMarkets` states the rule plainly: wherever the markets are
        rendered, the orientation caption goes with them.

        It lives here rather than inside the globe layer because that layer
        deliberately runs past the right edge of the viewport, and a caption
        positioned inside it ends up off-screen. In the container it is bounded
        by the same margins as everything else.
      */}
      <Container className="relative z-10 pb-3">
        <p className="text-[0.6875rem] leading-relaxed text-(--color-foreground-subtle) lg:text-right">
          {marketOrientationNote}
        </p>
      </Container>

      <HeroStats />
    </section>
  );
}
