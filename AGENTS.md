# Homes & Rugs / Room Match — development handbook

## Purpose and boundary
Build an English, accessible, static website that recommends existing catalog rugs from a room photograph and explicit preferences. AI assists development, not runtime advice. Keep this separate from The Rug Detective: no motif interpretation, provenance inference or generated stories. Do not add paid APIs, generated interiors or credentials. Use vanilla HTML/CSS/JavaScript, GitHub Pages, and no build dependencies.

## Read and modify
Read README.md, catalog.js, matching.js and docs/sources.md first. Preserve unrelated user work. This folder is the new recommendation version; older placement prototypes stay outside it. Publish the new frontend to pegaahil/homesandrugs only after checks and browser validation. Never publish uploads or API material from older prototypes.

## Structure
- index.html: upload, room palette correction, preferences, recommendations, catalog and comparison.
- styles.css: shared ivory/forest/rust palette, serif headings, responsive cards and visible focus.
- catalog.js: window.RUG_CATALOG array; all product content lives here.
- matching.js: pure extraction/ranking functions with Node exports; shared by browser and tests.
- app.js: local photo decoding, interactive palette sampling, rendering, selection and text export.
- assets/: owner-authorized product JPGs only, lowercase IDs.
- docs/sources.md: source filenames, PDF pages, image permissions and editorial labels.
- templates/rug.json: required schema for future additions.
- scripts/check.cjs: data/resource and ranking regression tests.

## Catalog schema and adding a rug
Each entry needs unique id (noNN), title, image, material, widthCm, lengthCm, shape (rectangle/oval), pattern (open/dense), palette (3–5 hex colors), and source. Use neutral titles such as Rug No. 42 unless a title is verified. Dimensions/material must be supported by the owner's catalog, not guessed from pixels. Palette and pattern are editorial image-based annotations, not certified physical colors. Register image provenance and pages in docs/sources.md. Copy templates/rug.json, replace every placeholder, add its permitted photo and record to catalog.js, run checks and confirm the new card/ranking appears without adding HTML or conditionals. Never fabricate prices, stock, maker, age or origin.

## Matching contract
Extract frequent quantized RGB colors from a downsampled image. Assign initial three swatches as editable guesses only: never claim object detection. Users can set wall, furniture and floor colors with color controls or click the image to sample a selected role. Photograph lighting affects the palette. Similarity is an explicit RGB-distance heuristic, not professional design advice or an AI confidence percentage.

Color accounts for 80 points; stated pattern preference for 20. If pattern is Any, use color alone scaled to 100. Blend mode rewards palette proximity. Contrast mode uses 65% palette proximity and 35% closeness to a target lightness difference of 0.45 against the floor; describe this as light/dark contrast, not complementary-color detection. Color roles have equal weights. Score is a relative design score, never probability. If user supplies maximum width AND length, filter rugs by fitting dimensions in either orientation. Partial, zero or invalid dimensions must show a validation error, not silently ignore the filter. Do not infer room measurements or actual fit from a photo. Empty results must stay empty with helpful advice. Tie-break by id for stable results.

## Interaction and privacy
Keep photo pixels in memory, no fetch/analytics/storage/network upload. Accept JPEG/PNG/WebP <=20 MB and <=40 MP; decode safely, resize to max1600px, revoke object URLs and discard superseded loads. Reject unsupported/corrupt input without silently using a fabricated photo. Include a labelled synthetic demonstration for testing. Reset must remove room data and choices. Preferences update ranked cards immediately. Each result shows actual score components and relevant catalog facts. Keep comparison capped at three rugs; filters removing a selected item clear that selection. Export a text shortlist with settings, colors, scores and limitations, not raw photo data. Use textContent for user-controlled text.

## Visual/accessibility rules
Use #f5f1e9 ivory, #213c34 forest, #a9573b rust. Large editorial heading, clear numbered workflow, ample whitespace, room photo beside controls, rug imagery prominent. All inputs have labels, keyboard alternatives exist for sampling (color inputs), status is announced, mobile has no page overflow. Never embed a room as if it belongs to the user.

## Evaluation and release
Run node scripts/check.cjs and syntax checks. Tests cover exact palette outranking unrelated palette, contrast preference changing ranking, rotated size fits, exclusion and no matches. Browser test sample and local upload, corrupt file, correction, preferences, three-rug compare, size no-match, reset, export and narrow viewport. Record only actual results in docs/testing.md. A failed test must not be reported as passed. Verify the deployed page.

## Academic evidence
Submission must include required title, repository, live URL, this handbook and how a new catalog entry generates a page/card without rewriting the app. Include authentic AI prompt/response evidence and the student's own reviewed explanation. Do not fabricate conversations, scores or test screenshots.
