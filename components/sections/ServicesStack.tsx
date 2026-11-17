"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Eyebrow } from "../ui/Eyebrow";
import { SplitHeading } from "../ui/SplitHeading";
import { Scramble } from "../ui/Scramble";
import { services } from "@/content/services";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";

/** Full-screen service slides that stack: each pins, the next slides over, the previous sinks back in 3D. */
export function ServicesStack() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const panels = gsap.utils.toArray<HTMLElement>(".svc-panel");
    panels.forEach((panel, i) => {
      const next = panels[i + 1];
      const inner = panel.querySelector(".svc-inner");
      if (next) {
        gsap.to(inner, {
          scale: 0.86, rotationX: 8, yPercent: -4, transformPerspective: 1400, transformOrigin: "50% 0%", ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
        });
        gsap.to(panel.querySelector(".svc-dim"), { opacity: 0.75, ease: "none", scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true } });
      }
      gsap.fromTo(panel.querySelector(".svc-title"), { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "power3.out", scrollTrigger: { trigger: panel, start: "top 70%", end: "top 10%", scrub: true } });
    });
  }, { scope: root });

  return (
    <section id="services" ref={root} className="scroll-mt-20 pt-[var(--section)]">
      <div className="container-x mb-16 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow n="03">Services</Eyebrow>
          <SplitHeading className="t-h2 mt-6 max-w-4xl">Where design meets engineering.</SplitHeading>
        </div>
        <Link href="/services" className="mono inline-flex min-h-11 items-center gap-2 hover:text-accent"><Scramble text="Pricing & FAQ" /> →</Link>
      </div>
      <div>
        {services.map((s, i) => {
          const p = getProject(s.image);
          return (
            <article key={s.n} className="svc-panel sticky top-0 h-[100svh] overflow-hidden" aria-labelledby={`svc-t-${i}`}>
              <div className="svc-inner theme-dark relative h-full w-full overflow-hidden">
                {p && <Image src={p.cover} alt="" fill sizes="100vw" className="object-cover opacity-70" />}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75" />
                <div className="svc-dim pointer-events-none absolute inset-0 bg-black opacity-0" />
                <div className="container-x relative flex h-full w-full flex-col justify-between py-24 text-white sm:py-28">
                  <div className="mono flex justify-between text-white/70"><span>[ {s.n} ]</span><span>{String(services.length).padStart(2, "0")} services</span></div>
                  <div className="grid items-center gap-8 lg:grid-cols-12">
                    <ul className="mono order-2 space-y-1 text-[0.7rem] text-white/75 lg:order-1 lg:col-span-3">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                    <h3 id={`svc-t-${i}`} className="svc-title order-1 font-display text-[clamp(2.4rem,6vw,6rem)] font-medium leading-[0.95] tracking-[-0.05em] lg:order-2 lg:col-span-6 lg:text-center">{s.title}</h3>
                    <div className="order-3 lg:col-span-3 lg:text-right">
                      <p className="text-white/80">{s.description}</p>
                      <p className="mono mt-4 text-[var(--accent)]">{s.from}</p>
                    </div>
                  </div>
                  <p className="mono text-white/50">{i === services.length - 1 ? site.paymentsNote : "Scroll ↓"}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
