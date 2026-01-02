# Technical Context & Architecture Rules
**Version:** 3.0 (Scalable Architecture Edition)
**Framework:** React 18+ (Vite)
**Styling:** Tailwind CSS

## 1. System Architecture & Scalability

### A. Directory Structure (Strict Layout)
To ensure scalability as the project grows, we will adhere to a strict feature-based structure:
```text
src/
├── assets/         # Static assets (icons, SVGs) - NOT project images
├── components/     # Shared UI components
│   ├── ui/         # Dumb components (Buttons, Typography, Marquee)
│   └── layout/     # Structural components (Navbar, Footer, GridWrapper)
├── features/       # Business Logic Modules
│   ├── hero/       # Hero section logic
│   └── portfolio/  # The core "Stack-to-Grid" logic & components
├── data/           # The "Local CMS" (projects.js)
├── hooks/          # Custom React hooks (useScroll, useWindowSize)
├── utils/          # Helper functions (image path generators, formatters)
└── pages/          # Page entry points (Home, NotFound)

```

### B. State Management Strategy

* **Global State:** Minimal. Use React Context only if absolutely necessary for theme/sound.
* **Local State:** Lift state up to the `PortfolioSection` component to manage which Project ID is currently "Active/Expanded".
* **URL Sync:** (Optional Future Proofing) The active project should ideally update the URL hash (e.g., `/#novastra`) to allow deep linking, managed via `useEffect`.

## 2. Component Design & Mechanics

### A. The "Stack" (Passive State)

* **Tech:** `framer-motion`
* **Logic:**
* Must render 3 images absolutely positioned.
* `zIndex`: Controlled by index (3, 2, 1).
* `transform`: Random slight rotation (-3deg to 3deg) to create the "messy pile" look.
* **Constraint:** The parent container must have a fixed aspect ratio to prevent layout shift.



### B. The "Masonry Grid" (Active State)

* **Tech:** CSS Columns (`columns-1 md:columns-3`).
* **Why:** JS-based masonry libraries are too heavy. CSS columns are native and performant.
* **Transition:**
* Use `layoutId` from Framer Motion to connect the "Cover Image" in the stack to the "First Image" in the grid.
* **Critical:** Ensure unique IDs for layout transitions to avoid conflicts between projects.



## 3. Data & Asset Pipeline (The "No-CMS" Engine)

### A. Source of Truth: `src/data/projects.js`

We treat this file as our database.

* **Schema Requirement:**
```javascript
export const PROJECTS = [
  {
    id: "novastra",        // Matches folder name in public/gorseller/
    title: "Novastra",
    category: "Branding",
    year: "2024",
    imageCount: 15,        // TOTAL number of images available
    credits: "Art Direction: Faruk"
  },
  // ...
]

```



### B. Dynamic Image Generation (The Helper)

* **Utility:** Create `src/utils/imagePath.js`.
* **Function:** `getProjectImages(projectId, count)`
* **Logic:** Returns an array of strings: `['/gorseller/novastra/1.webp', ... '/gorseller/novastra/15.webp']`.
* **Safety:** The code must assume images are named sequentially `1.webp`, `2.webp`, etc.

## 4. Performance & Optimization Standards

### A. Image Strategy (Core Web Vitals)

* **Format:** WebP (Strict).
* **Priority Loading:**
* Stack Cover (Image 1): `loading="eager"` + `fetchpriority="high"`.
* Stack Under (Image 2-3): `loading="eager"`.
* Grid Content (Image 4+): `loading="lazy"`.


* **Sizing:** All `img` tags must have CSS `width: 100%; height: auto;` and `display: block`.

### B. Smooth Scrolling

* **Library:** `@studio-freight/lenis`.
* **Implementation:** Initialize in `App.jsx`. Wrap the entire app.
* **Configuration:** `lerp: 0.1` (Soft, luxury feel), `duration: 1.2`.

## 5. Styling Guidelines (Tailwind)

* **Colors:** Extend `tailwind.config.js`:
* `bg-richBlack` (#050505)
* `text-offWhite` (#F2F2F2)


* **Typography:** Use specific utility classes for "Silent Luxury":
* `tracking-tighter` for large headings.
* `tracking-widest` + `uppercase` + `text-xs` for metadata.


* **No Magic Numbers:** Use Tailwind's spacing scale (p-4, m-8) instead of arbitrary pixels (e.g., `margin: 37px`).

```

```