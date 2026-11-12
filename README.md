# One Rug, Three Spaces (v2)

Try the same rug in three photographs of your home. This revision replaces the earlier palette-only styling explorer with a manual photo-compositing tool.

Live site: https://pegaahil.github.io/homesandrugs/

## Use
1. Choose one JPEG, PNG or WebP for each room slot (up to 20 MB each).
2. Select a slot. Drag the rug, or drag its four numbered corners to match the floor perspective.
3. Adjust size, rotation and opacity. Use the target selector with arrow keys or nudge buttons for precise whole-rug or corner movement.
4. Compare original / composite, reset placement, or rename the space.
5. Compare all loaded rooms, choose a favourite, and download individual or side-by-side PNGs.

Photos remain in memory in your browser. They are not uploaded or saved. Refresh clears the session. Images are resized to at most 1600px on the longest edge; images above 40 megapixels are rejected. At least two loaded rooms are required for a comparison export.

## Limits
This is an uncalibrated manual preview, not true physical scale. Rug catalog dimensions are informational. There is no automatic floor detection, furniture occlusion, lighting or shadow generation. The catalog photo is cropped to the rug body to remove most white margins and fringe. Downloads are labelled as manual previews.

## Run and check
Run `python -m http.server 8780` in this folder, then visit http://localhost:8780. No dependencies, API key, account or build step.

Run `node scripts/check.cjs`, `node --check app.js`, and `node --check geometry.js`. Browser checks are recorded in docs/decisions.md.

## Extend
Read AGENTS.md first. Add a catalog record using templates/rug-template.json and register its permitted image and facts in docs/sources.md. The rug selector is data-driven. Change window.SPACE_COUNT to add more independent room slots without duplicating HTML or rendering code. Each slot shares the same geometry and rendering pipeline.

## Publication
GitHub Pages serves main / root. Keep .nojekyll so Markdown files remain accessible. Never commit user room photos or credentials. Source code and the owner-provided catalog image are public; visitors' uploaded room photos are not.

## Academic distinction
The Rug Detective concerns motifs and fictional stories. This project concerns interactive spatial visualization and reusable AGENTS.md development rules. AI assisted development; the running application uses browser JavaScript and Canvas, not a runtime LLM.
