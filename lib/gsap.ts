"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

let registered = false;
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  // Phones resize the viewport whenever the address bar shows/hides; re-measuring every pin then causes a visible hitch.
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}
registerGsap();

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Run once fonts are ready (so SplitText measures real glyphs). */
export const fontsReady = () =>
  typeof document !== "undefined" && document.fonts ? document.fonts.ready : Promise.resolve();
