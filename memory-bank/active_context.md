# Active Context

## Current Phase: Phase 20.1 - Atmospheric Enhancements
Services section complete, atmospheric background refined with color cycling.

## Latest Session Summary (2026-01-05)

### Phase 20.1: Atmospheric Background Enhancements

#### AtmosphericBackground Updates
| Feature | Implementation |
|---------|----------------|
| **Base Background** | Saf siyah (#000000) + üst mor glow |
| **Top Glow** | `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 40, 180, 0.2), transparent 70%)` |
| **Color Cycling** | Mor ↔ Kırmızı cross-fade (20 saniye döngü) |
| **Technique** | 4 katmanlı opacity animasyonu (GPU-friendly) |

#### Cross-Fade Animation
```css
@keyframes fadeInOut {
    0%, 100% { opacity: 0.7; }
    25%, 50% { opacity: 0; }
    75% { opacity: 0.7; }
}
@keyframes fadeOutIn {
    0%, 100% { opacity: 0; }
    25%, 50% { opacity: 0.7; }
    75% { opacity: 0; }
}
```
- Sol üst: Mor → Kırmızı → Mor (20s)
- Sağ alt: Kırmızı → Mor → Kırmızı (20s)
- Smooth geçiş, tak-tak değil

#### ServiceBackgroundLayer Adjustments
- Opacity azaltıldı: 60%/30% → **35%/15%**
- Alan: `-15%` → **`-10%`**
- Daha yumuşak hover efekti

### Phase 20: Services Section (Complete)

#### Components
- `ServicesView.jsx` - Hover-reveal accordion
- `ServiceBackgroundLayer.jsx` - Dynamic backgrounds
- `serviceStore.js` - Zustand global state

#### Services
| Service | Color | Symbol |
|---------|-------|--------|
| Motion Graphics | #9333EA (Mor) | ▶ |
| Brand Identity | #3B82F6 (Mavi) | ◆ |
| UI/UX Animation | #EC4899 (Pembe) | ★ |
| Video Editing | #F97316 (Turuncu) | ● |

#### Features
- Large number watermark (01-04)
- Tool icons on hover
- Glass pill badges
- Grid layout: Title left, Description+Tags right

### Beklemede
- 🏖️ Grain/noise texture (PNG dosyası gerekli)

## Performance Rules
- ✅ Pure CSS animations (no JS intervals)
- ✅ will-change: opacity
- ✅ Cross-fade > gradient animation
- ❌ NO backdrop-filter
- ❌ NO mix-blend-mode

## Dev Server
- http://localhost:5173/