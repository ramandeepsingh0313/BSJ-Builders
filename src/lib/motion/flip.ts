import { Flip } from "gsap/Flip";
import { gsap } from "./core";
gsap.registerPlugin(Flip);
/** Capture before the layout mutation; animate after React has committed it. */
export function captureLayout(elements: HTMLElement[]) { return Flip.getState(elements); }
export function animateLayout(state: ReturnType<typeof Flip.getState>) {
  return Flip.from(state, { duration: 0.5, ease: "power2.inOut", absolute: false });
}
