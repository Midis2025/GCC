import Link from "next/link";
import { notFound } from "next/navigation";

import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { getFormat, getInsightItem, insightItems } from "@/data/insight";
import { clientDisclosureTemplate, footerDisclosure } from "@/data/site";
import { formatDate } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return insightItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insight/[slug]">) {
  const { slug } = await params;
  const item = getInsightItem(slug);
  if (!item) return createMetadata({ title: "Insight", path: "/insight" });

  return createMetadata({
    title: item.seoTitle ?? item.title,
    path: `/insight/${item.slug}`,
    description: item.seoDescription ?? item.excerpt,
  });
}

/**
 * An Insight item.
 *
 * ---------------------------------------------------------------------------
 * The two disclosures, and why they are in different places
 * ---------------------------------------------------------------------------
 * 1. CLIENT DISCLOSURE - at the TOP, above the body, before a reader has
 *    formed a view. It renders whenever `clientDisclosure` is set on the item,
 *    and the wording comes from one template in `data/site.ts` rather than
 *    being written by hand per item. A disclosure a reader meets after the
 *    argument is not a disclosure, and one an author has to remember to type
 *    is one that will eventually be forgotten.
 *
 * 2. STANDING DISCLOSURE - at the FOOT of every item, in addition to the site
 *    footer. Required by the brief on every content item, not merely on every
 *    page.
 *
 * Gated items are not implemented as a paywall here. `gated` is carried on the
 * record and Sector Notes are marked gated, but the gate itself needs the CRM
 * to know who is registered - so the field exists, the rendering does not, and
 * nothing pretends to enforce access it cannot check.
 */
export default async function InsightItemPage({ params }: PageProps<"/insight/[slug]">) {
  const { slug } = await params;
  const item = getInsightItem(slug);
  if (!item) notFound();

  const format = getFormat(item.format);

  return (
    <>
      <article>
        {/* Header. Typographic - no photography on an item that may have none. */}
        <header className="tokens-dark relative isolate overflow-hidden bg-(--midnight) pb-[clamp(2.5rem,5vw,4rem)] pt-[calc(var(--header-h)+clamp(3.5rem,8vw,6rem))]">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[radial-gradient(85%_80%_at_20%_10%,#1a2836_0%,#0f1924_54%,#0c141d_100%)]"
          />
          <div
            aria-hidden="true"
            className="rule-field absolute inset-y-0 right-0 -z-10 w-[38%] opacity-40 [--rule-gap:6rem]"
          />

          <Container className="relative z-10">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-label uppercase text-(--color-accent)">
              {format && (
                <Link href={`/insight#${format.id}`} className="link-underline">
                  {format.name}
                </Link>
              )}
              <span aria-hidden="true" className="h-px w-8 bg-(--color-accent)/50" />
              <time dateTime={item.date} className="text-(--color-foreground-subtle)">
                {formatDate(item.date)}
              </time>
            </p>

            <Heading level={1} size="display" className="mt-6 max-w-[20ch]">
              {item.title}
            </Heading>

            <p className="mt-6 text-sm text-(--color-foreground-subtle)">By {item.author}</p>
          </Container>
        </header>

        <Container width="narrow" className="py-[var(--space-section-lg)]">
          {/*
            CLIENT DISCLOSURE. Top of the item, before the body.
            Do not move this below the content.
          */}
          {/*
            The condition is `clientDisclosure` ALONE.

            It previously also required `clientName`, which meant an item
            marked as client-involved but published without a name rendered no
            disclosure at all - the one failure mode this block exists to
            prevent, and a silent one. The name is used when it is there and
            "This company" stands in when it is not, so the flag on the item is
            the only thing that decides whether a reader sees the line.
          */}
          {item.clientDisclosure && (
            <div className="mb-12 border-l-2 border-(--color-accent) bg-(--color-surface-muted) px-6 py-5">
              <p className="text-label uppercase text-(--color-accent)">Disclosure</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
                {clientDisclosureTemplate.replace("{company}", item.clientName ?? "This company")}
              </p>
            </div>
          )}

          <Reveal>
            <p className="text-lead text-(--color-foreground-muted)">{item.excerpt}</p>
          </Reveal>

          <div className="mt-10 flex flex-col gap-6">
            {item.content.map((paragraph) => (
              <p key={paragraph} className="text-[1.0625rem] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/*
            STANDING DISCLOSURE. Required at the foot of every content item, in
            addition to the site footer. Verbatim from `data/site.ts`.
          */}
          <div className="mt-16 border-t border-(--color-border) pt-8">
            <p className="text-sm leading-relaxed text-(--color-foreground-subtle)">
              {footerDisclosure}
            </p>
          </div>
        </Container>
      </article>

      <CTASection />
    </>
  );
}
