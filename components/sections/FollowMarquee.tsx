import { Marquee } from "../ui/Marquee";
import { site, socialHref } from "@/content/site";

const Row = () => (
  <>
    <span className="mx-6 font-display">Follow me</span>
    <span className="text-accent" aria-hidden>✦</span>
    {site.socials.slice(0, 4).map((s) => (
      <span key={s.label} className="flex items-center">
        <a href={socialHref(s.href)} target="_blank" rel="noopener noreferrer" className="mx-6 font-display transition-colors hover:text-accent">{s.label}</a>
        <span className="text-accent" aria-hidden>✦</span>
      </span>
    ))}
  </>
);

export function FollowMarquee() {
  const cls = "text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-tight tracking-tight";
  return (
    <section aria-label="Follow me" className="space-y-2 border-y border-line py-8">
      <Marquee duration={35} pausable className={cls}><Row /></Marquee>
      <Marquee duration={35} reverse pausable className={`${cls} text-muted`}><Row /></Marquee>
    </section>
  );
}
