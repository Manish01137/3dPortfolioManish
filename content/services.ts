export interface Service {
  n: string;
  title: string;
  description: string;
  tags: string[];
  from: string;
  image: string; // project slug whose cover is used for hover reveal
  faq?: never;
}

export const services: Service[] = [
  {
    n: "01",
    title: "Custom Website Development",
    description: "React, Next.js and Vite builds that are fast, SEO-ready and engineered around conversion.",
    tags: ["React", "Next.js", "Vite", "SEO"],
    from: "From $499",
    image: "zeqon",
  },
  {
    n: "02",
    title: "Shopify E-Commerce",
    description:
      "Custom themes and payment integration, built to lift conversion — around 40% on average across our stores.",
    tags: ["Custom themes", "Payments", "CRO"],
    from: "From $499 · full e-commerce builds from $999",
    image: "veloura-jewels",
  },
  {
    n: "03",
    title: "WordPress Development",
    description: "CMS-driven sites and blogs with security hardening and SEO foundations built in.",
    tags: ["CMS", "Blogs", "Security", "SEO"],
    from: "From $499",
    image: "go-everywhere-trips",
  },
  {
    n: "04",
    title: "Custom Web Apps & AI Tools",
    description: "SaaS products, CRMs, dashboards, AI agents and automations that take work off your plate.",
    tags: ["SaaS", "CRM", "Dashboards", "AI agents"],
    from: "From $1,499",
    image: "joinetra",
  },
  {
    n: "05",
    title: "Performance Marketing",
    description:
      "Meta Ads from $349/mo and Google Ads (Search, Display, Performance Max) from $449/mo — strategy, targeting and A/B testing.",
    tags: ["Meta Ads", "Google Ads", "Performance Max", "A/B testing"],
    from: "Meta from $349/mo · Google from $449/mo",
    image: "indicolas",
  },
  {
    n: "06",
    title: "Branding & Ongoing Support",
    description:
      "Logo, brand identity and copywriting, backed by a dedicated account manager, weekly reports and 24/7 communication.",
    tags: ["Logo", "Identity", "Copywriting", "Support"],
    from: "Custom quote",
    image: "glowrithm-media",
  },
];

export const faqs = [
  {
    q: "How long does a typical website take?",
    a: "Most websites ship in 2–4 weeks: about a week of discovery, about a week of design and one to two weeks of build and launch.",
  },
  {
    q: "What does it cost?",
    a: "Websites start from $499, full Shopify e-commerce builds from $999 and custom web apps or AI tools from $1,499. Meta Ads management starts at $349/mo and Google Ads at $449/mo. You always get a fixed quote before work starts.",
  },
  {
    q: "Which countries do you work with?",
    a: "Clients across India, UAE, Australia, USA, UK, Singapore and Saudi Arabia. We work async-first, so timezones are rarely a blocker.",
  },
  {
    q: "How do payments work?",
    a: "In USD, AED, INR and more through Stripe and Razorpay.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Every project can include a dedicated account manager, weekly reports and 24/7 communication.",
  },
  {
    q: "Can you build AI features into my product?",
    a: "Yes — AI agents, automations, chatbots and AI-drafting workflows. Joinetra, our own CRM for travel agencies, is a live example.",
  },
];
