import type { NavGroup, NavItem, SocialLink } from "@/types";
import { contactConfig } from "@/data/site";

/**
 * Primary header navigation.
 *
 * Home is deliberately absent. The wordmark is the home link and carries the
 * accessible name "GCC - home", so a Home item would be a second control for
 * the same destination - and with seven entries the desktop bar has no room to
 * spare. `getStaticRoutes()` seeds "/" explicitly, so the sitemap is unaffected.
 */
export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Investor Outreach", href: "/investor-outreach" },
  { label: "Selected Work", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

/** Header / mobile-menu primary action. */
export const headerCta: NavItem = { label: "Start a Conversation", href: "/contact" };

/** Footer link columns. */
export const footerNav: NavGroup[] = [
  {
    label: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Selected Work", href: "/projects" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Industries",
    items: [
      { label: "Financial Services", href: "/industries#financial-services" },
      { label: "Energy & Utilities", href: "/industries#energy-and-utilities" },
      { label: "Real Estate & Development", href: "/industries#real-estate-and-development" },
      { label: "All Sectors", href: "/industries" },
    ],
  },
  {
    label: "Capabilities",
    items: [
      { label: "Investor Relations", href: "/services/investor-relations" },
      { label: "Investor Targeting & Outreach", href: "/investor-outreach" },
      { label: "Media Relations", href: "/services/media-relations" },
      { label: "Digital Communications", href: "/services/digital-communications" },
    ],
  },
  {
    label: "Markets",
    items: [
      { label: "Gulf / GCC", href: "/investor-outreach" },
      { label: "International", href: "/investor-outreach" },
    ],
  },
];

/** Legal / utility links in the footer bottom bar. */
export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/**
 * Social profiles. Derived from the central contact config, so nothing renders
 * until a real LinkedIn URL is supplied.
 */
export const socialLinks: SocialLink[] = contactConfig.linkedin
  ? [{ label: "LinkedIn", href: contactConfig.linkedin, icon: "linkedin" }]
  : [];

/** Internal routes for sitemap.xml, derived from the nav tree. */
export function getStaticRoutes(): string[] {
  const routes = new Set<string>(["/"]);

  const walk = (items: NavItem[]) => {
    for (const item of items) {
      if (item.href.startsWith("/")) routes.add(item.href);
      if (item.children) walk(item.children);
    }
  };

  walk(mainNav);
  footerNav.forEach((group) => walk(group.items));

  return [...routes];
}
