"use client";

import type { ComponentPropsWithRef } from "react";

import { useFormFieldContext } from "@/components/ui/FormField";
import { controlClasses } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import type { SelectOption } from "@/types";

export interface SelectProps extends ComponentPropsWithRef<"select"> {
  options: SelectOption[];
  /** Renders a disabled first option, e.g. "Choose one". */
  placeholder?: string;
}

/** Native select - no dependency, full keyboard and mobile support. */
export function Select({ options, placeholder, className, ...props }: SelectProps) {
  const { id, descriptionId, errorId, hasError, required } = useFormFieldContext();

  return (
    <select
      id={id}
      required={required}
      aria-invalid={hasError || undefined}
      aria-describedby={cn(descriptionId, errorId) || undefined}
      defaultValue={placeholder ? "" : undefined}
      className={cn(controlClasses, className)}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
