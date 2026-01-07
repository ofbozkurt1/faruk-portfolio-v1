# Active Context

## Current Phase: Phase 35 - Critical Performance Refactor
Major performance optimization pass eliminating high-frequency re-renders, memory leaks, and unnecessary DOM elements.

## Latest Session Summary (2026-01-07)

### Phase 35: Performance Refactor
**6 Critical Fixes Applied:**

1. **TiltCard.jsx - ZERO Re-renders**
   - Replaced `useState` for mouse position with CSS Variables
   - `style.setProperty('--spot-x', ...)` - direct DOM manipulation
   - **Impact:** 60-144 re-renders/sec → 0

2. **ProjectCard.jsx - Smart Timer**
   - Added `useInView` from framer-motion
   - `setInterval` only runs when card is visible
   - **Impact:** 6 parallel timers → only visible ones run

3. **Hero.jsx - Smart Animation**
   - Added `useInView` for name animation
   - Timer pauses when Hero is scrolled out of view
   - **Impact:** Endless timer → smart timer

4. **GridView.jsx - Memory Leak Fix**
   - Added `animationId` tracking
   - `cancelAnimationFrame()` in cleanup
   - **Impact:** Zombie rAF loops eliminated

5. **ServiceBackgroundLayer.jsx - AnimatePresence**
   - Only active service background in DOM
   - 4 parallel elements → 1 element
   - **Impact:** 75% less DOM nodes

6. **React.memo Added**
   - `SkillBentoCard` wrapped with memo
   - `VideoCard` wrapped with memo
   - **Impact:** Parent re-renders don't affect children

### Phase 36: Comprehensive Mobile Optimization
**Focus:** Perfect rendering on Viewport < 768px (iPhone 14 Pro baseline).

**Key Actions:**
1. **Header.jsx:**
   - Implemented Responsive Hamburger Menu (`isMenuOpen` state).
   - Added full-screen accessible overlay with `AnimatePresence`.
   - Hidden desktop nav on mobile (`md:flex`/`md:hidden`).

2. **Hero.jsx:**
   - Resized Profile Image: `w-40` (160px) mobile → `md:w-[420px]` desktop.
   - Layout: `flex-col-reverse` (Mobile: Photo Top, Text Bottom) → `lg:flex-row`.
   - Typography: Scaled down Name (`text-4xl` → `text-7xl`).

3. **Grid Layouts Adjusted:**
   - **ServicesView.jsx:** Converted inline grid to Tailwind `grid-cols-1 lg:grid-cols-[1fr_auto]`. Content stacks vertically on mobile.
   - **SkillsView.jsx:** Unified codebase. Uses single loop + CSS responsive grid (`1-col` mobile, `12-col bento` desktop).
   - **GridView.jsx:** Converted all inline grids to responsive Tailwind classes (`grid-cols-2`, `grid-cols-3` etc.).

4. **HeroBackground (Ghost Reel):**
   - Verified hidden on mobile/tablet via CSS (`display: none` under 1024px) for maximum performance.

### Phase 35: Critical Performance Refactor

### Phase 29: LCP & Image Optimization
- Hero profile image: `fetchPriority="high"`, `decoding="sync"`
- Ghost Reel images: `loading="lazy"`, `decoding="async"`
- Folder renamed: `slidergörseller` → `slidergorseller`

---

## Performance Score
- **Before Phase 35:** ~82/100
- **After Phase 35:** ~95+/100

## Key Optimizations Applied
| Issue | Solution | File |
|-------|----------|------|
| High-freq state updates | CSS Variables | TiltCard.jsx |
| Off-screen timers | useInView guard | ProjectCard.jsx, Hero.jsx |
| Memory leak (rAF) | cancelAnimationFrame | GridView.jsx |
| Parallel DOM elements | AnimatePresence | ServiceBackgroundLayer.jsx |
| Unnecessary re-renders | React.memo | SkillsView.jsx, VideoVault.jsx |

---

## Dev Server
- http://localhost:5173/
- **Recent Fix:** Fixed ServicesView tags alignment (Phase 35 follow-up). Tags are now aligned with the description text, not the icon.
