import Link from "next/link";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { backdrops, projectPhotos } from "@/data/imagery";
import {
  getProjects,
  hasPlaceholderProjects,
  projectsContent,
  projectsHero,
} from "@/data/projects";
import { cn } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Selected Work",
  path: "/projects",
  description:
    "Anonymised profiles of investor relations, outreach, media and digital communications engagements across Gulf capital markets.",
  // Placeholder entries never reach the index. See data/projects.ts.
  noIndex: hasPlaceholderProjects(),
});

/** Sector / market / sample line, shared by the cards and the featured block. */
function Meta({
  sector,
  market,
  isPlaceholder,
  tone = "subtle",
}: {
  sector: string;
  market: string;
  isPlaceholder: boolean;
  tone?: "subtle" | "accent";
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-label uppercase">
      <span
        className={tone === "accent" ? "text-(--color-accent)" : "text-(--color-foreground-subtle)"}
      >
        {sector}
      </span>
      <span className="text-(--color-foreground-subtle)">{market}</span>
      {isPlaceholder && (
        <span className="border border-(--color-border) px-2 py-0.5 text-(--color-foreground-subtle)">
          Sample
        </span>
      )}
    </div>
  );
}

/**
 * Selected work.
 *
 * A featured engagement at full width, then the remainder as a bento grid of
 * unequal spans - a different shape from both the insights list and the
 * segment mosaic.
 *
 * CONTENT INTEGRITY: the entries in `data/projects.ts` are layout
 * placeholders, not completed client work. While any entry is flagged the page
 * carries a standing notice, every card is labelled "Sample", and the route is
 * noindex. Emptying the array renders an honest empty state rather than a
 * broken grid. Read the header comment in `data/projects.ts` before publishing
 * anything real - confidentiality and outcome-claim constraints both apply.
 */
export default function ProjectsPage() {
  const projects = getProjects();
  const showNotice = hasPlaceholderProjects();
  const [featured, ...rest] = projects;

  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.projects}
        eyebrow={projectsHero.eyebrow}
        title={projectsHero.title}
        lead={projectsHero.lead}
      />

      {projects.length === 0 ? (
        <Section spacing="lg" aria-labelledby="projects-empty">
          <Reveal className="max-w-[52rem]">
            <SectionLabel>{projectsContent.label}</SectionLabel>
            <Heading id="projects-empty" level={2} size="display" className="mt-5 max-w-[16ch]">
              {projectsContent.heading}
            </Heading>
            <p className="mt-6 max-w-[56ch] text-lead text-(--color-foreground-muted)">
              Engagement profiles will appear here once they are approved for publication.
            </p>
          </Reveal>
        </Section>
      ) : (
        <>
          <Section spacing="lg" aria-labelledby="projects-heading">
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
              <Reveal>
                <SectionLabel>{projectsContent.label}</SectionLabel>
                <Heading
                  id="projects-heading"
                  level={2}
                  size="display"
                  className="mt-5 max-w-[16ch]"
                >
                  {projectsContent.heading}
                </Heading>
              </Reveal>

              <Reveal delay={120}>
                <p className="max-w-[52ch] text-lead text-(--color-foreground-muted)">
                  {projectsContent.intro}
                </p>
                <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-(--color-foreground-subtle)">
                  {projectsContent.confidentialityNote}
                </p>
              </Reveal>
            </div>

            {showNotice && (
              <Reveal delay={160}>
                <p className="mt-10 max-w-[74ch] border-l-2 border-(--color-accent) pl-5 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                  {projectsContent.placeholderNotice}
                </p>
              </Reveal>
            )}

            {/* Featured engagement. */}
            <Reveal className="mt-[var(--space-heading)]">
              <article className="group">
                <Link
                  href={`/projects/${featured.slug}`}
                  className="grid gap-x-14 gap-y-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center"
                >
                  <Figure
                    photo={projectPhotos[featured.slug]}
                    ratio="wide"
                    overlay="soft"
                    zoom
                    sizes="(min-width: 1024px) 56vw, 100vw"
                  />

                  <div>
                    <Meta
                      sector={featured.sector}
                      market={featured.market}
                      isPlaceholder={featured.isPlaceholder}
                      tone="accent"
                    />

                    <h3 className="mt-5 max-w-[22ch] font-display text-h2 leading-[1.14] text-balance transition-colors duration-300 group-hover:text-(--color-accent)">
                      {featured.title}
                    </h3>

                    <p className="mt-3 text-[0.9375rem] text-(--color-foreground-subtle)">
                      {featured.client}
                    </p>

                    <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                      {featured.situation}
                    </p>

                    <span
                      aria-hidden="true"
                      className="mt-6 inline-flex items-center gap-2 text-sm text-(--color-foreground-muted) transition-colors duration-300 group-hover:text-(--color-accent)"
                    >
                      Read the engagement
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
                  </div>
                </Link>
              </article>
            </Reveal>
          </Section>

          {/* Bento grid of the remaining engagements. */}
          {rest.length > 0 && (
            <Section spacing="md" tone="muted" width="wide" aria-labelledby="projects-more">
              <h2 id="projects-more" className="sr-only">
                Further engagements
              </h2>

              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                {rest.map((project, index) => (
                  <li key={project.slug} className={cn(CARD_LAYOUT[index] ?? "lg:col-span-2")}>
                    <Reveal delay={index * 70} className="h-full">
                      <article className="h-full">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="group flex h-full flex-col border border-(--color-border) bg-(--color-surface) transition-[border-color,box-shadow] duration-500 hover:border-(--color-accent)/45 hover:shadow-[var(--shadow-md)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                        >
                          <Figure
                            photo={projectPhotos[project.slug]}
                            ratio="wide"
                            overlay="veil"
                            zoom
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          />

                          {/*
                            `flex-1` on the body plus `mt-auto` on the footer
                            keeps the client line pinned to the bottom, so cards
                            of differing text length still line up across a row.
                          */}
                          <div className="flex flex-1 flex-col p-6">
                            <Meta
                              sector={project.sector}
                              market={project.market}
                              isPlaceholder={project.isPlaceholder}
                            />

                            <h3 className="mt-4 font-display text-[1.25rem] leading-snug text-balance transition-colors duration-300 group-hover:text-(--color-accent)">
                              {project.title}
                            </h3>

                            <p className="mt-3 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                              {project.situation}
                            </p>

                            <p className="mt-auto pt-5 text-sm text-(--color-foreground-subtle)">
                              {project.client}
                            </p>
                          </div>
                        </Link>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </>
      )}

      <CTASection />
    </>
  );
}

/**
 * Bento spans across six columns. Rows resolve to 3+3 and 2+2+2, so the grid
 * changes rhythm halfway down instead of repeating one card width.
 */
const CARD_LAYOUT = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
] as const;
