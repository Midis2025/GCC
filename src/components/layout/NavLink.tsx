"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { useLocalePath } from "@/components/layout/LocaleProvider";
import { splitLocale } from "@/lib/i18n";
import { cn, isActivePath, isExternalHref } from "@/lib/utils";
import type { NavItem } from "@/types";

export interface NavLinkProps {
  item: NavItem;
  className?: string;
  /** Adds the sliding underline treatment used in the header and footer. */
  underline?: boolean;
  /**
   * Decorative node rendered before the label, inside the same link - e.g. the
   * index numeral in the mobile menu. Kept inside the anchor so it cannot
   * become a separate, unlabelled tap target beside it.
   */
  prefix?: ReactNode;
  onNavigate?: () => void;
}

/**
 * Navigation link.
 *
 * The current route is marked with `aria-current="page"` as well as a visual
 * change, so the active state is never communicated by colour alone.
 */
export function NavLink({
  item,
  className,
  underline = true,
  prefix,
  onNavigate,
}: NavLinkProps) {
  const pathname = usePathname();
  const href = useLocalePath();
  const external = item.external ?? isExternalHref(item.href);

  /*
    Active state is decided on the UNPREFIXED path.

    `usePathname` returns `/ar/about` in Arabic while `item.href` is `/about`,
    so comparing them directly marks nothing as current the moment a reader
    switches language. Stripping the locale first means the nav data stays in
    one language-neutral form and the comparison keeps working in both.
  */
  const { path } = splitLocale(pathname);
  const active = !external && isActivePath(path, item.href);

  const classes = cn(
    /*
      Display is decided here rather than by the caller. `cn()` deliberately
      does not resolve Tailwind conflicts, so a `flex` passed in via className
      would not reliably beat a hardcoded `inline-block` - which of the two wins
      depends on their order in the generated stylesheet, not in the class
      string. Owning the choice internally is what makes the prefix gap work.
    */
    prefix ? "inline-flex items-baseline gap-4" : "inline-block",
    "transition-colors duration-300",
    underline && "link-underline",
    active ? "text-(--color-foreground)" : "text-(--color-foreground-muted)",
    "hover:text-(--color-foreground)",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)",
    className,
  );

  const content = (
    <>
      {prefix}
      <span>{item.label}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={item.href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      /*
        Prefixed here, once, rather than in the nav data. `data/navigation.ts`
        stays language-neutral - one list of routes, not two - and every
        consumer of it gets correct hrefs in whichever language is rendering.
      */
      href={href(item.href)}
      className={classes}
      data-active={active ? "true" : undefined}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      {content}
    </Link>
  );
}
