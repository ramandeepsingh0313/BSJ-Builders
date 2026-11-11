import { SplitText } from "gsap/SplitText";
import { gsap } from "./core";
gsap.registerPlugin(SplitText);
/** Use for plain text only, inside useGSAP and a no-preference media context. */
export function lineReveal(element: HTMLElement) {
  return SplitText.create(element, {
    type: "lines", mask: "lines", autoSplit: true, aria: "auto",
    onSplit(self) {
      return gsap.from(self.lines, { yPercent: 100, duration: 0.6, stagger: 0.08, ease: "power2.out" });
    },
  });
}
