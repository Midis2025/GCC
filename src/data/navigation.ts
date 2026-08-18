import type { NavGroup, NavItem, SocialLink } from "@/types";
import { contactConfig } from "@/data/site";

/** Primary header navigation. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Investor Outreach", href: "/investor-outreach" },
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
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
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
