import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cityPhotos } from "@/data/imagery";
import { pick } from "@/content";
import { marketContextsAr } from "@/content/ar/home-depth";
import { marketContexts as marketContextsEn } from "@/data/home-depth";

/**
 * ============================================================================
 * THREE MARKETS. DIFFERENT CONTEXTS.
 * ============================================================================
 * Dubai, Abu Dhabi and Riyadh as three tall editorial panels.
 *
 * The panels are STAGGERED vertically - the middle one dropped, the third
 * dropped further - rather than sitting in a flush row. Three equal panels in
 * a line is the composition the segment mosaic on this same page already uses,
 * and repeating it here would have made the two read as one idea stated twice.
 * The stagger also does something true: it stops the three reading as ranked.
 *
 * ---------------------------------------------------------------------------
 * CONTENT INTEGRITY
 * ---------------------------------------------------------------------------
 * Every description is a broad, publicly observable characterisation of a
 * market. None claims an office, a registration, a licence, a relationship or
 * any degree of access, and none may be edited to imply one.
 *
 * `marketContexts.disclaimer` states that in standing text beneath the panels.
 * It is not decoration and not collapsible: three cities named under a firm's
 * logo, over photographs of those cities, is the single easiest arrangement on
 * this site to misread as a footprint. It stays visible at every width.
 */
export async function MarketContexts() {
  const marketContexts = await pick({ en: marketContextsEn, ar: marketContextsAr });

  return (
    <Section spacing="lg" aria-labelledby="home-market-contexts" width="wide">
      <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-x-24">
        <Reveal>
          <SectionLabel>{marketContexts.label}</SectionLabel>
          <Heading
            id="home-market-contexts"
            level={2}
            size="display"
            className="mt-5 max-w-[14ch]"
          >
            {marketContexts.heading}
          </Heading>
        </Reveal>

        <Reveal delay={140}>
          <p className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
            {marketContexts.intro}
          </p>
        </Reveal>
      </div>

      <ul className="mt-[var(--space-heading)] grid gap-x-8 gap-y-12 sm:grid-cols-3 lg:gap-x-12">
        {marketContexts.cities.map((city, index) => (
          <li
            key={city.key}
            /*
              The stagger. A per-item custom property rather than three
              hard-coded offsets, so a fourth market would step correctly
              without anyone remembering to add a matching class.
            */
            style={{ "--drop": index } as React.CSSProperties}
            className="sm:[margin-top:calc(var(--drop)*2.5rem)] lg:[margin-top:calc(var(--drop)*4rem)]"
          >
            <Reveal variant="media" delay={index * 140}>
              <Figure
                /*
                  `key` is an identifier, not copy - it selects the city's
                  photograph. `Localised` widens every string, this one
                  included, so it is narrowed back here. The Arabic module
                  repeats `dubai`, `abu-dhabi` and `riyadh` verbatim; a
                  translated key would pick the wrong city's image.
                */
                photo={cityPhotos[city.key as keyof typeof cityPhotos]}
                ratio="tall"
                overlay="soft"
                zoom
                className="w-full"
                sizes="(min-width: 640px) 30vw, 100vw"
              />
            </Reveal>

            <Reveal delay={index * 140 + 120}>
              <div className="mt-7">
                <span
                  aria-hidden="true"
                  className="block h-px w-10 bg-(--color-accent)"
                />
                <h3 className="mt-5 font-display text-h3 tracking-tight">{city.city}</h3>
                <p className="mt-1.5 text-label uppercase text-(--color-foreground-subtle)">
                  {city.country}
                </p>
                <p className="mt-5 max-w-[36ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                  {city.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* CONTENT INTEGRITY. Standing text. See the note above. */}
      <Reveal delay={520}>
        <p className="mt-14 max-w-[62ch] text-sm leading-relaxed text-(--color-foreground-subtle)">
          {marketContexts.disclaimer}
        </p>
      </Reveal>
    </Section>
  );
}
