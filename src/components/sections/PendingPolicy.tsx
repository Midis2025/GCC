import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";

export interface PendingPolicyProps {
  eyebrow: string;
  title: string;
  /** What this document will cover, described without drafting it. */
  scope: string;
}

/**
 * Placeholder for a legal document.
 *
 * Privacy and terms wording must be drafted or approved by the client and
 * their advisers - it is never generated here. These routes exist so the
 * footer links resolve instead of 404ing, and they say plainly that the
 * document is pending. Both are noindex until real wording is supplied.
 */
export function PendingPolicy({ eyebrow, title, scope }: PendingPolicyProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} />

      <Section spacing="lg" width="narrow">
        <div className="border-l-2 border-(--color-accent) pl-6">
          <h2 className="text-label font-medium uppercase text-(--color-foreground-subtle)">
            Document pending
          </h2>
          <p className="mt-4 max-w-[62ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
            {scope}
          </p>
          <p className="mt-5 max-w-[62ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-subtle)">
            This wording must be provided or approved by GCC and its advisers. It has deliberately
            not been drafted here. This page is excluded from search indexing until the approved
            text is in place.
          </p>
        </div>
      </Section>
    </>
  );
}
