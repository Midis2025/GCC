import Link from "next/link";

import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getInsights, hasPlaceholderInsights } from "@/data/insights";
import { formatDate } from "@/lib/utils";

/**
 * Editorial insights preview.
 *
 * Content integrity: the entries in `data/insights.ts` are layout placeholders,
 * not published GCC research. While any entry is flagged as a placeholder the
 * section carries a visible notice and the cards are labelled, so nothing is
 * presented as real published work. Emptying the data array hides the section
 * entirely rather than rendering an empty grid.
 */
export function InsightsPreview() {
  const insights = getInsights().slice(0, 3);
  if (insights.length === 0) return null;

  const showPlaceholderNotice = hasPlaceholderInsights();

  return (
    <Section spacing="lg" aria-labelledby="insights-heading">
      <Reveal>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Insights</SectionLabel>
            <Heading id="insights-heading" level={2} className="mt-7">
              Perspectives on Gulf Capital Markets
            </Heading>
          </div>

          <Link
            href="/insights"
            className="link-underline self-start py-1 text-[0.9375rem] text-(--color-foreground-muted) hover:text-(--color-foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) sm:self-auto"
          >
            All insights
          </Link>
        </div>

        {showPlaceholderNotice && (
          <p className="mt-6 max-w-[60ch] text-sm text-(--color-foreground-subtle)">
            Sample topics shown to establish the layout. Editorial content is pending and none of
            the entries below are published GCC research.
          </p>
        )}
      </Reveal>

      <ul className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
        {insights.map((insight, index) => (
          <li key={insight.slug}>
            <Reveal delay={index * 90}>
              <article className="group flex h-full flex-col border-t border-(--color-border) pt-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-label uppercase text-(--color-foreground-subtle)">
                  <span>{insight.category}</span>
                  <time dateTime={insight.date}>{formatDate(insight.date)}</time>
                  {insight.isPlaceholder && (
                    <span className="border border-(--color-border) px-2 py-0.5 text-(--color-foreground-subtle)">
                      Sample
                    </span>
                  )}
                </div>

                <h3 className="mt-5 font-serif text-[1.375rem] leading-snug text-balance">
                  <Link
                    href={`/insights/${insight.slug}`}
                    className="transition-colors duration-300 group-hover:text-(--color-accent) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                  >
                    {insight.title}
                  </Link>
                </h3>

                <p className="mt-4 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                  {insight.excerpt}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-(--color-foreground-muted) transition-colors duration-300 group-hover:text-(--color-accent)"
                >
                  Read more
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="square"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M0 5h14" />
                    <path d="M10 1l4 4-4 4" />
                  </svg>
                </span>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
