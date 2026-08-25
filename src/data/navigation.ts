import type { NavGroup, NavItem, SocialLink } from "@/types";
import { contactConfig } from "@/data/site";

/**
 * Primary header navigation.
 *
 * Five items, matching the sitemap in the build brief: What We Do, For
 * Investors, Insight, About, Contact.
 *
 * Home is deliberately absent. The wordmark is the home link and carries its
 * own accessible name, so a Home item would be a second control for the same
 * destination.
 *
 * There is no Services dropdown, and that is a decision rather than an
 * omission: the four service lines are the architecture of the business, a
 * dropdown hides them behind a hover, and the offer is easier to understand
 * when all four are seen together on one page. They live on What We Do.
 */
export const mainNav: NavItem[] = [
  { label: "What We Do", href: "/what-we-do" },
  { label: "For Investors", href: "/for-investors" },
  { label: "Insight", href: "/insight" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * The two header actions, one per audience.
 *
 * The site serves two audiences and fails if it only serves one: companies who
 * pay, and investors who are the asset being built. One button each, in the
 * same place on every page, is the clearest structural expression of that.
 *
 * `Enquire` is the primary (companies, routed to Contact); `Join the list` is
 * the outline secondary (investors, routed to For Investors).
 */
export const headerCta: NavItem = { label: "Enquire", href: "/contact" };
export const headerSecondaryCta: NavItem = { label: "Join the list", href: "/for-investors" };

/** The four service lines. One source, used by the nav, the footer and the overview page. */
export const serviceNav: NavItem[] = [
  { label: "Investor Roadshows", href: "/what-we-do/investor-roadshows" },
  { label: "The Gulf Programme", href: "/what-we-do/gulf-programme" },
  { label: "Media & Arabic Communications", href: "/what-we-do/media-arabic-communications" },
  { label: "Advisory", href: "/what-we-do/advisory" },
];

/** Footer link columns. */
export const footerNav: NavGroup[] = [
  {
    label: "What We Do",
    items: serviceNav,
  },
  {
    label: "Company",
    items: [
      { label: "What We Do", href: "/what-we-do" },
      { label: "About", href: "/about" },
      { label: "Insight", href: "/insight" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    label: "For Investors",
    items: [
      { label: "For Investors", href: "/for-investors" },
      { label: "Join the list", href: "/for-investors#register" },
    ],
  },
];

/**
 * Legal links.
 *
 * Four pages, per the brief. Their copy is structural until counsel-approved
 * text arrives - see the note on each page.
 */
export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Cookie Notice", href: "/cookies" },
];

/**
 * Social profiles. Derived from the central contact config, so nothing renders
 * until a real LinkedIn URL is supplied - the brief puts LinkedIn presence at
 * soft launch, not at build.
 */
export const socialLinks: SocialLink[] = contactConfig.linkedin
  ? [{ label: "LinkedIn", href: contactConfig.linkedin, icon: "linkedin" }]
  : [];

/** Internal routes for sitemap.xml, derived from the nav tree. */
export function getStaticRoutes(): string[] {
  const routes = new Set<string>(["/"]);

  const walk = (items: NavItem[]) => {
    for (const item of items) {
      // Fragment links point at a section of a page already in the set.
      if (item.href.startsWith("/") && !item.href.includes("#")) routes.add(item.href);
      if (item.children) walk(item.children);
    }
  };

  walk(mainNav);
  walk(serviceNav);
  walk(legalNav);
  footerNav.forEach((group) => walk(group.items));

  return [...routes];
}
