import { gsap } from "./core";
/** Bind pointerenter/leave AND focus/blur via contextSafe handlers in a client component. */
export function serviceRowFeedback(indicator: HTMLElement, active: boolean) {
  return gsap.to(indicator, { x: active ? 6 : 0, duration: 0.2, overwrite: "auto" });
}
