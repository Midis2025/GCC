"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { useLocale } from "@/components/layout/LocaleProvider";
import { NavLink } from "@/components/layout/NavLink";
import { Button } from "@/components/ui/Button";
import { contactConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Whether the document exists never changes, so the store never emits. */
const subscribeNever = () => () => {};

export interface MobileMenuProps {
  items: NavItem[];
  cta?: NavItem | null;
  /** The investor action. Rendered as an outline button under the primary. */
  secondaryCta?: NavItem | null;
  className?: string;
}

/**
 * Full-height off-canvas navigation for small viewports.
 *
 * The panel stays mounted and is driven by `data-open`, so it can animate both
 * in and out - the previous `hidden` toggle made an exit transition
 * impossible. While closed it carries `inert`, which removes it from the
 * accessibility tree and from the tab order just as `hidden` did, so nothing
 * behind the scenes is reachable.
 *
 * Accessibility: the trigger exposes aria-expanded/aria-controls, the panel is
 * a labelled modal dialog, focus is trapped while open and restored on close,
 * Escape closes it, and background scroll is locked. Touch targets are 44px+.
 */
export function MobileMenu({ items, cta, secondaryCta, className }: MobileMenuProps) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  /**
   * Gates the portal, which needs a `document` the server has not got.
   *
   * `useSyncExternalStore` rather than a flag set in an effect: it reports the
   * server snapshot through hydration and the client one after, so the markup
   * React hydrates matches what the server sent and there is no setState in an
   * effect to cascade a second render.
   */
  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false);

  // Close on route change. Adjusted during render rather than in an effect, so
  // an open panel never survives into the new route.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    if (open) setOpen(false);
  }

  // Lock background scroll while open.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Focus into the panel, trap Tab, restore focus on close.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    panel.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, close]);

  if (items.length === 0) return null;

  /*
    The scrim and the panel, which are portalled to <body> below.

    Both are `position: fixed`, and they used to live here inside the <header>.
    That worked at the top of the page and nowhere else: once scrolled, the
    header takes `backdrop-blur-xl`, and an element with a `backdrop-filter`
    becomes the CONTAINING BLOCK for its fixed descendants exactly as `filter`
    and `transform` do. So below the fold `inset-y-0` stopped meaning "the
    viewport" and started meaning "the header" - the panel resolved to 390x71
    instead of 390x844, the scrim covered only the bar, and the navigation was
    laid out inside a 72px strip with the page still on top of it.

    Moving them to <body> puts them back in the viewport's coordinate space at
    every scroll position. The trigger stays in the header, where it belongs.
  */
  const overlay = (
    // Carries the header's `xl` breakpoint across the portal: outside this
    // subtree it would no longer inherit it, and a panel left open while the
    // window is widened past `xl` would stay on screen.
    <div className="xl:hidden">
      {/* Scrim. Fades rather than appearing, and is not focusable. */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 z-50 bg-black/55 backdrop-blur-[3px] transition-opacity duration-500 ease-out",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        id={panelId}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.siteMenu}
        inert={!open}
        data-open={open ? "true" : "false"}
        className={cn(
          "surface-dark fixed inset-y-0 end-0 z-50 flex w-full max-w-[27rem] flex-col overflow-y-auto px-6 pb-8 pt-5 sm:px-8",
          "transition-transform duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
          open ? "translate-x-0" : "ltr:translate-x-full rtl:-translate-x-full",
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 start-0 w-px bg-[linear-gradient(to_bottom,transparent,rgba(184,148,95,0.45),transparent)]"
        />

        <div className="flex items-center justify-between">
          <span className="text-label uppercase text-(--color-foreground-subtle)">
            Menu
          </span>
          <button
            type="button"
            onClick={close}
            aria-label={t.nav.closeMenu}
            className="-me-2 inline-flex h-11 w-11 items-center justify-center text-(--color-foreground) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring)"
          >
            <CloseGlyph />
          </button>
        </div>

        <nav aria-label={t.nav.mobile} className="mt-10">
          <ul className="flex flex-col">
            {items.map((item, index) => (
              <li
                key={item.href}
                /*
                  Each row eases in behind the panel with a stagger. The delay
                  applies on open only - on close every row leaves at once, so
                  dismissing never feels slower than opening.
                */
                style={{ transitionDelay: open ? `${120 + index * 45}ms` : "0ms" } as CSSProperties}
                className={cn(
                  "border-b border-(--color-border-subtle) transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
                  open ? "translate-x-0 opacity-100" : "ltr:translate-x-6 rtl:-translate-x-6 opacity-0",
                )}
              >
                <NavLink
                  item={item}
                  underline={false}
                  className="w-full py-4 font-display text-2xl"
                  onNavigate={close}
                  prefix={
                    <span aria-hidden="true" className="num font-display-sm text-xs text-(--color-accent)">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  }
                />
              </li>
            ))}
          </ul>
        </nav>

        <div
          style={{ transitionDelay: open ? `${140 + items.length * 45}ms` : "0ms" }}
          className={cn(
            "mt-auto pt-10 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          {/*
            Both audiences get their action here, stacked and full width. The
            header drops the secondary as the bar narrows; this is where it
            comes back, so an investor on a phone never has to find the list
            through the body of a page.
          */}
          {cta && (
            <Button href={cta.href} fullWidth size="lg" withArrow onClick={close}>
              {cta.label}
            </Button>
          )}

          {secondaryCta && (
            <div className="mt-3">
              <Button
                href={secondaryCta.href}
                fullWidth
                size="lg"
                variant="outline"
                onClick={close}
              >
                {secondaryCta.label}
              </Button>
            </div>
          )}

          {/*
            The language toggle, on the panel rather than on the closed header
            bar.

            Below `xl` the bar holds the wordmark and the menu control and
            nothing else, and adding a third element to it is what makes a
            mobile header start to feel crowded. In here it sits under the two
            actions, above the contact line, with a rule of its own - the same
            treatment every other group in this panel gets.

            Renders nothing until Arabic is published, so the panel is
            unchanged in the meantime.
          */}
          <LanguageToggle className="mt-8 border-t border-(--color-border) pt-7" />

          {contactConfig.email && (
            <a
              href={`mailto:${contactConfig.email}`}
              className="mt-6 inline-block text-sm text-(--color-foreground-muted) hover:text-(--color-foreground)"
            >
              {contactConfig.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    // Mirrors the Header's `xl` breakpoint - see the note on its <nav>.
    <div className={cn("xl:hidden", className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={t.nav.openMenu}
        className="-me-2 inline-flex h-11 w-11 items-center justify-center text-(--color-foreground) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring)"
      >
        <MenuGlyph />
      </button>

      {/*
        Portalled only once mounted, because there is no `document` to portal
        into while this renders on the server. The panel is `inert` and off
        canvas until it is opened, so nothing is lost by it arriving with
        hydration - and every link in it is also in the header's own nav and in
        the footer, both of which are server-rendered.
      */}
      {mounted ? createPortal(overlay, document.body) : null}
    </div>
  );
}

/** Two-rule mark - deliberately not a three-bar hamburger. */
function MenuGlyph() {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 26 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 3h26" />
      <path d="M8 11h18" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 3l14 14" />
      <path d="M17 3L3 17" />
    </svg>
  );
}
