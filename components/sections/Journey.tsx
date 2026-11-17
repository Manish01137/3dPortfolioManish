import { Eyebrow } from "../ui/Eyebrow";
import { SplitHeading } from "../ui/SplitHeading";
import { experience, education } from "@/content/resume";
import { favouriteTools } from "@/content/tools";
import { Tilt } from "../ui/Tilt";

type Entry = { n: string; range: string; title: string; org: string; href: string; text: string };

const List = ({ label, items }: { label: string; items: Entry[] }) => (
  <div>
    <p className="mono mb-6 text-muted">{label}</p>
    <ol className="border-t border-line">
      {items.map((e) => (
        <li key={e.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-7">
          <span className="mono pt-1 text-accent">{e.n}</span>
          <div>
            <p className="mono text-muted">{e.range}</p>
            <h3 className="font-display mt-2 text-2xl font-medium tracking-[-0.03em]">{e.title}</h3>
            <p className="mt-1">
              {e.href ? <a href={e.href} target="_blank" rel="noopener noreferrer" className="underline decoration-[var(--line)] underline-offset-4 hover:text-accent">{e.org} ↗</a> : e.org}
            </p>
            <p className="mt-2 text-muted">{e.text}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>
);

const initials = (t: string) => t.replace(/[^A-Za-z ]/g, " ").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

export function Journey({ eyebrow = true }: { eyebrow?: boolean }) {
  return (
    <section id="journey" className="section container-x scroll-mt-20">
      {eyebrow && <Eyebrow n="05">Journey</Eyebrow>}
      <SplitHeading className="t-h2 mt-6">The road so far.</SplitHeading>
      <div className="mt-16 grid gap-14 lg:grid-cols-2">
        <List label="Experience" items={experience} />
        <List label="Education & certifications" items={education} />
      </div>
      <p className="mono mb-6 mt-20 text-muted">Favourite tools</p>
      <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6 xl:grid-cols-12">
        {favouriteTools.map((t) => (
          <li key={t}>
            <Tilt max={14} scale={1.06} inner="flex aspect-square flex-col items-center justify-center gap-2 border border-line bg-elev p-2 text-center transition-colors duration-300 group-hover:border-accent">
              <span aria-hidden className="font-mono text-xl text-fg transition-colors [transform:translateZ(30px)] group-hover:text-accent sm:text-2xl">{initials(t)}</span>
              <span className="mono text-[0.58rem] leading-tight text-muted [transform:translateZ(18px)]">{t}</span>
            </Tilt>
          </li>
        ))}
      </ul>
    </section>
  );
}
