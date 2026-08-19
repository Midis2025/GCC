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
 * Statement band.
 *
 * A deliberate interruption: one oversized line with its supporting copy set
 * as two newspaper columns beside it. It exists to break the two-column
 * heading/prose rhythm the interior pages otherwise fall into, so it should
 * appear at most once per page.
 *
 * Left aligned, like every other section heading on the site. It was
 * previously centred, which made it the one block that did not share the
 * page's left edge - the statement stood out, but at the cost of the alignment
 * spine running down every other section. Contrast now comes from the
 * statement's size and the surface behind it instead.
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

      <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        <Reveal>
          {label && <SectionLabel>{label}</SectionLabel>}

          <Heading id={id} level={2} size="display" className={cn(label && "mt-5", "max-w-[15ch]")}>
            {heading}
          </Heading>
        </Reveal>

        {paragraphs && paragraphs.length > 0 && (
          <Reveal delay={140}>
            <div className="flex flex-col gap-5">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[56ch] text-[1.0625rem] leading-relaxed text-(--color-foreground-muted)"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
