import Link from "next/link";

import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { capabilityPhotos, insightPhotos } from "@/data/imagery";
import { getFormat, itemsByFormat, type InsightFormatId } from "@/data/insight";
import {
  editorialThemes,
  fiveQuestionsDetail,
  fromTheRoomDetail,
  gulfBriefDetail,
  menasDigitalNewsDetail,
  sectorNotesDetail,
} from "@/data/insight-page";
import { formatDate } from "@/lib/utils";

/**
 * Published items for a format.
 *
 * Renders NOTHING when a format has none, which is the whole point: the page
 * describes five standing formats and must never imply a library it does not
 * have. No skeletons, no "coming soon", no sample entries with invented dates.
 *
 * The moment real items exist they appear here under their format, with no
 * other change to the page.
 */
function PublishedItems({ format }: { format: InsightFormatId }) {
  const items = itemsByFormat(format);
  if (items.length === 0) return null;

  return (
    <ul className="mt-10 border-t border-(--color-border)">
      {items.map((item) => (
        <li key={item.slug} className="border-b border-(--color-border)">
          <Link
            href={`/insight/${item.slug}`}
            className="group flex flex-col gap-1.5 py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <span className="font-display text-[1.0625rem] leading-snug transition-colors duration-500 group-hover:text-(--color-accent)">
              {item.title}
            </span>
            <time
              dateTime={item.date}
              className="shrink-0 text-sm text-(--color-foreground-subtle)"
            >
              {formatDate(item.date)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * ============================================================================
 * MENA'S DIGITAL NEWS
 * ============================================================================
 * The daily feed. First of the five, and the only one that lives off-site.
 *
 * ---------------------------------------------------------------------------
 * Why this composition and not another
 * ---------------------------------------------------------------------------
 * Typographic, on the muted ground, with no photograph. Two reasons, and both
 * are about the section that follows it: The Gulf Brief is an editorial split
 * with a tall image on the canvas ground, and putting a second photographic
 * split immediately above it would have read as the same section twice. The
 * page's rule is that no two neighbours share a ground or a composition, and
 * this is the section that has to satisfy it - the other four were placed
 * against each other before it existed.
 *
 * It is otherwise built from exactly the parts the other formats use: the
 * cadence as a `SectionLabel`, the name as a display `Heading`, the subline as
 * a lead, the covers list with the accent dashes The Gulf Brief uses, and the
 * standing qualifier on a rule at the foot of the column.
 *
 * ---------------------------------------------------------------------------
 * The call to action
 * ---------------------------------------------------------------------------
 * This is the one format a reader joins rather than reads here, so it is the
 * one format section with a button. `Button` detects the external href and
 * adds `target="_blank"` and `rel="noopener noreferrer"` itself.
 *
 * If `cta.href` is cleared - and it is marked as awaiting client confirmation
 * in `data/insight-page.ts` - the button is not rendered at all. A call to
 * action that goes nowhere is worse than none, and this is the only link on
 * the page whose destination is still open.
 */
export function MenasDigitalNewsSection() {
  const format = getFormat("menas-digital-news");
  if (!format) return null;

  const { cta } = menasDigitalNewsDetail;

  return (
    <Section
      spacing="lg"
      tone="muted"
      id="menas-digital-news"
      aria-labelledby="format-menas-digital-news"
      className="scroll-mt-[calc(var(--header-h)+2rem)]"
    >
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-24">
        <div>
          <Reveal>
            <SectionLabel>{format.cadence}</SectionLabel>
            <Heading
              id="format-menas-digital-news"
              level={2}
              size="display"
              className="mt-5 max-w-[11ch]"
            >
              {format.name}
            </Heading>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-7 max-w-[44ch] text-lead text-(--color-foreground-muted)">
              {menasDigitalNewsDetail.subline}
            </p>
            {menasDigitalNewsDetail.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <div className="lg:pt-3">
          <Reveal delay={180}>
            <p className="text-label uppercase text-(--color-foreground-subtle)">
              What it may cover
            </p>
            <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {menasDigitalNewsDetail.covers.map((entry) => (
                <li
                  key={entry}
                  className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-px w-3 shrink-0 bg-(--color-accent)"
                  />
                  <span>{entry}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* COMPLIANCE. Standing qualifier, in the same place as every other format's. */}
          <Reveal delay={260}>
            <p className="mt-9 border-t border-(--color-border) pt-6 text-sm text-(--color-foreground-subtle)">
              {menasDigitalNewsDetail.note}
            </p>
          </Reveal>

          {cta.href && (
            <Reveal delay={320}>
              <div className="mt-8 flex flex-col gap-4">
                <Button href={cta.href} variant="outline" withArrow>
                  {cta.label}
                </Button>
                <p className="text-sm leading-relaxed text-(--color-foreground-subtle)">
                  {cta.note}
                </p>
              </div>
            </Reveal>
          )}

          <PublishedItems format="menas-digital-news" />
        </div>
      </div>
    </Section>
  );
}

/**
 * ============================================================================
 * THE GULF BRIEF
 * ============================================================================
 * An editorial split: photograph left, the format's account right.
 *
 * `id="gulf-brief"` is load-bearing. The format navigation above and the
 * individual article pages both link to it, and it is the id the retired
 * single-sequence layout carried - so those links keep working across this
 * redesign.
 */
export function GulfBriefSection() {
  const format = getFormat("gulf-brief");
  if (!format) return null;

  return (
    <Section
      spacing="lg"
      id="gulf-brief"
      aria-labelledby="format-gulf-brief"
      className="scroll-mt-[calc(var(--header-h)+2rem)]"
    >
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-x-20">
        <Reveal variant="media">
          <Figure
            photo={insightPhotos[0]}
            ratio="tall"
            overlay="veil"
            zoom
            className="w-full sm:aspect-[16/10] lg:aspect-[4/5]"
            sizes="(min-width: 1024px) 46vw, 100vw"
          />
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel>{format.cadence}</SectionLabel>
            <Heading
              id="format-gulf-brief"
              level={2}
              size="display"
              className="mt-5 max-w-[12ch]"
            >
              {format.name}
            </Heading>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-7 max-w-[48ch] text-lead text-(--color-foreground-muted)">
              {gulfBriefDetail.subline}
            </p>
            {gulfBriefDetail.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 max-w-[54ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-9 text-label uppercase text-(--color-foreground-subtle)">
              What it may cover
            </p>
            <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {gulfBriefDetail.covers.map((entry) => (
                <li
                  key={entry}
                  className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-px w-3 shrink-0 bg-(--color-accent)"
                  />
                  <span>{entry}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* COMPLIANCE. Standing qualifier, beside the format, not below the page. */}
          <Reveal delay={300}>
            <p className="mt-9 border-t border-(--color-border) pt-6 text-sm text-(--color-foreground-subtle)">
              {gulfBriefDetail.note}
            </p>
          </Reveal>

          <PublishedItems format="gulf-brief" />
        </div>
      </div>
    </Section>
  );
}

/**
 * ============================================================================
 * TOPICS WE MAY EXPLORE
 * ============================================================================
 * A numbered headline list on a dark ground.
 *
 * COMPLIANCE, and it governs the design: these are THEMES, not articles. They
 * carry no date, no author and no link, precisely so they cannot be mistaken
 * for published work - a themed line that was clickable would be a broken
 * promise the first time someone tried it.
 *
 * `editorialThemes.note` states what they are, and it sits at the TOP of the
 * list rather than under it. A qualifier below six headlines is read after the
 * headlines have already been taken as a contents page.
 */
export function EditorialThemesSection() {
  return (
    <Section
      spacing="lg"
      tone="dark"
      aria-labelledby="insight-themes"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(76%_70%_at_82%_8%,#1a2836_0%,#0f1924_52%,#0c141d_100%)]"
      />
      <div
        aria-hidden="true"
        className="about-grid absolute inset-0 -z-10 [--about-grid-gap:7rem]"
      />

      <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-x-24">
        <Reveal>
          <SectionLabel>{editorialThemes.label}</SectionLabel>
          <Heading id="insight-themes" level={2} size="display" className="mt-5 max-w-[12ch]">
            {editorialThemes.heading}
          </Heading>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-label uppercase text-(--color-accent) lg:pb-2">
            {editorialThemes.note}
          </p>
        </Reveal>
      </div>

      <ol className="mt-[var(--space-heading)] flex flex-col">
        {editorialThemes.themes.map((theme, index) => (
          <li key={theme.number} className="theme-row group relative border-t border-white/12">
            <Reveal delay={index * 80}>
              <div className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-5 py-7 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:gap-x-8 sm:py-8">
                <span
                  aria-hidden="true"
                  className="num font-display leading-none text-(--color-accent)/30 text-[1.5rem] sm:text-[2rem]"
                >
                  {theme.number}
                </span>

                <h3 className="theme-title max-w-[36ch] font-display text-[1.25rem] leading-snug text-balance sm:text-[1.5rem]">
                  {theme.title}
                </h3>

                {/*
                  The tag appears on hover and focus. It is supporting
                  information rather than content - the theme is the content -
                  so it is allowed to be revealed rather than always present.
                */}
                <span className="theme-tag col-start-2 mt-3 text-label uppercase text-(--color-foreground-subtle) sm:col-start-3 sm:mt-0 sm:text-end">
                  {theme.tag}
                </span>
              </div>

              {/* The gold rule that expands across the row on hover. */}
              <span
                aria-hidden="true"
                className="theme-rule absolute inset-x-0 top-0 h-px origin-left bg-(--color-accent)"
              />
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/**
 * ============================================================================
 * FIVE QUESTIONS
 * ============================================================================
 * The video format, given a dark cinematic section of its own.
 *
 * The five areas are set as a horizontal measure under a wide still, so the
 * format's defining property - that it is the SAME five areas every time - is
 * the thing the section shows rather than states.
 *
 * No play button. There is nothing to play: adding a control that does nothing
 * is worse than not having one, and it would be the first thing a visitor
 * clicked. When films exist, the still becomes a link and the indicator can
 * come with it.
 */
export function FiveQuestionsSection() {
  const format = getFormat("five-questions");
  if (!format) return null;

  return (
    <Section
      spacing="lg"
      tone="dark"
      id="five-questions"
      aria-labelledby="format-five-questions"
      className="scroll-mt-[calc(var(--header-h)+2rem)] relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(80%_75%_at_18%_12%,#1a2836_0%,#0f1924_54%,#0c141d_100%)]"
      />

      <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-x-24">
        <Reveal>
          <SectionLabel>{format.cadence}</SectionLabel>
          <Heading
            id="format-five-questions"
            level={2}
            size="display"
            className="mt-5 max-w-[12ch]"
          >
            {format.name}
          </Heading>
        </Reveal>

        <Reveal delay={140}>
          <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted) lg:pb-2">
            {fiveQuestionsDetail.subline}
          </p>
        </Reveal>
      </div>

      <Reveal variant="media" delay={220} className="mt-[var(--space-heading)]">
        <Figure
          photo={capabilityPhotos["media-relations"]}
          ratio="wide"
          overlay="veil"
          className="insight-still w-full sm:aspect-[21/9]"
          sizes="100vw"
        />
      </Reveal>

      {/* The five areas, as a measure with five stations. */}
      <ol className="relative mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-5">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 hidden h-px bg-white/12 sm:block"
        />
        {fiveQuestionsDetail.areas.map((area, index) => (
          <li key={area.number} className="border-t border-white/12 pt-6 sm:border-t-0">
            <Reveal delay={index * 110}>
              <span
                aria-hidden="true"
                className="num font-display leading-none text-(--color-accent)/30 text-[1.75rem]"
              >
                {area.number}
              </span>
              <p className="mt-4 text-[1.0625rem] font-medium leading-snug">{area.term}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal delay={620}>
        <p className="mt-10 text-sm text-(--color-foreground-subtle)">
          {fiveQuestionsDetail.note}
        </p>
      </Reveal>

      <PublishedItems format="five-questions" />
    </Section>
  );
}

/**
 * Why a fixed format matters. A typography-only interlude, no image.
 *
 * It follows the dark Five Questions section and precedes the cream Sector
 * Notes, and its whole job is to be the quiet moment between two dense ones.
 */
export function FixedFormatStatement() {
  return (
    <Section spacing="lg" tone="muted" aria-labelledby="insight-consistency">
      <Reveal variant="mask">
        <Heading
          id="insight-consistency"
          level={2}
          size="display"
          className="max-w-[18ch] text-balance"
        >
          {fiveQuestionsDetail.consistency.heading}
        </Heading>
      </Reveal>

      <div className="mt-10 grid gap-x-20 gap-y-6 lg:grid-cols-2">
        {fiveQuestionsDetail.consistency.paragraphs.map((paragraph, index) => (
          <Reveal key={paragraph} delay={140 + index * 110}>
            <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/**
 * ============================================================================
 * SECTOR NOTES
 * ============================================================================
 * Set like a research publication: cream, ruled, typographic, no photography.
 *
 * That restraint is the point. Every other format on this page has an image;
 * this one is the long-form written briefing, and giving it a picture would
 * make it look like the others rather than like a document.
 */
export function SectorNotesSection() {
  const format = getFormat("sector-notes");
  if (!format) return null;

  return (
    <Section
      spacing="lg"
      id="sector-notes"
      aria-labelledby="format-sector-notes"
      className="scroll-mt-[calc(var(--header-h)+2rem)] relative isolate"
    >
      <div
        aria-hidden="true"
        className="rule-field absolute inset-0 -z-10 [--rule-gap:5rem] opacity-50"
      />

      <div className="grid gap-x-20 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <Reveal>
            <SectionLabel>{format.cadence}</SectionLabel>
            <Heading
              id="format-sector-notes"
              level={2}
              size="display"
              className="mt-5 max-w-[10ch]"
            >
              {format.name}
            </Heading>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-7 max-w-[40ch] text-lead text-(--color-foreground-muted)">
              {sectorNotesDetail.subline}
            </p>
          </Reveal>

          {/* Sample topic CATEGORIES. Not report titles. */}
          <Reveal delay={220}>
            <p className="mt-10 text-label uppercase text-(--color-foreground-subtle)">
              Sample topic categories
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-3">
              {sectorNotesDetail.categories.map((category) => (
                <li
                  key={category}
                  className="border border-(--color-border) px-4 py-2 text-[0.875rem] text-(--color-foreground-muted)"
                >
                  {category}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div>
          <Reveal delay={180}>
            <p className="text-label uppercase text-(--color-foreground-subtle)">
              What a note may examine
            </p>
          </Reveal>

          <ol className="mt-6 flex flex-col">
            {sectorNotesDetail.examines.map((entry, index) => (
              <li key={entry} className="border-t border-(--color-border)">
                <Reveal delay={200 + index * 70}>
                  <div className="flex items-baseline gap-5 py-4">
                    <span
                      aria-hidden="true"
                      className="num font-display-sm text-[0.625rem] tracking-[0.14em] text-(--color-accent)"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[1.0625rem] leading-snug">{entry}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          {/* COMPLIANCE. Standing qualifier. */}
          <Reveal delay={640}>
            <p className="mt-8 border-t border-(--color-border) pt-6 text-sm text-(--color-foreground-subtle)">
              {sectorNotesDetail.note}
            </p>
          </Reveal>

          <PublishedItems format="sector-notes" />
        </div>
      </div>

      {/*
        The gating explanation. A quiet band rather than an interruption - it
        explains why some material asks for a registration, which is a courtesy
        to the reader rather than a pitch at them.
      */}
      <Reveal delay={720}>
        <div className="mt-14 grid gap-x-16 gap-y-6 border-t border-(--color-border) pt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h3 className="font-display text-h4 tracking-tight">
              {sectorNotesDetail.gated.heading}
            </h3>
            <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
              {sectorNotesDetail.gated.paragraph}
            </p>
          </div>

          <Button href={sectorNotesDetail.gated.cta.href} variant="outline" withArrow>
            {sectorNotesDetail.gated.cta.label}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

/**
 * ============================================================================
 * FROM THE ROOM
 * ============================================================================
 * Full-bleed and cinematic - the only section on the page where a photograph
 * runs edge to edge behind the type.
 *
 * COMPLIANCE: `shows` lists environment, communication and discussion. Nothing
 * claims an investor outcome, and nothing may be added that does.
 */
export function FromTheRoomSection() {
  const format = getFormat("from-the-room");
  if (!format) return null;

  return (
    <section
      id="from-the-room"
      aria-labelledby="format-from-the-room"
      className="tokens-dark relative isolate scroll-mt-[calc(var(--header-h)+2rem)] overflow-hidden bg-(--midnight) py-[var(--space-section-lg)]"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Figure
          photo={capabilityPhotos["investor-outreach"]}
          ratio="auto"
          className="insight-room h-full w-full"
          sizes="100vw"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(104deg,rgba(12,20,29,0.96)_12%,rgba(12,20,29,0.86)_52%,rgba(12,20,29,0.62)_100%)]"
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.42),transparent)]"
      />

      <Container className="relative z-10">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-x-24">
          <div>
            <Reveal>
              <SectionLabel>{format.cadence}</SectionLabel>
              <Heading
                id="format-from-the-room"
                level={2}
                size="display"
                className="mt-5 max-w-[11ch]"
              >
                {format.name}
              </Heading>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-7 max-w-[46ch] text-lead text-(--color-foreground-muted)">
                {fromTheRoomDetail.subline}
              </p>
            </Reveal>
          </div>

          <div className="lg:pt-3">
            <Reveal delay={200}>
              <p className="text-label uppercase text-(--color-foreground-subtle)">
                What it can show
              </p>
            </Reveal>

            <ul className="mt-6 flex flex-col">
              {fromTheRoomDetail.shows.map((entry, index) => (
                <li key={entry} className="border-t border-white/12">
                  <Reveal delay={240 + index * 90}>
                    <p className="py-4 text-[1.0625rem] leading-snug">{entry}</p>
                  </Reveal>
                </li>
              ))}
            </ul>

            <PublishedItems format="from-the-room" />
          </div>
        </div>
      </Container>
    </section>
  );
}
