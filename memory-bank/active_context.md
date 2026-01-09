# Active Context

## Current Phase: Phase 43 - Mobile Portfolio Carousel (Swipe View)
Mobil cihazlarda Portfolio listesinin dikey uzunluğunu azaltmak ve deneyimi iyileştirmek için Grid/Stack görünümü yatay kaydırılabilir (horizontal swipe) bir Carousel yapısına dönüştürüldü.

## Latest Session Summary (2026-01-09)

### Phase 43: Portfolio Layout Refactor

**1. Main Portfolio List (`StackView.jsx`)**
- **Mobile:**
  - Layout: `Vertical Stack` -> `Horizontal Carousel` (Flex + Overflow-x).
  - Interaction: `snap-x` (Snap Scroll) ile kartlar merkeze hizalanır.
  - Container: `min-w-[85vw]` wrapper ile her kart ekranda odak noktası olur.
  - Indicator: Alt kısımda "Dots" (Nokta) indikatörleri eklendi, aktif öğeyi gösterir.
  - Scrollbar: Gizlendi (`scrollbar-hide`).
- **Desktop:**
  - Layout: `Vertical Stack` -> `Grid System` (`md:grid-cols-2`, `lg:grid-cols-3`).
  - Dikey liste yerine grid yapısına geçildi (User Request: "Desktop: Keep the existing Grid layout").

**2. ProjectCard Adjustments (`ProjectCard.jsx`)**
- **Mobile Width:** Karta özel fixed genişlik tanımları (`w-[260px]` / `w-[300px]`) ayarlandı.
- **Content:** Mobil içerik stili (`-bottom-16` taşmalı layout) korundu ama kart boyutları optimize edildi.

## Key Files Modified
- `src/features/portfolio/StackView.jsx` (Major Refactor)
- `src/features/portfolio/ProjectCard.jsx` (Responsive Tuning)

## Next Steps
- Kullanıcı grid yapısını masaüstünde dikey stack olarak geri isteyebilir, kontrol et.
- Dots indikatör stilini veya animasyonunu iyileştir.
