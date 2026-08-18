"use client";

import type { ComponentPropsWithRef } from "react";

import { useFormFieldContext } from "@/components/ui/FormField";
import { cn } from "@/lib/utils";

export const controlClasses =
  "w-full rounded-md border border-(--color-border) bg-(--color-surface) px-3 py-2 " +
  "text-base text-(--color-foreground) placeholder:text-(--color-foreground-muted) " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring) " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "aria-invalid:border-(--color-danger)";

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
