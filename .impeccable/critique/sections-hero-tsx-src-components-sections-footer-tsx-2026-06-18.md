---
target: "hero and footer"
total_score: 30
p0_count: 0
p1_count: 1
p2_count: 4
date: 2026-06-18
---

## Design Health Score (Hero + Footer)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Nav scroll-spy + footer back-to-top; hero has no in-section state |
| 2 | Match System / Real World | 3 | Copy fits buyer; eyebrow repeats brand name already in nav |
| 3 | User Control and Freedom | 4 | Clear anchors; back-to-top; external links open predictably |
| 4 | Consistency and Standards | 2 | Nav uses logo SVG; footer uses text wordmark. DESIGN.md still documents Tilt Warp/glass |
| 5 | Error Prevention | n/a | Static marketing surface |
| 6 | Recognition Rather Than Recall | 3 | CTAs labeled plainly; footer socials have aria-labels |
| 7 | Flexibility and Efficiency | 3 | Duplicate Start a project (nav + hero); GitHub secondary is clear |
| 8 | Aesthetic and Minimalist Design | 3 | Hero stripped of template chrome; large empty upper viewport |
| 9 | Error Recovery | n/a | |
| 10 | Help and Documentation | 2 | Footer ends without email/contact repeat (peak-end gap) |
| **Total** | | **30/40** | **Good — polish gaps remain** |

## Anti-Patterns Verdict

**AI slop: No (hero), Mostly no (footer).** Hero passes the slop test vs prior design: no HUD, glass, particles, centered stack, or bracketed kickers. Footer is utilitarian; warm-brown anchor is on-brand.

**Deterministic scan:** `detect.mjs` on Hero/Footer TSX+SCSS — **0 findings**.

## Priority Issues

**[P1] Footer muted text contrast on warm-brown** — tag/copyright/top at 62–68% cream opacity may fail WCAG AA at 14px. Fix: use `$color-text-2` or ≥80% cream. Command: `$impeccable polish footer`

**[P2] Hero eyebrow duplicates navbar brand** — `EVER GUILD` mono label adds scaffolding without information. Fix: remove or replace with one proof line. Command: `$impeccable distill hero`

**[P2] Hero vertical emptiness** — `min-height: 100svh` + `align-items: flex-end` leaves ~40% dead field on desktop. Fix: top-align or add proof strip. Command: `$impeccable layout hero`

**[P2] Footer peak-end conversion** — no mailto or CTA at page end; user must remember Contact section. Fix: add `in@ever-guild.net` link. Command: `$impeccable clarify footer`

**[P2] DESIGN.md drift** — documents Tilt Warp, glass, old hero scale; code uses Hanken Grotesk + flat hero. Fix: `$impeccable document` after redesign lands.
