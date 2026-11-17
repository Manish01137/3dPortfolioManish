"use client";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/*";

/** Text that scrambles and re-resolves when its parent link/button is hovered. */
export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    const host = el?.closest("a, button") ?? el;
    if (!el || !host || prefersReducedMotion()) return;
    let id: ReturnType<typeof setInterval> | null = null;
    const run = () => {
      if (id) return;
      let it = 0;
      id = setInterval(() => {
        el.textContent = text.split("").map((ch, i) => (ch === " " ? " " : i < it ? text[i] : POOL[(Math.random() * POOL.length) | 0])).join("");
        it += 1 / 3;
        if (it >= text.length) { clearInterval(id!); id = null; el.textContent = text; }
      }, 30);
    };
    host.addEventListener("mouseenter", run);
    return () => { host.removeEventListener("mouseenter", run); if (id) clearInterval(id); };
  }, [text]);
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden>{text}</span>
    </span>
  );
}
