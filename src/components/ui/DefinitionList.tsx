import { cn } from "@/lib/utils";

export interface DefinitionItem {
  term: string;
  description: string;
}

export interface DefinitionListProps {
  items: readonly DefinitionItem[];
  /** Adds a two-digit index before each term. */
  numbered?: boolean;
  columns?: 1 | 2;
  className?: string;
}

/**
 * Term/description pairs rendered as a real <dl>.
 * Used for investor categories, methodology steps and capability groupings.
 */
export function DefinitionList({
  items,
  numbered = false,
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
      {items.map((item, index) => (
        <div key={item.term} className="border-t border-(--color-border) pt-5">
          <dt className="flex items-baseline gap-3 text-[1.0625rem] font-medium">
            {numbered && (
              <span className="font-serif text-sm text-(--color-accent)">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            {item.term}
          </dt>
          <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
