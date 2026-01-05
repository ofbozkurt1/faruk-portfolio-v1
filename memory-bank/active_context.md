# Active Context

## Current Phase: Phase 20 - Cinematic Services Section
Implemented hover-reveal accordion list with performance-optimized backgrounds.

## Latest Session Summary (2026-01-05)

### Phase 20: Services Section - Complete

#### New Components Created
| File | Purpose |
|------|---------|
| `src/features/services/ServicesView.jsx` | Main services accordion |
| `src/features/services/index.js` | Module export |
| `src/stores/serviceStore.js` | Zustand global state |
| `src/components/ui/ServiceBackgroundLayer.jsx` | CSS-only dynamic backgrounds |

#### Services Data
```javascript
[
  { title: "Motion Graphics", color: "#9333EA", symbol: "▶" },
  { title: "Brand Identity", color: "#3B82F6", symbol: "◆" },
  { title: "UI/UX Animation", color: "#EC4899", symbol: "★" },
  { title: "Video Editing", color: "#F97316", symbol: "●" }
]
```

#### Features Implemented
1. **Hover-Reveal Accordion List**
   - Large title with service color on hover
   - Description + tags on right side
   - Decorative symbols (▶ ◆ ★ ●) with service colors
   - Glass pill badges for tags

2. **Dynamic Backgrounds (Performance Optimized)**
   - Large number watermark (01-04) at 90% opacity
   - Tool icons (After Effects, Photoshop, Illustrator, Premiere)
   - Full color radial gradient per service
   - NO backdrop-filter, NO mix-blend-mode

3. **Zustand State Management**
   - `useServiceStore` for global hover state
   - Prevents prop-drilling and re-renders

4. **Navigation Integration**
   - Added "Services" to Header nav links
   - Added "Services" to SideNav dots

#### Layout Structure
```
| Left Side (flex-1)      | Right Side (340px)         |
|-------------------------|----------------------------|
| [01] Motion Graphics    | ▶ Description text...      |
|                         | [Tags] [Tags] [Tags]       |
```

#### Performance Rules
- ✅ CSS-only patterns (no images)
- ✅ will-change: opacity (GPU acceleration)
- ✅ pointer-events: none
- ❌ NO backdrop-filter
- ❌ NO mix-blend-mode

### Previous Phases (Same Day)

#### Phase 19: New Projects
- Added 4 projects: Akdeniz Etkinlik, Tırnak Trend, BBS Transfer, Kumrualtı
- Custom display order support
- Total: 8 projects

#### Phase 18: Performance Refactor
- TiltCard: Removed backdrop-blur
- Hero: Removed letter blur, CSS float
- Header: Throttled scroll handler
- AtmosphericBackground: 2 orbs

## Dev Server
- http://localhost:5173/