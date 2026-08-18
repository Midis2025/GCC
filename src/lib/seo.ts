import type { Metadata } from "next";

import { siteConfig } from "@/data/site";
import type { SeoOverrides } from "@/types";
import { trimTrailingSlash } from "@/lib/utils";

export const siteUrl = trimTrailingSlash(siteConfig.url);

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

  if (noIndex) {
    metadata.robots = { index: false, follow: false };
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
