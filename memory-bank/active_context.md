# Active Context

## Current Phase: Phase 15 - Hero & UI Polish
Premium animations and refined visual design for the landing experience.

## Latest Session Summary (2026-01-05)

### Hero Section - Major Overhaul
- **Name Animation**: Replaced typewriter with dynamic letter-by-letter wave effect
  - Each letter fades in from below with blur
  - Staggered delay (0.04s per letter)
  - Loops every 6 seconds
- **Title Animation**: "Motion & Graphic Designer" now has gradient shine effect
  - Larger font (14px), wider spacing (0.25em)
  - Animated gradient sweep (4s loop)
- **Section Size**: Increased to full viewport (`min-h-screen`)
- **Spacing**: More padding and gaps for premium feel

### Profile Photo - Clean & Dynamic
- **Floating Animation**: Subtle up-down breathing effect (4s, -10px)
- **Hover Zoom**: Photo scales 1.1x, container scales 1.03x
- **No Border**: Removed white border for cleaner look
- **Size Increased**: 300px-420px (was 260px-380px)

### Social Icons (Hero)
- **Shape**: Changed from rounded squares to **full circles** (border-radius: 50%)
- **Size**: Increased to 46x46px with 18px icons
- **Order**: Instagram → Behance → LinkedIn
- **LinkedIn Logo**: Changed to cleaner "in" glyph (no outer square)

### Download CV Button
- **Shape**: Full pill (border-radius: 50px)
- **Hover Effect**: Circular wipe animation preserved

### Click to Explore Button (ProjectCard)
- **New Design**: Glassmorphism pill button
- **Positioning**: Lower (`mt-24`)
- **Size**: Smaller, more subtle (10px 24px padding, 11px font)
- **Animations**:
  - Shimmer sweep (2.5s continuous)
  - Gradient text shine
  - Arrow slide on hover

### Skills Section - Visual Refinements
- **TiltCard**: Added `borderColor` prop for dynamic hover borders
- **Micro-Tool Indicators**: Technical SVG icons with hover glow (removed after feedback)
- **Giant Watermark**: Tool's own logo as subtle background (3% opacity, blur)

## Technical Updates
- **CSS Class Naming**: Fixed conflicts (explore-pill, explore-text vs btn-text)
- **Animation Performance**: Continuous keyframes (0% → 100%) instead of pausing

## File Changes
```
src/features/hero/Hero.jsx          # New letter animation, photo effects, social icons
src/features/portfolio/ProjectCard.jsx  # Explore pill button redesign
src/features/skills/SkillsView.jsx  # Giant watermark, dynamic borders
src/components/ui/TiltCard.jsx      # borderColor prop added
```

## Design Decisions
- **Minimal Photo**: Only float + zoom, no glow rings or borders
- **Premium Typography**: Gradient shine animations on titles
- **Circular Social Icons**: Modern, consistent with pill-shaped buttons
- **Continuous Animations**: No stuttering/pausing in loops

## Dev Server
- http://localhost:5173/