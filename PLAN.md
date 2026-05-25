# Ever Guild Website — Development Plan

A modern, minimalistic, and informative corporate website for Ever Guild with immersive Three.js backgrounds.

---

## Vision

Create a premium single-page experience that communicates Ever Guild's identity as a software development community/agency. The design balances minimalism with immersive 3D elements — the Three.js background creates atmosphere without competing with content.

**Mood:** Professional, modern, trustworthy, tech-forward but approachable.
**Scene:** A developer or business owner visiting the site on a desktop or laptop, well-lit environment, seeking a reliable software partner.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | SCSS + CSS Modules |
| 3D Engine | Three.js + React Three Fiber (@react-three/fiber) |
| 3D Helpers | @react-three/drei |
| Animation | GSAP (ScrollTrigger) + CSS transitions |
| Icons | Lucide React (or inline SVG) |
| Fonts | Inter (body) + optional display font |
| PWA | vite-plugin-pwa (already configured) |

---

## Phase 1: Foundation & Setup (Done / Quick Wins)

### 1.1 Dependencies
```bash
npm install three @react-three/fiber @react-three/drei gsap @gsap/react lucide-react
npm install -D @types/three
```

### 1.2 Project Structure Setup
```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── SocialIcon.tsx
│   │   └── Section.tsx
│   ├── sections/        # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── three/           # Three.js scenes
│       ├── ParticleField.tsx
│       └── Scene.tsx
├── hooks/
│   ├── useScrollAnimation.ts
│   └── useMediaQuery.ts
├── styles/
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _reset.scss
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

### 1.3 Design Tokens (SCSS Variables)
```scss
// Colors
$color-primary: #00343d;
$color-accent: #ffc400;
$color-bg: #fafafa;
$color-surface: #ffffff;
$color-text: #1a1a1a;
$color-text-muted: #666666;

// Spacing scale
$space-xs: 0.5rem;
$space-sm: 1rem;
$space-md: 2rem;
$space-lg: 4rem;
$space-xl: 8rem;

// Typography
$font-body: 'Inter', system-ui, sans-serif;
$font-display: 'Inter', system-ui, sans-serif;

// Breakpoints
$bp-mobile: 480px;
$bp-tablet: 768px;
$bp-desktop: 1024px;
$bp-wide: 1440px;
```

**Status:** ⬜ Not started

---

## Phase 2: Three.js Background Scene

### 2.1 Particle Network Background
A subtle, animated particle field that responds to mouse movement. Particles connect with thin lines when close to each other, forming a dynamic network graph aesthetic.

**Specifications:**
- ~150-200 particles (performance-friendly)
- Particles drift slowly with Perlin-noise-like motion
- Mouse proximity creates subtle attraction
- Lines connect particles within threshold distance
- Color: tinted primary teal (`#00343d`) at low opacity
- Falls back to static gradient on mobile / reduced-motion

**Tech approach:**
- Use `@react-three/fiber` Canvas as full-screen background
- Custom shader material for particles (points + lines)
- Or use `Instances` from `@react-three/drei` for performance
- `frameloop="always"` for hero, switch to `"demand"` when scrolled past

### 2.2 Hero 3D Element (Optional Enhancement)
A subtle 3D geometric shape (icosahedron or torus knot) floating in the hero section, slowly rotating, with the brand gold accent color.

**Specifications:**
- Mesh: Icosahedron with wireframe overlay
- Material: MeshStandardMaterial with low metalness
- Slow rotation on all axes
- Subtle float animation (sine wave on Y)

**Status:** ⬜ Not started

---

## Phase 3: Page Sections

### 3.1 Navigation
- Fixed top bar, transparent → solid on scroll
- Logo on left, nav links center, CTA button right
- Links: About, Services, Contact
- Mobile: hamburger menu with smooth overlay

**Status:** ⬜ Not started

### 3.2 Hero Section
- Full viewport height (100vh)
- Three.js particle network as background
- Centered content:
  - Ever Guild logo (larger, with subtle glow)
  - Tagline: *"Software that lasts. Community that builds."* (or similar)
  - Short description: 1-2 sentences about what Ever Guild does
  - CTA buttons: "Get in Touch" (primary) + "View on GitHub" (secondary)
- Scroll indicator at bottom (animated chevron)

**Status:** ⬜ Not started

### 3.3 About Section
- Brief company description
- Mission/values in a clean grid or list
- Stats counter (optional): projects, contributors, years
- Community-focused messaging

**Content ideas:**
- "Ever Guild is a community of developers dedicated to building and maintaining high-quality open-source software."
- Values: Openness, Quality, Collaboration, Longevity

**Status:** ⬜ Not started

### 3.4 Services / What We Do Section
- Grid of 3-4 service cards
- Each card: icon + title + 1-2 sentence description
- Services could include:
  - Open Source Development
  - Software Distribution
  - Community Building
  - Technical Consulting

**Design:**
- Clean cards with subtle hover lift
- No identical card grids — vary sizing or layout
- Use icons from Lucide

**Status:** ⬜ Not started

### 3.5 Social Proof / Links Section
- Prominent social media links with platform icons
- GitHub stats or activity (optional, fetched via API)
- Upwork agency link for potential clients
- Telegram community link

**Status:** ⬜ Not started

### 3.6 Contact Section
- Simple, clean contact area
- Email: n@ever-guild.net (clickable mailto)
- Links to all social platforms
- Optional: simple contact form (name, email, message)

**Status:** ⬜ Not started

### 3.7 Footer
- Minimal footer
- Copyright: © 2026 Ever Guild
- Quick links
- All social icons in a row

**Status:** ⬜ Not started

---

## Phase 4: Animations & Interactions

### 4.1 Scroll Animations (GSAP ScrollTrigger)
- Fade-in + slide-up for sections as they enter viewport
- Staggered reveal for card grids
- Parallax effect on hero background (subtle)
- Stats counter animation (if implemented)

### 4.2 Micro-interactions
- Button hover: subtle scale + color shift
- Link hover: underline animation
- Card hover: translateY(-4px) + shadow increase
- Social icon hover: brand color fill

### 4.3 Three.js Interactions
- Mouse movement subtly influences particle field
- Hero 3D shape responds to scroll position
- Smooth transitions between active/inactive render states

### 4.4 Page Load
- Logo fade-in
- Content staggered reveal
- Three.js scene fades in

**Status:** ⬜ Not started

---

## Phase 5: Responsive & Performance

### 5.1 Responsive Breakpoints
| Breakpoint | Target |
|------------|--------|
| 375px | Small mobile |
| 768px | Tablet |
| 1024px | Desktop |
| 1440px | Wide desktop |

### 5.2 Performance Checklist
- [ ] Lazy load Three.js scene (React.lazy + Suspense)
- [ ] Cap DPR at 2 (`dpr={[1, 2]}`)
- [ ] Reduce particle count on mobile (50-80)
- [ ] Use `frameloop="demand"` when hero is not visible
- [ ] Optimize images (WebP/AVIF)
- [ ] Code-split sections
- [ ] Run Lighthouse audit — target 90+ on all metrics

### 5.3 Accessibility
- [ ] Semantic HTML (header, main, section, footer, nav)
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation
- [ ] Focus states visible
- [ ] `prefers-reduced-motion` respected (disable Three.js animations)
- [ ] Color contrast WCAG AA
- [ ] Skip to content link

**Status:** ⬜ Not started

---

## Phase 6: Content & SEO

### 6.1 Meta Tags
```html
<title>Ever Guild — Software Development Community</title>
<meta name="description" content="Ever Guild is a community for building and maintaining high-quality open-source software. Join us on GitHub, Telegram, and Upwork.">
<meta property="og:title" content="Ever Guild">
<meta property="og:description" content="Software that lasts. Community that builds.">
<meta property="og:image" content="/og-image.png">
<meta property="og:url" content="https://ever-guild.net/">
```

### 6.2 Structured Data (JSON-LD)
Organization schema with all social profiles.

### 6.3 Favicon & PWA
- Already configured in `vite.config.ts`
- Ensure all favicon sizes are present

**Status:** ⬜ Not started

---

## Phase 7: Polish & Launch

### 7.1 Final Review Checklist
- [ ] All external links work correctly
- [ ] Three.js scene performs at 60fps
- [ ] No console errors
- [ ] Build succeeds (`npm run build`)
- [ ] Lighthouse score 90+
- [ ] Cross-browser test (Chrome, Firefox, Safari, Edge)
- [ ] Mobile test (iOS Safari, Chrome Android)

### 7.2 Post-Launch
- [ ] Set up analytics (optional)
- [ ] Monitor Core Web Vitals
- [ ] Collect feedback

**Status:** ⬜ Not started

---

## Milestones

| Milestone | Description | Status |
|-----------|-------------|--------|
| M0 | Project setup, dependencies, file structure | ✅ |
| M1 | Three.js particle background scene | ✅ |
| M2 | Hero section with 3D background | ✅ |
| M3 | All content sections (About, Services, Contact, Footer) | ✅ |
| M4 | Animations & interactions (GSAP, hover states) | ✅ |
| M5 | Responsive design & performance optimization | ✅ |
| M6 | Accessibility audit & fixes | ✅ |
| M7 | Final polish, testing, launch | ✅ |

---

## Design References

### Color Strategy: **Committed**
One saturated color (deep teal `#00343d`) carries 30-60% of the surface, with gold accent (`#ffc400`) for CTAs and highlights. Restrained use keeps it professional.

### Typography Strategy
- **Display/Headings:** Inter Bold / ExtraBold, tight letter-spacing
- **Body:** Inter Regular, 16-18px, line-height 1.6
- **Scale ratio:** 1.25 (minor third) between steps

### Anti-Patterns to Avoid
- ❌ Gradient text
- ❌ Glassmorphism as default
- ❌ Identical card grids without variation
- ❌ Side-stripe borders
- ❌ Hero-metric template (big number + small label)
- ❌ AI purple/pink gradients
- ❌ Dark mode "because it looks cool"

---

## Quick Start for Agents

When beginning work on this project:

1. Run `/init` (see `AGENTS.md`) to load context
2. Check `PLAN.md` milestones for current status
3. Reference `SKILLS.md` for relevant AI skills:
   - `three-agent-skills` for 3D work
   - `impeccable` for UI/UX decisions
   - `ui-ux-pro-max-skill` for design system guidance
4. Follow the phase order when possible, but parallel work is fine for independent sections
5. Update this `PLAN.md` with progress as you complete milestones
