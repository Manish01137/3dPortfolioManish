"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, fontsReady, prefersReducedMotion } from "@/lib/gsap";

/** Word-by-word opacity reveal bound to scroll position. */
export function RevealText({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let split: SplitText | undefined;
    let cancelled = false;
    fontsReady().then(() => {
      if (cancelled) return;
      split = SplitText.create(el, { type: "words", aria: "none" });
      // muted → fg (muted already passes WCAG AA, so text is never unreadable)
      gsap.fromTo(split.words, { color: "var(--muted)" }, { color: "var(--fg)", ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: true } });
    });
    return () => { cancelled = true; split?.revert(); };
  }, { scope: ref });
  return <p ref={ref} className={className}>{children}</p>;
}
