import Link from "next/link";
import { notFound } from "next/navigation";

import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/sections/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { insights } from "@/data/insights";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const insight = insights.find((item) => item.slug === slug);
  if (!insight) return createMetadata({ title: "Insight", path: `/insights/${slug}` });

  return createMetadata({
    title: insight.title,
    path: `/insights/${slug}`,
    description: insight.excerpt,
    // Placeholder entries are kept out of the index until real copy lands.
    noIndex: insight.isPlaceholder,
  });
}

/**
 * Insight article.
 *
 * Content integrity: no article body has been written or supplied. Rather than
 * generating one, this page renders the real metadata and standfirst and states
 * plainly that the full text is pending. Placeholder entries are also marked
 * noindex. Replace the entry in `data/insights.ts` and add a `body` field when
 * real editorial content is ready.
 */
export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const insight = insights.find((item) => item.slug === slug);
  if (!insight) notFound();

  return (
    <>
      <article>
        <header className="surface-dark relative isolate overflow-hidden pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--header-h)+clamp(3.5rem,9vw,7rem))]">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(110%_130%_at_75%_0%,#1b2937_0%,#111c27_50%,#0c141d_100%)]"
          />
          <Container width="narrow">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-label uppercase text-(--color-accent)">
              <span>{insight.category}</span>
              <time dateTime={insight.date} className="text-(--color-foreground-subtle)">
                {formatDate(insight.date)}
              </time>
              {insight.isPlaceholder && (
                <span className="border border-(--color-border) px-2 py-0.5 text-(--color-foreground-subtle)">
                  Sample
                </span>
              )}
            </div>

            <Heading level={1} size="h1" className="mt-7">
              {insight.title}
            </Heading>
          </Container>
        </header>

        <Section spacing="lg" width="narrow">
          <p className="text-lead text-(--color-foreground)">{insight.excerpt}</p>

          {insight.isPlaceholder && (
            <div className="mt-12 border-t border-(--color-border) pt-8">
              <h2 className="text-label font-medium uppercase text-(--color-foreground-subtle)">
                Article pending
              </h2>
              <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                This is a sample entry used to establish the article layout. The full text has not
                been written, and nothing has been published under this heading. The page is
                excluded from search indexing until real content is supplied.
              </p>
            </div>
          )}

          <div className="mt-14 border-t border-(--color-border) pt-8">
            <Link
              href="/insights"
              className="link-underline inline-block py-1 text-[0.9375rem] text-(--color-foreground-muted) hover:text-(--color-foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
            >
              Back to all insights
            </Link>
          </div>
        </Section>
      </article>

      <CTASection />
    </>
  );
}
