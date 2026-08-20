import { Container } from "@/components/ui/Container";
import { heroStats } from "@/data/homepage";

/**
 * Hero standing bar.
 *
 * An inset glass panel along the foot of the hero rather than a full-bleed
 * strip: it sits inside the container margins with a hairline all the way
 * round, which is what makes it read as a plate laid over the globe instead of
 * a band cutting the section in two.
 *
 * Four figures, and two of them carry no number at all - the things they name
 * are not quantities, and inventing one for them is the failure mode that
 * `heroStats` documents.
 *
 * The marks are drawn here rather than pulled from an icon set. Four outlined
 * glyphs at one weight cost less than a dependency, and an icon library would
 * put someone else's house style in the middle of this one.
 */

/** 32x32 outlined marks, one per stat. */
const marks: Record<string, React.ReactNode> = {
  // Globe: meridians and a parallel.
  markets: (
    <>
      <circle cx="16" cy="16" r="11" />
      <ellipse cx="16" cy="16" rx="4.6" ry="11" />
      <path d="M5.4 12.4h21.2M5.4 19.6h21.2" />
    </>
  ),
  // Network of people: a group, abstracted to heads and shoulders.
  network: (
    <>
      <circle cx="16" cy="12" r="3.6" />
      <path d="M9.6 24a6.4 6.4 0 0 1 12.8 0" />
      <circle cx="7" cy="14" r="2.6" />
      <path d="M2.8 22.4a4.4 4.4 0 0 1 4.2-4.6" />
      <circle cx="25" cy="14" r="2.6" />
      <path d="M29.2 22.4a4.4 4.4 0 0 0-4.2-4.6" />
    </>
  ),
  // Cross-border: two towers with a span between them.
  engagement: (
    <>
      <path d="M5 27V9.5l8-3.5V27" />
      <path d="M13 13.5h6.5V27" />
      <path d="M19.5 27V16h7.5v11" />
      <path d="M3 27h26" />
      <path d="M8.4 12.6v2M8.4 18v2M23 20v2" />
    </>
  ),
  // Strategic: a mark converging on a single point.
  communication: (
    <>
      <circle cx="16" cy="16" r="11" />
      <circle cx="16" cy="16" r="5.5" />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
      <path d="M16 2.5v4M16 25.5v4M2.5 16h4M25.5 16h4" />
    </>
  ),
};

export function HeroStats() {
  return (
    <Container className="relative z-10 pb-[clamp(1.25rem,2.5vw,2rem)]">
      <dl
        className={[
          "grid grid-cols-1 border border-white/12 backdrop-blur-[14px] xs:grid-cols-2 lg:grid-cols-4",
          "bg-[linear-gradient(to_bottom,rgba(13,21,31,0.6),rgba(7,12,19,0.72))]",
        ].join(" ")}
      >
        {heroStats.map((stat, index) => (
          <div
            key={stat.label}
            className={[
              "flex items-start gap-4 px-5 py-5 sm:gap-5 sm:px-6 sm:py-6",
              // Hairlines between cells only - never on the panel's own edges,
              // which the border already draws.
              index > 0 ? "border-t border-white/10 xs:border-t-0" : "",
              index % 2 === 1 ? "xs:border-l xs:border-white/10" : "",
              index >= 2 ? "xs:border-t xs:border-white/10 lg:border-t-0" : "",
              "lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-white/10",
            ].join(" ")}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 32 32"
              className="size-8 shrink-0 text-(--color-accent) sm:size-9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {marks[stat.mark]}
            </svg>

            <div className="min-w-0">
              {/* Figure before label, which is both the visual order and the
                  order a definition list wants to be read in. */}
              <dt className="font-display text-[1.25rem] leading-none tracking-[-0.02em] text-(--color-foreground) sm:text-[1.375rem]">
                {stat.figure}
              </dt>
              <dd className="mt-2 text-[0.9375rem] leading-tight text-(--color-foreground)">
                {stat.label}
              </dd>
              <dd className="mt-2 text-[0.75rem] leading-snug text-(--color-foreground-subtle)">
                {stat.note}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </Container>
  );
}
