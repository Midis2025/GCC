import { cn } from "@/lib/utils";

export interface CheckListProps {
  items: readonly string[];
  columns?: 1 | 2;
  className?: string;
}

/** Capability lists: a hairline rule and accent tick per row, no icon library. */
export function CheckList({ items, columns = 2, className }: CheckListProps) {
  return (
    <ul className={cn("grid gap-x-10 gap-y-3.5", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 border-b border-(--color-border) pb-3.5 text-[0.9375rem]"
        >
          <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-(--color-accent)" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
