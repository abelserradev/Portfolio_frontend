---
name: Buildforge — Foundry Pattern Shop
description: Warm foundry-dark portfolio system — wooden pattern plates, brass registration, workshop type.
colors:
  foundry-ground: "#2a2218"
  foundry-chrome: "#1c1710"
  foundry-brass: "#c9a227"
  foundry-brass-deep: "#8b6914"
  foundry-type: "#e8dcc8"
  foundry-type-bright: "#f3ead8"
  foundry-type-mute: "#c4b49a"
  foundry-type-dim: "#8a7a62"
  foundry-seam: "#5c4a2e"
  foundry-wood: "#3d3124"
  foundry-wood-light: "#4a3a28"
  rail-stripe-dark: "#241c14"
  rail-stripe-mid: "#2e241a"
  rail-caption: "#a89060"
typography:
  display:
    fontFamily: "Big Shoulders Stencil, sans-serif"
    fontSize: "clamp(2.5rem, 5.5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Big Shoulders Stencil, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "0.025em"
  title:
    fontFamily: "Big Shoulders Stencil, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.02em"
  body:
    fontFamily: "Literata, Palatino Linotype, Palatino, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Consolas, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  none: "0px"
  hairline: "2px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "20px"
  lg: "28px"
  xl: "40px"
  section-y: "64px"
components:
  button-primary:
    backgroundColor: "{colors.foundry-brass}"
    textColor: "{colors.foundry-chrome}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "#d4b03a"
    textColor: "{colors.foundry-chrome}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.foundry-brass}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "10px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foundry-type-mute}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  plate:
    backgroundColor: "{colors.foundry-wood}"
    textColor: "{colors.foundry-type}"
    rounded: "{rounded.none}"
    padding: "16px 20px"
  input-field:
    backgroundColor: "{colors.foundry-ground}"
    textColor: "{colors.foundry-type}"
    rounded: "{rounded.none}"
    padding: "10px 12px"
  nav-chrome:
    backgroundColor: "{colors.foundry-chrome}"
    textColor: "{colors.foundry-type-mute}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 28px"
  chip-tech:
    backgroundColor: "{colors.foundry-chrome}"
    textColor: "{colors.foundry-type-mute}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
---

# Design System: Buildforge — Foundry Pattern Shop

## Overview

**Creative North Star: "Foundry Pattern Shop"**

Buildforge’s public face reads as a warm workshop bench, not a neon agency template. The ground is sand-mold dark; surfaces are wooden pattern plates with brass registration marks; type is workshop-stenciled for brand and serif for craft reading. Density paces from a registered first viewport (rail + hero plate + teaser stack) into quieter mid-page teaching, then a denser mission catalog that settles onto a shared baseline.

The system refuses centered cyber-neon heroes, glitch clone logos, cyan/magenta scan frames, and icon-card service grids. Soft offset shadows with blur convey weight on wood; hard neobrutal blocks are out of world. Mono type is reserved for plate IDs, scales, and measurements — never for marketing headlines.

**Key Characteristics:**
- Warm foundry dark ground with sand-mold texture and chrome rails
- Pattern-wood plates with dashed brass register frames and corner marks
- Big Shoulders Stencil + Literata + JetBrains Mono triad
- Soft brown-black offset shadows; brass as scarce accent metal
- Mission plates register on scroll (ease-out-expo); reduced-motion ships already registered

## Colors

Warm foundry metals and parchment type on dark shop ground — brass is the only bright accent.

### Primary
- **Foundry Brass** (`foundry-brass`): Primary CTA fill, focus rings, plate IDs, hover underlines, register accents. Rarity is intentional — keep brass under ~10% of any viewport.
- **Deep Brass** (`foundry-brass-deep`): Nav bottom edge, dashed register strokes, scrollbar thumb at rest, quieter brass borders.

### Secondary
- **Pattern Wood / Wood Light** (`foundry-wood`, `foundry-wood-light`): Plate face gradients (light → ground → wood). Never flat fills for signature plates.

### Neutral
- **Foundry Ground** (`foundry-ground`): Page canvas and sand-mold base.
- **Foundry Chrome** (`foundry-chrome`): Fixed nav, rails, teaser column, chat chrome, list wells.
- **Seam** (`foundry-seam`): Borders and dividers between plates and sections.
- **Type ramp** (`foundry-type-bright` → `foundry-type` → `foundry-type-mute` → `foundry-type-dim`): Headlines → body → supporting → metadata.
- **Rail stripes** (`rail-stripe-dark`, `rail-stripe-mid`, `rail-caption`): Vertical process rail hatching and caption ink.

### Named Rules
**The Scarce Brass Rule.** Brass fills CTAs, IDs, and focus — not large backgrounds. If a screen looks golden, pull brass back to chrome/wood.

**The Seam-Not-Glow Rule.** Separate surfaces with `foundry-seam` borders; never cyan/magenta glows or neon outlines.

## Typography

**Display Font:** Big Shoulders Stencil (via `--font-display-stack`)
**Body Font:** Literata with Palatino Linotype / Palatino fallbacks
**Label/Mono Font:** JetBrains Mono (plate stack only)

**Character:** Stencil workshop for brand and section titles; literary serif for pitch and descriptions; mono stamped like engraved plate numbers.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 5.5vw, 3.75rem)`, line-height 0.95): Hero brand name only.
- **Headline** (700, ~1.875–2rem / `text-2xl`–`text-3xl`, tracking-wide): Section titles (Servicios, Misiones, contact brand).
- **Title** (700, ~1.125–1.5rem): Plate titles, teaser labels, nav logo mark.
- **Body** (400, 1rem / `text-base`, leading-relaxed; max ~65ch for pitches, ~36ch for hero sentence): Supporting copy.
- **Label** (mono, 0.6875rem, uppercase, letter-spacing 0.12em): `PAT-00N`, `ESCALA 1:1`, tech chips, register footers.

### Named Rules
**The Mono Measurement Rule.** JetBrains Mono is for IDs, scales, status stamps, and tech chips — not for brand display or paragraph reading.

**The Stencil Brand Rule.** `</BUILDFORGE>` and display headlines stay Big Shoulders Stencil; do not substitute Orbitron, Geist, Inter, or Space Grotesk.

## Layout

First viewport is a three-band foundry bench on large screens: left process rail (~72px), center hero pattern plate + copy stack, right teaser plate column (~240–420px). Below that, a chrome register strip (`REGISTER · FIXED SCALE`). Mid-page sections use `container` + horizontal `px-4` and vertical rhythm ~`py-12`–`py-20` with `scroll-mt-24`/`28` under the fixed nav.

Mission catalog prefers fixed-scale plates in a dense grid after a quieter services teach block. Spacing tokens map to plate padding (`14–20px`), CTA padding (`14px 22px`), and section breathing room (`64px`+). Prefer shared baselines and register alignment over floating card scatter.

## Elevation & Depth

Depth is soft foundry weight, not glassmorphism or hard offset blocks. Plates sit on soft brown-black shadows; the hero pattern plate adds an inset chrome collar plus the stronger cast shadow.

### Shadow Vocabulary
- **Plate soft** (`box-shadow: 4px 8px 20px rgba(14, 10, 6, 0.4)`): Default `.foundry-plate` and primary CTA rest state.
- **Plate cast** (`box-shadow: 6px 10px 28px rgba(14, 10, 6, 0.55)`): Hero/pattern emphasis and chat panel presence.
- **Teaser hover** (`4px 8px 22px rgba(14, 10, 6, 0.45)`): Right-rail plate hover lift.
- **Consent lift** (`0 -8px 28px rgba(14, 10, 6, 0.45)`): Bottom consent banner only.

### Named Rules
**The Soft Offset Rule.** Shadows always blur; hard 0-blur neobrutal offsets are out of world.

**The Flat Chrome Rule.** Nav and rails stay flat chrome with seam/brass borders — no drop shadow on the fixed bar.

## Shapes

Form language is squared workshop joinery: plates, CTAs, inputs, and chips use **0px radius**. Hairline rounding (`2px`) appears only on scrollbar thumbs. Registration language uses 1px seams, 1px dashed deep-brass inset frames (`.foundry-plate-register`), and 8×8px corner brackets on mission plates. Hero pattern plate uses a 3px solid brass outer border plus inset chrome collar.

Do not introduce pill CTAs or large rounded cards into the plate system. Circular chat FAB/avatar chrome is interaction chrome, not the plate vocabulary.

## Components

### Buttons
- **Shape:** Squared (`0px`); display stencil uppercase with letter-spacing ~0.08em.
- **Primary (`.foundry-cta`):** Brass fill, chrome text, soft plate shadow; hover lightens toward `#d4b03a` / brass+white mix; active nudges `translateY(1px)`; transition 180ms `cubic-bezier(0.19, 1, 0.22, 1)`.
- **Secondary:** Transparent with brass border (~70% opacity), brass uppercase display text; hover fills brass at ~10% opacity.
- **Ghost:** Seam border, mute type; hover brightens border/text toward brass or type-bright.

### Chips
- **Tech chips:** Seam border, chrome/60 fill, mono 10px mute type — inventory stamps, not pills.
- **Status badges:** Same squared mono stamp; brass-tinted for live/MVP, seam/chrome for quieter states.

### Cards / Containers (Pattern Plates)
- **Corner Style:** Squared; optional corner registration marks on missions.
- **Background:** Wood gradient via `.foundry-plate`; sand texture lives on `body.foundry-sand`, not inside every plate.
- **Shadow Strategy:** Soft plate shadow; register settle may ease box-shadow on mission plates.
- **Border:** 1px seam; featured/hero may use brass border emphasis.
- **Internal Padding:** ~16–28px (`p-4`–`p-7`).

### Inputs / Fields
- **Style:** Ground fill, seam border, squared; type and mute placeholders.
- **Focus:** Brass border + `ring-2` brass/30 (in addition to global `:focus-visible` brass outline 2px / offset 3px).
- **Disabled:** Opacity ~50–60%, cursor not-allowed.

### Navigation
- Fixed chrome bar, `border-b-2` deep brass; logo as stencil `</BUILDFORGE>` (no glitch clones). Links: display uppercase, mute → bright on hover, brass underline grows from left. Spacer equals measured nav height (~64px default).

### Signature — Process Teach Diagram
Single didactic figure in Services: Forma → Molde → Desarrollo → Producto. Desktop SVG with ground fills, seam strokes, dashed deep-brass inners, brass arrows; mobile falls back to a 2×2 plate grid. Do not multiply teach-diagrams across the page.

### Signature — Mission Plate Registration
`.foundry-mission-plate` starts unsettled (opacity 0.35, `translateY(18px)`) then registers (520ms ease-out-expo) on intersection. Prefer-reduced-motion ships already registered.

## Do's and Don'ts

### Do:
- **Do** lead with craft: pattern plates, register marks, and real API missions before marketing claims.
- **Do** keep brass scarce — CTAs, IDs, focus, and thin accents only.
- **Do** use soft brown-black blurred shadows (`4–6px` offset, `20–28px` blur).
- **Do** reserve JetBrains Mono for plate IDs, scales, chips, and register metadata.
- **Do** honor `prefers-reduced-motion` (mission plates pre-registered; no settle animation).

### Don't:
- **Don't** revive neon/cyan/magenta glitch clones, TypeAnimation hero loops, or scan-frame pulses.
- **Don't** put marketing headlines in mono or swap display to Inter/Geist/Orbitron/Space Grotesk.
- **Don't** invent hard neobrutal offset shadows or large rounded “SaaS cards” as the default plate.
- **Don't** invent client logos, awards, or metrics not supplied by product/API content.
- **Don't** spread icon-card service grids; services stay list + one teach-diagram + media.
