---
name: Ever Guild Website
description: Portable design system for the Ever Guild brand site: deep-teal engineered field, sparse gold signal, cream display type, and matte emerald glass surfaces.
style_contract:
  north_star: "The Engineering Field Manual"
  density: "5/10 - spacious hero, compact services, no decorative clutter"
  variance: "5/10 - left-anchored, grid-led, controlled asymmetry"
  motion: "4/10 - restrained, physical, transform-only, reduced-motion safe"
  primary_imagery: "Dark architectural hero raster plus atmospheric field mesh"
  public_positioning: "Senior engineering team, not community-first"
colors:
  bg-deep: "#001D25"
  bg-alt: "#002028"
  surface-teal: "#002835"
  surface-teal-hover: "#00323F"
  surface-teal-pressed: "#013C4B"
  warm-footer: "#381E00"
  warm-footer-hover: "#442801"
  text-cream: "#FFE79C"
  text-secondary: "#C7D4D1"
  text-muted: "#AAB9B5"
  text-faint: "#475957"
  accent-gold: "#F1B800"
  accent-cream: "#FFE89E"
  on-accent: "#01181C"
  glass: "rgba(6, 50, 44, 0.46)"
  glass-hover: "rgba(10, 63, 55, 0.60)"
  glass-border: "rgba(186, 240, 212, 0.16)"
  glass-edge: "rgba(186, 240, 212, 0.30)"
  glass-sheen: "rgba(255, 255, 255, 0.08)"
  border: "rgba(236, 230, 214, 0.10)"
  border-strong: "rgba(236, 230, 214, 0.18)"
  border-accent: "rgba(241, 184, 0, 0.34)"
  teal-particle: "#4DB8CC"
typography:
  display:
    fontFamily: "Tilt Warp, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.4rem, 6.6vw, 4.9rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Tilt Warp, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.4rem, 5.6vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Tilt Warp, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.16em"
rounded:
  sm: "12px"
  md: "18px"
  lg: "24px"
  xl: "30px"
  full: "9999px"
spacing:
  2xs: "4px"
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "64px"
  2xl: "96px"
  3xl: "144px"
  4xl: "192px"
components:
  button-primary:
    backgroundColor: "{colors.accent-gold}"
    textColor: "{colors.bg-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "15px 26px"
    height: "52px"
  button-secondary:
    backgroundColor: "{colors.bg-deep}"
    textColor: "{colors.text-cream}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "15px 26px"
    height: "52px"
  panel-glass:
    backgroundColor: "{colors.surface-teal}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.lg}"
    padding: "32px"
  chip-glass:
    backgroundColor: "{colors.surface-teal}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  nav-link:
    backgroundColor: "{colors.bg-deep}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    height: "44px"
---

# Design System: Ever Guild Website

## 1. Overview

**Creative North Star: "The Engineering Field Manual"**

Ever Guild's visual system should feel like a senior engineering team working over a live technical field: deep teal atmosphere, precise gold signals, frosted emerald panels, and measured mono telemetry. The site is a brand surface, not an app shell. It communicates capability, trust, and maintainability before it asks for contact.

The system is committed, dark, and engineered. The full-bleed hero raster and atmospheric teal mesh are the primary imagery; glass panels and blueprint hairlines sit above them as instrumentation, not decoration. The copy stays direct and specific, carrying the product line from `PRODUCT.md`: "Precise, senior, durable."

The system explicitly rejects community-first public positioning, generic SaaS hero tropes, decorative gradient text, identical card grids, excessive glassmorphism, sketchy illustrations, over-rounded cards, and vague engineering claims.

**Key Characteristics:**
- Deep teal field with rare gold signal.
- Cream display type over readable teal-gray body copy.
- Frosted engineered panels that sample the dark atmospheric field beneath.
- Mono labels used as telemetry and coordinates, never as generic "developer" costume.
- Motion that reveals structure while preserving contrast and reduced-motion safety.

## 2. Colors

The palette is a committed deep-teal environment with gold as a sparse operational signal and cream as the warm readable highlight.

### Primary
- **Abyss Teal Field** (`bg-deep`): The page background and deepest brand surface. It carries the whole site and must remain dominant.
- **Guild Gold Signal** (`accent-gold`): Primary CTA, active state, section indexes, crosshair ticks, and rare emphasis. Its scarcity is the point.
- **Cream Readout** (`text-cream`): Display text, logo-adjacent text, and bright hover glints on dark surfaces.

### Secondary
- **Frosted Emerald Surface** (`surface-teal`): Base panel tone for cards and content blocks. It should feel like instrument glass over the dark field.
- **Hover Teal Surface** (`surface-teal-hover`): Interactive surface response for secondary buttons, glass cards, and dense chips.
- **Warm Footer Ground** (`warm-footer`): Footer-only grounding color. Do not spread it into the main page.

### Tertiary
- **Particle Cyan** (`teal-particle`): Legacy atmospheric contrast color. It belongs to field imagery only, not standard UI surfaces.
- **Accent Cream** (`accent-cream`): Hover glint and light response where gold needs a brighter edge.

### Neutral
- **Readable Teal Gray** (`text-secondary`): Body copy, descriptions, and quiet UI text on dark teal.
- **Muted Instrument Text** (`text-muted`): Mono labels and secondary metadata.
- **Faint Telemetry Text** (`text-faint`): Low-priority coordinates only. Never use for body copy.
- **Warm Hairline Border** (`#F4F1E8` with alpha): Structural dividers and glass borders. Keep it translucent and quiet.

### Named Rules

**The Gold Signal Rule.** Gold marks intent: primary action, active position, index, and focus. Never wash the page in gold.

**The Teal Field Rule.** The main surface is always deep teal. Do not introduce beige, slate, purple gradients, or unrelated neutral themes.

**The Readability Rule.** Body text uses `text-secondary` or brighter. `text-faint` is telemetry only and never carries content the visitor must read.

## 3. Typography

**Display Font:** Tilt Warp with system sans fallback  
**Body Font:** Hanken Grotesk with system sans fallback  
**Label/Mono Font:** JetBrains Mono with ui-monospace fallback

**Character:** Tilt Warp gives the site a physical, machined display voice. Hanken Grotesk keeps the long-form engineering copy warm and readable. JetBrains Mono is reserved for coordinates, labels, tags, and small controls.

### Hierarchy

- **Display** (400, `clamp(2.4rem, 6.6vw, 4.9rem)`, `0.98`): Hero headline only. Keep letter spacing at `-0.02em`; tighter is forbidden.
- **Headline** (400, `clamp(2.4rem, 5.6vw, 4.25rem)`, `1`): Section headers. Max width is intentionally short, around `18ch`.
- **Title** (400, `1.75rem`, `1.04`): Service card and compact panel titles.
- **Body** (400, `1rem` to `1.125rem`, `1.55` to `1.7`): Descriptions and explanatory copy. Cap prose around `48ch` to `60ch` depending on section.
- **Label** (500 to 600, `0.6875rem` to `0.875rem`, `0.04em` to `0.16em`, uppercase): Buttons, tags, indexes, HUD text, and coordinates.

### Named Rules

**The Display Scarcity Rule.** Tilt Warp carries hierarchy. Do not use it for body copy or low-priority metadata.

**The Mono Telemetry Rule.** Mono text is a readout system. It should label structure, not become paragraphs.

**The No-Cramped-Type Rule.** Display tracking never goes tighter than `-0.02em` in this codebase; `-0.04em` is the absolute external floor.

## 4. Elevation

Depth is conveyed through frosted glass, translucent borders, inset rim light, and a controlled ambient shadow. Surfaces are not generic drop-shadow cards. The shadow exists to place glass over the dark field, not to create floating SaaS tiles.

### Shadow Vocabulary

- **Glass Panel Depth** (`inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -12px 28px rgba(0,0,0,0.14), 0 12px 36px rgba(0,0,0,0.30)`): Engineered panels and large cards.
- **Glass Chip Rim** (`inset 0 1px 0 rgba(255,255,255,0.08)`): Small tags and chips.
- **Contact Signal Rail** (`inset 0 1px 0 rgba(255,255,255,0.34), inset 0 -14px 32px rgba(56,30,0,0.16), 0 18px 42px rgba(0,0,0,0.28)`): Large final contact CTA only.

### Named Rules

**The Glass Has a Job Rule.** Use backdrop blur only on real content surfaces over the field. Decorative glass is prohibited.

**The No Ghost Card Rule.** Do not pair a decorative 1px border with a soft wide shadow unless it is the established engineered glass panel.

## 5. Components

### Buttons

- **Shape:** Soft control radius (`18px`) with uppercase mono labels.
- **Primary:** Solid Guild Gold background with deep teal text. Large buttons use about `15px 26px` padding and at least `52px` height.
- **Hover / Focus:** Hover brightens to Accent Cream and lifts by `1px`. Focus uses a `2px` gold outline with `3px` offset.
- **Secondary / Ghost:** Secondary is transparent with cream text and a quiet hairline. Ghost has no surface and moves only the arrow affordance.

### Chips

- **Style:** Frosted emerald glass, `12px` radius, mono uppercase label, compact padding around `8px 14px`.
- **State:** Hover strengthens the glass border, deepens the surface, and turns text gold. Reduced motion disables marquee movement and wraps chips.

### Cards / Containers

- **Corner Style:** Engineered glass cards use `24px`; larger panels may use `30px`. Do not exceed this scale for standard cards.
- **Background:** `rgba(6, 50, 44, 0.46)` with blur and saturation, or denser `rgba(10, 63, 55, 0.60)` on hover.
- **Shadow Strategy:** Use Glass Panel Depth from Elevation.
- **Border:** `rgba(186, 240, 212, 0.16)` at rest; `rgba(186, 240, 212, 0.30)` on hover.
- **Internal Padding:** Standard cards use `32px`; responsive panels use `clamp(1.25rem, 3vw, 2rem)`.

### Inputs / Fields

The current site has no form inputs. If added, fields must follow the glass-chip system: deep teal surface, readable cream or teal-gray text, `12px` to `18px` radius, and a gold focus outline. Do not invent white form fields on this dark brand surface.

### Navigation

The fixed navbar uses a transparent first state and a blur-only feathered backdrop when scrolled. Links are mono uppercase readouts with numeric indexes, `44px` minimum hit areas, and a gold underline datum for hover or active state. Mobile navigation becomes a full-height fixed teal sheet with stacked links and a full-width primary CTA.

### Signature Component: Hero Brand Field

The full-bleed hero raster is the site's primary visual asset. It uses dark teal architectural geometry with gold and cream highlights. It must remain atmospheric and non-interactive, never blocking content or reducing text contrast. Desktop crops visual weight to the right; mobile keeps the image in the upper part of the viewport behind dark masks.

### Signature Component: Contact Command CTA

The contact section is a large gold command surface. It uses mono uppercase text, deep-teal foreground, a separated diagonal arrow, generous responsive height, and a soft inset edge. It is the strongest single contact affordance on the page.

## 6. Do's and Don'ts

### Do:

- **Do** keep the public site team-first: senior engineers, direct work, production durability.
- **Do** use Gold Signal for primary action, focus, section index, and active state only.
- **Do** keep the dark atmospheric field visible behind panels while preserving WCAG AA contrast.
- **Do** use `44px` minimum hit areas for every link and button.
- **Do** use transform-only reveal motion for text so scroll animation never reduces contrast.
- **Do** preserve every external contact path: GitHub, website, X, LinkedIn, Telegram, Upwork, and email.

### Don't:

- **Don't** use community-first language on the public landing page; community positioning belongs to the GitHub presence.
- **Don't** use generic SaaS hero tropes, hero-metric templates, decorative gradient text, or identical card grids.
- **Don't** use excessive glassmorphism. Glass is allowed only as the engineered panel material over the field.
- **Don't** add sketchy illustrations, hand-drawn SVG scenes, or decorative stripe backgrounds.
- **Don't** over-round cards beyond the established `24px` to `30px` panel scale.
- **Don't** ship vague engineering claims. Specific capability and maintainability language is required.

## 7. Portable Layout Contract

Use this section when creating a new Ever Guild screen, section, mockup, or
Stitch prompt. The goal is to preserve the brand language without requiring
the exact React/SCSS implementation.

### Page Shell

- Start from a deep teal canvas, not a light page.
- Keep a fixed or persistent atmospheric field behind content.
- Content sits above the field with `z-index` separation and `isolation`.
- Page backgrounds can use dark teal gradients, low-opacity gold washes, and
  subtle field texture. They must not become visible decorative blobs.
- Main sections are transparent bands over the same field. Avoid section cards
  that make the page look like stacked boxes.

### Containers and Rhythm

- Max content width is `1450px`.
- Gutters are `1.5rem` on mobile, `2.5rem` on tablet, and `4rem` on desktop.
- Vertical section rhythm uses `clamp(3rem, 6vw, 6.5rem)`.
- Section headers align left and sit before the content grid.
- Hero is allowed to fill the first viewport; later sections should leave air
  but not become empty.

### Grid Patterns

- Prefer CSS Grid for section layout.
- Use 1 column below `480px`.
- Use 2 columns for dense service cards above `480px`.
- Use 3 equal people cards only for real team members. Do not use this pattern
  for generic features.
- Use compact data grids for fact strips: 2 columns on mobile, 4 on tablet and
  up.
- Keep final CTAs centered and wide because they are action surfaces, not
  information cards.

### Responsive Rules

- No horizontal scroll on mobile.
- Every interactive target is at least `44px`.
- Hero uses `svh`/`dvh`-safe height, not only `100vh`.
- Button groups stack vertically on small mobile.
- Hero image crops into the upper viewport on mobile and never sits behind
  unreadable text.
- Text must wrap cleanly inside buttons, cards, nav, and chips.

## 8. Section Patterns

### Hero Pattern

The hero is a full-bleed scene with left-anchored copy. It is the only section
where imagery dominates the entire viewport.

- Full-bleed dark architectural raster.
- Strong dark gradient mask from the text side.
- Headline in Tilt Warp, cream first line and gold second line when emphasis is
  needed.
- Short, specific paragraph in Hanken Grotesk.
- Primary gold CTA plus restrained secondary CTA.
- Glass fact strip below actions.
- No hero card, no centered slogan, no scroll cue.

### Team Pattern

Team section proves that visitors work with real senior people.

- Real portraits only.
- Square portrait crop with subtle grayscale at rest.
- Glass card body below the image.
- Name in display font.
- Role in gold mono uppercase.
- Bio in readable teal-gray.
- GitHub handle as a small bordered control.

### Services Pattern

Services are capability modules, not marketing tiles.

- Dense two-column cards above mobile.
- Large gold icon on the right.
- Title and description on the left.
- Text is specific to engineering work.
- Hover raises by `2px`, densifies glass, and turns title gold.

### Technology Pattern

Technology appears as a moving instrumentation strip.

- Glass chips with mono uppercase labels.
- Gold technology icons.
- Slow marquee only when reduced motion is not requested.
- Reduced motion wraps chips and hides duplicate marquee items.

### Contact Pattern

The contact section is one strong command surface.

- Wide gold CTA, not a small form.
- Mono uppercase label.
- Diagonal arrow separated by a hairline.
- Large radius and inset edge.
- On mobile, keep it full width with smaller type and a `24px` radius.

### Footer Pattern

Footer is the warm anchor at the bottom of the site.

- Warm brown background only here.
- Gold top border.
- Cream Tilt Warp wordmark with small gold plus marker.
- Social icons as circular restrained controls.
- Do not add heavy sitemap columns unless there is real navigation content.

## 9. Visual Materials and Recipes

### Engineered Glass

Glass is the signature content material. It must remain matte, tinted, and
functional.

```scss
background: rgba(6, 50, 44, 0.46);
backdrop-filter: blur(30px) saturate(150%) brightness(1.06);
border: 1px solid rgba(186, 240, 212, 0.16);
box-shadow:
  inset 0 1px 0 rgba(255, 255, 255, 0.08),
  inset 0 -12px 28px rgba(0, 0, 0, 0.14),
  0 12px 36px rgba(0, 0, 0, 0.30);
```

Use `24px` radius for standard cards, `30px` for large panels, and `12px` for
chips. Hover glass can use `rgba(10, 63, 55, 0.60)` and
`rgba(186, 240, 212, 0.30)`.

### Gold Command Surface

Gold CTAs are flat and signal-like. They do not glow.

```scss
background: #F1B800;
color: #01181C;
border-radius: 18px;
box-shadow:
  inset 0 1px 0 rgba(255, 255, 255, 0.34),
  inset 0 -14px 32px rgba(56, 30, 0, 0.16),
  0 18px 42px rgba(0, 0, 0, 0.28);
```

### Mono Label

```scss
font-family: "JetBrains Mono", ui-monospace, "SFMono-Regular", monospace;
font-size: 0.75rem;
font-weight: 500;
letter-spacing: 0.16em;
text-transform: uppercase;
color: #AAB9B5;
```

### Display Heading

```scss
font-family: "Tilt Warp", system-ui, -apple-system, "Segoe UI", sans-serif;
font-weight: 400;
line-height: 0.98;
letter-spacing: -0.02em;
color: #FFE79C;
text-wrap: balance;
```

## 10. Interaction and Motion

Motion exists to make the interface feel physical and precise.

### Timing

- Fast transition: `140ms cubic-bezier(0.4, 0, 0.2, 1)`.
- Base transition: `240ms cubic-bezier(0.4, 0, 0.2, 1)`.
- Slow transition: `420ms cubic-bezier(0.4, 0, 0.2, 1)`.
- Reveal transition: `760ms cubic-bezier(0.16, 1, 0.3, 1)`.
- Spring-like hover: `cubic-bezier(0.32, 0.72, 0, 1)`.

### Behavior

- Hover movement is small: `-1px` for buttons and `-2px` to `-4px` for cards.
- Active controls scale to `0.96`.
- Trailing arrows move diagonally by about `3px`.
- Scroll reveal is allowed for leaf elements: headings, text, dividers, ticks.
- Do not apply transform reveal to ancestors of glass panels. It can break
  `backdrop-filter`.
- Animate `transform`, `opacity`, `color`, `background-color`, and
  `border-color`.
- Do not animate layout properties such as `top`, `left`, `width`, or `height`.
- `prefers-reduced-motion` must disable long loops, marquee movement, and
  reveal animations.

Approved loops are subtle hero image drift, background drift, and tech marquee.
No cursor effects, bouncing arrows, neon pulses, or animation for its own sake.

## 11. Content Voice

Ever Guild sounds precise, senior, and durable.

Use:

- Direct capability statements.
- Specific domains: Web3 infrastructure, AI products, full-stack platforms,
  product design, candidate verification, crisis engineering.
- Production language: architecture, support, reliability, maintainability,
  delivery path, real value.
- Team-first framing: visitors work directly with senior engineers.

Avoid:

- Community-first public positioning.
- Hype terms such as "next-gen", "revolutionary", "unleash", "elevate",
  "seamless", and "supercharge".
- Fake metrics such as `99.99%`, `10x`, or `50% faster`.
- Generic placeholder names such as "John Doe", "Acme", or "Nexus".
- Long abstract mission statements.

## 12. Accessibility and Performance

- Target WCAG AA contrast for all meaningful text.
- Body text must be `text-secondary` or brighter.
- Focus state uses a visible gold outline.
- Do not rely on color alone for active, selected, or error state.
- All links and buttons need accessible labels.
- Decorative images use empty `alt` and `aria-hidden`.
- Meaningful portraits use the person's name as `alt`.
- Use responsive raster assets, explicit dimensions, and stable aspect ratios.
- Keep decorative field layers `pointer-events: none`.
- Preserve keyboard navigation in mobile menus, including Escape close and
  focus restoration.
- Never ship a mobile layout with clipped text or horizontal overflow.

## 13. Additional Components for Future Screens

### Forms

Forms are not currently part of the site. If needed, they should inherit the
glass system.

- Label above field.
- Deep teal or glass input background.
- Cream or teal-gray text.
- Gold focus outline.
- Helper text below input.
- Error text below input with icon or copy support, not color alone.
- `12px` to `18px` radius.
- Minimum height `44px`.

### Tables and Dense Data

If a future screen needs data tables:

- Keep the dark field.
- Use mono for headers, IDs, timestamps, and numbers.
- Use Hanken Grotesk for readable cell content.
- Prefer hairline row dividers over heavy card nesting.
- Use gold only for active sort, selected row, or critical action.

### Empty and Loading States

- Use skeleton blocks matching the real layout.
- Avoid generic circular spinners.
- Empty states should explain the next action in direct language.
- Error states should be inline and recoverable.

## 14. Hard Anti-Patterns

Never introduce these into Ever Guild styled work:

- Emojis in UI or brand copy.
- Inter, default system-only font identity, or generic serif typography.
- Pure black backgrounds or white cards.
- Purple/blue neon gradients.
- Outer glow shadows.
- Decorative gradient text in large headings.
- Custom mouse cursors.
- Centered generic SaaS hero sections.
- Hero metric strips with fake proof.
- Stock illustration hero art.
- Decorative SVG scenes when a real brand image is needed.
- Excessive glassmorphism. Glass must hold content.
- Cards inside cards.
- Generic 3-equal-feature-card rows. Real team cards are the exception.
- Cards rounded beyond `30px` for normal content.
- Unreadable muted body copy.
- Scroll arrows, "scroll to explore", or bouncing chevrons.
- Vague engineering claims.
- Broken external links or placeholder social paths.
- Ad-hoc hex colors in components.

## 15. Acceptance Checklist

Before approving a new Ever Guild screen, verify:

- The page is clearly deep teal, not black, slate, white, beige, or purple.
- Gold is rare and marks real action or state.
- The first viewport has a strong brand signal.
- Display typography uses Tilt Warp and is not used for body paragraphs.
- Body copy is readable on dark surfaces.
- Glass panels have content value and preserve backdrop blur.
- Buttons use uppercase mono labels, physical hover/active response, and
  visible focus.
- Mobile has no horizontal scroll and every touch target is at least `44px`.
- Reduced motion has a clean non-animated path.
- Copy is specific, senior, and production-minded.
- The result does not look like a generic SaaS template.
