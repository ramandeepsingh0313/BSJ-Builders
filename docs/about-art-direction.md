# About page — art direction refinement

Updated locally on 10 November 2026 after the user requested a more distinctive visual treatment.

## Design
- Full-height photographic hero with an oversized two-line brand statement, a blended navy overlay, architectural grid, circular scroll seal and three chapter links.
- Large company-story statement, inset interior photography, and open vision/mission columns.
- Decorative outlined typography band, driven by scroll on desktop.
- Numbered guiding principles with a scroll-drawn vertical line and larger outlined indices.
- Team portraits restyled into a stepped editorial arrangement, preserving the shared component and supplied identities.
- Navy closing section with a large interactive arrow and the existing contact/services links.

The existing company copy and original exported photography are retained. No new business statistics, staff identities or certifications were added.
Changes are confined to the About page markup/styles/motion and QA documentation.

## GSAP
The About route uses scoped useGSAP/matchMedia effects:
hero image settle/parallax, SplitText heading reveals, readable statement-word reveals,
rotating seal, inset-photo parallax, scroll-linked typography, principles progress,
team stagger and contact-arrow hover/focus.
Chapter anchors use a cancellable GSAP scroll tween and focus the destination below the sticky header.
Mobile keeps lightweight entrances and a normal stacked reading order.
Reduced motion restores original text/styles and uses immediate chapter navigation.
No pinning or scroll locking is used.

## Validation
npm run lint, npm run typecheck and npm run build passed.
Chromium and WebKit desktop/iPhone-profile checks passed in both themes.
Final resize stress checks: 320, 390, 640, 768, 1024, 1280, 1440 and 1920px, with no document horizontal overflow.
A transient narrow-width WebKit text-wrap issue was found and fixed with local heading wrapping rules.
Chapter target focus and header clearance, seal rotation, typography movement, CTA hover, cleanup on preference changes and JavaScript-disabled content were verified.
No browser runtime errors were reported.
Results: docs/qa/about-results.json and docs/qa/about-wow-results.json.
Previews: docs/qa/about-wow-*-hero.png, *-full.png, *-story.png, *-cta.png and *-mobile.png.

Limitations: WebKit profiles are not physical iOS/Mac Safari tests. Photography remains limited to the provided 512px exports.
