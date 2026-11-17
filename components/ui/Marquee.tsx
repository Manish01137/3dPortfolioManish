import { cn } from "@/lib/utils";

export function Marquee({ children, duration = 40, reverse, pausable, className }: { children: React.ReactNode; duration?: number; reverse?: boolean; pausable?: boolean; className?: string }) {
  return (
    <div className={cn("marquee-wrap overflow-hidden", className)}>
      <div className={cn("marquee-track", reverse && "rev", pausable && "pausable")} style={{ ["--dur" as string]: `${duration}s` }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
