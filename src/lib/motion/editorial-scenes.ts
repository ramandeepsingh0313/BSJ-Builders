import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "./core";

gsap.registerPlugin(ScrollTrigger);

/** Desktop enhancement only. All links, copy and thumbnail images exist in server HTML. */
export function editorialScenes(root: HTMLElement) {
  const removeListeners: (() => void)[] = [];
  const resetAttributes: (() => void)[] = [];
  const context = gsap.context(() => {
    const gallery = root.querySelector<HTMLElement>("[data-service-gallery]");
    const rows = Array.from(gallery?.querySelectorAll<HTMLElement>("[data-service]") ?? []);
    const panels = Array.from(gallery?.querySelectorAll<HTMLElement>("[data-gallery-panel]") ?? []);
    const stage = gallery?.querySelector<HTMLElement>(".discipline-stage");
    if (gallery && stage && rows.length && rows.length === panels.length) {
      const images = panels.map(panel => panel.querySelector("img"));
      gsap.set(images.filter(Boolean), { scale: 1.06 });
      if (images[0]) gsap.set(images[0], { scale: 1 });
      const fades = panels.map(panel => gsap.quickTo(panel, "opacity", { duration: 0.5, ease: "power2.inOut" }));
      const zooms = images.map(image => image ? gsap.quickTo(image, "scale", { duration: 0.9, ease: "power2.out" }) : undefined);
      const progress = gsap.quickTo(stage, "--gallery-progress", { duration: 0.6, ease: "power2.out" });
      let scrolled = 0;
      let hovered: number | undefined;
      let focused: number | undefined;
      let active = -1;
      function show() {
        const next = hovered ?? focused ?? scrolled;
        if (next === active) return;
        active = next;
        panels.forEach((_, index) => {
          fades[index](index === next ? 1 : 0);
          zooms[index]?.(index === next ? 1 : 1.06);
          rows[index].dataset.active = String(index === next);
        });
        progress((next + 1) / rows.length);
      }
      rows.forEach((row, index) => {
        const initial = row.getAttribute("data-active");
        resetAttributes.push(() => {
          if (initial === null) row.removeAttribute("data-active");
          else row.setAttribute("data-active", initial);
        });
        const enter = () => { hovered = index; show(); };
        const leave = () => { hovered = undefined; show(); };
        const focusIn = () => { focused = index; show(); };
        const focusOut = (event: FocusEvent) => {
          if (event.relatedTarget instanceof Node && row.contains(event.relatedTarget)) return;
          focused = undefined; show();
        };
        row.addEventListener("pointerenter", enter);
        row.addEventListener("pointerleave", leave);
        row.addEventListener("focusin", focusIn);
        row.addEventListener("focusout", focusOut);
        removeListeners.push(() => {
          row.removeEventListener("pointerenter", enter); row.removeEventListener("pointerleave", leave);
          row.removeEventListener("focusin", focusIn); row.removeEventListener("focusout", focusOut);
        });
        ScrollTrigger.create({
          trigger: row, start: "top 58%", end: "bottom 58%",
          onEnter: () => { scrolled = index; show(); },
          onEnterBack: () => { scrolled = index; show(); },
        });
      });
      show();
      const frame = gallery.querySelector(".discipline-image-stack");
      if (frame) gsap.from(frame, {
        clipPath: "inset(0 0 18% 0)", duration: 0.9, ease: "power3.out",
        immediateRender: false, clearProps: "clipPath",
        scrollTrigger: { trigger: gallery, start: "top 85%", once: true },
      });
    }

    const trust = root.querySelector(".trust-redesign .trust-reasons");
    if (trust) {
      gsap.fromTo(trust, { "--trust-progress": 0 }, {
        "--trust-progress": 1, ease: "none",
        scrollTrigger: { trigger: trust, start: "top 72%", end: "bottom 62%", scrub: 0.6 },
      });
      trust.querySelectorAll(".trust-step-index").forEach(step => gsap.from(step, {
        scale: 0.85, duration: 0.5, ease: "back.out(1.4)", immediateRender: false, clearProps: "transform",
        scrollTrigger: { trigger: step, start: "top 72%", once: true },
      }));
    }
    root.querySelectorAll<HTMLElement>(".project-watermark").forEach(number => {
      gsap.fromTo(number, { y: 20 }, {
        y: -16, ease: "none",
        scrollTrigger: { trigger: number.closest("[data-project-story]"), start: "top bottom", end: "bottom top", scrub: 0.7 },
      });
    });
  }, root);
  return () => {
    removeListeners.forEach(remove => remove());
    context.revert();
    resetAttributes.forEach(reset => reset());
  };
}
