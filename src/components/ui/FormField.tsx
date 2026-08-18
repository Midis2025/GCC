"use client";

import { createContext, useContext, useId, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FormFieldContextValue {
  id: string;
  descriptionId?: string;
  errorId?: string;
  hasError: boolean;
  required: boolean;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

/**
 * Read by Input/Textarea/Select so they wire up id, aria-describedby and
 * aria-invalid automatically. Throws outside a <FormField> to catch mistakes early.
 */
export function useFormFieldContext(): FormFieldContextValue {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error("Form controls must be rendered inside a <FormField>.");
  }
  return context;
}

export interface FormFieldProps {
  label: string;
  children: ReactNode;
  /** Helper text rendered under the control and linked via aria-describedby. */
  description?: string;
  /** Validation message; sets aria-invalid and is announced politely. */
  error?: string;
  required?: boolean;
  /** Hides the label visually while keeping it for assistive tech. */
  hideLabel?: boolean;
  className?: string;
}

/**
 * Accessible field wrapper: one label, optional description and error, all
 * correctly associated with the control it wraps.
 */
export function FormField({
  label,
  children,
  description,
  error,
  required = false,
  hideLabel = false,
  className,
}: FormFieldProps) {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <FormFieldContext.Provider
      value={{ id, descriptionId, errorId, hasError: Boolean(error), required }}
    >
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label htmlFor={id} className={cn("text-sm font-medium", hideLabel && "sr-only")}>
          {label}
          {required && (
            <span className="ml-0.5 text-(--color-danger)" aria-hidden="true">
              *
            </span>
          )}
          {required && <span className="sr-only"> (required)</span>}
        </label>

        {children}

        {description && (
          <p id={descriptionId} className="text-sm text-(--color-foreground-muted)">
            {description}
          </p>
        )}

        {error && (
          <p id={errorId} role="alert" className="text-sm text-(--color-danger)">
            {error}
          </p>
        )}
      </div>
    </FormFieldContext.Provider>
  );
}
