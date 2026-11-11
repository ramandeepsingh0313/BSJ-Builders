import { gsap } from "./core";

/** Pre-create every tween inside a context. Events only play/reverse existing animations. */
export function homeHoverEffects(root: HTMLElement, header: HTMLElement | null) {
  const removeListeners: (() => void)[] = [];
  const resetStyles: (() => void)[] = [];
  const context = gsap.context(() => {
    function bind(
      target: HTMLElement,
      timeline: gsap.core.Timeline,
      move?: (event: PointerEvent) => void,
      reset?: () => void,
    ) {
      let hovered = false;
      let focused = false;
      const update = () => {
        if (hovered || focused) timeline.play();
        else timeline.reverse();
      };
      const enter = () => { hovered = true; update(); };
      const leave = () => { hovered = false; reset?.(); update(); };
      const focusIn = () => { focused = true; update(); };
      const focusOut = (event: FocusEvent) => {
        if (event.relatedTarget instanceof Node && target.contains(event.relatedTarget)) return;
        focused = false; reset?.(); update();
      };
      target.addEventListener("pointerenter", enter);
      target.addEventListener("pointerleave", leave);
      target.addEventListener("focusin", focusIn);
      target.addEventListener("focusout", focusOut);
      if (move) target.addEventListener("pointermove", move, { passive: true });
      removeListeners.push(() => {
        target.removeEventListener("pointerenter", enter);
        target.removeEventListener("pointerleave", leave);
        target.removeEventListener("focusin", focusIn);
        target.removeEventListener("focusout", focusOut);
        if (move) target.removeEventListener("pointermove", move);
      });
    }

    root.querySelectorAll<HTMLElement>("[data-service]").forEach(row => {
      const image = row.querySelector("img");
      const arrow = row.querySelector(".service-arrow");
      const heading = row.querySelector("h3");
      const timeline = gsap.timeline({ paused: true, defaults: { duration: 0.45, ease: "power2.out" } });
      timeline.to(row, { "--hover-glow": 1 }, 0);
      if (image) timeline.to(image, { scale: 1.055, duration: 0.7 }, 0);
      if (arrow) timeline.to(arrow, { x: 3, y: -3, rotation: 5 }, 0);
      if (heading) timeline.to(heading, { y: -2 }, 0);
      const setX = gsap.quickSetter(row, "--spot-x", "%");
      const setY = gsap.quickSetter(row, "--spot-y", "%");
      bind(row, timeline, event => {
        const box = row.getBoundingClientRect();
        setX((event.clientX - box.left) / box.width * 100);
        setY((event.clientY - box.top) / box.height * 100);
      });
      resetStyles.push(() => {
        row.style.removeProperty("--spot-x"); row.style.removeProperty("--spot-y");
      });
    });

    root.querySelectorAll<HTMLElement>(".leader-panel").forEach(panel => {
      const portrait = panel.querySelector<HTMLElement>(".leader-portrait .home-photo");
      const image = portrait?.querySelector("img");
      const badge = panel.querySelector(".leader-portrait > .home-icon");
      const timeline = gsap.timeline({ paused: true, defaults: { duration: 0.55, ease: "power2.out" } });
      if (portrait) timeline.to(portrait, { filter: "grayscale(0)" }, 0);
      if (image) timeline.to(image, { scale: 1.045, duration: 0.7 }, 0);
      if (badge) timeline.to(badge, { rotation: 12, scale: 1.08 }, 0);
      // Keep informational portraits out of the tab order; adjacent links retain their focus affordances.
      bind(panel, timeline);
    });

    root.querySelectorAll<HTMLElement>(".value-panel, .metric-panel, .trust-reasons article").forEach(panel => {
      const icon = panel.querySelector(".home-icon, .metric-label svg");
      if (!icon) return;
      const timeline = gsap.timeline({ paused: true });
      timeline.to(icon, { rotation: -8, scale: 1.08, duration: 0.4, ease: "power2.out" });
      bind(panel, timeline);
    });

    const buttons = [
      ...root.querySelectorAll<HTMLElement>(".home-button, .small-link"),
      ...header?.querySelectorAll<HTMLElement>(".header-cta") ?? [],
    ];
    buttons.forEach(button => {
      const xTo = gsap.quickTo(button, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(button, "y", { duration: 0.45, ease: "power3.out" });
      const icon = button.querySelector(".button-orb svg, :scope > svg");
      const timeline = gsap.timeline({ paused: true, defaults: { duration: 0.35, ease: "power2.out" } });
      timeline.to(button, { "--button-hover": 1 }, 0);
      if (icon) timeline.to(icon, { x: 3 }, 0);
      bind(button, timeline, event => {
        const bounds = button.getBoundingClientRect();
        xTo(gsap.utils.clamp(-4, 4, (event.clientX-bounds.left-bounds.width/2)*0.06));
        yTo(gsap.utils.clamp(-3, 3, (event.clientY-bounds.top-bounds.height/2)*0.08));
      }, () => { xTo(0); yTo(0); });
    });
  }, root);
  return () => {
    removeListeners.forEach(remove => remove());
    context.revert();
    resetStyles.forEach(reset => reset());
  };
}
