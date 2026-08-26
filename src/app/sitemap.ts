import type { MetadataRoute } from "next";

import { insightItems } from "@/data/insight";
import { legalNav } from "@/data/navigation";
import { serviceLines } from "@/data/what-we-do";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap.
 *
 * ---------------------------------------------------------------------------
 * This file described the PRE-RESTRUCTURE site until it was rewritten.
 * ---------------------------------------------------------------------------
 * It listed `/services`, `/industries`, `/investor-outreach` and `/insights` -
 * four routes that no longer exist and now only 308 - and named none of the
 * routes that replaced them. Every current page was missing: What We Do, the
 * four service pages, For Investors, Insight and the legal pages. It also
 * imported three retired data files to build routes from.
 *
 * A sitemap is the one file whose whole job is to be an accurate list of
 * pages, so it is now derived from the same data the navigation and the pages
 * themselves use. Add a service line or a legal page and it appears here
 * without anyone remembering to come and add it.
 *
 * ---------------------------------------------------------------------------
 * What is deliberately excluded
 * ---------------------------------------------------------------------------
 * Insight ARTICLES appear only once published. `insightItems` is empty at
 * launch, so no article routes are emitted - listing a URL that returns a 404
 * is worse than omitting it.
 *
 * ---------------------------------------------------------------------------
 * A note on the sitewide noindex
 * ---------------------------------------------------------------------------
 * The site is noindex until the client approves launch, which makes this file
 * inert in the meantime - a crawler that honours the robots directive will not
 * index any of it. That is exactly why it is worth keeping correct now: the
 * day the flag flips, this is what gets submitted, and nobody will think to
 * re-read it first.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/what-we-do",
    "/for-investors",
    "/insight",
    "/about",
    "/contact",
  ];

  /* The four service pages, from the same source the nav and pages read. */
  const serviceRoutes = serviceLines.map((line) => line.href);

  /* Privacy, disclaimer, terms, cookies. */
  const legalRoutes = legalNav.map((item) => item.href);

  /* Published articles only. Empty at launch, by design. */
  const insightRoutes = insightItems.map((item) => `/insight/${item.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...legalRoutes, ...insightRoutes].map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "/insight" ? "weekly" : "monthly",
    /*
     * Home first, then the top-level pages, then anything nested. Legal pages
     * are deliberately last: they must be findable, but they are not what the
     * site is for.
     */
    priority: route === "/" ? 1 : legalRoutes.includes(route) ? 0.3 : route.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
