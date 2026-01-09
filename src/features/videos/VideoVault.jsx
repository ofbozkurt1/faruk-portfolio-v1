/**
 * VideoVault Component - Phase 35 OPTIMIZED
 * React.memo for list items
 */

import React, { useRef, useEffect, memo } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// Video data - 4 groups with 2 videos each + tools
const groups = [
    {
        id: 'hype',
        title: 'HYPE & EVENTS',
        desc: 'Capturing the raw energy of the moment.',
        client: 'Various Clients',
        year: '2024',
        tools: [
            { name: 'Premiere Pro', icon: '/gorseller/iconlar/premiere-pro.svg' },
            { name: 'After Effects', icon: '/gorseller/iconlar/after-effects.svg' }
        ],
        videos: [
            { id: 1, src: '/videolar/vd1.mp4', title: 'Summer Vibes' },
            { id: 2, src: '/videolar/vd2.mp4', title: 'Night Life' }
        ]
    },
    {
        id: 'commercial',
        title: 'COMMERCIAL',
        desc: 'Brand storytelling and product showcase.',
        client: 'Brand Partners',
        year: '2024',
        tools: [
            { name: 'Premiere Pro', icon: '/gorseller/iconlar/premiere-pro.svg' },
            { name: 'After Effects', icon: '/gorseller/iconlar/after-effects.svg' },
            { name: 'Photoshop', icon: '/gorseller/iconlar/photoshop.svg' }
        ],
        videos: [
            { id: 3, src: '/videolar/vd3.mp4', title: 'Brand Story' },
            { id: 4, src: '/videolar/vd4.mp4', title: 'Product Launch' }
        ]
    },
    {
        id: 'social',
        title: 'SOCIAL EDITS',
        desc: 'Short-form content designed to engage.',
        client: 'Social Media',
        year: '2024',
        tools: [
            { name: 'Premiere Pro', icon: '/gorseller/iconlar/premiere-pro.svg' },
            { name: 'After Effects', icon: '/gorseller/iconlar/after-effects.svg' }
        ],
        videos: [
            { id: 5, src: '/videolar/vd5.mp4', title: 'Reels Edit' },
            { id: 6, src: '/videolar/vd6.mp4', title: 'TikTok Style' }
        ]
    },
    {
        id: 'aerial',
        title: 'AERIAL & DRONE',
        desc: 'Cinematic perspectives from the sky.',
        client: 'Aerial Projects',
        year: '2024',
        tools: [
            { name: 'Premiere Pro', icon: '/gorseller/iconlar/premiere-pro.svg' },
            { name: 'After Effects', icon: '/gorseller/iconlar/after-effects.svg' }
        ],
        videos: [
            { id: 7, src: '/videolar/drn1.mp4', title: 'City Flyover' },
            { id: 8, src: '/videolar/drn2.mp4', title: 'Nature Shot' }
        ]
    }
]

// Smart Video Player Component - Memoized
const VideoCard = memo(function VideoCard({ video, index }) {
    const ref = useRef(null)
    const videoRef = useRef(null)
    const isInView = useInView(ref, { amount: 0.6 })

    useEffect(() => {
        if (!videoRef.current) return

        if (isInView) {
            videoRef.current.play().catch(() => { })
        } else {
            videoRef.current.pause()
        }
    }, [isInView])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            // No hover animation
            style={{
                position: 'relative',
                aspectRatio: '9/16',
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.3)',
                cursor: 'pointer'
            }}
        >
            <video
                ref={videoRef}
                src={video.src}
                poster={video.src.replace('.mp4', '-poster.webp')}
                muted
                loop
                playsInline
                preload="none"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />

            {/* Bottom Gradient Overlay with Title */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '60px 20px 20px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)'
                }}
            >
                <span
                    style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        fontSize: 11,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.8)'
                    }}
                >
                    {video.title}
                </span>
            </div>

            {/* Play indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 0 : 1 }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.5)'
                }}
            >
                <div
                    style={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        border: '2px solid rgba(255,255,255,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <span style={{ color: '#fff', fontSize: 22, marginLeft: 4 }}>▶</span>
                </div>
            </motion.div>
        </motion.div>
    )
})

// Info Panel Component
function InfoPanel({ group }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                textAlign: 'left',
                maxWidth: 400
            }}
        >
            {/* Category Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.3)' }} />
                <span
                    style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        fontSize: 10,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.4)'
                    }}
                >
                    Video Work — {group.year}
                </span>
            </div>

            {/* Title */}
            <h3
                style={{
                    fontSize: 'clamp(32px, 4vw, 48px)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: '#F2F2F2',
                    marginBottom: 16,
                    lineHeight: 1.1
                }}
            >
                {group.title}
            </h3>

            {/* Description */}
            <p
                style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.5)',
                    marginBottom: 32,
                    maxWidth: 380
                }}
            >
                {group.desc}
            </p>

            {/* Details Grid */}
            <div style={{ display: 'flex', gap: 40, marginBottom: 32 }}>
                <div>
                    <span
                        style={{
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: 9,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.3)',
                            display: 'block',
                            marginBottom: 6
                        }}
                    >
                        Client
                    </span>
                    <span style={{ fontSize: 14, color: '#F2F2F2' }}>{group.client}</span>
                </div>
                <div>
                    <span
                        style={{
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: 9,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.3)',
                            display: 'block',
                            marginBottom: 6
                        }}
                    >
                        Deliverables
                    </span>
                    <span style={{ fontSize: 14, color: '#F2F2F2' }}>Reels, Stories</span>
                </div>
            </div>

            {/* Tools */}
            <div>
                <span
                    style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        fontSize: 9,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.3)',
                        display: 'block',
                        marginBottom: 12
                    }}
                >
                    Tools Used
                </span>
                <div style={{ display: 'flex', gap: 12 }}>
                    {group.tools.map((tool, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.1, y: -4 }}
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 10,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                            title={tool.name}
                        >
                            <img
                                src={tool.icon}
                                alt={tool.name}
                                style={{ width: 26, height: 26 }}
                                onError={(e) => { e.target.style.display = 'none' }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

// Video Group Row - Desktop: Alternating Layout, Mobile: Carousel
function VideoGroupRow({ group, index }) {
    const isReversed = index % 2 === 1

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
        >
            {/* DESKTOP LAYOUT - Side by Side */}
            <div
                className="hidden md:flex"
                style={{
                    flexDirection: isReversed ? 'row-reverse' : 'row',
                    gap: 60,
                    alignItems: 'center'
                }}
            >
                {/* Videos Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 20,
                        flex: '0 0 auto',
                        width: '45%'
                    }}
                >
                    {group.videos.map((video, idx) => (
                        <VideoCard key={video.id} video={video} index={idx} />
                    ))}
                </div>

                {/* Info Panel */}
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <InfoPanel group={group} />
                </div>
            </div>

            {/* MOBILE LAYOUT - Vertical Stack with Carousel */}
            <div className="md:hidden flex flex-col gap-6">
                {/* Text Content - Compact */}
                <div className="text-center px-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-mono">
                        Video Work — {group.year}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2 mb-2 tracking-tight">
                        {group.title}
                    </h3>
                    <p className="text-sm text-white/50 mb-4">
                        {group.desc}
                    </p>
                    {/* Tools Row */}
                    <div className="flex justify-center gap-2 mb-4">
                        {group.tools.map((tool, idx) => (
                            <div
                                key={idx}
                                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                                title={tool.name}
                            >
                                <img
                                    src={tool.icon}
                                    alt={tool.name}
                                    className="w-5 h-5"
                                    onError={(e) => { e.target.style.display = 'none' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* HORIZONTAL CAROUSEL - Instagram Style */}
                <div
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-4 scrollbar-hide"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {group.videos.map((video, idx) => (
                        <div
                            key={video.id}
                            className="flex-shrink-0 snap-center"
                            style={{ width: '75vw', maxWidth: '300px' }}
                        >
                            <VideoCard video={video} index={idx} />
                        </div>
                    ))}
                </div>

                {/* Swipe Hint */}
                <div className="text-center text-[11px] text-white/30 animate-pulse">
                    ← Kaydır →
                </div>
            </div>
        </motion.div>
    )
}

// Main VideoVault Component
export default function VideoVault() {
    const { t } = useTranslation()

    return (
        <section className="py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-24"
                >
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))' }} />
                        <h2
                            style={{
                                fontSize: 'clamp(32px, 5vw, 52px)',
                                fontWeight: 700,
                                letterSpacing: '-0.02em',
                                color: '#F2F2F2'
                            }}
                        >
                            {t('videoShowcase.title', 'Video Showcase')}
                        </h2>
                        <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)' }} />
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>
                        {t('videoShowcase.subtitle', 'Vertical stories that captivate')}
                    </p>
                </motion.div>

                {/* Video Groups */}
                <div className="space-y-32">
                    {groups.map((group, index) => (
                        <VideoGroupRow key={group.id} group={group} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
