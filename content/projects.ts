export type FilterKey = "saas" | "ecommerce" | "business" | "landing";

export const filters: { key: "all" | FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "saas", label: "Web Apps & SaaS" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "business", label: "Business Websites" },
  { key: "landing", label: "Landing Pages" },
];

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  filter: FilterKey;
  country: string;
  year: number; // TODO verify (2024–2026)
  url?: string;
  summary: string;
  challenge: string; // TODO verify
  solution: string; // TODO verify
  highlights: string[];
  results: { value: string; label: string }[]; // real, supplied numbers only
  tags: string[];
  services: string[];
  stack: string[]; // TODO verify — indicative, based on project type
  headline: string;
  featured: boolean;
  cover: string;
  mobile: string;
  gallery: string[];
  feedback?: { quote: string; name: string; role: string };
}

type Input = Omit<Project, "cover" | "mobile" | "gallery" | "results" | "services" | "stack" | "feedback"> &
  Partial<Pick<Project, "results" | "services" | "stack" | "feedback">>;

const stacks: Record<FilterKey, string[]> = {
  saas: ["Next.js", "TypeScript", "Node.js", "Tailwind", "GSAP"],
  ecommerce: ["Shopify", "Liquid", "JavaScript", "Razorpay / Stripe"],
  business: ["Next.js", "React", "Tailwind", "Vercel"],
  landing: ["Next.js", "Tailwind", "GSAP", "Vercel"],
};
const serviceMap: Record<FilterKey, string[]> = {
  saas: ["Custom Web Apps & AI Tools", "Custom Website Development"],
  ecommerce: ["Shopify E-Commerce"],
  business: ["Custom Website Development"],
  landing: ["Custom Website Development"],
};

const make = (p: Input): Project => ({
  results: [],
  services: serviceMap[p.filter],
  stack: stacks[p.filter],
  ...p,
  cover: `/projects/${p.slug}/cover.webp`,
  mobile: `/projects/${p.slug}/mobile.webp`,
  gallery: [`/projects/${p.slug}/cover.webp`, `/projects/${p.slug}/mobile.webp`],
});

export const projects: Project[] = [
  make({
    slug: "joinetra",
    title: "Joinetra",
    client: "Own product",
    category: "SaaS · Own product",
    filter: "saas",
    country: "India",
    year: 2025, // TODO verify
    url: "https://joinetra.com",
    summary: "A multi-tenant CRM that runs a travel agency's day from first enquiry to tax invoice.",
    challenge:
      "Travel agencies juggle WhatsApp, Instagram and email threads, spreadsheets and hand-built itineraries. Leads slip through and quotes take hours.", // TODO verify
    solution:
      "Joinetra unifies every channel into one inbox, tracks leads through a pipeline, drafts packages with AI and turns them into branded brochure PDFs, bookings and tax invoices.", // TODO verify
    highlights: [
      "Multi-tenant architecture built for travel agencies",
      "Meta Tech Provider status",
      "Unified WhatsApp + Instagram + email inbox",
      "Lead pipeline and AI-drafted travel packages",
      "Brochure PDFs, bookings and tax invoices",
    ],
    tags: ["SaaS", "CRM", "AI", "WhatsApp"],
    headline: "Multi-tenant CRM for travel agencies",
    featured: true,
  }),
  make({
    slug: "mershiltech",
    title: "MershilTech",
    client: "MershilTech",
    category: "Enterprise AI agency platform · Australia",
    filter: "business",
    country: "Australia",
    year: 2025, // TODO verify
    url: "https://mershiltech.com",
    summary: "A credible, enterprise-grade home for an AI and engineering agency serving clients worldwide.",
    challenge:
      "An agency serving 500+ clients in 70+ countries needed a site that communicates scale and trust across very different service lines.", // TODO verify
    solution:
      "A structured, fast platform that presents AI, mobile apps, web, AR/VR and cybersecurity clearly, with strong navigation and conversion paths.", // TODO verify
    highlights: [
      "Serves 500+ clients in 70+ countries (client-reported)",
      "AI, mobile apps, web, AR/VR and cybersecurity services",
    ],
    results: [
      { value: "500+", label: "clients served by MershilTech" },
      { value: "70+", label: "countries" },
    ],
    tags: ["Enterprise", "AI", "Agency"],
    headline: "500+ clients in 70+ countries",
    featured: true,
  }),
  make({
    slug: "zevolution",
    title: "Zevolution",
    client: "Zevolution",
    category: "B2B architectural materials",
    filter: "business",
    country: "India",
    year: 2025, // TODO verify
    url: "https://zevolution.in",
    summary: "A catalogue-first B2B site for architectural surfaces, built for specifiers and designers.",
    challenge:
      "A large product range across several collections had to be explorable by architects and designers without feeling like a spreadsheet.", // TODO verify
    solution:
      "Five clearly branded collections, a 94+ product catalogue, a CAD library and a finish explorer that makes comparing surfaces effortless.", // TODO verify
    highlights: [
      "5 collections: Crest Stone, FCC Boards, Formiq, Dolomitic and more",
      "94+ products",
      "CAD library for specifiers",
      "Interactive finish explorer",
    ],
    results: [
      { value: "94+", label: "products catalogued" },
      { value: "5", label: "collections" },
    ],
    tags: ["B2B", "Catalogue", "CAD library"],
    headline: "94+ products across 5 collections",
    featured: true,
  }),
  make({
    slug: "indicolas",
    title: "IndiColas",
    client: "IndiColas",
    category: "D2C e-commerce · USA",
    filter: "ecommerce",
    country: "USA",
    year: 2025, // TODO verify
    url: "https://indicolas.com",
    summary: "A video-first storefront for a craft soda brand inspired by India's Goli Soda.",
    challenge:
      "Bring a nostalgic Indian street-soda brand to a US audience with a storefront that feels as playful as the product.", // TODO verify
    solution:
      "A video-led store with a flavour carousel for 12 flavours, creator testimonials and the 'Pop The Fizz' community to build brand energy.", // TODO verify
    highlights: [
      "12 flavours with an interactive carousel",
      "Video-first storefront",
      "Creator testimonials",
      "“Pop The Fizz” community",
    ],
    results: [{ value: "12", label: "flavours launched" }],
    tags: ["D2C", "Video-first", "Craft soda"],
    headline: "12 flavours, one video-first storefront",
    featured: true,
  }),
  make({
    slug: "veloura-jewels",
    title: "Veloura Jewels",
    client: "Veloura Jewels",
    category: "Jewellery e-commerce",
    filter: "ecommerce",
    country: "India",
    year: 2025, // TODO verify
    url: "https://velourajewels.in",
    summary: "A refined online store for BIS-hallmarked sterling silver and lab-grown gemstone jewellery.",
    challenge:
      "Premium jewellery needs trust and desire at the same time; shoppers must feel the quality before they can touch it.", // TODO verify
    solution:
      "A clean, image-led Shopify store that foregrounds hallmarking and craftsmanship, with a smooth path from discovery to checkout.", // TODO verify
    highlights: ["BIS-hallmarked sterling silver", "Lab-grown gemstones", "Image-led Shopify storefront"],
    results: [{ value: "+55%", label: "online sales in Q1" }],
    tags: ["Shopify", "Jewellery", "D2C"],
    headline: "+55% online sales in Q1",
    featured: true,
  }),
  make({
    slug: "staylia-dxb",
    title: "Staylia DXB",
    client: "Staylia DXB",
    category: "Short-term rental management · Dubai",
    filter: "business",
    country: "UAE",
    year: 2025, // TODO verify
    url: "https://stayliadxb.com",
    summary: "A property-owner-focused website for a Dubai short-term rental management company.",
    challenge:
      "Win the trust of property investors by showing performance transparently and making the owner experience tangible.", // TODO verify
    solution:
      "A confident site with clear 85%+ occupancy messaging and investor dashboards that show owners what they get.", // TODO verify
    highlights: ["85%+ occupancy messaging", "Investor dashboards"],
    tags: ["Dubai", "Property", "Investors"],
    headline: "85%+ occupancy messaging, investor dashboards",
    featured: true,
  }),
  make({
    slug: "zeqon",
    title: "Zeqon",
    client: "Zeqon",
    category: "SaaS website",
    filter: "saas",
    country: "India", // TODO verify
    year: 2025, // TODO verify
    url: "https://zeqon.co",
    summary: "A motion-rich marketing site that turned attention into pipeline.",
    challenge: "Stand out in a crowded SaaS category and convert more visitors into qualified leads.", // TODO verify
    solution: "A motion-rich build with sharp messaging and clear conversion paths.", // TODO verify
    highlights: ["Motion-rich interface", "Conversion-led structure"],
    results: [
      { value: "5×", label: "lead generation" },
      { value: "+180%", label: "traffic" },
    ],
    tags: ["SaaS", "Motion", "Lead gen"],
    headline: "5× lead generation, +180% traffic",
    featured: false,
  }),
  make({
    slug: "kvs-academy",
    title: "KVS Academy",
    client: "KVS Academy",
    category: "Education",
    filter: "business",
    country: "India",
    year: 2024, // TODO verify
    url: "https://kvsacademy.org",
    summary: "A mobile-first education website that loads in under two seconds.",
    challenge: "Most parents and students browse on phones, often on slow connections.", // TODO verify
    solution: "A lightweight mobile-first build with clear programmes and an easy enquiry flow.", // TODO verify
    highlights: ["Mobile-first design", "Fast loading"],
    results: [
      { value: "1.8s", label: "load time" },
      { value: "3×", label: "student inquiries" },
    ],
    tags: ["Education", "Mobile-first"],
    headline: "1.8s load time, 3× student inquiries",
    featured: false,
  }),
  make({
    slug: "kedar-shakti",
    title: "Kedar Shakti",
    client: "Kedar Shakti",
    category: "Spiritual Shopify store",
    filter: "ecommerce",
    country: "India",
    year: 2024, // TODO verify
    url: "https://kedarshakti.com",
    summary: "A Shopify store for spiritual products with corporate bulk ordering built in.",
    challenge: "Serve both individual devotees and corporate buyers from a single store.", // TODO verify
    solution: "A calm, trust-led storefront with a dedicated corporate bulk ordering flow.", // TODO verify
    highlights: ["Corporate bulk ordering", "Shopify storefront"],
    results: [{ value: "3×", label: "online orders" }],
    tags: ["Shopify", "Spiritual", "Bulk orders"],
    headline: "3× online orders",
    featured: false,
  }),
  make({
    slug: "go-everywhere-trips",
    title: "Go Everywhere Trips",
    client: "Go Everywhere Trips",
    category: "Travel · Dehradun",
    filter: "business",
    country: "India",
    year: 2024, // TODO verify
    url: "https://goeverywheretrips.com",
    summary: "A travel website for treks, group tours and yatras from Dehradun.",
    challenge: "Present many trips and departures clearly while encouraging enquiries.", // TODO verify
    solution: "A clean itinerary-led site organised by trip type.", // TODO verify
    highlights: ["Treks", "Group tours", "Yatras"],
    tags: ["Travel", "Tours"],
    headline: "Treks, group tours and yatras",
    featured: false,
  }),
  make({
    slug: "quick-solutions",
    title: "Quick Solutions",
    client: "Quick Solutions",
    category: "IT infrastructure · Ahmedabad",
    filter: "business",
    country: "India",
    year: 2024, // TODO verify
    url: "https://quick-solutions.in",
    summary: "A corporate website for an IT infrastructure company with 500+ engineers.",
    challenge: "Communicate scale and reliability to enterprise buyers.", // TODO verify
    solution: "A structured corporate site that leads with capability and credibility.", // TODO verify
    highlights: ["Company with 500+ engineers"],
    tags: ["IT", "Corporate"],
    headline: "Corporate site for a 500+ engineer company",
    featured: false,
  }),
  make({
    slug: "shanta-samanta",
    title: "Shanta Samanta",
    client: "Shanta Samanta",
    category: "Artist portfolio",
    filter: "business",
    country: "India",
    year: 2024, // TODO verify
    url: "https://shantasamanta.com",
    summary: "A quiet, image-first portfolio for a sculptor.",
    challenge: "Let the work speak, with nothing in the way.", // TODO verify
    solution: "A minimal gallery-style site that gives sculptures room to breathe.", // TODO verify
    highlights: ["Sculptor portfolio"],
    tags: ["Portfolio", "Art"],
    headline: "A sculptor's portfolio",
    featured: false,
  }),
  make({
    slug: "glowrithm-media",
    title: "Glowrithm Media",
    client: "Glowrithm Media",
    category: "Social media agency · Gwalior",
    filter: "business",
    country: "India",
    year: 2024, // TODO verify
    url: "https://glowrithmmedia.com",
    summary: "A bright, modern website for a social media agency.",
    challenge: "Show creative range and convert enquiries.", // TODO verify
    solution: "A bold agency website with clear services and contact paths.", // TODO verify
    highlights: ["Agency website"],
    tags: ["Agency", "Social media"],
    headline: "Agency website",
    featured: false,
  }),
  make({
    slug: "jaldiride-connect",
    title: "JaldiRide Connect",
    client: "JaldiRide Connect",
    category: "Local transport landing page",
    filter: "landing",
    country: "India",
    year: 2025, // TODO verify
    summary: "A focused landing page for a local transport service.",
    challenge: "Turn local search traffic into bookings.", // TODO verify
    solution: "A fast, single-purpose landing page with a clear call to action.", // TODO verify
    highlights: ["50+ cities", "10K+ monthly visits"],
    results: [
      { value: "50+", label: "cities" },
      { value: "10K+", label: "monthly visits" },
    ],
    tags: ["Landing page", "Transport"],
    headline: "50+ cities, 10K+ monthly visits",
    featured: false,
  }),
  make({
    slug: "landing-page-collection",
    title: "Landing page collection",
    client: "Various",
    category: "Landing pages",
    filter: "landing",
    country: "India", // TODO verify
    year: 2025, // TODO verify
    summary: "Conversion-focused landing pages for MindMint Media, SkillOwl, FolkLane, Pawan Hardu and Krishi Global Industries.",
    challenge: "Each brand needed a single, sharp page that explains the offer and drives action.", // TODO verify
    solution: "Fast, focused pages with clear messaging and one primary call to action.", // TODO verify
    highlights: ["MindMint Media", "SkillOwl", "FolkLane", "Pawan Hardu", "Krishi Global Industries"],
    tags: ["Landing pages"],
    headline: "Five focused landing pages",
    featured: false,
  }),
];

export const featured = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const nextProjectOf = (slug: string) => {
  const i = featured.findIndex((p) => p.slug === slug);
  if (i === -1) return featured[0];
  return featured[(i + 1) % featured.length];
};
