import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
// No browser plugins are registered globally.
gsap.registerPlugin(useGSAP);
export { gsap, useGSAP };
export const motionQueries = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px) and (hover: hover)",
};
