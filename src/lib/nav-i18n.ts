import type { Dictionary } from "@/content/dictionary";
import type { NavGroup, NavItem } from "@/types";

/**
 * ============================================================================
 * LOCALISED NAVIGATION LABELS
 * ============================================================================
 * `data/navigation.ts` stays language-neutral: one list of routes, in one
 * place, with English labels that are still the English copy. This maps a route
 * to its label in whichever language is rendering.
 *
 * ----------------------------------------------------------------------------
 * KEYED BY HREF, NOT BY LABEL
 * ----------------------------------------------------------------------------
 * A route is a stable identifier; a label is display text that may legitimately
 * be edited. Keying the lookup on `/about` means the English wording can be
 * revised without silently detaching its translation, which is exactly what a
 * label-keyed map would do - and it would fail quietly, leaving one English
 * item in an otherwise Arabic menu.
 *
 * Anything not in the table keeps the label it came with. That is the honest
 * failure mode: a new route added to the nav without a translation shows its
 * English label rather than an empty gap or a raw key, and is visible as
 * missing work.
 */
function labelFor(href: string, t: Dictionary): string | undefined {
  const table: Record<string, string> = {
    "/what-we-do": t.nav.items.whatWeDo,
    "/for-investors": t.nav.items.forInvestors,
    "/insight": t.nav.items.insight,
    "/about": t.nav.items.about,
    "/contact": t.nav.items.contact,

    "/what-we-do/investor-roadshows": t.nav.services.investorRoadshows,
    "/what-we-do/gulf-programme": t.nav.services.gulfProgramme,
    "/what-we-do/media-arabic-communications": t.nav.services.mediaArabic,
    "/what-we-do/advisory": t.nav.services.advisory,

    "/for-investors#register": t.footer.joinTheList,

    "/privacy": t.footer.legal.privacy,
    "/disclaimer": t.footer.legal.disclaimer,
    "/terms": t.footer.legal.terms,
    "/cookies": t.footer.legal.cookies,
  };

  return table[href];
}

/** One item, with its label in the current language. */
export function localiseNavItem(item: NavItem, t: Dictionary): NavItem {
  return { ...item, label: labelFor(item.href, t) ?? item.label };
}

/** A list of items. Recurses into children so a nested nav localises whole. */
export function localiseNavItems(items: NavItem[], t: Dictionary): NavItem[] {
  return items.map((item) => ({
    ...localiseNavItem(item, t),
    children: item.children ? localiseNavItems(item.children, t) : undefined,
  }));
}

/**
 * Footer groups.
 *
 * The group headings are not routes, so they are looked up by their own English
 * label - the one case where that is the only key available. The set is closed
 * and lives beside the labels it maps, so it cannot drift unnoticed.
 */
export function localiseNavGroups(groups: NavGroup[], t: Dictionary): NavGroup[] {
  const headings: Record<string, string> = {
    "What We Do": t.footer.groups.whatWeDo,
    Company: t.footer.groups.company,
    "For Investors": t.footer.groups.forInvestors,
  };

  return groups.map((group) => ({
    ...group,
    label: headings[group.label] ?? group.label,
    items: localiseNavItems(group.items, t),
  }));
}
