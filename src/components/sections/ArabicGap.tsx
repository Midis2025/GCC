import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { photos } from "@/data/imagery";
import { pick } from "@/content";
import { arabicGapAr } from "@/content/ar/home";
import { arabicGap as arabicGapEn } from "@/data/home";

/**
 * ============================================================================
 * THE ARABIC GAP
 * ============================================================================
 * The clearest differentiator the firm has, and previously the flattest block
 * on the homepage: a label, one line, one paragraph and a button on an empty
 * dark field. The claim was strong and the section did nothing with it.
 *
 * It is now a split editorial composition - the argument on the left, an
 * editorial environment on the right, and between them a drawn route from
 * English to Arabic to regional distribution. That route is the whole point of
 * the section stated as a graphic rather than as another sentence.
 *
 * ---------------------------------------------------------------------------
 * Why the DOM order is what it is
 * ---------------------------------------------------------------------------
 * The blocks are placed explicitly on the `lg` grid rather than being written
 * as two columns, and that is load-bearing. Written as columns the natural
 * source order gives a phone: statement, route, concepts, THEN the photograph -
 * so the visual arrives after the argument it is meant to accompany, at the
 * bottom of a long scroll.
 *
 * Source order is therefore the MOBILE order - statement, visual, route,
 * concepts, call to action - and `lg:col-start` / `lg:row-start` put the visual
 * back into the right-hand column on a wide screen. One tree, two readings,
 * and nothing duplicated or hidden to achieve it.
 *
 * ---------------------------------------------------------------------------
 * Motion
 * ---------------------------------------------------------------------------
 * Everything hangs off the existing `Reveal` and its `data-visible` flag, and
 * off `.about-rule`, which the site already uses for a gold rule that draws
 * itself. Nothing new was invented: the section reads as a sequence because
 * the delays are staggered, not because it runs its own animation engine.
 *
 * The route line and the Arabic mark have their own rules in globals.css,
 * keyed the same way, and both are covered by the reduced-motion block there.
 */
export async function ArabicGap() {
  const arabicGap = await pick({ en: arabicGapEn, ar: arabicGapAr });

  return (
    <Section
      spacing="lg"
      tone="dark"
      aria-labelledby="home-arabic-gap"
      className="relative isolate overflow-hidden"
    >
      {/* Ground, unchanged: the same radial and grid the section always had. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[radial-gradient(85%_80%_at_22%_12%,#1a2836_0%,#0f1924_54%,#0c141d_100%)]"
      />
      <div
        aria-hidden="true"
        className="about-grid absolute inset-0 -z-20 [--about-grid-gap:6.5rem]"
      />
      {/*
        Added: a soft lift behind the right-hand panel, so the photograph sits
        in a pool of light rather than being pasted onto a flat field. Kept
        wide and weak - at any strength it reads as a spotlight.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(48%_58%_at_82%_38%,rgba(184,148,95,0.10)_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.42),transparent)]"
      />

      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.62fr)_minmax(0,0.88fr)] lg:items-start lg:gap-x-20">
        {/* ---------------------------------------------------------------
            1 - The statement. Column one, row one.
            --------------------------------------------------------------- */}
        <div className="lg:col-start-1 lg:row-start-1">
          <Reveal>
            <span
              aria-hidden="true"
              className="about-rule mb-7 block h-px w-16 bg-[linear-gradient(90deg,var(--color-accent),transparent)]"
            />
            <SectionLabel>{arabicGap.label}</SectionLabel>
          </Reveal>

          <Reveal delay={120} variant="mask">
            {/*
              20ch. Wide enough that the statement sets in four lines rather
              than five - at 17ch the column grew tall enough to push the route
              and the concepts most of a screen below the paragraph - and still
              narrow enough that "Arabic. We do." keeps its own line, which is
              the break the sentence is built around.
            */}
            <Heading id="home-arabic-gap" level={2} size="display" className="mt-7 max-w-[20ch]">
              {arabicGap.statement}
            </Heading>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-8 max-w-[54ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
              {arabicGap.paragraph}
            </p>
          </Reveal>
        </div>

        {/* ---------------------------------------------------------------
            2 - The panel. Second in source order, so a phone meets it here;
            column two on a wide screen, spanning both rows.
            --------------------------------------------------------------- */}
        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
          {/*
            The panel is SIZED, not stretched.

            It used to take its height from the row - `self-stretch`, `h-full`,
            `min-h-[26rem]` - so it grew to match the whole left column: the
            statement, the route, the three concepts and the button. That made
            the supporting visual the tallest object in the section, and on a
            close-up subject it meant the frame was mostly empty magnification.

            A fixed 4:5 instead, top-aligned by the grid`s own `items-start`.
            The column is also narrower - the track went from 0.92fr to 0.88fr
            against a left column widened from 1.08fr to 1.62fr, so the split is
            about 65/35 rather than 54/46. At 1440 that is a 428px panel about
            535px tall against a left column past 700px: clearly the supporting
            element, starting level with the gold rule above the eyebrow.

            `row-span-2` stays. It is what keeps the panel in the right-hand
            column across both rows of the desktop grid; without it the route
            and concepts in row two would slide up beside it.

            Below `lg` the columns stack and the ratios take over, unchanged: a
            phone gets the tall 4:5, and from 640 up it goes wide at 16:10,
            because a tablet at 4:5 produced a 937px-high photograph that owned
            the whole screen.
          */}
          <Reveal variant="media" delay={320} className="relative">
            <Figure
              photo={photos.arabicGap}
              ratio="tall"
              /*
                `veil` rather than `side`.

                `side` is a 100deg gradient running 0.95 at the left edge to
                0.28 at the right - built for a frame with type across it. There
                is no type across this one. The only thing over it is the
                decorative Arabic mark in the bottom-left corner at 14% opacity,
                and this subject is already near-monochrome black keys, so it
                needs a corner to sit in rather than a wall of shadow.

                `veil` gives that corner - 0.44 along the bottom edge, gone by
                the halfway line - and leaves the characters on the keys
                readable, which is the entire reason this photograph and not
                another one is here.
              */
              overlay="veil"
              className="arabic-panel w-full sm:aspect-[16/10] lg:aspect-[4/5]"
              sizes="(min-width: 1024px) 36vw, 100vw"
            />
            {/*
              The Arabic mark, over the panel.

              Decorative and `aria-hidden`: it is the word "Arabic" in Arabic,
              set as a regional mark, and it is NOT a translation of anything on
              this page. Announcing it would tell a screen-reader user the page
              has an Arabic edition, which it does not.

              Bottom LEFT, not right. The `side` scrim is a 100deg gradient
              that is heaviest at the left edge and thinnest at the right, so
              the left is where a pale mark at 14% has a dark enough ground to
              register. Over the screens on the right it read as a smudge.

              The font stack goes to the system Arabic faces deliberately. The
              site's display face carries no Arabic glyphs, so left to itself
              the browser would substitute one anyway - naming the fallback
              means the substitution is chosen rather than accidental.
            */}
            <span
              aria-hidden="true"
              lang="ar"
              dir="rtl"
              className="arabic-mark pointer-events-none absolute bottom-5 start-6 select-none font-[system-ui,'Segoe_UI','Noto_Naskh_Arabic','Geeza_Pro',serif] text-[clamp(3rem,7vw,5.5rem)] leading-none text-[#f4f1eb]"
            >
              {arabicGap.arabicMark}
            </span>
          </Reveal>
        </div>

        {/* ---------------------------------------------------------------
            3 - The route, the concepts and the call to action. Column one,
            row two - directly under the statement on a wide screen, and
            after the panel on a phone.
            --------------------------------------------------------------- */}
        <div className="lg:col-start-1 lg:row-start-2 lg:pt-2">
          {/*
            The route from English to Arabic to distribution.

            Three labels on one rule with a node at each. The rule draws itself
            left to right on entry and the labels light in turn behind it, so
            the sequence is read rather than just seen. It carries no
            information the concepts below do not - it is the shape of them -
            which is why the whole thing is `aria-hidden` and the concepts are
            a real ordered list.
          */}
          <Reveal delay={140} className="arabic-route" aria-hidden="true">
            <div className="relative">
              <div className="relative h-px w-full bg-white/12">
                <span className="arabic-route-line absolute inset-0 block origin-left bg-(--color-accent)" />
              </div>

              <ol className="mt-4 flex items-start justify-between gap-3">
                {arabicGap.route.map((step, index) => (
                  <li
                    key={step}
                    style={{ "--route-index": index } as React.CSSProperties}
                    className="arabic-route-step relative flex flex-col items-start"
                  >
                    <span className="arabic-route-node absolute -top-[1.3125rem] start-0 block h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
                    <span className="num font-display-sm text-[0.625rem] uppercase tracking-[0.16em] text-(--color-foreground)">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* The three concepts. A measure, not a set of cards. */}
          <ol className="mt-12 flex flex-col">
            {arabicGap.concepts.map((concept, index) => (
              <li key={concept.term}>
                <Reveal delay={420 + index * 110}>
                  {/*
                    The numeral that opened each row is gone. `items-baseline`
                    and the gap went with it - with one child left, a baseline
                    flex row is a div with extra words - so the term now sits
                    directly on the rule.
                  */}
                  <div className="group border-t border-white/12 py-5 transition-colors duration-500 hover:border-(--color-accent)/45">
                    <h3 className="text-[1.0625rem] font-medium leading-snug transition-colors duration-500 group-hover:text-(--color-accent)">
                      {concept.term}
                    </h3>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          {/* Last in, and no longer floating in an empty field. */}
          <Reveal delay={780} className="mt-11">
            <Button href={arabicGap.cta.href} variant="outline" withArrow>
              {arabicGap.cta.label}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
