import { Approach } from "@/components/sections/Approach";
import { CTASection } from "@/components/sections/CTASection";
import { EditorialStatement } from "@/components/sections/EditorialStatement";
import { GlobalConnection } from "@/components/sections/GlobalConnection";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Showcase } from "@/components/sections/Showcase";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { currentLocale, pick } from "@/content";
import {
  commercialModelContentAr,
  serviceLinesAr,
  whatWeDoHeroAr,
  whatWeDoReachAr,
  whatWeDoShowcaseAr,
  whatWeDoTransitionAr,
} from "@/content/ar/what-we-do";
import { whatWeDoMapAr } from "@/content/ar/world-connections";
import { backdrops, banners, serviceLinePhotos } from "@/data/imagery";
import {
  commercialModelContent as commercialModelContentEn,
  serviceLines as serviceLinesEn,
  whatWeDoHero as whatWeDoHeroEn,
  whatWeDoReach as whatWeDoReachEn,
  whatWeDoShowcase as whatWeDoShowcaseEn,
  whatWeDoTransition as whatWeDoTransitionEn,
} from "@/data/what-we-do";
import { narrowMap, whatWeDoMap as whatWeDoMapEn } from "@/data/world-connections";
import { cn } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "What We Do",
  path: "/what-we-do",
  description:
    "Investor roadshows, a six-month Gulf programme, media and Arabic communications, and advisory - on fixed professional fees for defined scopes of work.",
});

/**
 * What We Do - the service overview.
 *
 * All four lines on one page rather than behind a nav dropdown. The brief is
 * explicit about why: the four lines ARE the architecture of the business, a
 * dropdown hides them behind a hover, and the offer is easier to understand
 * when they are seen together.
 *
 * The commercial model sits on this page in body copy rather than in a
 * footnote, because it is a differentiator rather than a caveat. Fixed fees,
 * and three plain statements about what the firm is not paid for.
 *
 * Design: the existing system throughout - `PageHero`, `Section`, `Reveal`,
 * the indexed-row treatment already used for capabilities. No new components
 * and no new imagery; the hero reuses the frame that opened the services index
 * this page replaces.
 */
export default async function WhatWeDoPage() {
  /*
    The client banner supplies the hero PHOTOGRAPH on the English route. It is
    artwork rather than a library frame and there is no Arabic edition of it,
    so the Arabic route falls back to the backdrop passed below.
  */
  const banner = (await currentLocale()) === "en" ? banners.whatWeDo : null;
  /*
    One `pick` per content module, exactly as the home page does it. The page
    body below is unchanged in structure - only the source of each string moved
    from a hard-coded literal to a localised module.
  */
  const whatWeDoHero = await pick({ en: whatWeDoHeroEn, ar: whatWeDoHeroAr });
  const serviceLines = await pick({ en: serviceLinesEn, ar: serviceLinesAr });
  const showcase = await pick({ en: whatWeDoShowcaseEn, ar: whatWeDoShowcaseAr });
  const commercialModelContent = await pick({
    en: commercialModelContentEn,
    ar: commercialModelContentAr,
  });
  const transition = await pick({ en: whatWeDoTransitionEn, ar: whatWeDoTransitionAr });
  const reach = await pick({ en: whatWeDoReachEn, ar: whatWeDoReachAr });
  const whatWeDoMap = narrowMap(await pick({ en: whatWeDoMapEn, ar: whatWeDoMapAr }));

  return (
    <>
      {/*
        The banner and the backdrop are both passed; `PageHero` renders
        whichever it is given, identically. The eyebrow, title and lead below
        are the hero's visible copy in both cases - an earlier set of banners
        had those words baked into the artwork and suppressed these to
        `sr-only`, which is no longer true of either the artwork or the
        component. See the note on `banners` in data/imagery.ts.
      */}
      <PageHero
        banner={banner}
        variant="feature"
        photo={backdrops.services}
        eyebrow={whatWeDoHero.eyebrow}
        title={whatWeDoHero.title}
        lead={whatWeDoHero.lead}
      />

      {/*
        The four lines, in the site's signature showcase.

        Pointing at, tabbing to or touching a row cross-fades the photograph in
        the sticky panel beside it. This is the interaction the homepage used
        to carry for the old capability list; the brief removed the services
        dropdown so that the four lines are seen together, and seeing them
        together is exactly what this pattern is for.
      */}
      <Showcase
        id="service-lines"
        label={showcase.label}
        heading={showcase.heading}
        note={showcase.note}
        items={serviceLines.map((line) => ({
          key: line.slug,
          title: line.title,
          summary: line.summary,
          href: line.href,
          /*
            `photoKey` is an identifier, not copy. `Localised` widens every
            string, so it is narrowed back here; the Arabic module repeats the
            same four keys verbatim.
          */
          photo: serviceLinePhotos[line.photoKey as keyof typeof serviceLinePhotos],
        }))}
      />

      {/*
        The commercial model.

        COMPLIANCE: the exclusions are statements about compensation and they
        are load-bearing. Do not soften, merge or move them into a footnote -
        see the header of `data/what-we-do.ts`, which also records the two that
        were removed on client instruction and why.
      */}
      {/*
        Recomposed as a statement over three columns.

        It was a 50/50 split with the argument on one side and the three
        exclusions stacked on the other, which gave three categorical denials
        the same shape as any other list on the site. They are the most
        distinctive thing on the page and they now hold the full width as
        columns, under the statement they qualify.

        COMPLIANCE: same wording, same order, all of them visible without an
        interaction, and the label above them unchanged. See the header of
        `data/what-we-do.ts`.
      */}
      <Section spacing="lg" tone="muted" aria-labelledby="commercial-model">
        <div className="grid gap-x-20 gap-y-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <Reveal>
            <SectionLabel>{commercialModelContent.label}</SectionLabel>
            <Heading
              id="commercial-model"
              level={2}
              size="display"
              className="mt-5 max-w-[13ch]"
            >
              {commercialModelContent.heading}
            </Heading>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-5 lg:pb-2">
            {commercialModelContent.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-[var(--space-heading)]">
          <p className="text-label uppercase text-(--color-foreground-subtle)">
            {commercialModelContent.exclusionsLabel}
          </p>
        </Reveal>

        {/*
          Columns divided by vertical rules rather than boxed, and the count
          follows the list rather than being fixed at three.

          It WAS fixed at three, for three denials. Two of those were removed
          on client instruction and a hard `sm:grid-cols-3` would have left the
          remaining one in a third of the row with two empty columns beside it -
          which reads as a rendering failure, not as a design.

          The gold rule sits on top of each column and draws itself in
          sequence, so a multi-column row still resolves left to right as the
          section arrives.
        */}
        <dl
          className={cn(
            "mt-8 grid border-t border-(--color-border)",
            commercialModelContent.exclusions.length > 1 && "sm:grid-cols-3",
          )}
        >
          {commercialModelContent.exclusions.map((item, index) => (
            <div
              key={item.term}
              className="relative border-b border-(--color-border) pt-9 pb-8 sm:border-b-0 sm:pe-10 sm:not-first:border-s sm:not-first:border-(--color-border) sm:not-first:ps-10 sm:not-last:pe-10"
            >
              <Reveal delay={index * 140}>
                <span
                  aria-hidden="true"
                  className="about-rule absolute start-0 top-0 block h-px w-full bg-(--color-accent) sm:w-[calc(100%-2.5rem)]"
                />

                <dt className="mt-6 max-w-[18ch] font-display text-[1.375rem] leading-snug text-balance">
                  {item.term}
                </dt>
                <dd className="mt-4 max-w-[38ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                  {item.description}
                </dd>
              </Reveal>
            </div>
          ))}
        </dl>
      </Section>

      {/*
        A typographic pause between the commercial model and the process.

        The page runs showcase, then a two-column argument, then a five-stage
        rule - three dense blocks in succession with nothing between them. This
        is a single line of type on a photograph, and its job is to be the one
        place on the page where the eye is given nothing to read but one
        sentence.

        The statement is the page's own heading turned around: the commercial
        model above it says fixed fees for defined scopes, and this states the
        same position as a principle. It introduces no new claim - no figure, no
        outcome, no promise - which is why it can be set at this size.
      */}
      <EditorialStatement
        id="what-we-do-transition"
        statement={transition.statement}
        photo={backdrops.industriesTransition}
        compact
      />

      {/*
        Where the work reaches.

        The map variant for this page leans regional: fewer international
        origins than the Insight one and more weight on the three markets
        programmes actually run in, because this page is about the work rather
        than about the subject matter.
      */}
      <GlobalConnection
        id="what-we-do-reach"
        label={reach.label}
        heading={reach.heading}
        paragraphs={reach.paragraphs}
        map={whatWeDoMap}
      />

      {/*
        Our Approach - the five-stage rule, reused from the homepage.

        It earns its place here rather than being duplicated for the sake of
        it: this page sets out WHAT is sold and on what commercial terms, and
        the stages are the only account on it of HOW an engagement actually
        runs. A reader who has just read four service lines and a fee model is
        exactly the reader with that question.

        The other restored sections are not repeated here. `CapabilityShowcase`
        in particular would be the same interaction pattern as the showcase
        above it on this very page, which is why it stays on the homepage
        alone.
      */}
      <Approach tone="canvas" />

      <CTASection />
    </>
  );
}
