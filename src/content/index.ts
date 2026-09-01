import { lang } from "next/root-params";

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { loadDictionary, type Dictionary } from "@/content/dictionary";
import { insightFormatsAr } from "@/content/ar/insight";
import { insightFormats as insightFormatsEn, type InsightFormatId } from "@/data/insight";

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
export async function pick<T>(pair: { en: T; ar?: Localised<T> }): Promise<Localised<T>> {
  const locale = await currentLocale();
  if (locale === "ar" && pair.ar !== undefined) return pair.ar;
  return pair.en as Localised<T>;
}

/**
 * The English shape with its string literals widened.
 *
 * Every content module is declared `as const`, so `homeHero.title` is not
 * typed `string` - it is typed as the exact English sentence. A translation
 * cannot satisfy that, and without this the Arabic modules would fail to
 * compile against their own English counterparts.
 *
 * So strings widen to `string` while the STRUCTURE stays exact: same keys,
 * same nesting, same array shapes, same non-string literals. That is the
 * property worth keeping - it means a translation with a missing key, a
 * renamed field or an array of the wrong shape is a compile error rather than
 * a hole that shows up on the page in Arabic.
 *
 * ONE CONSEQUENCE TO KNOW ABOUT. A few string fields are identifiers rather
 * than copy - `mark: "convene"` selects a line drawing, `key: "dubai"` selects
 * a photograph - and this widens those to `string` along with everything else,
 * because a type cannot tell an identifier from a sentence. Those call sites
 * narrow the value back explicitly.
 *
 * The identifiers themselves are of course never translated: the Arabic
 * modules repeat them verbatim, and a translated one would select the wrong
 * drawing rather than fail.
 */
export type Localised<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Localised<U>[]
    : T extends object
      ? { readonly [K in keyof T]: Localised<T[K]> }
      : T;

/**
 * The five Insight formats, in the language of the request.
 *
 * A helper rather than a `pick` at each call site, because eight components on
 * the Insight page and the item template all need the same lookup and every
 * one of them is asking the same question: what is this format called, and how
 * often does it appear.
 *
 * `id` is a taxonomy key and is identical in both editions, so the lookup is
 * by id in either language and the anchors on `/insight` resolve unchanged.
 */
export async function insightFormatList(): Promise<Localised<typeof insightFormatsEn>> {
  return pick({ en: insightFormatsEn, ar: insightFormatsAr });
}

/** One format, by id, in the language of the request. */
export async function insightFormat(
  id: InsightFormatId,
): Promise<Localised<typeof insightFormatsEn>[number] | undefined> {
  const formats = await insightFormatList();
  return formats.find((format) => format.id === id);
}

export type { Dictionary };
