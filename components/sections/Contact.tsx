"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eyebrow } from "../ui/Eyebrow";
import { SplitHeading } from "../ui/SplitHeading";
import { Button } from "../ui/Button";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { budgets } from "@/lib/budgets";

// Client validation uses react-hook-form rules (keeps zod out of the browser bundle);
// the API route re-validates everything with the zod schema in lib/contact-schema.ts.
type Form = { name: string; email: string; company?: string; budget?: string; services: string[]; message: string; website?: string };
const rules = {
  name: { validate: (v: string) => v.trim().length >= 2 || "Please enter your name" },
  email: { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email" }, required: "Please enter a valid email" },
  message: { validate: (v: string) => v.trim().length >= 10 || "A couple of sentences helps (10+ characters)", maxLength: { value: 5000, message: "Please keep it under 5000 characters" } },
};

const Field = ({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) => (
  <div className="relative">
    {children}
    <label htmlFor={id} className="mono pointer-events-none absolute left-0 top-5 text-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.65rem]">
      {label}
    </label>
    {error && <p role="alert" className="mt-2 text-sm text-red-400">{error}</p>}
  </div>
);
const input = "peer w-full border-b border-line bg-transparent pb-3 pt-6 outline-none transition-colors placeholder:text-transparent focus:border-accent focus-visible:outline-none";

export function Contact({ eyebrow = true }: { eyebrow?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Form>({
    defaultValues: { services: [], budget: "", company: "", website: "" },
  });
  const chosen = watch("services");

  const onSubmit = async (data: Form) => {
    setState("sending");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (r.ok) return setState("done");
      if (r.status === 501) {
        const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})${data.company ? `, ${data.company}` : ""}\nBudget: ${data.budget || "n/a"}\nServices: ${data.services.join(", ")}`);
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("New project enquiry")}&body=${body}`;
        return setState("done");
      }
      setState("error");
    } catch { setState("error"); }
  };

  return (
    <section id="contact" className="section container-x scroll-mt-20">
      {eyebrow && <Eyebrow n="08">Contact</Eyebrow>}
      <SplitHeading className="t-h2 mt-6">Just say hello.</SplitHeading>
      <div className="mt-16 grid gap-16 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-4">
          <div><p className="mono text-muted">Email</p><a className="text-xl hover:text-accent break-all" href={`mailto:${site.email}`}>{site.email}</a></div>
          <div>
            <p className="mono text-muted">Phone / WhatsApp</p>
            <a className="text-xl hover:text-accent" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a><br />
            <a className="mono mt-2 inline-flex min-h-11 items-center text-accent" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a>
          </div>
          <div><p className="mono text-muted">Studio</p><p className="text-xl">{site.location}</p></div>
          <div><p className="mono text-muted">Response</p><p>Replies within 24h. {site.timezoneNote}.</p></div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {state === "done" ? (
            <div role="status" className="flex flex-col items-start gap-6 border border-line bg-elev p-10">
              <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden>
                <circle cx="36" cy="36" r="34" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="214" strokeDashoffset="214" style={{ animation: "draw .7s ease forwards" }} />
                <path d="M22 37l10 10 18-20" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray="50" strokeDashoffset="50" style={{ animation: "draw .5s .6s ease forwards" }} />
              </svg>
              <style>{`@keyframes draw{to{stroke-dashoffset:0}}`}</style>
              <p className="font-display text-3xl font-semibold tracking-tight">Done! Thanks — I&apos;ll get back within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-8 sm:grid-cols-2">
              <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register("website")} />
              <Field id="name" label="Name *" error={errors.name?.message}><input id="name" placeholder="Name" autoComplete="name" className={input} aria-invalid={!!errors.name} {...register("name", rules.name)} /></Field>
              <Field id="email" label="Email *" error={errors.email?.message}><input id="email" type="email" placeholder="Email" autoComplete="email" className={input} aria-invalid={!!errors.email} {...register("email", rules.email)} /></Field>
              <Field id="company" label="Company"><input id="company" placeholder="Company" autoComplete="organization" className={input} {...register("company")} /></Field>
              <div>
                <label htmlFor="budget" className="mono text-[0.65rem] text-muted">Budget</label>
                <select id="budget" className="w-full border-b border-line bg-transparent pb-3 pt-2 outline-none focus:border-accent" {...register("budget")}>
                  <option value="" className="bg-bg">Select a range</option>
                  {budgets.map((b) => <option key={b} value={b} className="bg-bg">{b}</option>)}
                </select>
              </div>
              <fieldset className="sm:col-span-2">
                <legend className="mono mb-4 text-muted">Service (pick any)</legend>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => {
                    const on = chosen.includes(s.title);
                    return (
                      <button type="button" key={s.n} aria-pressed={on}
                        onClick={() => setValue("services", on ? chosen.filter((c) => c !== s.title) : [...chosen, s.title])}
                        className={`min-h-11 rounded-full border px-4 text-sm transition-colors ${on ? "border-accent bg-accent text-[var(--accent-fg)]" : "border-line hover:border-fg"}`}>
                        {s.title}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <div className="sm:col-span-2">
                <Field id="message" label="Tell me about the project *" error={errors.message?.message}>
                  <textarea id="message" rows={5} placeholder="Message" className={`${input} resize-none`} aria-invalid={!!errors.message} {...register("message", rules.message)} />
                </Field>
              </div>
              <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
                <Button type="submit" variant="solid" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message →"}</Button>
                {state === "error" && <p role="alert" className="text-sm text-red-400">Something went wrong. Email me at {site.email}.</p>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
