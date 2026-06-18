---
target: "https://ever-guild.net/"
total_score: 27
p0_count: 1
p1_count: 3
date: 2026-06-18
---

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Scroll-spy nav active states work; static site needs little else |
| 2 | Match System / Real World | 3 | Right domain language for technical buyers; telemetry chrome feels synthetic |
| 3 | User Control and Freedom | 4 | Clear anchors, back-to-top, external links open predictably |
| 4 | Consistency and Standards | 2 | Visual system is internally consistent but team photos break trust |
| 5 | Error Prevention | 4 | n/a for static marketing surface |
| 6 | Recognition Rather Than Recall | 3 | Plain nav labels; section indices add noise not wayfinding |
| 7 | Flexibility and Efficiency | 2 | Single scroll path; duplicate CTAs without differentiated intent |
| 8 | Aesthetic and Minimalist Design | 1 | Heavy decorative scaffolding duplicates facts and competes with message |
| 9 | Error Recovery | 4 | n/a |
| 10 | Help and Documentation | 3 | Contact path is clear; no proof layer for skeptical evaluators |
| **Total** | | **27/40** | **Fair — significant design debt** |

## Anti-Patterns Verdict

**AI slop: Yes — fails immediately.**

Centered hero, bracketed mono kicker, `//` telemetry, numbered nav indices, glass cards over particle field, identical 6-up service grid with Lucide icons, infinite tech marquee, blueprint grid + film grain: this is the 2024–2026 developer-agency template stack. A visitor evaluating senior engineers will read "assembled from parts," not "authored."

**Deterministic scan:** `detect.mjs` could not be executed in this environment (shell backend unavailable). Manual source review found: `backdrop-filter` on navbar + all `engineered-panel` cards (`Team`, `Services`, `About`, `Contact`); mono HUD in `Hero.scss`; identical card grid in `Services.tsx` (6 modules); section index column `01 // ABOUT` pattern in `Section.scss`.

**Browser overlays:** Not available — production URL; no `detect.js` injection attempted.

## Priority Issues

**[P0] Template composition undermines senior positioning** — Fix: Execute CONTEXT.md redesign (editorial layout, strip HUD/glass/3D, solid surfaces). Command: `$impeccable craft landing`

**[P1] Identical service card grid** — Fix: Restructure services as proof-led list or asymmetric modules, not 6 matching glass tiles. Command: `$impeccable layout services`

**[P1] Team photo inconsistency** — Fix: Unified crop, grade, frame treatment. Command: `$impeccable polish team`

**[P1] Typography voice mismatch** — Fix: Retire Tilt Warp display; Hanken Grotesk at display scale. Command: `$impeccable typeset`

**[P2] Copy duplication and em-dash usage** — Fix: Tighten per CONTEXT.md; remove redundant kickers/HUD facts. Command: `$impeccable clarify`
