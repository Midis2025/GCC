import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { photos } from "@/data/imagery";
import { arabicGap } from "@/data/home";

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
export function ArabicGap() {
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

      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-start lg:gap-x-20">
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
        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-stretch">
          {/*
            The panel STRETCHES to the text column rather than holding a fixed
            ratio, and that is measured rather than guessed. At a fixed 4/5 it
            came out 212px shorter than the left column at 1440 and 546px
            shorter at 1024 - the two-column range where the text wraps hardest
            and the panel does not grow with it - which left an obvious hole
            under the photograph.

            `self-stretch` gives this grid item a definite height taken from the
            row, which is what lets `h-full` resolve down the chain. A
            percentage height against an auto-height parent collapses to zero,
            which is why every link below has to carry it explicitly.

            Below `lg` the columns stack and there is no row to stretch to, so
            the aspect ratios take over again - and they are not the same ratio
            at both sizes. A phone gets the tall 4:5 crop, but a tablet at 4:5
            produced a 937px-high photograph that owned the whole screen and
            pushed the section to 1852px, so from 640 up it goes wide at 16:10.
          */}
          <Reveal variant="media" delay={320} className="relative lg:h-full">
            <Figure
              photo={photos.arabicGap}
              ratio="tall"
              overlay="side"
              className="arabic-panel w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[26rem]"
              sizes="(min-width: 1024px) 42vw, 100vw"
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
              <li key={concept.number}>
                <Reveal delay={420 + index * 110}>
                  <div className="group flex items-baseline gap-5 border-t border-white/12 py-5 transition-colors duration-500 hover:border-(--color-accent)/45">
                    <span
                      aria-hidden="true"
                      className="num font-display-sm text-[0.625rem] tracking-[0.14em] text-(--color-accent)"
                    >
                      {concept.number}
                    </span>
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
