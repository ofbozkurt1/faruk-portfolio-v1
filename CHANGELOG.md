# Changelog

All notable changes to the **Ömer Faruk Bozkurt Portfolio** project will be documented in this file.

## [Unreleased] - 2026-01-04

### 🚀 New Features
- **Header Navigation**:
  - Implemented smooth background fade-in on scroll.
  - Added **Language Switcher (EN | TR)**.
  - Added "Let's Talk" CTA button.
  - **Absolute Centering**: Navigation menu is now perfectly centered regardless of side element widths.
- **Side Navigation (`SideNav`)**:
  - Created a right-side dot indicator for active sections.
  - **Auto-Hide**: Navigation fades out after 2 seconds of inactivity to maintain immersion.
- **Footer**:
  - Redesigned with a large **"LET'S CREATE TOGETHER"** headline.
  - Added a **Pill-shaped Email Button** with "Circle Fill" hover effect and sliding icon animation.
  - Integrated high-contrast social media links.
- **Custom Tech Stack Icons**:
  - Integrated original SVG icons for Adobe Suite (Photoshop, Illustrator, After Effects, Premiere) to replace generic library icons.

### 🎨 UI/UX Improvements (The "Silent Luxury" Update)
- **Cinematic Background**:
  - Implemented `AtmosphericBackground` with static colored orbs (Purple & Crimson).
  - Added **Monochrome Film Grain** (Noise) for texture.
  - Added **Spotlight Vignette** to focus attention on the center content.
  - *Reverted:* Removed the "Dot Grid" pattern for a cleaner look.
- **Portfolio Section**:
  - **Cinematic Rotation**: Project images now auto-rotate every 4 seconds with a slow, smooth **1.5s transition**.
  - **Snappy Interaction**: Hover effects remain fast (**0.25s**) for responsiveness.
  - **Visual Polish**:
    - Increased spacing between image and text (`gap-28`).
    - Constrained container width (`max-w-6xl`) to prevent edge-hugging.
    - Added **"Shine" Animation** to the "Click to explore →" text.
    - Ensured all card layers are fully opaque for a solid look.
- **Hero Section**:
  - Reorganized typography hierarchy (Name > Title > Description).
  - Updated "Download CV" button to a modern **Outline Style** with hover animations.
  - Social icons now reveal brand colors on hover.

### ⚡ Performance
- **GPU Acceleration**:
  - Utilized `transform: translateZ(0)` and `will-change` properties in `index.css` for smooth animations.
- **Optimized Transitions**:
  - Switched from animating `background-property` to `opacity` for the Header to reduce layout thrashing.
- **Static Backgrounds**:
  - Kept background elements static (non-animating) to preserve frame rates while scrolling.

### 🐛 Fixes
- **Visual Clutter**: Removed the experimental "Dot Grid" pattern from the background.
- **Opacity Bug**: Fixed an issue where background portfolio cards were transparent/ghostly.
- **Layout Alignment**: Fixed navigation menu alignment issues by using absolute positioning.

---

## 🗺 Roadmap

### Upcoming Features
- [ ] **Mobile Menu**: Full-screen hamburger menu for mobile devices.
- [ ] **Project Details**: Modal or separate page for in-depth project views (Case Studies).
- [ ] **About Me**: A dedicated section with more personal storytelling and timeline.
- [ ] **SEO**: Comprehensive meta tags and OpenGraph image generation.
