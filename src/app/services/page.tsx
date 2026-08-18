import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { capabilities } from "@/data/capabilities";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Services",
  path: "/services",
  description:
    "Investor relations, investor targeting and market outreach, media relations and digital communications for companies in Gulf and international capital markets.",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Strategic Communications Built Around Capital Markets."
        lead="Four capabilities, run as one connected programme. Companies rarely need all of them at once, and the balance is set by where a business stands with the market rather than by a standard scope."
      />

      {/*
        Large editorial service blocks. Alternating surface tone separates them
        without needing cards or borders around each one.
      */}
      {capabilities.map((capability, index) => (
        <Section
          key={capability.slug}
          spacing="lg"
          tone={index % 2 === 1 ? "muted" : "canvas"}
          aria-labelledby={`service-${capability.slug}`}
          id={capability.slug}
        >
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[0.9375rem] text-(--color-accent)">
                  {capability.number}
                </span>
                <span aria-hidden="true" className="h-px w-10 bg-(--color-accent)" />
              </div>

              <Heading id={`service-${capability.slug}`} level={2} className="mt-6 max-w-[15ch]">
                {capability.title}
              </Heading>

              <p className="mt-7 max-w-[52ch] text-lead text-(--color-foreground-muted)">
                {capability.summary}
              </p>

              <div className="mt-9">
                <Button href={capability.href} variant="outline" withArrow>
                  {capability.slug === "investor-outreach"
                    ? "Explore Investor Outreach"
                    : `Explore ${capability.title}`}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="max-w-[60ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
                {capability.description}
              </p>

              <h3 className="mt-10 text-label font-medium uppercase text-(--color-foreground-subtle)">
                Areas of work
              </h3>
              <CheckList items={capability.areas} className="mt-5" />
            </Reveal>
          </div>
        </Section>
      ))}

      <CTASection />
    </>
  );
}
