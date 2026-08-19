import { ContactForm } from "@/components/sections/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { backdrops } from "@/data/imagery";
import { contactContent, areaOfInterestOptions } from "@/data/contact";
import { gulfMarkets } from "@/data/homepage";
import { contactConfig } from "@/data/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  path: "/contact",
  description:
    "Contact GCC about investor relations, investor outreach, media relations or digital communications in Gulf and international markets.",
});

/**
 * Contact.
 *
 * The quietest page on the site by design: a typographic opening, then a
 * two-column layout where the form is given the wider column and set on a
 * raised surface. Contact details, market coverage and the areas of interest
 * fill the left rail so the page has substance even while
 * `contactConfig` is unpopulated.
 *
 * Content integrity: every contact detail is conditional on `data/site.ts`.
 * Nothing is invented, and no empty rows are rendered.
 */
export default function ContactPage() {
  const hasDetails = Boolean(
    contactConfig.email || contactConfig.phone || contactConfig.address,
  );

  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.contact}
        eyebrow={contactContent.eyebrow}
        title={contactContent.title}
        lead={contactContent.lead}
      />

      <Section spacing="lg" aria-labelledby="contact-heading">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <Reveal>
              <SectionLabel>{contactContent.introHeading}</SectionLabel>
              <Heading id="contact-heading" level={2} size="h2" className="mt-5 max-w-[16ch]">
                Tell us where the company stands today.
              </Heading>

              <div className="mt-8 flex flex-col gap-5">
                {contactContent.introParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            {/*
              Contact details render only when supplied in data/site.ts.
              Nothing is invented, and no empty rows are shown.
            */}
            {hasDetails && (
              <Reveal delay={100}>
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
              </Reveal>
            )}

            <Reveal delay={140}>
              <div className="mt-12 border-t border-(--color-border) pt-8">
                <h3 className="text-label uppercase text-(--color-foreground-subtle)">
                  Areas of interest
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {areaOfInterestOptions.map((option) => (
                    <li
                      key={option.value}
                      className="border border-(--color-border) px-3.5 py-1.5 text-sm text-(--color-foreground-muted)"
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-9 text-label uppercase text-(--color-foreground-subtle)">
                  Markets
                </h3>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {gulfMarkets.map((market) => (
                    <li key={market.code} className="text-sm text-(--color-foreground-muted)">
                      {market.label}
                    </li>
                  ))}
                  <li className="text-sm text-(--color-foreground-muted)">International</li>
                </ul>
              </div>
            </Reveal>

          </div>

          {/*
            The form sits on a raised surface with a hairline border, so it
            reads as a distinct object on the page rather than as loose fields
            in a column.
          */}
          <Reveal delay={120}>
            <div className="border border-(--color-border) bg-(--color-surface) p-6 shadow-[var(--shadow-md)] sm:p-9 lg:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
