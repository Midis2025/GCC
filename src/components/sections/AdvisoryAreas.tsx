import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pick } from "@/content";
import { advisoryAreasAr } from "@/content/ar/services-depth";
import { advisoryAreas as advisoryAreasEn } from "@/data/services-depth";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * WHAT ADVISORY ACTUALLY PRODUCES
 * ============================================================================
 * Five areas, each set as a two-column row: what it addresses on the left,
 * what it involves on the right, with an oversized index in the margin.
 *
 * The problem/response split is the shape, and it is the right one for this
 * page specifically. Advisory is the least tangible of the four service lines
 * - there is no room, no roadshow and no publication to point at - so the page
 * has to make the work concrete some other way. Naming the situation each area
 * exists to address does that: a reader recognises their own position on the
 * left before reading what would be done about it on the right.
 *
 * Rows are divided by a hairline and nothing is boxed. Five cards here would
 * have been the fourth card grid on the site.
 *
 * ---------------------------------------------------------------------------
 * COMPLIANCE
 * ---------------------------------------------------------------------------
 * `regional-listing` is the highest-risk entry. Its final `involves` item -
 * that this is not advice on the merits of listing or on any security - is a
 * qualifier, not a bullet, and must render with the rest. It is deliberately
 * last so it reads as the boundary of the work rather than as a disclaimer
 * hidden somewhere below.
 *
 * Nothing in this section is a recommendation, and the page's intro already
 * states that the firm makes none. See `data/services-depth.ts`.
 */
export async function AdvisoryAreas() {
  const advisoryAreas = await pick({ en: advisoryAreasEn, ar: advisoryAreasAr });

  return (
    <Section spacing="lg" aria-labelledby="advisory-areas-detail">
      <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-x-24">
        <Reveal>
          <SectionLabel>{advisoryAreas.label}</SectionLabel>
          <Heading
            id="advisory-areas-detail"
            level={2}
            size="display"
            className="mt-5 max-w-[14ch]"
          >
            {advisoryAreas.heading}
          </Heading>
        </Reveal>

        <Reveal delay={140}>
          <p className="max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
            {advisoryAreas.intro}
          </p>
        </Reveal>
      </div>

      <ol className="mt-[var(--space-heading)] flex flex-col">
        {advisoryAreas.areas.map((area, index) => (
          <li
            key={area.key}
            className={cn(
              "border-t border-(--color-border)",
              /* Last row: the section's padding already provides the air. */
              index === advisoryAreas.areas.length - 1 && "[&>div>div]:pb-0 lg:[&>div>div]:pb-0",
            )}
          >
            <Reveal delay={index * 90}>
              <div className="grid gap-x-10 gap-y-7 py-10 lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-14 lg:py-12">
                <span
                  aria-hidden="true"
                  className="num font-display leading-none text-(--color-accent)/25 text-[2rem] lg:text-[2.75rem]"
                >
                  {area.number}
                </span>

                <div>
                  <h3 className="text-h4 font-medium tracking-tight">{area.term}</h3>
                  <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {area.addresses}
                  </p>
                </div>

                <div>
                  <p className="text-label uppercase text-(--color-foreground-subtle)">
                    {advisoryAreas.involvesLabel}
                  </p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {area.involves.map((entry) => (
                      <li
                        key={entry}
                        className="flex items-start gap-3.5 text-[0.9375rem] leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-px w-3.5 shrink-0 bg-(--color-accent)"
                        />
                        <span>{entry}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
