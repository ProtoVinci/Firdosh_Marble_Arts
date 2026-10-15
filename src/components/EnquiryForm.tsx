"use client";

import { useState, type FormEvent } from "react";

const COMMISSIONS = [
  "House / temple mandir",
  "Temple contract",
  "Jali screen or panel",
  "Courtyard fountain",
  "Something else",
];

const STONES = [
  "Makrana white marble",
  "Rajasthan sandstone",
  "Not sure — advise me",
];

const TIMELINES = ["Exploring", "1–3 months", "3–6 months", "Fixed date"];

const SCALES = ["Under 1 m", "1–2 m", "2–3 m", "Over 3 m"];

type Tone = "light" | "dark";

/**
 * `.field` resolves its colour from `currentColor`, so the whole form
 * inherits its tone from the section wrapper rather than hard-coding
 * text colours on every input.
 */
export function EnquiryForm({ tone = "dark" }: { tone?: Tone }) {
  const [sent, setSent] = useState(false);

  const label = tone === "dark" ? "text-bone/45" : "text-ink/50";
  const arrow = tone === "dark" ? "text-bone/40" : "text-ink/40";
  const quiet = tone === "dark" ? "text-bone/45" : "text-ink/45";
  const lead = tone === "dark" ? "text-umber" : "text-umber";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this to the studio's inbox / CRM when the backend exists.
    setSent(true);
  }

  if (sent) {
    return (
      <div
        className={`flex flex-col items-start gap-6 border p-10 sm:p-14 ${
          tone === "dark" ? "border-bone/20" : "border-ink/15"
        }`}
      >
        <span className="micro text-clay">Sent</span>
        <p className="display max-w-[24ch] text-[2rem] sm:text-[2.75rem]">
          Thank you. Your enquiry has been recorded.
        </p>
        <p className={`max-w-[46ch] ${lead}`}>
          If it is urgent, call the workshop on{" "}
          <a href="tel:+919929000106" className="link-draw">
            +91 99290 00106
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className={`micro link-draw ${tone === "dark" ? "text-bone/70 hover:text-bone" : "text-ink/70 hover:text-ink"}`}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-x-10 gap-y-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required labelClass={label} />
        <Field
          label="Email or phone"
          name="contact"
          autoComplete="tel"
          required
          labelClass={label}
        />
      </div>

      <div className="grid gap-9 sm:grid-cols-3">
        <Select
          label="What are you after"
          name="commission"
          options={COMMISSIONS}
          labelClass={label}
          arrowClass={arrow}
        />
        <Select
          label="Stone"
          name="stone"
          options={STONES}
          labelClass={label}
          arrowClass={arrow}
        />
        <Select
          label="Height"
          name="scale"
          options={SCALES}
          labelClass={label}
          arrowClass={arrow}
        />
      </div>

      <div className="grid gap-9 sm:grid-cols-2">
        <Field
          label="Where will it go"
          name="location"
          placeholder="City, country"
          labelClass={label}
        />
        <Select
          label="Timeline"
          name="timeline"
          options={TIMELINES}
          labelClass={label}
          arrowClass={arrow}
        />
      </div>

      <label className="flex flex-col gap-3">
        <span className={`micro ${label}`}>Tell us about the space</span>
        <textarea
          name="notes"
          rows={3}
          placeholder="Courtyard, dimensions, whether it is plumbed, anything already on site…"
          className="field resize-none"
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
        <p className={`max-w-[38ch] text-[0.8125rem] leading-relaxed ${quiet}`}>
          Site photographs help more than anything else you can write here.
        </p>
        <button
          type="submit"
          className={`micro group inline-flex items-center gap-3 px-7 py-4 transition-colors duration-300 ${
            tone === "dark"
              ? "bg-bone text-ink hover:bg-clay hover:text-bone"
              : "bg-ink text-bone hover:bg-clay"
          }`}
        >
          Send enquiry
          <span
            aria-hidden
            className="inline-block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  labelClass: string;
};

function Field({ label, name, placeholder, autoComplete, required, labelClass }: FieldProps) {
  return (
    <label className="flex flex-col gap-3">
      <span className={`micro ${labelClass}`}>{label}</span>
      <input
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="field"
      />
    </label>
  );
}

type SelectProps = {
  label: string;
  name: string;
  options: readonly string[];
  labelClass: string;
  arrowClass: string;
};

function Select({ label, name, options, labelClass, arrowClass }: SelectProps) {
  return (
    <label className="flex flex-col gap-3">
      <span className={`micro ${labelClass}`}>{label}</span>
      <div className="relative">
        <select name={name} className="field appearance-none pr-7" defaultValue={options[0]}>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className={`pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 ${arrowClass}`}
        >
          &darr;
        </span>
      </div>
    </label>
  );
}