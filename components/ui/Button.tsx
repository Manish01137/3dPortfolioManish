"use client";
import Link from "next/link";
import { useRef } from "react";
import { Magnetic } from "./Magnetic";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  children: React.ReactNode;
  variant?: "outline" | "solid";
  magnetic?: boolean;
  external?: boolean;
  download?: boolean;
  className?: string;
  "aria-label"?: string;
};

/** Pill button: an accent circle fills from the cursor position on hover. */
export function Button({ href, onClick, type = "button", disabled, children, variant = "outline", magnetic = true, external, download, className, ...rest }: Props) {
  const fill = useRef<HTMLSpanElement>(null);
  const setPos = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    fill.current?.style.setProperty("--x", `${e.clientX - r.left}px`);
    fill.current?.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  const cls = cn(
    "group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-[0.95rem] font-medium whitespace-nowrap transition-colors duration-300 disabled:opacity-60",
    variant === "outline" ? "border border-fg/30 text-fg hover:border-accent hover:text-[var(--accent-fg)]" : "bg-fg text-bg hover:text-[var(--accent-fg)]",
    className,
  );
  const inner = (
    <>
      <span
        ref={fill}
        aria-hidden
        className="pointer-events-none absolute left-[var(--x,50%)] top-[var(--y,50%)] h-[300%] aspect-square -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-accent transition-transform duration-500 ease-out group-hover:scale-100 group-focus-visible:scale-100"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );
  const el = href ? (
    external || download || href.startsWith("mailto:") || href.startsWith("tel:") ? (
      <a href={href} className={cls} onPointerEnter={setPos} onPointerLeave={setPos} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} download={download} {...rest}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls} onPointerEnter={setPos} onPointerLeave={setPos} {...rest}>
        {inner}
      </Link>
    )
  ) : (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} onPointerEnter={setPos} onPointerLeave={setPos} {...rest}>
      {inner}
    </button>
  );
  return magnetic ? <Magnetic strength={0.25}>{el}</Magnetic> : el;
}
