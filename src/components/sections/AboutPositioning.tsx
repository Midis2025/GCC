import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { aboutPositioning } from "@/data/about";

/**
 * Positioning.
 *
 * An editorial split: the heading and prose hold the left, and the page's one
 * pull-quote becomes the right-hand anchor rather than a block tucked under
 * the last paragraph.
 *
 * The quote is set three ways at once, which is the whole idea - an enormous
 * ghosted repetition of the word CLARITY behind it for depth, a bronze
 * quotation mark hung outside the text block, and the line itself at display
 * size. None of the three is decoration alone: the ghost gives the column
 * weight against the prose beside it, the mark identifies the line as a quote
 * without a speaker being invented for it, and the size is what earns it the
 * right to interrupt.
 *
 * "Clarity is a commercial position." is the existing quote, unchanged, and it
 * is also the heading of the section immediately below - which is deliberate.
 * The quote states the claim; the next section argues it.
 */
export function AboutPositioning() {
  return (
    <Section spacing="lg" aria-labelledby="about-positioning">
      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-20">
        {/* Heading and prose. */}
        <div>
          <Reveal>
            <SectionLabel>{aboutPositioning.label}</SectionLabel>
            <Heading id="about-positioning" level={2} size="h2" className="mt-5 max-w-[18ch]">
              {aboutPositioning.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120} className="mt-9 flex flex-col gap-6">
            {aboutPositioning.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {/*
          The quote. Sticky from `lg` up so it holds while the prose beside it
          is read, which is what makes it read as the conclusion of that prose
          rather than as a caption to it.
        */}
        <Reveal delay={200} className="lg:pt-3">
          <figure className="relative isolate lg:sticky lg:top-[calc(var(--header-h)+4rem)]">
            {/*
              Ghosted repetition, sized so the whole word fits the column.

              It was set larger to begin with and ran off the right edge, which
              read as a rendering fault rather than as depth - a word broken
              mid-stroke by nothing looks like a mistake, however faint it is.
              Sized in vw so it stays proportional to the space rather than
              dominating a narrow one.
            */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-5 -start-1 -z-10 select-none font-display leading-[0.8] tracking-tight text-(--color-foreground)/[0.05] text-[clamp(3.5rem,8vw,7rem)]"
            >
              Clarity
            </span>

            <blockquote className="relative border-t border-(--color-accent)/40 pt-9">
              {/*
                The mark is typographic, not an icon, and it is aria-hidden -
                a screen reader gets the sentence and the <blockquote>, which
                is the whole content. Announcing a stray quotation glyph in
                front of it would only add noise.
              */}
              <span
                aria-hidden="true"
                className="absolute -top-1 start-0 font-display text-[3.5rem] leading-none text-(--color-accent)/70"
              >
                &ldquo;
              </span>

              <p className="mt-9 max-w-[22ch] font-display text-h2 leading-[1.12] text-balance">
                Clarity is a commercial position.
              </p>

              <span
                aria-hidden="true"
                className="about-rule mt-9 block h-px w-full max-w-[14rem] bg-[linear-gradient(90deg,var(--color-accent),transparent)]"
              />
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
