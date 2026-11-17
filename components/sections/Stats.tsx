import { Counter } from "../ui/Counter";
import { stats } from "@/content/stats";
import { site } from "@/content/site";

export function Stats() {
  return (
    <section aria-label="Studio in numbers" className="border-y border-line">
      <div className="container-x">
        <dl className="grid grid-cols-2 lg:grid-cols-5">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col gap-2 border-line py-10 pr-4 ${i % 2 === 0 ? "border-r" : ""} lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 ${i < 4 ? "border-b lg:border-b-0" : ""} ${i === 4 ? "col-span-2 lg:col-span-1" : ""}`}>
              <dd className="font-display whitespace-nowrap text-[clamp(2.6rem,5vw,4.75rem)] font-semibold leading-none tracking-tight text-accent"><Counter to={s.to} text={s.text} suffix={s.suffix} /></dd>
              <dt className="mono text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mono flex flex-wrap gap-x-6 gap-y-1 border-t border-line py-5 text-muted">
          {site.countries.map((c) => <span key={c}>{c}</span>)}
        </p>
      </div>
    </section>
  );
}
