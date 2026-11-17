"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP, isFinePointer, prefersReducedMotion } from "@/lib/gsap";
import { Eyebrow } from "../ui/Eyebrow";
import { SplitHeading } from "../ui/SplitHeading";
import { Tag } from "../ui/Tag";
import { Button } from "../ui/Button";
import { services } from "@/content/services";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";

export function ServicesList({ withHeading = true }: { withHeading?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [openRow, setOpenRow] = useState<number | null>(0);

  useGSAP(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const x = gsap.quickTo(float.current, "x", { duration: 0.5, ease: "power3" });
    const y = gsap.quickTo(float.current, "y", { duration: 0.5, ease: "power3" });
    const move = (e: MouseEvent) => { x(e.clientX); y(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, { scope: root });
  useGSAP(() => {
    gsap.set(float.current, { xPercent: -50, yPercent: -50 });
    gsap.to(float.current, { opacity: active === null ? 0 : 1, scale: active === null ? 0.8 : 1, duration: 0.35, overwrite: "auto" });
  }, { dependencies: [active], scope: root });

  return (
    <section id="services" ref={root} className="section container-x scroll-mt-20">
      {withHeading && (
        <>
          <Eyebrow n="03">Services</Eyebrow>
          <SplitHeading className="t-h2 mt-6 max-w-5xl">Where design meets engineering.</SplitHeading>
        </>
      )}
      <ul className="mt-16 border-t border-line">
        {services.map((s, i) => {
          const isOpen = openRow === i;
          return (
            <li key={s.n} className="border-b border-line" onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
              <button
                aria-expanded={isOpen}
                aria-controls={`svc-${i}`}
                onClick={() => setOpenRow(isOpen ? null : i)}
                className="group flex w-full items-start gap-4 py-7 text-left lg:pointer-events-none lg:py-10"
              >
                <span className="mono mt-3 text-muted transition-colors group-hover:text-accent lg:mt-5">[{s.n}]</span>
                <span className="font-display flex-1 text-[clamp(1.7rem,4.8vw,4.5rem)] font-semibold leading-[1.02] tracking-tight transition-transform duration-500 lg:group-hover:translate-x-6">{s.title}</span>
                <span aria-hidden className={`mono mt-3 text-lg transition-transform lg:hidden ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>
              <div id={`svc-${i}`} className={`grid transition-[grid-template-rows] duration-500 lg:!grid-rows-[1fr] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="grid gap-6 pb-8 lg:grid-cols-12 lg:pb-10">
                    <p className="max-w-xl text-muted lg:col-span-5 lg:col-start-2">{s.description}</p>
                    <div className="flex flex-wrap items-start gap-2 lg:col-span-4">{s.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                    <p className="mono text-accent lg:col-span-2 lg:text-right">{s.from}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mono mt-6 text-muted">{site.paymentsNote}</p>
      {withHeading && <div className="mt-10"><Button href="/services">Pricing & FAQ →</Button></div>}
      {/* cursor-following preview (desktop) */}
      <div ref={float} aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[200px] w-[320px] opacity-0 [@media(hover:hover)_and_(pointer:fine)]:block">
        {services.map((s, i) => {
          const p = getProject(s.image);
          return p ? <Image key={s.n} src={p.cover} alt="" fill sizes="320px" className={`object-cover transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`} /> : null;
        })}
      </div>
    </section>
  );
}
