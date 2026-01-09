# 📉 PHASE 45: OPTIMIZATION FOR LOW-END DEVICES (THE POTATO TEST)

**OBJECTIVE:**
Optimize the application to run at 60 FPS on low-end hardware (e.g., Intel i3, Integrated Graphics, Older iPhones).
**Current Status:** The app lags on high-end hardware, implying massive inefficiency.
**Root Cause:** "DOM Bloat" (Rendering both Mobile and Desktop trees) and expensive GPU effects.

**STRATEGY:**
1.  **Strict Conditional Rendering:** Remove hidden elements from the DOM entirely.
2.  **Effect Reduction:** Disable expensive CSS filters on mobile/low-power modes.
3.  **Render Guarding:** Prevent unnecessary re-renders.

**TASKS:**

### 1. ✂️ IMPLEMENT `useMediaQuery` SEPARATION (Crucial)
- **Target:** `src/App.jsx` or Main Sections (`Skills`, `Portfolio`, `Services`).
- **The Fix:** Do NOT use CSS (`hidden md:block`) to hide large component trees. Use JS.
- **Code Pattern:**
  ```jsx
  import { useMediaQuery } from 'react-responsive'; // or a custom hook

  const SkillsSection = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    
    // IF MOBILE: Render ONLY the lightweight static list. 
    // The Heavy 3D Tilt Cards are NOT even mounted.
    return isDesktop ? <Heavy3DSkills /> : <LightweightMobileSkills />;
  }
  ```
- **Action:** Apply this logic to `SkillsView`, `Services`, and `Portfolio` layouts.

### 2. 🎨 DISABLE HEAVY GPU EFFECTS (Blur/Shadow)
- **Target:** Global CSS (`index.css`) & `HeroBackground.jsx`.
- **The Fix:** `backdrop-filter: blur(...)` is a performance killer on weak GPUs.
- **Action:**
  - Create a simplified class for mobile: `.glass-mobile { background: rgba(0,0,0,0.9); }` (No blur).
  - Use this class instead of `backdrop-blur-xl` on mobile menus and cards.
  - Reduce `box-shadow` spread radius on animating elements.

### 3. 🖼️ IMAGE & VIDEO THRESHOLD
- **Target:** `HeroBackground.jsx` (Ghost Reel) & `VideoVault.jsx`.
- **The Fix:**
  - On Mobile/Tablet: Limit the Ghost Reel to max **10 images** (instead of 60).
  - On Mobile: Do NOT auto-play videos in the background if possible, or use highly compressed poster images.

### 4. 🛑 STOP THE "CONTEXT THRASHING"
- **Target:** `TransitionContext.jsx` / Scroll Listeners.
- **Check:** Ensure we are NOT storing `scrollY` in a Context Provider that wraps the whole app.
- **Fix:** Use specific `useScroll` hooks from Framer Motion locally in components that need it, rather than broadcasting to the whole app.

**OUTPUT:**
Refactored code for the main Layout/Section components that strictly separates Mobile vs. Desktop rendering logic to reduce RAM usage by 50%.
