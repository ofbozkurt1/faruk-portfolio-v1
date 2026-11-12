import { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { usePrefersReducedMotion } from '../../hooks'
import { withCloudinaryImageTransform } from '../../utils/cloudinaryImage'

// 1. Sol Üst 1: Görsel Proje (2000x2500 - 4:5)
const VISUAL_PROJECT_POOL_1 = [
    {
        title: 'Novastra — Dijital Kimlik',
        tag: 'Sosyal Medya Grid',
        type: 'image',
        src: 'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292523/pst1_sa7lh7.webp',
    },
    {
        title: 'Google Yorumlar — Kampanya',
        tag: 'Reklam Tasarımı',
        type: 'image',
        src: 'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291445/pst5_lw5ydh.webp',
    },
    {
        title: 'VivaCar — Otomotiv Görseli',
        tag: 'Kurumsal İletişim',
        type: 'image',
        src: 'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292574/pst2_wq83u5.webp',
    },
]

// 2. Sol Üst 2: Reklam Kreatifleri (2000x2500 - 4:5)
const AD_CREATIVE_POOL_1 = [
    {
        title: 'AURA — Premium Kulaklık',
        tag: 'E-Ticaret Reklamı',
        type: 'image',
        src: 'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292818/pst4_pjuvxa.webp',
    },
    {
        title: 'Velor — Lüks Saat Kampanyası',
        tag: 'Lüks Reklam Kreatifi',
        type: 'image',
        src: 'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292794/pst1_ixpcec.webp',
    },
    {
        title: 'Lynxa Skin — Cilt Bakım',
        tag: 'Kozmetik Kampanyası',
        type: 'image',
        src: 'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292806/pst3_rejap7.webp',
    },
    {
        title: 'Rox Hair — Profesyonel Seri',
        tag: 'Performans Kreatifi',
        type: 'image',
        src: 'https://res.cloudinary.com/dncvyujpl/image/upload/v1782294253/pst1_aogkqj.webp',
    },
]

// 3. Sağ Üst 1: Dikey Video Edit (1080x1920 — 9:16)
const VERTICAL_VIDEO_EDIT_POOL = [
    {
        title: 'Video Edit 01',
        tag: 'Dinamik Kurgu & Ritim',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450220/Video-Edit-1_lk21eh.webm',
    },
    {
        title: 'Video Edit 02',
        tag: 'Pacing & Color Grading',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450241/Video-Edit-2_mvq6ha.webm',
    },
    {
        title: 'Video Edit 03',
        tag: 'Sosyal Medya Reels',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450178/Video-Edit-3_fpd3cf.webm',
    },
    {
        title: 'Video Edit 04',
        tag: 'Ticari & Tanıtım Kurgusu',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450213/Video-Edit-4_lpvq8x.webm',
    },
]

// 4. Sağ Üst 2: Dik Motion Afiş (1080x1920 — 9:16)
const VERTICAL_MOTION_POOL = [
    {
        title: 'Fever Party — Gece Kulübü',
        tag: 'Hareketli Afiş',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1786795456/Fever_Party_Afi%C5%9F_son_0908_kc5ewv.webm',
    },
    {
        title: 'White Party — Sinematik Afiş',
        tag: 'Festival Key Visual',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1787091869/White_Party_Son_01_Webm_uq3ykr.webm',
    },
    {
        title: 'Yener Çevik — Canlı Konser Afişi',
        tag: 'Turne Afiş Tasarımı',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782292911/Yener-Cevik_cloud_eulj7c.webm',
    },
    {
        title: 'DJ Aykut — Event Visual',
        tag: 'Audio Reactive Motion',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782292990/Aykut_ara3dt.webm',
    },
]

// 5. Sol Alt 1: Yeni Dikey Slot (1080x1920 — 9:16)
const NEW_VERTICAL_SLOT_POOL = [
    {
        title: 'Özel Dikey Proje',
        tag: 'Konsept Reel',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293132/EXPORT_04_Efendy_Medya_%C4%B0%C3%A7erik_1-mp4_1_1080p_60fps_vp9_2mbps_cggkvj.webm',
    },
    {
        title: 'Zeyland — Dikey Tanıtım',
        tag: 'Sosyal Video',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293143/EXPORT_19_Zeylandrealty_Video_2-mp4_1_1080p_60fps_vp9_2mbps_bjcria.webm',
    },
    {
        title: 'Ala 8 Mayıs — Alternatif Kesim',
        tag: 'Video Edit',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293072/EXPORT_01_Ala_8_May%C4%B1s_Video-mp4_1_1080p_60fps_vp9_2mbps_gyvsug.webm',
    },
]

// 6. Sol Alt 2: Hareketli Grafikler (1080x1920 — 9:16)
const MOTION_GRAPHICS_POOL = [
    {
        title: 'Moonla — Tanıtım Videosu',
        tag: '2D & 3D Animasyon',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450374/Moonla_1080_1_mv6j2b.webm',
    },
    {
        title: 'Maprix — Rank Tracker',
        tag: 'SaaS Motion Design',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450422/Maprix_Rank_Tracker_Video_4K_4_wte1l2.webm',
    },
    {
        title: 'Kinetik Tipografi & UI',
        tag: 'Hareketli Grafik',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450374/2_h4vhjm.webm',
    },
    {
        title: 'Dinamik Arayüz Tanıtımı',
        tag: 'UI / UX Motion',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450362/q3_1_fflfyh.webm',
    },
    {
        title: 'Maprix — Yorum Stüdyosu',
        tag: 'Ürün Animasyonu',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450404/Maprix_Yorum_St%C3%BCdyosu_Video_F1_4K_1_sci5wo.webm',
    },
    {
        title: 'Dinamik Geçiş & Efektler',
        tag: 'Motion Graphics',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450365/3_u5m6nb.webm',
    },
    {
        title: 'Logo & Marka Hareketi',
        tag: 'Brand Motion',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450367/1_afikf7.webm',
    },
    {
        title: 'Maprix — Profil Analizi',
        tag: 'Veri Görselleştirme',
        type: 'video',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450393/Maprix_Profil_Analizi_Video_F1_4K_1_jdg4tm.webm',
    },
]

// 7. Sağ Alt 1: Sosyal Medya Gönderileri (2000x2500 - 4:5)
const SOCIAL_POST_POOL = [
    {
        title: 'Adana Napoli — Gurme Lezzet',
        tag: 'Gastronomi Serisi',
        type: 'image',
        src: 'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291202/pst1_hhyxbb.webp',
    },
    {
        title: 'Hacı Hakkı Usta — Kebap Sanatı',
        tag: 'Restoran Kimliği',
        type: 'image',
        src: 'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291136/pst1_jzm9gt.webp',
    },
    {
        title: 'Luna Mobilya — Modern Mekan',
        tag: 'Katalog & Post',
        type: 'image',
        src: 'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291496/pst4_wy0ccn.webp',
    },
]

/**
 * Sade, Kutusuz & Premium Mozaik Kartı
 */
const MosaicCard = memo(function MosaicCard({
    categoryName,
    items,
    interval = 5000,
    initialDelay = 0,
    targetSection = '#portfolio',
    className = '',
}) {
    const [index, setIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const prefersReducedMotion = usePrefersReducedMotion()
    const timerRef = useRef(null)

    useEffect(() => {
        if (prefersReducedMotion || isHovered || items.length <= 1) {
            return undefined
        }

        const initialTimeout = setTimeout(() => {
            timerRef.current = setInterval(() => {
                setIndex((prev) => (prev + 1) % items.length)
            }, interval)
        }, initialDelay)

        return () => {
            clearTimeout(initialTimeout)
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [interval, initialDelay, isHovered, items.length, prefersReducedMotion])

    const currentItem = items[index] || items[0]

    const handleClick = () => {
        const target = document.querySelector(targetSection)
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const optimizedSrc =
        currentItem.type === 'image'
            ? withCloudinaryImageTransform(currentItem.src, {
                  width: 1000,
                  crop: 'limit',
                  quality: 'auto',
                  format: 'auto',
              })
            : currentItem.src

    return (
        <div
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative w-full h-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0c0c] cursor-pointer transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] ${className}`}
        >
            {/* Medya Katmanı (Crossfade) */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={`${categoryName}-${index}`}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute inset-0 w-full h-full"
                >
                    {currentItem.type === 'video' ? (
                        <video
                            src={optimizedSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    ) : (
                        <img
                            src={optimizedSrc}
                            alt={currentItem.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Yumuşak Lüks Karartma */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

            {/* Sade Alt Bilgi Alanı */}
            <div className="absolute bottom-3 left-3 right-3 pointer-events-none z-10 flex items-end justify-between gap-2">
                <div className="space-y-0.5 max-w-[85%]">
                    <p className="text-[9px] font-mono uppercase tracking-widest text-white/50">
                        {currentItem.tag}
                    </p>
                    <h4 className="text-xs sm:text-sm font-semibold text-white/95 tracking-tight line-clamp-1 group-hover:text-white transition-colors">
                        {currentItem.title}
                    </h4>
                </div>

                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/20 transition-all flex-shrink-0">
                    <span className="text-[10px]">↗</span>
                </div>
            </div>
        </div>
    )
})

/**
 * Dönen Yazılı & Çapraz Ok Tasarımlı Menü & Keşif Kartı (Sağ Alt)
 */
const MENU_CATEGORIES = [
    { num: '01', label: 'Motion Afişler', tag: '9:16 Afiş', target: '#motion-showcase' },
    { num: '02', label: 'Dikey Video Edit', tag: 'Reels & Kurgu', target: '#videos' },
    { num: '03', label: 'Reklam Kreatifleri', tag: 'E-Ticaret', target: '#ecommerce' },
    { num: '04', label: 'Sosyal Medya Grid', tag: 'Post & Katalog', target: '#portfolio-stack' },
]

const RotatingBadgeMenuCard = memo(function RotatingBadgeMenuCard() {
    const handleJump = (selector) => {
        const target = document.querySelector(selector)
        if (target) target.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="relative w-full h-full overflow-hidden rounded-xl border border-white/[0.07] bg-[#070709] p-3 sm:p-4 flex flex-col justify-between transition-all duration-500 hover:border-white/20 group">
            {/* 1. Üst Bar: Başlık & Yıl */}
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.05] relative z-10">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/60">
                    Keşif & Menü
                </span>
                <span className="text-[9px] font-mono text-white/35 tracking-wider">
                    2026
                </span>
            </div>

            {/* 2. Ana Hero Keşif Kartı: Dönen Rozet & Çapraz Ok */}
            <div
                onClick={() => handleJump('#portfolio-stack')}
                className="group/cta relative z-10 overflow-hidden rounded-lg p-2.5 sm:p-3 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/20 cursor-pointer transition-all duration-300"
            >
                <div className="flex items-center justify-between gap-2.5">
                    <div className="space-y-1 min-w-0">
                        <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-white/40 block">
                            HIZLI KEŞİF
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5 truncate">
                            Tüm Galeriyi Gör
                            <span className="text-white/40 group-hover/cta:text-white transition-colors">→</span>
                        </h4>
                        <p className="text-[9px] sm:text-[10px] text-white/45 font-mono truncate">
                            100+ Seçili Proje
                        </p>
                    </div>

                    {/* Dönen Dairesel Yazı ve Ortada Çapraz Aşağı Bakan Ok (↘) */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <path
                                    id="circleTextPath"
                                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                                    fill="none"
                                />
                                <text className="text-[9px] font-mono tracking-[0.25em] uppercase fill-white/50 group-hover/cta:fill-white/80 transition-colors">
                                    <textPath href="#circleTextPath" startOffset="0%">
                                        • PROJELERİ İNCELE • TÜM İŞLER
                                    </textPath>
                                </text>
                            </svg>
                        </motion.div>

                        {/* Merkezdeki Çapraz Aşağı Bakan Ok (↘) */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center transition-all duration-300 group-hover/cta:scale-110 group-hover/cta:bg-white group-hover/cta:border-white shadow-sm">
                            <svg
                                className="w-3.5 h-3.5 text-white group-hover/cta:text-black transition-colors"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 19L5 5m14 14V9m0 10H9"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Hızlı İstatistikler / Kapsam Çubuğu */}
            <div className="grid grid-cols-3 gap-1.5 relative z-10">
                <div className="px-2 py-1.5 rounded-lg bg-white/[0.015] border border-white/[0.04] text-center">
                    <span className="block text-[11px] sm:text-xs font-mono font-bold text-white/90">100+</span>
                    <span className="block text-[7px] sm:text-[8px] font-mono text-white/40 uppercase tracking-wider">Proje</span>
                </div>
                <div className="px-2 py-1.5 rounded-lg bg-white/[0.015] border border-white/[0.04] text-center">
                    <span className="block text-[11px] sm:text-xs font-mono font-bold text-white/90">40+</span>
                    <span className="block text-[7px] sm:text-[8px] font-mono text-white/40 uppercase tracking-wider">Müşteri</span>
                </div>
                <div className="px-2 py-1.5 rounded-lg bg-white/[0.015] border border-white/[0.04] text-center">
                    <span className="block text-[11px] sm:text-xs font-mono font-bold text-white/90">04</span>
                    <span className="block text-[7px] sm:text-[8px] font-mono text-white/40 uppercase tracking-wider">Kategori</span>
                </div>
            </div>

            {/* 4. Alt Kısım: Zengin Kategori Yönlendirmeleri (Çizgisiz) */}
            <div className="space-y-1 relative z-10 pt-0.5">
                {MENU_CATEGORIES.map((cat) => (
                    <button
                        key={cat.num}
                        onClick={() => handleJump(cat.target)}
                        className="group/item w-full px-2.5 py-1.5 rounded-lg bg-white/[0.015] hover:bg-white/[0.06] border border-white/[0.03] hover:border-white/15 flex items-center justify-between transition-all duration-300"
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[9px] font-mono text-white/30 group-hover/item:text-white/60 transition-colors">
                                {cat.num}
                            </span>
                            <span className="text-[11px] sm:text-xs font-medium text-white/80 group-hover/item:text-white tracking-tight truncate transition-colors">
                                {cat.label}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="text-[8px] font-mono text-white/35 group-hover/item:text-white/60 uppercase tracking-wider hidden sm:inline transition-colors">
                                {cat.tag}
                            </span>
                            <span className="text-[10px] text-white/30 group-hover/item:text-white transition-all transform group-hover/item:translate-x-0.5">
                                →
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
})

/**
 * PORTFOLIO BENTO HUB — KUSURSUZ DIKDÖRTGEN BLOK
 *
 * MİMARİ:
 * ┌──────────────────────────────────────┬──────────────────────────────────────┐
 * │ [SOL ÜST]                            │ [SAĞ ÜST]                            │
 * │ Görsel Proje (4:5) + Reklam (4:5)    │ Dikey Video Edit (9:16)              │
 * │                                      │ Dik Motion Afiş (9:16)               │
 * ├──────────────────────────────────────┼──────────────────────────────────────┤
 * │ [SOL ALT]                            │ [SAĞ ALT]                            │
 * │ Yeni Dikey Slot (9:16)               │ Sosyal Medya Gönderileri (4:5)       │
 * │ Hareketli Grafikler (9:16)           │ Dönen Yazılı Çapraz Oklu Menü Kartı  │
 * └──────────────────────────────────────┴──────────────────────────────────────┘
 */
export default function PortfolioBentoHub() {
    return (
        <div className="relative pt-2 pb-14 md:pt-6 md:pb-24 overflow-hidden w-full max-w-7xl mx-auto">
            {/* Sitedeki Diğer Bölümlerle (Services) Uyumlu Başlık Alanı */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-10 md:mb-16 lg:mb-20 text-center"
            >
                <div className="flex items-center justify-center gap-6 mb-2">
                    <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))' }} />
                    <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-[#F2F2F2]">
                        Portfolyo
                    </h2>
                    <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)' }} />
                </div>
                <p className="text-xs sm:text-sm text-white/50 font-medium">
                    Fikirden ekrana: görsel, video ve hareket.
                </p>
            </motion.div>

            {/* BOŞLUKSUZ VE TAM BİR DİKDÖRTGEN FORMU OLUŞTURAN 12 KOLONLUK MOZAİK */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 items-stretch"
            >
                {/* SOL YARI (6 KOLON): Üstte 2 Post (4:5) + Altta 2 Dikey (9:16) */}
                <div className="col-span-12 lg:col-span-6 flex flex-col gap-2.5 sm:gap-3">
                    {/* Sol Üst: 2 Tane 4:5 Post Görseli (Görsel Proje + Reklam Kreatifi) */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                        <div className="w-full aspect-[4/5]">
                            <MosaicCard
                                categoryName="Görsel proje"
                                items={VISUAL_PROJECT_POOL_1}
                                interval={4800}
                                initialDelay={0}
                                targetSection="#portfolio-stack"
                            />
                        </div>
                        <div className="w-full aspect-[4/5]">
                            <MosaicCard
                                categoryName="Reklam kreatifi"
                                items={AD_CREATIVE_POOL_1}
                                interval={5400}
                                initialDelay={1000}
                                targetSection="#ecommerce"
                            />
                        </div>
                    </div>

                    {/* Sol Alt: 2 Tane 9:16 Dikey Slot (Yeni Dikey Slot + Hareketli Grafikler) */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                        <div className="w-full aspect-[9/16]">
                            <MosaicCard
                                categoryName="Dikey Vitrin"
                                items={NEW_VERTICAL_SLOT_POOL}
                                interval={5200}
                                initialDelay={1500}
                                targetSection="#videos"
                            />
                        </div>
                        <div className="w-full aspect-[9/16]">
                            <MosaicCard
                                categoryName="Hareketli grafikler"
                                items={MOTION_GRAPHICS_POOL}
                                interval={4800}
                                initialDelay={2500}
                                targetSection="#motion-showcase"
                            />
                        </div>
                    </div>
                </div>

                {/* SAĞ YARI (6 KOLON): Üstte 2 Dikey (9:16) + Altta 1 Post (4:5) & Dönen Oklu Menü */}
                <div className="col-span-12 lg:col-span-6 flex flex-col gap-2.5 sm:gap-3">
                    {/* Sağ Üst: 2 Tane 9:16 Dikey Slot (Dikey Video Edit + Dik Motion Afiş) */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                        <div className="w-full aspect-[9/16]">
                            <MosaicCard
                                categoryName="Dikey video edit"
                                items={VERTICAL_VIDEO_EDIT_POOL}
                                interval={5200}
                                initialDelay={600}
                                targetSection="#videos"
                            />
                        </div>
                        <div className="w-full aspect-[9/16]">
                            <MosaicCard
                                categoryName="Dik motion afiş"
                                items={VERTICAL_MOTION_POOL}
                                interval={5800}
                                initialDelay={1600}
                                targetSection="#motion-showcase"
                            />
                        </div>
                    </div>

                    {/* Sağ Alt: 1 Post (4:5) + Dönen Yazılı Çapraz Oklu Menü Kartı */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                        <div className="w-full aspect-[4/5]">
                            <MosaicCard
                                categoryName="Sosyal medya"
                                items={SOCIAL_POST_POOL}
                                interval={5000}
                                initialDelay={800}
                                targetSection="#portfolio-stack"
                            />
                        </div>
                        <div className="w-full aspect-[4/5]">
                            <RotatingBadgeMenuCard />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
