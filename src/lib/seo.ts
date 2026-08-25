import type { Metadata } from "next";

import { siteConfig, siteIsLive } from "@/data/site";
import type { SeoOverrides } from "@/types";
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
  const { title, description, path = "/", image, noIndex } = overrides;

  const resolvedDescription = description || siteConfig.description || undefined;
  const resolvedImage = image || siteConfig.ogImage || undefined;
  const canonical = path;

  const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: title ? { absolute: `${title} | ${siteConfig.name}` } : siteConfig.name,
    description: resolvedDescription,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: title ?? siteConfig.name,
      description: resolvedDescription,
      url: absoluteUrl(canonical),
      locale: siteConfig.locale,
      images: resolvedImage ? [{ url: resolvedImage }] : undefined,
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
export function createRootMetadata(): Metadata {
  return {
    ...createMetadata(),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
  };
}
