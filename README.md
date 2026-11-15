# Homes & Rugs — Room Match

A static, English-language catalog matcher: load one room photograph, review three colour roles, choose blend or light/dark contrast, optionally filter by maximum dimensions, and shortlist three existing rugs and compare two in the same room. No runtime LLM, API charges, image generation or photo upload. The new project replaces the earlier manual-placement concept for this assignment.

## Run
Open index.html or serve this folder with `python -m http.server 8782 --bind 127.0.0.1`. Run `node scripts/check.cjs` and `node --check app.js`.

## Use
Choose a photo or the clearly labelled illustrated sample. Swatches are initial frequency-based guesses; assign actual wall/furniture/floor colours using the controls or click the room image to sample the selected role. Preferences update results immediately. Both dimensions are required if using the size filter. Select up to two results, use See it in my room to place a rug with four-corner perspective controls, and compare both room composites. Switching rugs preserves the shared placement. Download a labelled preview PNG, two-view comparison PNG or text shortlist. Refresh or Clear removes session data.

## Limits
Photo lighting and display differences affect colours. RGB distance is a simple, explainable design heuristic; it is not a learned interior-design model. Contrast means light/dark contrast, not guaranteed complementary hues. No object/style detection or inferred physical scale. Manual compositing is approximate: both rugs occupy the same footprint regardless of their actual dimensions. Furniture remains behind the rug overlay; lighting/shadows are not simulated. The five silk rugs have editorial open/dense labels; these are not objective style categories. Catalog material and dimensions are owner statements, not independent certifications. Size fitting uses the declared bounding dimensions, including for an oval.

## Extend
Read AGENTS.md. Copy templates/rug.json, add sourced facts, permitted image and editorial palette/pattern labels and normalized texture crop, document provenance, and register the record in catalog.js. Cards, comparisons and ranking are data-driven. No page markup changes are needed. Test the new entry and any ranking changes before publishing.

Repository: https://github.com/pegaahil/homesandrugs
Intended website: https://pegaahil.github.io/homesandrugs/

See docs/testing.md for actual verification status. AI assistance must be disclosed with real prompt/response evidence and the student's own explanation when submitting.
