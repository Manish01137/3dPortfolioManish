"use client";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { site, socialHref } from "@/content/site";
import { featured } from "@/content/projects";
import { pad } from "@/lib/utils";
import { scrollToTop } from "./SmoothScroll";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from(".wordmark", { yPercent: 100, duration: 1.4, ease: "power4.out", scrollTrigger: { trigger: ".wordmark-wrap", start: "top 95%", once: true } });
  }, { scope: root });
  const col = "mono text-muted mb-5";
  return (
    <footer ref={root} className="border-t border-line pt-20" aria-label="Footer">
      <div className="container-x grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className={col}>/ Discover</p>
          <ul className="space-y-2">{site.nav.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-accent">{l.label}</Link></li>)}</ul>
        </div>
        <div>
          <p className={col}>/ Contact</p>
          <ul className="space-y-2">
            <li><a href={`mailto:${site.email}`} className="hover:text-accent break-all">{site.email}</a></li>
            <li><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-accent">{site.phone}</a></li>
            <li className="text-muted">{site.location}</li>
          </ul>
        </div>
        <div>
          <p className={col}>/ Projects</p>
          <ul className="space-y-2">{featured.slice(0, 5).map((p) => <li key={p.slug}><Link href={`/work/${p.slug}`} className="hover:text-accent">{p.title}</Link></li>)}</ul>
        </div>
        <div>
          <p className={col}>/ Social</p>
          <ul className="space-y-2">
            {site.socials.map((s, i) => (
              <li key={s.label}><a href={socialHref(s.href)} target="_blank" rel="noopener noreferrer" className="hover:text-accent"><span className="mono text-muted mr-2">[{pad(i + 1)}]</span>{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wordmark-wrap mt-20 overflow-hidden">
        <p aria-hidden className="wordmark font-display select-none whitespace-nowrap text-center text-[16.2vw] font-semibold leading-[0.85] tracking-[-0.05em]">
          SHAPE-360<span className="text-accent">*</span>
        </p>
      </div>
      <div className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-line py-6">
        <p className="mono text-muted">© 2026 Shape-360. All rights reserved.</p>
        <button onClick={scrollToTop} className="mono inline-flex min-h-11 items-center gap-2 hover:text-accent">Back to top <ArrowUp size={14} /></button>
      </div>
    </footer>
  );
}
