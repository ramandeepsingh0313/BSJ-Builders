"use client";
import { useRef, type ReactNode } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap, useGSAP } from "@/lib/motion/core";
import { homeHoverEffects } from "@/lib/motion/home-interactions";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function AboutExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP((_context, contextSafe) => {
    const element = root.current;
    if (!element || !contextSafe) return;
    const header = document.querySelector<HTMLElement>(".home-header");
    const disclosure = header?.querySelector<HTMLDetailsElement>("details");
    let scrolling: gsap.core.Tween | undefined;
    const cancelScroll = () => scrolling?.kill();
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape" && disclosure?.open) {
        disclosure.open = false;
        disclosure.querySelector("summary")?.focus();
      }
    };
    const closeOnLink = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest(".home-mobile-menu a") && disclosure) disclosure.open = false;
    };
    const followChapter = contextSafe((event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href^='#']") : null;
      const hash = link?.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      cancelScroll();
      const top = Math.max(0, target.getBoundingClientRect().top + scrollY - (header?.getBoundingClientRect().bottom ?? 80) - 16);
      const finish = () => { history.pushState(null, "", hash); target.focus({ preventScroll: true }); };
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo({ top, behavior: "instant" }); finish(); return;
      }
      const position = { y: scrollY };
      scrolling = gsap.to(position, {
        y: top, duration: 0.9, ease: "power2.inOut",
        onUpdate: () => window.scrollTo(0, position.y), onComplete: finish,
      });
    });
    element.addEventListener("click", followChapter);
    header?.addEventListener("keydown", closeMenu);
    header?.addEventListener("click", closeOnLink);
    window.addEventListener("wheel", cancelScroll, { passive: true });
    window.addEventListener("touchstart", cancelScroll, { passive: true });
    const media = gsap.matchMedia();
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 1024px) and (hover: hover)",
    }, context => {
      if (!context.conditions?.motion) return;
      const desktop = Boolean(context.conditions.desktop);
      const splits: SplitText[] = [];
      const disposeEvents: (()=>void)[] = [];
      element.querySelectorAll<HTMLElement>("[data-about-heading], [data-split-heading]").forEach(heading => {
        if (!desktop) return;
        splits.push(SplitText.create(heading, {
          type: "lines", autoSplit: true, mask: "lines", aria: "auto",
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 105, stagger: 0.09, duration: 0.95, ease: "power3.out", immediateRender: false,
              scrollTrigger: { trigger: heading, start: "top 92%", once: true },
            });
          },
        }));
      });
      gsap.from(element.querySelectorAll("[data-about-hero]"), {
        y: 18, opacity: 0, duration: 0.85, delay: 0.1, stagger: 0.12, ease: "power2.out", clearProps: "transform,opacity",
      });
      element.querySelectorAll<HTMLElement>("[data-about-enter], [data-section-reveal]").forEach(target => {
        if (desktop && target.matches(".leader-panel")) return;
        gsap.from(target, {
          y: desktop ? 28 : 14, duration: 0.8, ease: "power2.out", clearProps: "transform",
          scrollTrigger: { trigger: target, start: "top 92%", once: true },
        });
      });
      if (desktop) {
        const photo = element.querySelector(".about-hero-photo img");
        if (photo) {
          gsap.fromTo(photo, { scale: 1.12 }, { scale: 1.055, duration: 1.8, ease: "power2.out" });
          gsap.fromTo(photo, { yPercent: 2 }, {
            yPercent: -3, ease: "none",
            scrollTrigger: { trigger: element.querySelector(".about-hero"), start: "top top", end: "bottom top", scrub: 0.8 },
          });
        }
        const ring = element.querySelector(".about-seal-ring");
        if (ring) gsap.to(ring, {
          rotation: 120, transformOrigin: "50% 50%", ease: "none",
          scrollTrigger: { trigger: element.querySelector(".about-hero"), start: "top top", end: "bottom top", scrub: 0.6 },
        });
        const statement = element.querySelector<HTMLElement>("[data-about-statement]");
        if (statement) splits.push(SplitText.create(statement, {
          type: "words", aria: "auto",
          onSplit(self) {
            return gsap.from(self.words, {
              opacity: 0.72, stagger: 0.1, ease: "none", immediateRender: false,
              scrollTrigger: { trigger: statement, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
            });
          },
        }));
        const inset = element.querySelector(".about-story-inset img");
        if (inset) gsap.fromTo(inset, { scale: 1.08, yPercent: 2 }, {
          yPercent: -2, ease: "none",
          scrollTrigger: { trigger: element.querySelector(".about-story-inset"), start: "top bottom", end: "bottom top", scrub: 0.7 },
        });
        const type = element.querySelector("[data-about-type]");
        if (type) gsap.fromTo(type, { xPercent: 4 }, {
          xPercent: -18, ease: "none",
          scrollTrigger: { trigger: element.querySelector(".about-type-band"), start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
        const principles = element.querySelector(".about-principles");
        if (principles) gsap.fromTo(principles, { "--principles-progress": 0 }, {
          "--principles-progress": 1, ease: "none",
          scrollTrigger: { trigger: principles, start: "top 75%", end: "bottom 65%", scrub: 0.6 },
        });
        const leaders = element.querySelector(".leadership-grid");
        if (leaders) gsap.from(leaders.children, {
          y: 48, opacity: 0, stagger: 0.14, duration: 0.85, ease: "power3.out",
          immediateRender: false, clearProps: "transform,opacity",
          scrollTrigger: { trigger: leaders, start: "top 88%", once: true },
        });
        const orbit = element.querySelector<HTMLElement>(".about-contact-orbit");
        const arrow = orbit?.querySelector("svg");
        if (orbit && arrow) {
          const hover = gsap.timeline({ paused: true }).to(arrow, { rotation: 45, scale: 1.05, duration: 0.45, ease: "power2.out" });
          const enter = () => { hover.play(); };
          const leave = () => { hover.reverse(); };
          orbit.addEventListener("pointerenter", enter); orbit.addEventListener("pointerleave", leave);
          orbit.addEventListener("focusin", enter); orbit.addEventListener("focusout", leave);
          disposeEvents.push(() => {
            orbit.removeEventListener("pointerenter", enter); orbit.removeEventListener("pointerleave", leave);
            orbit.removeEventListener("focusin", enter); orbit.removeEventListener("focusout", leave);
          });
        }
      }
      const disposeHover = desktop ? homeHoverEffects(element, header) : undefined;
      return () => {
        cancelScroll();
        disposeEvents.forEach(dispose => dispose());
        disposeHover?.(); splits.forEach(split => split.revert());
      };
    }, root);
    return () => {
      cancelScroll(); media.revert();
      element.removeEventListener("click", followChapter);
      header?.removeEventListener("keydown", closeMenu);
      header?.removeEventListener("click", closeOnLink);
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchstart", cancelScroll);
    };
  }, { scope: root });
  return <div ref={root} className="bsj-home about-page">{children}</div>;
}
