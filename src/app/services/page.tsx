import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { ServiceNav } from "@/components/sections/ServiceNav";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Figure } from "@/components/ui/Figure";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { capabilities } from "@/data/capabilities";
import { backdrops, capabilityPhotos } from "@/data/imagery";
import { cn } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Services",
  path: "/services",
  description:
    "Investor relations, investor targeting and market outreach, media relations and digital communications for companies in Gulf and international capital markets.",
});

/**
 * Services index.
 *
 * A photographic hero, a sticky scroll-spy rail, then four large editorial
 * blocks. The image side alternates left/right down the page and the surface
 * tone alternates with it, so the eye is handed across the page rather than
 * reading four identical rows.
 *
 * Each block is a landmark section with its own id, which is what the sticky
 * nav anchors to and what makes /services#media-relations a real destination.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.services}
        eyebrow="Services"
        title="Strategic Communications Built Around Capital Markets."
        lead="Four capabilities, run as one connected programme. Companies rarely need all of them at once, and the balance is set by where a business stands with the market rather than by a standard scope."
      >
        <ul className="grid gap-x-8 gap-y-4 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability) => (
            <li key={capability.slug} className="flex items-baseline gap-3">
              <span aria-hidden="true" className="font-serif text-sm text-(--color-accent)">
                {capability.number}
              </span>
              <a
                href={`#${capability.slug}`}
                className="link-underline text-[0.9375rem] text-(--color-foreground-muted) transition-colors hover:text-(--color-foreground) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-ring)"
              >
                {capability.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <ServiceNav />

      {capabilities.map((capability, index) => {
        const imageFirst = index % 2 === 1;

        return (
          <Section
            key={capability.slug}
            spacing="lg"
            tone={imageFirst ? "muted" : "canvas"}
            aria-labelledby={`service-${capability.slug}`}
            id={capability.slug}
            className="scroll-mt-[calc(var(--header-h)+4rem)]"
          >
            <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
              <Reveal
                variant="media"
                className={cn("lg:sticky lg:top-[calc(var(--header-h)+5.5rem)]", imageFirst && "lg:order-2")}
              >
                <Figure
                  photo={capabilityPhotos[capability.slug]}
                  ratio="tall"
                  overlay="veil"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
              </Reveal>

              <div className={cn(imageFirst && "lg:order-1")}>
                <Reveal>
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-numeral leading-none text-(--color-accent)/25">
                      {capability.number}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-(--color-border)" />
                  </div>

                  <Heading
                    id={`service-${capability.slug}`}
                    level={2}
                    size="display"
                    className="mt-7 max-w-[14ch]"
                  >
                    {capability.title}
                  </Heading>

                  <p className="mt-7 max-w-[52ch] text-lead text-(--color-foreground-muted)">
                    {capability.summary}
                  </p>

                  <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                    {capability.description}
                  </p>
                </Reveal>

                <Reveal delay={120}>
                  <h3 className="mt-11 text-label font-medium uppercase text-(--color-foreground-subtle)">
                    Areas of work
                  </h3>
                  <CheckList items={capability.areas} className="mt-5" />

                  <div className="mt-11">
                    <Button href={capability.href} variant="outline" size="lg" withArrow>
                      {capability.slug === "investor-outreach"
                        ? "Explore Investor Outreach"
                        : `Explore ${capability.title}`}
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </Section>
        );
      })}

      <CTASection />
    </>
  );
}
