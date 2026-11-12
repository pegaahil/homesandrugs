# One Rug, Three Spaces — project handbook (v2)

## Purpose
Build an English-language, browser-local rug placement tool. Visitors load three photos of their own home, position the same rug in each, and compare the composites. The default rug is owner-provided No. 42. This is manual visual experimentation, not a measured installation plan or automatic photorealistic rendering.

Keep it distinct from The Rug Detective: no motif recognition, RAG, historical attribution, symbolism or stories. AI assists development, not runtime image processing.

## Read first
Read this handbook, README.md, data.js and docs/sources.md before changing code. Preserve user edits. Use plain HTML, CSS, JavaScript and Canvas; no framework, external API, analytics, accounts or build step is needed. Do not add such dependencies without a new requirement.

## Files and naming
- index.html: accessible page shell, upload slots, editor and comparison.
- styles.css: shared responsive styling and design tokens.
- data.js: window.RUGS and window.SPACE_COUNT; reusable catalog configuration.
- geometry.js: pure corner validation, transformations and projective mapping; also importable by Node tests.
- app.js: per-photo state, local file loading, Canvas compositing, pointer/keyboard controls and PNG export.
- assets/: permitted catalog images, lowercase kebab-case filenames.
- templates/rug-template.json: reusable rug metadata format.
- scripts/check.cjs: data, geometry and relative-resource checks.
- docs/sources.md: catalog/image attribution and limitations.
- docs/decisions.md: actual design changes and tests, never imagined results.

## Visual and interaction rules
Use warm ivory #f4f0e8, ink #24372f, muted olive #6b7254, rust #a24f36 and thin beige borders. Georgia headings and system-sans interface text. Preserve generous spacing, a large editing canvas, visible focus rings and responsive stacking below 760px. All controls need accessible labels. Give keyboard alternatives to pointer dragging: select whole rug or a corner and use arrow keys / nudge buttons. Announce errors and completed exports through a status region.

## Privacy and safe file handling
House photos are sensitive user content. Never upload, log, commit, store in localStorage/IndexedDB, send to analytics, or fetch them remotely. Keep them in memory only and explain that refresh clears the session. Revoke temporary object URLs after decoding. Accept JPEG, PNG and WebP only, maximum 20 MB; reject undecodable files with a readable error. Resize decoded photos to at most 1600 pixels on the longest side; reject images over 40 megapixels. No external image URLs. Do not publish user room photos as test fixtures or evidence without specific permission. Synthetic testing rooms must be clearly labelled as test illustrations.

## State and geometry contract
Generate SPACE_COUNT independent records (default 3). Each holds its own photo, label, four normalized corners in clockwise order, opacity and loading token. Switching slots preserves edits. A later upload must supersede an earlier pending decode. Clearing or replacing a photo resets only that slot. Use validated convex, non-self-intersecting quadrilaterals inside the photo; reject collapsed or inverted corners. Rotation/scale operates in image pixel coordinates to avoid stretching caused by photo aspect ratio. Perspective controls and dragging update the same corner model used by the comparison and exports.

Render the rug using a projective mapping approximated by a fine triangle mesh. Do not claim physical scale from a single uncalibrated photograph. Expose manual four-corner adjustment, movement, resizing, rotation, opacity, reset and before/after. Explain that the rug is drawn above furniture: no automatic occlusion, shadows or light reconstruction.

## Catalog contract and extensions
Each window.RUGS entry requires unique lowercase kebab-case id, title, image, alt, material, positive widthCm/lengthCm, sourceId and crop. crop is [x,y,width,height], normalized inside the source image, explicitly documented in sources. Never infer origin, age, value or durability. Catalog dimensions are informational; do not label the preview as true scale.

To add a rug: copy templates/rug-template.json, replace all placeholders with sourced facts, register image rights and crop in docs/sources.md, add the image and record, run checks, then test rendering and export. The selector is generated from data. To add another room slot: change SPACE_COUNT and verify upload, state isolation, comparison and export; do not duplicate HTML or hard-code three canvases. New controls must operate on the shared active-slot model.

## Export and content rules
Export real rendered PNGs at the resized photo resolution, without editor handles. Label outputs as manual previews, not to scale. Comparison export must use current independent slot states and clear slot labels. Disable export and editing until a photo and rug have loaded. Never silently substitute a fabricated room or fake successful upload. Keep image sources same-origin so Canvas export works on GitHub Pages.

## Validation and release
Run node scripts/check.cjs, node --check app.js and node --check geometry.js. In a real browser test three local uploads, replacement, invalid formats, independent edits, dragging, all transform controls, keyboard nudging, before/after, reset, removal, selected and comparison downloads. Inspect desktop/mobile rendering. Verify exported pixels, not just a success toast. Document tests actually run and known limits. Deploy to the existing public pegaahil/homesandrugs GitHub repository and GitHub Pages; verify the live page after deployment. Never include personal room uploads in the repository.

## Academic submission
Explain the project, link the repository and live page, provide this handbook, and explain how its schema and shared renderer permit new rugs/spaces. Include authentic AI assistance evidence and the student's own explanation. Do not fabricate conversation screenshots or claim unperformed tests passed.
