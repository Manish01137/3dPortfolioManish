export const site = {
  name: "Manish Beniwal",
  firstName: "Manish",
  role: "Founder & Lead Developer",
  tagline: "Web Design, E-commerce, AI Tools & Growth",
  positioning:
    "Building high-converting websites, e-commerce stores and AI-powered growth tools for ambitious brands across India, UAE, Australia and 6+ countries.",
  menuTagline: "Design-led development for brands that want to grow.",
  location: "Bangalore, India",
  timezone: "Asia/Kolkata",
  timezoneNote: "Async-first across all timezones",
  email: "manish@shape360ai.com", // TODO verify — this address contains the agency domain; swap if you want a personal one
  phone: "+91 82099 78891",
  whatsapp: "918209978891",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://manishbeniwal.com", // TODO verify domain
  availability: "Available for new projects — Q1 2027",
  since: 2024,
  cvUrl: "/Manish-Beniwal-CV.pdf",
  // Flip to true once real testimonials replace the placeholders in content/testimonials.ts
  showTestimonials: false,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/manish-beniwal-07aa7b2a0/" },
    { label: "GitHub", href: "https://github.com/Manish01137" },
  ],
  countries: ["India", "UAE", "Australia", "USA", "UK", "Singapore", "Saudi Arabia"],
  disciplines: ["Development", "Design", "E-commerce", "AI tools", "Growth"],
  serviceMarquee: [
    "Web Development",
    "Shopify",
    "WordPress",
    "SaaS",
    "AI Tools",
    "Meta Ads",
    "Google Ads",
    "Branding",
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  paymentsNote: "Payments in USD, AED, INR & more via Stripe and Razorpay.",
} as const;
