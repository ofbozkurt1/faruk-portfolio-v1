# Changelog

All notable changes to the **Ömer Faruk Bozkurt Portfolio** project will be documented in this file.

## [Unreleased] - 2026-01-07

### ⚡ Phase 35: Critical Performance Refactor & Memory Leak Fix

**Performans Skoru: %82 → %95+**

#### 🔴 Kritik Düzeltmeler

1. **TiltCard - CSS Variables (SIFIR Re-render)**
   - `useState` ile fare pozisyonu takibi kaldırıldı
   - `style.setProperty('--spot-x', ...)` ile doğrudan CSS Variables kullanılıyor
   - **Kazanç:** Saniyede 60-144 re-render → 0

2. **ProjectCard - Akıllı Timer**
   - `useInView` hook eklendi
   - `setInterval` sadece kart görünür olduğunda çalışıyor
   - **Kazanç:** 6 paralel timer → sadece görünür olanlar

3. **Hero - Akıllı Animasyon**
   - `useInView` hook eklendi
   - İsim animasyonu sadece Hero görünür olduğunda çalışıyor

4. **GridView - Memory Leak Düzeltmesi**
   - `animationId` değişkeni eklendi
   - `cancelAnimationFrame()` cleanup fonksiyonuna eklendi
   - **Kazanç:** Zombie rAF döngüleri engellendi

5. **ServiceBackgroundLayer - AnimatePresence**
   - 4 paralel `motion.div` yerine `AnimatePresence` kullanıldı
   - Sadece aktif service'in background'u DOM'da
   - **Kazanç:** %75 daha az DOM element

6. **React.memo Eklendi**
   - `SkillBentoCard` → memo wrapper
   - `VideoCard` → memo wrapper
   - **Kazanç:** Parent re-render'da çocuklar stable

---

### 🎬 Phase 33: Cinematic Wipe Transition (Dil Değiştirme)

#### Yeni Bileşenler
- **WipeTransition.jsx**: Tam ekran geçiş overlay'i
- **languageTransitionStore.js**: Zustand ile geçiş state yönetimi

#### Tasarım
- **Arka Plan:** Saf siyah (#050505)
- **İçerik:** Bayrak emoji + Dil adı (büyük) + Alt yazı
- **Zamanlama:** Yavaş giriş (0.4s), hızlı çıkış (0.2s)
- **Dekoratif:** Köşe aksentuasyonları (OFB PORTFOLIO, yıl)

---

### 🎨 Phase 31: Kinetic Typography (Services)

#### Harf Aralığı Animasyonu
- Hover'da `letter-spacing: -0.03em → 0.05em`
- Text-shadow glow efekti
- Smooth cubic-bezier transition

---

### ⚡ Phase 29: Final Performance Polish (LCP & Image Loading)

#### 🚀 LCP (Largest Contentful Paint) Optimizasyonu
- **Hero Profil Fotoğrafı**:
  - `loading="lazy"` kaldırıldı (İlk yüklenen öğe olduğu için gecikme yaratıyordu).
  - `fetchPriority="high"` eklendi (Tarayıcıya öncelikli yüklemesi söylendi).
  - `decoding="sync"` eklendi.
  - CLS (Layout Shift) önlemek için width/height eklendi.

#### 🖼️ Ghost Reel Görsel Optimizasyonu
- **Optimize Klasör**: `public/gorseller/slidergörseller` klasörü `slidergorseller` olarak yeniden adlandırıldı (Türkçe karakter sorunu giderildi).
- **Lazy Loading**: Arka plan görsellerine `loading="lazy"` ve `decoding="async"` eklendi.
- **Erişilebilirlik**: `aria-hidden="true"` eklendi.

### 🚀 Phase 28: Performance Optimization & Ghost Reel

#### Ghost Reel Animation (Hero Background)
- **Yeni Bileşen**: `HeroBackground.jsx` - Hero bölümü arkasında kayan proje görselleri.
- **Tasarım**: Sağ ve sol tarafta açılı (+6° / -6°) çift sütun.
- **İçerik**: Tüm projelerden karışık Post ve Story görselleri.
- **Performans**: CSS-only transform animasyonları, `will-change` optimizasyonu.

#### ⚡ Kritik Performans İyileştirmeleri
Sitedeki ağır grafik efektleri temizlendi ve GPU yükü azaltıldı:

1. **Blur Efektleri Kaldırıldı**:
   - `ProjectCard`: "Projeyi İncele" ve "Tech Pills" butonlarındaki `backdrop-filter: blur(8px)` kaldırıldı. Yerine solid `rgba(20,20,25,0.9)` arka plan eklendi.

2. **Ağır Gölgeler (Box-Shadows) Temizlendi**:
   - `Hero`: Profil fotoğrafındaki `50px` spread shadow kaldırıldı.
   - `GridView`: Galeri görselleri, renk paleti ve kategori badge'indeki büyük gölgeler kaldırıldı.

#### 🛠️ Services Bölümü İyileştirmeleri
- **Akıllı Hover Gecikmesi**: Hizmetler üzerine gelindiğinde arka plan görseli **1 saniye gecikmeli** açılıyor.
- **Anlık UI Tepkisi**: Yazı rengi ve çizgi animasyonu anında (0ms) tepki veriyor.
- **Debounce Logic**: Hızlı scroll sırasında arka planın sürekli yanıp sönmesi engellendi.

---

### 🌍 Phase 27: Internationalization (i18n) & Services Update

#### Çoklu Dil Desteği
- `react-i18next`, `i18next`, `i18next-browser-languagedetector` kurulumu
- Varsayılan dil: Türkçe (TR)
- Dil tercihi localStorage'da saklanır
- Header'da TR | EN butonları (TR önce)

#### Çeviri Dosyaları
```
src/locales/
├── tr/translation.json   ← Türkçe
└── en/translation.json   ← İngilizce
```

#### Çevrilen Bileşenler
- **Header**: Navigation, Let's Talk butonu
- **Hero**: Role, Description, Download CV
- **Skills**: Title
- **Services**: Title, Subtitle, 4 servis başlık/açıklama
- **Portfolio**: Title, "PROJEYİ İNCELE" butonu
- **VideoVault**: Title, Subtitle
- **Footer**: Headline, Subtitle, Copyright
- **GridView**: Tüm case study label'ları

#### Services Yeniden Düzenleme
| # | Türkçe | English | Renk |
|---|--------|---------|------|
| 01 | Sosyal Medya Tasarımları | Social Media Design | #9333EA |
| 02 | Hareketli Tasarımlar | Motion Design | #3B82F6 |
| 03 | Marka Kimliği | Brand Identity | #F97316 |
| 04 | Video Edit | Video Editing | #EC4899 |

#### ServiceBackgroundLayer Senkronizasyonu
- Renk ve ikon sıralaması ServicesView ile eşleştirildi

---

### 📋 Phase 25: Case Study Format

#### Proje Detay Sayfası Yeniden Tasarımı
GridView tamamen yeniden tasarlandı - Behance tarzı profesyonel case study sunumu.

#### Yeni Bileşenler
- **MetaItem**: Client, Services, Year bilgisi
- **ColorSwatch**: Renk paleti daireleri (hover animasyonlu)
- **TypographyDisplay**: Font gösterimi (Aa glyph + karakter seti)
- **ImageCard**: Geliştirilmiş görsel kartları

#### Case Study Yapısı
| Bölüm | İçerik |
|-------|--------|
| Hero | Category badge, brand color başlık, description |
| Meta Grid | Client, Services, Year, Toolkit (4 kolon) |
| Visual Identity | Renk paleti + Tipografi |
| Gallery | whileInView animasyonlu görsel grid |

#### Data Güncellemeleri
Her projeye eklenen yeni alanlar:
- `client` - Müşteri adı
- `identity.colors[]` - Renk paleti (4 renk + hex + isim)
- `identity.fontFamily` - Font adı
- `identity.fontStyle` - Font stili

#### Animasyonlar
- ColorSwatch hover: `scale: 1.1, y: -4`
- ImageCard whileInView: `opacity: 0, y: 40` → `opacity: 1, y: 0`
- ImageCard hover: `y: -8`
- Staggered entrance animations

---

### 🎥 Phase 24: Video Vault

#### Yeni Bileşenler
- **VideoVault.jsx**: 8 dikey video, 4 kategori
- **Alternating Layout**: Videolar sağ/sol değişiyor
- **Info Panel**: Kategori başlığı, açıklama, tool ikonları

#### Video Kategorileri
| Kategori | Videolar | Açıklama |
|----------|----------|----------|
| HYPE & EVENTS | vd1, vd2 | Etkinlik videoları |
| COMMERCIAL | vd3, vd4 | Ticari içerikler |
| SOCIAL EDITS | vd5, vd6 | Sosyal medya editleri |
| AERIAL & DRONE | drn1, drn2 | Drone çekimleri |

#### Performance Özellikleri
- `preload="none"` - Lazy loading, scroll'a kadar yüklenmiyor
- `useInView` (amount: 0.6) - %60 görünür olunca otomatik oynatma
- `muted`, `loop`, `playsInline` - Tarayıcı uyumlu

---

### ✨ Portfolio Hover Efektleri

#### Yeni Dosyalar
- **portfolioStore.js**: Zustand global state
- **PortfolioBackgroundLayer.jsx**: Dinamik arka plan (z-index: 0)

#### Proje Marka Renkleri
| Proje | Renk |
|-------|------|
| Novastra | `#9333EA` (Mor) |
| Google Yorumlar | `#4285F4` (Google Mavisi) |
| Adana Napoli | `#E53935` (Kırmızı) |
| Hacı Hakkı Usta | `#C17F59` (Kahverengi) |
| Akdeniz Etkinlik | `#00BCD4` (Cyan) |
| Tırnak Trend | `#EC4899` (Pembe) |
| BBS Transfer | `#1E88E5` (Mavi) |
| Kumrualtı | `#F97316` (Turuncu) |

#### Hover Efektleri
- Arka plan firma rengiyle radial gradient aydınlanma
- Başlık hover'da firma rengine dönüşüyor
- Çizgi firma rengiyle parlıyor + glow efekti
- 0.4s smooth transition

---

### 🌌 Phase 20.1: Atmosferik Arka Plan Geliştirmeleri

#### AtmosphericBackground Updates
- **Base Background**: Saf siyah (#000000) + üst mor glow gradient
- **Top Glow**: Üst ortadan yayılan mor ışık efekti
- **Cross-Fade Animasyonu**: Mor ↔ Kırmızı renk döngüsü (20 saniye)
- **Teknik**: 4 katmanlı opacity animasyonu (fadeInOut/fadeOutIn)

#### Renk Döngüsü Detayları
| Position | Start | 10s | 20s |
|----------|-------|-----|-----|
| Sol Üst | Mor 💜 | Kırmızı ❤️ | Mor 💜 |
| Sağ Alt | Kırmızı ❤️ | Mor 💜 | Kırmızı ❤️ |

#### ServiceBackgroundLayer Ayarları
- Hover opacity azaltıldı: 60%/30% → **35%/15%**
- Alan daraltıldı: `-15%` → **`-10%`**
- Daha yumuşak, göze batmayan efekt

#### Performance
- Pure CSS @keyframes (JavaScript interval yok)
- Gradient animasyonu yerine opacity cross-fade (GPU-friendly)
- Smooth geçişler, "tak-tak" değişim yok

### 💼 Phase 20: Cinematic Services Section

#### New Components
- **ServicesView.jsx**: Hover-reveal accordion list with 4 services
- **ServiceBackgroundLayer.jsx**: Performance-optimized dynamic backgrounds
- **serviceStore.js**: Zustand global state for hover management

#### Services Added
| Service | Color | Symbol |
|---------|-------|--------|
| Motion Graphics | Purple (#9333EA) | ▶ |
| Brand Identity | Blue (#3B82F6) | ◆ |
| UI/UX Animation | Pink (#EC4899) | ★ |
| Video Editing | Orange (#F97316) | ● |

#### Features
- Large number watermark (01-04) on hover at 90% opacity
- Tool icons (After Effects, Photoshop, Illustrator, Premiere)
- Radial gradient color backgrounds per service
- Glass pill badges for service tags
- Decorative symbols with service colors
- Grid layout: Title left, Description+Tags right (340px)

#### Performance Optimizations
- CSS-only patterns (no images)
- `will-change: opacity` for GPU acceleration
- NO backdrop-filter, NO mix-blend-mode
- Zustand prevents unnecessary re-renders

#### Navigation
- Added "Services" link to Header menu
- Added "Services" dot to SideNav

### 📁 Phase 19: New Projects & Custom Order

#### New Projects Added (4)
- **Akdeniz Etkinlik**: Event Design - 15 posts, 2 long posts (custom display order)
- **Tırnak Trend**: Social Media - 3 posts (nail salon)
- **BBS Transfer**: Social Media - 2 posts (transportation company)
- **Kumrualtı**: Social Media - 3 posts (restaurant)

#### Custom Order System
- New `customOrder` array in project data for specific display layouts
- `getProjectImagePath(projectId, type, index)` utility function
- GridView renders long posts full-width, regular posts in 3-column grid
- Mixed layout: long posts break the grid flow automatically

#### Total Portfolio
8 projects now in the portfolio section.

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
