"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion, isFinePointer } from "@/lib/gsap";
import { site } from "@/content/site";
import { featured } from "@/content/projects";
import { pad } from "@/lib/utils";
import { scrollToTop } from "./SmoothScroll";
import { Scramble } from "../ui/Scramble";

export function Footer() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const footer = root.current!;
    const wrap = footer.querySelector<HTMLElement>(".wordmark-wrap")!;
    const cells = gsap.utils.toArray<HTMLElement>(".wordmark-cell", footer);
    const chars = gsap.utils.toArray<HTMLElement>(".wordmark-char", footer);

    // ── Cursor proximity: letters near the pointer swell in weight, lift and tint toward the accent ──
    const n = chars.length;
    const cur = new Float32Array(n); // eased 0..1 influence per letter
    const centers = new Float32Array(n); // letter centre x, relative to the wordmark
    const ptr = { x: -1e5, y: -1e5, on: false }; // pointer, relative to the wordmark
    let rowY = 0, sigma = 1, live = false, running = false;

    const measure = () => {
      const r = wrap.getBoundingClientRect();
      cells.forEach((c, i) => { const b = c.getBoundingClientRect(); centers[i] = b.left - r.left + b.width / 2; rowY = b.top - r.top + b.height / 2; });
      sigma = Math.max(40, r.width * 0.075); // spread of the bulge ≈ 2 letters
    };

    const tick = () => {
      const ease = 1 - Math.pow(0.82, gsap.ticker.deltaRatio()); // frame-rate independent smoothing
      const dy = ptr.y - rowY;
      const vy = ptr.on ? Math.exp(-(dy * dy) / (2 * (sigma * 2.2) ** 2)) : 0; // fade as the pointer moves away vertically
      let moving = ptr.on;
      for (let i = 0; i < n; i++) {
        const dx = ptr.x - centers[i];
        const target = vy * Math.exp(-(dx * dx) / (2 * sigma * sigma));
        const v = cur[i] + (target - cur[i]) * ease;
        if (Math.abs(v - cur[i]) < 0.0005 && target < 0.001) { if (cur[i] !== 0) { cur[i] = 0; paint(i, 0); } continue; }
        cur[i] = v; moving = true; paint(i, v);
      }
      if (!moving) { gsap.ticker.remove(tick); running = false; }
    };
    const paint = (i: number, v: number) => {
      const s = chars[i].style;
      s.fontWeight = String(Math.round(400 + 400 * v));
      s.color = v < 0.002 ? "" : `color-mix(in srgb, var(--accent) ${(v * 100).toFixed(1)}%, var(--fg))`;
      cells[i].style.transform = v < 0.002 ? "" : `translateY(${(-12 * v).toFixed(2)}%) scaleY(${(1 + 0.08 * v).toFixed(3)})`;
    };
    const start = () => { if (!running) { running = true; gsap.ticker.add(tick); } };

    const move = (e: PointerEvent) => {
      if (!live) return;
      const r = wrap.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.on = true;
      start();
    };
    const leave = () => { ptr.on = false; start(); };

    // A single weight wave sweeps across once the reveal lands, hinting that the letters are alive (also the touch-screen version).
    const wave = () => {
      measure();
      ptr.y = rowY;
      gsap.fromTo(ptr, { x: -sigma * 3 }, {
        x: wrap.clientWidth + sigma * 3, duration: 1.8, ease: "power2.inOut",
        onStart: () => { ptr.on = true; start(); },
        onComplete: () => { ptr.on = false; live = isFinePointer(); },
      });
    };

    gsap.from(chars, {
      yPercent: 110, duration: 1.2, ease: "power4.out", stagger: 0.04,
      scrollTrigger: { trigger: wrap, start: "top 95%", once: true },
      // the clip only exists for the rise-in; let bolder/lifted glyphs breathe afterwards
      onComplete: () => { gsap.set(cells, { overflow: "visible" }); wave(); },
    });

    footer.addEventListener("pointermove", move);
    footer.addEventListener("pointerleave", leave);
    wrap.addEventListener("pointerenter", measure);
    window.addEventListener("resize", measure);
    return () => {
      gsap.ticker.remove(tick);
      footer.removeEventListener("pointermove", move);
      footer.removeEventListener("pointerleave", leave);
      wrap.removeEventListener("pointerenter", measure);
      window.removeEventListener("resize", measure);
    };
  }, { scope: root });
  const col = "mono text-muted mb-5";
  return (
    <footer ref={root} className="pt-24" aria-label="Footer">
      <div className="container-x grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-2">
          <p className={col}>/ Discover</p>
          <ul className="space-y-1.5 text-lg">{site.nav.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-accent">{l.label}</Link></li>)}</ul>
        </div>
        <div className="lg:col-span-3">
          <p className={col}>/ Contact</p>
          <ul className="space-y-1.5 text-lg">
            <li><a href={`mailto:${site.email}`} className="break-all hover:text-accent">{site.email}</a></li>
            <li><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-accent">{site.phone}</a></li>
            <li className="text-muted">{site.location}</li>
          </ul>
          <p className={`${col} mt-10`}>/ Projects</p>
          <ul className="space-y-1.5">{featured.slice(0, 5).map((p) => <li key={p.slug}><Link href={`/work/${p.slug}`} className="hover:text-accent">{p.title}</Link></li>)}</ul>
        </div>
        <div className="sm:col-span-2 lg:col-span-6 lg:col-start-7">
          <p className={col}>/ Elsewhere</p>
          <ul className="border-t border-line">
            {site.socials.map((s, i) => (
              <li key={s.label} className="border-b border-line">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 items-center justify-between gap-4 py-3 text-lg hover:text-accent">
                  <span><span className="mono mr-4 text-muted">[{pad(i + 1)}]</span><Scramble text={s.label} /></span>
                  <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-end">
            <button onClick={scrollToTop} className="mono inline-flex min-h-11 items-center gap-2 hover:text-accent"><Scramble text="Back to top" /> <ArrowUp size={14} /></button>
          </div>
        </div>
      </div>
      {/* top padding leaves headroom for letters lifting under the cursor */}
      <div className="wordmark-wrap container-x mt-10 overflow-hidden pt-[2.5vw] 2xl:pt-10">
        <p aria-hidden className="t-mono-xl flex select-none justify-between whitespace-nowrap text-[11vw] leading-[0.8] 2xl:text-[min(11vw,11.5rem)]">
          {"MANISH BENIWAL".split("").map((c, i) => (
            <span key={i} className="wordmark-cell inline-block origin-bottom overflow-hidden pb-[0.04em]"><span className="wordmark-char inline-block">{c === " " ? " " : c}</span></span>
          ))}
        </p>
      </div>
      <div className="container-x flex flex-wrap items-center justify-between gap-4 py-6">
        <p className="mono text-muted">© 2026 Manish Beniwal. All rights reserved.</p>
        <p className="mono text-muted">Designed &amp; built by Manish Beniwal</p>
      </div>
    </footer>
  );
}
