"use client";
import { useRef } from "react";
import { gsap, useGSAP, isFinePointer, prefersReducedMotion } from "@/lib/gsap";

/** Spawns project thumbnails along the mouse path inside its parent. Desktop only. */
export function CursorTrail({ images }: { images: string[] }) {
  const box = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const host = box.current?.parentElement;
    const layer = box.current;
    if (!host || !layer || !isFinePointer() || prefersReducedMotion()) return;
    let last = { x: 0, y: 0 }, i = 0;
    const move = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (Math.hypot(x - last.x, y - last.y) < 130) return;
      last = { x, y };
      const img = document.createElement("img");
      img.src = images[i++ % images.length];
      img.alt = "";
      img.draggable = false;
      Object.assign(img.style, { position: "absolute", left: "0", top: "0", width: "clamp(140px,14vw,240px)", aspectRatio: "16/10", objectFit: "cover", pointerEvents: "none" });
      layer.appendChild(img);
      gsap.fromTo(img, { x: x - 90, y: y - 60, scale: 0.6, opacity: 0, rotate: gsap.utils.random(-8, 8) }, { scale: 1, opacity: 0.9, duration: 0.4, ease: "power3.out" });
      gsap.to(img, { opacity: 0, scale: 0.8, duration: 0.6, delay: 0.55, ease: "power2.in", onComplete: () => img.remove() });
    };
    host.addEventListener("mousemove", move);
    return () => host.removeEventListener("mousemove", move);
  }, { scope: box });
  return <div ref={box} aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" />;
}
