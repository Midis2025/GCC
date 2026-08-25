import Link from "next/link";

import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  HOMEPAGE_INSIGHT_THRESHOLD,
  getFormat,
  latestInsightItems,
} from "@/data/insight";
import { formatDate } from "@/lib/utils";

/**
 * Latest from Insight.
 *
 * RENDERS NOTHING below three published items, and that is the whole point of
 * the component rather than an edge case it handles.
 *
 * The brief is explicit: an empty module is worse than no module. A homepage
 * section headed "Latest from Insight" showing one item, or three skeletons,
 * or a "coming soon" card, tells a visitor the library is empty far more
 * loudly than its absence would. So the threshold is a hard gate - not a
 * fallback, not a placeholder, not a reduced layout for one item.
 *
 * The site launches with an empty library by design, so at build this returns
 * null and the homepage flows from the Arabic gap straight to the investor
 * invitation. Publish three items and the section appears with no other
 * change.
 */
export function LatestInsight() {
  const items = latestInsightItems(3);

  if (items.length < HOMEPAGE_INSIGHT_THRESHOLD) return null;

  return (
    <Section spacing="lg" aria-labelledby="home-latest-insight">
      <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        <Reveal>
          <SectionLabel>Insight</SectionLabel>
          <Heading
            id="home-latest-insight"
            level={2}
            size="display"
            className="mt-5 max-w-[14ch]"
          >
            Latest From Insight
          </Heading>
        </Reveal>

        <Reveal delay={120} className="lg:justify-self-end lg:pb-2">
          <Button href="/insight" variant="outline" withArrow>
            All formats
          </Button>
        </Reveal>
      </div>

      <ul className="mt-[var(--space-heading)] border-t border-(--color-border)">
        {items.map((item, index) => {
          const format = getFormat(item.format);

          return (
            <li key={item.slug} className="border-b border-(--color-border)">
              <Reveal delay={index * 80}>
                <Link
                  href={`/insight/${item.slug}`}
                  className="group grid gap-x-10 gap-y-3 py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) lg:grid-cols-[minmax(0,0.22fr)_minmax(0,1fr)_minmax(0,0.18fr)] lg:items-baseline"
                >
                  <span className="text-label uppercase text-(--color-accent)">
                    {format?.name}
                  </span>

                  <span className="font-display text-[1.375rem] leading-snug transition-colors duration-500 group-hover:text-(--color-accent)">
                    {item.title}
                  </span>

                  <time
                    dateTime={item.date}
                    className="text-sm text-(--color-foreground-subtle) lg:text-right"
                  >
                    {formatDate(item.date)}
                  </time>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
