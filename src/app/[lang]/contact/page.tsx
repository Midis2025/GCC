import NextImage from "next/image";
import { Suspense } from "react";

import { ContactRouter } from "@/components/sections/ContactRouter";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getDictionary, pick } from "@/content";
import { optionLabel } from "@/content/dictionary";
import { contactContentAr } from "@/content/ar/contact";
import { gulfMarketsAr } from "@/content/ar/homepage";
import { backdrops } from "@/data/imagery";
import { contactContent as contactContentEn, areaOfInterestOptions } from "@/data/contact";
import { gulfMarkets as gulfMarketsEn } from "@/data/homepage";
import { contactConfig, siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  path: "/contact",
  description:
    "Contact Gulf Connect about investor relations, investor outreach, media relations or digital communications in Gulf and international markets.",
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
 * Content integrity: the entity and the city are confirmed facts and are
 * always shown; every other contact detail is conditional on `data/site.ts`.
 * Nothing is invented, and no empty rows are rendered.
 */
export default async function ContactPage() {
  const contactContent = await pick({ en: contactContentEn, ar: contactContentAr });
  const gulfMarkets = await pick({ en: gulfMarketsEn, ar: gulfMarketsAr });

  /*
    The row headings - Office, Email, Telephone - and the market list's own
    heading are shared chrome: the footer names the same three things. Reading
    them from one place is what keeps the two agreeing in either language.
  */
  const t = await getDictionary();

  /*
    The details block.

    Always rendered, because the entity and the city are both confirmed facts:
    Gulf Connect, Dubai, UAE. It used to appear only when an
    email, a phone number or a street address existed, which meant a Contact
    page that named the firm nowhere while all three were outstanding.

    Email and phone remain conditional on `data/site.ts` and are still
    outstanding from the client. They are not invented and no empty row is
    rendered in their place - see the TODOs on `contactConfig`.
  */
  const hasDirectDetails = Boolean(contactConfig.email || contactConfig.phone);

  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.contact}
        eyebrow={contactContent.eyebrow}
        title={contactContent.title}
        lead={contactContent.lead}
      />

      {/*
        The enquiry band.
        ---------------------------------------------------------------------
        Built from the treatment `GulfOutreach` and `CTASection` already use -
        full-bleed photograph, a diagonal scrim heavy at the type edge and
        open at the far one, grain over the top, and a hairline cut top and
        bottom. Nothing here is a new idea; it is the site's own way of making
        a band feel like a place, applied to the one section that had been
        left as fields on flat canvas.

        `tokens-dark` rather than `surface-dark`: identical token inversion for
        every child, but no painted background, so the photograph shows
        through. It also carries the stronger muted/subtle foregrounds that
        globals.css reserves for type over photography, which is what keeps
        every label and every line of help text at AA over a moving backdrop.
      */}
      <section
        className="tokens-dark relative isolate overflow-hidden bg-(--midnight) py-[var(--space-section-lg)]"
        aria-labelledby="contact-heading"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
          <NextImage
            src={backdrops.enquiry.src}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            style={{ objectPosition: backdrops.enquiry.position }}
            className="photo-grade object-cover"
          />
        </div>

        {/*
          One diagonal scrim, tuned the same way `GulfOutreach` tunes its own:
          heaviest at the edge the reading column sits on and open at the far
          one, so the photograph is architecture where nothing is written over
          it and a flat ground where something is.

          The far end stops at 0.58 rather than going darker. A second flat
          scrim under this one was the first attempt and it was wrong - between
          them they left about a fifth of the image showing and the band read
          as black, which is the failure the brief describes in the other
          direction: atmosphere is the point, and an image nobody can see is
          just a payload.

          The panel that lands on the open end carries its own glass at ~0.86,
          so the fields sit at roughly 0.94 combined regardless.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(104deg,rgba(9,14,21,0.95)_6%,rgba(10,16,24,0.86)_42%,rgba(12,20,29,0.58)_100%)] rtl:bg-[linear-gradient(256deg,rgba(9,14,21,0.95)_6%,rgba(10,16,24,0.86)_42%,rgba(12,20,29,0.58)_100%)]"
        />
        {/* Settles the top and bottom edges into the sections either side. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(9,14,21,0.55)_0%,transparent_18%,transparent_84%,rgba(9,14,21,0.6)_100%)]"
        />
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-10" />

        {/* Hairlines, so the band reads as a deliberate cut in the page. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.45),transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.28),transparent)]"
        />

        <Container className="relative z-10">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div>
            <Reveal>
              <SectionLabel>{contactContent.introHeading}</SectionLabel>
              <Heading id="contact-heading" level={2} size="h2" className="mt-5 max-w-[16ch]">
                {contactContent.introTitle}
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
              Contact details.

              The entity and the city are confirmed and always shown. Email and
              phone render only when supplied in data/site.ts - nothing is
              invented, and no empty rows are shown.
            */}
            <Reveal delay={100}>
              <dl className="mt-12 flex flex-col gap-6 border-t border-(--color-border) pt-8">
                <div>
                  <dt className="text-label uppercase text-(--color-foreground-subtle)">
                    {t.footer.office}
                  </dt>
                  <dd className="mt-2">
                    <address className="text-[1.0625rem] not-italic leading-relaxed">
                      {/*
                        The BRAND name. `legalName` is empty and is expected to
                        stay empty - no company has been incorporated under the
                        Gulf Connect name - so this falls back to `name` rather
                        than rendering a blank first line above the city.
                      */}
                      {siteConfig.legalName || siteConfig.name}
                      <br />
                      {/*
                        The street address if the client publishes one, and
                        the city otherwise. Never both - `locality` is the
                        city the address would be in.

                        The city comes from the dictionary rather than from
                        `contactConfig`, because a place name is copy: the
                        footer already prints "دبي، الإمارات العربية المتحدة"
                        on this same page, and the two must agree. A street
                        address, when one is supplied, is a postal address and
                        is printed exactly as the client gives it.
                      */}
                      {contactConfig.address || (contactConfig.locality && t.footer.locality)}
                    </address>
                  </dd>
                </div>

                {contactConfig.email && (
                  <div>
                    <dt className="text-label uppercase text-(--color-foreground-subtle)">
                      {t.footer.email}
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
                      {t.footer.telephone}
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

                {/*
                  AWAITING CLIENT INFORMATION.

                  No approved Gulf Connect email address or telephone number
                  has been supplied. Both are held as empty TODOs on
                  `contactConfig` in `data/site.ts`; setting either one there
                  makes its row appear here and in the footer, with no other
                  change. Do not populate them with invented values.
                */}
                {!hasDirectDetails && (
                  <div>
                    <dt className="text-label uppercase text-(--color-foreground-subtle)">
                      {contactContent.pendingDetails.label}
                    </dt>
                    <dd className="mt-2 max-w-[46ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-subtle)">
                      {contactContent.pendingDetails.body}
                    </dd>
                  </div>
                )}
              </dl>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-12 border-t border-(--color-border) pt-8">
                <h3 className="text-label uppercase text-(--color-foreground-subtle)">
                  {contactContent.areasHeading}
                </h3>
                {/*
                  Still the same five labels, still tags. What changes is that
                  a tag now has a ground of its own instead of being an outline
                  on the page - over a photograph an outline-only chip reads as
                  a gap in the image rather than as an object on it.
                */}
                <ul className="mt-5 flex flex-wrap gap-2">
                  {areaOfInterestOptions.map((option) => (
                    <li
                      key={option.value}
                      className="border border-(--color-border) bg-white/[0.04] px-3.5 py-2 text-sm text-(--color-foreground-muted) backdrop-blur-[2px]"
                    >
                      {/*
                        The tag reads the same label the select in the form
                        beside it reads, keyed by the value the enquiry
                        submits. One source for both.
                      */}
                      {optionLabel(t.forms.options.areaOfInterest, option.value, option.label)}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-9 text-label uppercase text-(--color-foreground-subtle)">
                  {t.footer.markets}
                </h3>
                {/*
                  The markets were a row of words with gaps between them, which
                  read as a wrapped sentence rather than as a list. The accent
                  mark is the one the outreach section already uses for its
                  category list, so the two agree.
                */}
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
                  {[...gulfMarkets.map((m) => m.label), t.footer.international].map((label) => (
                    <li
                      key={label}
                      className="flex items-center gap-2.5 text-sm text-(--color-foreground-muted)"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 shrink-0 bg-(--color-accent)"
                      />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

          </div>

          {/*
            The enquiry panel.

            The same glass the globe's information panel and the hero's market
            card are built from - a steep dark gradient, a hairline in white at
            12%, a long soft shadow and a modest blur - so this reads as another
            object in the same system rather than as a form component that
            wandered in. The bronze rule along its top edge is that system's
            way of marking the leading edge of a floating surface.

            Not a white card on a dark band: a light rectangle here would be
            the brightest thing on the page by a wide margin, and the eye would
            go to the box instead of to the fields inside it.
          */}
          <Reveal delay={120}>
            <div
              className={[
                "relative isolate border border-white/12 p-6 backdrop-blur-[14px] sm:p-9 lg:p-10",
                "bg-[linear-gradient(152deg,rgba(21,32,44,0.9)_0%,rgba(12,19,28,0.82)_52%,rgba(9,15,22,0.9)_100%)]",
                "rtl:bg-[linear-gradient(208deg,rgba(21,32,44,0.9)_0%,rgba(12,19,28,0.82)_52%,rgba(9,15,22,0.9)_100%)]",
                "shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(184,148,95,0.7)_45%,transparent)]"
              />

              {/*
                Two routed forms behind a toggle - company and investor.

                Wrapped in Suspense because ContactRouter reads the query
                string to honour the ?enquiry= deep link from the service
                pages, and useSearchParams suspends during prerender. Without
                the boundary the whole route would opt out of static
                generation.
              */}
              <Suspense fallback={null}>
                <ContactRouter />
              </Suspense>
            </div>
          </Reveal>
        </div>
        </Container>
      </section>
    </>
  );
}
