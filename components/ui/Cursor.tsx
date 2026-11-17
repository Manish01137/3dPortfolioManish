"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, isFinePointer } from "@/lib/gsap";

/** Dot + lagging ring. Use data-cursor="VIEW" on any element for a label. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!isFinePointer()) return;
    document.body.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
    const move = (e: PointerEvent) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2, overwrite: "auto" }); };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, input, textarea, select, label");
      const l = t?.dataset.cursor ?? "";
      setLabel(l);
      gsap.to(ring.current, { scale: l ? 1 : t ? 0.6 : 0.35, duration: 0.35, ease: "power3.out" });
    };
    const out = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.documentElement.addEventListener("mouseleave", out);
    gsap.set(ring.current, { scale: 0.35 });
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("mouseleave", out);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[200] hidden mix-blend-difference [@media(hover:hover)_and_(pointer:fine)]:block">
      <div ref={dot} className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-white opacity-0" />
      <div ref={ring} className="absolute -left-12 -top-12 grid h-24 w-24 place-items-center rounded-full bg-white opacity-0">
        <span className="mono text-[0.65rem] font-medium text-black">{label}</span>
      </div>
    </div>
  );
}
