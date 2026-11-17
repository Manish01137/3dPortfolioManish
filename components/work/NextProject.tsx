import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

export function NextProject({ p }: { p: Project }) {
  return (
    <Link href={`/work/${p.slug}`} data-cursor="NEXT" className="group relative block overflow-hidden border-t border-line">
      <Image src={p.cover} alt="" fill sizes="100vw" className="object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-30 scale-110" />
      <div className="container-x relative py-24 sm:py-32">
        <p className="mono text-muted">Next project →</p>
        <p className="font-display mt-4 text-[clamp(3rem,10vw,10rem)] font-semibold leading-[0.9] tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-4">{p.title}</p>
        <p className="mt-4 text-muted">{p.category}</p>
      </div>
    </Link>
  );
}
