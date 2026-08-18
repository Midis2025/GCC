import type { MetadataRoute } from "next";

import { capabilities } from "@/data/capabilities";
import { insights } from "@/data/insights";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap.
 *
 * Deliberately excludes the legal placeholder routes and any insight still
 * flagged as a placeholder - those pages are noindex, and listing them here
 * would contradict that.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/services", "/investor-outreach", "/insights", "/contact"];

  const serviceRoutes = capabilities
    .filter((capability) => capability.href.startsWith("/services/"))
    .map((capability) => capability.href);

  const insightRoutes = insights
    .filter((insight) => !insight.isPlaceholder)
    .map((insight) => `/insights/${insight.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...insightRoutes].map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "/insights" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
