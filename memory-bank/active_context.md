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

### Phase 33: Cinematic Wipe Transition
- **New Component:** `WipeTransition.jsx`
- **Store:** `languageTransitionStore.js`
- Language switch triggers full-screen black overlay
- Shows flag emoji + language name + decorative elements
- Slow-in (0.4s), fast-out (0.2s) asymmetric timing

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