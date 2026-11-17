"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Eyebrow } from "../ui/Eyebrow";
import { SplitHeading } from "../ui/SplitHeading";
import { Tag } from "../ui/Tag";
import { Button } from "../ui/Button";
import { featured, projects } from "@/content/projects";
import { pad } from "@/lib/utils";

export function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card.querySelector(".stack-inner"), {
          scale: 0.92, opacity: 0.45, ease: "none",
          scrollTrigger: { trigger: cards[i + 1], start: "top 85%", end: "top 12%", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, { scope: root });
  return (
    <section id="work" ref={root} className="section scroll-mt-20">
      <div className="container-x">
        <Eyebrow n="02">Selected work</Eyebrow>
        <SplitHeading className="t-h2 mt-6 max-w-5xl">Projects with real numbers behind them.</SplitHeading>
      </div>
      <div className="container-x mt-16 space-y-6 lg:space-y-[18vh]">
        {featured.map((p, i) => (
          <article key={p.slug} className="stack-card lg:sticky" style={{ top: `calc(6rem + ${i} * 0.75rem)` }}>
            <Link href={`/work/${p.slug}`} data-cursor="VIEW" className="stack-inner group block origin-top overflow-hidden border border-line bg-elev">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[16/8]">
                <Image src={p.cover} alt={`${p.title} — ${p.category}`} fill sizes="(min-width:1600px) 1500px, 92vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" priority={i === 0} />
              </div>
              <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-6">
                  <p className="mono text-muted">{pad(i + 1)}/{pad(featured.length)} · {p.country} · {p.year}</p>
                  <h3 className="font-display mt-3 text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-none tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.category}</p>
                </div>
                <div className="lg:col-span-4">
                  <p className="mono mb-2 text-muted">Headline</p>
                  <p className="font-display text-xl font-medium text-accent">{p.headline}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                </div>
                <p className="mono lg:col-span-2 lg:text-right">View case study →</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <div className="container-x mt-16 flex justify-center">
        <Button href="/work">All projects ({projects.length}) →</Button>
      </div>
    </section>
  );
}
