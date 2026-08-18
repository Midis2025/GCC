import Link from "next/link";
import { notFound } from "next/navigation";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ProseSection } from "@/components/sections/ProseSection";
import { Section } from "@/components/sections/Section";
import { CheckList } from "@/components/ui/CheckList";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { capabilities } from "@/data/capabilities";
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

  return (
    <>
      <PageHero
        eyebrow="Capability"
        index={capability.number}
        title={capability.title}
        lead={capability.summary}
      />

      <ProseSection
        id="service-intro"
        label="Overview"
        heading={capability.description}
        paragraphs={content.intro}
      />

      <ProseSection
        id="service-approach"
        label="Approach"
        heading={content.approach.heading}
        paragraphs={content.approach.paragraphs}
        tone="muted"
      />

      <Section spacing="lg" aria-labelledby="service-deliverables">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <SectionLabel>Scope</SectionLabel>
            <Heading id="service-deliverables" level={2} className="mt-7 max-w-[16ch]">
              {content.deliverables.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120}>
            <DefinitionList items={content.deliverables.items} />

            <h3 className="mt-12 text-label font-medium uppercase text-(--color-foreground-subtle)">
              Often suited to
            </h3>
            <CheckList items={content.suitedTo} columns={1} className="mt-5" />
          </Reveal>
        </div>
      </Section>

      <Section spacing="md" tone="muted" aria-labelledby="service-related">
        <Reveal>
          <SectionLabel>Related</SectionLabel>
          <Heading id="service-related" level={2} size="h3" className="mt-6">
            Other capabilities
          </Heading>

          <ul className="mt-10 border-t border-(--color-border)">
            {related.map((item) => (
              <li key={item.slug} className="border-b border-(--color-border)">
                <Link
                  href={item.href}
                  className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                >
                  <span className="font-serif text-sm text-(--color-accent)">{item.number}</span>
                  <span className="font-serif text-[1.25rem] transition-colors duration-300 group-hover:text-(--color-accent)">
                    {item.title}
                  </span>
                  <span className="max-w-[46ch] text-sm text-(--color-foreground-muted) sm:ml-auto">
                    {item.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
