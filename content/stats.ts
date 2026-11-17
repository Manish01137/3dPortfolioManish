export const stats = [
  { to: 70, suffix: "+", label: "Projects shipped" },
  { to: 98, suffix: "%", label: "Client satisfaction" },
  { to: 6, suffix: "+", label: "Countries served" },
  { to: 6, suffix: "+", label: "Specialists in the team" },
  { text: "2–4", suffix: " wk", label: "Typical website delivery" },
] as { to?: number; text?: string; suffix: string; label: string }[];

export const process = [
  {
    n: "01",
    title: "Discover & Strategy",
    time: "1 week",
    text: "We map goals, audience and competitors, then agree on scope, structure and the metrics that define success.",
  },
  {
    n: "02",
    title: "Design",
    time: "~1 week",
    text: "Wireframes become a polished, brand-true interface. You review real screens, not abstract mood boards.",
  },
  {
    n: "03",
    title: "Build & Launch",
    time: "1–2 weeks",
    text: "Fast, SEO-ready code, rigorous QA and a smooth launch, followed by support from a dedicated account manager.",
  },
];
