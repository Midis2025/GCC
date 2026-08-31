import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { backdrops } from "@/data/imagery";
import { confirmOptIn } from "@/lib/crm";
import { verifyToken } from "@/lib/optin";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Confirm your registration",
  path: "/confirm",
  description: "Confirm the email address used to register for Gulf Connect briefings.",
  /*
   * Never indexed, even after launch. This is the second half of a private
   * journey and the only way to reach it is from a link in your own inbox.
   */
  noIndex: true,
});

/**
 * ============================================================================
 * CONFIRM - the second half of double opt-in
 * ============================================================================
 * A registration does not put anyone on the list. This page does.
 *
 * The flow, in full:
 *
 *   1. Investor submits the registration form
 *   2. Record created with `optInStatus: "pending"`
 *   3. Confirmation email sent, carrying a signed link to this page
 *   4. Investor opens the link
 *   5. `confirmOptIn` moves the record to confirmed
 *
 * Step 5 is the only step that makes somebody a member, and every surface in
 * between says so: the form's success state says the registration is not
 * complete until the email is confirmed, and this page does not claim the
 * subscription is active unless the CRM actually recorded it.
 *
 * ---------------------------------------------------------------------------
 * Why this page tells the truth about being unconfigured
 * ---------------------------------------------------------------------------
 * No CRM and no mail provider are connected yet, so in practice no
 * confirmation email is sent and nobody arrives here. If somebody does - a
 * link from a test send, a deployment where mail is configured before the CRM
 * is - they are told plainly that the confirmation could not be recorded,
 * because a page that says "you are subscribed" over a list that has no record
 * of them is exactly the failure double opt-in exists to prevent.
 *
 * The address is never rendered back to the page. It is in the signed token,
 * it goes to the CRM, and it does not appear in the markup.
 */
export default async function ConfirmPage({ searchParams }: PageProps<"/confirm">) {
  const params = await searchParams;
  const raw = params.token;
  const token = Array.isArray(raw) ? raw[0] : raw;

  const verified = verifyToken("confirm", token);

  /*
   * Three outcomes, and the copy differs for each because the thing the reader
   * should do next differs for each.
   */
  let title: string;
  let lead: string;
  let detail: string | null = null;

  if (!verified.ok) {
    title = "This link could not be confirmed.";

    if (verified.reason === "expired") {
      lead =
        "Confirmation links are valid for fourteen days. This one has passed that, so please register again and confirm from the new email.";
    } else if (verified.reason === "unconfigured") {
      lead =
        "The confirmation system is not yet connected on this deployment, so this link cannot be checked.";
      detail =
        "Note for review: set OPTIN_SECRET in the deployment environment. Until it is set, no confirmation link can be signed or verified.";
    } else {
      lead =
        "The link may have been altered or truncated in your email client. Please try opening it again from the original message, or register once more.";
    }
  } else {
    const result = await confirmOptIn(verified.email).catch((error: unknown) => ({
      updated: false,
      reason: error instanceof Error ? error.message : "Confirmation failed.",
    }));

    if (result.updated) {
      title = "Your registration is confirmed.";
      lead =
        "Thank you. You will receive invitations to briefings for which your sector interests are relevant, The Gulf Brief, quarterly Sector Notes and access to the interview library. You can unsubscribe from any message we send.";
    } else {
      title = "We could not complete your confirmation.";
      lead =
        "Your link is valid, but the registration system did not record the confirmation. Please contact us so it can be completed by hand rather than assuming you are on the list.";
      detail = `Note for review: ${result.reason ?? "the CRM did not record the confirmation."}`;
    }
  }

  return (
    <>
      <PageHero
        variant="feature"
        photo={backdrops.utility}
        compact
        eyebrow="Registration"
        title={title}
        lead={lead}
        actions={
          <>
            <Button href="/for-investors" size="lg" withArrow>
              For Investors
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Contact Gulf Connect
            </Button>
          </>
        }
      />

      {detail && (
        <Section spacing="md" aria-label="Status">
          <Reveal>
            <p className="max-w-[62ch] border-l-2 border-(--color-accent)/50 pl-5 text-[0.9375rem] leading-relaxed text-(--color-foreground-subtle)">
              {detail}
            </p>
          </Reveal>
        </Section>
      )}
    </>
  );
}
