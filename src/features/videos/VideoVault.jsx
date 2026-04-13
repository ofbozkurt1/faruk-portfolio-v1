/**
 * VideoVault Component - Phase 48: Mobile Tabbed Interface
 * Mobile: Single tabbed view (saves vertical space)
 * Desktop: ORIGINAL layout with icons, client, year, tools
 */

import { useRef, useEffect, memo, useState, useMemo, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getAdaptiveRootMargin, useIsMobileViewport } from '../../hooks'


// Simple Video Card - Video data moved inside component for localization
// Simple Video Card - Memoized & Optimized
const VideoCard = memo(function VideoCard({ isMobileViewport, video }) {
    const ref = useRef(null)
    const videoRef = useRef(null)
    const [shouldLoad, setShouldLoad] = useState(isMobileViewport)
    const viewportMargin = isMobileViewport
        ? '300px 0px'
        : getAdaptiveRootMargin('200px 0px', '300px 0px')
    const isInView = useInView(ref, { amount: 0.35, margin: viewportMargin })

    useEffect(() => {
        if (isMobileViewport) {
            setShouldLoad(true)
            return
        }
        if (isInView) {
            setShouldLoad(true)
        }
    }, [isInView, isMobileViewport])

    useEffect(() => {
        if (!videoRef.current) return
        if (isMobileViewport) {
            if (shouldLoad) {
                videoRef.current.play().catch(() => { })
            }
            return
        }
        if (isInView) {
            videoRef.current.play().catch(() => { })
        } else {
            videoRef.current.pause()
        }
    }, [isInView, isMobileViewport, shouldLoad])

    useEffect(() => () => {
        if (videoRef.current) {
            videoRef.current.pause()
        }
    }, [])

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
                transform: 'translateZ(0)' // Force GPU layer
            }}
        >
            <video
                ref={videoRef}
                src={shouldLoad ? video.src : undefined}
                autoPlay
                muted
                loop
                playsInline
                preload={shouldLoad ? 'auto' : 'none'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '60px 20px 20px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: '12px'
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

                {/* Rotating Circular Button */}
                <div className="flex-shrink-0 relative w-14 h-14 flex items-center justify-center md:hidden">
                    <svg className="absolute inset-0 w-14 h-14 animate-[spin_8s_linear_infinite]" viewBox="0 0 100 100">
                        <defs>
                            <path id="videoCirclePath" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                        </defs>
                        <text className="fill-white/50" style={{ fontSize: '9px', letterSpacing: '0.12em', fontWeight: 500 }}>
                            <textPath href="#videoCirclePath">
                                BASILI TUT · TAM İZLE · BASILI TUT ·
                            </textPath>
                        </text>
                    </svg>
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </div>
            {/* Play indicator when not in view */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isMobileViewport || isInView ? 0 : 1 }}
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
    const { t } = useTranslation()
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
                    {t('videoShowcase.workLabel', 'Video Work')} — {group.year}
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
                    lineHeight: 1.1,
                    whiteSpace: 'nowrap'
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
                    maxWidth: 600,
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
                        {t('caseStudy.client', 'Client')}
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
                        {t('caseStudy.year', 'Year')}
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
                    {t('caseStudy.toolkit', 'Toolkit')}
                </span>
                <div style={{ display: 'flex', gap: 10, justifyContent: isReversed ? 'flex-end' : 'flex-start' }}>
                    {group.tools.map((tool) => (
                        <motion.div
                            key={tool.name}
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
function MobileVideoCarousel({ groups, isMobileViewport }) {
    const scrollRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const autoPlayRef = useRef(null)
    const isPausedRef = useRef(false)
    const isProgrammaticScrollRef = useRef(false)
    const isUserInteractingRef = useRef(false)
    const scrollTimeoutRef = useRef(null) // For throttling scroll handler
    const pauseTimeoutRef = useRef(null) // For tracking resume timeout
    const lockTimeoutRef = useRef(null)

    // Flatten all videos with category info
    const allVideos = useMemo(
        () =>
            groups.flatMap((group, groupIdx) =>
                group.videos.map((video) => ({ ...video, groupIdx, groupLabel: group.tabLabel }))
            ),
        [groups]
    )

    // Get active category based on current video
    const activeCategory = allVideos[activeIndex]?.groupIdx || 0

    // Find first video index of each category
    const categoryStartIndex = useMemo(
        () =>
            groups.map((_, idx) => {
                let count = 0
                for (let i = 0; i < idx; i++) {
                    count += groups[i].videos.length
                }
                return count
            }),
        [groups]
    )

    // Scroll to specific video
    const scrollToIndex = useCallback((index) => {
        if (!scrollRef.current) return
        const container = scrollRef.current
        const videoWidth = container.offsetWidth // Full width now
        container.scrollTo({
            left: index * videoWidth,
            behavior: 'smooth'
        })
    }, [])

    // Tab click - go to category's first video with pause
    const handleTabClick = useCallback((categoryIdx) => {
        // Clear any existing pause timeout
        if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current)
        }

        isPausedRef.current = true
        isProgrammaticScrollRef.current = true // Lock scroll updates

        const startIdx = categoryStartIndex[categoryIdx]
        setActiveIndex(startIdx)
        scrollToIndex(startIdx)

        // Resume after exactly 8 seconds
        pauseTimeoutRef.current = setTimeout(() => {
            isPausedRef.current = false
            isProgrammaticScrollRef.current = false
            pauseTimeoutRef.current = null
        }, 8000)
    }, [categoryStartIndex, scrollToIndex])

    // Auto-advance every 7 seconds - with Scroll Lock
    useEffect(() => {
        autoPlayRef.current = setInterval(() => {
            // 1. Don't move if user is touching/hovering
            if (isUserInteractingRef.current) return

            // 2. Don't move if manually paused
            if (isPausedRef.current) return

            // 3. Don't move if we are already animating and locked
            if (isProgrammaticScrollRef.current) return

            // 4. LOCK THE SCROLL LISTENER (The Anti-Jitter Fix)
            isProgrammaticScrollRef.current = true

            setActiveIndex(prev => {
                const next = (prev + 1) % allVideos.length
                scrollToIndex(next)

                // 5. Unlock after animation
                if (lockTimeoutRef.current) {
                    clearTimeout(lockTimeoutRef.current)
                }
                lockTimeoutRef.current = setTimeout(() => {
                    isProgrammaticScrollRef.current = false
                    lockTimeoutRef.current = null
                }, 800)

                return next
            })
        }, 7000)

        return () => clearInterval(autoPlayRef.current)
    }, [allVideos.length, scrollToIndex])

    // Detect manual scroll and update active index - THROTTLED for performance
    const handleScroll = useCallback(() => {
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
    }, [activeIndex, allVideos.length])

    // Touch handlers - pause when touching
    const handleTouchStart = useCallback(() => {
        isUserInteractingRef.current = true
        isPausedRef.current = true
    }, [])
    const handleTouchEnd = useCallback(() => {
        isUserInteractingRef.current = false

        // Clear any existing pause timeout
        if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current)
        }

        // Resume after exactly 8 seconds
        pauseTimeoutRef.current = setTimeout(() => {
            isPausedRef.current = false
            pauseTimeoutRef.current = null
        }, 8000)
    }, [])

    // Arrow navigation - with auto-scroll pause
    const goToPrev = useCallback(() => {
        // Clear any existing pause timeout
        if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current)
        }

        isPausedRef.current = true

        const prev = activeIndex > 0 ? activeIndex - 1 : allVideos.length - 1
        setActiveIndex(prev)
        scrollToIndex(prev)

        // Resume after exactly 8 seconds
        pauseTimeoutRef.current = setTimeout(() => {
            isPausedRef.current = false
            pauseTimeoutRef.current = null
        }, 8000)
    }, [activeIndex, allVideos.length, scrollToIndex])
    const goToNext = useCallback(() => {
        // Clear any existing pause timeout
        if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current)
        }

        isPausedRef.current = true

        const next = (activeIndex + 1) % allVideos.length
        setActiveIndex(next)
        scrollToIndex(next)

        // Resume after exactly 8 seconds
        pauseTimeoutRef.current = setTimeout(() => {
            isPausedRef.current = false
            pauseTimeoutRef.current = null
        }, 8000)
    }, [activeIndex, allVideos.length, scrollToIndex])

    useEffect(() => () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current)
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
        if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
        if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current)
    }, [])

    return (
        <div className="md:hidden">
            {/* Category Tabs - Portfolio Style */}
            <div className="flex justify-center mb-6">
                <div className="flex gap-1 p-1 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md">
                    {groups.map((group, idx) => (
                        <button
                            key={group.id}
                            onClick={() => handleTabClick(idx)}
                            className={`relative min-h-[44px] px-3 py-1.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors duration-300 ${activeCategory === idx ? 'text-black' : 'text-white/60 hover:text-white'
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
                    aria-label="Önceki Video"
                    className="absolute -left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-start opacity-50 transition-transform active:scale-90"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                {/* Right Arrow - Overlay, Subtle */}
                <button
                    onClick={goToNext}
                    aria-label="Sonraki Video"
                    className="absolute -right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-end opacity-50 transition-transform active:scale-90"
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
                    className="touch-scroll-native flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                    style={{
                        touchAction: 'pan-x' // Lock vertical scroll, allow only horizontal
                    }}
                >
                    {allVideos.map((video) => (
                        <div
                            key={video.id}
                            className="flex-shrink-0 snap-center w-full px-2"
                        >
                            <VideoCard isMobileViewport={isMobileViewport} video={video} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots Navigation - Disabled (Visual Only) */}
            <div className="flex justify-center mt-6">
                <div className="flex items-center gap-2 px-4 h-9 rounded-full bg-zinc-900 border border-white/10 shadow-lg backdrop-blur-md">
                    {allVideos.map((video, idx) => (
                        <div
                            key={video.id}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-default ${activeIndex === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

// ============ DESKTOP VIEW (ORIGINAL LAYOUT) ============
function DesktopVideoGroups({ groups, isMobileViewport }) {
    return (
        <div className="hidden md:block space-y-32">
            {groups.map((group, index) => {
                const isReversed = index % 2 === 1
                return (
                    <motion.div
                        key={group.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '0px' }}
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
                                {group.videos.map((video) => (
                                    <VideoCard key={video.id} isMobileViewport={isMobileViewport} video={video} />
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
    const isMobileViewport = useIsMobileViewport()

    const groups = useMemo(() => [
        {
            id: 'hype',
            tabLabel: t('videoShowcase.categories.hype.tab', 'HYPE'),
            title: t('videoShowcase.categories.hype.title', 'HYPE & EVENTS'),
            desc: t('videoShowcase.categories.hype.desc', 'Capturing the raw energy of the moment.'),
            client: t('videoShowcase.categories.hype.client', 'Various Clients'),
            year: t('videoShowcase.categories.hype.year', '2024'),
            tools: [
                { name: 'Premiere Pro', icon: '/gorseller/iconlar/premiere-pro.svg' },
                { name: 'After Effects', icon: '/gorseller/iconlar/after-effects.svg' }
            ],
            videos: [
                {
                    id: 1,
                    src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/Video/parti/vd1.mp4',
                    title: t('videoShowcase.categories.hype.videos.v1', 'Summer Vibes')
                },
                {
                    id: 2,
                    src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/Video/parti/vd2.mp4',
                    title: t('videoShowcase.categories.hype.videos.v2', 'Night Life')
                }
            ]
        },
        {
            id: 'commercial',
            tabLabel: t('videoShowcase.categories.commercial.tab', 'COMMERCIAL'),
            title: t('videoShowcase.categories.commercial.title', 'COMMERCIAL'),
            desc: t('videoShowcase.categories.commercial.desc', 'Brand storytelling and product showcase.'),
            client: t('videoShowcase.categories.commercial.client', 'Brand Partners'),
            year: t('videoShowcase.categories.commercial.year', '2024'),
            tools: [
                { name: 'Premiere Pro', icon: '/gorseller/iconlar/premiere-pro.svg' },
                { name: 'After Effects', icon: '/gorseller/iconlar/after-effects.svg' },
                { name: 'Photoshop', icon: '/gorseller/iconlar/photoshop.svg' }
            ],
            videos: [
                {
                    id: 3,
                    src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/Video/tan%C4%B1t%C4%B1m/vd1.mp4',
                    title: t('videoShowcase.categories.commercial.videos.v1', 'Brand Story')
                },
                {
                    id: 4,
                    src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/Video/tan%C4%B1t%C4%B1m/vd2.mp4',
                    title: t('videoShowcase.categories.commercial.videos.v2', 'Product Launch')
                }
            ]
        },
        {
            id: 'aerial',
            tabLabel: t('videoShowcase.categories.aerial.tab', 'DRONE'),
            title: t('videoShowcase.categories.aerial.title', 'AERIAL & DRONE'),
            desc: t('videoShowcase.categories.aerial.desc', 'Cinematic perspectives from the sky.'),
            client: t('videoShowcase.categories.aerial.client', 'Aerial Projects'),
            year: t('videoShowcase.categories.aerial.year', '2024'),
            tools: [
                { name: 'Premiere Pro', icon: '/gorseller/iconlar/premiere-pro.svg' },
                { name: 'After Effects', icon: '/gorseller/iconlar/after-effects.svg' }
            ],
            videos: [
                {
                    id: 5,
                    src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/v1776009326/Video/drone/vd1.mp4',
                    title: t('videoShowcase.categories.aerial.videos.v1', 'City Flyover')
                },
                {
                    id: 6,
                    src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/v1776009245/Video/drone/vd2.mp4',
                    title: t('videoShowcase.categories.aerial.videos.v2', 'Nature Shot')
                }
            ]
        }
    ], [t])

    return (
        <section className="pt-0 pb-10 md:py-32 overflow-hidden">
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

                        <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-[#F2F2F2]">
                            {t('videoShowcase.title', 'Video Showcase')}
                        </h2>

                        {/* Gradient Line Right */}
                        <div className="w-12 md:w-[60px] h-[1px] bg-gradient-to-r from-white/30 to-transparent" />
                    </div>
                </motion.div>

                {/* Mobile: Tabbed Interface */}
                <MobileVideoCarousel groups={groups} isMobileViewport={isMobileViewport} />

                {/* Desktop: Original Stacked Layout */}
                <DesktopVideoGroups groups={groups} isMobileViewport={isMobileViewport} />
            </div>
        </section>
    )
}
