"use client";
import { useRef } from "react";
import { gsap, useGSAP, isFinePointer, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * 3D tilt: the card rotates toward the cursor with a moving glare.
 * Direct children can float above the card with `[transform:translateZ(..)]`
 * (the inner element keeps transform-style: preserve-3d — avoid overflow-hidden on it).
 */
export function Tilt({ children, className, inner, max = 9, scale = 1.025, glare = true }: { children: React.ReactNode; className?: string; inner?: string; max?: number; scale?: number; glare?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const h = host.current, c = card.current;
    if (!h || !c || !isFinePointer() || prefersReducedMotion()) return;
    gsap.set(c, { transformPerspective: 1100 });
    const rx = gsap.quickTo(c, "rotationX", { duration: 0.7, ease: "power3" });
    const ry = gsap.quickTo(c, "rotationY", { duration: 0.7, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = h.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * 2 * max);
      rx(-(py - 0.5) * 2 * max);
      c.style.setProperty("--gx", `${px * 100}%`);
      c.style.setProperty("--gy", `${py * 100}%`);
    };
    const enter = () => gsap.to(c, { scale, duration: 0.6, ease: "power3.out" });
    const leave = () => { rx(0); ry(0); gsap.to(c, { scale: 1, duration: 0.8, ease: "power3.out" }); };
    h.addEventListener("pointermove", move);
    h.addEventListener("pointerenter", enter);
    h.addEventListener("pointerleave", leave);
    return () => { h.removeEventListener("pointermove", move); h.removeEventListener("pointerenter", enter); h.removeEventListener("pointerleave", leave); };
  }, { scope: host });
  return (
    <div ref={host} className={cn("tilt-host group", className)}>
      <div ref={card} className={cn("tilt relative", inner)}>
        {children}
        {glare && <span aria-hidden className="tilt-glare" />}
      </div>
    </div>
  );
}
