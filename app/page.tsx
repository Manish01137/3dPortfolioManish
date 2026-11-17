import { Hero } from "@/components/sections/Hero";
import { ImageMarquee } from "@/components/sections/ImageMarquee";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { Stats } from "@/components/sections/Stats";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ServicesList } from "@/components/sections/ServicesList";
import { Process } from "@/components/sections/Process";
import { Journey } from "@/components/sections/Journey";
import dynamic from "next/dynamic";
import { site } from "@/content/site";
import { FreeTools } from "@/components/sections/FreeTools";
import { FollowMarquee } from "@/components/sections/FollowMarquee";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

// Swiper only ships when testimonials are switched on in content/site.ts
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then((m) => m.Testimonials));

export default function Home() {
  return (
    <>
      <Hero />
      <ImageMarquee />
      <AboutIntro />
      <Stats />
      <SelectedWork />
      <ServicesList />
      <Process />
      <Journey />
      {site.showTestimonials && <Testimonials />}
      <FreeTools />
      <FollowMarquee />
      <CTA />
      <Contact />
    </>
  );
}
