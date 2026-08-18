"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn, isActivePath, isExternalHref } from "@/lib/utils";
import type { NavItem } from "@/types";

export interface NavLinkProps {
  item: NavItem;
  className?: string;
  /** Adds the sliding underline treatment used in the header and footer. */
  underline?: boolean;
  onNavigate?: () => void;
}

/**
 * Navigation link.
 *
 * The current route is marked with `aria-current="page"` as well as a visual
 * change, so the active state is never communicated by colour alone.
 */
export function NavLink({ item, className, underline = true, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const external = item.external ?? isExternalHref(item.href);
  const active = !external && isActivePath(pathname, item.href);

  const classes = cn(
    "inline-block transition-colors duration-300",
    underline && "link-underline",
    active ? "text-(--color-foreground)" : "text-(--color-foreground-muted)",
    "hover:text-(--color-foreground)",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)",
    className,
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
        {item.label}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={classes}
      data-active={active ? "true" : undefined}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  );
}
