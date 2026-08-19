"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/ui/Container";
import { capabilities } from "@/data/capabilities";
import { cn } from "@/lib/utils";

/**
 * Sticky capability navigation for the services index.
 *
 * Sits directly beneath the fixed header and tracks which service block is in
 * view. Scroll-spy uses one IntersectionObserver over the four section
 * elements with a rootMargin that collapses the viewport to a band just under
 * the header, so "active" means "the block currently occupying the reading
 * area" rather than "the block nearest the top of the document".
 *
 * The links are real in-page anchors, so this works with JavaScript disabled
 * and honours the `:target` scroll-margin already set in globals.css. The
 * highlight is progressive enhancement on top.
 */
export function ServiceNav() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const sections = capabilities
      .map((capability) => document.getElementById(capability.slug))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the entry closest to the top of the reading band, so passing
        // a short section does not leave a stale highlight behind.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveSlug(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Capabilities"
      className="sticky top-(--header-h) z-30 border-b border-(--color-border) bg-(--color-canvas)/92 backdrop-blur-md"
    >
      <Container>
        {/*
          Horizontally scrollable below `sm`. The scroll container is the <ul>
          rather than the section, so a long list can never widen the page.
        */}
        <ul className="-mx-1 flex items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {capabilities.map((capability) => {
            const isActive = activeSlug === capability.slug;

            return (
              <li key={capability.slug} className="shrink-0">
                <a
                  href={`#${capability.slug}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 whitespace-nowrap px-3 py-2.5 text-sm transition-colors duration-300",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring)",
                    isActive
                      ? "text-(--color-foreground)"
                      : "text-(--color-foreground-muted) hover:text-(--color-foreground)",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-serif text-xs transition-colors duration-300",
                      isActive ? "text-(--color-accent)" : "text-(--color-foreground-subtle)",
                    )}
                  >
                    {capability.number}
                  </span>
                  <span>{capability.title}</span>
                  {/* Active marker: a rule, so state is not colour-only. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-px bg-(--color-accent) transition-[width] duration-500 ease-out",
                      isActive ? "w-6" : "w-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
