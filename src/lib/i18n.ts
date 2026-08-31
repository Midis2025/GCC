/**
 * ============================================================================
 * LOCALES
 * ============================================================================
 * The whole language configuration, in one file that both the server and the
 * client can import. No React, no Next, no server-only APIs - so the proxy, the
 * root layout, the server components and the client toggle all read the same
 * definitions rather than three copies that drift.
 *
 * ----------------------------------------------------------------------------
 * URL SHAPE
 * ----------------------------------------------------------------------------
 * English keeps the URLs it already has, unprefixed:
 *
 *   /              /about         /what-we-do/advisory
 *   /ar            /ar/about      /ar/what-we-do/advisory
 *
 * That is deliberate and not merely a preference. The English site is live,
 * indexed once `NEXT_PUBLIC_SITE_LIVE` is set, and linked from elsewhere;
 * moving every English page to `/en/...` would break every existing link and
 * every canonical for the sake of symmetry. So `/en` is an internal segment
 * that `proxy.ts` rewrites onto, never a URL a visitor sees.
 *
 * ----------------------------------------------------------------------------
 * ARABIC IS PUBLISHED
 * ----------------------------------------------------------------------------
 * Both editions are live. English is the DEFAULT and is unaffected: it keeps
 * the unprefixed URLs, it is what every first-time visitor is served, and it
 * is what `x-default` points at. Arabic is opt-in - reached by the header
 * toggle, by a direct `/ar` link, or by a returning visitor's stored choice at
 * the bare domain.
 *
 * `arabicEnabled` survives as a KILL SWITCH rather than an opt-in. It is on
 * unless something turns it off:
 *
 *   NEXT_PUBLIC_AR_ENABLED=false
 *
 * The inversion is deliberate. The flag existed to keep an unfinished edition
 * out of public view; now that the edition is published, the useful thing to
 * keep is a way to withdraw it in a single deploy - if a translation has to be
 * pulled, or the compliance wording is challenged - without reverting code.
 *
 * `NEXT_PUBLIC_` is correct here and is not a mistake: this value decides what
 * the browser renders, so the browser has to know it. It is not a secret.
 *
 * ----------------------------------------------------------------------------
 * WHAT IS AND IS NOT TRANSLATED, AS OF PUBLICATION
 * ----------------------------------------------------------------------------
 * Fully Arabic: the chrome on every page - navigation, footer, both forms and
 * their validation, the cookie banner, the standing disclosure - and the whole
 * of the home page.
 *
 * Still English inside Arabic chrome: the page copy of What We Do and its four
 * service pages, For Investors, About, Insight, Contact and the four legal
 * pages. Each goes Arabic the moment its content module lands in
 * `src/content/ar/`, with no further wiring.
 */

export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

/** English. Every visitor who has expressed no preference gets this. */
export const defaultLocale: Locale = "en";

export type Direction = "ltr" | "rtl";

export const direction: Record<Locale, Direction> = {
  en: "ltr",
  ar: "rtl",
};

/**
 * How each language names itself.
 *
 * `native` is what the toggle shows, because a language is named in its own
 * language - a reader looking for Arabic is looking for "العربية", not for the
 * English word "Arabic". `short` is the compact form for the mobile toggle.
 */
export const localeNames: Record<Locale, { native: string; short: string; english: string }> = {
  en: { native: "English", short: "EN", english: "English" },
  ar: { native: "العربية", short: "AR", english: "Arabic" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/**
 * Whether the Arabic edition is published. It is.
 *
 * A KILL SWITCH, not an opt-in: on unless `NEXT_PUBLIC_AR_ENABLED` is the
 * literal string "false". Any other value, and the absence of the variable
 * entirely, leaves Arabic published - so a deployment that has never heard of
 * this variable serves both languages, which is the correct default now that
 * both are live.
 *
 * Read at module scope so it is inlined at build time in both bundles.
 * Withdrawing Arabic is therefore a redeploy, which is the right weight for a
 * decision this size.
 */
export const arabicEnabled = process.env.NEXT_PUBLIC_AR_ENABLED !== "false";

/** The locales a visitor may reach. Both, unless Arabic has been withdrawn. */
export function publishedLocales(): Locale[] {
  return arabicEnabled ? [...locales] : [defaultLocale];
}

/**
 * The cookie that remembers a choice.
 *
 * A cookie rather than `localStorage` because the proxy has to read it before
 * any JavaScript runs - a visitor who chose Arabic and then opens the bare
 * domain should land on Arabic, and only the server can decide that without a
 * flash of the wrong language.
 *
 * It is strictly a preference: no identifier, no tracking, nothing personal,
 * which is what keeps it inside the "necessary" category of the cookie notice
 * and out of the consent gate. See `data/legal.ts`.
 */
export const LOCALE_COOKIE = "gc-locale";

/** One year. A language preference is not a session-scoped thing. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Splits a pathname into its locale and the route beneath it.
 *
 * `/ar/about` -> `{ locale: "ar", path: "/about" }`
 * `/about`    -> `{ locale: "en", path: "/about" }`
 *
 * The English branch returns `defaultLocale` rather than null, so callers never
 * have to special-case the unprefixed form.
 */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split("/");
  const first = segments[1];

  if (isLocale(first)) {
    const rest = "/" + segments.slice(2).join("/");
    return { locale: first, path: rest === "/" ? "/" : rest.replace(/\/$/, "") };
  }

  return { locale: defaultLocale, path: pathname };
}

/**
 * A route-relative path, expressed in a given language.
 *
 * `localePath("ar", "/about")` -> `/ar/about`
 * `localePath("en", "/about")` -> `/about`
 *
 * Takes an UNPREFIXED path. Passing an already-prefixed one would double it, so
 * anything coming from a URL goes through `splitLocale` first.
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;

  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * The same page in the other language, given a full pathname.
 *
 * What the toggle links to. Preserves the route, changes only the prefix, so a
 * reader switching language stays where they were rather than being returned to
 * the home page - which is the single most common failure of a language
 * switcher and the reason this is a helper rather than an inline expression.
 */
export function switchLocalePath(pathname: string, to: Locale): string {
  const { path } = splitLocale(pathname);
  return localePath(to, path);
}
