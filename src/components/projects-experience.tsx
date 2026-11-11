"use client";

import { useRef, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { gsap, useGSAP } from "@/lib/motion/core";
import { homeHoverEffects } from "@/lib/motion/home-interactions";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function ProjectsExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const element = root.current;
    if (!element) return;
    const header = document.querySelector<HTMLElement>(".home-header");
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1024px) and (hover: hover)" }, context => {
      if (!context.conditions?.motion) return;
      const desktop = Boolean(context.conditions.desktop);
      const splits: SplitText[] = [];
      const heroTitle = element.querySelector<HTMLElement>("[data-projects-title]");
      if (heroTitle) splits.push(SplitText.create(heroTitle, { type: "lines,words", mask: "lines", autoSplit: true, aria: "auto", onSplit(self) { return gsap.from(self.words, { yPercent: 110, opacity: 0, stagger: 0.055, duration: 0.9, ease: "power3.out", clearProps: "transform,opacity" }); } }));
      gsap.from(element.querySelectorAll("[data-projects-hero]"), { y: 18, opacity: 0, delay: 0.12, stagger: 0.1, duration: 0.75, ease: "power2.out", clearProps: "transform,opacity" });
      if (desktop) {
        const heroImage = element.querySelector(".projects-hero-photo img");
        if (heroImage) {
          gsap.fromTo(heroImage, { scale: 1.12 }, { scale: 1.045, duration: 1.7, ease: "power2.out" });
          gsap.fromTo(heroImage, { yPercent: 2 }, { yPercent: -2.5, ease: "none", scrollTrigger: { trigger: ".projects-hero", start: "top top", end: "bottom top", scrub: 0.75 } });
        }
        element.querySelectorAll<HTMLElement>("[data-projects-heading]").forEach(heading => {
          if (heading === heroTitle) return;
          splits.push(SplitText.create(heading, { type: "lines", mask: "lines", autoSplit: true, aria: "auto", onSplit(self) { return gsap.from(self.lines, { yPercent: 110, stagger: 0.08, duration: 0.72, ease: "power2.out", immediateRender: false, scrollTrigger: { trigger: heading, start: "top 90%", once: true } }); } }));
        });
        element.querySelectorAll<HTMLElement>("[data-projects-image]").forEach(frame => {
          gsap.from(frame, { clipPath: "inset(0 0 16% 0)", duration: 0.9, ease: "power2.out", immediateRender: false, clearProps: "clipPath", scrollTrigger: { trigger: frame, start: "top 88%", once: true } });
          const image = frame.querySelector("img");
          if (image) gsap.fromTo(image, { yPercent: 2, scale: 1.08 }, { yPercent: -2, scale: 1.04, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.7 } });
        });
      }
      element.querySelectorAll<HTMLElement>("[data-projects-enter]").forEach(target => gsap.from(target, { y: desktop ? 30 : 14, opacity: 0, duration: 0.75, ease: "power2.out", clearProps: "transform,opacity", scrollTrigger: { trigger: target, start: "top 91%", once: true } }));
      const facts = element.querySelector(".projects-facts");
      if (facts) gsap.from(facts.children, { y: desktop ? 24 : 12, opacity: 0, stagger: 0.1, duration: 0.65, ease: "power2.out", immediateRender: false, clearProps: "transform,opacity", scrollTrigger: { trigger: facts, start: "top 88%", once: true } });
      const disposeHover = desktop ? homeHoverEffects(element, header) : undefined;
      return () => { disposeHover?.(); splits.forEach(split => split.revert()); };
    }, root);
    return () => media.revert();
  }, { scope: root });
  return <div ref={root} className="bsj-home projects-page">{children}</div>;
}
