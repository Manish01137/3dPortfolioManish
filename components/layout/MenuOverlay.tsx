"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMenu } from "@/lib/menu";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/content/site";
import { Scramble } from "../ui/Scramble";
import { projects } from "@/content/projects";
import { pad } from "@/lib/utils";

const thumbs = ["joinetra", "veloura-jewels", "mershiltech", "zevolution", "indicolas"].map((s) => projects.find((p) => p.slug === s)!);

export function MenuOverlay() {
  const { open, setOpen } = useMenu();
  const path = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const first = useRef(true);

  // close on route change
  useEffect(() => { setOpen(false); }, [path, setOpen]);

  useEffect(() => {
    const el = root.current!;
    const reduce = prefersReducedMotion();
    if (open) {
      el.style.visibility = "visible";
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
      const focusFirst = () => (el.querySelector("a") as HTMLElement | null)?.focus({ preventScroll: true });
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: reduce ? 0 : 0.8, ease: "power4.inOut", onComplete: focusFirst });
      if (!reduce) {
        gsap.fromTo(".menu-line", { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.07, ease: "power4.out", delay: 0.35 });
        gsap.fromTo(".menu-foot", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.7, stagger: 0.08 });
      }
    } else if (!first.current) {
      window.__lenis?.start();
      document.body.style.overflow = "";
      gsap.to(el, { clipPath: "inset(0 0 100% 0)", duration: reduce ? 0 : 0.6, ease: "power4.inOut", onComplete: () => { el.style.visibility = "hidden"; } });
    }
    first.current = false;
  }, [open]);

  // Esc + focus trap
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); (document.querySelector("[aria-controls='menu-overlay']") as HTMLElement)?.focus(); }
      if (e.key !== "Tab") return;
      const f = [...(root.current?.querySelectorAll<HTMLElement>("a[href], button")) ?? [], document.querySelector<HTMLElement>("[aria-controls='menu-overlay']")!].filter(Boolean);
      const idx = f.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && idx <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && idx === f.length - 1) { e.preventDefault(); f[0].focus(); }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, setOpen]);

  return (
    <div
      id="menu-overlay"
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      style={{ visibility: "hidden", clipPath: "inset(0 0 100% 0)" }}
      className="fixed inset-0 z-50 overflow-hidden bg-bg"
    >
      {/* animated gradient backdrop (video-free fallback) */}
      <div aria-hidden className="absolute inset-0 opacity-60" style={{ background: "linear-gradient(120deg, color-mix(in srgb, var(--accent) 22%, var(--bg)), var(--bg) 40%, color-mix(in srgb, var(--accent) 10%, var(--bg)) 80%)", backgroundSize: "300% 300%", animation: "gradient-pan 16s ease infinite" }} />
      <div className="container-x relative flex h-full flex-col justify-between pb-8 pt-28">
        <nav aria-label="Primary" className="my-auto">
          <ul>
            {site.nav.map((l, i) => (
              <li key={l.href} className="overflow-hidden" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={path === l.href ? "page" : undefined}
                  className="menu-line group flex items-baseline gap-4 py-1 font-display text-[clamp(2.5rem,12vw,8.5rem)] font-medium leading-[1.02] tracking-[-0.05em] transition-all duration-300 hover:translate-x-3 hover:text-accent"
                >
                  <span className="mono text-muted text-xs sm:text-sm">/ {pad(i + 1)}</span>
                  {l.label}
                  {path === l.href && <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div aria-hidden className="pointer-events-none absolute right-[var(--pad)] top-1/2 hidden w-[26vw] max-w-md -translate-y-1/2 lg:block">
          {thumbs.map((p, i) => (
            <Image key={p.slug} src={p.cover} alt="" width={800} height={500} sizes="26vw" className={`absolute inset-x-0 top-0 aspect-[16/10] w-full object-cover transition-all duration-500 ${hover === i ? "scale-100 opacity-100" : "scale-95 opacity-0"}`} />
          ))}
        </div>
        <div className="menu-foot grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
          <div>
            <p className="mono text-muted">Say hello</p>
            <a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a><br />
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-accent">{site.phone}</a>
          </div>
          <div>
            <p className="mono text-muted">Social</p>
            <p className="flex flex-wrap gap-x-4">
              {site.socials.map((s) => <a key={s.label} href={s.href} className="mono hover:text-accent" target="_blank" rel="noopener noreferrer"><Scramble text={`${s.label} ↗`} /></a>)}
            </p>
          </div>
          <p className="max-w-xs text-muted sm:text-right sm:ml-auto">{site.menuTagline}</p>
        </div>
      </div>
    </div>
  );
}
