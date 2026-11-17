import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col justify-center gap-12 overflow-hidden pt-24">
      <div className="container-x">
        <p className="mono text-muted">Error — page not found</p>
        <h1 className="font-display mt-4 text-[clamp(8rem,32vw,28rem)] font-semibold leading-[0.8] tracking-[-0.06em]">4<span className="text-accent">0</span>4</h1>
      </div>
      <Marquee duration={25} className="border-y border-line py-4 font-display text-[clamp(1.5rem,4vw,3rem)] font-semibold">
        {Array.from({ length: 4 }).map((_, i) => <span key={i} className="mx-6">This page took a wrong turn <span className="text-accent">✦</span></span>)}
      </Marquee>
      <div className="container-x"><Button href="/" variant="solid">← Back home</Button></div>
    </section>
  );
}
