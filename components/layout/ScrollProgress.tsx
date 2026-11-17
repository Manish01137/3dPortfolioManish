"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.set(bar.current, { scaleX: 0, transformOrigin: "left" });
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => { gsap.set(bar.current, { scaleX: s.progress }); } });
  });
  return <div ref={bar} aria-hidden className="fixed left-0 top-0 z-[95] h-[2px] w-full bg-accent" />;
}
