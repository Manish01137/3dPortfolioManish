export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="mono inline-flex items-center rounded-full border border-line px-3 py-1 text-[0.68rem] text-fg/80">
      {children}
    </span>
  );
}
