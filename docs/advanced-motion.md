# Homepage motion enhancement

Implemented 10 November 2026, using existing GSAP dependencies. No design assets or business content were replaced.

## Effects
- Existing cinematic hero and SplitText line reveals retained.
- Magnetic CTA and case-study buttons with restrained pointer movement and animated icons.
- Service image zoom, directional arrow feedback, and a pointer-following spotlight/border.
- Keyboard focus triggers the service/button hover treatment.
- Leadership portraits transition from monochrome to colour, with subtle image zoom and badge rotation.
- Value, metric and trust icons respond gently to hover.
- Metrics, services and leadership grids enter with staggered GSAP timelines.
- Existing metric figures count to their original values; ZERO remains unchanged.
- Project images retain parallax; the index divider now tracks scroll progress and photo labels reveal as stories enter.
- Testimonial words reveal progressively with a readable minimum opacity.
- Company-story image has restrained scroll-linked movement.
- Header shadow gains depth on scroll, and footer columns enter in sequence.

## Engineering
home-interactions.ts pre-creates paused timelines and quickTo tweens in a scoped GSAP context. Event handlers only control existing animations. Listeners and inline effects are restored on cleanup.
home-scroll.ts owns grouped entrances, counters and supplementary scroll effects in its own context. Counter text and accessibility labels are restored on cleanup.
home-experience.ts enables advanced effects only for desktop hover-capable devices with no reduced-motion preference. Mobile retains its lightweight existing motion. Changing preference/viewport reverts desktop effects.
No pinning, scroll locking, new dependencies, or changes to unrelated pages.

## Validation
npm run lint, npm run typecheck and npm run build all passed.
Chromium browser tests confirmed:
- magnetic movement, service zoom/spotlight/arrow animation and keyboard focus
- original metric values after counting and after cleanup
- project scroll progress and colour portrait hover
- reduced-motion cleanup, viewport changes and route/back navigation
- dark and light theme compatibility
- no horizontal overflow at 320, 390, 768, 1024 and 1280px
- readable JavaScript-disabled content with original figures
- zero browser errors

Machine-readable results: docs/qa/advanced-motion-results.json.
Previews: docs/qa/advanced-services.png, advanced-services-light.png and advanced-leadership.png.
