"use client";

import { useEffect, useState } from "react";

import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLink } from "@/components/layout/NavLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { headerCta, mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

/**
 * Fixed site header.
 *
 * Sits transparently over the dark hero at the top of the page, then settles
 * onto a solid surface once scrolled. The transition is a plain CSS
 * background/border change driven by one passive scroll listener.
 *
 * While transparent it carries `.surface-dark`, which re-points the semantic
 * colour tokens so the wordmark, nav and CTA invert without variant props.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 h-(--header-h)",
        "transition-[background-color,border-color,box-shadow] duration-500 ease-out",
        scrolled
          ? "border-b border-(--color-border) bg-(--color-canvas)/95 backdrop-blur-md"
          : "surface-dark border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-8">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => (
              <li key={item.href}>
                {/*
                  The pseudo-element enlarges the pointer target to ~39px
                  without changing layout or the underline position, so the
                  23px text line still meets the WCAG target-size minimum.
                */}
                <NavLink
                  item={item}
                  className="relative text-[0.9375rem] after:absolute after:inset-x-0 after:-inset-y-2 after:content-['']"
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/*
            Visibility is controlled by this wrapper rather than a `hidden`
            class on the Button: both are display utilities, and cn() does not
            resolve Tailwind conflicts, so the Button base `inline-flex` would
            win over `hidden` depending on stylesheet order.
          */}
          <div className="hidden lg:block">
            <Button href={headerCta.href} size="sm" variant="primary">
              {headerCta.label}
            </Button>
          </div>

          <MobileMenu items={mainNav} cta={headerCta} />
        </div>
      </Container>
    </header>
  );
}
