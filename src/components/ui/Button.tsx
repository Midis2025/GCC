import type { ComponentPropsWithRef } from "react";

import { LocaleLink } from "@/components/layout/LocaleLink";
import { cn, isExternalHref } from "@/lib/utils";

const base =
  "group btn-sweep inline-flex items-center justify-center gap-2.5 rounded-none " +
  "text-sm font-medium tracking-wide " +
  "transition-[color,border-color] duration-300 ease-out " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring) " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-50";

/**
 * Variants reference semantic tokens, so a section wrapped in `.surface-dark`
 * inverts every button automatically with no dark-specific variant.
 *
 * Hover is a wipe rather than a cross-fade: `.btn-sweep` scales a pseudo-
 * element across from the left, and `--sweep-color` tells it what to paint.
 * The resting background stays on the element itself, so the button is still
 * fully styled with CSS transforms unavailable or motion reduced.
 */
const variants = {
  primary:
    "bg-(--color-accent) text-(--color-accent-foreground) [--sweep-color:var(--color-accent-hover)]",
  outline:
    "border border-(--color-foreground)/25 text-(--color-foreground) " +
    "hover:border-(--color-foreground)/60 [--sweep-color:color-mix(in_srgb,var(--color-foreground)_8%,transparent)]",
  solid:
    "bg-(--color-foreground) text-(--color-surface) " +
    "[--sweep-color:color-mix(in_srgb,var(--color-foreground)_85%,transparent)]",
  ghost:
    "text-(--color-foreground) [--sweep-color:color-mix(in_srgb,var(--color-foreground)_8%,transparent)]",
} as const;

const sizes = {
  sm: "h-10 px-5",
  md: "h-12 px-7",
  lg: "h-14 px-9 text-[0.9375rem]",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export interface ButtonProps extends Omit<ComponentPropsWithRef<"button">, "href"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Full width below `sm` - keeps buttons from exceeding narrow viewports. */
  fullWidth?: boolean;
  /** Renders a link styled as a button, keeping correct semantics. */
  href?: string;
  /** Appends a chevron that shifts on hover. */
  withArrow?: boolean;
}

function ArrowGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="transition-transform duration-300 ease-out group-hover:translate-x-1"
    >
      <path d="M2 7h10" />
      <path d="M8 3l4 4-4 4" />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  withArrow = false,
  className,
  href,
  type,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "w-full xs:w-auto",
    className,
  );

  const content = (
    <>
      {children}
      {withArrow && <ArrowGlyph />}
    </>
  );

  if (href) {
    const anchorProps = props as ComponentPropsWithRef<"a">;

    if (isExternalHref(href)) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    /*
      `LocaleLink` rather than `next/link`, so every call-to-action on the site
      keeps its language without a single one of them having to know that the
      site has two. It is a Client Component, which is what lets `Button` stay
      usable from Server Components while still reading the locale.
    */
    return (
      <LocaleLink href={href} className={classes} {...anchorProps}>
        {content}
      </LocaleLink>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} {...props}>
      {content}
    </button>
  );
}
