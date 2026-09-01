import { LocaleLink } from "@/components/layout/LocaleLink";
import { Section } from "@/components/sections/Section";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { currentLocale, getDictionary, insightFormat, pick } from "@/content";
import { insightContentAr } from "@/content/ar/insight";
import { insightPhotos } from "@/data/imagery";
import {
  HOMEPAGE_INSIGHT_THRESHOLD,
  insightContent as insightContentEn,
  latestInsightItems,
  type InsightItem,
} from "@/data/insight";
import type { Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

/**
 * Format / date line, shared by both card sizes.
 *
 * The category slot now carries the FORMAT name - The Gulf Brief, Five
 * Questions, Sector Notes, From the Room - because that is what the current
 * taxonomy classifies a piece by. A reader who values one format can spot it
 * from the homepage without opening anything.
 *
 * The "Sample" flag the old version rendered is gone with the placeholder
 * system it belonged to. Nothing reaches this component now unless it is a
 * real published item, so a badge marking it as not-real would always be
 * wrong.
 */
async function Meta({
  item,
  tone = "subtle",
  locale,
  fallbackFormatName,
}: {
  item: InsightItem;
  tone?: "subtle" | "accent";
  locale: Locale;
  fallbackFormatName: string;
}) {
  const format = await insightFormat(item.format);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-label uppercase">
      <span className={tone === "accent" ? "text-(--color-accent)" : "text-(--color-foreground-subtle)"}>
        {format?.name ?? fallbackFormatName}
      </span>
      <time dateTime={item.date} className="text-(--color-foreground-subtle)">
        {formatDate(item.date, locale)}
      </time>
    </div>
  );
}

/**
 * Editorial insights preview.
 *
 * One lead article carrying a large photograph, with the remaining entries
 * running as a compact indexed column beside it - the layout a publication
 * uses, rather than three identical cards. The whole card is one link, so the
 * hit target is large on touch and reaches the same destination by keyboard.
 *
 * ---------------------------------------------------------------------------
 * The gate
 * ---------------------------------------------------------------------------
 * RENDERS NOTHING below three published items, which is a rule of the current
 * brief rather than an edge case this happens to handle. A homepage section
 * headed "Perspectives on Gulf Capital Markets" showing one item, or three
 * skeletons, or a "coming soon" card, announces an empty library far more
 * loudly than its absence does.
 *
 * This layout needs the gate more than the plain list it replaced did, not
 * less: it is built around a lead article and a secondary column, so at two
 * items the column beside the lead holds a single orphan and at one item it is
 * empty. The threshold and the layout's minimum are the same number by
 * coincidence, and the gate is what enforces it either way.
 *
 * The site launches with an empty library by design, so at build this returns
 * null. Publish three items and the section appears with no other change.
 *
 * The old placeholder machinery - sample entries, the "Sample" badge, the
 * pending-content notice - is gone with `data/insights.ts`. Nothing reaches
 * this component now that is not a real published piece.
 */
export async function InsightsPreview() {
  const items = latestInsightItems(3);
  if (items.length < HOMEPAGE_INSIGHT_THRESHOLD) return null;

  const insightContent = await pick({ en: insightContentEn, ar: insightContentAr });
  const locale = await currentLocale();
  const t = await getDictionary();
  const [lead, ...rest] = items;

  return (
    <Section spacing="lg" tone="muted" aria-labelledby="insights-heading">
      <Reveal>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>{insightContent.previewLabel}</SectionLabel>
            <Heading id="insights-heading" level={2} size="display" className="mt-5 max-w-[14ch]">
              {insightContent.previewHeading}
            </Heading>
          </div>

          <LocaleLink
            href="/insight"
            className="link-underline self-start py-1 text-[0.9375rem] text-(--color-foreground-muted) hover:text-(--color-foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring) sm:self-auto"
          >
            {t.insight.allInsights}
          </LocaleLink>
        </div>

      </Reveal>

      <div className="mt-[var(--space-heading)] grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {/* Lead article */}
        <Reveal>
          <article className="group h-full">
            <LocaleLink
              href={`/insight/${lead.slug}`}
              className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
            >
              <Figure
                photo={insightPhotos[0]}
                ratio="wide"
                overlay="veil"
                zoom
                sizes="(min-width: 1024px) 55vw, 100vw"
              />

              <div className="mt-5">
                <Meta
                  item={lead}
                  tone="accent"
                  locale={locale}
                  fallbackFormatName={insightContent.fallbackFormatName}
                />

                <h3 className="mt-5 max-w-[22ch] font-display text-h2 leading-[1.12] text-balance transition-colors duration-300 group-hover:text-(--color-accent)">
                  {lead.title}
                </h3>

                <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                  {lead.excerpt}
                </p>
              </div>
            </LocaleLink>
          </article>
        </Reveal>

        {/* Secondary column */}
        <ul className="flex flex-col lg:pt-2">
          {rest.map((item, index) => (
            <li key={item.slug} className="border-t border-(--color-border) last:border-b">
              <Reveal delay={120 + index * 90}>
                <article className="group">
                  <LocaleLink
                    href={`/insight/${item.slug}`}
                    className="flex gap-6 py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                  >
                    <div className="min-w-0 flex-1">
                      <Meta
                        item={item}
                        locale={locale}
                        fallbackFormatName={insightContent.fallbackFormatName}
                      />

                      <h3 className="mt-4 font-display text-[1.3125rem] leading-snug text-balance transition-colors duration-300 group-hover:text-(--color-accent)">
                        {item.title}
                      </h3>

                      <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                        {item.excerpt}
                      </p>
                    </div>

                    <div className="hidden w-24 shrink-0 sm:block lg:w-28">
                      <Figure
                        photo={insightPhotos[(index + 1) % insightPhotos.length]}
                        ratio="square"
                        zoom
                        sizes="7rem"
                      />
                    </div>
                  </LocaleLink>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
