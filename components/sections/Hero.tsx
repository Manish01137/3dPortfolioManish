"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, isFinePointer, prefersReducedMotion, fontsReady } from "@/lib/gsap";
import { whenReady } from "@/lib/ready";
import { Button } from "../ui/Button";
import { CircularBadge } from "../ui/CircularBadge";
import { site } from "@/content/site";
import { getProject } from "@/content/projects";

// Real screenshots only (sites that rendered), mixing desktop + mobile captures.
const shots = [
  ["veloura-jewels", "cover"], ["joinetra", "cover"], ["indicolas", "cover"], ["zevolution", "cover"],
  ["mershiltech", "cover"], ["staylia-dxb", "cover"], ["joinetra", "mobile"], ["zeqon", "cover"],
  ["go-everywhere-trips", "cover"], ["glowrithm-media", "cover"], ["veloura-jewels", "mobile"], ["quick-solutions", "cover"],
].map(([slug, kind]) => {
  const p = getProject(slug)!;
  return { src: kind === "cover" ? p.cover : p.mobile, alt: `${p.title} ${kind === "cover" ? "desktop" : "mobile"} screenshot`, portrait: kind === "mobile" };
});

// Where each card sits in the tunnel (vw / vh offsets from centre). Kept off the centre line so the name stays readable.
const spots = [
  [-30, -20], [31, -22], [-34, 22], [30, 24], [-10, -34], [12, 33],
  [-42, 0], [41, 2], [-20, 34], [22, -36], [-5, 36], [6, -32],
];

const DEPTH = 3800; // spacing of the tunnel
const TRAVEL = DEPTH + 1100; // how far cards travel over the pinned scroll

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const world = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = root.current!;
    const cards = gsap.utils.toArray<HTMLElement>(".h3d-card", section);
    const reduce = prefersReducedMotion();
    const mobile = window.innerWidth < 768;
    const spread = mobile ? 1.25 : 1;
    const base = cards.map((_, i) => -300 - i * (DEPTH / cards.length));
    const state = { p: 0, intro: reduce ? 0 : 1, t: 0 };
    gsap.set(cards, { xPercent: -50, yPercent: -50, force3D: true });

    const render = () => {
      const vw = window.innerWidth / 100, vh = window.innerHeight / 100;
      cards.forEach((c, i) => {
        const z = base[i] + state.p * TRAVEL - state.intro * 1600;
        const op = z < -3300 ? Math.max(0, (z + 4300) / 1000) : z > 450 ? Math.max(0, 1 - (z - 450) / 300) : 1;
        const bob = reduce ? 0 : Math.sin(state.t * 0.6 + i) * 8;
        gsap.set(c, { x: spots[i][0] * vw * spread, y: spots[i][1] * vh * spread + bob, z, opacity: op, visibility: op <= 0.01 ? "hidden" : "visible" });
      });
    };
    render();

    if (reduce) {
      section.querySelector<HTMLElement>(".hero-name")!.style.visibility = "visible";
      return;
    }

    // idle float + render loop while the hero is on screen
    const tick = (time: number) => { state.t = time; render(); };
    ScrollTrigger.create({
      trigger: section, start: "top bottom", end: "bottom top",
      onToggle: (s) => (s.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
    });

    // mouse → rotate the whole 3D world
    if (isFinePointer()) {
      const ry = gsap.quickTo(world.current, "rotationY", { duration: 1.2, ease: "power3" });
      const rx = gsap.quickTo(world.current, "rotationX", { duration: 1.2, ease: "power3" });
      const move = (e: PointerEvent) => { ry((e.clientX / innerWidth - 0.5) * 14); rx(-(e.clientY / innerHeight - 0.5) * 10); };
      section.addEventListener("pointermove", move);
    }

    let split: SplitText | undefined, outro: SplitText | undefined;
    let off = () => {};
    fontsReady().then(() => {
      const h1 = section.querySelector<HTMLElement>(".hero-name")!;
      split = SplitText.create(h1, { type: "chars", charsClass: "inline-block" });
      outro = SplitText.create(section.querySelector(".hero-outro p")!, { type: "words", wordsClass: "inline-block", aria: "none" });
      gsap.set(split.chars, { opacity: 0, yPercent: 60, rotationX: -90, transformOrigin: "50% 100% -20px" });
      h1.style.visibility = "visible";
      gsap.set(outro.words, { opacity: 0, y: 30, rotationX: -60 });
      section.querySelector<HTMLElement>(".hero-outro")!.style.opacity = "1";

      // entrance (after the preloader)
      off = whenReady(() => {
        gsap.to(state, { intro: 0, duration: 2.2, ease: "expo.out" });
        gsap.to(split!.chars, { opacity: 1, yPercent: 0, rotationX: 0, duration: 1.2, stagger: 0.035, ease: "expo.out", delay: 0.15 });
        gsap.fromTo(".hero-fade", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08, delay: 0.5, ease: "power3.out", overwrite: "auto" });
        // translate-only (never opacity 0) so the paragraph can register as LCP immediately
        gsap.fromTo(".hero-bottom", { y: 40 }, { y: 0, duration: 1.2, delay: 0.55, ease: "power3.out" });
      });

      // pinned fly-through: name breaks apart, cards rush past, tagline assembles
      // fromTo + immediateRender:false so this scrubbed exit never fights the entrance tween
      const exitChars = split.chars;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", end: "+=220%", pin: true, scrub: 1, refreshPriority: 1, onUpdate: (s) => { state.p = s.progress; } },
      });
      tl.fromTo(exitChars, { opacity: 1, z: 0, rotationX: 0, yPercent: 0 }, { opacity: 0, z: 400, rotationX: 70, yPercent: -40, stagger: { each: 0.02, from: "center" }, duration: 0.35, ease: "power2.in", immediateRender: false }, 0.02)
        .fromTo(".hero-fade, .hero-bottom", { opacity: 1 }, { opacity: 0, duration: 0.2, immediateRender: false }, 0.05)
        .to(outro.words, { opacity: 1, y: 0, rotationX: 0, stagger: 0.03, duration: 0.3, ease: "power3.out" }, 0.5)
        .to({}, { duration: 0.2 });
      ScrollTrigger.refresh();
    });

    return () => { off(); gsap.ticker.remove(tick); split?.revert(); outro?.revert(); };
  }, { scope: root });

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden" aria-label="Introduction">
      {/* 3D tunnel of real project screenshots */}
      <div aria-hidden className="absolute inset-0" style={{ perspective: "900px" }}>
        <div ref={world} className="preserve-3d absolute inset-0">
          {shots.map((s, i) => (
            <div key={i} className={`h3d-card absolute left-1/2 top-1/2 overflow-hidden bg-elev shadow-[0_40px_80px_-30px_rgba(0,0,0,.45)] ${s.portrait ? "aspect-[390/844] w-[22vw] sm:w-[12vw] lg:w-[9vw]" : "aspect-[16/10] w-[46vw] sm:w-[30vw] lg:w-[22vw]"} max-w-[400px]`}>
              <Image src={s.src} alt="" fill sizes="(max-width:768px) 46vw, 22vw" quality={60} className="object-cover object-top" priority={i < 4} />
            </div>
          ))}
        </div>
      </div>
      {/* soft vignette so the name stays legible */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 42% 30% at 50% 50%, color-mix(in srgb, var(--bg) 80%, transparent) 0%, color-mix(in srgb, var(--bg) 35%, transparent) 55%, transparent 100%)" }} />

      <div className="container-x pointer-events-none relative z-10 flex h-full w-full flex-col justify-between pb-6 pt-28">
        <div className="hero-fade flex flex-wrap items-start justify-between gap-4">
          <p className="mono text-muted">[ Developer · E-commerce · AI tools ]<br />Hello! I&apos;m {site.name} —</p>
          <p className="mono pointer-events-auto inline-flex items-center gap-3 rounded-full border border-line bg-bg/70 px-4 py-2 backdrop-blur">
            <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden />
            {site.availability}
          </p>
        </div>

        <div className="relative grid place-items-center text-center">
          <h1 className="hero-name split-ready h-hero persp-1000 !text-[clamp(3.6rem,15vw,15rem)] !leading-[0.86]">
            Manish<br />Beniwal
          </h1>
          <div className="hero-outro persp-1000 absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-0">
            <p className="mx-auto max-w-5xl font-display text-[clamp(2.2rem,6vw,5.75rem)] font-medium leading-[1] tracking-[-0.045em]">
              Websites, stores &amp; AI tools that actually <em className="font-normal text-accent">grow</em> brands.
            </p>
          </div>
        </div>

        <div className="hero-bottom grid items-end gap-6 lg:grid-cols-12">
          <p className="max-w-md text-muted lg:col-span-5">{site.positioning}</p>
          <div className="pointer-events-auto flex flex-wrap gap-3 lg:col-span-4 lg:justify-center">
            <Button href="/contact" variant="solid">Start a project</Button>
            <Button href="#work">See the work ↓</Button>
          </div>
          <div className="hidden items-end justify-end gap-6 lg:col-span-3 lg:flex">
            <span className="mono text-muted">Scroll to explore</span>
            <CircularBadge size={104} />
          </div>
        </div>
      </div>
    </section>
  );
}
