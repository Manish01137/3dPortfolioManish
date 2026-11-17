import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = { title: "Contact", description: "Start a project with Manish Beniwal and Shape-360. Replies within 24 hours.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <div className="pt-16"><Contact eyebrow /></div>;
}
