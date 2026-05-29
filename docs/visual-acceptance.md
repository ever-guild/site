# Visual Acceptance Baseline

These tests intentionally lock the current redesign at a practical level before
refactoring. They are not a full design system test suite.

The baseline covers:

- desktop hero, team and contact viewport states;
- mobile hero, team and contact viewport states;
- focused navbar states, including the scrolled blur layer;
- focused glass surfaces in normal and hover states;
- CSS guards for active `backdrop-filter` and translucent glass backgrounds;
- real scroll/anchor positions rather than isolated components.

There is also a non-baseline animation smoke test. It runs with reduced motion
disabled and verifies that two captured hero frames differ, while keeping the
approved screenshot baselines static and deterministic.

## Baseline Update Rule

The reliable condition for updating screenshots is the user's intent, not the
files touched by the implementation.

Update the approved screenshots only when the request explicitly and
unambiguously asks for a visible change to content, design, layout, imagery,
responsive presentation, or a baseline-captured animation state:

```bash
npm run acceptance:update
```

For all other work, keep the approved screenshots fixed and check the current
implementation against them:

```bash
npm run acceptance:test
```

If a refactor, CI change, dependency change, performance fix, or internal
implementation change produces screenshot diffs, treat the diffs as a
regression by default. Update baselines only after the user confirms that the
new appearance is intended.

The command also checks that all approved screenshots are distinct. If multiple
states accidentally capture the same viewport, the snapshot check fails.
