"use client";
import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP, fontsReady, prefersReducedMotion } from "@/lib/gsap";
import { whenReady } from "@/lib/ready";

type Props = { as?: ElementType; className?: string; children: React.ReactNode; trigger?: "scroll" | "ready"; delay?: number };

/** Line-masked reveal. `trigger="ready"` waits for the preloader. */
export function SplitHeading({ as: Tag = "h2", className = "", children, trigger = "scroll", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) { el.style.visibility = "visible"; return; }
    let split: SplitText | undefined;
    let off = () => {};
    let cancelled = false;
    fontsReady().then(() => {
      if (cancelled) return;
      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          el.style.visibility = "visible";
          const tween = gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.09,
            delay,
            paused: trigger === "ready",
            scrollTrigger: trigger === "scroll" ? { trigger: el, start: "top 88%", once: true } : undefined,
          });
          if (trigger === "ready") off = whenReady(() => tween.play());
          return tween;
        },
      });
    });
    return () => { cancelled = true; off(); split?.revert(); };
  }, { scope: ref });
  // "ready" headings paint immediately on first visit (under the preloader → early LCP);
  // on repeat visits html[data-pre="seen"] hides them until split.
  return <Tag ref={ref} className={`${trigger === "ready" ? "split-ready" : "js-split"} ${className}`}>{children}</Tag>;
}
