"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/content/site";
import { featured } from "@/content/projects";
import { pad } from "@/lib/utils";
import { scrollToTop } from "./SmoothScroll";
import { Scramble } from "../ui/Scramble";

export function Footer() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from(".wordmark-char", {
      yPercent: 110, duration: 1.2, ease: "power4.out", stagger: 0.04,
      scrollTrigger: { trigger: ".wordmark-wrap", start: "top 95%", once: true },
    });
  }, { scope: root });
  const col = "mono text-muted mb-5";
  return (
    <footer ref={root} className="pt-24" aria-label="Footer">
      <div className="container-x grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-2">
          <p className={col}>/ Discover</p>
          <ul className="space-y-1.5 text-lg">{site.nav.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-accent">{l.label}</Link></li>)}</ul>
        </div>
        <div className="lg:col-span-3">
          <p className={col}>/ Contact</p>
          <ul className="space-y-1.5 text-lg">
            <li><a href={`mailto:${site.email}`} className="break-all hover:text-accent">{site.email}</a></li>
            <li><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-accent">{site.phone}</a></li>
            <li className="text-muted">{site.location}</li>
          </ul>
          <p className={`${col} mt-10`}>/ Projects</p>
          <ul className="space-y-1.5">{featured.slice(0, 5).map((p) => <li key={p.slug}><Link href={`/work/${p.slug}`} className="hover:text-accent">{p.title}</Link></li>)}</ul>
        </div>
        <div className="sm:col-span-2 lg:col-span-6 lg:col-start-7">
          <p className={col}>/ Elsewhere</p>
          <ul className="border-t border-line">
            {site.socials.map((s, i) => (
              <li key={s.label} className="border-b border-line">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 items-center justify-between gap-4 py-3 text-lg hover:text-accent">
                  <span><span className="mono mr-4 text-muted">[{pad(i + 1)}]</span><Scramble text={s.label} /></span>
                  <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-end">
            <button onClick={scrollToTop} className="mono inline-flex min-h-11 items-center gap-2 hover:text-accent"><Scramble text="Back to top" /> <ArrowUp size={14} /></button>
          </div>
        </div>
      </div>
      <div className="wordmark-wrap container-x mt-16 overflow-hidden">
        <p aria-hidden className="t-mono-xl flex select-none justify-between whitespace-nowrap text-[11vw] leading-[0.8] 2xl:text-[min(11vw,11.5rem)]">
          {"MANISH BENIWAL".split("").map((c, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.04em]"><span className="wordmark-char inline-block">{c === " " ? " " : c}</span></span>
          ))}
        </p>
      </div>
      <div className="container-x flex flex-wrap items-center justify-between gap-4 py-6">
        <p className="mono text-muted">© 2026 Manish Beniwal. All rights reserved.</p>
        <p className="mono text-muted">Designed &amp; built by Manish Beniwal</p>
      </div>
    </footer>
  );
}
