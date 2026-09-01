import { cn } from "@/lib/utils";

export interface DefinitionItem {
  term: string;
  description: string;
}

export interface DefinitionListProps {
  items: readonly DefinitionItem[];
  /** Adds a two-digit index before each term. */
  columns?: 1 | 2;
  className?: string;
}

/**
 * Term/description pairs rendered as a real <dl>.
 * Used for investor categories, methodology steps and capability groupings.
 *
 * There WAS a `numbered` prop that prefixed each term with "01", "02" and so
 * on, generated from the map index. It is gone with the 01/02/03 format the
 * client has taken off the site, along with the two call sites that passed it.
 * Do not reintroduce it.
 */
export function DefinitionList({
  items,
  columns = 2,
  className,
}: DefinitionListProps) {
  return (
    <dl
      className={cn(
        "grid gap-x-10 gap-y-8",
        columns === 2 && "sm:grid-cols-2",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.term} className="border-t border-(--color-border) pt-5">
          <dt className="text-[1.0625rem] font-medium">{item.term}</dt>
          <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
