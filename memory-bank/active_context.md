# Active Context

## Current Phase: Phase 14 - Bento Grid Skills & 3D Tilt Effect
Apple-style asymmetrical grid for Skills section with 3D tilt interaction.

## Latest Session Summary (2026-01-04)

### Phase 14: Bento Grid Skills Section (NEW)
- **Complete Redesign**: Replaced progress bar layout with Apple-style Bento Grid.
- **TiltCard Component**: New reusable 3D tilt card with:
  - Mouse-following rotation (`rotateX/Y` with `useSpring`)
  - Glassmorphism background (`bg-white/5 backdrop-blur`)
  - Mouse-following spotlight glow effect
  - Parallax depth (`translateZ(20px)`)
- **12-Column Grid Layout**:
  - Photoshop: 7 cols (largest, primary)
  - After Effects: 5 cols (tall, secondary)
  - Illustrator: 6 cols (tertiary)
  - Premiere Pro: 6 cols (quaternary)
- **Skill Metadata**: Level ("MASTERY", "EXPERT", etc.) + Years ("8+ Years")
- **Header**: Changed from "Core Tools" to "Skills"
- **Custom Glow Colors** (all 35% opacity):
  - Photoshop: `#005AFF` (blue)
  - After Effects: `#1200FF` (indigo)
  - Illustrator: `#FF6B00` (orange)
  - Premiere Pro: `#FF0080` (magenta)

### StackView & Portfolio Data Enhancements
- **5-Image Stack**: StackView now displays **5 images** instead of 3 for richer preview.
- **New Naming Convention**: 
  - Posts: `pst1.webp`, `pst2.webp`, ...
  - Long Posts (3-panel): `pstlng1.webp`, `pstlng2.webp`, ...
  - Stories: `str1.webp`, `str2.webp`, ...
- **Stack Format Modes**:
  - `'post'` - Only posts, 4/5 aspect ratio (default)
  - `'story'` - Only stories, 9/16 vertical aspect ratio
  - `'hybrid'` - Mixed posts + stories, each with own aspect ratio
- **Utility Functions**: `getPostImages()`, `getLongPostImages()`, `getStoryImages()` in `imagePath.js`.
- **getStackImages()** now returns `{ src, type }` objects for hybrid support.

### New Projects Added
- **Adana Napoli**: 2 posts, 1 long post, 5 stories (`stackFormat: 'story'`)
- **Hacı Hakkı Usta**: 2 posts, 2 stories (`stackFormat: 'hybrid'`)

### GridView Enhancements
- **Posts/Stories Sections**: Separate display for long posts, posts, and stories.
- **Smooth Scrolling**: Added momentum-based easing with `requestAnimationFrame`.
- **Long Posts**: Full-width display for 3-panel panoramic images.

### Bug Fixes
- **Google Yorumlar techStack**: Changed from AE/PR to Photoshop/Illustrator.
- **WordPress SVG**: Removed corner white triangles.

## File Structure Update
```
src/
├── components/
│   ├── layout/Header.jsx         # Lang switch, scroll opacity
│   └── ui/
│       ├── SideNav.jsx           # Auto-hiding right nav
│       ├── TiltCard.jsx          # NEW - 3D tilt with spotlight glow
│       └── AtmosphericBackground.jsx # Optimized phase-shifted orbs
├── features/
│   ├── portfolio/
│   │   ├── ProjectCard.jsx       # Hybrid aspect ratio support
│   │   └── GridView.jsx          # Smooth scroll, Posts/Stories sections
│   └── skills/
│       └── SkillsView.jsx        # NEW - Bento Grid with TiltCards
├── utils/
│   └── imagePath.js              # pst/pstlng/str naming, getStackImages with type
└── data/
    └── projects.js               # 4 projects, stackFormat property
```

## Design Decisions
- **Performance**: GPU-accelerated transforms with `will-change` and `transform: translateZ()`.
- **Interactivity**: 3D tilt cards respond to mouse with spring physics.
- **Aesthetics**: Apple-inspired Bento Grid, glassmorphism, distinct brand colors per tool.
- **Hybrid Mode**: Each card renders with its own aspect ratio for mixed content.

## Dev Server
- http://localhost:5173/