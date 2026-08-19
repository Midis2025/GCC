import Link from "next/link";
import { notFound } from "next/navigation";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projectPhotos } from "@/data/imagery";
import { getProject, getProjects, projects, projectsContent } from "@/data/projects";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return createMetadata({ title: "Engagement", path: `/projects/${slug}` });

  return createMetadata({
    title: project.title,
    path: `/projects/${slug}`,
    description: project.situation,
    // Placeholder entries are kept out of the index until real work lands.
    noIndex: project.isPlaceholder,
  });
}

/**
 * Engagement detail.
 *
 * Structured as situation → scope → outcome, which is the only shape that
 * works when the client cannot be named: the reader follows the problem and
 * the work rather than the logo.
 *
 * CONTENT INTEGRITY: while `isPlaceholder` is set the page states plainly that
 * this is not completed client work and the route is noindex. `outcome`
 * describes what was produced or put in place - never a share price,
 * valuation, funding or transaction result, none of which a communications
 * adviser can claim. See the header comment in `data/projects.ts`.
 */
export default async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const photo = projectPhotos[slug];
  const more = getProjects()
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        variant="split"
        photo={photo}
        eyebrow={project.sector}
        title={project.title}
        lead={project.client}
      />

      {project.isPlaceholder && (
        <Section spacing="sm" tone="muted" aria-labelledby="project-notice">
          <Reveal>
            <h2 id="project-notice" className="sr-only">
              About this entry
            </h2>
            <p className="max-w-[74ch] border-l-2 border-(--color-accent) pl-5 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
              {projectsContent.placeholderNotice}
            </p>
          </Reveal>
        </Section>
      )}

      {/* Situation - the problem, set as a lead statement. */}
      <Section spacing="lg" aria-labelledby="project-situation">
        <div className="grid gap-x-20 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            <SectionLabel>Situation</SectionLabel>
            <Heading id="project-situation" level={2} size="h2" className="mt-5 max-w-[14ch]">
              Where the company stood
            </Heading>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-[58ch] text-lead text-(--color-foreground-muted)">
              {project.situation}
            </p>

            <dl className="mt-10 grid gap-x-10 gap-y-6 border-t border-(--color-border) pt-8 sm:grid-cols-3">
              <div>
                <dt className="text-label uppercase text-(--color-foreground-subtle)">Sector</dt>
                <dd className="mt-2 text-[0.9375rem]">{project.sector}</dd>
              </div>
              <div>
                <dt className="text-label uppercase text-(--color-foreground-subtle)">Market</dt>
                <dd className="mt-2 text-[0.9375rem]">{project.market}</dd>
              </div>
              <div>
                <dt className="text-label uppercase text-(--color-foreground-subtle)">Company</dt>
                <dd className="mt-2 text-[0.9375rem]">{project.client}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* Scope - numbered, on the dark surface. */}
      <Section
        spacing="lg"
        tone="dark"
        aria-labelledby="project-scope"
        className="relative isolate overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(80%_90%_at_25%_10%,#1a2836_0%,#0f1924_55%,#0c141d_100%)]"
        />

        <div className="grid gap-x-20 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            <SectionLabel>Scope</SectionLabel>
            <Heading id="project-scope" level={2} size="display" className="mt-5 max-w-[13ch]">
              What the engagement consisted of
            </Heading>
          </Reveal>

          <ol className="flex flex-col">
            {project.scope.map((item, index) => (
              <Reveal key={item} delay={index * 70}>
                <li className="flex items-baseline gap-6 border-b border-white/12 py-5">
                  <span
                    aria-hidden="true"
                    className="num font-display-sm text-sm text-(--color-accent)"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.0625rem]">{item}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* Outcome - deliberately about what was put in place, not results. */}
      <Section spacing="lg" aria-labelledby="project-outcome">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <Reveal>
            <SectionLabel>Outcome</SectionLabel>
            <Heading id="project-outcome" level={2} size="h2" className="mt-5 max-w-[14ch]">
              What was in place by the end
            </Heading>

            <p className="mt-6 max-w-[54ch] text-lead text-(--color-foreground-muted)">
              {project.outcome}
            </p>

            <p className="mt-6 max-w-[54ch] text-sm leading-relaxed text-(--color-foreground-subtle)">
              Described in terms of what was produced. Communication work is not
              claimed to have caused any market, valuation or transaction result.
            </p>
          </Reveal>

          <Reveal variant="media" delay={140}>
            <Figure
              photo={photo}
              ratio="wide"
              overlay="veil"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </Reveal>
        </div>
      </Section>

      {/* Further engagements. */}
      {more.length > 0 && (
        <Section spacing="md" tone="muted" aria-labelledby="project-more">
          <Reveal>
            <SectionLabel>More</SectionLabel>
            <Heading id="project-more" level={2} size="h2" className="mt-5">
              Other engagements
            </Heading>
          </Reveal>

          <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {more.map((item, index) => (
              <li key={item.slug}>
                <Reveal delay={index * 80} className="h-full">
                  <Link
                    href={`/projects/${item.slug}`}
                    className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                  >
                    <Figure
                      photo={projectPhotos[item.slug]}
                      ratio="wide"
                      overlay="veil"
                      zoom
                      sizes="(min-width: 640px) 30vw, 100vw"
                    />

                    <span className="mt-5 text-label uppercase text-(--color-foreground-subtle)">
                      {item.sector}
                    </span>
                    <h3 className="mt-3 font-display text-[1.1875rem] leading-snug text-balance transition-colors duration-300 group-hover:text-(--color-accent)">
                      {item.title}
                    </h3>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-10">
            <Link
              href="/projects"
              className="link-underline inline-block py-1 text-[0.9375rem] text-(--color-foreground-muted) hover:text-(--color-foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
            >
              Back to all engagements
            </Link>
          </Reveal>
        </Section>
      )}

      <CTASection />
    </>
  );
}
