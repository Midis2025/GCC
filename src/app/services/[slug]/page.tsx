import Link from "next/link";
import { notFound } from "next/navigation";

import { CTASection } from "@/components/sections/CTASection";
import { MediaBand } from "@/components/sections/MediaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { StatementBand } from "@/components/sections/StatementBand";
import { CheckList } from "@/components/ui/CheckList";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { capabilities } from "@/data/capabilities";
import { capabilityPhotos } from "@/data/imagery";
import { getServicePage, servicePages } from "@/data/service-pages";
import { createMetadata } from "@/lib/seo";

/**
 * Individual service pages.
 *
 * Only the slugs present in `servicePages` are generated. Investor targeting
 * has its own top-level route at /investor-outreach, so /services/investor-
 * outreach is redirected there in next.config.ts rather than duplicated here.
 */
export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const capability = capabilities.find((item) => item.slug === slug);
  if (!capability) return createMetadata({ title: "Service", path: `/services/${slug}` });

  return createMetadata({
    title: capability.title,
    path: `/services/${slug}`,
    description: capability.summary,
  });
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const capability = capabilities.find((item) => item.slug === slug);
  const content = getServicePage(slug);

  if (!capability || !content) notFound();

  const related = capabilities.filter((item) => item.slug !== slug);
  const photo = capabilityPhotos[slug];

  return (
    <>
      {/*
        A typographic opening led by the capability's index, followed by its
        photograph as a full-width band. Deliberately the inverse of the
        services index, which opens on the photograph - so moving from the list
        to a detail page reads as a change of altitude, not a repeat.
      */}
      <PageHero
        variant="minimal"
        eyebrow="Capability"
        index={capability.number}
        title={capability.title}
        lead={capability.summary}
      />

      <MediaBand photo={photo} />

      {/*
        `capability.description` is a forty-word sentence. Setting it at display
        size - as this page previously did - turns the opening into a wall of
        serif text with no entry point. It works as a lead statement instead:
        large enough to carry the section, small enough to read as prose, with
        the section's landmark heading kept short above it.
      */}
      <Section spacing="lg" aria-labelledby="service-intro">
        <Reveal>
          <h2
            id="service-intro"
            className="flex items-center gap-3 text-label font-medium uppercase text-(--color-foreground-muted)"
          >
            <span aria-hidden="true" className="h-px w-8 bg-(--color-accent)" />
            Overview
          </h2>

          <p className="mt-8 max-w-[36ch] font-serif text-h2 leading-[1.14] text-balance">
            {capability.summary}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-20 gap-y-6 border-t border-(--color-border) pt-10 lg:grid-cols-2">
          <Reveal delay={120}>
            <p className="max-w-[58ch] text-lead text-(--color-foreground-muted)">
              {capability.description}
            </p>
          </Reveal>

          <Reveal delay={180} className="flex flex-col gap-5">
            {content.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </Section>

      <StatementBand
        id="service-approach"
        label="Approach"
        heading={content.approach.heading}
        paragraphs={content.approach.paragraphs}
      />

      {/* Scope - numbered deliverables against a sticky heading. */}
      <Section spacing="lg" aria-labelledby="service-deliverables">
        <div className="grid gap-x-20 gap-y-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            <div className="lg:sticky lg:top-[calc(var(--header-h)+4rem)]">
              <SectionLabel>Scope</SectionLabel>
              <Heading id="service-deliverables" level={2} size="display" className="mt-7 max-w-[14ch]">
                {content.deliverables.heading}
              </Heading>
            </div>
          </Reveal>

          <div>
            <dl className="grid gap-x-10 sm:grid-cols-2">
              {content.deliverables.items.map((item, index) => (
                <Reveal key={item.term} delay={index * 70}>
                  <div className="border-t border-(--color-border) py-7">
                    <span
                      aria-hidden="true"
                      className="font-serif text-sm text-(--color-accent)"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <dt className="mt-3 text-[1.0625rem] font-medium">{item.term}</dt>
                    <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                      {item.description}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal className="mt-12 border-t border-(--color-accent)/40 pt-8">
              <h3 className="text-label font-medium uppercase text-(--color-foreground-subtle)">
                Often suited to
              </h3>
              <CheckList items={content.suitedTo} columns={1} className="mt-5" />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Related capabilities, as photographic cards rather than a list. */}
      <Section spacing="lg" tone="muted" aria-labelledby="service-related">
        <Reveal>
          <SectionLabel>Related</SectionLabel>
          <Heading id="service-related" level={2} size="h2" className="mt-7">
            Other capabilities
          </Heading>
        </Reveal>

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-3">
          {related.map((item, index) => (
            <li key={item.slug}>
              <Reveal delay={index * 80} className="h-full">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                >
                  <Figure
                    photo={capabilityPhotos[item.slug]}
                    ratio="wide"
                    overlay="veil"
                    zoom
                    sizes="(min-width: 640px) 30vw, 100vw"
                  />

                  <span className="mt-6 font-serif text-sm text-(--color-accent)">
                    {item.number}
                  </span>
                  <h3 className="mt-3 font-serif text-[1.3125rem] leading-snug text-balance transition-colors duration-300 group-hover:text-(--color-accent)">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {item.summary}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <CTASection />
    </>
  );
}
