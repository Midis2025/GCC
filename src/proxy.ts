import { NextResponse, type NextRequest } from "next/server";

import {
  LOCALE_COOKIE,
  arabicEnabled,
  defaultLocale,
  isLocale,
  locales,
} from "@/lib/i18n";

/**
 * ============================================================================
 * PROXY - locale routing
 * ============================================================================
 * `proxy.ts`, not `middleware.ts`. The middleware convention is deprecated in
 * Next 16 and renamed; the file and the exported function are both `proxy`.
 * See `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`.
 *
 * ----------------------------------------------------------------------------
 * WHAT THIS DOES, AND THE ONE THING IT MUST NOT DO
 * ----------------------------------------------------------------------------
 * Every route lives under `app/[lang]`, but English must keep its existing
 * unprefixed URLs - `/about`, not `/en/about`. So an English request is
 * REWRITTEN, never redirected: the visitor's URL bar keeps saying `/about` and
 * the router resolves `app/[lang]/about` with `lang = "en"`.
 *
 * The one thing it must not do is redirect on language. A visitor who asked for
 * `/about` gets `/about` - never a 307 to `/ar/about` because of a cookie or an
 * `Accept-Language` header. Automatic language redirection breaks shared links,
 * confuses crawlers about which URL is canonical, and takes a decision away
 * from the reader that the header toggle exists to give them.
 *
 * The cookie is therefore consulted for the BARE DOMAIN ONLY - a visitor typing
 * `gulfconnect…` with no path, who chose Arabic last time, is sent to `/ar`.
 * Every other path is served in the language its URL names.
 */

/**
 * Paths that never carry a locale.
 *
 * The API is language-neutral - it takes and returns backend identifiers, not
 * display copy - and the metadata routes are single files that already emit
 * both languages. Rewriting any of these under `[lang]` would 404 them.
 */
const BYPASS = [
  "/api",
  "/_next",
  "/favicon.ico",
  "/favicon.png",
  "/apple-icon.png",
  "/images",
  "/robots.txt",
  "/sitemap.xml",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (BYPASS.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return NextResponse.next();
  }

  const first = pathname.split("/")[1];

  /* --- Already carries a locale prefix -------------------------------- */
  if (isLocale(first)) {
    /*
      `/en/...` is an internal shape, not a public URL. Anything that reaches
      it - a stray link, a crawler that guessed - is redirected to the
      canonical unprefixed form rather than served, so the same page can never
      be reached at two addresses and split its own ranking.
    */
    if (first === defaultLocale) {
      const url = request.nextUrl.clone();
      const rest = pathname.slice(`/${defaultLocale}`.length);
      url.pathname = rest === "" ? "/" : rest;
      return NextResponse.redirect(url, 308);
    }

    /*
      A locale that exists in the code but is not published yet. While
      `NEXT_PUBLIC_AR_ENABLED` is unset, `/ar` is not a half-finished page for
      the public to find - it is not a page at all.
    */
    if (!arabicEnabled) {
      const url = request.nextUrl.clone();
      const rest = pathname.slice(`/${first}`.length);
      url.pathname = rest === "" ? "/" : rest;
      return NextResponse.redirect(url, 307);
    }

    return NextResponse.next();
  }

  /* --- Unprefixed: English, or a remembered preference at the root ----- */
  const stored = request.cookies.get(LOCALE_COOKIE)?.value;

  if (pathname === "/" && arabicEnabled && isLocale(stored) && stored !== defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${stored}`;
    return NextResponse.redirect(url, 307);
  }

  /*
    The rewrite. Internal only: the address bar is untouched, so English URLs
    are exactly what they were before this file existed.
  */
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  /*
    Everything except Next's own internals and anything with a file extension -
    which covers the images, the fonts and the two icon files without having to
    name them. `BYPASS` above is the belt to this braces: the matcher keeps the
    proxy from running at all, and the list keeps it correct if the matcher is
    ever loosened.
  */
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};

/** Exported for the tests in `scripts/`, and to keep the list in one place. */
export const bypassPrefixes = BYPASS;
export const supportedLocales = locales;
