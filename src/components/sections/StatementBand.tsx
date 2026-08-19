import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

export interface StatementBandProps {
  id: string;
  label?: string;
  heading: string;
  /** Rendered as two balanced columns beneath the statement on wide screens. */
  paragraphs?: readonly string[];
  tone?: "dark" | "muted" | "canvas";
  className?: string;
}

/**
 * Centred statement band.
 *
 * A deliberate interruption: one oversized line, centred, with its supporting
 * copy set as two newspaper columns underneath. It exists to break the
 * left-aligned two-column rhythm the interior pages otherwise fall into, so it
 * should appear at most once per page.
 *
 * The rules either side of the label are drawn, not bordered, so they stay
 * centred on the label regardless of its length.
 */
export function StatementBand({
  id,
  label,
  heading,
  paragraphs,
  tone = "dark",
  className,
}: StatementBandProps) {
  return (
    <Section
      spacing="lg"
      tone={tone}
      aria-labelledby={id}
      className={cn("relative isolate overflow-hidden", className)}
    >
      {tone === "dark" && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(75%_90%_at_50%_0%,#1a2836_0%,#0f1924_55%,#0c141d_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,148,95,0.4),transparent)]"
          />
        </>
      )}

      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          {label && (
            <SectionLabel withRule={false} className="justify-center">
              <span className="flex items-center gap-3.5">
                <span aria-hidden="true" className="h-px w-8 bg-(--color-accent)" />
                {label}
                <span aria-hidden="true" className="h-px w-8 bg-(--color-accent)" />
              </span>
            </SectionLabel>
          )}

          <Heading id={id} level={2} size="display" className={cn(label && "mt-8", "mx-auto max-w-[16ch]")}>
            {heading}
          </Heading>
        </Reveal>
      </div>

      {paragraphs && paragraphs.length > 0 && (
        <Reveal delay={140} className="mx-auto mt-12 max-w-4xl">
          <div className="grid gap-x-14 gap-y-6 text-left sm:grid-cols-2">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      )}
    </Section>
  );
}
