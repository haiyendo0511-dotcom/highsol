"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";

export type InquiryConfiguration = {
  code: string;
  summary: string;
  fields: Record<string, string>;
};

type ContactFormProps = {
  configuration?: InquiryConfiguration;
  onSuccess?: () => void;
  onError?: () => void;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm({ configuration, onSuccess, onError }: ContactFormProps = {}) {
  const [state, setState] = useState<FormState>("idle");
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    if (!formId) {
      setState("success");
      onSuccess?.();
      return;
    }

    setState("submitting");
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Delivery failed");
      form.reset();
      setState("success");
      onSuccess?.();
    } catch {
      setState("error");
      onError?.();
    }
  }

  return (
    <form className="rfq-form" onSubmit={submit} noValidate aria-busy={state === "submitting"}>
      {configuration ? (
        <>
          <input type="hidden" name="configurationSummary" value={configuration.summary} />
          {Object.entries(configuration.fields).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
        </>
      ) : null}
      <input className="honeypot" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      <div className="form-grid">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Company" name="company" autoComplete="organization" required />
        <Field label="Country" name="country" autoComplete="country-name" required />
        <Field label="Business email" name="email" type="email" autoComplete="email" required />
        <Field label="WhatsApp or phone" name="phone" type="tel" autoComplete="tel" />
        <label className="field">
          <span>Buyer type</span>
          <select name="buyerType" defaultValue="" required>
            <option value="" disabled>Select one</option>
            <option>Hospitality procurement</option>
            <option>Designer or architect</option>
            <option>Distributor or dealer</option>
            <option>Brand or OEM buyer</option>
            <option>Other</option>
          </select>
        </label>
        <label className="field field-wide">
          <span>Project type</span>
          <select name="projectType" defaultValue="" required>
            <option value="" disabled>Select one</option>
            <option>Resort or hotel</option>
            <option>Restaurant or beach club</option>
            <option>Distribution program</option>
            <option>OEM or private label</option>
            <option>Other</option>
          </select>
        </label>
        <Field
          label="Estimated quantity"
          name="quantity"
          inputMode="numeric"
          defaultValue={configuration?.fields.configuredQuantity}
        />
        <Field label="Target delivery period" name="timeline" placeholder="Example: Q2 2027" />
        <label className="field field-wide">
          <span>Project message</span>
          <textarea name="message" rows={5} required placeholder="Tell us about the site, product type, quantity, and destination." />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>I agree that Highsol may use these details to respond to this inquiry.</span>
      </label>
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending" : "Start an inquiry"}
          <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
        </button>
        <p className="form-status" aria-live="polite">
          {state === "success" && (formId ? "Thank you. Your inquiry has been sent." : "Preview complete. Connect Formspree before launch.")}
          {state === "error" && "The form could not send. Please use the email contact instead."}
        </p>
      </div>
    </form>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string };

function Field({ label, name, ...props }: FieldProps) {
  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} {...props} />
    </label>
  );
}
