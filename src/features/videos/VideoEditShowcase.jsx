/**
 * VideoEditShowcase — Dikey Video Edit Bölümü
 * Sinematik fade-in yaklaşımıyla 4 video edit kurgusunu sergiler.
 * Masaüstünde 4 kartlı yatay yerleşim, mobilde kaydırmalı carousel.
 */
import { memo, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePrefersReducedMotion, useIsMobileViewport } from '../../hooks'

const VIDEO_EDITS = [
    {
        id: 1,
        title: 'Kurgu & Ritim',
        sub: 'Video Edit 01',
        tag: 'Dinamik Kesim',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450220/Video-Edit-1_lk21eh.webm',
    },
    {
        id: 2,
        title: 'Renk & Duygu',
        sub: 'Video Edit 02',
        tag: 'Color Grading',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450241/Video-Edit-2_mvq6ha.webm',
    },
    {
        id: 3,
        title: 'Reels & İçerik',
        sub: 'Video Edit 03',
        tag: 'Sosyal Medya',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450178/Video-Edit-3_fpd3cf.webm',
    },
    {
        id: 4,
        title: 'Tanıtım & Hikaye',
        sub: 'Video Edit 04',
        tag: 'Ticari Kurgu',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1794450213/Video-Edit-4_lpvq8x.webm',
    },
]

const VideoEditCard = memo(function VideoEditCard({ item, index, isMobileViewport }) {
    const videoRef = useRef(null)
    const cardRef = useRef(null)
    const prefersReducedMotion = usePrefersReducedMotion()
    const isInView = useInView(cardRef, { amount: 0.4, once: false })
    const [isLoaded, setIsLoaded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    // Load src lazily
    useEffect(() => {
        if (isInView || index < 2) setIsLoaded(true)
    }, [isInView, index])

    // Desktop: auto-play when in view
    useEffect(() => {
        if (!videoRef.current || prefersReducedMotion || isMobileViewport) return
        if (isInView) {
            videoRef.current.play().catch(() => {})
        } else {
            videoRef.current.pause()
        }
    }, [isInView, prefersReducedMotion, isMobileViewport])

    // Mobile: play on hover / tap
    useEffect(() => {
        if (!videoRef.current || prefersReducedMotion || !isMobileViewport) return
        if (isInView) {
            videoRef.current.play().catch(() => {})
        } else {
            videoRef.current.pause()
        }
    }, [isInView, prefersReducedMotion, isMobileViewport])

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 1, 0.5, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative flex-shrink-0 w-[70vw] max-w-[220px] md:w-full md:max-w-none snap-center"
        >
            {/* Aspect container 9:16 */}
            <div
                className="relative w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-black"
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
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Index only — top right */}
                <div className="absolute top-3 right-3 z-10">
                    <span className="text-[10px] font-mono text-white/30 tabular-nums">
                        {String(item.id).padStart(2, '0')}
                    </span>
                </div>

                {/* Play pulse — hidden when playing */}
                <motion.div
                    animate={{ opacity: isHovered || !isInView ? 0 : 0.6 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                >
                    <div className="w-11 h-11 rounded-full border border-white/40 bg-white/10 flex items-center justify-center backdrop-blur-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </motion.div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                    <p className="text-[9px] font-mono uppercase tracking-widest text-white/45 mb-0.5">{item.sub}</p>
                    <h4 className="text-sm font-bold text-white tracking-tight leading-tight">{item.title}</h4>
                </div>
            </div>
        </motion.div>
    )
})

export default function VideoEditShowcase() {
    const isMobileViewport = useIsMobileViewport()

    return (
        <section id="video-edit" className="relative w-full py-16 md:py-24 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 md:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
                >
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <div style={{ width: 48, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))' }} />
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#F2F2F2]">
                                Video Edit
                            </h2>
                        </div>
                        <p className="text-sm text-white/50 font-mono ml-[64px]">
                            Ritim, renk ve hikaye kurgusu.
                        </p>
                    </div>
                    <div className="flex items-center gap-6 ml-[64px] md:ml-0 pb-1">
                        <div className="text-center">
                            <p className="text-xl md:text-2xl font-mono font-bold text-white/90">4</p>
                            <p className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Kurgu</p>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-center">
                            <p className="text-xl md:text-2xl font-mono font-bold text-white/90">9:16</p>
                            <p className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Format</p>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-center">
                            <p className="text-xl md:text-2xl font-mono font-bold text-white/90">Reels</p>
                            <p className="text-[9px] font-mono text-white/40 uppercase tracking-wider">& Sosyal</p>
                        </div>
                    </div>
                </motion.div>

                {/* Cards */}
                <div
                    className={
                        isMobileViewport
                            ? 'flex gap-3 overflow-x-auto -mx-4 px-4 pb-4 snap-x snap-mandatory scroll-smooth touch-pan-x'
                            : 'grid grid-cols-4 gap-3 md:gap-4'
                    }
                >
                    {VIDEO_EDITS.map((item, index) => (
                        <VideoEditCard
                            key={item.id}
                            item={item}
                            index={index}
                            isMobileViewport={isMobileViewport}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}
