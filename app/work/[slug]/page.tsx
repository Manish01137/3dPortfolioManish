import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { projects, getProject, nextProjectOf } from "@/content/projects";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { ParallaxCover } from "@/components/work/ProjectHero";
import { NextProject } from "@/components/work/NextProject";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.category}`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.title} — case study by Manish Beniwal`, description: p.summary, images: [{ url: p.cover, width: 1600, height: 1000 }] },
  };
}

const Block = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <section className="container-x grid gap-6 py-[clamp(4rem,9vw,8rem)] lg:grid-cols-12">
    <h2 className="mono text-muted lg:col-span-3">{label}</h2>
    <div className="lg:col-span-8 lg:col-start-5">{children}</div>
  </section>
);

export default async function ProjectPage({ params }: Params) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const next = nextProjectOf(p.slug);
  const meta = [
    ["Client", p.client],
    ["Industry", p.category],
    ["Country", p.country],
    ["Year", String(p.year)],
    ["Services", p.services.join(", ")],
  ];
  return (
    <article>
      <header className="container-x pb-12 pt-36 sm:pt-44">
        <Link href="/work" className="mono inline-flex min-h-11 items-center text-muted hover:text-accent">← All work</Link>
        <Eyebrow className="mt-8">{p.category}</Eyebrow>
        <SplitHeading as="h1" trigger="ready" className="h-hero mt-6 !text-[clamp(3rem,10vw,10rem)]">{p.title}</SplitHeading>
        <p className="mt-8 max-w-2xl text-xl text-muted">{p.summary}</p>
      </header>

      <div className="container-x">
        <div className="grid grid-cols-2 border-y border-line md:grid-cols-3 lg:grid-cols-6">
          <dl className="contents">
          {meta.map(([k, v]) => (
            <div key={k} className="border-b border-r border-line p-5 last:border-r-0 lg:border-b-0">
              <dt className="mono text-muted">{k}</dt>
              <dd className="mt-2 text-sm">{v}</dd>
            </div>
          ))}
          </dl>
          <div className="col-span-2 flex items-center p-5 md:col-span-1">
            {p.url ? <Button href={p.url} external>Visit live site ↗</Button> : <p className="mono text-muted">Private / offline</p>}
          </div>
        </div>
      </div>

      <div className="mt-12"><ParallaxCover src={p.cover} alt={`${p.title} website`} /></div>

      <Block label="The challenge"><p className="font-display text-[clamp(1.5rem,3vw,2.6rem)] font-medium leading-tight tracking-tight">{p.challenge}</p></Block>

      <section className="container-x grid gap-6 md:grid-cols-12" aria-label="Gallery">
        <div className="relative aspect-[16/10] overflow-hidden bg-elev md:col-span-8">
          <Image src={p.cover} alt={`${p.title} — desktop`} fill sizes="(min-width:768px) 62vw, 92vw" className="object-cover object-top" />
        </div>
        <div className="relative aspect-[390/844] overflow-hidden bg-elev md:col-span-4 md:aspect-auto">
          <Image src={p.mobile} alt={`${p.title} — mobile`} fill sizes="(min-width:768px) 30vw, 92vw" className="object-cover object-top" />
        </div>
      </section>

      <Block label="The solution">
        <p className="text-xl leading-relaxed">{p.solution}</p>
        <ul className="mt-10 border-t border-line">
          {p.highlights.map((h) => (
            <li key={h} className="flex items-start gap-4 border-b border-line py-4"><Check className="mt-1 shrink-0 text-accent" size={18} aria-hidden />{h}</li>
          ))}
        </ul>
      </Block>

      {p.results.length > 0 && (
        <Block label="Results">
          <dl className="grid gap-10 sm:grid-cols-2">
            {p.results.map((r) => (
              <div key={r.label}>
                <dd className="font-display text-[clamp(3.5rem,8vw,7rem)] font-semibold leading-none tracking-tight text-accent">{r.value}</dd>
                <dt className="mono mt-3 text-muted">{r.label}</dt>
              </div>
            ))}
          </dl>
        </Block>
      )}

      <Block label="Tech stack">
        <div className="flex flex-wrap gap-2">{p.stack.map((s) => <Tag key={s}>{s}</Tag>)}</div>
      </Block>

      {p.feedback && (
        <Block label="Client's feedback">
          <blockquote className="font-display text-[clamp(1.5rem,3vw,2.6rem)] font-medium leading-tight">“{p.feedback.quote}”</blockquote>
          <p className="mono mt-6 text-muted">{p.feedback.name} — {p.feedback.role}</p>
        </Block>
      )}

      <NextProject p={next.slug === p.slug ? projects[0] : next} />
    </article>
  );
}
