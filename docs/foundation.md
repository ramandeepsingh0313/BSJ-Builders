# BSJ Builders foundation

Local-only implementation. No publishing, repository push, CMS, backend or enquiry submission.

## Design and content
Tailwind v4 CSS-first tokens live in src/app/globals.css. Manrope headings and Inter body fonts are self-hosted through next/font/google. Six routes share a server-rendered header/footer. Navigation uses a native details disclosure so it also opens without JavaScript; its client enhancement supplies active state and Escape handling.
The homepage uses a supplied Figma reference photograph, explicitly labelled as not a BSJ Builders project. The original architectural SVG remains available as a placeholder. Existing public assets are preserved. Replace it with approved photography via ProjectImage, supplying alt text, caption and sizes. Raster images use Next's optimizer; SVG remains vector.
Figma reference: https://www.figma.com/design/4QBFecfDDKRbVUMmX9SnSy/Untitled?node-id=8-2
The full Figma homepage belongs to the next phase. Treat statistics, guarantees and contact details in the mockup as unverified until approved.

## Motion contract
Use MotionScope for hero/text/image reveals; its children can be server components.
Markup is visible by default. Never add opacity-0 or visibility:hidden as an animation prerequisite.
useGSAP scopes effects and reverts on unmount/prop changes. matchMedia reverts on preference changes.
Basic reveals are short and lightweight on mobile. No smooth scrolling is installed globally.

Advanced helpers are prepared but unused:
- reveals.ts: hero timeline, text stagger, image clip-path
- text.ts: lazy opt-in SplitText lines with autoSplit and accessible text
- scroll.ts: section entrance, parallax, desktop pinning, footer entrance
- service-row.ts: indicator feedback for focus and hover
- flip.ts: capture/animate committed layout changes

Import advanced modules only in dedicated client components that require them.
Call helpers inside useGSAP and gsap.matchMedia("(prefers-reduced-motion: no-preference)", ...).
For parallax/pinning additionally require "(min-width: 1024px) and (hover: hover)".
For dynamic imports, guard against unmount and create a scoped context AFTER resolution; revert that context in cleanup.
Wrap delayed/event handlers with contextSafe; remove DOM listeners in cleanup.
Retain SplitText instances and revert them on cleanup. Returned animations from onSplit are managed during re-splitting.
Avoid splitting headings containing links or controls.
Flip must run after React commits the changed layout. Capture before mutation; do not mutate React-owned structure directly.
Do not install global ScrollTrigger defaults or kill triggers owned by other components.
Lenis stays unused until a demonstrated need; native scrolling is the default.

## Validation
Run npm run lint, npm run typecheck, npm run build.
Manually review narrow and wide viewports, keyboard navigation, JavaScript disabled,
reduced motion (including toggling while open), route navigation and back/forward.
Browser visual verification is separate from compiler/build checks.
Google fonts require network access during the production build.

## Content still required
Approved company story, service catalogue, project images/descriptions, partnership terms,
verified contact details, enquiry delivery requirements and final homepage design decisions.

## Supplied assets
Source folder: C:\Users\dell\Downloads\bsj_builders___spaciaz_inspired_editorial_homepage_images_2026-11-10
Inspected 14 JPG files. Image 1 is copied to public/images/homepage-reference.jpg.
All source files are unchanged. Remaining images are reserved for the homepage phase.
The supplied 512-by-286 hero reference is suitable for placement preview; a larger approved original is needed for final large-screen photography.
Brand favicon and final logo assets are still required; the existing starter favicon is preserved.

## Foundation check results
npm run lint: passed without warnings.
npm run typecheck: passed.
npm run build: passed; all six routes statically prerendered.
No browser automation was available for visual, keyboard or reduced-motion verification.