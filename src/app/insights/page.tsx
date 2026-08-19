import Link from "next/link";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { backdrops, insightPhotos } from "@/data/imagery";
import { getInsights, hasPlaceholderInsights } from "@/data/insights";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Insights",
  path: "/insights",
  description:
    "Perspectives on investor relations, investor outreach and corporate communication in Gulf capital markets.",
});

/**
 * Insights index.
 *
 * A lead article at full width, then the remainder as an editorial list with
 * date, category and a thumbnail. Deliberately the same visual family as the
 * homepage preview but at a different scale, so arriving here from the
 * homepage feels like the same publication rather than a different site.
 *
 * Content integrity: while any entry is a placeholder the page carries a
 * standing notice, every row is labelled "Sample", and the article routes are
 * noindex. Emptying `data/insights.ts` shows an honest empty state rather
 * than a broken grid.
 */
export default function InsightsPage() {
  const insights = getInsights();
  const showNotice = hasPlaceholderInsights();
  const [lead, ...rest] = insights;

  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.insights}
        eyebrow="Insights"
        title="Perspectives on Gulf Capital Markets"
        lead="Notes on investor relations, market outreach and how companies are understood by the investors that matter to them."
      />

      <Section spacing="lg" aria-labelledby="insights-list">
        <h2 id="insights-list" className="sr-only">
          All insights
        </h2>

        {showNotice && (
          <Reveal>
            <p className="max-w-[62ch] border-l-2 border-(--color-accent) pl-5 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
              The entries below are sample topics used to establish this page&rsquo;s layout. They
              are not published GCC research, and are excluded from search indexing until real
              editorial content is supplied.
            </p>
          </Reveal>
        )}

        {insights.length === 0 ? (
          <Reveal>
            <p className="text-lead text-(--color-foreground-muted)">
              Published insights will appear here.
            </p>
          </Reveal>
        ) : (
          <>
            {/* Lead article. */}
            <Reveal className={showNotice ? "mt-[var(--space-heading)]" : ""}>
              <article className="group">
                <Link
                  href={`/insights/${lead.slug}`}
                  className="grid gap-x-14 gap-y-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center"
                >
                  <Figure
                    photo={insightPhotos[0]}
                    ratio="wide"
                    overlay="veil"
                    zoom
                    sizes="(min-width: 1024px) 55vw, 100vw"
                  />

                  <div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-label uppercase">
                      <span className="text-(--color-accent)">{lead.category}</span>
                      <time dateTime={lead.date} className="text-(--color-foreground-subtle)">
                        {formatDate(lead.date)}
                      </time>
                      {lead.isPlaceholder && (
                        <span className="border border-(--color-border) px-2 py-0.5 text-(--color-foreground-subtle)">
                          Sample
                        </span>
                      )}
                    </div>

                    <h3 className="mt-5 max-w-[22ch] font-display text-h2 leading-[1.12] text-balance transition-colors duration-300 group-hover:text-(--color-accent)">
                      {lead.title}
                    </h3>

                    <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                      {lead.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            </Reveal>

            {rest.length > 0 && (
              <ul className="mt-[var(--space-section-sm)] border-t border-(--color-border)">
                {rest.map((insight, index) => (
                  <li key={insight.slug} className="border-b border-(--color-border)">
                    <Reveal delay={index * 70}>
                      <article className="group">
                        <Link
                          href={`/insights/${insight.slug}`}
                          className="grid gap-x-12 gap-y-4 py-9 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_9rem] lg:items-start"
                        >
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-label uppercase text-(--color-foreground-subtle)">
                            <span>{insight.category}</span>
                            <time dateTime={insight.date}>{formatDate(insight.date)}</time>
                            {insight.isPlaceholder && (
                              <span className="border border-(--color-border) px-2 py-0.5">
                                Sample
                              </span>
                            )}
                          </div>

                          <div>
                            <h3 className="max-w-[28ch] font-display text-h3 leading-snug text-balance transition-colors duration-300 group-hover:text-(--color-accent)">
                              {insight.title}
                            </h3>
                            <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                              {insight.excerpt}
                            </p>
                          </div>

                          <div className="hidden lg:block">
                            <Figure
                              photo={insightPhotos[(index + 1) % insightPhotos.length]}
                              ratio="square"
                              zoom
                              sizes="9rem"
                            />
                          </div>
                        </Link>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </Section>

      <CTASection />
    </>
  );
}
