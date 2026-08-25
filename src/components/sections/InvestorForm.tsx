"use client";

import { useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  investorCategories,
  investorConsent,
  investorSectors,
} from "@/data/for-investors";

type Errors = Partial<Record<string, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface SubmitResult {
  ok: boolean;
  stored: boolean;
  optInStatus: string;
}

/**
 * Investor registration.
 *
 * ONE form, used in two places - the For Investors page and the investor side
 * of the Contact toggle. The brief is explicit that there must not be two
 * investor databases, and the surest way to avoid two databases is to have
 * only one form that can write to one.
 *
 * ---------------------------------------------------------------------------
 * The three things on this form that are compliance controls
 * ---------------------------------------------------------------------------
 * 1. Investor category is REQUIRED and has no "prefer not to say". It records
 *    the basis on which a registrant was classified, and briefings are directed
 *    at institutional and professional audiences. A record without it cannot be
 *    relied on. Selecting "Other" is a real answer with a consequence, stated
 *    on the form rather than hidden in the handler.
 *
 * 2. Consent is a separate, unticked checkbox with its own wording. It is not
 *    bundled into the submit action, there is no pre-selection, and the server
 *    rejects any submission without it rather than storing a false flag.
 *
 * 3. Double opt-in. A successful submission does not make someone a member; it
 *    sends them an email. The success state says exactly that, because telling
 *    someone they have joined a list they have not yet confirmed is the first
 *    step towards a list that cannot be evidenced.
 *
 * Validation here is a convenience. The server validates independently.
 */
export function InvestorForm({ source }: { source: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const value = (key: string) => String(data.get(key) ?? "").trim();

    if (!value("name")) next.name = "Please enter your full name.";
    if (!value("firm")) next.firm = "Please enter your firm.";
    if (!value("role")) next.role = "Please enter your role.";

    const email = value("email");
    if (!email) next.email = "Please enter your work email address.";
    else if (!EMAIL_PATTERN.test(email)) next.email = "Please enter a valid email address.";

    if (!value("country")) next.country = "Please enter your country.";
    if (!value("investorCategory")) {
      next.investorCategory = "Please select an investor category.";
    }

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
          type: "investor-registration",
          source,
          name: data.get("name"),
          firm: data.get("firm"),
          role: data.get("role"),
          email: data.get("email"),
          country: data.get("country"),
          investorCategory: data.get("investorCategory"),
          sectorsOfInterest: data.getAll("sectorsOfInterest"),
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
    /*
     * The honest success state.
     *
     * Two separate facts, and the wording changes with both: whether the record
     * was actually stored, and whether the person still has to confirm. Neither
     * is glossed. A "thank you for registering" over a record that was never
     * written would be the single most damaging thing this form could do.
     */
    return (
      <div role="status">
        <span aria-hidden="true" className="block h-px w-12 bg-(--color-accent)" />
        <h3 className="mt-6 font-display text-h3">
          {result.stored ? "Almost there." : "Registration received."}
        </h3>

        <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
          {result.optInStatus === "pending"
            ? "We have sent you an email. Please confirm your address from that message and your registration is complete. You are not on the list until you do."
            : "Thank you. We have received your details."}
        </p>

        {!result.stored && (
          <p className="mt-6 border-l-2 border-(--color-accent)/50 pl-4 text-sm leading-relaxed text-(--color-foreground-subtle)">
            Note for review: the CRM is not yet connected, so this registration was not stored.
            This state exists so the completed journey can be assessed. Configure the CRM before
            the site is used with real registrants.
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
            Register someone else
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
      <div className="flex items-center gap-3.5 border-b border-(--color-border) pb-5">
        <span aria-hidden="true" className="h-px w-8 shrink-0 bg-(--color-accent)" />
        <span className="text-label uppercase text-(--color-accent)">Investor Registration</span>
      </div>

      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <FormField label="Full name" error={errors.name} required>
          <Input name="name" autoComplete="name" />
        </FormField>

        <FormField label="Firm" error={errors.firm} required>
          <Input name="firm" autoComplete="organization" />
        </FormField>

        <FormField label="Role" error={errors.role} required>
          <Input name="role" autoComplete="organization-title" />
        </FormField>

        <FormField label="Work email" error={errors.email} required>
          <Input name="email" type="email" inputMode="email" autoComplete="email" />
        </FormField>

        <FormField label="Country" error={errors.country} required>
          <Input name="country" autoComplete="country-name" />
        </FormField>

        {/*
          COMPLIANCE CONTROL. Required, and with no "prefer not to say" option
          by design - see the note in `data/for-investors.ts`.
        */}
        <FormField
          label="Investor category"
          error={errors.investorCategory}
          description="Briefings are directed at institutional and professional audiences."
          required
        >
          <Select
            name="investorCategory"
            options={investorCategories.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            placeholder="Select a category"
          />
        </FormField>
      </div>

      <fieldset>
        <legend className="text-[0.9375rem] font-medium">Sectors of interest</legend>
        <p className="mt-1.5 text-sm text-(--color-foreground-subtle)">
          Optional. We use this to send only the invitations that are relevant to you.
        </p>

        <div className="mt-5 flex flex-col gap-1">
          {investorSectors.map((sector) => (
            <Checkbox key={sector} name="sectorsOfInterest" value={sector} label={sector} />
          ))}
        </div>
      </fieldset>

      {/*
        CONSENT. Separate control, own wording, unticked. Never bundle this
        into the submit action and never pre-select it.
      */}
      <div className="border-t border-(--color-border) pt-7">
        <Checkbox
          name="consent"
          label={investorConsent.label}
          description={investorConsent.note}
          error={errors.consent}
        />
      </div>

      {failure && (
        <p role="alert" className="border-l-2 border-(--color-danger) pl-4 text-sm text-(--color-danger)">
          {failure}
        </p>
      )}

      <div className="mt-1 border-t border-(--color-border) pt-7">
        <Button type="submit" size="lg" withArrow disabled={pending}>
          {pending ? "Submitting…" : "Register"}
        </Button>
      </div>
    </form>
  );
}
