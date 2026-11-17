"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { setReady } from "@/lib/ready";

export function Preloader() {
  const [show, setShow] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    let seen = false;
    try { seen = !!sessionStorage.getItem("s360-pre"); } catch {}
    if (seen || prefersReducedMotion()) { setShow(false); setReady(); return; }
    const o = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => { try { sessionStorage.setItem("s360-pre", "1"); } catch {} document.documentElement.dataset.pre = "seen"; setShow(false); setReady(); },
    });
    tl.from(".pre-letter", { yPercent: 110, duration: 0.7, stagger: 0.05, ease: "power4.out" }, 0)
      .to(o, { v: 100, duration: 1.2, ease: "power2.inOut", onUpdate: () => { if (count.current) count.current.textContent = String(Math.round(o.v)).padStart(3, "0"); } }, 0)
      .to(".pre-word", { opacity: 0, duration: 0.2 }, 1.2)
      .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "power4.inOut" }, 1.1);
    // Safety net: never block longer than ~1.8s
    const kill = setTimeout(() => tl.progress(1), 1800);
    return () => clearTimeout(kill);
  }, { scope: root });

  if (!show) return null;
  const word = "Manish Beniwal";
  return (
    <div ref={root} className="fixed inset-0 z-[300] bg-bg" style={{ clipPath: "inset(0 0 0% 0)" }} aria-hidden>
      <div className="pre-word absolute inset-0 grid place-items-center">
        <p className="font-display flex text-[clamp(2.2rem,8vw,7rem)] font-medium tracking-[-0.05em]">
          {word.split("").map((c, i) => (
            <span key={i} className="overflow-hidden"><span className="pre-letter inline-block">{c === " " ? "\u00A0" : c}</span></span>
          ))}
          <span className="overflow-hidden"><span className="pre-letter inline-block text-accent">*</span></span>
        </p>
      </div>
      <p className="mono absolute bottom-6 right-[var(--pad)] text-muted">
        <span ref={count} className="font-display text-[clamp(2rem,6vw,4rem)] normal-case text-fg tabular-nums">000</span>%
      </p>
    </div>
  );
}
