import { LocaleLink } from "@/components/layout/LocaleLink";
import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pick } from "@/content";
import { otherServiceLinesContentAr, serviceLinesAr } from "@/content/ar/what-we-do";
import {
  otherServiceLinesContent as otherServiceLinesContentEn,
  serviceLines as serviceLinesEn,
} from "@/data/what-we-do";

/**
 * The three lines a service page is not about.
 *
 * Sits at the foot of each of the four service pages, above the call to
 * action. The current page is filtered out by slug - the slug is an
 * identifier, so it is the same value in both languages and the filter works
 * unchanged.
 *
 * `LocaleLink` rather than `next/link`: a reader who reaches a service page in
 * Arabic and follows one of these has to arrive at the next one in Arabic.
 */
export async function OtherServiceLines({ currentSlug }: { currentSlug: string }) {
  const content = await pick({ en: otherServiceLinesContentEn, ar: otherServiceLinesContentAr });
  const serviceLines = await pick({ en: serviceLinesEn, ar: serviceLinesAr });
  const others = serviceLines.filter((line) => line.slug !== currentSlug);

  return (
    <Section spacing="lg" tone="muted" aria-labelledby="other-service-lines">
      <Reveal>
        <SectionLabel>{content.label}</SectionLabel>
        <Heading
          id="other-service-lines"
          level={2}
          size="h2"
          className="mt-5 max-w-[16ch]"
        >
          {content.heading}
        </Heading>
      </Reveal>

      <ul className="mt-[var(--space-heading)] border-t border-(--color-border)">
        {others.map((line, index) => (
          <li key={line.slug} className="border-b border-(--color-border)">
            <Reveal delay={index * 80}>
              <LocaleLink
                href={line.href}
                className="group flex flex-col gap-2 py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.375rem] leading-snug transition-colors duration-500 group-hover:text-(--color-accent)">
                    {line.title}
                  </span>
                  <span className="mt-1.5 block max-w-[52ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {line.strapline}
                  </span>
                </span>
              </LocaleLink>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
