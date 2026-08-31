"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLocale } from "@/components/layout/LocaleProvider";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  arabicEnabled,
  localeNames,
  publishedLocales,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * LANGUAGE TOGGLE
 * ============================================================================
 * Two links, `EN` and `العربية`, in the header beside the actions.
 *
 * ----------------------------------------------------------------------------
 * LINKS, NOT BUTTONS
 * ----------------------------------------------------------------------------
 * Each option is a real anchor to a real URL. That matters for three separate
 * reasons and none of them is style: the other language is crawlable and can
 * carry the `hreflang` relationship the head already declares; it can be
 * opened in a new tab or copied like any other link; and the switch works with
 * no JavaScript at all.
 *
 * `hrefLang` and `lang` are both set on each anchor. `lang` is the one that
 * matters for a screen reader - without it "العربية" is announced by an
 * English voice, which is unintelligible.
 *
 * ----------------------------------------------------------------------------
 * WHAT THE CLICK ADDS
 * ----------------------------------------------------------------------------
 * Only the cookie. Navigation is the link's own job; the handler writes the
 * preference so that a later visit to the bare domain lands in the language the
 * reader chose. `proxy.ts` reads it for `/` and for nothing else - no other
 * path is ever redirected on the basis of it, because a shared link must open
 * in the language its URL names.
 *
 * `SameSite=Lax` and no `Secure` in development. It holds "en" or "ar" and
 * nothing else: no identifier, nothing personal, which is what keeps it inside
 * the necessary-cookies category rather than behind the consent gate.
 *
 * ----------------------------------------------------------------------------
 * WHEN IT RENDERS
 * ----------------------------------------------------------------------------
 * `publishedLocales()` returns both languages now that Arabic is published, so
 * this renders. It falls back to nothing if Arabic is ever withdrawn with
 * `NEXT_PUBLIC_AR_ENABLED=false`, because a single-language toggle is not a
 * toggle - which is also the control the brief means when it rules out a
 * switcher leading to an empty Arabic site.
 */
/**
 * Writes the preference.
 *
 * At module scope rather than inside the component: `document` is external
 * state, and the compiler's immutability rule correctly refuses a write to it
 * from a component body. It belongs outside for its own sake too - it closes
 * over nothing and is the same function on every render.
 */
function remember(next: Locale) {
  try {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
  } catch {
    /* A blocked cookie store costs the memory, not the navigation. */
  }
}

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const available = publishedLocales();

  if (!arabicEnabled || available.length < 2) return null;

  return (
    <nav aria-label={t.meta.switchLabel} className={cn("flex items-center", className)}>
      <ul className="flex items-center">
        {available.map((option, index) => {
          const active = option === locale;

          return (
            <li key={option} className="flex items-center">
              {/* Hairline separator, drawn rather than a border so it cannot
                  inherit a direction and end up on the wrong side in RTL. */}
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="mx-2 block h-3 w-px bg-(--color-foreground)/25"
                />
              )}

              <Link
                href={switchLocalePath(pathname, option)}
                hrefLang={option}
                lang={option}
                onClick={() => remember(option)}
                /*
                  The active language is marked with `aria-current`, not by
                  colour alone - the same rule `NavLink` follows.
                */
                aria-current={active ? "true" : undefined}
                className={cn(
                  "relative py-1 text-label uppercase transition-colors duration-300",
                  /* Enlarges the tap target to ~40px without moving anything. */
                  "after:absolute after:inset-x-[-0.35rem] after:-inset-y-2.5 after:content-['']",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)",
                  active
                    ? "text-(--color-foreground)"
                    : "text-(--color-foreground-muted) hover:text-(--color-foreground)",
                )}
              >
                {localeNames[option].short}
                {/* The full name, for anyone who cannot see that EN and AR are
                    a pair. Announced in the language it names. */}
                <span className="sr-only"> — {localeNames[option].native}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
