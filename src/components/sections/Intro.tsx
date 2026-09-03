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
 * Open editorial split. The glass is the SECTION - one translucent band of
 * light running the full width, behind everything - and the copy and the
 * photograph sit directly on it. There is no panel around the text, no frame
 * around the picture and no border anywhere: the only edges in the band are
 * the photograph's own, and the inner one is feathered away.
 *
 * GLASS. A warm translucent wash graded across the band, two soft lights
 * diffusing through it, and a backdrop blur behind the whole thing. It reads
 * as architectural glazing rather than as a card, which is the difference
 * between this and the usual frosted rectangle: nothing is outlined, nothing
 * is stacked, and the section still meets the page without a seam.
 *
 * The six principles then run underneath as an indexed hairline grid - no
 * cards, no boxes, just rules and numerals, which is a different rhythm from
 * anything above it on the page.
 */
export async function Intro() {
  const introContent = await pick({ en: introContentEn, ar: introContentAr });
  const t = await getDictionary();

  return (
    <Section
      spacing="md"
      aria-labelledby="intro-heading"
      className="relative isolate overflow-hidden"
    >
      {/*
        The glass, and the whole of it. Absolute against the SECTION - the
        nearest positioned ancestor - so it runs edge to edge behind the
        gutters as well as the columns, which is what stops it reading as a
        panel. `isolate` on the section keeps the -z-10 inside this band rather
        than letting it fall behind the page.

        Four layers, all low contrast: a warm-to-cool grade across the band -
        cream where the copy is, a trace of cool daylight where the photograph
        is - a diffuse light off the picture's top corner, a warmer one under
        the copy, and a broad soft ellipse behind the photograph itself, which
        is what stops a full-bleed picture from meeting bare canvas at its
        feathered edge. A short highlight runs off the top edge: glazing takes
        the light along its top arris, and it is the one cue that reads as
        glass rather than as tint. Measured against the ivory canvas the band
        moves about six percent. The grade is mirrored for RTL so the cool end
        stays on the photograph's side when the columns swap.

        The blur is halved below md. A backdrop-filter over a full-viewport
        band is the most expensive thing in this section and a phone is where
        it costs most, so it buys atmosphere on a desktop and stays cheap on a
        handset, where the band is one column and reads as tone either way.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 select-none bg-[linear-gradient(104deg,rgba(255,252,246,0.9)_0%,rgba(252,250,246,0.5)_38%,rgba(231,236,241,0.62)_100%)] backdrop-blur-[6px] rtl:bg-[linear-gradient(256deg,rgba(255,252,246,0.9)_0%,rgba(252,250,246,0.5)_38%,rgba(231,236,241,0.62)_100%)] md:backdrop-blur-[14px]"
      >
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.6),rgba(255,255,255,0)_100%)]" />
        <div className="absolute -top-48 -end-32 h-[44rem] w-[44rem] bg-[radial-gradient(circle,rgba(255,255,255,0.85),rgba(255,255,255,0)_66%)]" />
        <div className="absolute -bottom-56 -start-40 h-[42rem] w-[42rem] bg-[radial-gradient(circle,rgba(226,219,207,0.55),rgba(226,219,207,0)_68%)]" />
        <div className="absolute inset-y-0 -end-24 hidden w-[62%] bg-[radial-gradient(60%_58%_at_58%_46%,rgba(255,255,255,0.5),rgba(255,255,255,0)_72%)] lg:block" />
      </div>

      {/*
        45 / 55 from xl up, and the photograph then takes the gutter back on
        top of that. At lg the same split leaves the display heading about
        400px and it starts setting five words to a line, so the columns stay
        nearer even until 1280.

        `items-start` and no block-start padding on either child, which is the
        whole of the top alignment: the section label's first pixel and the
        photograph's first pixel are the same row line at every desktop width.
        Nothing here is offset, translated or absolutely placed.
      */}
      <div className="relative grid gap-x-10 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-start lg:gap-x-12 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-x-16">
        {/*
          No wrapper of its own. The section label's top edge and the top edge
          of the photograph are the same pixel - the row is `items-start` and
          neither column carries padding - which is what makes the two read as
          one band rather than as two blocks side by side.
        */}
        <div>
          <Reveal>
            <SectionLabel>{introContent.label}</SectionLabel>
            <Heading id="intro-heading" level={2} size="display" className="mt-5 max-w-[13ch]">
              {introContent.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120} className="mt-8 flex max-w-[54ch] flex-col gap-5">
            {introContent.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lead text-(--color-foreground-muted)">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {/*
          The visual column: photograph, then annotation, both in normal flow.

          The annotation used to be absolutely positioned against this wrapper
          and overhang the section's bottom edge. It is a flow child now with a
          negative block-start margin, which makes the overlap self-limiting -
          the column is exactly as tall as the two elements minus the overlap,
          so nothing can hang into the principles grid however the type
          reflows, and the mobile stack needs no override at all to put the
          annotation under the picture.

          It is still a SIBLING of the media Reveal rather than a child.
          `variant="media"` animates clip-path, and a clip region on the parent
          clips its descendants even after the animation settles.
        */}
        {/*
          FULL BLEED on the outer side from lg up. A negative margin of exactly
          one gutter, read from `--gutter` rather than restated, so the picture
          finishes on the page edge at every width instead of at only the two a
          hard-coded pair would have matched. It stays inside the Container's
          grid - nothing here is measured against the viewport - so the section
          cannot be pushed wider than the page, and the section's own
          overflow-hidden is a guard rather than the mechanism.

          This is what makes the band read as a spread. Feathered on its inner
          edge and running off the outer one, the photograph has no rectangle
          left to be: the copy holds the reading column, the picture holds the
          rest of the screen, and the only vertical edge either of them has is
          the one that dissolves.
        */}
        <div className="relative lg:-me-(--gutter)">
          {/*
            The depth shadow lives HERE rather than on the frame. A shadow on
            the masked element would be clipped by its own mask; on the wrapper
            it is a drop-shadow of the alpha, so it follows the feathered edge
            out to nothing instead of drawing the straight line the mask exists
            to remove. lg and up only - it is the most expensive paint in the
            section and the phone stack has no gutter to cast into.
          */}
          <Reveal
            variant="media"
            delay={200}
            className="lg:[filter:drop-shadow(0_26px_50px_rgba(12,20,29,0.18))]"
          >
            {/*
              No frame, no border, no plate behind it - the photograph is the
              element. Its inner edge is feathered into the band with a mask
              from lg up, where the two columns actually sit side by side; the
              gradient is short (9%) and starts inboard of the near upright, so
              what dissolves is sky and the leaning foot of the leg rather than
              the structure. Mirrored for RTL, so the fade is always on the
              side the copy is on. Below lg the picture is full width with no
              mask at all, because there is no gutter for it to dissolve into.

              RATIO, and it is a height budget rather than a taste for shapes.
              4:3 while the picture is a column - a quarter off the width of a
              16:9 source, and centred that window still holds both uprights
              and the whole crossbeam. 16:9 through md, the one band where the
              stack is full width and 4:3 would put a 575px picture between the
              copy and the annotation; at the source ratio it crops nothing at
              all. From lg the frame stops being a ratio and becomes a HEIGHT
              - `aspect-auto` and a clamp - and that switch is the alignment
              fix rather than a preference.

              A ratio ties the picture's height to its column's width, and this
              column BLEEDS, so it grows faster than the copy beside it ever
              can: the 4:3 that suits a 505px column at 1024 is a 765px picture
              against 536px of paragraphs at 1920. The clamp inverts the
              dependency. Height is the constant, the width takes whatever the
              bleed gives it, and it is the CROP that widens rather than the
              frame that grows. It tops out at 33rem, a shade under the 536px
              the copy column settles at, so the picture finishes ahead of the
              paragraphs by about the height of the annotation instead of by
              half a screen.

              The crop that buys stays inside the subject at every width: 1.63
              at 1280 to 2.03 at 2560 against a 1.78 source, so below 1.78 it
              takes width - at most a fifth, and the uprights survive a fifth -
              and above it takes height off a frame whose topmost structure
              sits at 20%, where 6% off each edge is still sky.

              NOT `max-h`, and not a ladder of `min-[...]` variants either. A
              max-height transfers THROUGH an aspect ratio into a max-width -
              36rem at 7:5 silently capped the frame at 806px and pulled it
              back off the page edge - while an arbitrary `min-[1280px]:`
              variant does not reliably outrank a named `lg:` one in the
              emitted sheet, so a ladder mixing the two lost every step to the
              4:3 underneath it and the picture stayed 4:3 to 2560. One named
              variant carrying one clamp can do neither.
            */}
            <Figure
              photo={photos.introFrame}
              ratio="auto"
              className="aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:h-[clamp(20rem,33vw,33rem)] lg:[mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.42)_2.5%,#000_9%)] lg:rtl:[mask-image:linear-gradient(270deg,transparent_0%,rgba(0,0,0,0.42)_2.5%,#000_9%)]"
              sizes="(min-width: 1280px) 56vw, (min-width: 1024px) 52vw, 100vw"
            />
          </Reveal>

          {/*
            A floating annotation rather than a card: a gold rail, a low
            translucency and a soft shadow, and no border on the other three
            edges at all.

            The overlap is 2.75rem - a little over a quarter of the plate -
            and the block-start padding is 3rem to match it. That pairing is a
            READABILITY constraint rather than a taste one: the padding is what
            decides where the first line sits, so as long as it stays a shade
            larger than the overlap, every line of type clears the photograph
            and sits on the section's own glass. That is the whole reason the
            plate can be as thin as 0.5 and the eyebrow still hold better than
            5:1. Push the overlap past the padding and the label lands on sky,
            where 0.5 would not carry it; the two figures move together or not
            at all.
          */}
          <div className="relative z-10 mt-6 max-w-[17.5rem] border-s-2 border-s-(--color-accent) bg-[rgba(255,253,249,0.5)] pt-6 pb-5 ps-5 pe-4 shadow-[0_20px_44px_-28px_rgba(12,20,29,0.34)] backdrop-blur-[10px] md:backdrop-blur-[16px] lg:-mt-11 lg:-ms-6 lg:pt-12 xl:-ms-12 xl:max-w-[19.5rem]">
            <p className="text-label uppercase text-(--color-foreground-subtle)">
              {t.sections.questionBehindTheWork}
            </p>
            <p className="mt-2.5 font-display text-[1rem] leading-snug text-balance">
              Does the market understand this business the way its leadership intends?
            </p>
          </div>
        </div>
      </div>

      {/*
        `--space-section-sm` flat. It used to carry an extra 1.5rem to clear the
        annotation overhanging the section's bottom edge; the annotation is in
        flow now and clears itself, so the extra is dead height.
      */}
      <div className="relative mt-(--space-section-sm) border-t border-(--color-border) pt-2">
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
