import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";

import { CookieConsent } from "@/components/layout/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleProvider } from "@/components/layout/LocaleProvider";
import { SkipLink } from "@/components/layout/SkipLink";
import { currentLocale } from "@/content";
import { loadDictionary } from "@/content/dictionary";
import { defaultLocale, direction, isLocale, locales, type Locale } from "@/lib/i18n";
import { createRootMetadata } from "@/lib/seo";

import "../globals.css";

/**
 * Typography.
 *
 * One family across the whole site: Plus Jakarta Sans, a humanist geometric
 * sans with the slightly narrow set and open apertures that read as
 * contemporary corporate rather than as a UI system font.
 *
 * Single-family by choice. Hierarchy here is carried by WEIGHT, SIZE and
 * TRACKING rather than by contrasting typefaces - large headings sit at 500
 * with tight negative tracking, body at 400, labels at 600 with wide tracking.
 * That is what keeps the display sizes feeling elegant instead of shouty; a
 * heading does not need to be bold to be dominant when it is 6rem tall.
 *
 * Loaded as a variable font, so the entire 200-800 axis is available from a
 * single file rather than one request per weight. `display: swap` with latin
 * subsets means no invisible-text flash, and because the fallback metrics are
 * adjusted automatically there is no layout shift when it lands.
 *
 * The CSS variable is named for its ROLE, not the family, so changing typeface
 * later means editing only this file.
 */
const primary = Plus_Jakarta_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Arabic typography.
 *
 * Plus Jakarta Sans has no Arabic coverage at all, so Arabic set in it falls
 * through to whatever the device happens to have - Tahoma on Windows, Geeza Pro
 * on iOS - which is the single most common way a bilingual site ends up looking
 * unfinished in one of its languages.
 *
 * IBM Plex Sans Arabic is the match, and not an arbitrary one: it is a humanist
 * sans with open apertures and a slightly narrow set drawn to sit beside a
 * Latin companion, which is the same description as the English face. It
 * carries the 200-800 range the English hierarchy uses, so headings at 500 with
 * tight tracking and labels at 600 with wide tracking behave identically in
 * both languages and the visual hierarchy transfers rather than being rebuilt.
 *
 * Loaded alongside the English face rather than instead of it: an Arabic page
 * still sets Latin runs - the legal entity name, tickers, listing venues, email
 * addresses - and those should stay in the brand face. `globals.css` puts Plex
 * Arabic first in the stack only under `[lang="ar"]`, so each script is set in
 * the face drawn for it, in either language.
 */
const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c141d",
};

/**
 * Both languages, prerendered.
 *
 * Without this the whole tree becomes dynamic, which would cost the site the
 * static generation every page currently gets. `ar` is listed even while the
 * Arabic edition is switched off: the routes are built and simply unreachable,
 * so turning the flag on is a deploy rather than a rebuild of the routing.
 */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  return createRootMetadata(await currentLocale());
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const dir = direction[locale];
  const t = await loadDictionary(locale);

  /*
    `lang` and `dir` are both driven by the route segment.

    `dir="rtl"` is what actually mirrors the layout: the logical CSS properties
    used throughout - `ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`,
    `text-start` - resolve against it, so the page flips as a whole rather than
    being right-aligned in patches. Nothing below this line needs to know which
    language it is rendering in order to lay itself out correctly.

    Both font variables are always attached. `globals.css` picks between them
    on `[lang="ar"]`, which keeps the choice in one place instead of in a
    conditional class here.
  */
  return (
    <html
      lang={locale}
      dir={dir}
      className={`${primary.variable} ${arabic.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {/*
          The client half of the locale.

          Server components read the language from `next/root-params` and need
          nothing from this. It exists for the 27 client components - the
          header, the mobile menu, the cookie banner, both forms - which cannot
          use root parameters and would otherwise each need a `lang` prop
          threaded down to them.
        */}
        <LocaleProvider locale={locale} t={t}>
          <SkipLink />
          <Header />
          {/*
            The header is fixed, so page sections own their own top spacing.
            Sections that open with a dark hero pad for it internally.
          */}
          <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
            {children}
          </main>
          <Footer />

          {/*
            Consent gate. Renders nothing once a decision is stored, and
            analytics never load before an explicit Accept - see the component.
          */}
          <CookieConsent />
        </LocaleProvider>
      </body>
    </html>
  );
}
