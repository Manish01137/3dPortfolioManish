"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function Marquee({ children, duration = 40, reverse, pausable, className }: { children: React.ReactNode; duration?: number; reverse?: boolean; pausable?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Pause while off screen so idle marquees don't cost a style pass every frame (see .marquee-wrap[data-off] in globals.css).
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => el.toggleAttribute("data-off", !e.isIntersecting), { rootMargin: "100px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("marquee-wrap overflow-hidden", className)}>
      <div className={cn("marquee-track", reverse && "rev", pausable && "pausable")} style={{ ["--dur" as string]: `${duration}s` }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
