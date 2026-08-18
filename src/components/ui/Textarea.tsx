"use client";

import type { ComponentPropsWithRef } from "react";

import { useFormFieldContext } from "@/components/ui/FormField";
import { controlClasses } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export type TextareaProps = ComponentPropsWithRef<"textarea">;

/** Multi-line input. Must be rendered inside <FormField>. */
export function Textarea({ className, rows = 4, ...props }: TextareaProps) {
  const { id, descriptionId, errorId, hasError, required } = useFormFieldContext();

  return (
    <textarea
      id={id}
      rows={rows}
      required={required}
      aria-invalid={hasError || undefined}
      aria-describedby={cn(descriptionId, errorId) || undefined}
      className={cn(controlClasses, "resize-y", className)}
      {...props}
    />
  );
}
