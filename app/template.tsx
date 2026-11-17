"use client";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

let first = true;

/** Accent panel wipe on route change (<700ms). Skipped on the initial load (preloader owns that). */
export default function Template({ children }: { children: React.ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (first || prefersReducedMotion()) { first = false; gsap.set(panel.current, { display: "none" }); return; }
    window.scrollTo(0, 0);
    window.__lenis?.scrollTo(0, { immediate: true });
    gsap.set(panel.current, { display: "block", yPercent: 0 });
    gsap.to(panel.current, { yPercent: -100, duration: 0.65, ease: "power4.inOut", delay: 0.05, onComplete: () => { gsap.set(panel.current, { display: "none" }); } });
  });
  return (
    <>
      <div ref={panel} aria-hidden className="pointer-events-none fixed inset-0 z-[250] bg-accent" style={{ display: "none" }} />
      {children}
    </>
  );
}
