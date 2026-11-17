"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Eyebrow } from "../ui/Eyebrow";
import { RevealText } from "../ui/RevealText";
import { Button } from "../ui/Button";
import { site } from "@/content/site";
import { Tilt } from "../ui/Tilt";

export function AboutIntro() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(".portrait", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.3, ease: "power4.out", scrollTrigger: { trigger: ".portrait", start: "top 85%", once: true } });
    gsap.fromTo(".portrait img", { scale: 1.3 }, { scale: 1, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: ".portrait", start: "top 85%", once: true } });
  }, { scope: root });
  return (
    <section id="about" ref={root} className="section container-x scroll-mt-20">
      <Eyebrow n="01">A few words</Eyebrow>
      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <RevealText className="font-display text-[clamp(1.7rem,3.6vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.04em]">
            {`I'm Manish, a developer-founder who builds premium websites, e-commerce stores and AI-powered tools. Since ${site.since} I've shipped 70+ projects with a team of 6+ specialists, for brands in India, UAE, Australia, the US and UK.`}
          </RevealText>
        </div>
        <div className="lg:col-span-4">
          <Tilt max={7}>
            <div className="portrait relative aspect-[4/5] overflow-hidden bg-elev">
              <Image src="/me.jpg" alt="Portrait of Manish Beniwal" fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover" />
            </div>
            <span className="mono absolute -bottom-4 left-4 bg-accent px-3 py-2 text-[var(--accent-fg)] [transform:translateZ(70px)]">Bangalore, IN</span>
          </Tilt>
          <dl className="mt-10 divide-y divide-[var(--line)] border-y border-line text-sm">
            {[["Location", site.location], ["Email", site.email], ["Phone", site.phone]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3"><dt className="mono text-muted">{k}</dt><dd className="text-right">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={site.cvUrl} download variant="solid">Download CV</Button>
            <Button href="/about">More about me</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
