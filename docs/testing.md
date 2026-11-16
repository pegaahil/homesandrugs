# Validation log

2026-11-15: Five catalog photos and page-2 material/dimension statements reviewed. No.41 changed to its page-2 full rug photograph rather than the page-1 room view. Automated and browser results are recorded below after execution.

Automated checks passed: five-record schema, asset links, dominant-color extraction, blend/contrast rank behavior, pattern weight, rotated dimensions and empty-result filtering. JavaScript syntax checks passed.

Browser tests passed: illustrated sample; local PNG upload; corrupt JPEG rejection; direct wall-color correction; contrast/open preference changed ranking from No.41/42/6 to No.48/38/41; three selections; partial-dimension validation; 50x50cm no-match state; reset; text export downloaded and inspected. Desktop 1280x900 and mobile 390x844 checked; mobile document width 375px, no horizontal page overflow. Screenshots use synthetic illustrations, not a customer photo. Pointer color sampling also passed: selecting Furniture and clicking the illustrated cushion set its colour to #EADAC0. No browser console errors were observed. Large-file and maximum-pixel limits have not been stress-tested.

Live GitHub Pages verified on 2026-11-15: versioned assets loaded, all five catalog photos loaded, illustrated sample ranked No.41/42/6, and comparison selection worked. An initial stale-cache issue was fixed by versioning frontend asset URLs. See live-site.png in the evidence package.

## UX update — 2026-11-16
Automated catalog/ranking checks and JavaScript syntax checks passed, including normalized crop bounds, convex quadrilateral rejection, projection corner mapping and rotation round trips.

Browser checks passed on the local build: initial progressive disclosure, illustrated sample, reason-first cards, manual preview, changing rugs with shared size/rotation, oval texture masking, corner drag, nudge and keyboard controls, original-view disabling edits, two-choice limit and third-choice feedback, comparison PNG download, mobile A/B switching, and reset hiding preview/comparison. At a 390px viewport the document width was 375px, with no horizontal overflow. No console errors were observed. Comparison PNG is an actual downloaded result with an illustrated sample room. Prior upload/ranking checks above belong to the previous release, not a fresh complete regression of this update.

Limitations: previews share one visual footprint rather than physical dimensions; no furniture masking, relighting or shadows. Exhaustive touch-device, image-load failure and large-file stress testing remain outstanding.

## Follow-up review
The automated catalog, ranking and geometry checks passed again. In the published interface, the illustrated sample produced recommendations and switching the preview to No.42 preserved size 80% and rotation 10 degrees. This review's comparison-download event wait timed out in browser automation and is inconclusive; it is not a new export pass or proof that the application export failed. Mobile switching was not rechecked in this run. Earlier test results remain identified above.
