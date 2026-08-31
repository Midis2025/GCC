import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { backdrops } from "@/data/imagery";
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
 * ============================================================================
 * UNSUBSCRIBE
 * ============================================================================
 * One click, and it is done on arrival.
 *
 * There is deliberately no confirm step, no "are you sure", no preference
 * centre asking whether they would rather hear from us less often, and no
 * login. Opening the link IS the unsubscribe. Anything placed between the
 * click and the outcome is a dark pattern whatever it is called, and the
 * signed token means the click can only ever have come from the recipient's
 * own message.
 *
 * Suppression is PERMANENT - see `SubscriptionState` in `lib/crm.ts`. The
 * address is not deleted, because a deleted address cannot be checked against
 * the next import.
 *
 * `List-Unsubscribe-Post` clients never reach this page. They POST the same
 * token to `/api/unsubscribe` and the recipient sees their mail client's own
 * confirmation instead. Both paths call `suppressContact`, so there is one
 * implementation and not two.
 *
 * As with confirmation: while the CRM is unconfigured this page says the
 * request was not recorded and gives a way to make it stick. Telling somebody
 * they have been unsubscribed when nothing recorded it is the one failure that
 * would matter more than the send itself.
 */
export default async function UnsubscribePage({ searchParams }: PageProps<"/[lang]/unsubscribe">) {
  const params = await searchParams;
  const raw = params.token;
  const token = Array.isArray(raw) ? raw[0] : raw;

  const verified = verifyToken("unsubscribe", token);

  let title: string;
  let lead: string;
  let detail: string | null = null;

  if (!verified.ok) {
    title = "We could not action this unsubscribe link.";
    lead =
      "The link may have been altered or truncated in your email client. Please contact us and we will remove you from the list by hand — you do not need a working link to be unsubscribed.";

    if (verified.reason === "unconfigured") {
      detail =
        "Note for review: set OPTIN_SECRET in the deployment environment. Until it is set, no unsubscribe link can be signed or verified.";
    }
  } else {
    const result = await suppressContact(verified.email).catch((error: unknown) => ({
      updated: false,
      reason: error instanceof Error ? error.message : "Unsubscribe failed.",
    }));

    if (result.updated) {
      title = "You have been unsubscribed.";
      lead =
        "Your address has been suppressed permanently. You will receive no further briefing invitations or written content from Gulf Connect.";
    } else {
      title = "We could not record your unsubscribe.";
      lead =
        "Please contact us so it can be actioned by hand. We would rather you heard that plainly than be told you were removed from a list that still holds your address.";
      detail = `Note for review: ${result.reason ?? "the CRM did not record the suppression."}`;
    }
  }

  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.utility}
        compact
        eyebrow="Email"
        title={title}
        lead={lead}
        actions={
          <>
            <Button href="/contact" size="lg" withArrow>
              Contact Gulf Connect
            </Button>
            <Button href="/privacy" size="lg" variant="outline">
              Privacy Policy
            </Button>
          </>
        }
      />

      {detail && (
        <Section spacing="md" aria-label="Status">
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
