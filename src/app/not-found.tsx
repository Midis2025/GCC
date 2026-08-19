import Link from "next/link";

import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { backdrops } from "@/data/imagery";
import { mainNav } from "@/data/navigation";

export default function NotFound() {
  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.utility}
        compact
        eyebrow="404"
        title="This page could not be found."
        lead="The page you are looking for may have moved, or the address may be incorrect."
        actions={
          <>
            <Button href="/" size="lg" withArrow>
              Return home
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Contact GCC
            </Button>
          </>
        }
      />

      {/* A route list, so the page is a way forward rather than a dead end. */}
      <Section spacing="md" aria-labelledby="not-found-nav">
        <Reveal>
          <h2
            id="not-found-nav"
            className="text-label uppercase text-(--color-foreground-subtle)"
          >
            Go to
          </h2>

          <ul className="mt-8 border-t border-(--color-border)">
            {mainNav
              .filter((item) => item.href !== "/")
              .map((item, index) => (
                <li key={item.href} className="border-b border-(--color-border)">
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-5 py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
                  >
                    <span aria-hidden="true" className="num font-display-sm text-sm text-(--color-accent)">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-h3 transition-colors duration-300 group-hover:text-(--color-accent)">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </Reveal>
      </Section>
    </>
  );
}
