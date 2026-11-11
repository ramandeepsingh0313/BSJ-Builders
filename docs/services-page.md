# Our Services implementation

## Scope
The complete /services page replaces the foundation placeholder. Home and About content/layouts were retained.
The only integration changes are the canonical Services navigation link, shared chrome selection for /services,
and extending the existing Home/About hero typography selectors to Services without changing their values.
No dependencies, CMS, database, authentication, deployment or Git push were introduced.

## Page structure
1. Construction-image hero: supplied headline, description, WHAT WE DO eyebrow, service anchor and contact link.
2. OUR EXPERTISE introduction: Built Around Your Vision, editorial copy and a seven-service anchor index.
3. Seven numbered service sections on this one route. Residential, civil works and interiors use larger asymmetric features;
commercial, renovation, turnkey and management use more compact image rows. No seven-card grid.
4. Five-stage ordered process: Consultation, Site Assessment, Planning & Estimate, Execution, Final Handover.
Desktop uses a horizontal structural line; tablet/mobile use a vertical sequence.
5. Architectural project connection and Explore Our Projects link to /projects.
6. Have a Project in Mind inquiry section; Discuss Your Project and Contact Us link to the existing /contact route.
7. Existing HomeFooter reused with its established inner-page routing, theme treatment and content.

## Files
- src/app/services/page.tsx — server-rendered sections and metadata.
- src/app/services/services.css — Services-only responsive composition.
- src/lib/services-content.ts — the seven service descriptions and five supplied process stages.
- src/components/services/services-experience.tsx — scoped interactive enhancement.
- src/components/home/home-chrome.tsx — Services navigation/active state.
- src/components/home/site-chrome.tsx and src/app/layout.tsx — reuse existing chrome on /services.
- src/app/home.css — Services shares the exact existing hero font-size/weight/line-height/spacing rules.

## Brand and imagery
Reuses Manrope/Inter, actual Tailwind v4 brand tokens, Container, Button, HomeEyebrow,
the existing sticky pill header, theme switch, footer and homeHoverEffects GSAP utility.
The 1280px outer container, desktop 64px padding and existing 1199/1023/767px behavior are retained.

Original approved files, unchanged:
- foundations.jpg — hero and civil works.
- residential.jpg — residential.
- commercial.jpg — commercial.
- retrofitting.jpg — renovation/remodeling, with a descriptive facade alt rather than a claim of an actual renovation.
- hero.jpg — turnkey architectural imagery.
- interiors.jpg — interior finishing.
- site-engineers.jpg — project management.
- cantilever-villa.jpg — project transition, labelled Architectural reference.

The existing Punjab Junction export contains design/interface artwork. It was not treated as independently verified
renovation photography or used to create a new Punjab Junction Clothing case study.
The existing Projects/Contact routes remain in their current development state; this task adds navigation to them.

## Motion and accessibility
Hero word/heading stagger, cinematic image entrance, SplitText line reveals, section entrances,
numbered row entrances, architectural image masks, subtle feature-image parallax,
keyboard/pointer hover feedback, process-line progression and smooth same-page navigation.
No artificial pinning or scroll locking.
useGSAP/matchMedia own cleanup; events and tweens are removed/reverted on route deactivation or preference changes.
Advanced image/text work is desktop hover-capable only. Mobile uses lightweight entrances and one progress-line tween.
Reduced motion retains all readable content. Semantic headings, ordered process list, alt text and focusable anchor targets
are present. Chapter destinations land below the sticky header.
No enquiry form or fake submission behavior was added.

## Verification
npm run lint: passed.
npm run typecheck: passed.
npm run build: passed; all six site routes prerendered.

Chromium and WebKit: desktop, iPhone 13 profile and iPad Mini profile, both themes.
- Seven service titles and five process stages present.
- All nine image elements loaded.
- Services active navigation state correct.
- Anchor navigation/focus/header clearance passed.
- Process progression and hover tested; reduced-motion cleanup passed.
- Contact CTA and back navigation passed.
- No runtime browser errors.
- No horizontal overflow at 320, 375, 390, 640, 767, 768, 834, 1023, 1024, 1280, 1439, 1440 and 1920px.
- JavaScript-disabled page returns 200, shows all seven services/five stages and opens its native mobile menu.
- Home/About/Services computed hero typography matches; About/Services footer text matches.

Reports: docs/qa/services-results.json and services-regression-results.json.
Preview screenshots: docs/qa/services-*.png.
Reproducible local scripts: docs/qa/services-test.mjs and services-regression-test.mjs
(use this machine's existing cached Playwright installation).

Limits: WebKit device profiles are not physical Safari/iOS tests; photos remain the original 512px exports.
