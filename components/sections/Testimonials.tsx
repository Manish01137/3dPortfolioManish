"use client";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperT } from "swiper";
import "swiper/css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Eyebrow } from "../ui/Eyebrow";
import { testimonials } from "@/content/testimonials";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";
import { pad } from "@/lib/utils";

export function Testimonials() {
  const [sw, setSw] = useState<SwiperT | null>(null);
  const [idx, setIdx] = useState(0);
  if (!site.showTestimonials) return null; // hidden until real quotes exist
  const btn = "grid h-14 w-14 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:bg-accent hover:text-[var(--accent-fg)]";
  return (
    <section id="stories" className="section container-x scroll-mt-20" aria-roledescription="carousel" aria-label="Client stories">
      <Eyebrow n="06">Client stories</Eyebrow>
      <Swiper onSwiper={setSw} onSlideChange={(s) => setIdx(s.realIndex)} loop speed={700} className="mt-12" data-cursor="DRAG">
        {testimonials.map((t, i) => {
          const p = getProject(t.project);
          return (
            <SwiperSlide key={i}>
              <figure className="grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className="relative aspect-[4/3] overflow-hidden bg-elev lg:col-span-5">
                  {p && <Image src={p.cover} alt={p.title} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />}
                </div>
                <div className="lg:col-span-7">
                  <blockquote className="font-display text-[clamp(1.5rem,3vw,2.8rem)] font-medium leading-tight tracking-tight">“{t.quote}”</blockquote>
                  <figcaption className="mt-8"><p className="font-medium">{t.name}</p><p className="mono text-muted">{t.role}, {t.company}</p></figcaption>
                </div>
              </figure>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="mt-10 flex items-center justify-between">
        <p className="mono">{pad(idx + 1)} / {pad(testimonials.length)}</p>
        <div className="flex gap-3">
          <button className={btn} aria-label="Previous testimonial" onClick={() => sw?.slidePrev()}><ArrowLeft size={18} /></button>
          <button className={btn} aria-label="Next testimonial" onClick={() => sw?.slideNext()}><ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
