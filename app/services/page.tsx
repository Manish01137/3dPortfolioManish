import type { Metadata } from "next";
import { PageIntro } from "@/components/work/PageIntro";
import { ServicesList } from "@/components/sections/ServicesList";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { services, faqs } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Services & pricing", description: "Custom websites, Shopify, WordPress, web apps & AI tools, performance marketing and branding — with transparent starting prices.", alternates: { canonical: "/services" } };

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Services" title={<>Built to<br />grow.</>} lead={site.positioning} />
      <ServicesList withHeading={false} />
      <section className="section container-x" aria-label="Pricing">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="t-h2 mt-6">Clear starting points.</h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.n} className="flex flex-col justify-between gap-10 border border-line bg-elev p-8 transition-colors hover:border-accent">
              <div>
                <p className="mono text-muted">[{s.n}]</p>
                <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm text-muted">{s.description}</p>
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-accent">{s.from}</p>
                <div className="mt-6"><Button href="/contact" magnetic={false}>Get a quote</Button></div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mono mt-6 text-muted">{site.paymentsNote}</p>
      </section>
      <Process />
      <section className="section container-x grid gap-12 lg:grid-cols-12" aria-label="FAQ">
        <div className="lg:col-span-4"><Eyebrow>FAQ</Eyebrow><h2 className="t-h2 mt-6">Good questions.</h2></div>
        <div className="border-t border-line lg:col-span-7 lg:col-start-6">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-medium [&::-webkit-details-marker]:hidden">
                {f.q}<span aria-hidden className="mono text-2xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-6 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
