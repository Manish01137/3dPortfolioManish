import { Eyebrow } from "../ui/Eyebrow";
import { SplitHeading } from "../ui/SplitHeading";

export function PageIntro({ eyebrow, title, lead }: { eyebrow: string; title: React.ReactNode; lead?: string }) {
  return (
    <header className="container-x pb-16 pt-40 sm:pt-48">
      <Eyebrow>{eyebrow}</Eyebrow>
      <SplitHeading as="h1" trigger="ready" className="h-hero mt-6 !text-[clamp(3rem,9vw,9rem)]">{title}</SplitHeading>
      {lead && <p className="mt-8 max-w-2xl text-lg text-muted">{lead}</p>}
    </header>
  );
}
