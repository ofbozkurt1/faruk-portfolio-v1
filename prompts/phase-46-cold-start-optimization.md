# 🧊 PHASE 46: COLD START OPTIMIZATION (ASSET LOADING STRATEGY)

**OBJECTIVE:**
Eliminate the initial UI lag/stutter (jank) when the site is loaded for the first time in a new browser.
**Root Cause:** The browser is trying to download and render all images/videos simultaneously (Network & Main Thread Contention).

**STRATEGY:**
Act as a "Traffic Controller" for assets. Prioritize what is visible (Hero), delay what is not (Footer).

**TASKS:**

### 1. 🚀 HERO SECTION (Eager Loading)
- **Target:** `src/components/sections/Hero.jsx` and `HeroBackground.jsx`.
- **Action:**
  - The Main Profile Image and the first 2 background images MUST have:
    `loading="eager"`
    `fetchpriority="high"`
    `decoding="sync"` (or async, but start immediately).
  - This tells the browser: "Download these FIRST, ignore the rest."

### 2. 💤 BELOW THE FOLD (Lazy Loading)
- **Target:** `SkillsView.jsx`, `ProjectCard.jsx`, `VideoVault.jsx`, `Services.jsx`.
- **Action:**
  - **ALL** images in these components MUST have:
    `loading="lazy"`
    `decoding="async"`
  - **Result:** The browser won't touch these files until the user scrolls down. This frees up the CPU for the initial animation.

### 3. 🎬 VIDEO OPTIMIZATION (The Heavyweight)
- **Target:** `VideoVault.jsx` (and any video in Portfolio).
- **Action:**
  - Use `preload="none"` on video tags.
  - **CRITICAL:** Ensure every video has a lightweight `poster="/path/to/image.jpg"` attribute.
  - The browser will only load the tiny image initially. The heavy video file will only start downloading when the user actually interacts or scrolls near it.

### 4. 📦 COMPONENT LAZY LOADING (Code Splitting)
- **Target:** `src/App.jsx`.
- **Action:**
  - Wrap heavy non-critical sections (like `Portfolio` or `Contact`) in `React.lazy` and `Suspense` if they are not immediately visible.
  - *Note:* Since it's a single page scroll, focus mainly on Image/Video lazy loading first.

**OUTPUT:**
Refactor `ProjectCard.jsx`, `Hero.jsx`, and `VideoVault.jsx` to implement strictly prioritized loading attributes.

---

## ✅ IMPLEMENTATION STATUS

| Component | Status | Details |
|-----------|--------|---------|
| Hero Profile Image | ✅ Done | `fetchpriority="high"`, `decoding="sync"` |
| HeroBackground | ✅ Done | All images `loading="lazy"`, `decoding="async"` |
| SkillsView Icons | ✅ Done | `loading="lazy"`, `decoding="async"` |
| ProjectCard Images | ✅ Done | First visible: eager, rest: lazy |
| VideoVault | ✅ Done | `preload="none"`, `poster` attribute added |
