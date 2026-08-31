import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { backdrops } from "@/data/imagery";
import { pendingCounselNotice, type LegalPage } from "@/data/legal";
import { siteConfig } from "@/data/site";

/**
 * The shared template for all four legal pages.
 *
 * One component rather than four near-identical pages: the four documents
 * differ in their sections and in nothing else, and four copies of this layout
 * would be four places to update when the counsel-approved text lands.
 *
 * ---------------------------------------------------------------------------
 * The pending notice
 * ---------------------------------------------------------------------------
 * Rendered first, before any section, and styled as a standing notice rather
 * than as body copy. It says plainly that the wording is being prepared with
 * counsel and that nothing here should be relied on.
 *
 * That placement is deliberate. A reader who arrives at a page headed "Privacy
 * Policy" assumes it IS the policy, and a caveat at the foot would be met
 * after that assumption had already done its work.
 *
 * Design: the existing system - `PageHero`, `Section`, the numbered-row
 * treatment used elsewhere. No new pattern for a page nobody visits twice.
 */
export function LegalPageLayout({ page }: { page: LegalPage }) {
  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.utility}
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        compact
      />

      <Section spacing="lg" aria-labelledby={`legal-${page.slug}`}>
        <Container width="narrow" className="px-0">
          {/* Status. First, and unmissable. */}
          <Reveal>
            <div className="border-s-2 border-(--color-accent) bg-(--color-surface-muted) px-6 py-6">
              <p className="text-label uppercase text-(--color-accent)">
                {pendingCounselNotice.label}
              </p>
              <h2
                id={`legal-${page.slug}`}
                className="mt-3 font-display text-[1.375rem] leading-snug"
              >
                {pendingCounselNotice.heading}
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                {pendingCounselNotice.body}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="mt-14 text-label uppercase text-(--color-foreground-subtle)">
              What this document will cover
            </h3>
          </Reveal>

          <ol className="mt-7 flex flex-col">
            {page.sections.map((section, index) => (
              <Reveal key={section.heading} delay={160 + index * 60}>
                <li className="border-t border-(--color-border) py-7">
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="num font-display-sm text-[0.625rem] tracking-[0.14em] text-(--color-accent)"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Heading level={4} size="h4" className="font-medium">
                      {section.heading}
                    </Heading>
                  </div>
                  <p className="mt-3 ps-8 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {section.scope}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={400}>
            <p className="mt-14 border-t border-(--color-border) pt-8 text-sm leading-relaxed text-(--color-foreground-subtle)">
              This page is published by {siteConfig.legalName}. Final wording will replace the
              structure above once it has been approved.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
