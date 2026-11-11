import { gsap } from "./core";
export function heroReveal(elements: HTMLElement[]) {
  return gsap.timeline({ defaults: { duration: 0.65, ease: "power2.out" } })
    .from(elements, { y: 18, opacity: 0, stagger: 0.1, clearProps: "transform,opacity" });
}
export function textStagger(elements: HTMLElement[]) {
  return gsap.from(elements, { y: 16, opacity: 0, duration: 0.5, stagger: 0.07, clearProps: "transform,opacity" });
}
export function imageReveal(element: HTMLElement) {
  return gsap.from(element, { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "power2.out", clearProps: "clipPath" });
}
