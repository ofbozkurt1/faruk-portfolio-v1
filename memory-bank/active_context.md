# Active Context

## Current Phase: Phase 29 - Final Performance Polish & LCP Optimization
Final round of performance optimization focusing on LCP (Largest Contentful Paint) and image loading strategies.

## Latest Session Summary (2026-01-07)

### LCP & Image Optimization
- **Hero Profile Image (LCP Fixed)**:
  - Removed `loading="lazy"` (Critical fix)
  - Added `fetchPriority="high"`
  - Added `decoding="sync"`
  - Explicit `width` and `height` attributes to prevent CLS
- **Ghost Reel Images (Background)**:
  - Updated to use optimized images from `public/gorseller/slidergorseller/` (renamed from `slidergörseller`)
  - Added `loading="lazy"`
  - Added `decoding="async"`
  - Added `aria-hidden="true"` since they are decorative

### Services Section Polish
- **Hover Logic**:
  - **UI Feedback**: Instant response via `pendingServiceIndex`
  - **Background Animation**: **1 second delay** via `activeServiceIndex`
  - Prevents background flashing during fast scrolling
- **Store Updates**: Added debounce logic to `serviceStore.js`

### Performance Overhaul (Significant Gains)
Removed expensive graphic effects that were causing frame drops:

#### 1. ProjectCard.jsx
- **Removed**: `backdrop-filter: blur(8px)` from "Explore Pill" and "Tech Pills"
- **Replaced with**: Solid dark background `rgba(20,20,25,0.9)`
- **Impact**: Massive GPU load reduction for 6+ cards

#### 2. GridView.jsx (Case Study)
- **Removed**:
  - `boxShadow: 0 4px 20px` (Color Swatch)
  - `boxShadow: 0 25px 50px` (Gallery Images)
  - `boxShadow: 0 0 40px` (Category Badge Glow)
- **Impact**: Better scroll performance in modal

#### 3. Hero.jsx
- **Removed**: `boxShadow: 0 20px 50px` from Profile Photo
- **Impact**: Smoother float animation

---

## Previous Phases

### Phase 27: Internationalization (i18n)
- Multi-language support (TR/EN)
- `react-i18next` implementation
- JSON translation fles

### Phase 25-26: Case Study & Gallery
- Behance-style GridView
- Staggered gallery layout

---

## Dev Server
- http://localhost:5173/