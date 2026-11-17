export function Eyebrow({ n, children, className = "" }: { n?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`mono text-muted flex items-center gap-2 ${className}`}>
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
      {n && <span>/ {n} —</span>}
      <span>{children}</span>
    </p>
  );
}
