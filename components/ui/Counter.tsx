"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export function Counter({ to, text, suffix = "" }: { to?: number; text?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (to === undefined || !ref.current || prefersReducedMotion()) return;
    const o = { v: 0 };
    ref.current.textContent = "0";
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.to(o, { v: to, duration: 1.8, ease: "power2.out", onUpdate: () => { if (ref.current) ref.current.textContent = String(Math.round(o.v)); } }),
    });
  }, { scope: ref });
  return (
    <span className="tabular-nums">
      <span ref={ref}>{to !== undefined ? to : text}</span>
      {suffix}
    </span>
  );
}
