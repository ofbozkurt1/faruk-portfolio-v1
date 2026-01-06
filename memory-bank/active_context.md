# Active Context

## Current Phase: Phase 25 - Case Study Format
Project detail pages transformed into professional case studies.

## Latest Session Summary (2026-01-06)

### Phase 25: Case Study Format
GridView tamamen yeniden tasarlandı - Behance tarzı proje sunumu.

#### Yeni Bileşenler
| Component | Description |
|-----------|-------------|
| `MetaItem` | Client, Services, Year bilgisi |
| `ColorSwatch` | Renk paleti daireleri (hover animasyonlu) |
| `TypographyDisplay` | Font gösterimi (Aa glyph + karakter seti) |
| `ImageCard` | Geliştirilmiş görsel kartları |

#### Case Study Yapısı
```
1. HERO SECTION
   - Category badge (pill style)
   - Brand color başlık
   - Description

2. META GRID (4 kolon)
   - Client | Services | Year | Toolkit

3. VISUAL IDENTITY
   - Color Palette (4 renk + hex + isim)
   - Typography (font + style)

4. GALLERY
   - Enhanced image cards
   - whileInView animasyonları
```

#### Data Güncellemeleri
Her projeye eklenen yeni alanlar:
- `client` - Müşteri adı
- `identity.colors[]` - Renk paleti
- `identity.fontFamily` - Font adı
- `identity.fontStyle` - Font stili

#### Proje Renk Paletleri
| Proje | Ana Renk | Ek Renkler |
|-------|----------|------------|
| Novastra | #9333EA | #1F1B24, #F2F2F2, #C084FC |
| Google Yorumlar | #4285F4 | #34A853, #FBBC05, #EA4335 |
| Adana Napoli | #E53935 | #1A1A1A, #FFFFFF, #FFD54F |
| Hacı Hakkı Usta | #C17F59 | #2D1F1A, #F5E6D3, #8B4513 |
| Akdeniz Etkinlik | #00BCD4 | #FF4081, #1A1A2E, #FFFFFF |
| Tırnak Trend | #EC4899 | #FDF2F8, #1F1F1F, #F472B6 |
| BBS Transfer | #1E88E5 | #0D47A1, #FFFFFF, #90CAF9 |
| Kumrualtı | #F97316 | #7C2D12, #FEF3C7, #1C1917 |

---

## Previous Phases (This Session)

### Phase 24: Video Vault
- 8 dikey video, 4 kategori
- Alternating layout
- Lazy loading + auto-play

### Portfolio Hover Effects
- Dinamik arka plan (firma rengi)
- Başlık + çizgi renk değişimi

---

## Layer Order (z-index)
```
z-index: 99999 │ GridView (Case Study modal)
z-index: 10+   │ Header, SideNav, Content
z-index: 1     │ ServiceBackgroundLayer
z-index: 0     │ PortfolioBackgroundLayer
z-index: -1    │ AtmosphericBackground
```

## Performance Rules
- ✅ whileInView for lazy animations
- ✅ Framer Motion micro-animations
- ✅ GPU-accelerated transforms
- ❌ NO heavy filters

## Dev Server
- http://localhost:5173/