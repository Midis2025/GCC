import { LocaleLink } from "@/components/layout/LocaleLink";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary, pick } from "@/content";
import { notFoundContentAr } from "@/content/ar/utility-pages";
import { backdrops } from "@/data/imagery";
import { mainNav } from "@/data/navigation";
import { notFoundContent as notFoundContentEn } from "@/data/utility-pages";
import { localiseNavItems } from "@/lib/nav-i18n";

/**
 * 404.
 *
 * A designed page rather than a bare message, and it keeps the language the
 * visitor was reading in: `not-found.tsx` sits inside `app/[lang]`, so a bad
 * URL under `/ar` renders this in Arabic and every route below it stays in
 * Arabic too.
 */
export default async function NotFound() {
  const content = await pick({ en: notFoundContentEn, ar: notFoundContentAr });
  const t = await getDictionary();
  const navItems = localiseNavItems(mainNav, t);

  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.utility}
        compact
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
        actions={
          <>
            <Button href="/" size="lg" withArrow>
              {content.home}
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              {content.contact}
            </Button>
          </>
        }
      />

      {/* A route list, so the page is a way forward rather than a dead end. */}
      <Section spacing="md" aria-labelledby="not-found-nav">
        <Reveal>
          <h2
            id="not-found-nav"
            className="text-label uppercase text-(--color-foreground-subtle)"
          >
            {content.goTo}
          </h2>

          <ul className="mt-8 border-t border-(--color-border)">
            {navItems
              .filter((item) => item.href !== "/")
              .map((item) => (
                <li key={item.href} className="border-b border-(--color-border)">
                  {/*
                    `LocaleLink`, so a visitor who reached a bad Arabic URL is
                    not sent back into the English site by the one list on the
                    page whose whole job is to get them somewhere real.
                  */}
                  <LocaleLink
                    href={item.href}
                    className="group block py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                  >
                    <span className="font-display text-h3 transition-colors duration-300 group-hover:text-(--color-accent)">
                      {item.label}
                    </span>
                  </LocaleLink>
                </li>
              ))}
          </ul>
        </Reveal>
      </Section>
    </>
  );
}
