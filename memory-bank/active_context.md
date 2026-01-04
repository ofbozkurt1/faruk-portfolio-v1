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
- **New Naming Convention**: 
  - Posts: `pst1.webp`, `pst2.webp`, ...
  - Long Posts (3-panel): `pstlng1.webp`, `pstlng2.webp`, ...
  - Stories: `str1.webp`, `str2.webp`, ...
- **Stack Format Modes**:
  - `'post'` - Only posts, 4/5 aspect ratio (default)
  - `'story'` - Only stories, 9/16 vertical aspect ratio
  - `'hybrid'` - Mixed posts + stories, each with own aspect ratio
- **Utility Functions**: `getPostImages()`, `getLongPostImages()`, `getStoryImages()` in `imagePath.js`.
- **getStackImages()** now returns `{ src, type }` objects for hybrid support.

### New Projects Added
- **Adana Napoli**: 2 posts, 1 long post, 5 stories (`stackFormat: 'story'`)
- **Hacı Hakkı Usta**: 2 posts, 2 stories (`stackFormat: 'hybrid'`)

### GridView Enhancements
- **Posts/Stories Sections**: Separate display for long posts, posts, and stories.
- **Smooth Scrolling**: Added momentum-based easing with `requestAnimationFrame`.
- **Long Posts**: Full-width display for 3-panel panoramic images.

### Bug Fixes
- **Google Yorumlar techStack**: Changed from AE/PR to Photoshop/Illustrator.
- **WordPress SVG**: Removed corner white triangles.

## File Structure Update
```
src/
├── components/
│   ├── layout/Header.jsx         # Lang switch, scroll opacity
│   └── ui/
│       ├── SideNav.jsx           # New auto-hiding right nav
│       └── AtmosphericBackground.jsx # Optimized phase-shifted orbs
├── features/portfolio/
│   ├── ProjectCard.jsx           # Hybrid aspect ratio support
│   └── GridView.jsx              # Smooth scroll, Posts/Stories sections
├── utils/
│   └── imagePath.js              # pst/pstlng/str naming, getStackImages with type
└── data/
    └── projects.js               # 4 projects, stackFormat property
```

## Design Decisions
- **Performance**: Removed `backdrop-filter` and complex header animations. Replaced CSS filters with opacity stacking for background.
- **Interactivity**: Hover effects added to all actionable elements (socials, buttons).
- **Aesthetics**: Dark theme outline styles for secondary buttons.
- **Hybrid Mode**: Each card renders with its own aspect ratio for mixed content.

## Dev Server
- http://localhost:5173/