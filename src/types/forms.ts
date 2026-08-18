/** Field-level validation state shared by the form primitives. */
export interface FieldState {
  error?: string;
  description?: string;
  required?: boolean;
}

/** Option for `<Select>` and radio/checkbox groups. */
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/** Result shape for server actions / API routes handling form submissions. */
export interface FormResult {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field name -> error message. */
  fieldErrors?: Record<string, string>;
}
