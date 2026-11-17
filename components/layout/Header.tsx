"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMenu } from "@/lib/menu";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "../ui/Button";
import { site } from "@/content/site";

export const Brand = ({ className = "" }: { className?: string }) => (
  <span className={`font-display text-xl font-semibold tracking-tight ${className}`}>
    Shape-360<span className="text-accent">*</span>
  </span>
);

export function Header() {
  const { open, setOpen } = useMenu();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [time, setTime] = useState("");
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 80);
      setHidden(y > last.current && y > 200);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fmt = () => setTime(new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: site.timezone }).format(new Date()).toUpperCase());
    fmt();
    const id = setInterval(fmt, 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${hidden && !open ? "-translate-y-full" : ""} ${solid && !open ? "bg-bg/60 backdrop-blur-md" : ""}`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" aria-label="Shape-360 — home" onClick={() => setOpen(false)} data-cursor="HOME"><Brand /></Link>
        <p className="mono hidden text-muted lg:block" aria-label="Local time in Bangalore">
          Bangalore — {time || "--:--"} IST
        </p>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <div className="hidden sm:block"><Button href="/contact" magnetic={false} className="!min-h-11 !py-2">Let&apos;s talk</Button></div>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="menu-overlay"
            onClick={() => setOpen(!open)}
            className="group flex h-11 items-center gap-3 rounded-full border border-line pl-5 pr-4 transition-colors hover:border-accent"
          >
            <span className="mono hidden sm:inline">{open ? "Close" : "Menu"}</span>
            <span className="relative block h-3 w-6" aria-hidden>
              <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300 ${open ? "top-1/2 -rotate-45" : "top-full"}`} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
