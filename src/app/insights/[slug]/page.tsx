import Link from "next/link";
import { notFound } from "next/navigation";

import { CTASection } from "@/components/sections/CTASection";
import { MediaBand } from "@/components/sections/MediaBand";
import { Section } from "@/components/sections/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { HeroBackdrop } from "@/components/visuals/HeroBackdrop";
import { insightPhotos } from "@/data/imagery";
import { getInsights, insights } from "@/data/insights";
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
 * generating one, this page renders the real metadata and standfirst and
 * states plainly that the full text is pending. Placeholder entries are also
 * marked noindex. Replace the entry in `data/insights.ts` and add a `body`
 * field when real editorial content is ready.
 *
 * The layout is built for that future body: a narrow reading measure, a lead
 * image band under the title, and a "more insights" rail at the end.
 */
export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const index = insights.findIndex((item) => item.slug === slug);
  const insight = insights[index];
  if (!insight) notFound();

  const photo = insightPhotos[index % insightPhotos.length];
  const more = getInsights()
    .filter((item) => item.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <article>
        <header className="tokens-dark relative isolate overflow-hidden bg-(--midnight) pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--header-h)+clamp(4rem,10vw,7rem))]">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[radial-gradient(110%_130%_at_75%_0%,#1b2937_0%,#111c27_50%,#0c141d_100%)]"
          />
          <HeroBackdrop variant="overlay" className="opacity-35" />

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

            <Heading level={1} size="h1" className="mt-5">
              {insight.title}
            </Heading>
          </Container>
        </header>

        <MediaBand photo={photo} />

        <Section spacing="lg" width="narrow">
          <Reveal>
            <p className="text-lead text-(--color-foreground)">{insight.excerpt}</p>
          </Reveal>

          {insight.isPlaceholder && (
            <Reveal delay={100}>
              <div className="mt-12 border-l-2 border-(--color-accent) pl-6">
                <h2 className="text-label uppercase text-(--color-foreground-subtle)">
                  Article pending
                </h2>
                <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                  This is a sample entry used to establish the article layout. The full text has not
                  been written, and nothing has been published under this heading. The page is
                  excluded from search indexing until real content is supplied.
                </p>
              </div>
            </Reveal>
          )}

          <div className="mt-[var(--space-heading)] border-t border-(--color-border) pt-8">
            <Link
              href="/insights"
              className="link-underline inline-block py-1 text-[0.9375rem] text-(--color-foreground-muted) hover:text-(--color-foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
            >
              Back to all insights
            </Link>
          </div>
        </Section>
      </article>

      {more.length > 0 && (
        <Section spacing="md" tone="muted" aria-labelledby="insight-more">
          <Reveal>
            <h2
              id="insight-more"
              className="text-label uppercase text-(--color-foreground-subtle)"
            >
              More insights
            </h2>
          </Reveal>

          <ul className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {more.map((item, position) => (
              <li key={item.slug}>
                <Reveal delay={position * 80}>
                  <Link
                    href={`/insights/${item.slug}`}
                    className="group block border-t border-(--color-border) pt-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                  >
                    <span className="text-label uppercase text-(--color-foreground-subtle)">
                      {item.category}
                    </span>
                    <p className="mt-4 max-w-[26ch] font-display text-[1.3125rem] leading-snug text-balance transition-colors duration-300 group-hover:text-(--color-accent)">
                      {item.title}
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CTASection />
    </>
  );
}
