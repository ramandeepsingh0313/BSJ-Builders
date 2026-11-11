"use client";
import { useRef, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { gsap, useGSAP } from "@/lib/motion/core";
import { homeHoverEffects } from "@/lib/motion/home-interactions";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function ServicesExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP((_context, contextSafe) => {
    const element = root.current;
    if (!element || !contextSafe) return;
    const header = document.querySelector<HTMLElement>(".home-header");
    const menu = header?.querySelector<HTMLDetailsElement>("details");
    let scrolling: gsap.core.Tween | undefined;
    const cancelScroll = () => scrolling?.kill();
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu?.open) { menu.open = false; menu.querySelector("summary")?.focus(); }
    };
    const closeOnLink = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest(".home-mobile-menu a") && menu) menu.open = false;
    };
    const followAnchor = contextSafe((event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href^='#']") : null;
      const hash = link?.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const target = document.getElementById(hash.slice(1));
      if (!target || !element.contains(target)) return;
      event.preventDefault(); cancelScroll();
      const y = Math.max(0, target.getBoundingClientRect().top + scrollY - (header?.getBoundingClientRect().bottom ?? 80) - 16);
      const finish = () => { history.pushState(null, "", hash); target.focus({ preventScroll: true }); };
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo({ top: y, behavior: "instant" }); finish(); return;
      }
      const position = { y: scrollY };
      scrolling = gsap.to(position, { y, duration: 0.9, ease: "power2.inOut",
        onUpdate: () => window.scrollTo(0, position.y), onComplete: finish });
    });
    element.addEventListener("click", followAnchor);
    header?.addEventListener("click", closeOnLink);
    header?.addEventListener("keydown", closeMenu);
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
      const disposeEvents: (() => void)[] = [];
      const heroTitle = element.querySelector<HTMLElement>("[data-services-title]");
      if (heroTitle) splits.push(SplitText.create(heroTitle, {
        type: "lines,words", mask: "lines", autoSplit: true, aria: "auto",
        onSplit(self) {
          return gsap.from(self.words, { yPercent: 105, opacity: 0, stagger: 0.055, duration: 0.85, ease: "power3.out", clearProps: "transform,opacity" });
        },
      }));
      gsap.from(element.querySelectorAll("[data-services-hero]"), {
        y: 16, opacity: 0, duration: 0.75, stagger: 0.1, delay: 0.1, ease: "power2.out", clearProps: "transform,opacity",
      });
      if (desktop) {
        const heroPhoto = element.querySelector("[data-services-hero-image] img");
        if (heroPhoto) {
          gsap.fromTo(heroPhoto, { scale: 1.1 }, { scale: 1.05, duration: 1.6, ease: "power2.out" });
          gsap.fromTo(heroPhoto, { yPercent: 2 }, { yPercent: -2, ease: "none",
            scrollTrigger: { trigger: element.querySelector(".services-hero"), start: "top top", end: "bottom top", scrub: 0.7 } });
        }
        element.querySelectorAll<HTMLElement>("[data-services-heading]").forEach(heading => {
          if (heading.closest("[data-service]")) return;
          splits.push(SplitText.create(heading, {
            type: "lines", autoSplit: true, mask: "lines", aria: "auto",
            onSplit(self) {
              return gsap.from(self.lines, { yPercent: 105, duration: 0.65, stagger: 0.08, ease: "power2.out", immediateRender: false,
                scrollTrigger: { trigger: heading, start: "top 92%", once: true } });
            },
          }));
        });
      }
      element.querySelectorAll<HTMLElement>("[data-services-enter]").forEach(target => {
        if (target.closest("[data-service]")) return;
        gsap.from(target, { y: desktop ? 26 : 14, duration: 0.75, ease: "power2.out", clearProps: "transform",
          scrollTrigger: { trigger: target, start: "top 92%", once: true } });
      });
      if (desktop) {
        element.querySelectorAll<HTMLElement>("[data-services-image]").forEach(frame => {
          if (frame.closest("[data-service]")) return;
          gsap.from(frame, { clipPath: "inset(0 0 14% 0)", duration: 0.85, ease: "power2.out", immediateRender: false,
            clearProps: "clipPath", scrollTrigger: { trigger: frame, start: "top 92%", once: true } });
        });
        element.querySelectorAll(".services-project-figure img").forEach(image => {
          gsap.fromTo(image, { yPercent: 1.5 }, { yPercent: -1.5, ease: "none",
            scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: 0.7 } });
        });

        const chapters = Array.from(element.querySelectorAll<HTMLElement>("[data-service]"));
        const storyCount = element.querySelector<HTMLElement>("[data-services-story-count]");
        const storyTitle = element.querySelector<HTMLElement>("[data-services-story-title]");
        const storyProgress = element.querySelector<HTMLElement>("[data-services-story-progress]");
        const activateChapter = (chapter: HTMLElement, immediate = false) => {
          const index = Number(chapter.dataset.serviceIndex ?? 0);
          chapters.forEach(item => item.classList.toggle("is-active", item === chapter));
          if (storyCount) storyCount.textContent = `${String(index + 1).padStart(2, "0")} / ${String(chapters.length).padStart(2, "0")}`;
          if (storyTitle) storyTitle.textContent = chapter.dataset.serviceName ?? "";
          if (storyProgress) {
            const progress = (index + 1) / chapters.length;
            if (immediate) gsap.set(storyProgress, { scaleX: progress });
            else gsap.to(storyProgress, { scaleX: progress, duration: 0.45, ease: "power2.out", overwrite: true });
          }
        };
        const chaptersElement = element.querySelector(".services-chapters");
        if (chaptersElement && chapters.length) {
          element.classList.add("services-cinematic-enabled");
          const titleSplits = chapters.map(chapter => {
            const title = chapter.querySelector<HTMLElement>("h3");
            return title ? SplitText.create(title, { type: "words", aria: "auto" }) : undefined;
          });
          titleSplits.forEach(split => { if (split) splits.push(split); });
          gsap.set(chapters, { autoAlpha: 0, yPercent: 8, scale: 0.985, pointerEvents: "none" });
          gsap.set(chapters[0], { autoAlpha: 1, yPercent: 0, scale: 1, pointerEvents: "auto" });
          activateChapter(chapters[0], true);
          const sequence = gsap.timeline({
            scrollTrigger: {
              trigger: chaptersElement, start: "top 12%", end: `+=${chapters.length * 760}`, pin: true,
              scrub: 0.9, anticipatePin: 1, invalidateOnRefresh: true,
              snap: { snapTo: "labelsDirectional", duration: { min: 0.18, max: 0.65 }, delay: 0.08, ease: "power2.inOut" },
              onUpdate(self) { activateChapter(chapters[Math.min(chapters.length - 1, Math.round(self.progress * (chapters.length - 1))) ]); },
            },
          });
          chapters.forEach((chapter, index) => {
            const copy = chapter.querySelector<HTMLElement>(".services-chapter-copy");
            const image = chapter.querySelector<HTMLElement>(".services-chapter-image");
            const number = chapter.querySelector<HTMLElement>(".services-chapter-number");
            const words = titleSplits[index]?.words;
            sequence.addLabel(`service-${index}`);
            if (index === 0) {
              sequence.fromTo(number, { yPercent: 45, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, "service-0")
                .fromTo(words ?? [], { yPercent: 125, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: 0.045, duration: 0.55, ease: "power3.out" }, "service-0+=0.08")
                .fromTo([copy?.querySelector("p"), copy?.querySelector("a")], { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.42, ease: "power2.out" }, "service-0+=0.18")
                .fromTo(image, { clipPath: "inset(12% 12% 12% 12%)", scale: 1.12 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.7, ease: "power3.out" }, "service-0");
            } else {
              const previous = chapters[index - 1];
              sequence.to(previous, { autoAlpha: 0, yPercent: -7, scale: 0.975, duration: 0.42, ease: "power2.in" }, `service-${index}`)
                .fromTo(chapter, { autoAlpha: 0, yPercent: 9, scale: 0.985 }, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.55, ease: "power3.out" }, `service-${index}`)
                .fromTo(number, { yPercent: 45, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, `service-${index}+=0.06`)
                .fromTo(words ?? [], { yPercent: 125, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: 0.045, duration: 0.55, ease: "power3.out" }, `service-${index}+=0.12`)
                .fromTo([copy?.querySelector("p"), copy?.querySelector("a")], { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.42, ease: "power2.out" }, `service-${index}+=0.22`)
                .fromTo(image, { clipPath: "inset(12% 12% 12% 12%)", scale: 1.12 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.7, ease: "power3.out" }, `service-${index}`);
            }
          });
        }
      }
      const process = element.querySelector("[data-services-process]");
      if (process) {
        gsap.fromTo(process, { "--process-progress": 0 }, { "--process-progress": 1, ease: "none",
          scrollTrigger: { trigger: process, start: "top 78%", end: "bottom 48%", scrub: 0.6 } });
        process.querySelectorAll<HTMLElement>("[data-process-step]").forEach((step, index) => {
          gsap.from(step, { y: desktop ? 24 : 12, delay: desktop ? index * 0.06 : 0, duration: 0.65, ease: "power2.out",
            clearProps: "transform", scrollTrigger: { trigger: step, start: "top 90%", once: true } });
        });
      }
      const arrowLink = element.querySelector<HTMLElement>(".services-inquiry-arrow");
      const arrow = arrowLink?.querySelector("svg");
      if (desktop && arrowLink && arrow) {
        const hover = gsap.timeline({ paused: true }).to(arrow, { rotation: 45, scale: 1.04, duration: 0.4, ease: "power2.out" });
        const enter = () => { hover.play(); };
        const leave = () => { hover.reverse(); };
        arrowLink.addEventListener("pointerenter", enter); arrowLink.addEventListener("pointerleave", leave);
        arrowLink.addEventListener("focusin", enter); arrowLink.addEventListener("focusout", leave);
        disposeEvents.push(() => {
          arrowLink.removeEventListener("pointerenter", enter); arrowLink.removeEventListener("pointerleave", leave);
          arrowLink.removeEventListener("focusin", enter); arrowLink.removeEventListener("focusout", leave);
        });
      }
      const disposeHover = desktop ? homeHoverEffects(element, header) : undefined;
      return () => {
        cancelScroll(); disposeEvents.forEach(dispose => dispose()); disposeHover?.();
        splits.forEach(split => split.revert());
        element.classList.remove("services-cinematic-enabled");
      };
    }, root);
    return () => {
      cancelScroll(); media.revert();
      element.removeEventListener("click", followAnchor);
      header?.removeEventListener("click", closeOnLink);
      header?.removeEventListener("keydown", closeMenu);
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchstart", cancelScroll);
    };
  }, { scope: root });
  return <div ref={root} className="bsj-home services-page">{children}</div>;
}
