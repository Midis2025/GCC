import { AboutEngagements } from "@/components/sections/AboutEngagements";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutMarkets } from "@/components/sections/AboutMarkets";
import { AboutNarrative } from "@/components/sections/AboutNarrative";
import { AboutPositioning } from "@/components/sections/AboutPositioning";
import { AboutPrinciples } from "@/components/sections/AboutPrinciples";
import { AboutPurpose } from "@/components/sections/AboutPurpose";
import { AboutRiyadh } from "@/components/sections/AboutRiyadh";
import { EditorialStatement } from "@/components/sections/EditorialStatement";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { backdrops } from "@/data/imagery";
import { aboutPhilosophy, aboutTransition } from "@/data/about";
import { hasTeam, team } from "@/data/team";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  path: "/about",
  description:
    "GCC advises companies on investor relations, investor targeting and strategic communications across Gulf and international capital markets.",
});

/**
 * About.
 *
 * Read as one argument rather than as a stack of sections. The order is the
 * argument: who the firm is, why clarity is commercial, which markets it reads
 * and how they differ, how engagements are shaped, how one narrative stays one
 * narrative, what holds it all to a standard, and then the ask.
 *
 * Eleven blocks, and no two built the same way: an asymmetric hero, an
 * editorial split with an oversized pull-quote, a dark band with a measured
 * criteria column, an interactive map, a full-bleed statement, a scroll-driven
 * four-stage sequence, a drawn diagram, a full-bleed photograph, a 2x2
 * principles grid, a closing statement, and the sitewide call to action.
 *
 * ---------------------------------------------------------------------------
 * What this page does NOT do
 * ---------------------------------------------------------------------------
 * Every section here is About-specific and lives in its own component. The
 * shared building blocks - `PageHero`, `StatementBand`, `CTASection`, `Figure`,
 * `Reveal`, `Section` - are untouched, because each of them is used by other
 * routes and this was a redesign of one page.
 *
 * `CTASection` in particular is left exactly as it is. It is already a
 * full-bleed dark photographic band with a display heading, the supporting
 * copy and the two actions - which is the closing treatment this page wants -
 * and it renders on ten other routes, so redesigning it here would have
 * redesigned all of them.
 *
 * ---------------------------------------------------------------------------
 * Client JavaScript
 * ---------------------------------------------------------------------------
 * Two components: `AboutMarkets`, which needs selection state, and
 * `AboutEngagements`, whose active stage is a function of scroll position.
 * Between them that is one IntersectionObserver and one `useState`. There is
 * no scroll listener on this page - the parallax runs on CSS scroll-progress
 * timelines and the entry animations reuse the shared observer inside
 * `Reveal`.
 *
 * ---------------------------------------------------------------------------
 * Content integrity
 * ---------------------------------------------------------------------------
 * This page makes no claim about size, history, headcount, offices, clients or
 * credentials, because none have been supplied. The market map states in
 * standing text that it shows orientation and not presence. The team section
 * renders only when `data/team.ts` holds real people.
 */
export default function AboutPage() {
  return (
    <>
      {/* 1 - Who GCC is. */}
      <AboutHero />

      {/* 2 - The firm, stated. Ends on the quote the next section argues. */}
      <AboutPositioning />

      {/* 3 - Why clarity matters. */}
      <AboutPurpose />

      {/* 4 - Which markets, and how they differ. */}
      <AboutMarkets />

      {/* 5 - The turn from the region to the work. */}
      <EditorialStatement
        id="about-transition"
        statement={aboutTransition.statement}
        photo={backdrops.aboutTransition}
        compact
      />

      {/* 6 - How engagements are shaped. */}
      <AboutEngagements />

      {/* 7 - How one narrative stays one narrative. */}
      <AboutNarrative />

      {/* 8 - The page's one photographic moment. */}
      <AboutRiyadh />

      {/* 9 - What holds the work to a standard. */}
      <AboutPrinciples />

      {/* 10 - The closing thought, before the ask. */}
      <EditorialStatement
        id="about-philosophy"
        label={aboutPhilosophy.label}
        statement={aboutPhilosophy.statement}
      />

      {/*
        Team section architecture.

        Rendered only when `data/team.ts` holds real people. No names, roles,
        photographs or biographies have been supplied and none may be invented,
        so while the array is empty this section does not exist in the markup -
        rather than showing placeholder cards or silhouettes.
      */}
      {hasTeam() && (
        <Section spacing="lg" tone="muted" aria-labelledby="about-team">
          <Reveal className="max-w-3xl">
            <SectionLabel>Team</SectionLabel>
            <Heading id="about-team" level={2} size="display" className="mt-5">
              The People Behind the Work
            </Heading>
          </Reveal>

          <ul className="mt-[var(--space-heading)] grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <li key={member.name}>
                <Reveal delay={index * 80}>
                  <article className="border-t border-(--color-border) pt-6">
                    <h3 className="font-display text-[1.375rem]">{member.name}</h3>
                    <p className="mt-1.5 text-label uppercase text-(--color-foreground-subtle)">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="mt-4 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                        {member.bio}
                      </p>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 11 - Why to engage. */}
      <CTASection />
    </>
  );
}
