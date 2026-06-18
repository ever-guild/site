---
name: Ever Guild Website
description: Senior engineering team brand site with a deep-teal field, gold signal, and engineered glass surfaces.
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
  text-faint: "#8CA09B"
  accent-gold: "#F1B800"
  accent-cream: "#FFE89E"
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

The system is committed, dark, and engineered. The Three.js infinity field is the primary imagery; glass panels and blueprint hairlines sit above it as instrumentation, not decoration. The copy stays direct and specific, carrying the product line from `PRODUCT.md`: "Precise, senior, durable."

The system explicitly rejects community-first public positioning, generic SaaS hero tropes, decorative gradient text, identical card grids, excessive glassmorphism, sketchy illustrations, over-rounded cards, and vague engineering claims.

**Key Characteristics:**
- Deep teal field with rare gold signal.
- Cream display type over readable teal-gray body copy.
- Frosted engineered panels that sample the WebGL atmosphere beneath.
- Mono labels used as telemetry and coordinates, never as generic "developer" costume.
- Motion that reveals structure while preserving contrast and reduced-motion safety.

## 2. Colors

The palette is a committed deep-teal environment with gold as a sparse operational signal and cream as the warm readable highlight.

### Primary
- **Abyss Teal Field** (`bg-deep`): The page background and deepest brand surface. It carries the whole site and must remain dominant.
- **Guild Gold Signal** (`accent-gold`): Primary CTA, active state, section indexes, crosshair ticks, and rare emphasis. Its scarcity is the point.
- **Cream Readout** (`text-cream`): Display text, logo-adjacent text, and bright hover glints on dark surfaces.

### Secondary
- **Frosted Emerald Surface** (`surface-teal`): Base panel tone for cards and content blocks. It should feel like instrument glass over the particle field.
- **Hover Teal Surface** (`surface-teal-hover`): Interactive surface response for secondary buttons, glass cards, and dense chips.
- **Warm Footer Ground** (`warm-footer`): Footer-only grounding color. Do not spread it into the main page.

### Tertiary
- **Particle Cyan** (`teal-particle`): WebGL particle contrast color. It belongs to the atmospheric scene, not standard UI surfaces.
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

Depth is conveyed through frosted glass, translucent borders, inset rim light, and a controlled ambient shadow. Surfaces are not generic drop-shadow cards. The shadow exists to place glass over the WebGL field, not to create floating SaaS tiles.

### Shadow Vocabulary

- **Glass Panel Depth** (`inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -12px 28px rgba(0,0,0,0.14), 0 12px 36px rgba(0,0,0,0.30)`): Engineered panels and large cards.
- **Glass Chip Rim** (`inset 0 1px 0 rgba(255,255,255,0.08)`): Small tags and chips.
- **Contact Signal Rail** (`inset 0 2px 0 -1px rgba(241,184,0,0.10)`): Contact email panel only.

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

### Signature Component: Infinity Field

The WebGL infinity particle field is the site's primary visual asset. It uses teal, gold, cream, and dark teal particles with responsive density. It must remain atmospheric and non-interactive, never blocking content or reducing text contrast. Reduced motion switches the canvas to demand rendering.

### Signature Component: Contact Terminal

The contact email panel is a large engineered glass command surface. It uses a mono gold prompt, Tilt Warp email text, a blinking caret, and a diagonal arrow response. It is the strongest single contact affordance on the page.

## 6. Do's and Don'ts

### Do:

- **Do** keep the public site team-first: senior engineers, direct work, production durability.
- **Do** use Gold Signal for primary action, focus, section index, and active state only.
- **Do** keep the WebGL field visible behind panels while preserving WCAG AA contrast.
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
