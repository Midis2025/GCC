import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { photos } from "@/data/imagery";
import { getDictionary, pick } from "@/content";
import { introContentAr } from "@/content/ar/homepage";
import { introContent as introContentEn } from "@/data/homepage";

/**
 * Positioning statement.
 *
 * Editorial split: the statement and copy hold a narrow left column while a
 * tall photograph runs the right, deliberately breaking the section's bottom
 * edge so the band does not read as a rectangle stacked on a rectangle. A
 * floating caption plate overlaps the image from the text side, tying the two
 * columns together across the gutter.
 *
 * The six principles then run underneath as an indexed hairline grid - no
 * cards, no boxes, just rules and numerals, which is a different rhythm from
 * anything above it on the page.
 */
export async function Intro() {
  const introContent = await pick({ en: introContentEn, ar: introContentAr });
  const t = await getDictionary();

  return (
    <Section spacing="lg" aria-labelledby="intro-heading" className="relative overflow-hidden">
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-start">
        {/* No top offset: the section label and the top edge of the photograph
            share a baseline, which is what makes the two columns read as one
            band rather than as two blocks that happen to sit side by side. */}
        <div>
          <Reveal>
            <SectionLabel>{introContent.label}</SectionLabel>
            <Heading id="intro-heading" level={2} size="display" className="mt-5 max-w-[13ch]">
              {introContent.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120} className="mt-9 flex max-w-[54ch] flex-col gap-6">
            {introContent.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lead text-(--color-foreground-muted)">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {/*
          The photograph is pulled back out to the page edge on large screens.
          A negative margin of exactly one gutter rather than a full-bleed
          wrapper keeps it inside the Container's grid, so nothing can push the
          page wider than 100vw - body overflow-x is a guard, not the layout
          mechanism. It reads `--gutter` rather than restating the padding,
          which is why it stays flush at every width rather than only at the
          two the old `-mr-12 / -mr-16` pair happened to match.
        */}
        {/*
          The caption plate is a SIBLING of the media Reveal, not a child.
          `variant="media"` animates clip-path, and a clip region on the parent
          clips absolutely positioned descendants even after the animation
          settles - which cut the overhanging plate in half. Only the
          photograph goes inside the clip; the plate is positioned against this
          wrapper instead.
        */}
        <div className="relative lg:-me-(--gutter)">
          <Reveal variant="media" delay={200}>
            {/*
              Square rather than 4:5. The taller crop stood ~300px clear of the
              text column beside it, leaving a void at the bottom of the copy -
              the plate overhanging into that corner is what now closes it.

              The `2xl` step applies that same rule one size further out. Once
              the content column stops wrapping the copy, the text block gets
              shorter while a square frame keeps getting taller, and the gap
              the square was chosen to close re-opens. 4:3 holds the balance
              at 1600px and beyond.
            */}
            {/*
              A CUTOUT now, so no scrim - `Figure` suppresses one anyway, but
              leaving `overlay="veil"` here would read as though this frame
              still carried it.

              Everything else about the frame is unchanged: same square ratio,
              same 4:3 above 2xl, same `sizes`. `2xl:aspect-[4/3]` stays even
              though a square asset cannot fill it - the frame is what the
              layout is built around and the question plate overhangs its lower
              edge; the cutout simply centres in the wider box.
            */}
            <Figure
              photo={photos.introTowers}
              ratio="square"
              className="2xl:aspect-[4/3]"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </Reveal>

          <div className="absolute -bottom-6 start-4 z-10 max-w-[19rem] border-s-2 border-(--color-accent) bg-(--color-canvas) py-5 ps-6 pe-5 shadow-[var(--shadow-lg)] sm:-bottom-8 sm:start-6 lg:-start-14">
            <p className="text-label uppercase text-(--color-foreground-subtle)">
              {t.sections.questionBehindTheWork}
            </p>
            <p className="mt-3 font-display text-[1.0625rem] leading-snug text-balance">
              Does the market understand this business the way its leadership intends?
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[calc(var(--space-section-sm)+1.5rem)] border-t border-(--color-border) pt-2">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
          {introContent.principles.map((principle, index) => (
            <li key={principle.title}>
              <Reveal
                delay={index * 70}
                className="flex h-full border-b border-(--color-border) py-8 sm:py-9 lg:border-b-0 lg:pe-10"
              >
                <div>
                  <h3 className="text-[1.0625rem] font-medium tracking-tight">{principle.title}</h3>
                  <p className="mt-2.5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
