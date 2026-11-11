import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { gsap } from "./core";

/** Called inside the homepage's desktop, no-reduced-motion media context. */
export function homeScrollEffects(root: HTMLElement, header: HTMLElement | null) {
  const restoreCounters: (() => void)[] = [];
  let testimonial: SplitText | undefined;
  const context = gsap.context(() => {
    [".metrics-grid", ".services-grid", ".leadership-grid"].forEach(selector => {
      const grid = root.querySelector<HTMLElement>(selector);
      if (!grid) return;
      gsap.from(grid.children, {
        y: 32, opacity: 0, stagger: 0.09, duration: 0.75, ease: "power3.out",
        immediateRender: false, clearProps: "transform,opacity",
        scrollTrigger: { trigger: grid, start: "top 88%", once: true },
      });
    });

    root.querySelectorAll<HTMLElement>(".metric-number").forEach(number => {
      const original = number.textContent ?? "";
      const match = original.match(/^([\d,.]+)(.*)$/);
      if (!match) return; // ZERO is a statement, not a numerical counter.
      const end = Number(match[1].replaceAll(",", ""));
      const suffix = match[2];
      const previousLabel = number.getAttribute("aria-label");
      number.setAttribute("aria-label", original);
      const counter = { value: 0 };
      gsap.to(counter, {
        value: end, duration: 1.5, ease: "power2.out",
        scrollTrigger: { trigger: number, start: "top 90%", once: true },
        onUpdate: () => { number.textContent = Math.round(counter.value).toLocaleString("en-IN") + suffix; },
        onComplete: () => { number.textContent = original; },
      });
      restoreCounters.push(() => {
        number.textContent = original;
        if (previousLabel === null) number.removeAttribute("aria-label");
        else number.setAttribute("aria-label", previousLabel);
      });
    });

    root.querySelectorAll<HTMLElement>("[data-project-story]").forEach(story => {
      gsap.fromTo(story, { "--story-progress": 0 }, {
        "--story-progress": 1, ease: "none",
        scrollTrigger: { trigger: story, start: "top 80%", end: "bottom 35%", scrub: 0.5 },
      });
      const label = story.querySelector(".photo-label");
      if (label) gsap.from(label, {
        y: 14, opacity: 0, duration: 0.6, ease: "power2.out", immediateRender: false,
        clearProps: "transform,opacity", scrollTrigger: { trigger: story, start: "top 65%", once: true },
      });
    });

    const statement = root.querySelector<HTMLElement>(".home-testimonial blockquote");
    if (statement) testimonial = SplitText.create(statement, {
      type: "words", aria: "auto",
      onSplit(self) {
        return gsap.from(self.words, {
          opacity: 0.72, stagger: 0.08, ease: "none", immediateRender: false,
          scrollTrigger: { trigger: statement, start: "top 80%", end: "bottom 50%", scrub: 0.6 },
        });
      },
    });

    const portrait = root.querySelector(".story-portrait img");
    if (portrait) gsap.fromTo(portrait, { scale: 1.08, yPercent: 2 }, {
      yPercent: -2, ease: "none",
      scrollTrigger: { trigger: root.querySelector(".story-portrait"), start: "top bottom", end: "bottom top", scrub: 0.7 },
    });

    if (header) gsap.to(header, {
      "--scroll-depth": 1, ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "+=240", scrub: true },
    });

    const footer = document.querySelector<HTMLElement>(".home-footer .footer-grid");
    if (footer) gsap.from(footer.children, {
      y: 24, stagger: 0.1, duration: 0.75, ease: "power2.out",
      clearProps: "transform", immediateRender: false,
      scrollTrigger: { trigger: footer, start: "top 95%", once: true },
    });
  }, root);
  return () => {
    context.revert();
    testimonial?.revert();
    restoreCounters.forEach(restore => restore());
  };
}

// Plugins are registered only in modules that use them.
gsap.registerPlugin(ScrollTrigger, SplitText);
