export function CircularBadge({ text = "• MANISH BENIWAL • SINCE 2024 ", size = 120 }: { text?: string; size?: number }) {
  const t = (text + " ").repeat(1);
  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 text-fg" style={{ animation: "spin 18s linear infinite" }}>
        <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
        <text className="mono" fill="currentColor" style={{ fontSize: 8.4, letterSpacing: "0.12em" }}>
          <textPath href="#circ" textLength="236">{t}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center font-mono text-xl text-accent">MB</span>
    </div>
  );
}
