# Active Context

## Current Phase: Phase 24 - Video Vault & Portfolio Enhancements
Video showcase section complete, portfolio hover effects added.

## Latest Session Summary (2026-01-05)

### Phase 24: Video Vault
Dikey video showcase bölümü oluşturuldu.

#### New Files
| File | Description |
|------|-------------|
| `src/features/videos/VideoVault.jsx` | 8 video, 4 kategori |
| `src/features/videos/index.js` | Module export |

#### Video Categories
| Category | Videos | Description |
|----------|--------|-------------|
| HYPE & EVENTS | vd1, vd2 | Etkinlik videoları |
| COMMERCIAL | vd3, vd4 | Ticari içerikler |
| SOCIAL EDITS | vd5, vd6 | Sosyal medya editleri |
| AERIAL & DRONE | drn1, drn2 | Drone çekimleri |

#### Performance Features
- `preload="none"` - Lazy loading
- `useInView` (amount: 0.6) - Otomatik oynatma
- `muted`, `loop`, `playsInline` - Tarayıcı uyumlu

#### Layout
- Alternating left/right layout
- Info panel centered in empty space
- Tool icons with hover effects

---

### Portfolio Hover Effects
Firma renkleriyle dinamik arka plan efektleri.

#### New Files
| File | Description |
|------|-------------|
| `src/stores/portfolioStore.js` | Zustand global state |
| `src/components/ui/PortfolioBackgroundLayer.jsx` | Dinamik arka plan |

#### Project Brand Colors
| Project | Color |
|---------|-------|
| Novastra | `#9333EA` (Mor) |
| Google Yorumlar | `#4285F4` (Google Mavisi) |
| Adana Napoli | `#E53935` (Kırmızı) |
| Hacı Hakkı Usta | `#C17F59` (Kahverengi) |
| Akdeniz Etkinlik | `#00BCD4` (Cyan) |
| Tırnak Trend | `#EC4899` (Pembe) |
| BBS Transfer | `#1E88E5` (Mavi) |
| Kumrualtı | `#F97316` (Turuncu) |

#### Hover Effects
- ✅ Arka plan firma rengiyle aydınlanıyor (z-index: 0)
- ✅ Başlık hover'da firma rengine dönüşüyor
- ✅ Çizgi firma rengiyle parlıyor + glow efekti
- ✅ 0.4s smooth geçiş

---

## Layer Order (z-index)
```
z-index: 10+  │ Header, SideNav, Content
z-index: 1    │ ServiceBackgroundLayer
z-index: 0    │ PortfolioBackgroundLayer ← ARKADA
z-index: -1   │ AtmosphericBackground
```

## Performance Rules
- ✅ Pure CSS animations (no JS intervals)
- ✅ will-change: opacity
- ✅ Zustand prevents re-renders
- ❌ NO backdrop-filter
- ❌ NO mix-blend-mode

## Dev Server
- http://localhost:5173/