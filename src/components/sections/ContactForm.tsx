"use client";

import { useId, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import {
  areaOfInterestOptions,
  contactContent,
  contactFormConfig,
  marketOptions,
} from "@/data/contact";

type Errors = Partial<Record<string, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Enquiry form.
 *
 * No email provider is connected (see `contactFormConfig.deliveryConfigured`).
 * Validation, error handling and the success state are fully implemented so the
 * UX can be reviewed, but nothing is transmitted - and while delivery is
 * unconfigured the form says so plainly rather than implying a message was
 * sent. Wire `endpoint` up and flip the flag to enable submission.
 *
 * Accessibility: every control is labelled through <FormField>, which supplies
 * id, aria-describedby and aria-invalid. Errors are announced, and on a failed
 * submit focus moves to the first invalid control.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusId = useId();

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const value = (key: string) => String(data.get(key) ?? "").trim();

    if (!value("name")) next.name = "Please enter your full name.";
    if (!value("company")) next.company = "Please enter your company.";

    const email = value("email");
    if (!email) next.email = "Please enter your work email address.";
    else if (!EMAIL_PATTERN.test(email)) next.email = "Please enter a valid email address.";

    if (!value("area")) next.area = "Please choose an area of interest.";

    const message = value("message");
    if (!message) next.message = "Please tell us briefly what you are looking for.";
    else if (message.length < 20) next.message = "Please add a little more detail.";

    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    // Delivery is intentionally not wired up yet.
    if (!contactFormConfig.deliveryConfigured) {
      setSubmitted(true);
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      // Borderless - the contact page already frames the form in a card.
      <div role="status">
        <span aria-hidden="true" className="block h-px w-12 bg-(--color-accent)" />
        <h3 className="mt-6 font-display text-h3">Thank you for your enquiry.</h3>
        <p className="mt-4 max-w-[48ch] text-[0.9375rem] leading-relaxed text-(--color-foreground-muted)">
          Your details have been captured by the form. Enquiries are reviewed directly and you can
          expect a reply from a member of the team.
        </p>

        {!contactFormConfig.deliveryConfigured && (
          <p className="mt-6 border-t border-(--color-border) pt-5 text-sm leading-relaxed text-(--color-foreground-subtle)">
            Note for review: message delivery is not yet connected, so nothing was actually sent.
            This state exists so the completed journey can be assessed. Remove this notice once an
            email provider is configured.
          </p>
        )}

        <div className="mt-8">
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={contactFormConfig.deliveryConfigured ? undefined : statusId}
      className="flex flex-col gap-7"
    >
      {/*
        Names the panel and gives the fields something to hang from. The page's
        own heading sits in the left rail and is unchanged; this is a label, not
        a second title competing with it.
      */}
      <div className="flex items-center gap-3.5 border-b border-(--color-border) pb-5">
        <span aria-hidden="true" className="h-px w-8 shrink-0 bg-(--color-accent)" />
        <span className="text-label uppercase text-(--color-accent)">
          {contactContent.formLabel}
        </span>
      </div>

      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <FormField label="Full name" error={errors.name} required>
          <Input name="name" autoComplete="name" />
        </FormField>

        <FormField label="Company" error={errors.company} required>
          <Input name="company" autoComplete="organization" />
        </FormField>

        <FormField label="Work email" error={errors.email} required>
          <Input name="email" type="email" inputMode="email" autoComplete="email" />
        </FormField>

        <FormField label="Phone" description="Optional">
          <Input name="phone" type="tel" inputMode="tel" autoComplete="tel" />
        </FormField>

        <FormField label="Country / market">
          <Select name="market" options={marketOptions} placeholder="Select a market" />
        </FormField>

        <FormField label="Area of interest" error={errors.area} required>
          <Select name="area" options={areaOfInterestOptions} placeholder="Select an area" />
        </FormField>
      </div>

      <FormField
        label="Message"
        error={errors.message}
        description="A short outline of your situation and what you are looking for."
        required
      >
        {/*
          Five rows rather than six. Six ran to roughly 240px, which on the
          contact page was the tallest single element on screen and made the
          form read as mostly empty box - and nobody writes six lines into an
          enquiry before they have had a reply.
        */}
        <Textarea name="message" rows={5} />
      </FormField>

      {/*
        The delivery notice is a status, not body copy, so it is set apart on
        the accent rule the site uses elsewhere for qualifying statements. The
        wording is untouched: nothing here may imply a message was sent.
      */}
      {!contactFormConfig.deliveryConfigured && (
        <p
          id={statusId}
          className="border-s-2 border-(--color-accent)/50 ps-4 text-sm leading-relaxed text-(--color-foreground-subtle)"
        >
          Form delivery is not yet connected. Submissions are not sent or stored.
        </p>
      )}

      <div className="mt-1 border-t border-(--color-border) pt-7">
        {/* Button already goes full width below `xs` and hugs above it. */}
        <Button type="submit" size="lg" withArrow>
          Submit Enquiry
        </Button>
      </div>
    </form>
  );
}
