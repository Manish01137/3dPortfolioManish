import Link from "next/link";
import { Magnetic } from "../ui/Magnetic";
import { Marquee } from "../ui/Marquee";
import { site } from "@/content/site";

const Lift = ({ text }: { text: string }) => (
  <>
    {text.split("").map((c, i) =>
      c === " " ? <span key={i}> </span> : (
        <span key={i} aria-hidden className="inline-block transition-transform duration-300 ease-out hover:-translate-y-[0.12em] hover:text-accent">{c}</span>
      ),
    )}
  </>
);

export function CTA() {
  return (
    <section aria-label="Start a project" className="section overflow-hidden">
      <div className="container-x text-center">
        <h2 className="font-display text-[clamp(3rem,10.5vw,12rem)] font-semibold leading-[0.9] tracking-[-0.045em]" aria-label="Got an idea? Let's build it.">
          <span className="block"><Lift text="Got an idea?" /></span>
          <span className="block"><Lift text="Let's build it." /></span>
        </h2>
        <div className="mt-14 flex justify-center">
          <Magnetic strength={0.4}>
            <Link href="/contact" className="grid h-44 w-44 place-items-center rounded-full bg-accent text-center font-display text-lg font-semibold text-[var(--accent-fg)] transition-transform duration-500 hover:scale-110 sm:h-52 sm:w-52">
              Start a<br />project ↗
            </Link>
          </Magnetic>
        </div>
      </div>
      <div className="mt-24 border-y border-line py-6">
        <Marquee duration={45} className="mono text-sm text-muted sm:text-base">
          {site.serviceMarquee.map((s) => (
            <span key={s} className="flex items-center"><span className="mx-6">{s}</span><span className="text-accent" aria-hidden>✦</span></span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
