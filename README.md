# One Rug, Three Spaces

A static styling explorer by Pegah Iloukhani. One owner-provided silk rug is presented in three hypothetical spaces: a quiet living room, a study and an intimate gallery.

## Run
Open index.html directly, or run `python -m http.server 8780` in this folder and visit http://localhost:8780. No build, install, API key or account is required. Clipboard access depends on browser permissions; the HEX value is always displayed as a fallback.

## Features
Select a space; compare all concepts; copy a palette colour; save a favorite locally; adjust a hypothetical room's width/depth; rotate the scaled rug; download a concept as text; print. All content is in data.js and rendered by shared components.

## Extend
Read AGENTS.md first. Use templates/rug-template.json and register source and image permissions in docs/sources.md. A new space is one additional complete object in a rug's spaces array. A new rug is another complete object in window.RUGS. The shared UI discovers the records automatically. Never duplicate a page just to add another concept.

## Validate
`node scripts/check.cjs`

`node --check app.js`

Then check desktop/mobile layouts, all controls and the actual deployed URL. See docs/decisions.md for the validation record.

## Publish on GitHub Pages
Upload the complete contents of this folder to the repository root. In Settings → Pages, deploy from main / (root). All URLs are relative, so repository subpaths are supported. Do not upload API keys or the owner's complete catalog PDF. The site needs only the permitted photo and recorded catalog facts.

## Distinct from the final project
The Rug Detective investigates motifs and generates explicitly fictional stories with retrieval and review. This project demonstrates reusable development instructions and interior styling content. It has no motif analysis, RAG or runtime AI calls.

## AI assistance and rights
AI assisted with architecture, copy, code and testing. The owner must review the content before academic submission. No model-generated room photography is used. The supplied rug photo is used for this owner-requested educational project; no open license for third-party reuse is asserted. Source and qualification notes are in docs/sources.md.

