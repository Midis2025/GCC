import Link from "next/link";

import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { insightPhotos } from "@/data/imagery";
import { getInsights, hasPlaceholderInsights, type Insight } from "@/data/insights";
import { formatDate } from "@/lib/utils";

/** Category / date / sample-flag line, shared by both card sizes. */
function Meta({ insight, tone = "subtle" }: { insight: Insight; tone?: "subtle" | "accent" }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-label uppercase">
      <span className={tone === "accent" ? "text-(--color-accent)" : "text-(--color-foreground-subtle)"}>
        {insight.category}
      </span>
      <time dateTime={insight.date} className="text-(--color-foreground-subtle)">
        {formatDate(insight.date)}
      </time>
      {insight.isPlaceholder && (
        <span className="border border-(--color-border) px-2 py-0.5 text-(--color-foreground-subtle)">
          Sample
        </span>
      )}
    </div>
  );
}

/**
 * Editorial insights preview.
 *
 * One lead article carrying a large photograph, with the remaining entries
 * running as a compact indexed column beside it - the layout a publication
 * uses, rather than three identical cards. The whole card is one link, so the
 * hit target is large on touch and reaches the same destination by keyboard.
 *
 * Content integrity: the entries in `data/insights.ts` are layout
 * placeholders, not published GCC research. While any entry is flagged the
 * section carries a visible notice and every card is labelled "Sample".
 * Emptying the data array hides the section entirely rather than rendering an
 * empty grid.
 */
export function InsightsPreview() {
  const insights = getInsights().slice(0, 3);
  if (insights.length === 0) return null;

  const [lead, ...rest] = insights;
  const showPlaceholderNotice = hasPlaceholderInsights();

  return (
    <Section spacing="lg" tone="muted" aria-labelledby="insights-heading">
      <Reveal>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Insights</SectionLabel>
            <Heading id="insights-heading" level={2} size="display" className="mt-7 max-w-[14ch]">
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
          <p className="mt-7 max-w-[60ch] border-l-2 border-(--color-accent) pl-5 text-sm leading-relaxed text-(--color-foreground-muted)">
            Sample topics shown to establish the layout. Editorial content is pending and none of
            the entries below are published GCC research.
          </p>
        )}
      </Reveal>

      <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {/* Lead article */}
        <Reveal>
          <article className="group h-full">
            <Link
              href={`/insights/${lead.slug}`}
              className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
            >
              <Figure
                photo={insightPhotos[0]}
                ratio="wide"
                overlay="veil"
                zoom
                sizes="(min-width: 1024px) 55vw, 100vw"
              />

              <div className="mt-7">
                <Meta insight={lead} tone="accent" />

                <h3 className="mt-5 max-w-[22ch] font-serif text-h2 leading-[1.12] text-balance transition-colors duration-300 group-hover:text-(--color-accent)">
                  {lead.title}
                </h3>

                <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                  {lead.excerpt}
                </p>
              </div>
            </Link>
          </article>
        </Reveal>

        {/* Secondary column */}
        <ul className="flex flex-col lg:pt-2">
          {rest.map((insight, index) => (
            <li key={insight.slug} className="border-t border-(--color-border) last:border-b">
              <Reveal delay={120 + index * 90}>
                <article className="group">
                  <Link
                    href={`/insights/${insight.slug}`}
                    className="flex gap-6 py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                  >
                    <div className="min-w-0 flex-1">
                      <Meta insight={insight} />

                      <h3 className="mt-4 font-serif text-[1.3125rem] leading-snug text-balance transition-colors duration-300 group-hover:text-(--color-accent)">
                        {insight.title}
                      </h3>

                      <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                        {insight.excerpt}
                      </p>
                    </div>

                    <div className="hidden w-24 shrink-0 sm:block lg:w-28">
                      <Figure
                        photo={insightPhotos[(index + 1) % insightPhotos.length]}
                        ratio="square"
                        zoom
                        sizes="7rem"
                      />
                    </div>
                  </Link>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
