"use client";

import { useId, type ComponentPropsWithRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<ComponentPropsWithRef<"input">, "type"> {
  /** The consent wording. A node rather than a string so it can carry links. */
  label: ReactNode;
  /** Helper text under the label, linked via aria-describedby. */
  description?: string;
  error?: string;
  className?: string;
}

/**
 * Consent checkbox.
 *
 * Its own control with its own wording, never bundled into a submit action and
 * never pre-ticked. That is a legal requirement rather than a UX preference -
 * consent gathered by implication is consent that cannot be evidenced, and the
 * whole value of the investor list depends on being able to evidence it.
 *
 * There is deliberately no `defaultChecked` prop. Adding one would make a
 * pre-ticked box a one-word change, and this is the single control on the site
 * where that must not be easy.
 *
 * Drawn rather than native: the box is a styled span and the real input is
 * visually hidden but fully present, so it keeps native focus, keyboard and
 * form semantics while matching the site's square, hairline treatment. The
 * touch target is the whole label row.
 */
export function Checkbox({ label, description, error, className, id, ...props }: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={inputId} className="group flex cursor-pointer items-start gap-3.5 py-1">
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            id={inputId}
            type="checkbox"
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
            {...props}
          />

          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none block h-5 w-5 border transition-colors duration-300",
              error ? "border-(--color-danger)" : "border-(--color-border)",
              "peer-hover:border-(--color-accent)/70",
              "peer-checked:border-(--color-accent) peer-checked:bg-(--color-accent)",
              "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--color-ring)",
            )}
          />

          {/* The tick. Drawn, so it inherits the accent foreground token. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="pointer-events-none absolute h-3 w-3 scale-90 text-(--color-accent-foreground) opacity-0 transition-[opacity,transform] duration-300 peer-checked:scale-100 peer-checked:opacity-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 8.5l3.5 3.5 7.5-8" />
          </svg>
        </span>

        <span className="text-[0.9375rem] leading-relaxed text-(--color-foreground-muted) transition-colors duration-300 group-hover:text-(--color-foreground)">
          {label}
        </span>
      </label>

      {description && (
        <p id={descriptionId} className="pl-[2.125rem] text-sm text-(--color-foreground-subtle)">
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="pl-[2.125rem] text-sm text-(--color-danger)"
        >
          {error}
        </p>
      )}
    </div>
  );
}
