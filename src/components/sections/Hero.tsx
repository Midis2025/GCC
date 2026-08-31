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
        className="absolute inset-0 -z-30 bg-[radial-gradient(130%_115%_at_78%_46%,#132234_0%,#0c1622_38%,#070c14_72%,#05080e_100%)]"
      />

      {/*
        Plane 2 - the left half of the environment.

        Three very quiet layers, and the answer to a hero whose left side was
        simply empty. None of them is a shape: each is a gradient or a texture
        that fades to nothing well before it reaches anything else, so there is
        no edge anywhere for the eye to read as a division.
      */}

      {/* A high, soft key light from above the type. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(70%_55%_at_14%_8%,rgba(120,158,196,0.1)_0%,rgba(120,158,196,0.04)_38%,transparent_72%)]"
      />

      {/*
        Architectural texture: the site's own mullion field, at a whisper. It
        is the same drawn language as the rest of the brand, held at 30% and
        masked off long before it reaches the globe, so it registers as surface
        rather than as pattern.
      */}
      <div
        aria-hidden="true"
        className="rule-field absolute inset-y-0 start-0 -z-20 hidden w-[46%] opacity-30 [--rule-gap:5.5rem] [mask-image:linear-gradient(90deg,transparent,black_18%,black_52%,transparent_100%)] lg:block"
      />

      {/*
        A few gold motes over the type column. Static, not drifting: the globe
        is already the thing that moves, and a second animated layer behind a
        headline is exactly the clutter the brief rules out.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 hidden opacity-[0.55] lg:block bg-[radial-gradient(1.5px_1.5px_at_12%_28%,rgba(200,166,112,0.55),transparent),radial-gradient(1.5px_1.5px_at_23%_62%,rgba(200,166,112,0.4),transparent),radial-gradient(2px_2px_at_31%_18%,rgba(200,166,112,0.3),transparent),radial-gradient(1.5px_1.5px_at_8%_74%,rgba(200,166,112,0.35),transparent),radial-gradient(1.5px_1.5px_at_38%_82%,rgba(200,166,112,0.28),transparent),radial-gradient(2px_2px_at_18%_44%,rgba(200,166,112,0.22),transparent)]"
      />

      {/*
        Plane 3 - the ambient light the globe casts into the room.

        This is in CSS rather than on the canvas deliberately. The canvas glow
        can only ever reach the edge of its own element; this one is full-bleed,
        so the light from the globe spreads across the whole section and dies
        out gradually instead of stopping at a boundary. It is what makes the
        globe sit *in* the hero rather than next to it.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[6] bg-[radial-gradient(46%_58%_at_80%_46%,rgba(96,140,190,0.16)_0%,rgba(78,116,162,0.07)_34%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[6] bg-[radial-gradient(30%_38%_at_82%_47%,rgba(186,146,88,0.12)_0%,rgba(186,146,88,0.04)_42%,transparent_74%)]"
      />

      {/*
        Plane 4 - a soft hold behind the type column.

        Wide and very gradual, and no longer a panel with a width: it reaches
        three-quarters of the way across so that its own falloff is never
        visible, which is what stops the left of the hero reading as a separate
        background from the right.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[4] bg-[linear-gradient(100deg,rgba(5,9,15,0.82)_0%,rgba(5,9,15,0.6)_26%,rgba(5,9,15,0.3)_48%,rgba(5,9,15,0.08)_66%,transparent_82%)]"
      />

      {/*
        Vignette, so the frame closes at the corners rather than running out.

        `pointer-events-none`, like the grain below it: both of these sit ABOVE
        the globe layer in the stacking order (-2 and -1 against its -3), and a
        full-bleed div with no pointer rule of its own is still a hit-test
        target - so between them they were swallowing every press aimed at the
        globe. They are scrims; nothing should ever be pointing at them.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[2] bg-[radial-gradient(105%_88%_at_52%_48%,transparent_46%,rgba(3,6,10,0.5)_100%)]"
      />

      {/*
        Grain, over everything. It is what keeps this many overlapping
        full-bleed gradients from banding on a wide display.
      */}
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-[1]" />

      {/*
        The copy takes the space the standing bar does not, and centres itself
        in it. With the section pinned to the viewport this is what keeps the
        composition balanced at any height - on a tall monitor the type sits in
        the middle of the frame rather than being shoved against the bar by a
        `justify-end`, and on a short one it simply tightens up.

        The top padding is header clearance and nothing more; the rest of the
        spacing is now the centring.

        `pointer-events-none` here, `auto` on each block inside.

        From `lg` the globe is a layer behind this container, and the container
        is the full width and height of the section - so it was intercepting
        every press across the whole hero and the globe could not be grabbed at
        all on desktop. Turning the BOX transparent and handing pointer events
        back to the three blocks that actually hold content means the type is
        still selectable and the buttons still clickable, while the empty space
        around them - which is most of the right-hand half, where the disc is -
        reaches the canvas. Below `lg` the globe is in the flow beneath this and
        was never covered, which is why touch already worked there.

        The phone-only bottom padding replaces what the globe used to provide.
        It sat between the CTAs and the standing bar with 48px of its own margin
        above it; taking it away left the second button 14px off the bar, which
        reads as truncated rather than as composed. Same 640px line, so nothing
        above it moves.
      */}
      <Container className="pointer-events-none relative z-10 flex flex-1 flex-col justify-center pb-[clamp(0.5rem,1.6svh,2.5rem)] pt-[calc(var(--header-h)+clamp(0.75rem,2svh,3rem))] max-sm:pb-9">
        <p
          className="reveal pointer-events-auto flex w-fit items-center gap-3.5 text-label uppercase text-(--color-accent)"
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
          className="mt-[clamp(1rem,2.6svh,1.75rem)] max-w-[26ch] [text-shadow:0_2px_24px_rgba(4,8,14,0.7)]"
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

                  It is also what makes the headline cost the globe as little
                  as possible: pointer events come back on HERE rather than on
                  the h1, so the words stay selectable while the empty space to
                  the right of each line - inside the 26ch measure, over the
                  disc - stays reachable.
                */}
                <span
                  className="reveal pointer-events-auto block w-fit"
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
        {/*
          Pointer events come back on for the whole copy column. It is capped
          at 48% from `lg` and the disc is centred at 80% of the section, so
          this block cannot cover any part of the globe worth grabbing.
        */}
        <div className="pointer-events-auto mt-[clamp(1.25rem,3.4svh,2.25rem)] max-w-[54rem] lg:max-w-[48%]">
          <p
            className="reveal max-w-[54ch] text-lead text-(--color-foreground-muted) [text-shadow:0_1px_18px_rgba(4,8,14,0.75)]"
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
        container always stops one gutter short of it.

        Its left edge is set at 70% so the disc starts clear of the headline at
        every width the headline is capped at. One instance, two placements, so
        there is never a second canvas running off-screen.
      */}
      {/*
        Stacked below `lg`, so it carries the page gutter itself rather than
        sitting in a Container - the same token, so it lines up with the copy
        above it at every width.

        `max-sm:hidden` takes it off phones entirely. At that size the six Gulf
        markets project into a knot a few pixels across, so the globe was
        reading as decoration rather than as the map it is on a wide screen.
        The boundary is 640px, the same line the renderer already uses to tell a
        phone from a tablet - so the tablet globe and the desktop layer are
        untouched.
      */}
      <HeroGlobe className="mt-12 px-(--gutter) max-sm:hidden lg:mt-0 lg:px-0" />

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

        It goes with the globe on phones, at the same 640px line. The rule is
        that the caption accompanies any rendering of `gulfMarkets`; with the
        globe gone there is nothing on the mobile hero rendering them, and a
        line qualifying a map that is not on screen only raises the question it
        was written to answer. `HeroStats` counts the markets rather than naming
        them, and carries its own note.
      */}
      <Container className="pointer-events-none relative z-10 pb-3 max-sm:hidden">
        {/* Same treatment as the copy column: the caption is one line of text
            near the foot of the disc, so the box around it gives its pointer
            events back to the globe and the words keep theirs. */}
        <p className="pointer-events-auto text-[0.6875rem] leading-relaxed text-(--color-foreground-subtle) lg:text-end">
          {marketOrientationNote}
        </p>
      </Container>

      <HeroStats />
    </section>
  );
}
