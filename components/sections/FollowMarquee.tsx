import { Marquee } from "../ui/Marquee";
import { site } from "@/content/site";

const Row = () => (
  <>
    <span className="mx-[0.25em]">Follow me</span>
    <span className="text-accent" aria-hidden>/</span>
    {site.socials.map((s) => (
      <span key={s.label} className="flex items-center">
        <a href={s.href} target="_blank" rel="noopener noreferrer" data-cursor="OPEN" className="mx-[0.25em] transition-colors hover:text-accent">{s.label}</a>
        <span className="text-accent" aria-hidden>/</span>
      </span>
    ))}
  </>
);

export function FollowMarquee() {
  const cls = "t-mono-xl text-[clamp(3rem,9vw,8.5rem)] leading-[1]";
  return (
    <section aria-label="Follow me" className="space-y-1 overflow-hidden border-y border-line py-8">
      <Marquee duration={30} pausable className={cls}><Row /><Row /></Marquee>
      <Marquee duration={30} reverse pausable className={`${cls} text-muted`}><Row /><Row /></Marquee>
    </section>
  );
}
