/**
 * MotionDesignShowcase — Hareketli Grafik & 2D/3D Animasyon Bölümü
 * 
 * Layout: Masüstünde 4+4 iki sıralı dinamik ızgara (önce büyük hero kart, 
 * sonra küçük destekleyici kartlar). Mobilde kaydırmalı carousel.
 * Scroll ile tetiklenen fade-stagger animasyonu.
 */
import { memo, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePrefersReducedMotion, useIsMobileViewport } from '../../hooks'

const MOTION_VIDEOS = [
    {
        id: 1,
        title: 'Moonla',
        sub: 'SaaS Tanıtım',
        tag: 'Animasyon',
        featured: true,
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450374/Moonla_1080_1_mv6j2b.webm',
    },
    {
        id: 2,
        title: 'Maprix — Rank Tracker',
        sub: 'Ürün Tanıtımı',
        tag: 'UI Motion',
        featured: false,
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450422/Maprix_Rank_Tracker_Video_4K_4_wte1l2.webm',
    },
    {
        id: 3,
        title: 'Kinetik Tipografi',
        sub: 'Brand Film',
        tag: '2D Animasyon',
        featured: false,
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450374/2_h4vhjm.webm',
    },
    {
        id: 4,
        title: 'Dinamik Arayüz',
        sub: 'UI / UX Motion',
        tag: 'Ürün Görsel',
        featured: false,
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450362/q3_1_fflfyh.webm',
    },
    {
        id: 5,
        title: 'Maprix — Yorum Stüdyosu',
        sub: 'Özellik Tanıtımı',
        tag: 'UI Motion',
        featured: false,
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450404/Maprix_Yorum_St%C3%BCdyosu_Video_F1_4K_1_sci5wo.webm',
    },
    {
        id: 6,
        title: 'Geçiş & Efektler',
        sub: 'Kompozisyon',
        tag: 'Motion Fx',
        featured: false,
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450365/3_u5m6nb.webm',
    },
    {
        id: 7,
        title: 'Logo & Marka',
        sub: 'Intro Animasyonu',
        tag: 'Brand Motion',
        featured: false,
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450367/1_afikf7.webm',
    },
    {
        id: 8,
        title: 'Maprix — Profil Analizi',
        sub: 'Veri Görselleştirme',
        tag: 'Data Motion',
        featured: false,
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450393/Maprix_Profil_Analizi_Video_F1_4K_1_jdg4tm.webm',
    },
]

const MotionCard = memo(function MotionCard({ item, index, isMobileViewport }) {
    const videoRef = useRef(null)
    const cardRef = useRef(null)
    const prefersReducedMotion = usePrefersReducedMotion()
    const isInView = useInView(cardRef, { amount: 0.3, once: false })
    const [isLoaded, setIsLoaded] = useState(index < 2)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        if (isInView) setIsLoaded(true)
    }, [isInView])

    useEffect(() => {
        if (!videoRef.current || prefersReducedMotion) return
        if (isInView) {
            videoRef.current.play().catch(() => {})
        } else {
            videoRef.current.pause()
        }
    }, [isInView, prefersReducedMotion])

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.25, 1, 0.5, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative flex-shrink-0 snap-center"
            style={isMobileViewport ? { width: '70vw', maxWidth: 220 } : {}}
        >
            {/* Card shell */}
            <div
                className="relative w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-black transition-all duration-500 group-hover:border-white/25 group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
                style={{ aspectRatio: '9/16' }}
            >
                {/* Video */}
                <video
                    ref={videoRef}
                    src={isLoaded ? item.src : undefined}
                    muted
                    loop
                    playsInline
                    preload={isLoaded ? 'metadata' : 'none'}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent pointer-events-none" />

                {/* Top Row — sadece index numarası */}
                <div className="absolute top-3 right-3 z-10">
                    <span className="text-[9px] font-mono text-white/25 tabular-nums">
                        {String(item.id).padStart(2, '0')}
                    </span>
                </div>

                {/* Hovered overlay line accent */}
                <motion.div
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent origin-left pointer-events-none z-20"
                />

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                    <p className="text-[8px] font-mono uppercase tracking-widest text-white/40 mb-0.5">{item.sub}</p>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-tight tracking-tight line-clamp-2">
                        {item.title}
                    </h4>
                </div>
            </div>
        </motion.div>
    )
})

export default function MotionDesignShowcase() {
    const isMobileViewport = useIsMobileViewport()

    const row1 = MOTION_VIDEOS.slice(0, 4)
    const row2 = MOTION_VIDEOS.slice(4, 8)

    return (
        <section id="motion-design" className="relative w-full py-16 md:py-28 overflow-hidden">
            {/* Subtle ambient bg glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-4 md:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
                >
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <div style={{ width: 48, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))' }} />
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#F2F2F2]">
                                Motion Design
                            </h2>
                        </div>
                        <p className="text-sm text-white/50 font-mono ml-[64px]">
                            2D & 3D animasyon, kinetik tipografi, UI motion.
                        </p>
                    </div>

                    {/* Meta stats */}
                    <div className="flex items-center gap-6 ml-[64px] md:ml-0 pb-1">
                        <div className="text-center">
                            <p className="text-xl md:text-2xl font-mono font-bold text-white/90">8</p>
                            <p className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Video</p>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-center">
                            <p className="text-xl md:text-2xl font-mono font-bold text-white/90">9:16</p>
                            <p className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Reels Format</p>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-center">
                            <p className="text-xl md:text-2xl font-mono font-bold text-white/90">2D/3D</p>
                            <p className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Animasyon</p>
                        </div>
                    </div>
                </motion.div>

                {/* Grid — Desktop: 2 rows of 4; Mobile: single scrollable row */}
                {isMobileViewport ? (
                    <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-4 snap-x snap-mandatory scroll-smooth touch-pan-x">
                        {MOTION_VIDEOS.map((item, index) => (
                            <MotionCard
                                key={item.id}
                                item={item}
                                index={index}
                                isMobileViewport={isMobileViewport}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 md:gap-4">
                        {/* Row 1 */}
                        <div className="grid grid-cols-4 gap-3 md:gap-4">
                            {row1.map((item, index) => (
                                <MotionCard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    isMobileViewport={false}
                                />
                            ))}
                        </div>
                        {/* Row 2 */}
                        <div className="grid grid-cols-4 gap-3 md:gap-4">
                            {row2.map((item, index) => (
                                <MotionCard
                                    key={item.id}
                                    item={item}
                                    index={index + 4}
                                    isMobileViewport={false}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
