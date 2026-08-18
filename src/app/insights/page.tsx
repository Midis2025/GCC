import Link from "next/link";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getInsights, hasPlaceholderInsights } from "@/data/insights";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Insights",
  path: "/insights",
  description:
    "Perspectives on investor relations, investor outreach and corporate communication in Gulf capital markets.",
});

export default function InsightsPage() {
  const insights = getInsights();
  const showNotice = hasPlaceholderInsights();

  return (
    <>
      <PageHero
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
              The entries below are sample topics used to establish this page&rsquo;s layout.
              They are not published GCC research, and are excluded from search indexing until
              real editorial content is supplied.
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
          <ul className={showNotice ? "mt-14" : ""}>
            {insights.map((insight, index) => (
              <li key={insight.slug} className="border-t border-(--color-border) last:border-b">
                <Reveal delay={index * 70}>
                  <article>
                    <Link
                      href={`/insights/${insight.slug}`}
                      className="group grid gap-4 py-9 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-12 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
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
                        <h3 className="max-w-[26ch] font-serif text-h3 leading-snug text-balance transition-colors duration-300 group-hover:text-(--color-accent)">
                          {insight.title}
                        </h3>
                        <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                          {insight.excerpt}
                        </p>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <CTASection />
    </>
  );
}
