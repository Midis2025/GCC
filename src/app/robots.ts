import type { MetadataRoute } from "next";

import { siteIsLive } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * robots.txt.
 *
 * Until the client approves launch the whole site is closed to crawlers, and
 * no sitemap is advertised. The brief is explicit: the site must not be
 * discoverable while the content library is empty, because a site whose Insight
 * section holds one item does more harm than a site nobody can find.
 *
 * `siteIsLive` is driven by `NEXT_PUBLIC_SITE_LIVE` and defaults to false. This
 * never flips on its own - see the note in `data/site.ts`.
 *
 * The `disallow` is belt to the meta `noindex` braces in `createMetadata`. They
 * do different jobs: a disallowed page can still be indexed from an external
 * link without ever being fetched, so the meta tag is what actually keeps it
 * out of an index, and this keeps the crawl from happening in the first place.
 */
export default function robots(): MetadataRoute.Robots {
  if (!siteIsLive) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
