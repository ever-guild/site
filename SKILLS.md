# Available Skills

This document catalogs all AI coding skills available in this project under `.agents/skills/`. Skills are loaded dynamically to improve agent performance on specialized tasks.

## Skill Registry

### 1. `three-agent-skills` — Three.js & R3F Development
**Path:** `.agents/skills/three-agent-skills/`

AI coding agent skills for Three.js and React Three Fiber development. Follows the [Agent Skills](https://agentskills.io/) specification.

**Contains:**
- **`three-best-practices`** — Pure Three.js optimization guidelines (100+ rules across 17 categories)
  - Modern Setup & Imports, Memory Management & Dispose (CRITICAL)
  - Render Loop Optimization (CRITICAL), Geometry & Buffer Management
  - Material & Texture Optimization, Lighting & Shadows
  - Shader Best Practices (GLSL), TSL (Three.js Shading Language)
  - Loading & Assets (GLTF, DRACO, Meshopt, KTX2)
  - Camera & Controls, Animation System, Physics Integration
  - WebXR / VR / AR, Mobile Optimization, Production, Debug & DevTools
  - *Reference:* `THREE_BEST_PRACTICES.md`

- **`r3f-best-practices`** — React Three Fiber and Poimandres ecosystem (60+ rules across 11 categories)
  - Performance & Re-renders (CRITICAL), useFrame & Animation (CRITICAL)
  - Component Patterns, Canvas & Setup, Drei Helpers
  - Loading & Suspense, State Management (Zustand), Events & Interaction
  - Post-processing, Physics (Rapier), Leva (Debug GUI)
  - *Reference:* `R3F_BEST_PRACTICES.md`

**Trigger phrases:** "Three.js scene", "R3F component", "WebGL", "shader", "optimize 3D", "React Three Fiber"

---

### 2. `impeccable` — Frontend UI/UX Design
**Path:** `.agents/skills/impeccable/`

Designs and iterates production-grade frontend interfaces. Real working code, committed design choices, exceptional craft.

**Key capabilities:**
- Design system generation with color strategy, typography, layout rules
- UX review, visual hierarchy, information architecture
- Accessibility (a11y), performance, responsive behavior, theming
- Anti-patterns detection, motion & micro-interactions
- Copywriting, edge cases, i18n

**Design laws enforced:**
- OKLCH color usage, no `#000`/`#fff`, tint neutrals toward brand hue
- Typography hierarchy through scale + weight contrast (≥1.25 ratio)
- No side-stripe borders, gradient text, glassmorphism as default
- No identical card grids, modal as first thought
- Ease out with exponential curves, never animate CSS layout properties

**Available commands:**
| Command | Purpose |
|---------|---------|
| `craft [feature]` | Shape, then build a feature end-to-end |
| `shape [feature]` | Plan UX/UI before writing code |
| `teach` | Set up PRODUCT.md and DESIGN.md context |
| `document` | Generate DESIGN.md from existing project code |
| `critique [target]` | UX design review with heuristic scoring |
| `audit [target]` | Technical quality checks (a11y, perf, responsive) |
| `polish [target]` | Final quality pass before shipping |
| `bolder [target]` | Amplify safe or bland designs |
| `quieter [target]` | Tone down aggressive or overstimulating designs |
| `distill [target]` | Strip to essence, remove complexity |
| `harden [target]` | Production-ready: errors, i18n, edge cases |
| `animate [target]` | Add purposeful animations and motion |
| `colorize [target]` | Add strategic color to monochromatic UIs |
| `typeset [target]` | Improve typography hierarchy and fonts |
| `layout [target]` | Fix spacing, rhythm, and visual hierarchy |
| `delight [target]` | Add personality and memorable touches |
| `overdrive [target]` | Push past conventional limits |
| `live` | Visual variant mode: pick elements in browser, generate alternatives |

**Trigger phrases:** "design", "redesign", "UI", "UX", "landing page", "dashboard", "component", "polish", "animate", "critique", "audit", "frontend interface"

---

### 3. `ui-ux-pro-max-skill` — UI/UX Pro Max Design Intelligence
**Path:** `.agents/skills/ui-ux-pro-max-skill/`

An AI skill that provides design intelligence for building professional UI/UX across multiple platforms and frameworks.

**Key features:**
- **161 Industry-Specific Reasoning Rules** — matches product type → UI category rules
- **67 UI Styles** — Glassmorphism, Claymorphism, Minimalism, Brutalism, Neumorphism, Bento Grid, Dark Mode, AI-Native UI, etc.
- **161 Color Palettes** — Industry-specific palettes aligned 1:1 with product types
- **57 Font Pairings** — Curated typography combinations with Google Fonts imports
- **25 Chart Types** — Recommendations for dashboards and analytics
- **15 Tech Stacks** — React, Next.js, Astro, Vue, Nuxt.js, Svelte, SwiftUI, React Native, Flutter, HTML+Tailwind, shadcn/ui, Jetpack Compose, Angular, Laravel
- **99 UX Guidelines** — Best practices, anti-patterns, and accessibility rules

**Design System Generator** — analyzes project requirements and generates a complete, tailored design system with pattern, style, colors, typography, effects, anti-patterns, and pre-delivery checklist.

**Supported stacks:** React, Next.js, shadcn/ui, Vue, Nuxt.js, Svelte, Astro, Angular, Laravel, SwiftUI, React Native, Flutter, HTML+Tailwind

**Trigger phrases:** "build a landing page", "design a dashboard", "create UI", "mobile app UI", "fintech design", "portfolio website", "SaaS design"

---

### 4. `agent-skills` — Vercel & Agent Infrastructure
**Path:** `.agents/skills/agent-skills/`

A collection of skills for AI coding agents working with Vercel projects and general agent infrastructure.

**Contains:**
- Skill creation templates and standards (Agent Skills spec)
- Vercel optimization test suites
- React best practices build tooling
- Document creation & editing skills (docx, pdf, pptx, xlsx patterns)

**Trigger phrases:** "deploy to Vercel", "skill creation", "agent infrastructure", "document generation"

---

### 5. `skills` — Anthropic Skills Reference
**Path:** `.agents/skills/skills/`

Reference implementation of the Agent Skills standard from Anthropic.

**Contains:**
- Agent Skills specification (`spec/agent-skills-spec.md`)
- Skill template (`template/SKILL.md`)
- Document skills (docx, pdf, pptx, xlsx creation patterns)

**Reference:** [agentskills.io](http://agentskills.io)

---

## How Skills Are Loaded

Skills are loaded on-demand. Only the skill name and description are loaded at startup. The full `SKILL.md` loads into context only when the agent decides the skill is relevant based on trigger phrases and task context.

## Adding New Skills

To add a new skill:

1. Create a directory under `.agents/skills/{skill-name}/`
2. Add a `SKILL.md` with YAML frontmatter:
   ```markdown
   ---
   name: {skill-name}
   description: When to use this skill. Include trigger phrases.
   ---
   ```
3. Add supporting files (`scripts/`, `references/`, etc.)
4. Register the skill in this `SKILLS.md`

## Skill Priority for This Project

For **Ever Guild website development**, the most relevant skills are:

| Priority | Skill | When to Use |
|----------|-------|-------------|
| 1 | `three-agent-skills` | All Three.js / R3F / WebGL work |
| 2 | `impeccable` | UI/UX design decisions, component styling, animations |
| 3 | `ui-ux-pro-max-skill` | Design system generation, style selection, color palettes |
| 4 | `agent-skills` | Vercel deployment, infrastructure tasks |
