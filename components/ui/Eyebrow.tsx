/** Bracket label, e.g. "[ 02 / Selected work ]" */
export function Eyebrow({ n, children, className = "" }: { n?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`mono text-muted ${className}`}>
      <span aria-hidden>[ </span>
      {n && <span className="text-accent">{n} / </span>}
      {children}
      <span aria-hidden> ]</span>
    </p>
  );
}
