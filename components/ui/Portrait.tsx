"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { whenReady } from "@/lib/ready";
import { cn } from "@/lib/utils";

/** Portrait with a curtain reveal (after preloader / page transition) and a gentle scroll parallax. */
export function Portrait({ className, priority, sizes = "(min-width:1024px) 40vw, 92vw" }: { className?: string; priority?: boolean; sizes?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP((_ctx, contextSafe) => {
    const el = ref.current!;
    const img = el.querySelector("img");
    if (prefersReducedMotion() || !img) return;
    gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(img, { scale: 1.35 });
    const off = whenReady(contextSafe!(() => {
      gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", delay: 0.1 });
      gsap.to(img, { scale: 1.12, duration: 1.8, ease: "expo.out", delay: 0.1 });
    }));
    gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    return off;
  }, { scope: ref });
  return (
    <div ref={ref} className={cn("relative aspect-[4/5] overflow-hidden bg-[#141414]", className)}>
      <Image src="/me.jpg" alt="Portrait of Manish Beniwal" fill priority={priority} sizes={sizes} className="object-cover object-top" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  );
}
