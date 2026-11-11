"use client";
import { useRef, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { gsap, useGSAP } from "@/lib/motion/core";
import { sectionEntrance } from "@/lib/motion/scroll";
import { homeHoverEffects } from "@/lib/motion/home-interactions";
import { homeScrollEffects } from "@/lib/motion/home-scroll";
import { editorialScenes } from "@/lib/motion/editorial-scenes";

// These plugins are confined to the interactive homepage bundle.
gsap.registerPlugin(ScrollTrigger, SplitText);

export function HomeExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP((_context, contextSafe) => {
    const element = root.current;
    if (!element || !contextSafe) return;
    const media = gsap.matchMedia();
    let scrollTween: gsap.core.Tween | undefined;
    const navigation = document.querySelector<HTMLElement>(".home-header");
    const disclosure = navigation?.querySelector<HTMLDetailsElement>("details");
    const cancelScroll = () => scrollTween?.kill();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && disclosure?.open) {
        disclosure.open = false;
        disclosure.querySelector("summary")?.focus();
      }
    };
    const navigate = contextSafe((event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>(".bsj-home a[href^='#']") : null;
      const hash = link?.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      if (disclosure) disclosure.open = false;
      const headerOffset = (navigation?.getBoundingClientRect().bottom ?? 80) + 16;
      // Reduced-motion navigation jumps immediately; no-JS links remain native anchors.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        event.preventDefault(); cancelScroll();
        window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset), behavior: "instant" });
        history.pushState(null, "", hash); target.focus({ preventScroll: true }); return;
      }
      event.preventDefault();
      cancelScroll();
      const position = { y: window.scrollY };
      const end = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);
      scrollTween = gsap.to(position, {
        y: end, duration: Math.min(1.1, Math.max(0.45, Math.abs(end-position.y)/6000)), ease: "power2.inOut",
        onUpdate: () => window.scrollTo(0, position.y),
        onComplete: () => {
          history.pushState(null, "", hash);
          target.focus({ preventScroll: true });
        },
      });
    });
    document.addEventListener("click", navigate);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("wheel", cancelScroll, { passive: true });
    window.addEventListener("touchstart", cancelScroll, { passive: true });

    const sections = Array.from(element.querySelectorAll<HTMLElement>("section[id]"));
    const navLinks = Array.from(navigation?.querySelectorAll<HTMLAnchorElement>("nav a[href^='#']") ?? []);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if (!visible) return;
      for (const link of navLinks) {
        const active = link.hash === "#" + visible.target.id;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    }, { rootMargin: "-10% 0px -45% 0px", threshold: [0,0.1,0.4] });
    sections.forEach(section=>observer.observe(section));

    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 1024px) and (hover: hover)",
    }, context => {
      if (!context.conditions?.motion) return;
      const desktop = Boolean(context.conditions.desktop);
      const splits: SplitText[] = [];
      // Everything is readable in server HTML; no CSS hiding prerequisite.
      const heroHeading = element.querySelector<HTMLElement>("[data-hero-heading]");
      if (heroHeading) {
        splits.push(SplitText.create(heroHeading, {
          type: "lines,words", mask: "lines", autoSplit: true, aria: "auto",
          onSplit(self) {
            return gsap.from(self.words, { yPercent: 105, opacity: 0, duration: 0.85, stagger: 0.055, ease: "power3.out", clearProps: "transform,opacity" });
          },
        }));
      }
      gsap.from(element.querySelectorAll("[data-hero-item]"), {
        y: desktop ? 24 : 12, opacity: 0, duration: 0.75, delay: 0.12, stagger: 0.08, ease: "power2.out", clearProps: "transform,opacity",
      });
      if (desktop) gsap.from(element.querySelector(".hero-background img"), {
        scale: 1.07, duration: 1.6, ease: "power2.out", clearProps: "transform",
      });
      element.querySelectorAll<HTMLElement>("[data-split-heading]").forEach(heading => {
        // Mobile keeps text intact and reduces DOM/motion work.
        if (!desktop) { sectionEntrance(heading); return; }
        splits.push(SplitText.create(heading, {
          type: "lines", mask: "lines", autoSplit: true, aria: "auto",
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 105, duration: 0.65, stagger: 0.08, ease: "power2.out", immediateRender: false,
              scrollTrigger: { trigger: heading, start: "top 90%", once: true },
            });
          },
        }));
      });
      element.querySelectorAll<HTMLElement>("[data-section-reveal]").forEach(target => {
        if (desktop && target.matches(".metric-panel, .service-panel, .leader-panel, .project-copy")) return;
        sectionEntrance(target);
      });
      if (desktop) {
        element.querySelectorAll<HTMLElement>("[data-image-reveal]").forEach(image => {
          gsap.from(image, {
            clipPath: "inset(8% 0 0 0)", duration: 0.85, ease: "power2.out", immediateRender: false,
            clearProps: "clipPath", scrollTrigger: { trigger: image, start: "top 95%", once: true },
          });
        });
        element.querySelectorAll<HTMLElement>("[data-project-story]").forEach((story, index) => {
          const image = story.querySelector("img");
          if (image) gsap.fromTo(image, { scale: 1.055, yPercent: 2 }, {
            yPercent: -2, ease: "none", scrollTrigger: { trigger: story, start: "top bottom", end: "bottom top", scrub: 0.6 },
          });
          const copy = story.querySelector(".project-copy");
          if (copy) gsap.from(copy, {
            x: index % 2 ? 16 : -16, duration: 0.8, clearProps: "transform",
            scrollTrigger: { trigger: story, start: "top 85%", once: true },
          });
        });
      }
      const disposeHover = desktop ? homeHoverEffects(element, navigation) : undefined;
      const disposeScroll = desktop ? homeScrollEffects(element, navigation) : undefined;
      const disposeEditorial = desktop ? editorialScenes(element) : undefined;
      const footer = document.querySelector<HTMLElement>(".home-footer > .home-container");
      if (footer && !desktop) sectionEntrance(footer);
      // SplitText autoSplit tracks font loading and line reflow; contexts own tweens/triggers.
      return () => {
        cancelScroll();
        disposeHover?.();
        disposeScroll?.();
        disposeEditorial?.();
        splits.forEach(split=>split.revert());
      };
    }, root);

    return () => {
      cancelScroll();
      observer.disconnect();
      media.revert();
      document.removeEventListener("click", navigate);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchstart", cancelScroll);
    };
  }, { scope: root });
  return <div ref={root} className="bsj-home" data-home-root>{children}</div>;
}
