"use client";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Marquee } from "../ui/Marquee";
import { featured } from "@/content/projects";

export function ImageMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const skew = gsap.quickTo(ref.current, "skewX", { duration: 0.5, ease: "power3.out" });
    ScrollTrigger.create({ onUpdate: (s) => skew(gsap.utils.clamp(-8, 8, s.getVelocity() / -300)) });
  }, { scope: ref });
  return (
    <div className="overflow-hidden py-10" aria-label="Featured project screenshots">
      <div ref={ref}>
      <Marquee duration={60} pausable>
        {featured.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} data-cursor="VIEW" className="mr-4 block w-[68vw] shrink-0 sm:w-[38vw] lg:w-[26vw]" aria-label={p.title}>
            <Image src={p.cover} alt={`${p.title} website screenshot`} width={800} height={500} sizes="(min-width:1024px) 26vw, (min-width:640px) 38vw, 68vw" className="aspect-[16/10] w-full object-cover" />
          </Link>
        ))}
      </Marquee>
      </div>
    </div>
  );
}
