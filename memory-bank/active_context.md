# Active Context

## Current Phase: Phase 12 - Visual Polish & Interactivity
Enhanced animations, new navigation features, and refined UI elements.

## Latest Session Summary (2026-01-04)

### Header Refinements
- **New Animation**: "Let's Talk" button has a circle-fill animation on hover.
- **Language Switch**: Added EN | TR switch next to CTA.
- **Background**: Transparent at top, smooth fade-in (opacity) to static gradient on scroll (performance optimized).
- **Layout**: Increased gap between elements (24px).

### Hero Section Overhaul
- **Name Animation**: Typewriter effect for "ÖMER FARUK BOZKURT" (5s loop).
- **Hero Title**: "Motion & Graphic Designer" moved *below* the name.
- **Profile Photo**: Removed border, subtle scale (1.05x) on hover.
- **Actions**: Added "Download CV" button (outline style) + Social Icons (LinkedIn, Behance, Instagram).
- **Social Icons**: Rounded square style with brand color hovers (Instagram gradient).

### Portfolio Section Polish
- **Header**: "selected works" styled with glow and lines.
- **Card Behavior**:
  - Image auto-rotation interval: **4 seconds**.
  - **Cinematic Transition**: Auto-rotation takes **1.5s** (slow/smooth).
  - **Snappy Hover**: Interaction transition remains **0.25s**.
  - **Opacity**: Background cards are fully opaque (opacity: 1).
- **Tech Stack Icons**:
  - Replaced `react-icons` with **original SVG files** (Photoshop, AI, AE, PR).
  - Displayed in **original brand colors** (no filters).
- **Call to Action**:
  - "Click to explore →" text with **Shine Animation**.
  - High contrast visibility (White on Dark).

### New Side Navigation (`SideNav.jsx`)
- **Right-side Indicator**: 4 dots tracking active section.
- **Auto-hide**: Fades out after **2 seconds** of inactivity.
- **Interaction**: Reappears on scroll or mouse hover.

### Atmospheric Background Refinements
- **Performance Optimization**: Solved animation lag by replacing heavy `hue-rotate` filters with a **Phase-Shifted Opacity** system.
- **Animation Logic**:
  - Two overlapping layers per orb (one Purple, one Crimson).
  - Layers cross-fade (opacity 0 <-> 0.8) with offset timings to simulate color swapping.
  - Orbs "breathe" (scale 1 <-> 1.1) during the cycle.
  - **No layout thrashing**: Removed large `translate` movements; kept elements static.
- **Visuals**: maintained the "Silent Luxury" deep atmospheric look with significantly reduced GPU load.

### Skills Section Updates
- **New Skills Added**: WordPress and Antigravity (Google) icons added to core tools.
- **Icon Styling**: All skill icons now have `border-radius: 6px` for subtle rounded corners.
- **WordPress SVG Fix**: Removed corner white triangles from logo, kept blue background intact.

### StackView & Portfolio Data Enhancements
- **5-Image Stack**: StackView now displays **5 images** instead of 3 for richer preview.
- **Animation Update**: Rotation, scale, and Y-position values extended for 5-card stack.
- **Posts/Stories Structure**: Project data now supports categorized images:
  - `posts: { start: 1, end: 7 }` - Regular post images
  - `stories: { start: 8, end: 18 }` - Story format images
- **Novastra Update**: imageCount updated to 18, with posts (1-7) and stories (8-18) defined.
- **Utility Functions**: Added `getPostImages()` and `getStoryImages()` to `imagePath.js`.

## File Structure Update
```
src/
├── components/
│   ├── layout/Header.jsx         # Lang switch, scroll opacity
│   └── ui/
│       ├── SideNav.jsx           # New auto-hiding right nav
│       └── AtmosphericBackground.jsx # Optimized phase-shifted orbs
```

## Design Decisions
- **Performance**: Removed `backdrop-filter` and complex header animations. Replaced CSS filters with opacity stacking for background.
- **Interactivity**: Hover effects added to all actionable elements (socials, buttons).
- **Aesthetics**: Dark theme outline styles for secondary buttons.

## Dev Server
- http://localhost:5173/