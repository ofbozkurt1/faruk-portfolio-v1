# Active Context

## Current Phase: Phase 19 - New Projects & Custom Order
Added 4 new projects and custom display order support.

## Latest Session Summary (2026-01-05)

### New Projects Added (4 Total)

#### 1. Akdeniz Etkinlik
- **Category:** Event Design
- **Posts:** 15 + 2 Long Posts
- **Special:** Custom display order with `customOrder` array
- **Layout:** pstlng1 → pst1-3 → pstlng2 → pst4-6 → remaining

#### 2. Tırnak Trend
- **Category:** Social Media
- **Posts:** 3
- **Description:** Nail salon social media content

#### 3. BBS Transfer
- **Category:** Social Media
- **Posts:** 2
- **Description:** Transportation company social media

#### 4. Kumrualtı
- **Category:** Social Media
- **Posts:** 3
- **Description:** Restaurant social media content

### Total Projects: 8
1. Novastra (Branding) - 7 posts, 11 stories
2. Google Yorumlar (Social Media) - 11 posts
3. Adana Napoli (Social Media) - 2 posts, 1 long, 5 stories
4. Hacı Hakkı Usta (Social Media) - 2 posts, 2 stories
5. Akdeniz Etkinlik (Event Design) - 15 posts, 2 long ✨
6. Tırnak Trend (Social Media) - 3 posts ✨
7. BBS Transfer (Social Media) - 2 posts ✨
8. Kumrualtı (Social Media) - 3 posts ✨

### New Features

#### Custom Order System (`customOrder`)
Projects can now define a specific display order for GridView:
```javascript
customOrder: [
    { type: 'longPost', index: 1 },
    { type: 'post', index: 1 },
    { type: 'post', index: 2 },
    // ...
]
```
- Long posts render full-width
- Regular posts render in 3-column grid
- Mixed layout: long posts break the grid flow

#### New Utility Function
`getProjectImagePath(projectId, type, index)` - Dynamic path generator by image type

### File Changes
```
src/data/projects.js               # 4 new projects, customOrder support
src/utils/imagePath.js             # getProjectImagePath() function
src/features/portfolio/GridView.jsx  # customOrder rendering logic
```

### Previous Session (Same Day)

#### Phase 18: Performance Refactor
- TiltCard: Removed backdrop-blur
- Hero: Removed letter blur, CSS float animation
- Header: Throttled scroll handler
- AtmosphericBackground: 2 orbs instead of 4

#### Phase 15: UI Polish
- ProjectCard "Spec Sheet" design
- Gradient titles, metadata grid
- Glassmorphic tech pills
- Simplified section headers

## Dev Server
- http://localhost:5173/