import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { pick } from "@/content";
import { unsubscribeContentAr } from "@/content/ar/utility-pages";
import { backdrops } from "@/data/imagery";
import { unsubscribeContent as unsubscribeContentEn } from "@/data/utility-pages";
import { suppressContact } from "@/lib/crm";
import { verifyToken } from "@/lib/optin";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Unsubscribe",
  path: "/unsubscribe",
  description: "Unsubscribe from Gulf Connect briefing invitations and written content.",
  noIndex: true,
});

/**
 * Unsubscribe.
 *
 * Three states, now read from a content module so that a reader who joined in
 * Arabic leaves in Arabic. The BRANCHING is unchanged.
 *
 * CONTENT INTEGRITY: the failure branch says the suppression was NOT recorded
 * and asks the reader to make contact. Telling somebody they have been removed
 * from a list that still holds their address is the worst thing this route can
 * do, and the copy is written to prevent it in both languages.
 */
export default async function UnsubscribePage({ searchParams }: PageProps<"/[lang]/unsubscribe">) {
  const params = await searchParams;
  const raw = params.token;
  const token = Array.isArray(raw) ? raw[0] : raw;

  const c = await pick({ en: unsubscribeContentEn, ar: unsubscribeContentAr });
  const verified = verifyToken("unsubscribe", token);

  let title: string;
  let lead: string;
  let detail: string | null = null;

  if (!verified.ok) {
    title = c.failed.title;
    lead = c.failed.lead;

    if (verified.reason === "unconfigured") {
      detail = c.failed.unconfiguredNote;
    }
  } else {
    const result = await suppressContact(verified.email).catch((error: unknown) => ({
      updated: false,
      reason: error instanceof Error ? error.message : "Unsubscribe failed.",
    }));

    if (result.updated) {
      title = c.done.title;
      lead = c.done.lead;
    } else {
      title = c.notRecorded.title;
      lead = c.notRecorded.lead;
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
            <Button href="/contact" size="lg" withArrow>
              {c.actionContact}
            </Button>
            <Button href="/privacy" size="lg" variant="outline">
              {c.actionPrivacy}
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
