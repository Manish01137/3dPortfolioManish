"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { holdReady, setReady } from "@/lib/ready";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

const labelFor = (path: string) => {
  const nav = site.nav.find((n) => n.href === path);
  if (nav) return nav.label;
  const slug = path.match(/^\/work\/([^/]+)/)?.[1];
  if (slug) return projects.find((p) => p.slug === slug)?.title ?? "Work";
  return "Loading";
};

/** Smooth-scroll to an in-page anchor through Lenis (falls back to native). Lenis honours the target's scroll-margin-top. */
export function scrollToHash(hash: string, immediate = false) {
  const el = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (!el) return false;
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.6, immediate, force: true });
  else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  return true;
}

const resetScroll = () => {
  window.__lenis?.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
};

/**
 * Global page transition. Intercepts clicks on internal links (in the capture phase, before
 * next/link sees them), covers the screen, scrolls to top while hidden, navigates, then reveals.
 * In-page anchors (#work) scroll smoothly through Lenis instead of jumping.
 */
export function PageTransition() {
  const router = useRouter();
  const path = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const phase = useRef<"idle" | "covering" | "covered">("idle");
  const pendingHash = useRef<string | null>(null);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPath = useRef(path);

  // reveal: run after the new route has committed
  const reveal = useRef(() => {});
  reveal.current = () => {
    const el = root.current;
    if (!el) return;
    if (safety.current) clearTimeout(safety.current);
    const layers = el.querySelectorAll(".pt-layer");
    // two frames: let the new page lay out, then measure triggers from the top
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      setReady();
      gsap.timeline({
        onComplete: () => {
          phase.current = "idle";
          gsap.set(el, { visibility: "hidden" });
          gsap.set(layers, { yPercent: 100, clearProps: "borderRadius" });
          if (pendingHash.current) { scrollToHash(pendingHash.current); pendingHash.current = null; }
        },
      })
        .to(label.current, { yPercent: -110, duration: 0.45, ease: "power3.in" }, 0)
        .to([...layers].reverse(), { yPercent: -100, borderRadius: "0 0 50% 50% / 0 0 14vh 14vh", duration: 0.8, stagger: 0.08, ease: "power4.inOut" }, 0.15);
    }));
  };

  // route committed → reveal (or, for back/forward, just remeasure)
  useEffect(() => {
    if (path === lastPath.current) return;
    lastPath.current = path;
    if (phase.current === "idle") {
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }
    reveal.current();
  }, [path]);

  useEffect(() => {
    const el = root.current!;
    const layers = el.querySelectorAll(".pt-layer");
    gsap.set(layers, { yPercent: 100 });

    const cover = (href: string, pathname: string, hash: string) => {
      phase.current = "covering";
      pendingHash.current = hash || null;
      holdReady();
      router.prefetch(href);
      if (label.current) label.current.firstChild!.textContent = labelFor(pathname);
      gsap.set(el, { visibility: "visible" });
      gsap.timeline({
        onComplete: () => {
          phase.current = "covered";
          resetScroll(); // invisible jump to top: new page's scroll animations start fresh
          router.push(href, { scroll: false });
          // never leave the screen covered if navigation stalls
          safety.current = setTimeout(() => reveal.current(), 6000);
        },
      })
        .fromTo(layers, { yPercent: 100, borderRadius: "50% 50% 0 0 / 14vh 14vh 0 0" }, { yPercent: 0, borderRadius: "0% 0% 0 0 / 0vh 0vh 0 0", duration: 0.7, stagger: 0.08, ease: "power4.inOut" }, 0)
        .fromTo(label.current, { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: "power3.out" }, 0.4);
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      if (a.target && a.target !== "_self") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return; // files (pdf, images…)

      const samePage = url.pathname === location.pathname && url.search === location.search;
      if (samePage) {
        e.preventDefault();
        if (url.hash) scrollToHash(url.hash);
        else window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (prefersReducedMotion()) return; // let next/link navigate normally
      e.preventDefault();
      if (phase.current !== "idle") return;
      cover(url.pathname + url.search, url.pathname, url.hash);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      if (safety.current) clearTimeout(safety.current);
    };
  }, [router]);

  return (
    <div ref={root} aria-hidden className="fixed inset-0 z-[250] overflow-hidden" style={{ visibility: "hidden" }}>
      <div className="pt-layer absolute inset-0 bg-accent will-change-transform" />
      <div className="pt-layer absolute inset-0 grid place-items-center bg-[#0f0f0f] will-change-transform">
        <div className="overflow-hidden px-6 pb-[0.12em]">
          <span ref={label} className="block font-display text-[clamp(2.5rem,8vw,7rem)] font-medium leading-none tracking-[-0.05em] text-[#f4f2ee]">
            Loading<span className="text-[#819ffe]">*</span>
          </span>
        </div>
      </div>
    </div>
  );
}
