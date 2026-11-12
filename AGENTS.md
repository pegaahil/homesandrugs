# One Rug, Three Spaces — development handbook

## Purpose and boundaries
Build a public, English-language interior styling explorer using one owner-supplied rug photograph in three hypothetical spaces. Help visitors compare palettes, furniture suggestions and placement. This is a static educational website, not an interior-design certification or a shopping service.

Keep this project separate from The Rug Detective: no motif identification, historical symbolism, provenance inference, RAG, fictional stories or live LLM calls. AI assists development; the deployed app uses deterministic JavaScript.

## Read before changing files
Read this file, README.md, data.js and docs/sources.md. Inspect existing components before adding new ones. Preserve user edits. Never change catalog facts to make a layout fit. Do not introduce frameworks, packages, analytics, accounts or API keys without a concrete requirement.

## Repository structure
- index.html: semantic page shell and shared interactive sections.
- styles.css: shared design tokens, responsive layouts and print styles.
- data.js: window.RUGS array; the single source of truth for rugs and space concepts.
- app.js: rendering, filtering, favorites, palette copying, comparison, room scale and export.
- assets/: owner-provided images named using lowercase hyphenated IDs (no42.jpg).
- docs/sources.md: source, rights and uncertainty register.
- docs/decisions.md: actual design revisions and validation record.
- templates/rug-template.json: reusable record structure; placeholders must be replaced before publication.
- scripts/check.cjs: dependency-free data and local-reference checks.
- AGENTS.md: this authoritative development handbook.

## Design system
Use warm ivory (#f4f0e8), ink (#24372f), muted olive (#6b7254), restrained rust (#a24f36) and fine beige borders. Use system sans-serif for interface labels and Georgia for editorial headings. Keep the rug image dominant, generous whitespace, rounded controls and visible keyboard focus. Do not add stock or generated room photos that imply a real installation. Floor-plan diagrams must say they are schematic. At widths below 760px stack columns; never force horizontal page scrolling. Respect reduced-motion preferences. Use actual buttons with accessible names and pressed/expanded states where applicable.

## Content contract
Each rug requires id, title, image, alt, material, widthCm, lengthCm, sourceId and at least three spaces. IDs must be unique lowercase kebab-case. Dimensions are positive centimeters. Source each fact in docs/sources.md; label owner catalog claims as such.

Each space requires id, name, mood, description, palette (three named #RRGGBB colors), furniture (three suggestions), placement, caution and room (width and depth in meters). Example room sizes are assumptions, not measurements of the user's home. Use the same format and level of detail for each space. Palettes are manually selected styling suggestions, not extracted or color-calibrated measurements.

Never invent origin, age, artisan, value, durability, safety certifications or cultural meanings. Do not offer installation or conservation guarantees. For a silk rug, recommend verifying suitability and care with the owner or a qualified specialist; avoid claiming that all placements are suitable. Unknown facts remain unknown. Text must distinguish catalog facts, styling judgment and hypothetical dimensions.

## Adding a rug or space
1. Obtain a permitted photo and confirmed catalog facts. Register their sources and rights.
2. Copy templates/rug-template.json, replace placeholders, choose unique IDs, and add the complete object to window.RUGS in data.js.
3. Add three complete space records for a new rug. For an extra space, append one record to the existing spaces array. Do not duplicate the HTML page or add index-specific rendering branches.
4. All selectors, comparison rows and export must read the data dynamically. Preserve favorite keys as rugId:spaceId. Use textContent or escaped text for new content; never render untrusted HTML.
5. Run node scripts/check.cjs and node --check app.js. Open the page and test the new selection, compare mode, favorite, palette copy and export.
6. Check mobile layout, keyboard access, readable colors, actual photo loading, room-size validation and printed output. Document actual observations in docs/decisions.md.
7. Update README and sources only where affected. Summarize changed behavior and verification honestly; never call an unrun test passed.

## Layout calculations and interactions
Use catalog width/length for the rug rectangle and entered room width/depth for the room plane. Reject nonfinite or out-of-range inputs (2–8 m). Rotation swaps rug dimensions. Show an explicit warning if a rug does not fit. Furniture labels are schematic and not scaled installation drawings. Never stretch the rug image to change its catalog ratio. Switching rugs/spaces resets dimensions to the selected concept's defaults; favorites persist locally where storage is available. Storage/clipboard failures must have a graceful status message. Do not store personal data.

## Definition of done
At least one real rug with three complete concepts; operational selector, comparison, palette action, favorite, room inputs, rotation and export; no broken relative resources; responsive and keyboard-usable interface; source and concept labels visible; no runtime external services or secrets. GitHub Pages must serve the same files that were tested. Verify the published page before claiming publication. Submission must include repository URL, live URL, this handbook and an explanation of extending the project. AI evidence must be authentic and clearly distinguish recorded development from imagined conversations.

