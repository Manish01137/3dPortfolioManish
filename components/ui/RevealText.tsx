"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, fontsReady, prefersReducedMotion } from "@/lib/gsap";

/** Word-by-word opacity reveal bound to scroll position. */
export function RevealText({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP((_ctx, contextSafe) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let split: SplitText | undefined;
    let cancelled = false;
    fontsReady().then(contextSafe!(() => {
      if (cancelled) return;
      split = SplitText.create(el, { type: "words", aria: "none", wordsClass: "rv-word" });
      // --p drives a muted → fg colour mix in CSS (muted passes WCAG AA; follows theme switches)
      gsap.fromTo(split.words, { "--p": 0 }, { "--p": 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: true } });
    }));
    return () => { cancelled = true; split?.revert(); };
  }, { scope: ref });
  return <p ref={ref} className={className}>{children}</p>;
}
