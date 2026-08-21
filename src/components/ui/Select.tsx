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

/**
 * Native select - no dependency, full keyboard and mobile support.
 *
 * `appearance-none` removes the platform arrow, which is the one part of the
 * control that browsers will not let CSS touch and the reason a styled select
 * still reads as a default widget sitting in a designed form. The replacement
 * is drawn beside it as a real SVG rather than as a background data URI, so it
 * takes `currentColor` and inverts with the surface like everything else.
 *
 * The picker itself is untouched: this only changes the closed control, so the
 * native option list, keyboard behaviour and the iOS and Android wheels are all
 * exactly what they were.
 */
export function Select({ options, placeholder, className, ...props }: SelectProps) {
  const { id, descriptionId, errorId, hasError, required } = useFormFieldContext();

  return (
    <div className="relative">
      <select
        id={id}
        required={required}
        aria-invalid={hasError || undefined}
        aria-describedby={cn(descriptionId, errorId) || undefined}
        defaultValue={placeholder ? "" : undefined}
        className={cn(
          controlClasses,
          // Room for the mark, and no platform arrow behind it.
          "appearance-none pr-12",
          // While the placeholder is selected the control is showing prompt
          // text, not an answer, so it takes the quieter foreground.
          "[&:has(option[value='']:checked)]:text-(--color-foreground-subtle)",
          className,
        )}
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

      {/*
        Sits over the control and takes no pointer events, so clicking the mark
        opens the select exactly as clicking the old platform arrow did.
      */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-(--color-accent)"
      >
        <svg width="11" height="7" viewBox="0 0 11 7" fill="none" focusable="false">
          <path
            d="M1 1l4.5 4.5L10 1"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="square"
          />
        </svg>
      </span>
    </div>
  );
}
