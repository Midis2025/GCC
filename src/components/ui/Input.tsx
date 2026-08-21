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
 * Every value here is a semantic token or mixed from one, which is what lets
 * the same controls sit on the light page and on the dark enquiry panel with
 * no dark-specific variant: `.tokens-dark` re-points the tokens and the fields
 * follow.
 *
 * `text-base` (16px) is load-bearing on iOS: anything smaller makes Safari
 * zoom the viewport when the field receives focus.
 */
export const controlClasses =
  /*
   * Sizing. 52px tall on a phone and 50px above `sm`, against the old 46px:
   * comfortably past the 44px touch minimum, and enough vertical air that a
   * field reads as a considered surface rather than as a box drawn round some
   * text. The floor is on `min-h` rather than padding so a select, an input
   * and a one-line textarea all agree.
   */
  "block w-full min-h-[3.25rem] rounded-none px-4 py-3.5 sm:min-h-[3.125rem] " +
  /*
   * The field is a shade removed from the surface behind it rather than the
   * same colour with a line round it - which is what stops a row of them
   * reading as wireframe. `color-mix` against the foreground keeps that true
   * on both the light page and the dark enquiry panel without a variant.
   */
  "bg-[color-mix(in_srgb,var(--color-foreground)_4%,transparent)] " +
  "border border-(--color-border) " +
  "text-base text-(--color-foreground) placeholder:text-(--color-foreground-subtle) " +
  "transition-[border-color,box-shadow,background-color] duration-300 ease-out " +
  "hover:border-(--color-foreground)/35 " +
  /*
   * Focus is communicated three ways at once: the accent border, a soft ring
   * built from the accent, and the browser's own focus-visible outline. That
   * redundancy is deliberate, since border colour alone is a colour-only
   * signal. Nothing here affects layout.
   */
  "focus:border-(--color-accent) focus:bg-[color-mix(in_srgb,var(--color-foreground)_6%,transparent)] " +
  "focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_16%,transparent)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring) " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "aria-invalid:border-(--color-danger) " +
  "aria-invalid:focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-danger)_16%,transparent)]";

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
