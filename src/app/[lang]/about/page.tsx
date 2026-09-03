import { AboutEngagements } from "@/components/sections/AboutEngagements";
import { AboutHowWeWork } from "@/components/sections/AboutHowWeWork";
import { AboutPrincipals } from "@/components/sections/AboutPrincipals";
import { AboutHero } from "@/components/sections/AboutHero";
import { PageHero } from "@/components/sections/PageHero";
import { MarketMap } from "@/components/sections/MarketMap";
import { AboutPositioning } from "@/components/sections/AboutPositioning";
import { AboutPrinciples } from "@/components/sections/AboutPrinciples";
import { AboutPurpose } from "@/components/sections/AboutPurpose";
import { AboutRiyadh } from "@/components/sections/AboutRiyadh";
import {
  CommunicationEffects,
  WorkBehindTheRoom,
} from "@/components/sections/CommunicationEffects";
import { EditorialStatement } from "@/components/sections/EditorialStatement";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { currentLocale, pick } from "@/content";
import {
  aboutCommunicationAr,
  aboutHeroAr,
  aboutHowWeWorkAr,
  aboutPhilosophyAr,
  aboutRegionAr,
  aboutTeamContentAr,
  aboutTransitionAr,
} from "@/content/ar/about";
import { gulfMarketsAr } from "@/content/ar/homepage";
import { backdrops, banners, photos } from "@/data/imagery";
import {
  aboutCommunication as aboutCommunicationEn,
  aboutHero as aboutHeroEn,
  aboutHowWeWork as aboutHowWeWorkEn,
  aboutPhilosophy as aboutPhilosophyEn,
  aboutRegion as aboutRegionEn,
  aboutTeamContent as aboutTeamContentEn,
  aboutTransition as aboutTransitionEn,
} from "@/data/about";
import { gulfMarkets as gulfMarketsEn } from "@/data/homepage";
import { hasTeam, team } from "@/data/team";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  path: "/about",
  description:
    "Gulf Connect advises companies on investor relations, investor targeting and strategic communications across Gulf and international capital markets.",
});

/**
 * About.
 *
 * Read as one argument rather than as a stack of sections. The order is the
 * argument: who the firm is, why clarity is commercial, which markets it reads
 * and how they differ, how engagements are shaped, how one narrative stays one
 * narrative, what holds it all to a standard, and then the ask.
 *
 * Thirteen numbered blocks plus the conditional team section and the sitewide
 * call to action: an asymmetric hero, an editorial split with an oversized
 * pull-quote, a dark band with a measured criteria column, an interactive map,
 * a full-bleed statement, a fee-and-audience split, a typographic principal
 * biographies, a scroll-driven four-stage sequence, a dark 2x2 field of verbs,
 * a three-column accounting of the work, a SECOND interactive map, a full-bleed
 * photograph, a 2x2 principles grid and a closing statement.
 *
 * The count is stated because it keeps drifting. If a section is added, update
 * it and the numbered comments in the body together - a numbered list that has
 * gone out of step with itself is worse than no numbering at all.
 *
 * Sections 4 and 9 are the same component rendering the same six markets from
 * the same coordinates, requested in place of the drawn hub-and-branch diagram
 * that used to sit at 9. They are five sections apart, they carry different
 * copy and they are toned differently - canvas and muted - but the page no
 * longer holds to the rule that no two of its blocks are built alike. If it
 * ever reads repetitive, this is the reason, and the fix is to give one of the
 * two a different treatment rather than to restyle either in place.
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
 * Two components: `MarketMap`, which needs selection state, and
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
export default async function AboutPage() {
  /*
    The client banner opens this page on the ENGLISH route only.

    `AboutHero` is a bespoke SPLIT hero - type in one column, photograph in the
    other - and the banner is a 3.2:1 panorama, which is the one shape that
    layout cannot hold: half of a wide skyline is not a composition. So English
    swaps the whole hero for the shared feature `PageHero`, which lays the
    banner full bleed and sets the same eyebrow, headline and lead over it.

    The Arabic route keeps `AboutHero` untouched. There is no Arabic edition of
    the artwork, and the split hero is the better opening when the frame is a
    library portrait rather than a panorama.
  */
  const isEnglish = (await currentLocale()) === "en";
  const aboutHero = await pick({ en: aboutHeroEn, ar: aboutHeroAr });
  const aboutRegion = await pick({ en: aboutRegionEn, ar: aboutRegionAr });
  const aboutTransition = await pick({ en: aboutTransitionEn, ar: aboutTransitionAr });
  const aboutCommunication = await pick({ en: aboutCommunicationEn, ar: aboutCommunicationAr });
  const aboutPhilosophy = await pick({ en: aboutPhilosophyEn, ar: aboutPhilosophyAr });
  const aboutHowWeWork = await pick({ en: aboutHowWeWorkEn, ar: aboutHowWeWorkAr });
  const teamContent = await pick({ en: aboutTeamContentEn, ar: aboutTeamContentAr });
  /* The market list the two maps on this page label their nodes from. */
  const gulfMarkets = await pick({ en: gulfMarketsEn, ar: gulfMarketsAr });

  return (
    <>
      {/* 1 - Who Gulf Connect is. */}
      {isEnglish ? (
        <PageHero
          banner={banners.about}
          photo={photos.aboutPortrait}
          eyebrow={aboutHero.eyebrow}
          title={aboutHero.title}
          lead={aboutHero.lead}
        />
      ) : (
        <AboutHero />
      )}

      {/* 2 - The firm, stated. Ends on the quote the next section argues. */}
      <AboutPositioning />

      {/* 3 - Why clarity matters. */}
      <AboutPurpose />

      {/* 4 - Which markets, and how they differ. */}
      <MarketMap
        id="about-region"
        label={aboutRegion.label}
        heading={aboutRegion.heading}
        paragraphs={aboutRegion.paragraphs}
        disclaimer={aboutRegion.disclaimer}
        markets={gulfMarkets}
      />

      {/* 5 - The turn from the region to the work. */}
      <EditorialStatement
        id="about-transition"
        statement={aboutTransition.statement}
        photo={backdrops.aboutTransition}
        compact
      />

      {/* 6 - How we are paid, and who this is for. */}
      <AboutHowWeWork />

      {/* 7 - The principals. Not a team page. */}
      <AboutPrincipals />

      {/* 8 - How engagements are shaped. */}
      <AboutEngagements content={aboutHowWeWork} />

      {/*
        9 - What communication is for, and what producing it costs.

        Two sections, one argument. A dark 2x2 field of oversized verbs, then
        three quiet cream columns accounting for the work either side of the
        meetings a programme is usually judged by. The middle column is the
        shortest of the three, which is the argument made by layout.

        COMPLIANCE: each verb describes a property of the COMMUNICATION, never
        an effect the firm produces in a market. See `data/about-depth.ts`.
      */}
      <CommunicationEffects />
      <WorkBehindTheRoom />

      {/*
        10 - How one narrative stays one narrative.

        A drawn hub-and-branch diagram stood here - one centre, three lines
        out to investors, media and a company's own channels. It is now the
        market map, which is what was asked for.

        Worth stating plainly for whoever reads this next: this is the SECOND
        map on the page. Section 4 renders the same six markets from the same
        coordinates. The two are five sections apart and carry different copy,
        but they are the same object, and if the page ever reads repetitive
        this is why - see the note at the top of this file.
      */}
      <MarketMap
        id="about-narrative"
        label={aboutCommunication.label}
        heading={aboutCommunication.heading}
        paragraphs={aboutCommunication.paragraphs}
        selectorLabel={aboutCommunication.selectorLabel}
        disclaimer={aboutCommunication.disclaimer}
        markets={gulfMarkets}
        tone="muted"
      />

      {/* 11 - The page's one photographic moment. */}
      <AboutRiyadh />

      {/* 12 - What holds the work to a standard. */}
      <AboutPrinciples />

      {/* 13 - The closing thought, before the ask. */}
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
            <SectionLabel>{teamContent.label}</SectionLabel>
            <Heading id="about-team" level={2} size="display" className="mt-5">
              {teamContent.heading}
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

      {/* 14 - Why to engage. */}
      <CTASection />
    </>
  );
}
