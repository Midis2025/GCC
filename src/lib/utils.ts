/**
 * Dependency-free class name joiner.
 *
 * Intentionally avoids `clsx` / `tailwind-merge` to keep the dependency
 * surface minimal. It concatenates truthy class values; it does NOT resolve
 * conflicting Tailwind utilities, so when overriding a component's classes
 * pass the full replacement utility rather than relying on merge order.
 */
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
      continue;
    }

    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
      continue;
    }

    for (const [key, value] of Object.entries(input)) {
      if (value) classes.push(key);
    }
  }

  return classes.join(" ");
}

/** Strips a trailing slash so URLs can be joined predictably. */
export function trimTrailingSlash(value: string): string {
  return value.endsWith("/") && value.length > 1 ? value.slice(0, -1) : value;
}

/** True when `href` points at the current path (exact match, or a sub-route). */
export function isActivePath(pathname: string, href: string): boolean {
  if (!href.startsWith("/")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Detects links that should open externally / get rel=noreferrer. */
export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

/**
 * Today, as an `<input type="date">` value, in the CALLER'S timezone.
 *
 * `toISOString` would be wrong for this: it converts to UTC first, so for
 * anyone east of Greenwich - which includes every Gulf market these forms exist
 * for - it returns yesterday for most of the evening, and a date field floored
 * with it would refuse a day the visitor can see is still ahead of them.
 *
 * Because it reads the clock it must only ever be called in the browser. This
 * site's form pages are statically prerendered, so a value computed during
 * render would be the BUILD date and stale by the following morning.
 */
export function todayAsInputValue(): string {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * Formats an ISO date for display, e.g. "12 March 2026".
 * Locale is pinned so server and client render identically (no hydration drift).
 */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
