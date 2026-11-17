import type { Metadata } from "next";
import { PageIntro } from "@/components/work/PageIntro";
import { WorkExplorer } from "@/components/work/WorkExplorer";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Work", description: "Websites, Shopify stores, SaaS and AI tools built by Manish Beniwal and Shape-360.", alternates: { canonical: "/work" } };

export default function WorkPage() {
  return (
    <>
      <PageIntro eyebrow={`Work — ${projects.length} projects`} title={<>Selected<br />projects.</>} lead="SaaS products, e-commerce stores, business websites and landing pages for brands across India, UAE, Australia and the US." />
      <WorkExplorer />
    </>
  );
}
