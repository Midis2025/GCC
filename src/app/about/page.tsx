import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { StatementBand } from "@/components/sections/StatementBand";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GulfNetwork } from "@/components/visuals/GulfNetwork";
import { photos } from "@/data/imagery";
import {
  aboutCommunication,
  aboutHero,
  aboutHowWeWork,
  aboutPositioning,
  aboutPurpose,
  aboutRegion,
} from "@/data/about";
import { gulfMarkets } from "@/data/homepage";
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
 * Six sections, six different structures: editorial split hero, prose with a
 * pull-quote, a centred statement band, a market split carrying the network
 * diagram, an indexed four-column grid, and a principles list against a sticky
 * statement. Nothing repeats, and no section is a row of identical cards.
 *
 * Content integrity: this page makes no claim about size, history, headcount,
 * offices, clients or credentials, because none have been supplied. The team
 * section renders only when `data/team.ts` holds real people.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        variant="split"
        photo={photos.aboutPortrait}
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        lead={aboutHero.lead}
      />

      {/* Positioning - prose with an oversized pull-quote breaking the column. */}
      <Section spacing="lg" aria-labelledby="about-positioning">
        <div className="grid gap-x-20 gap-y-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Reveal>
            <SectionLabel>{aboutPositioning.label}</SectionLabel>
            <Heading
              id="about-positioning"
              level={2}
              size="h2"
              className="mt-7 max-w-[15ch] lg:sticky lg:top-[calc(var(--header-h)+4rem)]"
            >
              {aboutPositioning.heading}
            </Heading>
          </Reveal>

          <div>
            <Reveal delay={120} className="flex flex-col gap-6">
              {aboutPositioning.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={200}>
              <blockquote className="mt-12 border-t border-(--color-accent)/40 pt-8">
                <p className="max-w-[24ch] font-serif text-h2 leading-[1.14] text-balance">
                  Clarity is a commercial position.
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Purpose - the page's one centred interruption. */}
      <StatementBand
        id="about-purpose"
        label={aboutPurpose.label}
        heading={aboutPurpose.heading}
        paragraphs={aboutPurpose.paragraphs}
      />

      {/* Regional understanding - prose beside the market diagram. */}
      <Section spacing="lg" aria-labelledby="about-region">
        <div className="grid gap-x-20 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <Reveal>
              <SectionLabel>{aboutRegion.label}</SectionLabel>
              <Heading id="about-region" level={2} size="h2" className="mt-7 max-w-[15ch]">
                {aboutRegion.heading}
              </Heading>
            </Reveal>

            <Reveal delay={120} className="mt-8 flex flex-col gap-5">
              {aboutRegion.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={180}>
              <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-3">
                {gulfMarkets.map((market) => (
                  <li
                    key={market.code}
                    className="border border-(--color-border) px-4 py-2 text-[0.9375rem]"
                  >
                    {market.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={160} className="surface-dark p-8 sm:p-10">
            <GulfNetwork />
            <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-(--color-foreground-subtle)">
              Market orientation shown for reference. It does not represent offices, registrations
              or investor relationships in any jurisdiction.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* How we work - four indexed columns, no cards. */}
      <Section spacing="lg" tone="muted" aria-labelledby="about-how-we-work">
        <div className="grid gap-x-20 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <Reveal>
            <SectionLabel>{aboutHowWeWork.label}</SectionLabel>
            <Heading id="about-how-we-work" level={2} size="display" className="mt-7 max-w-[15ch]">
              {aboutHowWeWork.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-[48ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
              {aboutHowWeWork.intro}
            </p>
          </Reveal>
        </div>

        <dl className="mt-[calc(var(--space-section-sm)+1rem)] grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {aboutHowWeWork.modes.map((mode, index) => (
            <Reveal key={mode.term} delay={index * 80}>
              <div className="border-t border-(--color-foreground)/20 pt-6">
                <span
                  aria-hidden="true"
                  className="font-serif text-numeral leading-none text-(--color-accent)/25"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <dt className="mt-5 text-h4 font-medium tracking-tight">{mode.term}</dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                  {mode.description}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* Communication - sticky statement against an indexed principles list. */}
      <Section spacing="lg" aria-labelledby="about-communication">
        <div className="grid gap-x-20 gap-y-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+4rem)]">
              <SectionLabel>{aboutCommunication.label}</SectionLabel>
              <Heading id="about-communication" level={2} size="display" className="mt-7 max-w-[12ch]">
                {aboutCommunication.heading}
              </Heading>

              <div className="mt-8 flex max-w-[50ch] flex-col gap-5">
                {aboutCommunication.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:pt-3">
            <Figure
              photo={photos.regionStreet}
              ratio="cinema"
              overlay="veil"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />

            <dl className="mt-10 flex flex-col">
              {aboutCommunication.principles.map((principle, index) => (
                <Reveal key={principle.term} delay={index * 70}>
                  <div className="border-l-2 border-(--color-accent)/35 py-5 pl-6 transition-colors duration-500 hover:border-(--color-accent)">
                    <dt className="text-[1.0625rem] font-medium">{principle.term}</dt>
                    <dd className="mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                      {principle.description}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Section>

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
            <Heading id="about-team" level={2} size="display" className="mt-7">
              The People Behind the Work
            </Heading>
          </Reveal>

          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <li key={member.name}>
                <Reveal delay={index * 80}>
                  <article className="border-t border-(--color-border) pt-6">
                    <h3 className="font-serif text-[1.375rem]">{member.name}</h3>
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

      <CTASection />
    </>
  );
}
