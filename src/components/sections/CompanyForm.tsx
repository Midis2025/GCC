"use client";

import { useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type Errors = Partial<Record<string, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface SubmitResult {
  ok: boolean;
  stored: boolean;
}

/**
 * Company enquiry.
 *
 * The issuer side of the Contact toggle. Captures what is needed to understand
 * who is asking - company, listing venue, ticker, sector - before the message
 * itself, because a listed company's enquiry is answerable only once those are
 * known.
 *
 * Consent is a separate unticked checkbox here too. A company enquiry is
 * correspondence rather than a marketing list, so it does not go through double
 * opt-in, but the record still carries an explicit lawful basis with its own
 * wording and its own timestamp.
 *
 * Like the investor form, this reports honestly: if the CRM is not configured
 * the success state says the enquiry was not stored rather than thanking the
 * sender for something that went nowhere.
 */
export function CompanyForm({ source }: { source: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const value = (key: string) => String(data.get(key) ?? "").trim();

    if (!value("companyName")) next.companyName = "Please enter your company name.";
    if (!value("name")) next.name = "Please enter your full name.";

    const email = value("email");
    if (!email) next.email = "Please enter your work email address.";
    else if (!EMAIL_PATTERN.test(email)) next.email = "Please enter a valid email address.";

    const message = value("message");
    if (!message) next.message = "Please tell us briefly what you are looking for.";
    else if (message.length < 20) next.message = "Please add a little more detail.";

    if (data.get("consent") !== "on") {
      next.consent = "Please confirm you agree to be contacted.";
    }

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailure(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    setPending(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "company-enquiry",
          source,
          companyName: data.get("companyName"),
          listingVenue: data.get("listingVenue"),
          ticker: data.get("ticker"),
          sector: data.get("sector"),
          name: data.get("name"),
          role: data.get("role"),
          email: data.get("email"),
          phone: data.get("phone"),
          country: data.get("country"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
        }),
      });

      const payload = (await response.json()) as SubmitResult & {
        errors?: Errors;
        error?: string;
      };

      if (!response.ok) {
        if (payload.errors) {
          setErrors(payload.errors);
          const first = Object.keys(payload.errors)[0];
          form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        } else {
          setFailure(payload.error ?? "Something went wrong. Please try again.");
        }
        return;
      }

      setResult(payload);
    } catch {
      setFailure("We could not reach the server. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (result) {
    return (
      <div role="status">
        <span aria-hidden="true" className="block h-px w-12 bg-(--color-accent)" />
        <h3 className="mt-6 font-display text-h3">Thank you for your enquiry.</h3>
        <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
          We have your details and a member of the team will read your enquiry.
        </p>

        {!result.stored && (
          <p className="mt-6 border-l-2 border-(--color-accent)/50 pl-4 text-sm leading-relaxed text-(--color-foreground-subtle)">
            Note for review: the CRM is not yet connected, so this enquiry was not stored. This
            state exists so the completed journey can be assessed.
          </p>
        )}

        <div className="mt-8">
          <Button
            variant="outline"
            onClick={() => {
              setResult(null);
              setErrors({});
              formRef.current?.reset();
            }}
          >
            Send another enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
      <div className="flex items-center gap-3.5 border-b border-(--color-border) pb-5">
        <span aria-hidden="true" className="h-px w-8 shrink-0 bg-(--color-accent)" />
        <span className="text-label uppercase text-(--color-accent)">Company Enquiry</span>
      </div>

      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <FormField label="Company name" error={errors.companyName} required>
          <Input name="companyName" autoComplete="organization" />
        </FormField>

        <FormField label="Listing venue" description="Optional">
          <Input name="listingVenue" placeholder="e.g. LSE, ASX, TSX-V" />
        </FormField>

        <FormField label="Ticker" description="Optional">
          <Input name="ticker" />
        </FormField>

        <FormField label="Sector" description="Optional">
          <Input name="sector" />
        </FormField>

        <FormField label="Your name" error={errors.name} required>
          <Input name="name" autoComplete="name" />
        </FormField>

        <FormField label="Role" description="Optional">
          <Input name="role" autoComplete="organization-title" />
        </FormField>

        <FormField label="Work email" error={errors.email} required>
          <Input name="email" type="email" inputMode="email" autoComplete="email" />
        </FormField>

        <FormField label="Phone" description="Optional">
          <Input name="phone" type="tel" inputMode="tel" autoComplete="tel" />
        </FormField>

        <FormField label="Country" description="Optional" className="sm:col-span-2">
          <Input name="country" autoComplete="country-name" />
        </FormField>
      </div>

      <FormField
        label="Enquiry"
        error={errors.message}
        description="A short outline of your situation and what you are looking for."
        required
      >
        <Textarea name="message" rows={5} />
      </FormField>

      <div className="border-t border-(--color-border) pt-7">
        <Checkbox
          name="consent"
          label="I agree to Gulf Connect Consultancy FZCO contacting me about this enquiry."
          error={errors.consent}
        />
      </div>

      {failure && (
        <p
          role="alert"
          className="border-l-2 border-(--color-danger) pl-4 text-sm text-(--color-danger)"
        >
          {failure}
        </p>
      )}

      <div className="mt-1 border-t border-(--color-border) pt-7">
        <Button type="submit" size="lg" withArrow disabled={pending}>
          {pending ? "Submitting…" : "Submit Enquiry"}
        </Button>
      </div>
    </form>
  );
}
