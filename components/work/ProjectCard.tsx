import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { Tag } from "../ui/Tag";

export function ProjectCard({ p, tall }: { p: Project; tall?: boolean }) {
  return (
    <Link href={`/work/${p.slug}`} data-cursor="VIEW" className="group block">
      <div className={`relative overflow-hidden bg-elev ${tall ? "aspect-[4/5]" : "aspect-[16/10]"}`}>
        <Image src={p.cover} alt={`${p.title} — ${p.category}`} fill sizes="(min-width:1024px) 45vw, 92vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-3xl">{p.title}</h2>
          <p className="mt-1 text-muted">{p.category}</p>
        </div>
        <p className="mono shrink-0 text-muted">{p.year}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">{p.tags.slice(0, 3).map((t) => <Tag key={t}>{t}</Tag>)}</div>
    </Link>
  );
}
