"use client";

import { useEffect, useState } from "react";

import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { useLocale } from "@/components/layout/LocaleProvider";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLink } from "@/components/layout/NavLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { headerCta, headerSecondaryCta, mainNav } from "@/data/navigation";
import { localiseNavItems } from "@/lib/nav-i18n";
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
 * While transparent it carries `.tokens-dark`, which re-points the semantic
 * colour tokens so the wordmark, nav and CTA invert without variant props.
 * This is why every page hero keeps a dark top band - see PageHero.
 *
 * `.tokens-dark` rather than `.surface-dark` deliberately: the two are
 * identical except that `.surface-dark` also PAINTS a midnight background. Over
 * a hero that already paints one, that second fill landed as a flat band across
 * the top of the page with a visible edge where it ended - the header reading
 * as a separate block bolted above the hero rather than floating over it. Every
 * hero on the site paints its own `bg-(--midnight)`, so dropping the fill
 * changes nothing anywhere except that the band is gone.
 */
export function Header() {
  const { t } = useLocale();
  const navItems = localiseNavItems(mainNav, t);
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
          : "tokens-dark border-b border-transparent bg-transparent",
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
        <nav aria-label={t.nav.primary} className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
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
          {/*
            Two actions, one per audience: companies enquire, investors join
            the list. The site serves both and fails if it only serves one, so
            each gets a permanent control in the same place on every page.

            Both appear from `xl`, where the inline bar itself appears. Five
            nav items and two buttons fit from 1280px with room to spare; below
            that the whole bar collapses into the off-canvas menu, where the
            two actions reappear stacked.
          */}
          {/*
            The language toggle sits before the actions and after the nav -
            the position a bilingual Gulf site conventionally puts it, and far
            enough from the primary button that neither is mistaken for the
            other. It renders nothing at all until Arabic is published, so the
            header is unchanged in the meantime.

            AT EVERY WIDTH, not just from `xl`. Changing language is not a
            navigation choice a reader should have to open a menu to find: on a
            phone it was two taps behind the hamburger, and the one control a
            visitor who has landed in the wrong language needs is the one they
            could not see. The two actions still collapse into the panel below
            `xl` - those are destinations, and the menu is where destinations
            live.

            The toggle stays in the panel as well. The panel and its scrim sit
            at `z-50` over this header at `z-40`, so while the menu is open the
            control up here is covered and unusable; the two are for different
            states rather than a duplicate.
          */}
          <LanguageToggle />

          <div className="hidden xl:block">
            <Button
              href={headerSecondaryCta.href}
              size="sm"
              variant="outline"
              className="whitespace-nowrap"
            >
              {t.nav.secondaryCta}
            </Button>
          </div>

          <div className="hidden xl:block">
            <Button
              href={headerCta.href}
              size="sm"
              variant="primary"
              className="whitespace-nowrap"
            >
              {t.nav.cta}
            </Button>
          </div>

          <MobileMenu
            items={navItems}
            cta={{ ...headerCta, label: t.nav.cta }}
            secondaryCta={{ ...headerSecondaryCta, label: t.nav.secondaryCta }}
          />
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
