import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pick } from "@/content";
import { gulfDifferenceAr } from "@/content/ar/home-depth";
import { gulfDifference as gulfDifferenceEn } from "@/data/home-depth";

/**
 * ============================================================================
 * THE REGIONAL CASE
 * ============================================================================
 * The argument the business rests on: the Gulf is not a branch office of
 * another financial centre, and the parts of an overseas investor-relations
 * approach that travel are the materials rather than the method.
 *
 * TYPOGRAPHY-LED, deliberately, and it is the only section of its kind on the
 * homepage. The page already carries a photographic split (`Intro`), a
 * photographic mosaic (`Segments`), a globe, a sticky panel and two dark
 * statement bands. A fourth picture here would have been the fifth image in a
 * row; four paragraphs of argument set against a fine architectural grid is a
 * different rhythm, and the rhythm is the point.
 *
 * The heading is sticky against the paragraphs it introduces, so the claim
 * stays on screen while the four reasons for it are read - which is what makes
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
    <Section spacing="lg" aria-labelledby="home-regional-case" className="relative isolate">
      {/*
        A fine rule field rather than a photograph. It reads as drawing rather
        than decoration and gives the section depth without another image.
      */}
      <div
        aria-hidden="true"
        className="rule-field absolute inset-0 -z-10 [--rule-gap:6rem] opacity-60"
      />

      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-x-24">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+4rem)] lg:self-start">
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

        <div>
          {/*
            Each paragraph carries its own hairline and index. Four unbroken
            paragraphs at this length read as an essay; divided, they read as
            four separate reasons, which is what they are.
          */}
          <ol className="flex flex-col">
            {gulfDifference.paragraphs.map((paragraph, index) => (
              <li key={paragraph} className="border-t border-(--color-border)">
                <Reveal delay={index * 110}>
                  {/*
                    The numeral column is gone with the 01/02/03 format, and the
                    grid went with it: a 2.5rem gutter with nothing in it would
                    have indented every paragraph past the section's measure.
                  */}
                  <div className="py-7">
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
          */}
          <Reveal delay={480} variant="mask">
            <p className="mt-12 max-w-[44ch] font-display text-h3 leading-snug text-balance">
              {gulfDifference.closing}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
