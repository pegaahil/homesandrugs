# Homes & Rugs — Room Match

A static, English-language catalog matcher: load one room photograph, review three colour roles, choose blend or light/dark contrast, optionally filter by maximum dimensions, and compare the top three existing rugs. No runtime LLM, API charges, image generation or photo upload. The new project replaces the earlier manual-placement concept for this assignment.

## Run
Open index.html or serve this folder with `python -m http.server 8782 --bind 127.0.0.1`. Run `node scripts/check.cjs` and `node --check app.js`.

## Use
Choose a photo or the clearly labelled illustrated sample. Swatches are initial frequency-based guesses; assign actual wall/furniture/floor colours using the controls or click the room image to sample the selected role. Preferences update results immediately. Both dimensions are required if using the size filter. Select up to three results and download a text shortlist. Refresh or Clear removes session data.

## Limits
Photo lighting and display differences affect colours. RGB distance is a simple, explainable design heuristic; it is not a learned interior-design model. Contrast means light/dark contrast, not guaranteed complementary hues. No object/style detection, spatial simulation or inferred physical scale. The five silk rugs have editorial open/dense labels; these are not objective style categories. Catalog material and dimensions are owner statements, not independent certifications. Size fitting uses the declared bounding dimensions, including for an oval.

## Extend
Read AGENTS.md. Copy templates/rug.json, add sourced facts, permitted image and editorial palette/pattern labels, document provenance, and register the record in catalog.js. Cards, comparisons and ranking are data-driven. No page markup changes are needed. Test the new entry and any ranking changes before publishing.

Repository: https://github.com/pegaahil/homesandrugs
Intended website: https://pegaahil.github.io/homesandrugs/

See docs/testing.md for actual verification status. AI assistance must be disclosed with real prompt/response evidence and the student's own explanation when submitting.
