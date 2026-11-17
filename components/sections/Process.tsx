"use client";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Eyebrow } from "../ui/Eyebrow";
import { SplitHeading } from "../ui/SplitHeading";
import { process } from "@/content/stats";

/** Perspective list: rows rise in, then tip back in 3D (rotateX + blur) as they leave the top. */
export function Process() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.utils.toArray<HTMLElement>(".persp-item").forEach((item) => {
      const inner = item.querySelector(".persp-inner");
      gsap.fromTo(inner, { opacity: 0, y: 60, rotationX: -25 }, { opacity: 1, y: 0, rotationX: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: item, start: "top 85%", once: true } });
      gsap.to(inner, {
        rotationX: 32, opacity: 0.25, filter: "blur(4px)", ease: "none",
        scrollTrigger: { trigger: item, start: "top 22%", end: "bottom top", scrub: 0.6 },
      });
    });
  }, { scope: root });
  return (
    <section ref={root} id="process" aria-label="Process" className="section container-x scroll-mt-20">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow n="04">Process</Eyebrow>
          <SplitHeading className="t-h2 mt-6">Three steps. Two to four weeks.</SplitHeading>
        </div>
        <p className="max-w-md self-end text-muted lg:col-span-4 lg:col-start-9">From first call to launch in 2–4 weeks, with a clear owner and a weekly update at every step.</p>
      </div>
      <ol className="mt-16 border-t border-line" style={{ perspective: "1000px" }}>
        {process.map((p) => (
          <li key={p.n} className="persp-item border-b border-line">
            <div className="persp-inner grid origin-[50%_100%] items-center gap-6 py-10 will-change-transform lg:grid-cols-12 lg:py-14">
              <span className="t-mono-xl text-[clamp(4.5rem,11vw,10rem)] text-accent lg:col-span-3">{p.n}</span>
              <h3 className="font-display text-[clamp(1.8rem,3.6vw,3.4rem)] font-medium leading-none tracking-[-0.04em] lg:col-span-4">{p.title}</h3>
              <p className="text-muted lg:col-span-3">{p.text}</p>
              <span className="mono justify-self-start rounded-full border border-line px-4 py-2 lg:col-span-2 lg:justify-self-end">{p.time}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
