# BSJ Builders — Dark Mode homepage implementation

Completed locally on 10 November 2026. No Figma MCP calls, deployments, pushes or dependency installations were made during this implementation.

## Reference and asset discovery
Approved source: C:/Users/dell/Downloads/BSJ Builders — Spaciaz-Inspired Editorial Homepage.jpg (1354 × 9118).
The screenshot is the dark design supplied in the conversation, corresponding to frame 8:2.
HOMEPAGE.jpg and HOMEPAGE (1).jpg are 1921 × 6691 travel website screenshots; they were inspected and excluded.
The inline conversation screenshot is also the dark BSJ reference. The on-disk Codex attachments directory contains four pasted-text attachments, no JPG homepage exports.
No second distinct BSJ homepage JPG or standalone BSJ logo file was located in the inspected workspace/public/assets, Downloads or Codex attachment directories. This did not block implementation because the complete approved dark screenshot and all fourteen image exports were readable.
Other generic Downloads images inspected were jewellery, travel and Punjab Junction shopping references, not BSJ design assets.
No mobile/tablet frame export was located. Responsive layouts are adaptations of the approved desktop composition, not claims of matching an unavailable mobile design.

## Image mapping
Original directory: C:/Users/dell/Downloads/bsj_builders___spaciaz_inspired_editorial_homepage_images_2026-11-10
Every source filename starts with bsj_builders___spaciaz-inspired_editorial_homepage_ and ends in the number below plus .jpg.
Copies are under public/images/home. Source originals and existing public files were not overwritten.

| Source suffix | Local name | Design placement |
| --- | --- | --- |
| 1 | hero.jpg | Hero background |
| 2 | site-engineers.jpg | Company-story arched image |
| 3 | blueprints.jpg | ZERO integrity metric background |
| 4 | residential.jpg | Residential service |
| 5 | commercial.jpg | Commercial service |
| 6 | foundations.jpg | Deep foundations service |
| 7 | interiors.jpg | Wide interior-finishing service |
| 8 | retrofitting.jpg | Structural retrofitting service |
| 9 | punjab-junction.jpg | First featured project |
| 10 | cantilever-villa.jpg | Second featured project |
| 11 | trust-engineers.jpg | Structural trust section |
| 12 | jawandha.jpg | First leadership portrait |
| 13 | gurpreet.jpg | Second leadership portrait |
| 14 | harpreet.jpg | Third leadership portrait |

All exports are 512px wide, approximately 279–286px high. They visibly soften when enlarged, particularly the full-bleed hero.
Some source exports already contain baked-in text/interface fragments. These were preserved rather than replaced or retouched.

## Design and component architecture
The homepage retains the source section order:
1. Dark branded header, seven navigation anchors, phone and project CTA.
2. Full-bleed hero, two-tone headline, two CTAs and three value panels.
3. Company story, vision/mission, arched photograph and four metrics.
4. Five service panels, including the two-column interior feature.
5. Two alternating featured-project stories with supplied images and facts.
6. Structural-trust photograph/rating and three reasons.
7. Full-width client testimonial.
8. Three monochrome leadership portraits.
9. Estimate controls, budget range and enquiry.
10. Four-column footer, document-request links and company line.

Desktop uses a 1280px outer container with 64px horizontal padding (1152px content), 128px section padding, dark surfaces, generous 28–48px grid gaps and 16–48px radii. The largest viewports expand the container to 1440px. Headings use Manrope and body uses Inter through the existing next/font setup.
Dark surfaces are scoped to .bsj-home; yellow/navy use the existing brand tokens. @theme static ensures those existing tokens remain available to the separate homepage stylesheet.

Files:
- src/app/page.tsx: server-rendered homepage composition.
- src/app/home.css: homepage-only visual and responsive styles.
- src/components/home/homepage.tsx: semantic section components.
- src/components/home/home-chrome.tsx: homepage header/footer.
- src/components/home/site-chrome.tsx: pathname selection between home and existing chrome.
- src/components/home/estimate-panel.tsx: client estimate/enquiry controls.
- src/components/home/home-experience.tsx: scoped GSAP enhancement and navigation.
- src/app/layout.tsx: composes home and existing server-rendered chrome.
- src/app/globals.css: static emission of existing tokens; values unchanged.

Existing Header, Footer, Navigation, Button, Container, SectionHeading, ProjectImage and animation helpers were preserved. The homepage reuses Button, Container, fonts, tokens, GSAP core, section entrance and service-feedback utilities. Other route source files were not changed.

## Responsive behavior
- Desktop: three-column values/services/leadership; alternating two-column projects; four-column footer.
- Tablet: menu disclosure, stacked company/project/trust layouts where needed, retained service mosaic.
- Phone: stacked hero values and services, two-column metrics, single-column leadership and enquiry fields.
- Reserved image geometry prevents image-loading shifts. next/image supplies responsive optimized sources.
- Native details/navigation links and all core page content remain available without JavaScript.
- Skip link, Escape menu handling, labelled fields, focus restoration and visible focus states are present.

## Motion
- Cinematic hero word reveal and short content stagger; gentle desktop image scale settle.
- Desktop SplitText line reveals with autoSplit for font/width changes.
- ScrollTrigger section entrances and image masks.
- Service arrow movement on both hover and keyboard focus.
- Featured-project image parallax and alternating copy entrances.
- Smooth same-page navigation, active section indication, scroll cancellation on wheel/touch.
- Footer entrance.
No pinned scenes were introduced: the approved two-project layout benefits from normal reading order.
Mobile skips heading line splitting, image masking/parallax and hover work. Reduced-motion mode bypasses GSAP effects, restores split text and clears hover transforms.
useGSAP/matchMedia own tween/trigger cleanup. Observers and event listeners are removed on deactivation/unmount. Lenis/Flip are not loaded unnecessarily.

## Content and interaction boundaries
Project facts, company statistics, names, testimonial, certifications and contact details were transcribed from the supplied approved screenshot; no extra business claims were introduced. This is content provenance, not independent verification of those claims.
The displayed residential default is 4500 sq. ft. and ₹85.5–₹103.5 lakh. The calculator derives its illustrative ₹1900–₹2300 per-square-foot range from that supplied screenshot, not from market research. A visible qualifier makes clear that a written site-specific quotation is required.
No commercial rate was supplied; commercial selection requests a detailed quotation instead of inventing one.
Enquiries open a mailto draft. The website does not send email, store personal data or report a successful submission. Native non-JavaScript form fallback also uses mailto POST, avoiding personal information in a GET query string.
Footer legal labels request documents by email because no legal/compliance document content was provided. They do not point to invented policies.
The header mark uses the existing BSJ text identity with a Lucide building glyph; no standalone vector logo was found.
The starter favicon was preserved.

## Verification
Commands: npm run lint; npm run typecheck; npm run build.
All passed on final source. All six routes were statically prerendered.
Used existing cached Playwright and its installed Chromium; no package/browser reinstall.
Static desktop screenshot reviewed before adding GSAP; desktop/tablet/phone captures reviewed afterwards.
Widths tested: 320, 375, 390, 640, 768, 1024, 1280, 1440, 1920px. Final tests show no visible element or document horizontal overflow.
All fourteen images load.
Menu navigation, Escape, focus targeting, slider changes, commercial selection, email-draft feedback, smooth navigation, service hover, preference toggling and back/forward were exercised.
JavaScript-disabled homepage returns 200, has readable content and opens its native menu.
Other five routes return 200 and retain the standard header.
Production smoke server on port 3002 returned 200 with zero browser errors, correct accessible heading, working skip-link focus, menu Escape handling and cleared hover transform after reduced-motion toggle. That temporary process was stopped; the existing development server on port 3000 was retained.
Browser QA caught and fixed a stale dev stylesheet, modern-browser phone-pattern syntax, reduced-motion anchor focus and responsive grid cleanup.
Chromium QA is not a Safari/iOS device test.

## Remaining visual/functional limits
The JPG is a visual reference, not an exact typography/token export, so minor text-wrap/icon/spacing differences remain.
The imagery is limited to supplied 512px exports; no stock substitutes were used.
A standalone logo, mobile design and policy documents were not found. The responsive adaptation and email document-request behavior are documented above.
An actual delivery service for enquiry submission remains outside this frontend-only scope.
Existing dependency audit findings from project setup were not changed.
See docs/qa for captured previews and machine-readable browser results.
