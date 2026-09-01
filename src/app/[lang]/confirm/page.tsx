import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { pick } from "@/content";
import { confirmContentAr } from "@/content/ar/utility-pages";
import { backdrops } from "@/data/imagery";
import { confirmContent as confirmContentEn } from "@/data/utility-pages";
import { confirmOptIn } from "@/lib/crm";
import { verifyToken } from "@/lib/optin";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Confirm your registration",
  path: "/confirm",
  description: "Confirm the email address used to register for Gulf Connect briefings.",
  noIndex: true,
});

/**
 * Double opt-in confirmation.
 *
 * Four states, and the wording of each is now read from a content module so
 * that a registrant who registered in Arabic is confirmed in Arabic. The
 * BRANCHING is unchanged: the same token check, the same CRM call, the same
 * four outcomes, in the same order.
 *
 * CONTENT INTEGRITY: the third branch says the link was valid and the
 * registration was NOT recorded. It is not a thank-you and must never become
 * one - see the header of `data/utility-pages.ts`.
 */
export default async function ConfirmPage({ searchParams }: PageProps<"/[lang]/confirm">) {
  const params = await searchParams;
  const raw = params.token;
  const token = Array.isArray(raw) ? raw[0] : raw;

  const c = await pick({ en: confirmContentEn, ar: confirmContentAr });
  const verified = verifyToken("confirm", token);

  let title: string;
  let lead: string;
  let detail: string | null = null;

  if (!verified.ok) {
    title = c.failed.title;

    if (verified.reason === "expired") {
      lead = c.failed.expired;
    } else if (verified.reason === "unconfigured") {
      lead = c.failed.unconfigured;
      detail = c.failed.unconfiguredNote;
    } else {
      lead = c.failed.invalid;
    }
  } else {
    const result = await confirmOptIn(verified.email).catch((error: unknown) => ({
      updated: false,
      reason: error instanceof Error ? error.message : "Confirmation failed.",
    }));

    if (result.updated) {
      title = c.confirmed.title;
      lead = c.confirmed.lead;
    } else {
      title = c.notRecorded.title;
      lead = c.notRecorded.lead;
      /*
        The reason comes from the CRM and is a technical message in whatever
        language that system produces. It is substituted into a localised
        frame rather than concatenated onto an English one, so the sentence
        around it reads correctly in both editions.
      */
      detail = c.notRecorded.note.replace(
        "{reason}",
        result.reason ?? c.notRecorded.fallbackReason,
      );
    }
  }

  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.utility}
        compact
        eyebrow={c.eyebrow}
        title={title}
        lead={lead}
        actions={
          <>
            <Button href="/for-investors" size="lg" withArrow>
              {c.actionInvestors}
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              {c.actionContact}
            </Button>
          </>
        }
      />

      {detail && (
        <Section spacing="md" aria-label={c.statusLabel}>
          <Reveal>
            <p className="max-w-[62ch] border-s-2 border-(--color-accent)/50 ps-5 text-[0.9375rem] leading-relaxed text-(--color-foreground-subtle)">
              {detail}
            </p>
          </Reveal>
        </Section>
      )}
    </>
  );
}
