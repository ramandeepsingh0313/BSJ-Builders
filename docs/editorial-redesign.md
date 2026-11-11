# Editorial homepage redesign

The user authorised layout changes beyond the original screenshot on 10 November 2026.

## What changed
- Services: the five cards are now a numbered editorial index with a sticky desktop preview. Scroll position, hover and keyboard focus change the photograph using scoped GSAP crossfades and gentle zoom. Every row retains its original image, description and link to the single Services page.
- Projects: open photographic spreads replace rounded cards, with larger headings, oversized outline numerals, finer rules and scroll-linked image/numeral movement. Existing project facts and supplied images are retained.
- Trust: numbered open rows and a connected, scroll-drawn guide replace separate cards. The supplied engineer image is sticky on desktop, with its crop focused on both engineers.

## Files
- src/components/home/homepage.tsx: restructured server markup.
- src/app/home-editorial.css: isolated responsive editorial styles.
- src/app/page.tsx: imports the additional stylesheet.
- src/lib/motion/editorial-scenes.ts: desktop gallery/progress scene context.
- src/components/home/home-experience.tsx: starts and cleans up the additional scene.

## Accessibility and responsive behavior
The service preview is decorative and aria-hidden; each service retains a meaningful image and an accessible link in the main reading order. Focus and hover both select a preview.
Mobile/tablet use stacked rows with full images and no sticky preview. Reduced motion retains the static first desktop preview and all service thumbnails. JavaScript-disabled visitors can read all content and follow all links.
No artificial pinning, scroll locking, new dependencies, replacement photography or additional business claims were introduced. Other routes remain unchanged.

## QA
Browser checks passed in dark/light themes and at 320, 390, 640, 768, 1024, 1280, 1440 and 1920px, with no horizontal overflow.
Hover selected the second preview, keyboard focus selected the fourth, and the trust guide advanced with scrolling.
Preference/viewport changes restored the original inline styles and static reading layout.
JavaScript-disabled rendering preserved all five services and image alt text.
No browser runtime errors were reported.
Results: docs/qa/editorial-results.json.
Previews: docs/qa/editorial-services.png, editorial-services-light.png, editorial-services-mobile.png, editorial-projects.png and editorial-trust.png.
The images remain the original supplied 512px exports, with their existing resolution limits.
