# Project Brief: Faruk's Portfolio (The "Silent Luxury" Constitution)
**Version:** 3.0 (Ultimate Architect Edition)
**Role:** Senior Motion & Graphic Designer
**Philosophy:** "Silent Luxury" — Atmospheric, weightless, cinematic, gallery-like.

## 1. Visual Design System (Strict Rules)

### A. Color & Texture
-   **Surface:** `#050505` (Rich Black). **Never** use pure `#000000`.
-   **Typography:**
    -   Primary: `#F2F2F2` (Off-White) — For Headings.
    -   Secondary: `#888888` (Neutral Gray) — For metadata/descriptions.
    -   Accent: `#333333` (Dark Gray) — For delicate borders/dividers.
-   **Texture:** Subtle **Noise Overlay** (Grain) over the entire screen (fixed position, low opacity) to kill the digital flatness.

### B. Typography & Spacing
-   **Font Strategy:** A premium Sans-Serif (e.g., Inter, Geist, or Manrope).
    -   *Headings:* Tight tracking (-2% or -0.02em).
    -   *Body/Meta:* Wide tracking (+0.05em) and small size (uppercase style) for a "technical" look.
-   **Whitespace Strategy:**
    -   **Macro Spacing:** Sections must be separated by at least `20vh` (20% of viewport height). No cramped layouts.
    -   **Margins:** Generous screen edges (minimum 5% padding on sides).

### C. UI Elements
-   **Borders:** Ultra-thin (1px), low contrast borders using opacity (e.g., `white/10`).
-   **Buttons:** No solid background buttons. Use Text Links with underline animations or ghost buttons with thin borders.

## 2. User Experience (UX) Flow

### A. Global Elements
-   **Navigation:** Minimal fixed header. Just "Name" (Left) and maybe "Contact" (Right). Mix-blend-mode: difference (to be visible over images).
-   **Cursor:** (Optional) A custom circular cursor that scales up when hovering over clickable elements (Magnetic effect).

### B. Hero Section
-   **Composition:** Asymmetric split.
    -   **Right:** Large, cinematic portrait (`ben.webp`) — Desaturated or highly stylized.
    -   **Left:** Name + Title + A very brief "One-liner" value proposition.
-   **Entrance:** Staggered fade-up animation. Text appears line by line.

### C. The Projects (Core Mechanic: Stack-to-Grid)
This is the "Showstopper" feature.
1.  **Idle State (The Stack):**
    -   Project appears as a distinct "Group".
    -   3 Images stacked. Random rotation range: -3deg to +3deg (Organic look).
    -   Scale: 0.9 (Slightly smaller).
    -   Hover: Cards fan out slightly.
2.  **Active State (The Grid):**
    -   **Trigger:** User clicks anywhere on the stack.
    -   **Transition:** `layoutId` (Framer Motion) magic. The stack *physically* explodes into a neat grid.
    -   **Background:** The rest of the site fades out/dims to focus solely on this project.
    -   **Layout:** **Masonry Grid**.
        -   **Logic:** Respects aspect ratios.
        -   **Gap:** 16px or 24px (Clean gaps).
        -   **Close Action:** A clear "X" button or clicking outside closes the grid (Stack reforms).

## 3. Motion Guidelines (Physics)
"Silent Luxury" moves slowly and smoothly. No bouncy, cartoonish animations.
-   **Transition Type:** `spring`
-   **Settings:**
    -   `stiffness`: 100 (Soft)
    -   `damping`: 20 (No wobble, just smooth landing)
    -   `mass`: 1.2 (Feels heavy/premium)
-   **Scroll:** Lenis Scroll must be active for buttery smooth scrolling.

## 4. Technical Architecture

### A. Data Structure (Local API)
-   **File:** `src/data/projects.js`
-   **Schema:**
    ```javascript
    {
      id: "novastra",
      title: "Novastra",
      category: "Social Media / Branding",
      imageCount: 15, // Code generates paths 1.webp to 15.webp automatically
      description: "Description text..."
    }
    ```

### B. Asset Logic
-   **Path:** `/public/gorseller/{id}/{n}.webp`
-   **Optimization:**
    -   Images > 2000px must be CSS-constrained (`max-w-full`).
    -   Lazy loading relies on `framer-motion` viewport detection or native `loading="lazy"`.

### C. Mobile Responsiveness
-   **Stack:** On mobile, stacks are vertical lists or horizontal swipers.
-   **Grid:** Collapses to 1 column.
-   **Touch:** All tap targets must be >44px.