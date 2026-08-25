import { CTASection } from "@/components/sections/CTASection";
import { InvestorForm } from "@/components/sections/InvestorForm";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { StageSequence } from "@/components/sections/StageSequence";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { backdrops } from "@/data/imagery";
import {
  forInvestorsHero,
  forInvestorsIntro,
  investorAssurance,
  investorBenefits,
  upcomingBriefings,
} from "@/data/for-investors";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "For Investors",
  path: "/for-investors",
  description:
    "Gulf Connect convenes briefings with international companies in critical minerals, AI and data infrastructure, and life sciences. Registration is free.",
});

/**
 * For Investors.
 *
 * The other half of a two-sided site. Everything else here addresses the
 * companies who pay; this page addresses the audience being built, and it is
 * written to them rather than about them.
 *
 * The registration form is the point of the page. Everything above it exists
 * to answer "why would I give you my details", and it answers with four named
 * things rather than an invitation to stay informed.
 *
 * ---------------------------------------------------------------------------
 * The briefings module
 * ---------------------------------------------------------------------------
 * `upcomingBriefings` is empty, so the section does not render - not an empty
 * state, not a "watch this space", nothing at all. An empty calendar on a page
 * asking for registrations advertises that there is nothing to register for,
 * and inventing a briefing to fill it would be inventing a business fact.
 * Add real entries to the data file and the section appears.
 */
export default function ForInvestorsPage() {
  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.investors}
        eyebrow={forInvestorsHero.eyebrow}
        title={forInvestorsHero.title}
        lead={forInvestorsHero.lead}
      />

      {/* Membership. */}
      <Section spacing="lg" aria-labelledby="investors-intro">
        <div className="grid gap-x-20 gap-y-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            <SectionLabel>{forInvestorsIntro.label}</SectionLabel>
            <Heading id="investors-intro" level={2} size="h2" className="mt-5 max-w-[14ch]">
              {forInvestorsIntro.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-6">
            {forInvestorsIntro.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </Section>

      {/*
        What registration provides, as a scroll-driven sequence.

        This is the block that has to earn the details in the form below it,
        and a two-column definition list let the eye take all four at once and
        settle on none. The sequence makes each one hold the reading position
        in turn - four named things, read one at a time, which is how a reader
        deciding whether to register actually weighs them.
      */}
      <StageSequence
        id="investors-benefits"
        label={investorBenefits.label}
        heading={investorBenefits.heading}
        stages={investorBenefits.items.map((item) => ({
          term: item.term,
          description: item.description,
        }))}
      />

      {/*
        Upcoming briefings.

        Renders only when there is something real to show. See the note above.
      */}
      {upcomingBriefings.length > 0 && (
        <Section spacing="lg" aria-labelledby="investors-briefings">
          <Reveal>
            <SectionLabel>Calendar</SectionLabel>
            <Heading
              id="investors-briefings"
              level={2}
              size="display"
              className="mt-5 max-w-[14ch]"
            >
              Upcoming Briefings
            </Heading>
          </Reveal>

          <ul className="mt-[var(--space-heading)] border-t border-(--color-border)">
            {upcomingBriefings.map((briefing) => (
              <li
                key={`${briefing.date}-${briefing.title}`}
                className="grid gap-x-10 gap-y-2 border-b border-(--color-border) py-7 lg:grid-cols-[minmax(0,0.22fr)_minmax(0,1fr)_minmax(0,0.28fr)] lg:items-baseline"
              >
                <time
                  dateTime={briefing.date}
                  className="num text-[0.9375rem] text-(--color-accent)"
                >
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  }).format(new Date(briefing.date))}
                </time>

                <h3 className="font-display text-[1.25rem] leading-snug">{briefing.title}</h3>

                <p className="text-[0.9375rem] text-(--color-foreground-muted)">
                  {briefing.city} &middot; {briefing.format}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Registration. */}
      <Section spacing="lg" tone="muted" aria-labelledby="investors-register">
        <div
          id="register"
          className="scroll-mt-[calc(var(--header-h)+2rem)] grid gap-x-20 gap-y-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
        >
          <div>
            <Reveal>
              <SectionLabel>Register</SectionLabel>
              <Heading
                id="investors-register"
                level={2}
                size="display"
                className="mt-5 max-w-[12ch]"
              >
                Join the List
              </Heading>
            </Reveal>

            {/* Assurance. Short, and next to the form rather than after it. */}
            <Reveal delay={140} className="mt-10">
              <p className="text-label uppercase text-(--color-foreground-subtle)">
                {investorAssurance.heading}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {investorAssurance.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-3 shrink-0 bg-(--color-accent)"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={180} className="border-t border-(--color-border) pt-9 lg:border-0 lg:pt-0">
            <InvestorForm source="/for-investors" />
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
