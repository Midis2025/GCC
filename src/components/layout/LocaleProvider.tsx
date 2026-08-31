"use client";

import { createContext, useContext, type ReactNode } from "react";

import { defaultLocale, direction, localePath, type Direction, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionary";

/**
 * ============================================================================
 * LOCALE CONTEXT - the client half
 * ============================================================================
 * Server components read the language straight from `next/root-params`, which
 * needs no provider and no prop drilling. Client components cannot: root
 * parameters are a Server Component API and importing them from a
 * `"use client"` file fails at build time.
 *
 * So the root layout - a Server Component - resolves the locale once and hands
 * it down through this provider. The 27 client components on this site (the
 * header, the mobile menu, the cookie banner, both forms, the interactive
 * sections) then read it with `useLocale()`.
 *
 * ----------------------------------------------------------------------------
 * WHY THE WHOLE DICTIONARY GOES OVER THE WIRE HERE
 * ----------------------------------------------------------------------------
 * Anything a client component renders has to reach the browser one way or
 * another - as a prop, as serialised context, or as a string baked into the
 * bundle. Context is the cheapest of the three to maintain and the only one
 * that does not fan a `lang` prop through every intermediate component that
 * does not itself care about language.
 *
 * The cost is that the dictionary is serialised into the RSC payload for every
 * page. That is why `Dictionary` is deliberately the SHARED chrome - navigation
 * labels, form copy, validation messages, buttons, the cookie banner - and not
 * the page copy. Page copy is read by Server Components straight from the
 * content modules and never crosses this boundary.
 */

interface LocaleContextValue {
  locale: Locale;
  dir: Direction;
  /** Shared UI copy. Page copy is not here - see the note above. */
  t: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  t,
  children,
}: {
  locale: Locale;
  t: Dictionary;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, dir: direction[locale], t }}>
      {children}
    </LocaleContext.Provider>
  );
}

/**
 * The locale, its direction and the shared dictionary.
 *
 * Throws rather than falling back to English when used outside the provider.
 * A silent English fallback inside an Arabic page is exactly the "random
 * untranslated English" failure this whole system exists to prevent, and it
 * would show up as a rendering bug rather than as an error anyone could find.
 */
export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);

  if (!value) {
    throw new Error(
      "useLocale must be used inside <LocaleProvider>. The provider is mounted in app/[lang]/layout.tsx.",
    );
  }

  return value;
}

/** True when the current language runs right to left. */
export function useIsRtl(): boolean {
  return useLocale().dir === "rtl";
}

/**
 * Turns an unprefixed route into one in the current language.
 *
 * `href("/cookies")` gives `/cookies` in English and `/ar/cookies` in Arabic.
 *
 * Every internal link in a client component goes through this. Without it a
 * reader in Arabic who clicks anything lands back on the English site, which is
 * the most common way a language switcher appears to "not stick" - the
 * preference was never lost, the link simply pointed out of it.
 */
export function useLocalePath(): (path: string) => string {
  const { locale } = useLocale();
  return (path: string) => localePath(locale, path);
}

export { defaultLocale };
