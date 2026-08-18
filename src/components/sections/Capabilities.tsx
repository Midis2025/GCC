import Link from "next/link";

import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { capabilities } from "@/data/capabilities";

/**
 * Editorial capability system - deliberately not four icon cards.
 *
 * Each capability is a full-width row: index, title, summary and an arrow.
 * Hover raises the accent and shifts the arrow; the whole row is one link, so
 * the target is large on touch and reaches the same destination by keyboard.
 * Rows stack naturally on mobile with the index above the title.
 */
export function Capabilities() {
  return (
    <Section spacing="lg" tone="muted" aria-labelledby="capabilities-heading">
      <Reveal className="max-w-3xl">
        <SectionLabel>What We Do</SectionLabel>
        <Heading id="capabilities-heading" level={2} className="mt-7">
          Our Capabilities
        </Heading>
      </Reveal>

      <ul className="mt-14 border-t border-(--color-border)">
        {capabilities.map((capability, index) => (
          <li key={capability.slug} className="border-b border-(--color-border)">
            <Reveal delay={index * 90}>
              <Link
                href={capability.href}
                className="group flex flex-col gap-4 py-8 transition-colors duration-300 sm:py-10 lg:grid lg:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.05fr)_3rem] lg:items-baseline lg:gap-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
              >
                <span className="font-serif text-[0.9375rem] text-(--color-accent)">
                  {capability.number}
                </span>

                <Heading
                  level={3}
                  size="h3"
                  font="serif"
                  className="transition-colors duration-300 group-hover:text-(--color-accent)"
                >
                  {capability.title}
                </Heading>

                <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                  {capability.summary}
                </p>

                <span
                  aria-hidden="true"
                  className="hidden justify-self-end text-(--color-foreground-muted) transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-(--color-accent) lg:block"
                >
                  <svg
                    width="22"
                    height="12"
                    viewBox="0 0 22 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="square"
                  >
                    <path d="M0 6h20" />
                    <path d="M15 1l5 5-5 5" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
