import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "./core";
// Import this module only from an opt-in scroll interaction.
gsap.registerPlugin(ScrollTrigger);
export function sectionEntrance(element: HTMLElement) {
  return gsap.from(element, {
    y: 24, duration: 0.7, ease: "power2.out", clearProps: "transform",
    scrollTrigger: { trigger: element, start: "top 90%", once: true },
  });
}
export function subtleParallax(element: HTMLElement, trigger: HTMLElement) {
  return gsap.to(element, { y: -24, ease: "none",
    scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 0.5 } });
}
/** Content must remain in normal reading order. Call only inside desktop matchMedia. */
export function pinnedProjectStory(section: HTMLElement, panel: HTMLElement) {
  return gsap.to(panel, { y: -32, ease: "none",
    scrollTrigger: { trigger: section, pin: panel, start: "top top+=32", end: "+=320", scrub: true, invalidateOnRefresh: true } });
}
export function footerReveal(element: HTMLElement) {
  return sectionEntrance(element);
}
