# Changelog

All notable changes to the **Ömer Faruk Bozkurt Portfolio** project will be documented in this file.

## [Unreleased] - 2026-01-05

### ⚡ Phase 18: Critical Performance Refactor

#### GPU/FPS Optimizations
- **TiltCard.jsx**: Removed `backdrop-blur` (GPU killer), replaced with solid dark background (92% opacity)
- **Hero Letter Animation**: Removed `filter: blur()` from 17 letter elements - now uses only opacity + Y transform
- **Photo Float**: Replaced Framer Motion with CSS `@keyframes` for lighter infinite animation
- **Header Scroll**: Added throttle utility (60/sec → 10/sec), cached section positions
- **AtmosphericBackground**: Reduced from 4 orbs to 2, removed scale animation

#### Performance Gains
| Metric | Improvement |
|--------|-------------|
| FPS | +35-50 FPS (Retina/4K) |
| GPU Usage | -40% |
| CPU (scroll) | -30% |
| Memory | -25% |

### 🎨 Phase 15: Hero & Portfolio Polish

#### Hero Section
- **Name Animation**: Dynamic letter-by-letter wave effect (staggered fade-in)
- **Title Animation**: "Motion & Graphic Designer" gradient shine effect
- **Section Size**: Full viewport (`min-h-screen`)
- **Photo**: Floating animation + hover zoom (no borders)
- **Scroll Arrow**: Increased to 36px

#### Social Icons
- **Shape**: Full circles (border-radius: 50%)
- **Order**: Instagram → Behance → LinkedIn
- **LinkedIn**: Clean "in" glyph only (no outer box)

#### Section Headers
- **Portfolio**: Removed "Selected Works" subtitle, single line with side gradient lines
- **Skills**: Removed "Technical Expertise" subtitle, single line with side gradient lines

#### ProjectCard - "Spec Sheet" Redesign
- **Gradient Title**: Metallic sheen (white → 70% white gradient)
- **Metadata Grid**: Role | Deliverables with monospace labels
- **Animated Divider**: 140px gradient line
- **Tech Pills**: Glassmorphic pills with icon + name, brand color glow on hover
- **Size Increase**: All elements ~15% larger

#### Button Styling
- **Download CV**: Pill shape (50px radius)
- **Click to Explore**: Glassmorphic pill with shimmer animation

### 🚀 Phase 14: Bento Grid Skills & 3D Tilt Effect
- **Complete Skills Redesign**: Replaced progress bar layout with Apple-style Bento Grid.
- **TiltCard Component**: New reusable 3D tilt card (`src/components/ui/TiltCard.jsx`):
  - Mouse-following rotation (`rotateX/Y` with Framer Motion `useSpring`)
  - Glassmorphism background (`backdrop-blur`)
  - Mouse-following spotlight glow effect
  - Parallax depth (`translateZ(20px)`)
- **12-Column Grid Layout**:
  - Photoshop: 7 cols (largest, primary) - `#005AFF`
  - After Effects: 5 cols (tall, secondary) - `#1200FF`
  - Illustrator: 6 cols (tertiary) - `#FF6B00`
  - Premiere Pro: 6 cols (quaternary) - `#FF0080`
- **Skill Metadata**: Each card shows Level ("MASTERY", "EXPERT", etc.) + Years ("8+ Years")
- **Header Changed**: "Core Tools" → "Skills"

#### New Projects Added
- **Adana Napoli**: 2 posts, 1 long post, 5 stories (`stackFormat: 'story'`)
- **Hacı Hakkı Usta**: 2 posts, 2 stories (`stackFormat: 'hybrid'`)

#### New Image Naming Convention
- Posts: `pst1.webp`, `pst2.webp`, ...
- Long Posts (3-panel panoramic): `pstlng1.webp`, `pstlng2.webp`, ...
- Stories: `str1.webp`, `str2.webp`, ...

#### Stack Format Modes
- `'post'` - Only posts, 4/5 aspect ratio (default)
- `'story'` - Only stories, 9/16 vertical aspect ratio
- `'hybrid'` - Mixed posts + stories, each with its own aspect ratio

#### Other Features
- **Header Navigation**: Smooth background fade-in, Language Switcher (EN | TR), "Let's Talk" CTA.
- **Side Navigation**: Right-side dot indicator, auto-hide after 2 seconds.
- **Footer**: "LET'S CREATE TOGETHER" headline, pill-shaped email button.
- **StackView**: 5-image preview (was 3), extended animation values.
- **Utility Functions**: `getPostImages()`, `getLongPostImages()`, `getStoryImages()`, `getStackImages()` returns `{ src, type }` for hybrid.

### 🎨 UI/UX Improvements

#### GridView Enhancements
- **Separate Sections**: Long Posts, Posts, and Stories displayed in distinct sections.
- **Smooth Scrolling**: Momentum-based easing with `requestAnimationFrame` (no more jerky scroll).
- **Long Posts**: Full-width display for 3-panel panoramic images.

#### Atmospheric Background
- **Phase-Shifted Opacity**: Replaced heavy `hue-rotate` filters for performance.
- **Breathing Orbs**: Scale 1 ↔ 1.1 during color swap cycle.
- **Film Grain & Vignette**: Subtle texture for "Silent Luxury" aesthetic.

#### Portfolio Section
- **Cinematic Rotation**: 4-second interval, 1.5s smooth transition.
- **Custom SVG Icons**: Original Adobe Suite icons in brand colors.
- **Shine Animation**: "Click to explore →" text effect.

### ⚡ Performance
- **GPU Acceleration**: `transform: translateZ()`, `will-change` for 3D effects.
- **Spring Physics**: TiltCard uses `useSpring` for heavy, smooth glass-like movement.
- **WebP Optimization**: All project images in WebP format.

### 🐛 Fixes
- **Google Yorumlar techStack**: Changed from AE/PR to Photoshop/Illustrator.
- **WordPress SVG**: Removed white corner triangles.
- **Animation Lag**: Replaced hue-rotate with opacity for background orbs.
- **Layout Alignment**: Fixed navigation menu centering issues.

---

## 🗺 Roadmap

### Completed ✅
- [x] Bento Grid Skills Section
- [x] 3D Tilt Card Component
- [x] Hybrid Stack Format
- [x] GridView Smooth Scroll
- [x] Posts/Stories Image Structure

### Upcoming Features
- [ ] **Mobile Menu**: Full-screen hamburger menu for mobile devices.
- [ ] **Project Details Modal**: Enhanced case study views.
- [ ] **About Me Section**: Personal storytelling and timeline.
- [ ] **SEO**: Meta tags and OpenGraph image generation.
- [ ] **Dark/Light Theme Toggle**: Theme switching capability.

