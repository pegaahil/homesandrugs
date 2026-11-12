# Development record

## Scope decisions
1. Separated the homework from The Rug Detective: interior presentation only, with no motif recognition or storytelling.
2. Used the existing owner photo rather than synthetic room images, to avoid implying completed installations.
3. Defined AGENTS.md before implementation, including source rules, file conventions, reusable data records and acceptance checks.
4. Built the same renderer for three independent space records. A fourth concept can follow the same schema without a new page or room-specific layout code.
5. Added a scaled room/rug diagram and comparison to make the page operational, not just a gallery of text.
6. Preserved catalog facts separately from hypothetical styling recommendations.

## Verification
Observed on 12 November 2026 in a local browser:
- Data-contract check passed for one rug and three complete concepts; local resource references passed.
- JavaScript syntax check passed.
- Living room, study and gallery selections displayed their corresponding content.
- Comparison displayed three cards; selecting the gallery card updated the active concept.
- Saving the study persisted through a browser reload.
- A room width of 1 m was rejected with a visible message; 3 × 3.8 m with a rotated rug displayed 2.00 × 1.30 m and 22.8% floor area.
- Enter activated the rotation button using the keyboard.
- The palette copy button reported the chosen HEX code copied.
- A real concept text download completed, and the saved file was read to verify its catalog facts, selected gallery concept, dimensions and source note.
- Desktop (1280px) and mobile (390px) screenshots were inspected; measured page widths did not overflow the viewport.
- No browser JavaScript errors were returned by the browser log check.
- Print CSS is provided; a physical print was not tested.

