import type { Metadata } from "next";

import { siteConfig, siteIsLive } from "@/data/site";
import type { SeoOverrides } from "@/types";
import { arabicEnabled, defaultLocale, localePath, type Locale } from "@/lib/i18n";
import { trimTrailingSlash } from "@/lib/utils";

/**
 * Canonical origin for this deployment.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL - set this once the real domain is confirmed.
 *  2. VERCEL_PROJECT_PRODUCTION_URL - injected by Vercel at build time.
 *  3. localhost, for local development.
 *
 * Step 2 matters: without it, a Vercel deployment with no environment variable
 * configured would bake `http://localhost:3000` into every canonical link,
 * Open Graph tag and sitemap.xml entry on the live site.
 *
 * This module is server-only (metadata generation), so reading a non-public
 * env var here keeps it out of the client bundle.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return siteConfig.url;
}

export const siteUrl = trimTrailingSlash(resolveSiteUrl());

/** Turns a route-relative path into an absolute URL. */
export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Builds a page's Metadata, merging per-page overrides over the site defaults.
 *
 * Empty config values (description, ogImage) are omitted rather than emitted
 * blank, so pages stay clean until real copy and assets arrive.
 *
 * @example
 * export const metadata = createMetadata({ title: "About", path: "/about" });
 */
export function createMetadata(overrides: SeoOverrides = {}): Metadata {
  const { title, description, path = "/", image, noIndex, locale = defaultLocale } = overrides;

  const resolvedDescription = description || siteConfig.description || undefined;
  const resolvedImage = image || siteConfig.ogImage || undefined;

  /*
   * The canonical is the page's own URL IN ITS OWN LANGUAGE.
   *
   * `path` is always the unprefixed route - `/about` - because that is what
   * every page passes and what the sitemap is built from. `localePath` puts the
   * prefix back for Arabic, so `/about` and `/ar/about` each point at
   * themselves rather than both claiming to be the English page.
   */
  const canonical = localePath(locale, path);

  /*
   * hreflang.
   *
   * Two reciprocal entries plus `x-default`, which names the version to serve
   * a reader whose language matches neither - English, the site's own
   * language. Without these the two editions are two pages with the same
   * meaning and no stated relationship, which is the duplicate-content case
   * rather than the multilingual one.
   *
   * Emitted ONLY once the Arabic edition is published. Advertising an
   * alternate that redirects away is worse than advertising none: it invites
   * crawlers to a URL that does not serve what the tag promised.
   */
  const languages = arabicEnabled
    ? {
        en: localePath("en", path),
        ar: localePath("ar", path),
        "x-default": localePath("en", path),
      }
    : undefined;

  /*
   * Dimensions are declared only for the site's own card, whose size is known.
   * A page-supplied override gets the URL alone rather than a claim about its
   * shape that nothing here can verify - unfurlers read the file for that.
   */
  const ogImages = resolvedImage
    ? [
        resolvedImage === siteConfig.ogImage
          ? {
              url: resolvedImage,
              width: 1200,
              height: 630,
              type: "image/png",
              alt: `${siteConfig.wordmark} - ${siteConfig.shortDescription}`,
            }
          : { url: resolvedImage },
      ]
    : undefined;

  const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: title ? { absolute: `${title} | ${siteConfig.name}` } : siteConfig.name,
    description: resolvedDescription,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: title ?? siteConfig.name,
      description: resolvedDescription,
      url: absoluteUrl(canonical),
      /*
       * The OG locale is the page's own, and it names the alternate so an
       * unfurler knows the other edition exists. `ar_AE` rather than a bare
       * `ar`: the audience is the Gulf, and the region is part of the locale.
       */
      locale: locale === "ar" ? "ar_AE" : siteConfig.locale,
      alternateLocale: arabicEnabled
        ? [locale === "ar" ? siteConfig.locale : "ar_AE"]
        : undefined,
      images: ogImages,
    },
    twitter: {
      card: resolvedImage ? "summary_large_image" : "summary",
      title: title ?? siteConfig.name,
      description: resolvedDescription,
      images: resolvedImage ? [resolvedImage] : undefined,
    },
  };

  /*
   * Pre-launch, EVERY page is noindex - not just pages that ask for it.
   *
   * The per-page `noIndex` override still works and still wins, but it cannot
   * be used to opt a page back in: the site-wide gate is a launch condition,
   * not a per-page preference. It lifts when `NEXT_PUBLIC_SITE_LIVE` is set to
   * "true" in the deployment environment and at no other time.
   *
   * `nocache` and the Google-specific directives are included because a page
   * that was indexed before the flag flipped should also drop its cached copy
   * and its snippet, not merely stop being re-crawled.
   */
  if (noIndex || !siteIsLive) {
    metadata.robots = {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    };
  }

  return metadata;
}

/** Root metadata: same as `createMetadata` but with the title template applied. */
export function createRootMetadata(locale: Locale = defaultLocale): Metadata {
  return {
    ...createMetadata({ locale }),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    /*
     * Tab icon.
     *
     * `/favicon.png` is the supplied mark, served from /public so the path is
     * literal and stable. `app/favicon.ico` sits alongside it as a file
     * convention and Next emits it too: the .ico is what crawlers, feed
     * readers and older browsers request by name, the .png is what a current
     * browser will pick for a retina tab.
     *
     * The Apple touch icon is a SEPARATE file, not this one: iOS fills
     * transparency with black, and the mark's inner ring is black, so the home
     * screen icon carries a white ground and the padding iOS's corner radius
     * needs.
     */
    icons: {
      icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
      apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    },
  };
}
