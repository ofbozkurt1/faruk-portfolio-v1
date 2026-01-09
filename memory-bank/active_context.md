# Active Context

## Current Phase: Phase 42 - Mobile UX & Interaction Polish
Mobil kullanıcı deneyimi iyileştirmeleri, scroll düzeltmeleri ve etkileşim optimizasyonları.

## Latest Session Summary (2026-01-09)

### Phase 42: Critical Bug Fixes & UX Improvements

**1. Proje Detay Paneli Scroll Düzeltmesi (GridView.jsx)**
- **Sorun:** Mobil ve masaüstünde scroll çalışmıyordu
- **Sebep:** Lenis smooth scroll kütüphanesi scroll eventlerini yakalıyordu
- **Çözüm:** 
  - `data-lenis-prevent="true"` attribute eklendi
  - `onWheel` ve `onTouchMove` stopPropagation eklendi
  - Store'dan `delayedActiveServiceIndex` ile kontrol

**2. Hizmetler Bölümü Hover Gecikmesi (ServicesView.jsx)**
- **Sorun:** Scroll yaparken "01" numarası yanlışlıkla tetikleniyordu
- **Çözüm:** 
  - `activeServiceIndex` = ANINDA (yazı rengi, hareket)
  - `delayedActiveServiceIndex` = 1 SN GECİKME (01 numarası, iconlar, pill tags)
  - `serviceStore.js` güncellendi

**3. Mobil Dil Değişimi Bug Düzeltmesi**
- **Sorun:** İngilizce'ye geçince sayfa kayıyor, dil kendi kendine değişiyordu
- **Çözümler:**
  - `i18n.js`: `navigator` detection kaldırıldı, sadece `localStorage`
  - `WipeTransition.jsx`: Scroll pozisyonu kaydedilip geri yükleniyor
  - `Header.jsx`: Dil değişince önce menü kapanıyor

**4. Otomatik Görsel Algılama (autoImageDetect.js)**
- **Önceki:** `postCount: 7` manuel yazılıyordu
- **Şimdi:** Vite'ın `import.meta.glob` ile otomatik algılama
- Dosya ekleyince (`pst9.webp`) otomatik sayılıyor

**5. Video Showcase Mobil Carousel (VideoVault.jsx)**
- Mobil: Horizontal swipe carousel (Instagram style)
- Masaüstü: Mevcut side-by-side layout korundu
- Kart boyutu: 75vw (büyük, okunabilir)

**6. Video Kartları Hover Animasyonu Kaldırıldı**
- `whileHover={{ scale: 1.02 }}` kaldırıldı
- Artık video üzerine gelindiğinde büyüme efekti yok

**7. Mobil Explore Button Güncellemesi (ProjectCard.jsx)**
- Curved text: "PROJEYİ · İNCELE" formatı
- Ok işareti: SVG ArrowUpRight (düzgün ortalanmış)

---

## Key Files Modified

| Dosya | Değişiklik |
|-------|------------|
| `serviceStore.js` | `delayedActiveServiceIndex` eklendi (1 sn gecikme) |
| `ServiceBackgroundLayer.jsx` | Büyük numara/iconlar delayed state ile |
| `ServicesView.jsx` | Hover logic basitleştirildi |
| `GridView.jsx` | Lenis bypass, scroll düzeltmesi |
| `i18n.js` | Navigator detection kaldırıldı |
| `WipeTransition.jsx` | Scroll pozisyonu koruma |
| `Header.jsx` | Mobil dil değişim sırası düzeltildi |
| `autoImageDetect.js` | YENİ - Otomatik görsel sayımı |
| `projects.js` | withAutoCounts wrapper eklendi |
| `VideoVault.jsx` | Mobil carousel, hover kaldırıldı |
| `ProjectCard.jsx` | Mobil explore button güncellendi |
| `index.css` | scrollbar-hide class eklendi |

---

## Performance Score
- **Before Phase 35:** ~82/100
- **After Phase 35:** ~95+/100
- **Phase 42:** UX & Interaction focus (performance maintained)

## Dev Server
- http://localhost:5173/ veya http://localhost:5174/
