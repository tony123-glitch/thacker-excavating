"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useMemo, useState } from "react";

type ContactMethod = "phone" | "email" | "text";
type SiteVisit = "yes" | "no" | "unsure";

type EstimateFormData = {
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  propertyAddress: string;
  timeline: string;
  preferredContact: ContactMethod;
  siteVisitNeeded: SiteVisit;
  details: string;
  website: string;
};

const INITIAL_FORM: EstimateFormData = {
  fullName: "",
  phone: "",
  email: "",
  serviceType: "",
  propertyAddress: "",
  timeline: "",
  preferredContact: "phone",
  siteVisitNeeded: "unsure",
  details: "",
  website: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<EstimateFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const canSubmit = useMemo(() => {
    return (
      form.fullName.trim().length > 1 &&
      form.phone.trim().length > 6 &&
      form.email.trim().length > 4 &&
      form.serviceType.trim().length > 1 &&
      form.propertyAddress.trim().length > 4 &&
      form.timeline.trim().length > 1 &&
      form.details.trim().length > 9
    );
  }, [form]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setFeedback("");

    if (!canSubmit || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        setStatus("error");
        setFeedback(payload.error ?? "We could not send your request. Please call instead.");
        return;
      }

      setStatus("success");
      setFeedback(payload.message ?? "Thanks, your estimate request was sent.");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#070B0A] text-white">
      <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:py-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_1px_0_rgba(255,255,255,0.06)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Request Estimate
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Tell us about your project
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Fill out the required fields below and your request will be texted to our team.
            We will follow up with an estimate, or let you know if we should visit the property
            first to quote accurately.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
              className="hidden"
              aria-hidden="true"
              name="website"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Full name"
                required
                input={
                  <Input
                    value={form.fullName}
                    onChange={(value) => setForm((prev) => ({ ...prev, fullName: value }))}
                    placeholder="John Smith"
                  />
                }
              />
              <FormField
                label="Phone"
                required
                input={
                  <Input
                    value={form.phone}
                    onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
                    placeholder="(217) 555-0123"
                    type="tel"
                  />
                }
              />
              <FormField
                label="Email"
                required
                input={
                  <Input
                    value={form.email}
                    onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
                    placeholder="name@email.com"
                    type="email"
                  />
                }
              />
              <FormField
                label="Service needed"
                required
                input={
                  <Input
                    value={form.serviceType}
                    onChange={(value) => setForm((prev) => ({ ...prev, serviceType: value }))}
                    placeholder="Grading, trenching, driveway prep, etc."
                  />
                }
              />
            </div>

            <FormField
              label="Property address"
              required
              input={
                <Input
                  value={form.propertyAddress}
                  onChange={(value) => setForm((prev) => ({ ...prev, propertyAddress: value }))}
                  placeholder="123 Main St, Coffeen, IL"
                />
              }
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Preferred timeline"
                required
                input={
                  <Input
                    value={form.timeline}
                    onChange={(value) => setForm((prev) => ({ ...prev, timeline: value }))}
                    placeholder="ASAP, within 2 weeks, next month, etc."
                  />
                }
              />
              <FormField
                label="Preferred contact method"
                required
                input={
                  <select
                    value={form.preferredContact}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        preferredContact: e.target.value as ContactMethod,
                      }))
                    }
                    className="w-full rounded-xl border border-white/15 bg-[#0b1210] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/50"
                    required
                  >
                    <option value="phone">Phone call</option>
                    <option value="text">Text message</option>
                    <option value="email">Email</option>
                  </select>
                }
              />
            </div>

            <FormField
              label="Do you think an on-site visit is needed to quote this?"
              required
              input={
                <div className="grid gap-2 sm:grid-cols-3">
                  {[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                    { label: "Not sure", value: "unsure" },
                  ].map((item) => (
                    <label
                      key={item.value}
                      className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white/85"
                    >
                      <input
                        type="radio"
                        name="siteVisitNeeded"
                        value={item.value}
                        checked={form.siteVisitNeeded === item.value}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            siteVisitNeeded: e.target.value as SiteVisit,
                          }))
                        }
                        className="accent-emerald-400"
                        required
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              }
            />

            <FormField
              label="Project details"
              required
              input={
                <textarea
                  value={form.details}
                  onChange={(e) => setForm((prev) => ({ ...prev, details: e.target.value }))}
                  placeholder="Describe what you need done, approximate size, current site conditions, and any questions."
                  className="min-h-36 w-full rounded-xl border border-white/15 bg-[#0b1210] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/50"
                  required
                />
              }
            />

            {feedback ? (
              <p
                className={
                  status === "success"
                    ? "rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
                    : "rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                }
              >
                {feedback}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Estimate Request"}
              </button>
              <Link
                href="/"
                className="text-sm font-medium text-white/75 underline-offset-4 transition hover:text-white hover:underline"
              >
                Back to homepage
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function FormField({
  label,
  input,
  required = false,
}: {
  label: string;
  input: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/85">
        {label}
        {required ? <span className="ml-1 text-emerald-300">*</span> : null}
      </span>
      {input}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "text" | "email" | "tel";
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      className="w-full rounded-xl border border-white/15 bg-[#0b1210] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/50"
      required
    />
  );
}
