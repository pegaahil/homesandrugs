# Development record - v2

The first version misunderstood the intended task: it compared styling suggestions. The user clarified that visitors should upload three real home photos and place the rug in each. V2 replaces the palette interface with a local Canvas compositor.

## Decisions
- Manual corner adjustment gives visitors control over floor perspective without a paid image API.
- Independent per-room state preserves all three compositions when switching tabs.
- Shared projective geometry feeds the editor, comparison and exports, avoiding different placement results.
- Files stay in memory, with format/size checks and temporary object URL cleanup.
- Cropping is performed in Canvas from an explicit catalog crop; the original photo is unchanged.
- Controls have pointer and keyboard alternatives. The tool states its visual and physical limits.
- AGENTS.md and the catalog template were rewritten around this new interaction and privacy contract.

## Verification
Verified for v2 on 12 November 2026:
- Node checks passed for the catalog schema, local resource links, convexity, crossed/outside corners, homography mapping and rotation round-trip.
- Three labelled synthetic room PNGs loaded through the browser file picker. No real home photos were used for public evidence.
- First-room size changed to 35%; switching to room two showed 100%, and returning preserved the first room's name and size.
- Size, rotation, opacity, reset and original/composite toggle were exercised.
- Direct mouse dragging moved the entire rug. Dragging corner 1 changed the perspective; the target selector reflected corner 1. Arrow-key nudging was also exercised.
- A malformed JPEG was rejected with a readable message. Removing room three cleared its preview. Refresh cleared all rooms, as documented.
- Real individual PNG and three-room comparison downloads completed and were visually inspected. Exports contain the rug composite and manual-preview label without editor handles.
- A mesh seam refinement slightly overlaps adjacent texture triangles to avoid hairline gaps. Space-name input was corrected to preserve spaces while typing.
- Desktop and 390px mobile layouts were checked. At mobile width 390px, the document width was 375px, without horizontal overflow.
- File-size and megapixel limits are implemented, but extreme-memory stress tests and physical touch-device testing were not performed.
