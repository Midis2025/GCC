import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { segmentPhotos } from "@/data/imagery";
import { audienceContent } from "@/data/homepage";
import { cn } from "@/lib/utils";

/**
 * Client segments, as a photographic mosaic.
 *
 * Panels of unequal span rather than a uniform card grid: one tall anchor, a
 * pair of standard panels either side of it and a full-width letterbox to
 * close. Row height is fixed per breakpoint and the images fill it, so spans
 * control width only and nothing can leave a ragged gap.
 *
 * The panels are deliberately NOT links and carry no arrow affordance. These
 * are categories, not destinations, and an arrow here would promise a page
 * that does not exist. The image lift on hover is decorative only.
 *
 * Content integrity: `audienceContent.note` marks these as indicative
 * categories pending confirmation. It stays visible - the section must never
 * read as a client list.
 */
export function Segments() {
  return (
    <Section spacing="lg" aria-labelledby="segments-heading" width="wide">
      <Reveal>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>{audienceContent.label}</SectionLabel>
            <Heading id="segments-heading" level={2} size="display" className="mt-7 max-w-[14ch]">
              {audienceContent.heading}
            </Heading>
          </div>

          <p className="max-w-[26ch] text-sm leading-relaxed text-(--color-foreground-subtle)">
            {audienceContent.note}
          </p>
        </div>
      </Reveal>

      <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[repeat(2,13rem)] lg:gap-4">
        {audienceContent.segments.map((segment, index) => {
          const photo = segmentPhotos[index % segmentPhotos.length];
          const layout = PANEL_LAYOUT[index] ?? "lg:col-span-4";

          return (
            <li key={segment} className={cn("relative", layout)}>
              <Reveal
                variant="media"
                delay={index * 70}
                className="media-frame group/panel relative h-full min-h-[13rem] overflow-hidden"
              >
                <Figure
                  photo={photo}
                  ratio="auto"
                  overlay="soft"
                  className="h-full w-full"
                  imageClassName="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover/panel:scale-[1.05]"
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 sm:p-7">
                  <span
                    aria-hidden="true"
                    className="block h-px w-9 bg-(--color-accent) transition-[width] duration-500 ease-out group-hover/panel:w-16"
                  />
                  <h3 className="mt-4 max-w-[16ch] font-serif text-[1.25rem] leading-snug text-[#f4f1eb] text-balance sm:text-[1.375rem]">
                    {segment}
                  </h3>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/**
 * Mosaic spans. Rows resolve to 5+4+3 and 5+4+3 across twelve columns, with
 * the first panel spanning both rows and the last running full width.
 */
const PANEL_LAYOUT = [
  "lg:col-span-5 lg:row-span-2",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-12 lg:row-start-3 lg:h-[13rem]",
] as const;
