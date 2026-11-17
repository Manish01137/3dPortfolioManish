import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/work/PageIntro";
import { Journey } from "@/components/sections/Journey";
import { Stats } from "@/components/sections/Stats";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { values } from "@/content/resume";
import { site } from "@/content/site";
import { pad } from "@/lib/utils";

export const metadata: Metadata = { title: "About", description: "Manish Beniwal — developer-founder building websites, e-commerce stores and AI tools from Bangalore.", alternates: { canonical: "/about" } };

export default function About() {
  return (
    <>
      <PageIntro eyebrow="About" title={<>Developer.<br />Founder.</>} lead={`${site.role} — ${site.tagline}.`} />
      <section className="container-x grid gap-12 pb-[var(--section)] lg:grid-cols-12">
        <div className="relative aspect-[4/5] overflow-hidden bg-elev lg:col-span-5">
          <Image src="/me.jpg" alt="Portrait of Manish Beniwal" fill priority sizes="(min-width:1024px) 40vw, 92vw" className="object-cover" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow>The story</Eyebrow>
          <RevealText className="font-display mt-8 text-[clamp(1.5rem,2.8vw,2.6rem)] font-medium leading-tight tracking-tight">
            {`I started building for clients in ${site.since} with a simple idea: websites should be judged by what they do for a business, not just how they look. Today I lead a team of 6+ specialists building websites, Shopify stores, SaaS products and AI tools for brands across India, UAE, Australia, the US and UK.`}
          </RevealText>
          {/* TODO verify — expand with your own longer story */}
          <p className="mt-8 text-lg text-muted">
            I lead every project personally, from the first strategy call to launch day, while studying Information Technology at Alliance University in Bengaluru. I also build my own products — Joinetra, a multi-tenant CRM for travel agencies, is one of them.
          </p>
          <div className="mt-10 flex flex-wrap gap-3"><Button href={site.cvUrl} download variant="solid">Download CV</Button><Button href="/contact">Get in touch</Button></div>
        </div>
      </section>
      <Stats />
      <section className="section container-x" aria-label="Values">
        <Eyebrow>Approach &amp; philosophy</Eyebrow>
        <ul className="mt-12 grid gap-px border border-line bg-[var(--line)] sm:grid-cols-2">
          {values.map((v, i) => (
            <li key={v.title} className="bg-bg p-8 sm:p-10">
              <p className="mono text-accent">[{pad(i + 1)}]</p>
              <h2 className="font-display mt-6 text-3xl font-medium tracking-[-0.03em]">{v.title}</h2>
              <p className="mt-3 text-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <Journey eyebrow={false} />
      <CTA />
    </>
  );
}
