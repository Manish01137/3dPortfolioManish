"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { gsap, useGSAP, isFinePointer, prefersReducedMotion } from "@/lib/gsap";
import { whenReady } from "@/lib/ready";
import { filters, projects, type FilterKey } from "@/content/projects";
import { ProjectTile } from "./ProjectTile";
import { pad } from "@/lib/utils";

export function WorkExplorer() {
  const [f, setF] = useState<"all" | FilterKey>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [hover, setHover] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const list = projects.filter((p) => f === "all" || p.filter === f);

  useGSAP((_ctx, contextSafe) => {
    if (prefersReducedMotion()) return;
    gsap.set(".work-item", { opacity: 0, y: 50 });
    // wait for the page-transition reveal so the stagger is actually seen
    return whenReady(contextSafe!(() => {
      gsap.to(".work-item", { opacity: 1, y: 0, duration: 1, stagger: 0.06, ease: "expo.out", overwrite: "auto" });
    }));
  }, { dependencies: [f, view], scope: root, revertOnUpdate: true });

  useGSAP(() => {
    if (!isFinePointer()) return;
    gsap.set(float.current, { xPercent: -50, yPercent: -50 });
    const x = gsap.quickTo(float.current, "x", { duration: 0.5, ease: "power3" });
    const y = gsap.quickTo(float.current, "y", { duration: 0.5, ease: "power3" });
    const m = (e: MouseEvent) => { x(e.clientX); y(e.clientY); };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, { scope: root });

  const count = (k: "all" | FilterKey) => projects.filter((p) => k === "all" || p.filter === k).length;
  return (
    <div ref={root} className="container-x pb-[var(--section)]">
      <div className="flex flex-wrap items-center justify-between gap-6 border-y border-line py-5">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {filters.map((x) => (
            <button key={x.key} aria-pressed={f === x.key} onClick={() => setF(x.key)}
              className={`mono min-h-11 rounded-full border px-4 transition-colors ${f === x.key ? "border-accent bg-accent text-[var(--accent-fg)]" : "border-line hover:border-fg"}`}>
              {x.label} <sup>{count(x.key)}</sup>
            </button>
          ))}
        </div>
        <div role="group" aria-label="View mode" className="flex gap-2">
          {(["grid", "list"] as const).map((v) => (
            <button key={v} aria-pressed={view === v} aria-label={`${v} view`} onClick={() => setView(v)}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors ${view === v ? "border-accent text-accent" : "border-line"}`}>
              {v === "grid" ? <LayoutGrid size={18} /> : <List size={18} />}
            </button>
          ))}
        </div>
      </div>

      {view === "grid" ? (
        <ul className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {list.map((p, i) => <li key={p.slug} className={`work-item ${i % 2 === 1 ? "md:mt-24" : ""}`}><ProjectTile p={p} headingLevel="h2" /></li>)}
        </ul>
      ) : (
        <ul className="mt-10 border-t border-line">
          {list.map((p, i) => (
            <li key={p.slug} className="work-item border-b border-line" onMouseEnter={() => setHover(p.slug)} onMouseLeave={() => setHover(null)}>
              <Link href={`/work/${p.slug}`} data-cursor="OPEN" className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-7 md:grid-cols-[3rem_1.4fr_1fr_6rem]">
                <span className="mono text-muted">{pad(i + 1)}</span>
                <span className="font-display text-[clamp(1.6rem,3.6vw,3.2rem)] font-medium leading-none tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-4 group-hover:text-accent">{p.title}</span>
                <span className="hidden text-muted md:block">{p.category}</span>
                <span className="mono text-right text-muted">{p.year}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div ref={float} aria-hidden className={`pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[16/10] w-[340px] overflow-hidden transition-opacity duration-300 [@media(hover:hover)_and_(pointer:fine)]:block ${view === "list" && hover ? "opacity-100" : "opacity-0"}`}>
        {list.map((p) => <Image key={p.slug} src={p.cover} alt="" fill sizes="340px" className={`object-cover ${hover === p.slug ? "opacity-100" : "opacity-0"}`} />)}
      </div>
    </div>
  );
}
