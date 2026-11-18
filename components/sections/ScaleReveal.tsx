"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Marquee } from "../ui/Marquee";
import { site } from "@/content/site";
import { getProject } from "@/content/projects";

const hero = getProject("veloura-jewels")!;
const left = ["Web design", "Development", "E-commerce", "AI tools"];
const right = ["Shopify", "WordPress", "Meta Ads", "Google Ads"];

/** Dark band: giant mono marquee; a small image grows to full-screen as you scroll (pinned). */
export function ScaleReveal() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const mobile = window.innerWidth < 768;
    const start = mobile ? "inset(33% 16% 33% 16%)" : "inset(31% 37% 31% 37%)";
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: "top top", end: "+=140%", pin: true, scrub: 1 },
    });
    tl.fromTo(".sr-media", { clipPath: start }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 1 }, 0)
      .fromTo(".sr-media img", { scale: 1.45 }, { scale: 1, ease: "power2.inOut", duration: 1 }, 0)
      .fromTo(".sr-shade", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.45)
      .fromTo(".sr-label", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.4 }, 0.6)
      .fromTo(".sr-title", { opacity: 0, scale: 0.85, rotationX: -40 }, { opacity: 1, scale: 1, rotationX: 0, duration: 0.5, ease: "power3.out" }, 0.55);
  }, { scope: root });

  const row = site.disciplines.map((d) => `${d}/`).join("");
  return (
    <div>
    <section ref={root} className="theme-dark relative h-[100svh] overflow-hidden" aria-label="What I do">
      <div aria-hidden className="absolute inset-0 flex flex-col justify-center gap-2 text-[color:var(--bg-elev)]">
        {[0, 1, 2].map((i) => (
          <Marquee key={i} duration={50 + i * 10} reverse={i % 2 === 1} className="t-mono-xl text-[clamp(4rem,13vw,13rem)] text-[#232327]">
            <span className="pr-[0.3em]">{row}</span>
          </Marquee>
        ))}
      </div>
      <div className="sr-media absolute inset-0 overflow-hidden">
        <Image src={hero.cover} alt={`${hero.title} — online store`} fill sizes="100vw" className="object-cover" />
        <div className="sr-shade absolute inset-0 bg-black/45" />
      </div>
      <div className="persp-1000 container-x relative z-10 grid h-full w-full grid-cols-2 items-center gap-6 text-white lg:grid-cols-3">
        <ul className="mono space-y-1 text-[0.7rem] text-white/80">{left.map((l) => <li key={l} className="sr-label">{l}</li>)}</ul>
        <p className="sr-title col-span-2 row-start-1 text-center font-display text-[clamp(2.5rem,6.5vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.05em] lg:col-span-1 lg:row-start-auto">
          Built to<br />grow.
        </p>
        <ul className="mono space-y-1 text-right text-[0.7rem] text-white/80">{right.map((l) => <li key={l} className="sr-label">{l}</li>)}</ul>
      </div>
    </section>
    </div>
  );
}
