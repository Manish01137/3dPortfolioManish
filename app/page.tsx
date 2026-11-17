import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { Stats } from "@/components/sections/Stats";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ScaleReveal } from "@/components/sections/ScaleReveal";
import { ServicesStack } from "@/components/sections/ServicesStack";
import { Process } from "@/components/sections/Process";
import { Journey } from "@/components/sections/Journey";
import { FollowMarquee } from "@/components/sections/FollowMarquee";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/content/site";

// Swiper only ships when testimonials are switched on in content/site.ts
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then((m) => m.Testimonials));

export default function Home() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <Stats />
      <SelectedWork />
      <ScaleReveal />
      <ServicesStack />
      <Process />
      <Journey />
      {site.showTestimonials && <Testimonials />}
      <FollowMarquee />
      <CTA />
      <Contact />
    </>
  );
}
