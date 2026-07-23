---
name: Ever Guild Website
description: Portable design system for the Ever Guild brand site: cold light neutral engineering system, deep-teal structure, gold action signal, crisp clean hairlines, and restrained typography.
style_contract:
  north_star: "The Cold Neutral Engineering Practice"
  density: "6/10 - spacious hero, clean structured capabilities, clear hierarchy"
  variance: "4/10 - grid-led, left-anchored, restrained engineering precision"
  motion: "3/10 - instant visibility, light CSS hover physics, reduced-motion native"
  primary_imagery: "Architectural spec panels and clean editorial typography"
  public_positioning: "Senior engineering team, direct execution, durable software"
colors:
  bg-neutral: "#F7F9F9"
  bg-alt: "#EAF0F1"
  surface: "#FFFFFF"
  surface-hover: "#F1F5F5"
  text-primary: "#0A3036"
  text-secondary: "#193F44"
  text-muted: "#3E6266"
  text-faint: "#60797C"
  accent-gold: "#C99B24"
  accent-gold-hover: "#D9B449"
  border: "#D3DEDF"
  border-strong: "#AABFC1"
  border-accent: "#C99B24"
typography:
  display:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.6rem, 5.2vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.1rem, 4.5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.14
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
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
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  2xs: "4px"
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "64px"
  2xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.accent-gold}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    borderColor: "{colors.border}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
    height: "44px"
  panel-card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.lg}"
    padding: "28px"
---

# Design System: Ever Guild Website

## 1. Overview

**Creative North Star: "The Cold Neutral Engineering Practice"**

Ever Guild's visual system communicates senior engineering execution, clarity, and durability. The site features a crisp, cold light neutral canvas (`#F7F9F9`), deep teal text and structural headings (`#0A3036`), 1px hairline dividers (`#D3DEDF`), and antique gold (`#C99B24`) reserved strictly for primary calls-to-action and focused state signals.

The system explicitly rejects:
- Dark glassmorphism, blurs, and heavy ambient glows.
- Game/HUD decorative tropes and tilted 3D floating cards.
- Infinite marquee scrolling tickers.
- Hidden content or text fading (`opacity: 0` defaults).
- Low-contrast muted copy.

## 2. Color Palette

- **Base Field:** `#F7F9F9` (cold light slate neutral)
- **Alt Field:** `#EAF0F1` (alternating section ground)
- **Surface:** `#FFFFFF` (pure white clean card)
- **Primary Text / Structure:** `#0A3036` (deep teal, AAA contrast)
- **Body Copy:** `#193F44` (high-contrast dark teal-gray)
- **Muted Metadata / Mono:** `#3E6266`
- **Signal Action (Gold):** `#C99B24` (primary buttons, active signals)
- **Border Hairlines:** `#D3DEDF` (crisp structural divider)

## 3. Typography

- **Display & Body:** Hanken Grotesk (`font-family: 'Hanken Grotesk', sans-serif`)
- **Mono / Telemetry:** JetBrains Mono (`font-family: 'JetBrains Mono', monospace`)

## 4. Components & Motion

- **Buttons:** Min-height 44px (touch compliant), uppercase mono label, crisp border, 8px radius.
- **Cards:** Clean white background, 1px hairline border, 12px radius, subtle hover elevation (`translateY(-2px)`).
- **Motion:** Instant visibility (`opacity: 1`), lightweight CSS transforms, full support for `prefers-reduced-motion`.
