import { ContactForm } from "@/components/sections/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { contactContent } from "@/data/contact";
import { contactConfig } from "@/data/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  path: "/contact",
  description:
    "Contact GCC about investor relations, investor outreach, media relations or digital communications in Gulf and international markets.",
});

export default function ContactPage() {
  const hasDetails = Boolean(
    contactConfig.email || contactConfig.phone || contactConfig.address,
  );

  return (
    <>
      <PageHero
        eyebrow={contactContent.eyebrow}
        title={contactContent.title}
        lead={contactContent.lead}
      />

      <Section spacing="lg" aria-labelledby="contact-heading">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <SectionLabel>{contactContent.introHeading}</SectionLabel>
            <Heading id="contact-heading" level={2} size="h3" className="mt-6 max-w-[18ch]">
              Tell us where the company stands today.
            </Heading>

            <div className="mt-7 flex flex-col gap-5">
              {contactContent.introParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/*
              Contact details render only when supplied in data/site.ts.
              Nothing is invented, and no empty rows are shown.
            */}
            {hasDetails && (
              <dl className="mt-12 flex flex-col gap-6 border-t border-(--color-border) pt-8">
                {contactConfig.email && (
                  <div>
                    <dt className="text-label uppercase text-(--color-foreground-subtle)">
                      Email
                    </dt>
                    <dd className="mt-2">
                      <a
                        href={`mailto:${contactConfig.email}`}
                        className="link-underline inline-block py-1 text-[1.0625rem]"
                      >
                        {contactConfig.email}
                      </a>
                    </dd>
                  </div>
                )}

                {contactConfig.phone && (
                  <div>
                    <dt className="text-label uppercase text-(--color-foreground-subtle)">
                      Telephone
                    </dt>
                    <dd className="mt-2">
                      <a
                        href={`tel:${contactConfig.phone.replace(/\s+/g, "")}`}
                        className="link-underline inline-block py-1 text-[1.0625rem]"
                      >
                        {contactConfig.phone}
                      </a>
                    </dd>
                  </div>
                )}

                {contactConfig.address && (
                  <div>
                    <dt className="text-label uppercase text-(--color-foreground-subtle)">
                      Office
                    </dt>
                    <dd className="mt-2">
                      <address className="text-[1.0625rem] not-italic leading-relaxed">
                        {contactConfig.address}
                      </address>
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
