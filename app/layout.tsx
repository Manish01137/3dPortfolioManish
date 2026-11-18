import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { MenuProvider } from "@/lib/menu";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { PageTransition } from "@/components/layout/PageTransition";
import { Cursor } from "@/components/ui/Cursor";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

// Manrope for display + body, JetBrains Mono for labels and the giant wordmarks.
const display = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--f-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], variable: "--f-mono", display: "swap" });

const title = "Manish Beniwal — Web, E-commerce & AI Developer";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: { default: title, template: "%s — Manish Beniwal" },
  description: site.positioning,
  openGraph: { title, description: site.positioning, type: "website", siteName: "Manish Beniwal", locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description: site.positioning },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#EEEAE8" }, { media: "(prefers-color-scheme: dark)", color: "#0F0F0F" }], width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: site.name,
      jobTitle: site.role,
      description: site.positioning,
      email: site.email,
      telephone: site.phone,
      url: site.siteUrl,
      address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressCountry: "IN" },
      sameAs: site.socials.map((s) => s.href).filter(Boolean),
    },
    ...projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.summary,
      url: `${site.siteUrl}/work/${p.slug}`,
      creator: { "@type": "Person", name: site.name },
      ...(p.url ? { sameAs: p.url } : {}),
    })),
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${mono.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `try{if(sessionStorage.getItem("s360-pre"))document.documentElement.dataset.pre="seen"}catch(e){}` }} />
        <noscript><style>{`.js-split,.split-ready{visibility:visible!important}`}</style></noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <MenuProvider>
            <SmoothScroll />
            <Preloader />
            <PageTransition />
            <ScrollProgress />
            <Cursor />
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-[var(--accent-fg)]">Skip to content</a>
            <Header />
            <MenuOverlay />
            <main id="main">{children}</main>
            <Footer />
            <div className="grain" aria-hidden />
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
