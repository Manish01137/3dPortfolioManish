"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Eyebrow } from "../ui/Eyebrow";
import { SplitHeading } from "../ui/SplitHeading";
import { process } from "@/content/stats";

export function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => track.current!.scrollWidth - window.innerWidth + 0;
      gsap.to(track.current, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: ".pin-area", start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true },
      });
    });
    return () => mm.revert();
  }, { scope: root });
  return (
    <section ref={root} id="process" aria-label="Process" className="scroll-mt-20">
      <div className="pin-area flex flex-col justify-center overflow-hidden py-24 lg:min-h-screen lg:py-0">
        <div className="container-x w-full">
          <Eyebrow n="04">Process</Eyebrow>
          <SplitHeading className="t-h2 mt-6 max-w-4xl">Three steps. Two to four weeks.</SplitHeading>
        </div>
        <div className="container-x mt-12 w-full lg:!max-w-none lg:!px-[var(--pad)]">
          <div ref={track} className="hscroll-track">
            {process.map((p, i) => (
              <article key={p.n} className="hscroll-panel border border-line bg-elev p-8 sm:p-10 lg:mr-6 lg:flex lg:min-h-[48vh] lg:flex-col lg:justify-between">
                <div className="flex items-start justify-between">
                  <span className="font-display text-[clamp(4rem,10vw,9rem)] font-semibold leading-none tracking-tighter text-accent">{p.n}</span>
                  <span className="mono rounded-full border border-line px-4 py-2">{p.time}</span>
                </div>
                <div className="mt-10">
                  <h3 className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-3 max-w-md text-muted">{p.text}</p>
                  <div className="mt-8 h-px w-full bg-line" aria-hidden><div className="h-px bg-accent" style={{ width: `${(i + 1) * 33.3}%` }} /></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
