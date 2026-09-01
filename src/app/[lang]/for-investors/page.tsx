import NextImage from "next/image";

import { CoverageSectors } from "@/components/sections/CoverageSectors";
import { GlobalConnection } from "@/components/sections/GlobalConnection";
import { CTASection } from "@/components/sections/CTASection";
import { InvestorForm } from "@/components/sections/InvestorForm";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { StageSequence } from "@/components/sections/StageSequence";
import { LocaleLink } from "@/components/layout/LocaleLink";
import { currentLocale, getDictionary, pick } from "@/content";
import { optionLabel } from "@/content/dictionary";
import {
  briefingProcessAr,
  forInvestorsHeroAr,
  forInvestorsIntroAr,
  investorAssuranceAr,
  investorBenefitsAr,
  investorsReachAr,
  registerPanelContentAr,
  upcomingBriefingsContentAr,
  whoRegistersContentAr,
} from "@/content/ar/for-investors";
import { investorsMapAr } from "@/content/ar/world-connections";
import { briefingProcess as briefingProcessEn } from "@/data/investors-depth";
import { investorsMap as investorsMapEn, narrowMap } from "@/data/world-connections";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { backdrops } from "@/data/imagery";
import {
  GENERAL_CONTENT_ONLY,
  forInvestorsHero as forInvestorsHeroEn,
  forInvestorsIntro as forInvestorsIntroEn,
  investorAssurance as investorAssuranceEn,
  investorBenefits as investorBenefitsEn,
  investorCategories,
  investorsReach as investorsReachEn,
  registerPanelContent as registerPanelContentEn,
  upcomingBriefings,
  upcomingBriefingsContent as upcomingBriefingsContentEn,
  whoRegistersContent as whoRegistersContentEn,
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
export default async function ForInvestorsPage() {
  const forInvestorsHero = await pick({ en: forInvestorsHeroEn, ar: forInvestorsHeroAr });
  const forInvestorsIntro = await pick({ en: forInvestorsIntroEn, ar: forInvestorsIntroAr });
  const investorBenefits = await pick({ en: investorBenefitsEn, ar: investorBenefitsAr });
  const investorAssurance = await pick({ en: investorAssuranceEn, ar: investorAssuranceAr });
  const investorsReach = await pick({ en: investorsReachEn, ar: investorsReachAr });
  const whoRegisters = await pick({ en: whoRegistersContentEn, ar: whoRegistersContentAr });
  const registerPanel = await pick({ en: registerPanelContentEn, ar: registerPanelContentAr });
  const upcomingBriefingsContent = await pick({
    en: upcomingBriefingsContentEn,
    ar: upcomingBriefingsContentAr,
  });
  const briefingProcess = await pick({ en: briefingProcessEn, ar: briefingProcessAr });
  const investorsMap = narrowMap(await pick({ en: investorsMapEn, ar: investorsMapAr }));

  /*
    The category names come from the chrome dictionary rather than from a
    content module, keyed by the value each option submits - the same lookup
    the registration form below uses, so the list a reader sees here and the
    select they meet in the form can never disagree.
  */
  const t = await getDictionary();
  const locale = await currentLocale();

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
        What the coverage is about.

        Three wide bands with the photograph alternating sides, rather than a
        three-column grid - this page already has a sequence, a typographic
        band and a split form, and a grid here would have been a fourth.

        COMPLIANCE: the standing caption states this is informational, not
        research and not a recommendation. See `CoverageSectors`.
      */}
      <CoverageSectors />

      {/*
        Where the companies come from.

        The same geography as What We Do, read from the other side: this page
        addresses the audience, so the captions name the professional
        categories rather than the services.

        COMPLIANCE: the third caption states plainly that the firm is not paid
        by investors and makes no recommendations, and the standing denial
        under the map is shared with every other map surface.
      */}
      <GlobalConnection
        id="investors-reach"
        label={investorsReach.label}
        heading={investorsReach.heading}
        paragraphs={investorsReach.paragraphs}
        map={investorsMap}
      />

      {/*
        Who registers.

        The five professional categories the registration form offers, set as
        type on a rule. It is a different shape from everything around it - the
        benefits above are a scroll-driven sequence and the form below is a
        split - so the page reads as a sequence of distinct blocks rather than
        one treatment repeated.

        These are NOT claims about who has registered. They are the categories
        the form asks a registrant to select, stated so a professional investor
        can see the list is meant for them before reaching the field. The note
        says exactly that.

        "Other" is deliberately absent. It is not an audience - it is the
        fallback that routes a registrant to general content only, per
        `GENERAL_CONTENT_ONLY`, and listing it here as a peer of the five would
        misrepresent what selecting it does.
      */}
      <Section spacing="md" aria-labelledby="investors-audience">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
          <Reveal>
            <SectionLabel>{whoRegisters.label}</SectionLabel>
            <Heading id="investors-audience" level={2} size="h2" className="mt-5 max-w-[14ch]">
              {whoRegisters.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-subtle) lg:pb-2">
              {whoRegisters.note}
            </p>
          </Reveal>
        </div>

        <ul className="mt-[var(--space-heading)] flex flex-col border-t border-(--color-border) sm:flex-row sm:flex-wrap sm:border-t-0">
          {investorCategories
            .filter((category) => category.value !== GENERAL_CONTENT_ONLY)
            .map((category, index) => (
              <li
                key={category.value}
                className="border-b border-(--color-border) sm:border-b-0 sm:border-t sm:basis-1/2 lg:basis-1/5"
              >
                <Reveal delay={index * 90}>
                  <div className="flex items-baseline gap-4 py-6 sm:flex-col sm:items-start sm:gap-3 sm:pe-6">
                    <span
                      aria-hidden="true"
                      className="num font-display-sm text-[0.625rem] tracking-[0.14em] text-(--color-accent)"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[1.0625rem] leading-snug">
                      {optionLabel(
                        t.forms.options.investorCategory,
                        category.value,
                        category.label,
                      )}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
        </ul>
      </Section>

      {/*
        Upcoming briefings.

        Renders only when there is something real to show. See the note above.
      */}
      {upcomingBriefings.length > 0 && (
        <Section spacing="lg" aria-labelledby="investors-briefings">
          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
            <Reveal>
              <SectionLabel>{upcomingBriefingsContent.label}</SectionLabel>
              <Heading
                id="investors-briefings"
                level={2}
                size="display"
                className="mt-5 max-w-[14ch]"
              >
                {upcomingBriefingsContent.heading}
              </Heading>
            </Reveal>

            <Reveal delay={120}>
              <p className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-subtle) lg:pb-2">
                {upcomingBriefingsContent.intro}
              </p>
            </Reveal>
          </div>

          <ul className="mt-[var(--space-heading)] border-t border-(--color-border)">
            {upcomingBriefings.map((briefing) => (
              <li
                key={`${briefing.date}-${briefing.title}`}
                className="grid gap-x-10 gap-y-4 border-b border-(--color-border) py-7 lg:grid-cols-[minmax(0,0.22fr)_minmax(0,1fr)_minmax(0,0.36fr)] lg:items-baseline"
              >
                <time
                  dateTime={briefing.date}
                  className="num text-[0.9375rem] text-(--color-accent)"
                >
                  {/*
                    The date is formatted in the language being read: an
                    Arabic page gets Arabic month names, from the same
                    `Intl` call. `ar-AE` rather than a bare `ar` so the
                    Gulf month names are used and the numerals stay Western,
                    matching the rest of the site.
                  */}
                  {new Intl.DateTimeFormat(locale === "ar" ? "ar-AE" : "en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                    numberingSystem: "latn",
                  }).format(new Date(briefing.date))}
                </time>

                <div>
                  <h3 className="font-display text-[1.25rem] leading-snug">{briefing.title}</h3>

                  {/* The sector, where the entry carries one. */}
                  {briefing.sector && (
                    <p className="mt-2 text-label uppercase text-(--color-foreground-subtle)">
                      {briefing.sector}
                    </p>
                  )}
                </div>

                {/*
                  Location, format, and the way in.

                  The link is the row's only control. It routes to the investor
                  side of the Contact toggle rather than reserving anything -
                  see the note on `upcomingBriefingsContent.cta`.
                */}
                <div className="flex flex-col gap-3 lg:items-start">
                  <p className="text-[0.9375rem] text-(--color-foreground-muted)">
                    {briefing.city} &middot; {briefing.format}
                  </p>

                  <LocaleLink
                    href={upcomingBriefingsContent.cta.href}
                    className="link-underline inline-block py-1 text-[0.9375rem] text-(--color-foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                  >
                    {upcomingBriefingsContent.cta.label}
                    <span className="sr-only"> — {briefing.title}</span>
                  </LocaleLink>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/*
        How a briefing actually reaches a registrant.

        The scroll-driven sequence, reused - the same treatment the benefits
        use above, which is right here: both are ordered sets read one at a
        time. Step 05 is load-bearing and states that registration does not
        guarantee a place at every briefing. See `data/investors-depth.ts`.
      */}
      <StageSequence
        id="investors-process"
        label={briefingProcess.label}
        heading={briefingProcess.heading}
        tone="muted"
        stages={briefingProcess.steps.map((step) => ({
          term: step.term,
          description: step.description,
        }))}
      />

      {/* Registration. */}
      <Section spacing="lg" tone="muted" aria-labelledby="investors-register">
        <div
          id="register"
          className="scroll-mt-[calc(var(--header-h)+2rem)] grid items-stretch gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]"
        >
          {/*
            The left half is now a dark, image-backed panel rather than type on
            the same cream ground as the form.

            The registration is the point of the page and it previously read as
            two columns of equal weight - a heading beside some fields. Setting
            the argument on midnight over a photograph and leaving the form on
            light makes the split legible as a split: one side asks, the other
            answers.

            `tokens-dark` rather than `surface-dark`: identical token inversion
            for every child, but no painted background, so the photograph shows
            through and the assurance list inverts without needing dark-specific
            variants.

            It bleeds one gutter to the left, matching the showcase panel's
            bleed on What We Do, so the two pages share one idea of how a
            feature panel meets the page edge.
          */}
          <div className="tokens-dark relative isolate overflow-hidden lg:-ms-(--gutter)">
            <div aria-hidden="true" className="absolute inset-0 -z-20">
              <NextImage
                src={backdrops.register.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                placeholder="blur"
                className="photo-grade object-cover"
                style={{ objectPosition: "50% 45%" }}
              />
            </div>
            {/*
              Heavy, and heaviest where the type sits. The assurance list is
              body copy over a photograph, which is the hardest contrast case
              on the site - this is the `heavy` scrim from `Figure` rather than
              a lighter veil, for that reason.
            */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(160deg,rgba(12,20,29,0.94)_18%,rgba(12,20,29,0.88)_58%,rgba(12,20,29,0.72)_100%)] rtl:bg-[linear-gradient(200deg,rgba(12,20,29,0.94)_18%,rgba(12,20,29,0.88)_58%,rgba(12,20,29,0.72)_100%)]"
            />
            <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

            <div className="px-8 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
              <Reveal>
                <SectionLabel>{registerPanel.label}</SectionLabel>
                <Heading
                  id="investors-register"
                  level={2}
                  size="display"
                  className="mt-5 max-w-[12ch]"
                >
                  {registerPanel.heading}
                </Heading>
              </Reveal>

              {/* Assurance. Short, and next to the form rather than after it. */}
              <Reveal delay={140} className="mt-12">
                <span
                  aria-hidden="true"
                  className="about-rule mb-7 block h-px w-14 bg-[linear-gradient(90deg,var(--color-accent),transparent)]"
                />
                <p className="text-label uppercase text-(--color-foreground-subtle)">
                  {investorAssurance.heading}
                </p>
                <ul className="mt-6 flex flex-col gap-4">
                  {investorAssurance.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-4 shrink-0 bg-(--color-accent)"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
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
