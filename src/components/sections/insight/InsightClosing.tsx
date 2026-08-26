import NextImage from "next/image";

import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MAP_DENIAL } from "@/components/sections/GlobalConnection";
import { ConnectedWorldMap } from "@/components/visuals/ConnectedWorldMap";
import { backdrops } from "@/data/imagery";
import { insightMap } from "@/data/world-connections";
import { cn } from "@/lib/utils";
import {
  bilingualIntent,
  editorialPrinciples,
  insightCta,
  insightSystem,
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
export function InsightSystemSection() {
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
                  <a
                    href={node.href}
                    className="group flex items-center gap-3 border-t border-white/12 py-4 text-[0.9375rem] transition-colors duration-500 hover:text-(--color-accent) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                  >
                    <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-(--color-accent)" />
                    {node.term}
                  </a>
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
          {MAP_DENIAL}
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
export function BilingualSection() {
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
              className="font-[system-ui,'Segoe_UI','Noto_Naskh_Arabic','Geeza_Pro',serif] text-[clamp(1.75rem,4vw,3rem)] leading-none"
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
 * Editorial principles. Staggered typography, oversized ghosted numerals.
 *
 * COMPLIANCE: principle 04 is the page's own statement of its limits and is
 * not decoration - no recommendations, no price forecasts, no undisclosed
 * client relationships. It stays last so it reads as the standard the other
 * three are held to.
 */
export function EditorialPrinciplesSection() {
  return (
    <Section spacing="lg" aria-labelledby="insight-principles">
      <Reveal>
        <SectionLabel>{editorialPrinciples.label}</SectionLabel>
        <Heading id="insight-principles" level={2} size="display" className="mt-5 max-w-[12ch]">
          {editorialPrinciples.heading}
        </Heading>
      </Reveal>

      <ol className="mt-[var(--space-heading)] flex flex-col">
        {editorialPrinciples.principles.map((principle, index) => (
          <li
            key={principle.number}
            style={{ "--step": index } as React.CSSProperties}
            className={cn(
              "border-t border-(--color-border) lg:[margin-left:calc(var(--step)*3.5rem)]",
              /* Last principle: the section's padding already provides the air. */
              index === editorialPrinciples.principles.length - 1 && "[&>div>div]:pb-0",
            )}
          >
            <Reveal delay={index * 120}>
              <div className="relative grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-x-5 overflow-hidden py-9 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-x-10">
                <span
                  aria-hidden="true"
                  className="num font-display leading-none text-(--color-accent)/25 text-[clamp(2rem,3.5vw,3rem)]"
                >
                  {principle.number}
                </span>

                <div className="min-w-0">
                  <h3 className="font-display text-h3 tracking-tight">{principle.term}</h3>
                  <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {principle.description}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
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
export function InsightCtaSection() {
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
        className="absolute inset-0 -z-10 bg-[linear-gradient(108deg,rgba(12,20,29,0.95)_10%,rgba(12,20,29,0.86)_50%,rgba(12,20,29,0.7)_100%)]"
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
            <a
              href={insightCta.secondary.href}
              className="link-underline py-1 text-[0.9375rem] text-(--color-foreground-muted) transition-colors duration-500 hover:text-(--color-foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
            >
              {insightCta.secondary.label}
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
