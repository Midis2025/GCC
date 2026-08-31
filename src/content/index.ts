import { lang } from "next/root-params";

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { loadDictionary, type Dictionary } from "@/content/dictionary";

/**
 * ============================================================================
 * SERVER-SIDE CONTENT ACCESS
 * ============================================================================
 * The locale, without prop drilling.
 *
 * Every route lives under `app/[lang]`, which makes `lang` a ROOT PARAMETER -
 * and root parameters can be read by any Server Component or server-side
 * utility through `next/root-params`, rather than being threaded through every
 * layer as a prop. That is the difference between touching the ~54 section
 * components that render copy and touching only the ones whose copy actually
 * changes.
 *
 * `next/root-params` arrived in Next 16.3 and this project is on 16.3.1. See
 * `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/next-root-params.md`.
 *
 * ----------------------------------------------------------------------------
 * SERVER COMPONENTS ONLY
 * ----------------------------------------------------------------------------
 * Importing `next/root-params` from a Client Component fails at build time, so
 * this module is structurally server-only and needs no `server-only` guard.
 * Client components get the same values from `LocaleProvider` instead.
 *
 * Route Handlers cannot use it either, which is why `/api/submit` takes no
 * language: it deals in backend identifiers, not display copy.
 */

/**
 * The current locale.
 *
 * Falls back to English rather than throwing when the segment is missing or
 * unrecognised. The proxy guarantees a valid segment in practice, so this is a
 * belt-and-braces default for anything that renders outside the normal routing
 * path - and defaulting to the site's own language is the safe direction to
 * fail in.
 */
export async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : defaultLocale;
}

/** The shared chrome dictionary for the current request. */
export async function getDictionary(): Promise<Dictionary> {
  return loadDictionary(await currentLocale());
}

/**
 * Picks the right value from a `{ en, ar }` pair for the current request.
 *
 * The workhorse for page copy. Content modules keep their approved English
 * exactly as it was and gain an Arabic sibling; a Server Component asks for
 * whichever the request needs:
 *
 *   const copy = await pick({ en: enHome, ar: arHome });
 *
 * Arabic falls back to English when a key has no translation yet. That is a
 * DELIBERATE and narrow fallback: it keeps a missing string from rendering as
 * an empty heading, and it is only ever reachable while the Arabic edition is
 * unpublished, because a locale is not switched on until its content is
 * complete.
 */
export async function pick<T>(pair: { en: T; ar?: T }): Promise<T> {
  const locale = await currentLocale();
  if (locale === "ar" && pair.ar !== undefined) return pair.ar;
  return pair.en;
}

export type { Dictionary };
