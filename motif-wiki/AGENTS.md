# Persian Rug Motifs: editorial and development rules

This independent educational project creates an English linked Wiki and an 18-slide Traditional Chinese HTML lesson. It is not the Homes & Rugs recommendation app. No personal rug photos, Rug 42, prices, purchase advice or creative stories.

## Evidence first
Read data/sources.json and data/wiki.json before editing. Each source has an immutable Sxx identifier, public URL, full citation, access date, credibility, limitations and individually addressable excerpt notes. Excerpt notes are concise paraphrases, not verbatim extracts. Never manufacture quotes or universal meanings. Preserve attribution, approximate dates and terms such as probably. Observation, Historical claim, Interpretation and Uncertain are distinct categories. Each content claim needs evidence IDs, or a clearly identified editorial limitation tied to the scope of those sources. Absence of evidence here is not proof of historical absence.

## Structure
- scripts/build.py: curated evidence ingestion, static Wiki and presentation compiler.
- data/sources.json: reusable source notes and excerpt IDs for future retrieval.
- data/wiki.json: linked topic pages with labelled claims.
- data/slides.json: slide text with Wiki page and evidence links.
- sources/Sxx.html: one rendered note per source.
- index.html, five motif pages, structure.html, value.html, glossary.html, images.html, workflow.html, checking-log.html.
- presentation.html: exactly 15 teaching slides plus three appendix slides.
- assets/: museum images with explicit public-domain/CC0 status only. Original SVG teaching diagrams must be labelled schematic, never evidence of an actual object.
- scripts/check.py and data/check-results.json: reproducible structural checks and their actual outcome.

## Add or revise knowledge
Discuss changed scope first. Screen public museum, scholarly or specialist sources. Verify cultural attribution before image selection. Read the relevant passage, create a short paraphrase and stable excerpt ID, then connect a Wiki claim. A visual resemblance does not establish origin, date or symbolism. The five topics include motifs, patterns and layouts; do not flatten those distinctions. Shah Abbasi may designate a broader pattern, not a single botanical species. Do not infer monetary value from motifs, age, silk or knot count.

English Wiki bodies; Persian names and transliteration; Traditional Chinese descriptive labels explicitly provisional. Chinese slides use English and Persian terms on first introduction. Mark Chinese unreviewed until a named human reviewer actually reviews it. Keep unsupported interpretations visibly unresolved. New facts enter the Wiki before the slides. Every slide links to its Wiki source, which links to evidence.

## Design and interaction
Warm parchment, deep ink, restrained brick and gold. Clear serif headings, readable sans-serif body. Use a generous two-column teaching layout, mobile stacking, native links and details/summary for evidence and exercises. Keyboard slide navigation, accessible slide select, visible focus, print layout. No checkmark or cross-mark symbols. No trackers, secrets, API calls or uploads.

## Loop, tests and stopping
Source screening -> evidence notes -> Wiki -> claim review -> approved outline -> Chinese slides -> link/content/layout checks. Failed evidence returns to source screening; unsupported claims are removed or labelled, never silently filled. Image-rights failures require a link-only reference or permitted replacement. After three unsuccessful revisions to one claim, stop and record unresolved for human review. Publish only after structural checks pass, required sources and slides exist, and critical browser errors are fixed. Human Chinese review can remain an explicit limitation.

Run python scripts/build.py then python scripts/check.py. Inspect desktop/mobile, all slides, keyboard navigation, evidence links, exercise reveals and image credits. Log real failures, corrections and untested items, with scope and date. Do not call automated anchor checks historical verification. Do not claim repeated-run error statistics from one run. Preserve source IDs on edits and document superseded evidence.
