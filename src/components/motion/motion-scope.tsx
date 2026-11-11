"use client";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, motionQueries } from "@/lib/motion/core";
import { heroReveal, imageReveal, textStagger } from "@/lib/motion/reveals";

type Props = { children: ReactNode; preset: "hero" | "text" | "image"; className?: string };
/** Server-rendered children remain visible until an optional enhancement starts. */
export function MotionScope({ children, preset, className }: Props) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(motionQueries.motion, () => {
      const root = scope.current;
      if (!root) return;
      if (preset === "hero") heroReveal(Array.from(root.querySelectorAll<HTMLElement>("[data-hero-reveal]")));
      if (preset === "text") textStagger(Array.from(root.querySelectorAll<HTMLElement>("[data-text-reveal]")));
      if (preset === "image") imageReveal(root);
    }, scope);
    return () => media.revert();
  }, { scope, dependencies: [preset], revertOnUpdate: true });
  return <div ref={scope} className={className}>{children}</div>;
}
