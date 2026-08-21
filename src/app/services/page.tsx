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
      />

      {/*
        The capability index lives here and only here. It previously also ran
        inside the hero, so the same four titles appeared twice within 100px of
        each other. This version wins the duplicate: it is sticky, it tracks
        scroll position, and it stays useful for the whole page.
      */}
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
            <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
              <Reveal
                variant="media"
                className={cn("lg:sticky lg:top-[calc(var(--header-h)+5.5rem)]", imageFirst && "lg:order-2")}
              >
                {/*
                  The 4:5 crop is right up to about 1600px. Past that the
                  column is wide enough that a portrait frame stands 300px
                  clear of the text beside it, and the band ends on a void
                  under the copy. Relaxing to square from `2xl` keeps the
                  photograph substantial without letting it tower - the crop
                  is the only thing that changes, and only on very large
                  displays.
                */}
                <Figure
                  photo={capabilityPhotos[capability.slug]}
                  ratio="tall"
                  overlay="veil"
                  className="2xl:aspect-square"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
              </Reveal>

              <div className={cn(imageFirst && "lg:order-1")}>
                <Reveal>
                  <div className="flex items-center gap-4">
                    <span className="num text-numeral leading-none text-(--color-accent)/25">
                      {capability.number}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-(--color-border)" />
                  </div>

                  <Heading
                    id={`service-${capability.slug}`}
                    level={2}
                    size="display"
                    className="mt-5 max-w-[14ch]"
                  >
                    {capability.title}
                  </Heading>

                  <p className="mt-5 max-w-[52ch] text-lead text-(--color-foreground-muted)">
                    {capability.summary}
                  </p>

                  <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                    {capability.description}
                  </p>
                </Reveal>

                <Reveal delay={120}>
                  <h3 className="mt-11 text-label uppercase text-(--color-foreground-subtle)">
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
