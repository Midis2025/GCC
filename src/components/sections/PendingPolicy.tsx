import { PageHero } from "@/components/sections/PageHero";
import { backdrops } from "@/data/imagery";
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
      <PageHero
        variant="feature"
        photo={backdrops.utility}
        compact
        eyebrow={eyebrow}
        title={title}
      />

      {/*
        The measure belongs to the text block, not to the section.
        `width="narrow"` centred the whole column, so the body sat hundreds of
        pixels inboard of the H1 in the hero directly above it - two different
        left edges on one short page. The section now uses the page gutter like
        every other section, and the reading width is carried by the block.
      */}
      <Section spacing="lg">
        <div className="max-w-[var(--page-max-narrow)] border-s-2 border-(--color-accent) ps-6">
          <h2 className="text-label uppercase text-(--color-foreground-subtle)">
            Document pending
          </h2>
          <p className="mt-4 max-w-[62ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)">
            {scope}
          </p>
          <p className="mt-5 max-w-[62ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-subtle)">
            This wording must be provided or approved by Gulf Connect and its advisers. It has deliberately
            not been drafted here. This page is excluded from search indexing until the approved
            text is in place.
          </p>
        </div>
      </Section>
    </>
  );
}
