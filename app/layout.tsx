import type { Metadata, Viewport } from "next";
import { Syne, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { MenuProvider } from "@/lib/menu";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Cursor } from "@/components/ui/Cursor";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

// Display: Syne (fallback named in the brief). To use Clash Display / General Sans, self-host the
// Fontshare files with next/font/local and swap this variable.
const display = Syne({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--f-display", display: "swap" });
const body = Inter_Tight({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-body", display: "swap", preload: false });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], variable: "--f-mono", display: "swap", preload: false });

const title = "Manish Beniwal — Founder of Shape-360 | Web, E-commerce & AI Developer";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: { default: title, template: "%s — Manish Beniwal" },
  description: site.positioning,
  openGraph: { title, description: site.positioning, type: "website", siteName: "Shape-360", locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description: site.positioning },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#0F0F0F", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: site.name,
      jobTitle: site.role,
      email: site.email,
      telephone: site.phone,
      url: site.siteUrl,
      worksFor: { "@id": `${site.siteUrl}/#org` },
      address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressCountry: "IN" },
      sameAs: site.socials.map((s) => s.href).filter(Boolean),
    },
    {
      "@type": "Organization",
      "@id": `${site.siteUrl}/#org`,
      name: "Shape-360",
      url: site.agencyUrl,
      description: site.positioning,
      foundingDate: String(site.since),
      founder: { "@type": "Person", name: site.name },
      email: site.email,
    },
    ...projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.summary,
      url: `${site.siteUrl}/work/${p.slug}`,
      creator: { "@type": "Organization", name: "Shape-360" },
      ...(p.url ? { sameAs: p.url } : {}),
    })),
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `try{if(sessionStorage.getItem("s360-pre"))document.documentElement.dataset.pre="seen"}catch(e){}` }} />
        <noscript><style>{`.js-split,.split-ready{visibility:visible!important}`}</style></noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <MenuProvider>
            <SmoothScroll />
            <Preloader />
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
