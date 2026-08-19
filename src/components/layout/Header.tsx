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
 * background/border change driven by one passive scroll listener, with the
 * scroll position read through requestAnimationFrame so a fast flick cannot
 * queue a state update per scroll event.
 *
 * While transparent it carries `.surface-dark`, which re-points the semantic
 * colour tokens so the wordmark, nav and CTA invert without variant props.
 * This is why every page hero keeps a dark top band - see PageHero.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 24);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 h-(--header-h)",
        "transition-[background-color,border-color,box-shadow] duration-500 ease-out",
        scrolled
          ? "border-b border-(--color-border) bg-(--color-canvas)/92 shadow-[var(--shadow-sm)] backdrop-blur-xl"
          : "surface-dark border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-8">
        <Logo />

        {/*
          The inline bar appears at `xl`, not `lg`. Seven items plus the
          wordmark and the CTA need about 1150px of gutter-to-gutter room; at
          1024 the longer labels and the button were wrapping onto second
          lines. Between 1024 and 1280 the off-canvas menu handles it, which is
          the correct trade for a nav this size.
        */}
        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => (
              <li key={item.href}>
                {/*
                  The pseudo-element enlarges the pointer target to ~39px
                  without changing layout or the underline position, so the
                  23px text line still meets the WCAG target-size minimum.
                */}
                <NavLink
                  item={item}
                  className="relative whitespace-nowrap text-[0.9375rem] after:absolute after:inset-x-0 after:-inset-y-2 after:content-['']"
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
          <div className="hidden xl:block">
            <Button
              href={headerCta.href}
              size="sm"
              variant="primary"
              className="whitespace-nowrap"
            >
              {headerCta.label}
            </Button>
          </div>

          <MobileMenu items={mainNav} cta={headerCta} />
        </div>
      </Container>

      {/*
        Hairline under the transparent state. Present only while unscrolled, so
        the header still reads as an edge over photography without a border
        that would look heavy against the hero.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-500",
          "bg-[linear-gradient(90deg,transparent,rgba(244,241,235,0.16),transparent)]",
          scrolled ? "opacity-0" : "opacity-100",
        )}
      />
    </header>
  );
}
