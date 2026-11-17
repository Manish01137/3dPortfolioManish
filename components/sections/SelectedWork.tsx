"use client";
import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Eyebrow } from "../ui/Eyebrow";
import { SplitHeading } from "../ui/SplitHeading";
import { ProjectTile } from "../work/ProjectTile";
import { Scramble } from "../ui/Scramble";
import { featured, projects } from "@/content/projects";

// Editorial staggered layout (12-col): alternating wide/narrow tiles with vertical offsets.
const layout = [
  "lg:col-span-5",
  "lg:col-span-6 lg:col-start-7 lg:mt-40",
  "lg:col-span-7",
  "lg:col-span-4 lg:col-start-9 lg:mt-56",
  "lg:col-span-5 lg:col-start-2",
  "lg:col-span-5 lg:col-start-8 lg:mt-32",
];

export function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.set(".work-tile", { opacity: 0, y: 80, rotationX: 12, transformPerspective: 1200 });
    ScrollTrigger.batch(".work-tile", {
      start: "top 88%",
      once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, rotationX: 0, duration: 1.3, ease: "expo.out", stagger: 0.12 }),
    });
  }, { scope: root });

  return (
    <section id="work" ref={root} className="section scroll-mt-20">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow n="02">Selected work</Eyebrow>
          <SplitHeading className="t-h2 mt-6 max-w-4xl">Projects with real numbers behind them.</SplitHeading>
        </div>
        <Link href="/work" className="mono inline-flex min-h-11 items-center gap-2 hover:text-accent">
          <Scramble text={`All projects (${projects.length})`} /> →
        </Link>
      </div>
      <ul className="container-x mt-20 grid gap-x-10 gap-y-20 md:grid-cols-2 lg:grid-cols-12">
        {featured.map((p, i) => (
          <li key={p.slug} className={`work-tile ${layout[i % layout.length]}`}>
            <ProjectTile p={p} index={i} total={featured.length} aspect={i % 3 === 2 ? "aspect-[16/10]" : "aspect-[4/3]"} />
          </li>
        ))}
      </ul>
    </section>
  );
}
