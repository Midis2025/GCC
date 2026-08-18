import Link from "next/link";
import type { ComponentPropsWithRef } from "react";

import { cn, isExternalHref } from "@/lib/utils";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-none " +
  "text-sm font-medium tracking-wide " +
  "transition-[background-color,color,border-color] duration-300 ease-out " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring) " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-50";

/**
 * Variants reference semantic tokens, so a section wrapped in `.surface-dark`
 * inverts every button automatically with no dark-specific variant.
 */
const variants = {
  primary:
    "bg-(--color-accent) text-(--color-accent-foreground) hover:bg-(--color-accent-hover)",
  outline:
    "border border-(--color-foreground)/25 text-(--color-foreground) " +
    "hover:border-(--color-foreground)/60 hover:bg-(--color-foreground)/5",
  solid:
    "bg-(--color-foreground) text-(--color-surface) hover:bg-(--color-foreground)/85",
  ghost: "text-(--color-foreground) hover:bg-(--color-foreground)/5",
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

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} {...props}>
      {content}
    </button>
  );
}
