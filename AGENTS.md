# AGENTS.md – Ever Guild Website

This file provides guidance to AI coding agents (Claude Code, Cursor, Copilot, Kimi CLI, etc.) when working with code in this repository.

## Repository Overview

**Ever Guild** – Senior engineering team for building and maintaining software. The public landing page positions Ever Guild as a team; community language belongs to the GitHub presence. A modern, minimalistic, and informative corporate website built with React + TypeScript + Vite + SCSS, enhanced with Three.js for immersive 3D backgrounds and interactions.

**Live URLs:**
- Website: https://ever-guild.net/
- GitHub: https://github.com/ever-guild
- X/Twitter: https://x.com/ever_guild_net
- LinkedIn: https://www.linkedin.com/company/ever-guild/
- Telegram: https://t.me/everguild
- Upwork: https://www.upwork.com/agencies/everguild/
- Email: in@ever-guild.net

**Tech Stack:**
- React 19 + TypeScript
- Vite 7 (build tool)
- SCSS (styling)
- Three.js / React Three Fiber (3D backgrounds)
- PWA support (vite-plugin-pwa)

---

## Agent Commands

The following slash commands are available to agents working on this project:

### `/init` – Initialize Project Context
Run at the start of any new session or when context is lost.

**What it does:**
1. Loads `SKILLS.md` to register all available skills from `.agents/skills/`
2. Reads current `package.json` to understand dependencies
3. Scans `src/` directory structure
4. Loads `PLAN.md` for the project roadmap
5. Outputs a concise project summary

**When to use:**
- Beginning of a new conversation
- After context compaction
- When switching between major tasks
- Before making architectural decisions

---

### `/design [target]` – Invoke Impeccable Design Skill
Uses the `impeccable` skill for UI/UX work.

**Examples:**
- `/design craft hero-section` – Design and build the hero section
- `/design audit` – Run accessibility and performance audit
- `/design polish` – Final quality pass before shipping
- `/design animate` – Add purposeful animations

---

### `/3d [task]` – Invoke Three.js Skill
Uses the `three-agent-skills` skill for 3D/WebGL work.

**Examples:**
- `/3d setup scene` – Set up a Three.js/R3F scene
- `/3d optimize` – Review and optimize 3D performance
- `/3d add particles` – Add particle effects

---

### `/plan` – Show Project Plan
Displays the current `PLAN.md` with roadmap, milestones, and progress.

---

## Project Structure

```
├── public/              # Static assets (favicons, images)
├── src/
│   ├── assets/          # Images, SVGs, fonts
│   ├── components/      # React components (create as needed)
│   ├── scenes/          # Three.js / R3F scenes
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # SCSS partials, variables, mixins
│   ├── App.tsx          # Root component
│   ├── App.scss         # Global styles
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript config
├── package.json         # Dependencies
├── SKILLS.md            # Available AI skills
├── AGENTS.md            # This file
└── PLAN.md              # Project roadmap
```

---

## Coding Conventions

### TypeScript
- Strict mode enabled
- Use explicit types for props and return values
- Prefer interfaces over types for object shapes
- Use `const` assertions for literal unions

### React
- Functional components only
- Use hooks, avoid class components
- Memoize expensive computations with `useMemo`
- Isolate state to minimize re-renders

### Styling (SCSS)
- Use CSS custom properties (variables) for theming
- BEM-like naming for component classes
- Mobile-first responsive design
- Avoid nesting deeper than 3 levels

### Three.js / R3F
- Follow `three-agent-skills` best practices (see `.agents/skills/three-agent-skills/`)
- Never call `setState` inside `useFrame`
- Use `dpr={[1, 2]}` to cap pixel ratio
- Dispose geometries/materials on unmount
- Use `frameloop="demand"` for static scenes
- Limit lights, bake lighting where possible

### Performance
- Lazy load 3D scenes with React.lazy + Suspense
- Use `vite-plugin-pwa` for caching
- Optimize images (WebP/AVIF where possible)
- Prefer CSS transforms over layout-triggering properties

---

## Design Principles

1. **Minimalist** – Clean lines, generous whitespace, no clutter
2. **Informative** – Every element serves a purpose
3. **Modern** – Current web standards, smooth interactions
4. **Immersive** – Three.js backgrounds add depth without distraction
5. **Accessible** – WCAG AA compliance, keyboard navigation, screen readers
6. **Responsive** – Flawless experience from mobile to 4K desktop

---

## Brand Colors

Derived from the existing brand identity:
- **Primary:** `#00343d` (deep teal – used in social links)
- **Accent:** `#ffc400` (gold – used in logo glow)
- **Background:** Light theme with tinted neutrals
- **Text:** High contrast dark on light

See `impeccable` skill for OKLCH color strategy guidelines.

---

## External Links to Maintain

All social/contact links must be present and functional:

| Platform | URL |
|----------|-----|
| GitHub | https://github.com/ever-guild |
| Website | https://ever-guild.net/ |
| X/Twitter | https://x.com/ever_guild_net |
| LinkedIn | https://www.linkedin.com/company/ever-guild/ |
| Telegram | https://t.me/everguild |
| Upwork | https://www.upwork.com/agencies/everguild/ |
| Email | mailto:in@ever-guild.net |

---

## Deployment

The site is configured for static hosting (Vercel, GitHub Pages, Netlify, etc.).

```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

---

## Visual Acceptance Pipeline

Use visual acceptance screenshots as an approved product surface, not as
generated artifacts to refresh by default.

Decision rule:
- Run `npm run acceptance:update` only when the user request explicitly and
  unambiguously changes visible content, layout, styling, imagery, animation
  state captured by the baseline, or responsive presentation.
- Run `npm run acceptance:test` without updating screenshots for refactors,
  dependency work, CI changes, performance fixes, accessibility/internal code
  changes, or any request where the intended visual output is unchanged.
- If a non-visual task changes screenshots, treat that as a regression until
  the user confirms the visual change is intentional.
- If the request is ambiguous, do not update baselines first; run
  `npm run acceptance:test`, inspect the diff, and ask/record whether the new
  appearance is intended.

Examples:
- Content/design request: "change Community that builds to Team that builds",
  "adjust mobile spacing", "make the hero darker" -> update baselines after
  implementing and reviewing the visual result.
- Non-visual request: "split CI", "restore code splitting", "fix lint",
  "refactor Scene", "upgrade dependency" -> acceptance tests must protect the
  current screenshots from unintended degradation.

---

## Commit Pipeline

Before making any commit on behalf of the user, including when the user directly
asks to commit, first synchronize the work branch with `main`:

```bash
git fetch origin main
git rebase origin/main
```

Skip the rebase only when already on `main`. If conflicts occur, resolve them
when the correct resolution is clear and scoped to the current work, then
continue the rebase. If a conflict is ambiguous or would change product behavior
beyond the current request, stop and ask the user how to proceed.

After the branch is fast-forwardable relative to `origin/main`, run the full
local quality gate:

```bash
npm run lint
npm run acceptance:test
npm run lighthouse
```

If any command fails:
- Fix the failure first when the cause is clear and scoped to the current work.
- Re-run the failing command, then the full quality gate before committing.
- If the failure is unclear, external, flaky, or would require changing product
  behavior beyond the current request, stop and ask the user how to proceed.

Create commits through the `conventional-commit` skill workflow:
- Review `git status` and the relevant diff before staging.
- Stage only the intended files.
- Use a Conventional Commits message, for example
  `fix(nav): remove redundant contact link`.

Do not commit with known failing lint, acceptance, or Lighthouse checks unless
the user explicitly instructs that exception after seeing the failure.

Use cheaper models for mechanical QA and commit work:
- Claude Code: delegate test-only and commit tasks to `.claude/agents/qa-runner`
  or `.claude/agents/conventional-committer`; both use `model: haiku` and
  `effort: low`.
- Codex CLI: delegate commit tasks to the project custom agent
  `.codex/agents/conventional-committer.toml`; it uses `model = "gpt-5.4-mini"`
  and `model_reasoning_effort = "low"`.

See `docs/agent-model-routing.md` for the cross-agent setup.

---

## Communication Rules for Agents

- **Always use the same language as the user** (Russian/English)
- **Make minimal changes** – achieve goals with the least code possible
- **Follow existing patterns** – match the style of surrounding code
- **Test before declaring done** – run `npm run build` to verify
- **Update this file** if conventions or structure change significantly
