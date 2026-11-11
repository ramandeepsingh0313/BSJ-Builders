# WebKit / iOS-profile QA

Completed using Playwright WebKit 27.2 on Windows on 10 November 2026.
This is a patched WebKit engine with simulated device settings. It does not establish physical iPhone/iPad or branded Safari-on-macOS coverage.

Eight configurations passed the final matrix:
Desktop WebKit, iPhone SE, iPhone 13, iPhone 15 Pro, iPhone 15 Pro Max,
iPad Mini, iPad Pro 11 and iPhone 15 Pro landscape.

Checks: HTTP status, horizontal overflow, fixed-header navigation clearance, menu behavior,
gallery keyboard activation on desktop, saved theme, range/select controls, phone validity,
image loading and reduced-motion cleanup. Zero browser runtime errors in the final run.
Touch-device form controls were increased to 16px.
A separate Chromium/WebKit check confirms that the homepage hero's yellow accent survives SplitText wrapping.

Reproduce locally with node docs/qa/webkit-test.mjs (uses this machine's existing cached Playwright path).
Detailed results: docs/qa/webkit-results.json.
Screenshots: docs/qa/webkit-*.png.
Remaining: real-device Safari, native iOS keyboard/picker behavior, address-bar changes and device performance.
