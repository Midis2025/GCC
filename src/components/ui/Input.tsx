"use client";

import type { ComponentPropsWithRef } from "react";

import { useFormFieldContext } from "@/components/ui/FormField";
import { cn } from "@/lib/utils";

/**
 * Shared control styling for Input, Textarea and Select.
 *
 * Square rather than rounded, to match the buttons and the rest of the design
 * system - the previous `rounded-md` was the one soft corner on the site.
 *
 * Focus is communicated three ways at once: the accent border, a soft ring
 * built from the accent, and the browser's own focus-visible outline. That
 * redundancy is deliberate, since border colour alone is a colour-only signal.
 * The transition is on `border-color` and `box-shadow` only, so focusing a
 * field never triggers layout.
 *
 * `text-base` (16px) is load-bearing on iOS: anything smaller makes Safari
 * zoom the viewport when the field receives focus.
 */
export const controlClasses =
  "w-full rounded-none border border-(--color-border) bg-(--color-canvas) px-4 py-3 " +
  "text-base text-(--color-foreground) placeholder:text-(--color-foreground-subtle) " +
  "transition-[border-color,box-shadow] duration-300 ease-out " +
  "hover:border-(--color-foreground)/35 " +
  "focus:border-(--color-accent) focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_14%,transparent)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring) " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "aria-invalid:border-(--color-danger) " +
  "aria-invalid:focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-danger)_14%,transparent)]";

export type InputProps = ComponentPropsWithRef<"input">;

/** Text input. Must be rendered inside <FormField>, which supplies the a11y wiring. */
export function Input({ className, ...props }: InputProps) {
  const { id, descriptionId, errorId, hasError, required } = useFormFieldContext();

  return (
    <input
      id={id}
      required={required}
      aria-invalid={hasError || undefined}
      aria-describedby={cn(descriptionId, errorId) || undefined}
      className={cn(controlClasses, className)}
      {...props}
    />
  );
}
