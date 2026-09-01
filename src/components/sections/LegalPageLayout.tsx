import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { pick, type Localised } from "@/content";
import { legalPageChromeAr, pendingCounselNoticeAr } from "@/content/ar/legal";
import { backdrops } from "@/data/imagery";
import {
  legalPageChrome as legalPageChromeEn,
  pendingCounselNotice as pendingCounselNoticeEn,
  type LegalPage,
} from "@/data/legal";
import { siteConfig } from "@/data/site";

/**
 * The shared frame for all four legal pages.
 *
 * `page` is the document, in whichever language the route resolved - the four
 * routes each `pick` their own and hand it over, exactly as they handed over
 * the English one before. The two standing lines around the section list, and
 * the pending-counsel notice at the top, are the same on all four pages and
 * are read here rather than being passed four times.
 *
 * CONTENT INTEGRITY. The notice is FIRST and unmissable in both languages, and
 * it is not conditional: it is what tells a reader that nothing on the page is
 * final. See the header of `data/legal.ts`.
 */
export async function LegalPageLayout({ page }: { page: Localised<LegalPage> }) {
  const notice = await pick({ en: pendingCounselNoticeEn, ar: pendingCounselNoticeAr });
  const chrome = await pick({ en: legalPageChromeEn, ar: legalPageChromeAr });

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
              <p className="text-label uppercase text-(--color-accent)">{notice.label}</p>
              <h2
                id={`legal-${page.slug}`}
                className="mt-3 font-display text-[1.375rem] leading-snug"
              >
                {notice.heading}
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                {notice.body}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="mt-14 text-label uppercase text-(--color-foreground-subtle)">
              {chrome.contentsHeading}
            </h3>
          </Reveal>

          <ol className="mt-7 flex flex-col">
            {page.sections.map((section, index) => (
              <Reveal key={section.heading} delay={160 + index * 60}>
                <li className="border-t border-(--color-border) py-7">
                  <Heading level={4} size="h4" className="font-medium">
                    {section.heading}
                  </Heading>
                  {/*
                    `ps-8` went with the index it was clearing. The scope line
                    was inset to sit under the heading rather than under the
                    numeral in the margin; with the numeral gone the inset was
                    an indent with nothing above it.
                  */}
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                    {section.scope}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={400}>
            {/*
              The publisher is substituted into the sentence rather than
              concatenated onto it, because Arabic puts the name in a different
              position from English. The name is Latin script in both languages
              and is never translated.

              `legalName` is EMPTY and is expected to stay empty: no company
              has been incorporated under the Gulf Connect name, so the brand
              name is what publishes these pages. The fallback is written out
              rather than the field being read directly, so that a future
              incorporation is one edit in `site.ts` and none here.
            */}
            <p className="mt-14 border-t border-(--color-border) pt-8 text-sm leading-relaxed text-(--color-foreground-subtle)">
              {chrome.publishedBy.replace("{entity}", siteConfig.legalName || siteConfig.name)}
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
