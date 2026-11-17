import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "../ui/Eyebrow";
import { SplitHeading } from "../ui/SplitHeading";
import { freeTools } from "@/content/tools";
import { pad } from "@/lib/utils";

export function FreeTools() {
  return (
    <section aria-label="Free tools" className="section">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow n="07">Free tools</Eyebrow>
          <SplitHeading className="t-h2 mt-6">Useful before we even talk.</SplitHeading>
        </div>
        <p className="mono text-muted">Free on shape-360.com · scroll →</p>
      </div>
      <ul className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--pad)] pb-4 [scrollbar-width:thin]" data-cursor="DRAG" data-lenis-prevent-wheel>
        {freeTools.map((t, i) => (
          <li key={t.title} className="snap-start">
            <a href={t.href} target="_blank" rel="noopener noreferrer" className="group flex h-64 w-[78vw] max-w-[340px] flex-col justify-between border border-line bg-elev p-7 transition-colors hover:border-accent">
              <div className="flex items-center justify-between">
                <span className="mono text-muted">[{pad(i + 1)}]</span>
                <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">{t.title}</h3>
                <p className="mt-2 text-sm text-muted">{t.text}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
