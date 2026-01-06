# Active Context

## Current Phase: Phase 28 - Performance Optimization & Services Polish
Major performance optimizations across the entire site and Services section refinement.

## Latest Session Summary (2026-01-07)

### Ghost Reel Animation (Hero Background)
- **Component**: `HeroBackground.jsx`
- **Design**: 
  - 2 side columns (Left & Right)
  - Left: Rotated +6deg (Outward)
  - Right: Rotated -6deg (Inward)
- **Content Strategy**:
  - **Left Side**: Column 1 (Posts ↑), Column 2 (Stories ↓)
  - **Right Side**: Column 1 (Posts ↑), Column 2 (Stories ↓)
  - **Mixed Content**: Images from ALL projects (Novastra, Adana Napoli, Hacı Hakkı Usta, etc.)
- **Performance**:
  - GPU-accelerated CSS animations (`will-change: transform`)
  - **NO Hover Effects**: Removed heavy blur/opacity transitions
  - **Static Filter**: `grayscale(100%)` and low opacity (0.08)

### Services Section Polish
- **Hover Logic**:
  - **UI Feedback**: Instant response (color change, indicator line) via `pendingServiceIndex`
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

### Current Effect Status
| Effect | Status | Reason |
|--------|--------|--------|
| `backdrop-filter` | ❌ Removed | Too heavy for list items |
| `box-shadow` (Large) | ❌ Removed | High paint cost |
| `will-change` | ✅ Added | Targeted GPU optimization |
| CSS Animations | ✅ Optimized | Transform-only animations |

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