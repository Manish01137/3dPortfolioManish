import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { Tilt } from "../ui/Tilt";

/**
 * Project card with a 3D tilt; on hover a phone showing the mobile build lifts off the card (translateZ).
 * On touch devices the phone is simply shown flat.
 */
export function ProjectTile({ p, index, total, aspect = "aspect-[4/3]", headingLevel = "h3", sizes = "(min-width:1024px) 50vw, 92vw" }: { p: Project; index?: number; total?: number; aspect?: string; headingLevel?: "h2" | "h3"; sizes?: string }) {
  const H = headingLevel;
  return (
    <Link href={`/work/${p.slug}`} data-cursor="VIEW" className="block">
      <Tilt>
        <div className={`relative overflow-hidden bg-elev ${aspect}`}>
          <Image src={p.cover} alt={`${p.title} website`} fill sizes={sizes} className="object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
        {/* floating phone */}
        <div className="pointer-events-none absolute bottom-[-7%] right-[6%] aspect-[390/844] w-[21%] overflow-hidden rounded-[12%/5.5%] border-[3px] border-[#121212] bg-black opacity-0 shadow-[0_35px_60px_-15px_rgba(0,0,0,.55)] transition-all duration-700 ease-out [transform:translateZ(0px)_translateY(14%)] group-hover:opacity-100 group-hover:[transform:translateZ(110px)_translateY(0)] [@media(hover:none)]:opacity-100 [@media(hover:none)]:[transform:none]">
          <Image src={p.mobile} alt="" fill sizes="160px" className="object-cover object-top" />
        </div>
        {index !== undefined && (
          <span className="mono absolute left-4 top-4 bg-bg/85 px-2 py-1 text-fg backdrop-blur [transform:translateZ(60px)]">
            {String(index + 1).padStart(2, "0")}{total ? ` / ${String(total).padStart(2, "0")}` : ""}
          </span>
        )}
      </Tilt>
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <H className="font-display text-[clamp(1.4rem,2.2vw,2rem)] font-medium leading-tight tracking-[-0.03em]">{p.title}</H>
          <p className="mt-1 text-accent">{p.headline}</p>
        </div>
        <ul className="mono shrink-0 text-right text-[0.66rem] leading-relaxed text-muted">
          {p.tags.slice(0, 3).map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>
    </Link>
  );
}
