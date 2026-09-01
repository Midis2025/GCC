import NextImage from "next/image";

import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LocaleLink } from "@/components/layout/LocaleLink";
import { getDictionary, pick } from "@/content";
import { ConnectedWorldMap } from "@/components/visuals/ConnectedWorldMap";
import { backdrops } from "@/data/imagery";
import { insightMapAr } from "@/content/ar/world-connections";
import { insightMap as insightMapEn, narrowMap } from "@/data/world-connections";
import { cn } from "@/lib/utils";
import {
  bilingualIntentAr,
  editorialPrinciplesAr,
  insightCtaAr,
  insightSystemAr,
} from "@/content/ar/insight-page";
import {
  bilingualIntent as bilingualIntentEn,
  editorialPrinciples as editorialPrinciplesEn,
  insightCta as insightCtaEn,
  insightSystem as insightSystemEn,
} from "@/data/insight-page";

/**
 * ============================================================================
 * INSIGHT IS PART OF THE COMMUNICATION SYSTEM
 * ============================================================================
 * A connected world map, replacing the four-line cross diagram that stood here.
 *
 * The X said nothing. Four lines from a circle to four corners is the visual
 * language of a generic technology network, and it could have illustrated any
 * business on earth. The one thing this section needs a picture to say is where
 * the work happens - international companies on one side, the Gulf on the other
 * - and that is a map, not a graph.
 *
 * The map itself lives in `components/visuals/ConnectedWorldMap` and is shared;
 * this page passes it the connections that suit an Insight reader, which are
 * the sector-context ones. Other pages pass their own.
 *
 * COMPLIANCE: the lines represent cross-border company and market connectivity.
 * They do NOT represent offices, registrations, licences or relationships, and
 * the caption under the map says so in standing text. Do not add an origin that
 * would read as a place the firm operates from.
 */
export async function InsightSystemSection() {
  const t = await getDictionary();
  const insightSystem = await pick({ en: insightSystemEn, ar: insightSystemAr });
  const insightMap = narrowMap(await pick({ en: insightMapEn, ar: insightMapAr }));

  return (
    <Section
      spacing="lg"
      tone="dark"
      aria-labelledby="insight-system"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(70%_70%_at_50%_20%,#1a2836_0%,#0f1924_54%,#0c141d_100%)]"
      />

      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-x-20">
        <div>
          <Reveal>
            <SectionLabel>{insightSystem.label}</SectionLabel>
            <Heading id="insight-system" level={2} size="display" className="mt-5 max-w-[15ch]">
              {insightSystem.heading}
            </Heading>
          </Reveal>

          <Reveal delay={140} className="mt-8 flex flex-col gap-5">
            {insightSystem.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          {/*
            The four services as real links. The diagram is decorative, so this
            list is where the connections actually live for a keyboard or a
            screen reader - and it is genuinely useful navigation besides.
          */}
          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {insightSystem.nodes.map((node, index) => (
              <li key={node.key}>
                <Reveal delay={220 + index * 90}>
                  {/*
                    `LocaleLink`, so a reader who reaches this diagram in
                    Arabic arrives at the Arabic service page. These were the
                    last four internal links on the page still written as bare
                    anchors.
                  */}
                  <LocaleLink
                    href={node.href}
                    className="group flex items-center gap-3 border-t border-white/12 py-4 text-[0.9375rem] transition-colors duration-500 hover:text-(--color-accent) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                  >
                    <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-(--color-accent)" />
                    {node.term}
                  </LocaleLink>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={200}>
          <ConnectedWorldMap
            nodes={insightMap.nodes}
            connections={insightMap.connections}
            captions={insightMap.captions}
          />
        </Reveal>
      </div>

      {/*
        COMPLIANCE. The same standing denial every map surface carries, shared
        from `GlobalConnection` so the three cannot drift apart. Not optional,
        not collapsible, not a footnote.
      */}
      <Reveal delay={600}>
        <p className="mt-12 max-w-[76ch] border-t border-white/12 pt-8 text-sm leading-relaxed text-(--color-foreground-subtle)">
          {t.maps.denial}
        </p>
      </Reveal>
    </Section>
  );
}

/**
 * ============================================================================
 * BUILT FOR ENGLISH AND ARABIC COMMUNICATION
 * ============================================================================
 * A split: the two words either side of a hairline that draws between them.
 *
 * COMPLIANCE, and it is the reason this section is written the way it is.
 * There is NO Arabic edition of this site. The paragraph says the architecture
 * supports one - which is true, `InsightItem.language` exists for exactly that
 * - and `bilingualIntent.note` states plainly that nothing is published in
 * Arabic yet.
 *
 * There is deliberately no language switcher. A control implying an Arabic
 * edition that does not exist would be the first thing an Arabic-reading
 * visitor tried, and the last thing they trusted.
 *
 * The Arabic word is `lang="ar"` and `dir="rtl"` so it is pronounced and
 * shaped correctly, but it is NOT hidden from assistive technology: unlike the
 * decorative mark on the homepage, this one is content - it is the language
 * being named.
 */
export async function BilingualSection() {
  const bilingualIntent = await pick({ en: bilingualIntentEn, ar: bilingualIntentAr });

  return (
    <Section spacing="lg" tone="muted" aria-labelledby="insight-bilingual">
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-24">
        <Reveal>
          <SectionLabel>{bilingualIntent.label}</SectionLabel>
          <Heading id="insight-bilingual" level={2} size="h2" className="mt-5 max-w-[16ch]">
            {bilingualIntent.heading}
          </Heading>
          <p className="mt-8 max-w-[54ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
            {bilingualIntent.paragraph}
          </p>
          <p className="mt-6 text-sm text-(--color-foreground-subtle)">{bilingualIntent.note}</p>
        </Reveal>

        {/* The two words, either side of a connector that draws between them. */}
        <Reveal delay={200} className="flex items-center">
          <div className="flex w-full items-center gap-6 sm:gap-10">
            <span className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-none">
              {bilingualIntent.english}
            </span>

            <span
              aria-hidden="true"
              className="insight-connector relative h-px flex-1 origin-left bg-(--color-accent)"
            />

            <span
              lang="ar"
              dir="rtl"
              /*
                The site's own Arabic face first, with the previous system
                stack kept behind it as the fallback it always was. This mark
                names a language, so it should be set in the face that
                language is set in everywhere else on the site rather than in
                whatever the device happens to have.
              */
              className="font-[var(--font-arabic),system-ui,'Segoe_UI','Noto_Naskh_Arabic','Geeza_Pro',serif] text-[clamp(1.75rem,4vw,3rem)] leading-none"
            >
              {bilingualIntent.arabic}
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/**
 * Editorial principles. Heading on the left, the four standards on the right.
 *
 * ---------------------------------------------------------------------------
 * THE STAIRCASE IS GONE
 * ---------------------------------------------------------------------------
 * Each principle used to be inset further than the one above it, on a per-item
 * custom property. The rule sits on the TOP of each <li>, so indenting an item
 * indented its rule with it: measured at 1440, the four dividers began at 72,
 * 128, 184 and 240px and all ended at the container edge, giving four different
 * start positions AND four different widths down a single list.
 *
 * The four terms started at those same four positions, which is what stopped
 * the set reading as a list of standards a reader can scan in one movement.
 * They now share one left edge, and so do the dividers.
 *
 * ---------------------------------------------------------------------------
 * WHY TWO COLUMNS
 * ---------------------------------------------------------------------------
 * The heading sat in a full-width row of its own with the list beneath it, so
 * the eye crossed a whole empty band to get from one to the other, and every
 * row carried a 571px description inside a 1296px box - about 725px of nothing
 * to the right of each line.
 *
 * Heading left, standards right. The two halves are now beside each other
 * rather than stacked with a gap between them, and the dividers span the
 * standards column rather than the page.
 *
 * COMPLIANCE: the fourth principle is the page's own statement of its limits
 * and is not decoration - no recommendations, no price forecasts, no
 * undisclosed client relationships. It stays last so it reads as the standard
 * the other three are held to.
 */
export async function EditorialPrinciplesSection() {
  const editorialPrinciples = await pick({
    en: editorialPrinciplesEn,
    ar: editorialPrinciplesAr,
  });

  return (
    <Section spacing="lg" aria-labelledby="insight-principles">
      {/*
        NO INNER CAP. This used to be held to 92rem / 1472px, which made it
        the one section on this page narrower than the sections either side of
        it - measured at 1920: 1472px here against 1728px above and below, a
        256px step in the page's own edge. It now takes the full content width
        that `Container` gives every other section, so the page has one
        vertical down its whole length.

        Text width is controlled where it belongs - on the paragraphs, in `ch`
        - rather than by squeezing the whole section.

        The split favours the standards column, which carries four terms and
        four descriptions against a two-line heading. Even columns left the
        list cramped at 1024 while the heading sat in 440px of mostly empty
        space; 0.82fr/1fr gives the copy the room and still leaves the headline
        a full measure.
      */}
      <div
        className={cn(
          "grid gap-y-[var(--space-heading)]",
          "lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:items-start",
          "lg:gap-x-[clamp(2.5rem,4vw,6rem)]",
        )}
      >
        <Reveal>
          <SectionLabel>{editorialPrinciples.label}</SectionLabel>
          {/*
            17ch rather than 12ch. At 12ch the headline broke over three lines;
            17ch is the measure at which it settles on the two it is written as,
            "How We / Approach Insight". The type size is untouched.
          */}
          <Heading id="insight-principles" level={2} size="display" className="mt-5 max-w-[17ch]">
            {editorialPrinciples.heading}
          </Heading>
        </Reveal>

        {/*
          `lg:pt-2` only. It drops the first term onto the heading's cap line
          rather than its box top, so the two columns start together instead of
          the list floating a few pixels high.
        */}
        <ol className="flex flex-col lg:pt-2">
          {editorialPrinciples.principles.map((principle, index) => (
            <li
              key={principle.term}
              /*
                One spacing rule for every item: 36px of air, the rule, 36px of
                air. No item can end up taller than another for any reason but
                its own copy.
              */
              className="not-first:mt-9 not-first:pt-9"
            >
              <Reveal delay={index * 120} className="relative">
                {/*
                  The rule between the standards, and it is INSIDE the reveal
                  on purpose.

                  It was a `border-top` on the <li>, which sits outside every
                  animated element - so the three rules painted instantly at
                  full strength while the text they belong to was still fading
                  in. On a section whose entire structure is those three lines,
                  that is what made the whole thing look static: the skeleton
                  arrived first and the content caught up.

                  As a positioned span it inherits its item's `data-visible`
                  and its stagger, so each rule draws itself as its own
                  standard arrives. `-top-9` puts it back on the 36px boundary
                  the padding creates, so nothing moved.

                  Not on the first item: the heading beside it already opens
                  the block, and a rule across the top of the column read as a
                  stray line.
                */}
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="principle-rule absolute inset-x-0 -top-9 block h-px bg-(--color-border)"
                  />
                )}
                <h3 className="font-display text-h3 tracking-tight">{principle.term}</h3>
                <p className="mt-4 max-w-[58ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                  {principle.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/**
 * The closing call to action.
 *
 * Image-backed with a navy overlay, one primary action and one quiet
 * secondary. It replaces the sitewide `CTASection` on this page only, because
 * that band routes to Contact and this page's reader wants the investor list.
 */
export async function InsightCtaSection() {
  const insightCta = await pick({ en: insightCtaEn, ar: insightCtaAr });

  return (
    <section
      className="tokens-dark relative isolate overflow-hidden bg-(--midnight) py-[var(--space-section-lg)]"
      aria-labelledby="insight-cta"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <NextImage
          src={backdrops.cta.src}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          style={{ objectPosition: backdrops.cta.position }}
          className="photo-grade object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(108deg,rgba(12,20,29,0.95)_10%,rgba(12,20,29,0.86)_50%,rgba(12,20,29,0.7)_100%)] rtl:bg-[linear-gradient(252deg,rgba(12,20,29,0.95)_10%,rgba(12,20,29,0.86)_50%,rgba(12,20,29,0.7)_100%)]"
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      <Container className="relative z-10">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
          <div>
            <Reveal>
              <SectionLabel>{insightCta.label}</SectionLabel>
              <Heading id="insight-cta" level={2} size="display" className="mt-5 max-w-[14ch]">
                {insightCta.heading}
              </Heading>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-7 max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                {insightCta.paragraph}
              </p>
            </Reveal>
          </div>

          <Reveal delay={220} className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
            <Button href={insightCta.primary.href} size="lg" withArrow>
              {insightCta.primary.label}
            </Button>
            <LocaleLink
              href={insightCta.secondary.href}
              className="link-underline py-1 text-[0.9375rem] text-(--color-foreground-muted) transition-colors duration-500 hover:text-(--color-foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
            >
              {insightCta.secondary.label}
            </LocaleLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
