# Visual Acceptance Baseline

These tests intentionally lock the current redesign at a practical level before
refactoring. They are not a full design system test suite.

The baseline covers:

- desktop hero, team and contact viewport states;
- mobile hero, team and contact viewport states;
- real scroll/anchor positions rather than isolated components.

There is also a non-baseline animation smoke test. It runs with reduced motion
disabled and verifies that two captured hero frames differ, while keeping the
approved screenshot baselines static and deterministic.

Update the approved screenshots only when a visual change is intentional:

```bash
npm run acceptance:update
```

Check the current implementation against the approved screenshots:

```bash
npm run acceptance:test
```

The command also checks that all approved screenshots are distinct. If multiple
states accidentally capture the same viewport, the snapshot check fails.
