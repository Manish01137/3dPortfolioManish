"use client";
import { useRef } from "react";
import { gsap, useGSAP, isFinePointer, prefersReducedMotion } from "@/lib/gsap";
import { whenReady } from "@/lib/ready";
import { SplitHeading } from "../ui/SplitHeading";
import { Button } from "../ui/Button";
import { CursorTrail } from "../ui/CursorTrail";
import { CircularBadge } from "../ui/CircularBadge";
import { site } from "@/content/site";
import { featured } from "@/content/projects";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const reduce = prefersReducedMotion();
    if (!reduce) {
      gsap.set(".hero-fade", { opacity: 0, y: 20 });
      gsap.set(".hero-rise", { y: 30 }); // translate only: stays paintable so it can count as LCP early
      const off = whenReady(() => {
        gsap.to(".hero-fade", { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, delay: 0.35, ease: "power3.out" });
        gsap.to(".hero-rise", { y: 0, duration: 1.1, delay: 0.45, ease: "power3.out" });
      });
      if (isFinePointer()) {
        const el = root.current!;
        const move = (e: MouseEvent) => {
          const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
          gsap.to(".blob", { x: (i) => nx * (i + 1) * 60, y: (i) => ny * (i + 1) * 60, duration: 1.2, ease: "power3.out" });
        };
        el.addEventListener("mousemove", move);
        return () => { off(); el.removeEventListener("mousemove", move); };
      }
      return off;
    }
  }, { scope: root });

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-8 pt-28" aria-label="Introduction">
      {/* gradient mesh + floating blurred shapes */}
      <div aria-hidden className="absolute inset-0 -z-0">
        <div className="blob absolute -left-[10%] top-[10%] h-[45vw] max-h-[620px] w-[45vw] max-w-[620px] rounded-full opacity-30 blur-[120px]" style={{ background: "var(--accent)", animation: "drift 18s ease-in-out infinite" }} />
        <div className="blob absolute -right-[8%] top-[35%] h-[38vw] max-h-[520px] w-[38vw] max-w-[520px] rounded-full opacity-20 blur-[110px]" style={{ background: "color-mix(in srgb, var(--accent) 45%, #6a5cff)", animation: "drift 24s ease-in-out infinite reverse" }} />
        <div className="blob absolute bottom-[-10%] left-[35%] h-[28vw] max-h-[380px] w-[28vw] max-w-[380px] rounded-full opacity-15 blur-[100px]" style={{ background: "var(--fg)", animation: "drift 30s ease-in-out infinite" }} />
      </div>
      <CursorTrail images={featured.map((p) => p.cover)} />

      <div className="container-x relative z-[2] w-full">
        <div className="hero-fade flex flex-wrap items-center justify-between gap-4">
          <p className="mono text-muted">Hello! I&apos;m {site.name} —</p>
          <p className="mono inline-flex items-center gap-3 rounded-full border border-line px-4 py-2">
            <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden />
            {site.availability}
          </p>
        </div>
      </div>

      <div className="container-x relative z-[2] my-10 w-full">
        <SplitHeading as="h1" trigger="ready" delay={0.15} className="h-hero !text-[9.4vw] lg:!text-[clamp(3rem,7.4vw,7.5rem)]">
          Websites, stores<br />&amp; AI tools that<br />actually <em className="font-normal italic text-accent">grow</em> brands.
        </SplitHeading>
        <div className="hero-rise mt-10 grid gap-8 lg:grid-cols-12">
          <p className="max-w-xl text-lg text-muted lg:col-span-6">
            {site.positioning} <span className="text-fg">Founder of Shape-360, Bangalore.</span>
          </p>
          <div className="flex flex-wrap items-center gap-3 lg:col-span-6 lg:justify-end">
            <Button href="/contact" variant="solid">Start a project</Button>
            <Button href="#work">See the work ↓</Button>
          </div>
        </div>
      </div>

      <div className="container-x hero-fade relative z-[2] flex w-full items-end justify-between">
        <a href="#about" className="mono inline-flex min-h-11 items-center gap-4 text-muted hover:text-fg" aria-label="Scroll to explore">
          <span className="relative block h-12 w-px overflow-hidden bg-line"><span className="absolute inset-0 bg-accent" style={{ animation: "scroll-line 2.2s ease-in-out infinite" }} /></span>
          Scroll to explore
        </a>
        <div className="hidden sm:block"><CircularBadge /></div>
      </div>
    </section>
  );
}
