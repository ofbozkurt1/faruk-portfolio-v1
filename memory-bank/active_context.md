# Active Context

## Current Phase: Phase 27 - Internationalization (i18n) & Services Update
Multi-language support (TR/EN) and services section redesign.

## Latest Session Summary (2026-01-06)

### Phase 27: Internationalization (i18n)

#### Kurulum
- `react-i18next`, `i18next`, `i18next-browser-languagedetector` eklendi
- Varsayılan dil: Türkçe (TR)
- Dil tercihi localStorage'da saklanır

#### Dosya Yapısı
```
src/
├── i18n.js                          ← Konfigürasyon
├── main.jsx                         ← i18n import
├── locales/
│   ├── tr/translation.json          ← Türkçe çeviriler
│   └── en/translation.json          ← İngilizce çeviriler
```

#### Çevrilen Bileşenler
| Bileşen | Çevrilen Metinler |
|---------|-------------------|
| Header | Navigation links, Let's Talk, TR/EN butonları |
| Hero | Role, Description, Download CV |
| Skills | Title |
| Services | Title, Subtitle, 4 servis başlık/açıklama |
| Portfolio | Title, "PROJEYİ İNCELE" butonu |
| VideoVault | Title, Subtitle |
| Footer | Headline, Subtitle, Copyright |
| GridView (Case Study) | Tüm label'lar |

#### Dil Butonları
- Sıralama: **TR | EN** (Türkçe önce)
- Aktif: Beyaz, Pasif: Gri

---

### Services Güncellemesi

#### 4 Servis (Yeni İçerik)
| # | Türkçe | English | Renk |
|---|--------|---------|------|
| 01 | Sosyal Medya Tasarımları | Social Media Design | #9333EA (Mor) |
| 02 | Hareketli Tasarımlar | Motion Design | #3B82F6 (Mavi) |
| 03 | Marka Kimliği | Brand Identity | #F97316 (Turuncu) |
| 04 | Video Edit | Video Editing | #EC4899 (Pembe) |

#### ServiceBackgroundLayer Senkronizasyonu
- Renk ve ikon sıralaması ServicesView ile eşleştirildi
- Her servisin hover arka planı doğru renkte

---

## Previous Phases

### Phase 25-26: Case Study Format & Gallery
- GridView Behance tarzı case study formatı
- Logo display, Visual Identity section
- Gallery: 3 post/satır, 4 story/satır, ortalanmış son satır

### Phase 24: Video Vault
- 8 dikey video, 4 kategori
- Alternating layout + lazy loading

---

## Layer Order (z-index)
```
z-index: 99999 │ GridView (Case Study modal)
z-index: 10+   │ Header, SideNav, Content
z-index: 1     │ ServiceBackgroundLayer
z-index: 0     │ PortfolioBackgroundLayer
z-index: -1    │ AtmosphericBackground
```

## Dev Server
- http://localhost:5173/