"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, isFinePointer } from "@/lib/gsap";
import { Magnetic } from "../ui/Magnetic";
import { Marquee } from "../ui/Marquee";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

// Real screenshots only for the ring
const ring = ["veloura-jewels", "joinetra", "indicolas", "zevolution", "mershiltech", "staylia-dxb", "zeqon", "go-everywhere-trips", "glowrithm-media", "quick-solutions"]
  .map((s) => projects.find((p) => p.slug === s)!);

/** Dark closing CTA with a rotating 3D ring of real project screenshots. */
export function CTA() {
  const root = useRef<HTMLElement>(null);
  const wheel = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(".cta-line", { yPercent: 110, duration: 1.2, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 70%", once: true } });
    if (prefersReducedMotion()) return;
    // starts paused: the trigger below only plays it while the section is on screen (it used to spin from page load)
    const spin = gsap.to(wheel.current, { rotationY: "-=360", duration: 60, repeat: -1, ease: "none", paused: true });
    let hovering = false; // while the pointer is over the ring it eases to a stop, so cards are easy to click
    // scroll velocity speeds the ring up for a moment
    ScrollTrigger.create({
      trigger: root.current, start: "top bottom", end: "bottom top",
      onUpdate: (s) => {
        if (hovering) return;
        gsap.to(spin, { timeScale: 1 + Math.min(Math.abs(s.getVelocity()) / 250, 6), duration: 0.3, overwrite: true, onComplete: () => { gsap.to(spin, { timeScale: 1, duration: 1.4, ease: "power2.out" }); } });
      },
      onToggle: (s) => (s.isActive ? spin.play() : spin.pause()),
    });
    if (!isFinePointer()) return;
    const el = root.current!;
    const stage = el.querySelector<HTMLElement>(".ring-stage")!;
    const tilt = gsap.quickTo(".ring-tilt", "rotationX", { duration: 1, ease: "power3" });
    const move = (e: PointerEvent) => tilt(-6 - (e.clientY / innerHeight - 0.5) * 12);
    const enter = () => { hovering = true; gsap.to(spin, { timeScale: 0, duration: 0.8, ease: "power3.out", overwrite: true }); };
    const leave = () => { hovering = false; gsap.to(spin, { timeScale: 1, duration: 1.2, ease: "power2.inOut", overwrite: true }); };
    el.addEventListener("pointermove", move);
    stage.addEventListener("pointerenter", enter);
    stage.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerenter", enter);
      stage.removeEventListener("pointerleave", leave);
    };
  }, { scope: root });

  return (
    <section ref={root} aria-label="Start a project" className="theme-dark overflow-hidden pt-[var(--section)]">
      <div className="container-x text-center">
        <p className="mono text-muted"><span aria-hidden>[ </span>Write a line<span aria-hidden> ]</span></p>
        <h2 className="mt-6 font-display text-[clamp(2.8rem,8vw,8.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
          <span className="block overflow-hidden"><span className="cta-line block">Let&apos;s talk about</span></span>
          <span className="block overflow-hidden"><span className="cta-line block">your <em className="font-normal text-accent">project</em></span></span>
        </h2>
        <div className="relative z-10 mt-12 flex justify-center">
          <Magnetic strength={0.4}>
            <Link href="/contact" className="grid h-40 w-40 place-items-center rounded-full bg-accent text-center font-display text-lg font-medium text-[var(--accent-fg)] transition-transform duration-500 hover:scale-110 sm:h-48 sm:w-48">
              Start a<br />project ↗
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* 3D ring */}
      <div className="ring-stage relative mt-4 h-[clamp(260px,34vw,520px)]" style={{ perspective: "1400px", ["--w" as string]: "clamp(150px, 19vw, 300px)" }}>
        <div className="ring-tilt preserve-3d absolute inset-0" style={{ transform: "rotateX(-6deg)" }}>
          <div ref={wheel} className="preserve-3d absolute left-1/2 top-1/2 h-0 w-0">
            {ring.map((p, i) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                data-cursor="OPEN"
                aria-label={p.title}
                className="group absolute block aspect-[16/10] overflow-hidden backface-hidden"
                style={{ width: "var(--w)", left: "calc(var(--w) / -2)", top: "calc(var(--w) * -0.3125)", transform: `rotateY(${(i * 360) / ring.length}deg) translateZ(calc(var(--w) * 1.72))` }}
              >
                <Image src={p.cover} alt="" fill sizes="(max-width:768px) 40vw, 20vw" quality={60} className="object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                <span className="mono absolute bottom-2 left-2 bg-black/70 px-2 py-1 text-[0.6rem] text-white opacity-0 transition-opacity group-hover:opacity-100">{p.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 border-y border-line py-6">
        <Marquee duration={45} className="mono text-sm text-muted sm:text-base">
          {site.serviceMarquee.map((s) => (
            <span key={s} className="flex items-center"><span className="mx-6">{s}</span><span className="text-accent" aria-hidden>✦</span></span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
