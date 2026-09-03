import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pick } from "@/content";
import { gulfDifferenceAr } from "@/content/ar/home-depth";
import { gulfDifference as gulfDifferenceEn } from "@/data/home-depth";
import { photos } from "@/data/imagery";

/**
 * ============================================================================
 * THE REGIONAL CASE
 * ============================================================================
 * The argument the business rests on: the Gulf is not a branch office of
 * another financial centre, and the parts of an overseas investor-relations
 * approach that travel are the materials rather than the method.
 *
 * ---------------------------------------------------------------------------
 * IT WAS TYPOGRAPHY-LED. IT IS IMAGE-LED NOW, AND THAT IS THE WHOLE CHANGE.
 * ---------------------------------------------------------------------------
 * This used to be the one section on the homepage with no photograph in it -
 * four paragraphs of argument on ivory, against a drawn rule field, on the
 * reasoning that a page already carrying a photographic split, a mosaic, a
 * globe and two dark bands did not need a fifth picture.
 *
 * The frame then arrived in the left column as a block, then as a ground
 * behind the heading only, and neither settled: a picture under a paragraph
 * reads as an afterthought, and a picture behind one column of two reads as a
 * decoration the other column is not in on.
 *
 * So the photograph is the section. KAFD runs the full width behind both
 * columns, the surface goes dark, and the argument is set over it. Which is
 * also the more honest composition for what the section SAYS: the claim is
 * that Gulf markets have their own structure, and the reader is now standing
 * inside one while reading it rather than looking at a picture of one.
 *
 * The heading stays sticky against the paragraphs it introduces, so the claim
 * holds the screen while the four reasons for it are read - that is what makes
 * them read as support rather than as a list that happens to follow.
 *
 * COMPLIANCE: every paragraph is an observation about market structure -
 * investor types, relationship cadence, media ecosystem, language. Nothing is
 * a forecast, a measurement or a claim about outcome. See the header of
 * `data/home-depth.ts`.
 */
export async function RegionalCase() {
  const gulfDifference = await pick({ en: gulfDifferenceEn, ar: gulfDifferenceAr });

  return (
    <Section
      spacing="sm"
      tone="dark"
      aria-labelledby="home-regional-case"
      className="relative isolate overflow-hidden"
    >
      {/*
        The photograph, full bleed.

        `next/image` with `fill` rather than a CSS `background-image`: the same
        thing to look at, a different thing to download. A background URL is one
        fixed file at every width; this emits AVIF and WebP against
        `deviceSizes` and hands a phone a phone-sized file. `cover` never
        repeats and never stretches, so `no-repeat` and `background-size` have
        nothing to do here.

        NOT blurred, and the file is untouched at 2880px. The grade this needs
        is the wash above it, not damage to the picture. `Figure` still applies
        the sitewide `.photo-grade`, and nothing else.

        `object-position` comes from the photo record, which carries a separate
        mobile value - the section is landscape on a desktop and a tall column
        on a phone, so `cover` crops it on opposite axes at the two ends and one
        value cannot serve both.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-30">
        <Figure photo={photos.regionalCase} ratio="auto" className="h-full w-full" sizes="100vw" />
      </div>

      {/*
        The readability wash, and it is written out in full on purpose.

        Tailwind scans SOURCE TEXT for class names, so a class assembled from a
        constant produces no CSS at all - the section would render with no wash
        and white type straight onto a facade. Long and literal is the only form
        that survives the build.

        Directional, because the two columns ask different things of it. The
        heading is display type at the left edge and can take the most; the
        paragraphs are the smallest copy in the section, so the middle pair of
        stops carry the paragraph column. They are LIGHTER than they were, and
        that is a fact about the photograph rather than a change of taste: this
        frame is a blue hour, already dark, where the one it replaced was a pale
        limestone facade in full sun. Sized for the old picture it buried this
        one - the section rendered as flat navy with type on it. Re-measured
        against this frame, the paragraphs sit at 5:1 and above.

        `rtl:` mirrors the angle. The LAYOUT flips for Arabic - heading right,
        paragraphs left - so the wash flips with it while the photograph
        underneath must not.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(100deg,rgba(12,20,29,0.82)_0%,rgba(12,20,29,0.66)_30%,rgba(12,20,29,0.44)_52%,rgba(12,20,29,0.38)_78%,rgba(12,20,29,0.34)_100%)] rtl:bg-[linear-gradient(260deg,rgba(12,20,29,0.82)_0%,rgba(12,20,29,0.66)_30%,rgba(12,20,29,0.44)_52%,rgba(12,20,29,0.38)_78%,rgba(12,20,29,0.34)_100%)]"
      />

      {/*
        A vignette, kept very low. It stops the photograph meeting the section
        edge at full strength on the two corners the wash does least for, which
        is what keeps the band from reading as a rectangle of picture dropped
        between two ivory sections.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_100%_at_50%_45%,transparent_52%,rgba(12,20,29,0.34)_100%)]"
      />

      {/*
        The rule field stays, at a third of its former strength.

        It is the section's own drawn language and predates the photograph;
        over one it would be a third competing layer, so it survives as a
        texture rather than as a grid.
      */}
      <div
        aria-hidden="true"
        className="rule-field absolute inset-0 -z-10 [--rule-gap:6rem] opacity-20"
      />

      {/*
        42 / 58, and vertically centred against each other.

        The columns were 0.92 / 1.08 and top-aligned with the heading STICKY
        against the paragraphs. Sticky earned its place when this section ran
        past a screen; at the height it is now it can never engage - there is
        no travel for it to hold through - so it is retired rather than left
        in as a rule that does nothing. `items-center` puts the two columns on
        one horizontal axis instead, which is what makes them read as one
        composition rather than two stacks that happen to be side by side.

        Every Reveal is untouched: the entrances, their stagger and the
        mask on the closing line all run exactly as before.
      */}
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-center lg:gap-x-20">
        <div>
          <Reveal>
            {/*
              One rule, not two.

              A standalone `about-rule` used to sit here - a 4rem bronze
              gradient hairline on its own line above the eyebrow - and
              `SectionLabel` draws its own short accent rule beside the text.
              Stacked, they read as two decorative lines introducing one label.

              The one that reads as the label's own is the one inside
              `SectionLabel`, so the standalone rule is the one that goes. It is
              removed here only: `.about-rule` is a shared class and several
              other sections use it correctly, on their own.
            */}
            <SectionLabel>{gulfDifference.label}</SectionLabel>
            <Heading
              id="home-regional-case"
              level={2}
              size="display"
              className="mt-7 max-w-[15ch]"
            >
              {gulfDifference.heading}
            </Heading>
          </Reveal>
        </div>

        {/*
          The paragraph column, on a glass panel.

          Not a card, and not one card per paragraph: a single translucent
          plane at rgba(8,20,32,0.5) with the existing hairlines running across
          makes the copy legible without the wash having to be strong enough to
          bury the facade - it buys about 0.12 of extra density exactly where
          the smallest type is and nowhere else.

          `backdrop-blur` is on the PANEL, not on the photograph. The brief
          rules out blurring the image, and this does not: the picture stays
          sharp everywhere the panel is not, and behind the panel it is a glass
          surface rather than a soft photograph. `supports-` guards it so a
          browser without backdrop-filter simply gets the flat translucency,
          which is already enough on its own.
        */}
        <div className="border-s border-white/10 bg-[rgb(8_20_32_/_0.5)] px-6 py-0 backdrop-blur-[2px] sm:px-8 lg:px-9">
          {/*
            Each paragraph carries its own hairline and index. Four unbroken
            paragraphs at this length read as an essay; divided, they read as
            four separate reasons, which is what they are.
          */}
          <ol className="flex flex-col">
            {gulfDifference.paragraphs.map((paragraph, index) => (
              <li key={paragraph} className="border-t border-white/12 first:border-t-0">
                <Reveal delay={index * 110}>
                  {/*
                    The numeral column is gone with the 01/02/03 format, and the
                    grid went with it: a 2.5rem gutter with nothing in it would
                    have indented every paragraph past the section's measure.
                  */}
                  <div className="py-4">
                    <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                      {paragraph}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          {/*
            The closing line, set at statement scale under the four reasons.
            It is the firm's position rather than another observation, so it
            sits apart from the numbered set and carries no index.

            A bronze hairline above it rather than the neutral one the
            paragraphs use - the only place in the section where the accent
            marks a change of register rather than a division.
          */}
          <Reveal delay={480} variant="mask">
            <span
              aria-hidden="true"
              className="mt-7 block h-px w-16 bg-[linear-gradient(90deg,var(--color-accent),transparent)]"
            />
            <p className="mt-5 mb-6 max-w-[44ch] font-display text-h3 leading-snug text-balance">
              {gulfDifference.closing}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
