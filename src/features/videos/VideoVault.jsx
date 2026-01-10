/**
 * VideoVault Component - Phase 48: Mobile Tabbed Interface
 * Mobile: Single tabbed view (saves vertical space)
 * Desktop: ORIGINAL layout with icons, client, year, tools
 */

import React, { useRef, useEffect, memo, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// Video data - 4 groups with full details for desktop
const groups = [
    {
        id: 'hype',
        tabLabel: 'HYPE',
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
        tabLabel: 'TİCARİ',
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
        tabLabel: 'SOCIAL',
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
        tabLabel: 'DRONE',
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

// Simple Video Card - Memoized & Optimized
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
        <div
            ref={ref}
            style={{
                position: 'relative',
                aspectRatio: '9/16',
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.3)',
                cursor: 'pointer',
                willChange: 'transform', // GPU optimization
                transform: 'translateZ(0)' // Force GPU layer
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
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
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
            {/* Play indicator when not in view */}
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
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div
                        style={{
                            width: 0,
                            height: 0,
                            borderLeft: '14px solid white',
                            borderTop: '9px solid transparent',
                            borderBottom: '9px solid transparent',
                            marginLeft: 4
                        }}
                    />
                </div>
            </motion.div>
        </div>
    )
})

// ============ DESKTOP INFO PANEL (ORIGINAL) ============
function DesktopInfoPanel({ group, isReversed }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
                flex: '0 0 auto',
                width: '50%',
                paddingLeft: isReversed ? 0 : 40,
                paddingRight: isReversed ? 40 : 0,
                textAlign: isReversed ? 'right' : 'left'
            }}
        >
            {/* Tag */}
            <div style={{ marginBottom: 16 }}>
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
                    maxWidth: 380,
                    marginLeft: isReversed ? 'auto' : 0,
                    marginRight: isReversed ? 0 : 'auto'
                }}
            >
                {group.desc}
            </p>

            {/* Details Grid */}
            <div style={{ display: 'flex', gap: 40, marginBottom: 32, justifyContent: isReversed ? 'flex-end' : 'flex-start' }}>
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
                        Year
                    </span>
                    <span style={{ fontSize: 14, color: '#F2F2F2' }}>{group.year}</span>
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
                    Toolkit
                </span>
                <div style={{ display: 'flex', gap: 10, justifyContent: isReversed ? 'flex-end' : 'flex-start' }}>
                    {group.tools.map((tool, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.1, y: -2 }}
                            style={{
                                width: 46,
                                height: 46,
                                borderRadius: 12,
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
                                loading="lazy"
                                decoding="async"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

// ============ MOBILE UNIFIED CAROUSEL ============
function MobileVideoCarousel() {
    const scrollRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const autoPlayRef = useRef(null)
    const isPausedRef = useRef(false)
    const isProgrammaticScrollRef = useRef(false)
    const isUserInteractingRef = useRef(false)
    const scrollTimeoutRef = useRef(null) // For throttling scroll handler

    // Flatten all videos with category info
    const allVideos = groups.flatMap((group, groupIdx) =>
        group.videos.map(video => ({ ...video, groupIdx, groupLabel: group.tabLabel }))
    )

    // Get active category based on current video
    const activeCategory = allVideos[activeIndex]?.groupIdx || 0

    // Find first video index of each category
    const categoryStartIndex = groups.map((_, idx) => {
        let count = 0
        for (let i = 0; i < idx; i++) {
            count += groups[i].videos.length
        }
        return count
    })

    // Scroll to specific video
    const scrollToIndex = (index) => {
        if (!scrollRef.current) return
        const container = scrollRef.current
        const videoWidth = container.offsetWidth // Full width now
        container.scrollTo({
            left: index * videoWidth,
            behavior: 'smooth'
        })
    }

    // Tab click - go to category's first video
    const handleTabClick = (categoryIdx) => {
        isPausedRef.current = true
        isProgrammaticScrollRef.current = true // Lock scroll updates

        const startIdx = categoryStartIndex[categoryIdx]
        setActiveIndex(startIdx)
        scrollToIndex(startIdx)

        // Unlock after scroll animation roughly completes
        setTimeout(() => {
            isPausedRef.current = false
            isProgrammaticScrollRef.current = false
        }, 800)
    }

    // Auto-advance every 3 seconds - with Scroll Lock
    useEffect(() => {
        autoPlayRef.current = setInterval(() => {
            // 1. Don't move if user is touching/hovering
            if (isUserInteractingRef.current) return

            // 2. Don't move if we are already animating and locked
            if (isProgrammaticScrollRef.current) return

            // 3. LOCK THE SCROLL LISTENER (The Anti-Jitter Fix)
            isProgrammaticScrollRef.current = true

            setActiveIndex(prev => {
                const next = (prev + 1) % allVideos.length
                scrollToIndex(next)

                // 4. Unlock after animation
                setTimeout(() => {
                    isProgrammaticScrollRef.current = false
                }, 800)

                return next
            })
        }, 4000)

        return () => clearInterval(autoPlayRef.current)
    }, [allVideos.length])

    // Detect manual scroll and update active index - THROTTLED for performance
    const handleScroll = () => {
        if (!scrollRef.current) return

        // Skip update if we are programmatically scrolling (Auto or Tab)
        if (isProgrammaticScrollRef.current) return

        // Throttle: Only update every 150ms to reduce re-renders
        if (scrollTimeoutRef.current) return

        scrollTimeoutRef.current = setTimeout(() => {
            scrollTimeoutRef.current = null

            if (!scrollRef.current) return
            const container = scrollRef.current
            const videoWidth = container.offsetWidth
            const scrollLeft = container.scrollLeft
            const newIndex = Math.round(scrollLeft / videoWidth)

            if (newIndex !== activeIndex && newIndex >= 0 && newIndex < allVideos.length) {
                setActiveIndex(newIndex)
            }
        }, 150)
    }

    // Touch handlers - pause when touching
    const handleTouchStart = () => {
        isUserInteractingRef.current = true
        isPausedRef.current = true
    }
    const handleTouchEnd = () => {
        isUserInteractingRef.current = false
        // Resume auto-play after a short delay
        setTimeout(() => { isPausedRef.current = false }, 3000)
    }

    // Arrow navigation
    const goToPrev = () => {
        const prev = activeIndex > 0 ? activeIndex - 1 : allVideos.length - 1
        setActiveIndex(prev)
        scrollToIndex(prev)
    }
    const goToNext = () => {
        const next = (activeIndex + 1) % allVideos.length
        setActiveIndex(next)
        scrollToIndex(next)
    }

    return (
        <div className="md:hidden">
            {/* Category Tabs - Portfolio Style */}
            <div className="flex justify-center mb-6">
                <div className="flex gap-1 p-1 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md">
                    {groups.map((group, idx) => (
                        <button
                            key={group.id}
                            onClick={() => handleTabClick(idx)}
                            className={`relative px-3 py-1.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors duration-300 ${activeCategory === idx ? 'text-black' : 'text-white/60 hover:text-white'
                                }`}
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                            {activeCategory === idx && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white rounded-full shadow-lg"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{group.tabLabel}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Video Carousel Container */}
            <div className="relative w-full px-4">
                {/* Left Arrow - Overlay, Subtle */}
                <button
                    onClick={goToPrev}
                    className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-start opacity-50 active:scale-90 transition-transform"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                {/* Right Arrow - Overlay, Subtle */}
                <button
                    onClick={goToNext}
                    className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-end opacity-50 active:scale-90 transition-transform"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>

                {/* Single Carousel */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                    style={{
                        WebkitOverflowScrolling: 'touch',
                        touchAction: 'pan-x' // Lock vertical scroll, allow only horizontal
                    }}
                >
                    {allVideos.map((video, idx) => (
                        <div
                            key={video.id}
                            className="flex-shrink-0 snap-center w-full px-2"
                        >
                            <VideoCard video={video} index={idx} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots Navigation - Portfolio Style */}
            <div className="flex justify-center mt-6">
                <div className="flex items-center gap-2 px-4 h-9 rounded-full bg-zinc-900 border border-white/10 shadow-lg backdrop-blur-md">
                    {allVideos.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setActiveIndex(idx)
                                scrollToIndex(idx)
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

// ============ DESKTOP VIEW (ORIGINAL LAYOUT) ============
function DesktopVideoGroups() {
    return (
        <div className="hidden md:block space-y-32">
            {groups.map((group, index) => {
                const isReversed = index % 2 === 1
                return (
                    <motion.div
                        key={group.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.5 }}
                    >
                        <div
                            style={{
                                display: 'flex',
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
                            <DesktopInfoPanel group={group} isReversed={isReversed} />
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}

// ============ MAIN COMPONENT ============
export default function VideoVault() {
    const { t } = useTranslation()

    return (
        <section className="pt-0 pb-16 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-6 md:mb-24"
                >
                    <div className="flex items-center justify-center gap-3 md:gap-6 mb-1 md:mb-4">
                        {/* Gradient Line Left */}
                        <div className="w-12 md:w-[60px] h-[1px] bg-gradient-to-r from-transparent to-white/30" />

                        <h2
                            className="whitespace-nowrap"
                            style={{
                                fontSize: 'clamp(28px, 5vw, 52px)',
                                fontWeight: 700,
                                letterSpacing: '-0.02em',
                                color: '#F2F2F2'
                            }}
                        >
                            {t('videoShowcase.title', 'Video Showcase')}
                        </h2>

                        {/* Gradient Line Right */}
                        <div className="w-12 md:w-[60px] h-[1px] bg-gradient-to-r from-white/30 to-transparent" />
                    </div>
                </motion.div>

                {/* Mobile: Tabbed Interface */}
                <MobileVideoCarousel />

                {/* Desktop: Original Stacked Layout */}
                <DesktopVideoGroups />
            </div>
        </section>
    )
}
