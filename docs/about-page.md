# About page

Implemented locally on 10 November 2026.

## Content and design
Replaces the foundation placeholder with an editorial company profile:
- Brand-tagline hero, location/breadcrumb and supplied construction-site photograph.
- Company story, vision and mission using the established company/location/service content.
- Three guiding principles with an animated progress guide and supplied blueprint image.
- Existing leadership component reused with an About-specific eyebrow.
- Contact and Services calls to action.

No new statistics, project claims, staff identities, contact details or certifications were introduced. The photography remains the supplied 512px exports.

## Shared architecture
The existing floating header, theme toggle and darker footer are reused with route-aware navigation.
The homepage About Us link now opens /about. Footer home-section links resolve to the homepage when used from About.
Other unfinished routes retain their foundation header/footer.
Leadership accepts an optional eyebrow prop; homepage output is unchanged.
about-experience.tsx confines SplitText, scroll entrances, parallax and hover effects to the About route, with useGSAP/matchMedia cleanup and lightweight mobile behavior.

## Checks
npm run lint, npm run typecheck and npm run build passed.
About was exercised in Chromium and WebKit, both desktop and iPhone-profile contexts, in dark and light themes:
- HTTP 200, no browser runtime errors.
- All five images load.
- Menu opens and Escape closes it.
- Home/About navigation returns to the correct content and header.
- Reduced motion removes split text.
- No horizontal overflow at 320, 390, 768, 1024, 1280, 1440 and 1920px.

Results and screenshots: docs/qa/about-results.json and about-*.png.
These are local engine/device-profile checks, not physical iOS or Mac Safari tests.
