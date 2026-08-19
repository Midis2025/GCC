import type { MetadataRoute } from "next";

import { capabilities } from "@/data/capabilities";
import { insights } from "@/data/insights";
import { hasPlaceholderProjects, projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap.
 *
 * Deliberately excludes the legal placeholder routes, any insight still
 * flagged as a placeholder, and the engagement routes while `data/projects.ts`
 * holds placeholders - those pages are noindex, and listing them here would
 * contradict that.
 *
 * The /projects index is itself omitted while its entries are placeholders,
 * because the page carries `noIndex` in that state too.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/industries",
    "/investor-outreach",
    "/insights",
    "/contact",
    ...(hasPlaceholderProjects() ? [] : ["/projects"]),
  ];

  const serviceRoutes = capabilities
    .filter((capability) => capability.href.startsWith("/services/"))
    .map((capability) => capability.href);

  const insightRoutes = insights
    .filter((insight) => !insight.isPlaceholder)
    .map((insight) => `/insights/${insight.slug}`);

  const projectRoutes = projects
    .filter((project) => !project.isPlaceholder)
    .map((project) => `/projects/${project.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...insightRoutes, ...projectRoutes].map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "/insights" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
