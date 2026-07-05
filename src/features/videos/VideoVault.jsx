/**
 * VideoVault Component
 * Mobile: Existing tabbed view
 * Desktop: Center-focus carousel with scoped video loading
 */

import { useRef, useEffect, memo, useState, useMemo, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getAdaptiveRootMargin, useIsMobileViewport, usePrefersReducedMotion } from '../../hooks'

const DISABLE_VIDEO_MEDIA_FOR_PERF_TEST = true

function getOptimizedVideoSrc(src, isMobileViewport) {
    if (typeof src !== 'string') return src
    if (isMobileViewport) {
        return src.replace('/q_auto/f_auto/', '/q_auto:eco,f_auto,w_540,c_limit/')
    }
    return src.replace('/q_auto/f_auto/', '/q_auto:eco,f_auto,w_720,c_limit/')
}

// Simple Video Card - Video data moved inside component for localization
// Simple Video Card - Memoized & Optimized
const VideoCard = memo(function VideoCard({
    forceLoad = false,
    isActive = false,
    isMobileViewport,
    video,
}) {
    const { t } = useTranslation()
    const prefersReducedMotion = usePrefersReducedMotion()
    const ref = useRef(null)
    const videoRef = useRef(null)
    const [shouldLoad, setShouldLoad] = useState(forceLoad)
    const viewportMargin = isMobileViewport
        ? '300px 0px'
        : getAdaptiveRootMargin('200px 0px', '300px 0px')
    const isInView = useInView(ref, { amount: 0.35, margin: viewportMargin })
    const resolvedSrc = getOptimizedVideoSrc(video.src, isMobileViewport)
    const isMediaEnabled = isMobileViewport || !DISABLE_VIDEO_MEDIA_FOR_PERF_TEST
    const shouldAttachSource = isMediaEnabled && !prefersReducedMotion && shouldLoad

    useEffect(() => {
        if (!isMediaEnabled || prefersReducedMotion) {
            setShouldLoad(false)
            return
        }
        if (forceLoad) {
            setShouldLoad(true)
            return
        }
        if (isInView) {
            setShouldLoad(true)
        }
    }, [forceLoad, isInView, isMediaEnabled, prefersReducedMotion])

    useEffect(() => {
        if (!videoRef.current) return
        if (!isMediaEnabled) {
            videoRef.current.pause()
            return
        }
        if (prefersReducedMotion) {
            videoRef.current.pause()
            return
        }
        if (isMobileViewport) {
            if (isActive && shouldLoad) {
                videoRef.current.play().catch(() => { })
                return
            }
            videoRef.current.pause()
            return
        }
        if (isInView) {
            videoRef.current.play().catch(() => { })
        } else {
            videoRef.current.pause()
        }
  }, [isActive, isInView, isMediaEnabled, isMobileViewport, prefersReducedMotion, shouldLoad])

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
                src={shouldAttachSource ? resolvedSrc : undefined}
                autoPlay={shouldAttachSource && isActive}
                controls={false}
                muted
                loop
                playsInline
                preload={shouldAttachSource ? (isMobileViewport ? 'metadata' : 'auto') : 'none'}
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
                    <svg className={`absolute inset-0 w-14 h-14 ${prefersReducedMotion ? '' : 'animate-[spin_8s_linear_infinite]'}`} viewBox="0 0 100 100">
                        <defs>
                            <path id="videoCirclePath" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                        </defs>
                        <text className="fill-white/50" style={{ fontSize: '9px', letterSpacing: '0.12em', fontWeight: 500 }}>
                            <textPath href="#videoCirclePath">
                                {t('videoShowcase.holdToWatch')}
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
                animate={{ opacity: (isMobileViewport ? isActive : isInView) ? 0 : 1 }}
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

// ============ MOBILE UNIFIED CAROUSEL ============
function MobileVideoCarousel({ groups, isMobileViewport }) {
    const { t } = useTranslation()
    const prefersReducedMotion = usePrefersReducedMotion()
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
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        })
    }, [prefersReducedMotion])

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

    // Auto-advance disabled on mobile for better scroll performance
    useEffect(() => {
        return undefined
    }, [])

    /*
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
    */

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
                    aria-label={t('videoShowcase.previousVideo')}
                    className="absolute -left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-start opacity-50 transition-transform active:scale-90"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                {/* Right Arrow - Overlay, Subtle */}
                <button
                    onClick={goToNext}
                    aria-label={t('videoShowcase.nextVideo')}
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
                    {allVideos.map((video, idx) => {
                        const isActive = idx === activeIndex
                        const isNeighbor = idx === activeIndex - 1 || idx === activeIndex + 1
                        const isLoopNeighbor =
                            (activeIndex === 0 && idx === allVideos.length - 1) ||
                            (activeIndex === allVideos.length - 1 && idx === 0)

                        return (
                        <div
                            key={video.id}
                            className="flex-shrink-0 snap-center w-full px-2"
                        >
                            <VideoCard
                                forceLoad={isActive || isNeighbor || isLoopNeighbor}
                                isActive={isActive}
                                isMobileViewport={isMobileViewport}
                                video={video}
                            />
                        </div>
                    )})}
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

const DESKTOP_CAROUSEL_VARIANTS = {
    hiddenLeft: { left: '-15%', x: '-50%', y: '-50%', scale: 0.72, opacity: 0, zIndex: 0, filter: 'brightness(0.45)' },
    left: { left: '20%', x: '-50%', y: '-50%', scale: 0.82, opacity: 0.55, zIndex: 1, filter: 'brightness(0.62)' },
    center: { left: '50%', x: '-50%', y: '-50%', scale: 1, opacity: 1, zIndex: 3, filter: 'brightness(1)' },
    right: { left: '80%', x: '-50%', y: '-50%', scale: 0.82, opacity: 0.55, zIndex: 1, filter: 'brightness(0.62)' },
    hiddenRight: { left: '115%', x: '-50%', y: '-50%', scale: 0.72, opacity: 0, zIndex: 0, filter: 'brightness(0.45)' },
}

function getDesktopCarouselPosition(index, activeIndex, itemCount) {
    let offset = index - activeIndex

    if (offset > itemCount / 2) offset -= itemCount
    if (offset < -itemCount / 2) offset += itemCount

    if (offset === -1) return 'left'
    if (offset === 0) return 'center'
    if (offset === 1) return 'right'
    return offset < -1 ? 'hiddenLeft' : 'hiddenRight'
}

const DesktopCarouselVideo = memo(function DesktopCarouselVideo({
    isActivated,
    isPlaybackActive,
    position,
    prefersReducedMotion,
    video,
}) {
    const videoRef = useRef(null)
    const isVisible = position === 'left' || position === 'center' || position === 'right'
    const shouldAttachSource = isActivated && !prefersReducedMotion
    const shouldPlay = shouldAttachSource && isPlaybackActive && isVisible
    const isActive = position === 'center'
    const resolvedSrc = getOptimizedVideoSrc(video.src, false)

    useEffect(() => {
        const videoElement = videoRef.current
        if (!videoElement) return

        if (shouldPlay) {
            videoElement.play().catch(() => { })
            return
        }

        videoElement.pause()
    }, [shouldPlay])

    return (
        <motion.article
            initial={false}
            animate={position}
            variants={DESKTOP_CAROUSEL_VARIANTS}
            transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden={!isVisible}
            className={[
                'absolute left-1/2 top-1/2 aspect-[9/16] w-[32vw] min-w-[250px] max-w-[380px] overflow-hidden rounded-md bg-[#090909] transform-gpu',
                isVisible ? 'pointer-events-auto will-change-transform' : 'pointer-events-none',
                isActive
                    ? 'shadow-[0_30px_85px_rgba(0,0,0,0.72),inset_0_0_0_1px_rgba(255,255,255,0.10)]'
                    : 'shadow-[0_24px_70px_rgba(0,0,0,0.58),inset_0_0_0_1px_rgba(255,255,255,0.06)]',
            ].join(' ')}
        >
            <video
                ref={videoRef}
                className={`h-full w-full ${isActive ? 'object-contain object-center' : 'object-cover object-center'}`}
                src={shouldAttachSource ? resolvedSrc : undefined}
                autoPlay={shouldPlay}
                muted
                loop
                playsInline
                preload={shouldAttachSource ? 'metadata' : 'none'}
                onCanPlay={() => {
                    if (shouldPlay) {
                        videoRef.current?.play().catch(() => { })
                    }
                }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent px-5 pb-5 pt-20">
                <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
                    {video.groupLabel}
                </span>
                <span className="mt-1 block text-sm font-medium text-white/90">
                    {video.title}
                </span>
            </div>
        </motion.article>
    )
})

// ============ DESKTOP CENTER-FOCUS CAROUSEL ============
function DesktopVideoCarousel({ groups, isMobileViewport }) {
    const { t } = useTranslation()
    const prefersReducedMotion = usePrefersReducedMotion()
    const carouselRef = useRef(null)
    const backgroundPreloadCancelledRef = useRef(false)
    const backgroundPreloadCompletedRef = useRef(false)
    const transitionTimeoutRef = useRef(null)
    const isTransitioningRef = useRef(false)
    const [activeIndex, setActiveIndex] = useState(1)
    const [activatedVideoIds, setActivatedVideoIds] = useState(() => new Set())
    const [isPaused, setIsPaused] = useState(false)
    const [isPageVisible, setIsPageVisible] = useState(() => document.visibilityState === 'visible')
    const isNearViewport = useInView(carouselRef, { amount: 0.08, margin: '350px 0px' })
    const isInViewport = useInView(carouselRef, { amount: 0.2, margin: '0px' })
    const allVideos = useMemo(
        () =>
            groups.flatMap((group) =>
                group.videos.map((video) => ({ ...video, groupLabel: group.tabLabel }))
            ),
        [groups]
    )

    const navigate = useCallback((step) => {
        if (allVideos.length < 2 || isTransitioningRef.current) return

        setActiveIndex((current) => (current + step + allVideos.length) % allVideos.length)

        if (prefersReducedMotion) return

        isTransitioningRef.current = true
        transitionTimeoutRef.current = window.setTimeout(() => {
            isTransitioningRef.current = false
            transitionTimeoutRef.current = null
        }, 680)
    }, [allVideos.length, prefersReducedMotion])

    const goToPrevious = useCallback(() => navigate(-1, true), [navigate])
    const goToNext = useCallback(() => navigate(1, true), [navigate])

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsPageVisible(document.visibilityState === 'visible')
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
    }, [])

    useEffect(() => {
        if (isNearViewport) {
            backgroundPreloadCancelledRef.current = true
            return undefined
        }

        if (
            backgroundPreloadCancelledRef.current ||
            backgroundPreloadCompletedRef.current ||
            isMobileViewport ||
            prefersReducedMotion ||
            allVideos.length === 0
        ) {
            return undefined
        }

        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
        const isConstrainedConnection = connection?.saveData === true ||
            connection?.effectiveType === 'slow-2g' ||
            connection?.effectiveType === '2g'

        if (isConstrainedConnection) return undefined

        let idleCallbackId = null
        let idleFallbackId = null
        let isCancelled = false

        const activateInitialVideos = () => {
            if (isCancelled || backgroundPreloadCancelledRef.current) return

            const initialVideoIds = allVideos.slice(0, 3).map((video) => video.id)
            setActivatedVideoIds((previous) => {
                const next = new Set(previous)
                initialVideoIds.forEach((videoId) => next.add(videoId))
                return next
            })
            backgroundPreloadCompletedRef.current = true
        }

        const delayId = window.setTimeout(() => {
            if (isCancelled || backgroundPreloadCancelledRef.current) return

            const currentConnection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
            const shouldSkipPreload = currentConnection?.saveData === true ||
                currentConnection?.effectiveType === 'slow-2g' ||
                currentConnection?.effectiveType === '2g'

            if (shouldSkipPreload) return

            if (typeof window.requestIdleCallback === 'function') {
                idleCallbackId = window.requestIdleCallback(activateInitialVideos, { timeout: 2000 })
                return
            }

            idleFallbackId = window.setTimeout(activateInitialVideos, 0)
        }, 6000)

        return () => {
            isCancelled = true
            window.clearTimeout(delayId)
            if (idleCallbackId !== null && typeof window.cancelIdleCallback === 'function') {
                window.cancelIdleCallback(idleCallbackId)
            }
            if (idleFallbackId !== null) {
                window.clearTimeout(idleFallbackId)
            }
        }
    }, [allVideos, isMobileViewport, isNearViewport, prefersReducedMotion])

    useEffect(() => {
        if (!isNearViewport || prefersReducedMotion || allVideos.length === 0) return

        const visibleIndexes = [
            (activeIndex - 1 + allVideos.length) % allVideos.length,
            activeIndex,
            (activeIndex + 1) % allVideos.length,
        ]

        setActivatedVideoIds((previous) => {
            const next = new Set(previous)
            let changed = false

            visibleIndexes.forEach((index) => {
                const videoId = allVideos[index].id
                if (!next.has(videoId)) {
                    next.add(videoId)
                    changed = true
                }
            })

            return changed ? next : previous
        })
    }, [activeIndex, allVideos, isNearViewport, prefersReducedMotion])

    useEffect(() => {
        if (
            !isInViewport ||
            !isPageVisible ||
            prefersReducedMotion ||
            isPaused ||
            allVideos.length < 2
        ) {
            return undefined
        }

        const timeoutId = window.setTimeout(() => {
            setActiveIndex((current) => (current + 1) % allVideos.length)
        }, 4000)
        return () => window.clearTimeout(timeoutId)
    }, [activeIndex, allVideos.length, isInViewport, isPageVisible, isPaused, prefersReducedMotion])

    useEffect(() => () => {
        if (transitionTimeoutRef.current) {
            window.clearTimeout(transitionTimeoutRef.current)
        }
    }, [])

    return (
        <div
            ref={carouselRef}
            className="hidden md:block"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="relative min-h-[690px]">
                <div className="absolute inset-0 overflow-hidden">
                    {allVideos.map((video, index) => (
                        <DesktopCarouselVideo
                            key={video.id}
                            isActivated={activatedVideoIds.has(video.id)}
                            isPlaybackActive={isInViewport && isPageVisible}
                            position={getDesktopCarouselPosition(index, activeIndex, allVideos.length)}
                            prefersReducedMotion={prefersReducedMotion}
                            video={video}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label={t('videoShowcase.previousVideo')}
                    title={t('videoShowcase.previousVideo')}
                    className="absolute -left-2 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white/75 transition-colors hover:border-white/45 hover:bg-black hover:text-white"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <button
                    type="button"
                    onClick={goToNext}
                    aria-label={t('videoShowcase.nextVideo')}
                    title={t('videoShowcase.nextVideo')}
                    className="absolute -right-2 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white/75 transition-colors hover:border-white/45 hover:bg-black hover:text-white"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            <div className="mt-8 flex items-center justify-center" aria-hidden="true">
                <div className="flex items-center gap-2">
                    {allVideos.map((video, index) => (
                        <span
                            key={video.id}
                            className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-7 bg-white' : 'w-1.5 bg-white/25'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

// ============ MAIN COMPONENT ============
export default function VideoVault() {
    const { t } = useTranslation()
    const isMobileViewport = useIsMobileViewport()

    const groups = useMemo(() => [
        {
            id: 'showcase',
            tabLabel: t('videoShowcase.eyebrow'),
            videos: [
                {
                    id: 1,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293072/EXPORT_01_Ala_8_May%C4%B1s_Video-mp4_1_1080p_60fps_vp9_2mbps_gyvsug.webm',
                    title: t('videoShowcase.videos.video01')
                },
                {
                    id: 2,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293107/EXPORT_11_Tabiat_Anaokulu_23_Nisan-mp4_1_1080p_60fps_vp9_2mbps_ilz3ri.webm',
                    title: t('videoShowcase.videos.video02')
                },
                {
                    id: 3,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293087/EXPORT_15_vd1-mp4_1_1080p_60fps_vp9_2mbps_mxbxen.webm',
                    title: t('videoShowcase.videos.video03')
                },
                {
                    id: 4,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293132/EXPORT_04_Efendy_Medya_%C4%B0%C3%A7erik_1-mp4_1_1080p_60fps_vp9_2mbps_cggkvj.webm',
                    title: t('videoShowcase.videos.video04')
                },
                {
                    id: 5,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293143/EXPORT_19_Zeylandrealty_Video_2-mp4_1_1080p_60fps_vp9_2mbps_bjcria.webm',
                    title: t('videoShowcase.videos.video05')
                },
                {
                    id: 6,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293074/EXPORT_09_mvideo3-mp4_1_1080p_60fps_vp9_2mbps_icjczx.webm',
                    title: t('videoShowcase.videos.video06')
                },
                {
                    id: 7,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293036/EXPORT_03_Bungalov_tan%C4%B1t%C4%B1m_fix-mp4_1_1080p_60fps_vp9_2mbps_couvk3.webm',
                    title: t('videoShowcase.videos.video07')
                },
                {
                    id: 8,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293133/EXPORT_18_vd2-mp4_1_1080p_60fps_vp9_2mbps_emekvb.webm',
                    title: t('videoShowcase.videos.video08')
                },
                {
                    id: 9,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293081/EXPORT_06_Emlak_Du%CC%88nyas%C4%B1_Acar_City__1_-mp4_1_1080p_60fps_vp9_2mbps_f5npwo.webm',
                    title: t('videoShowcase.videos.video09')
                },
                {
                    id: 10,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293072/EXPORT_02_Ala_Video_2-mp4_1_1080p_60fps_vp9_2mbps_qznati.webm',
                    title: t('videoShowcase.videos.video10')
                },
                {
                    id: 11,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293046/EXPORT_16_vd2_1_-mp4_1080p_60fps_vp9_2mbps_biyzcp.webm',
                    title: t('videoShowcase.videos.video11')
                },
                {
                    id: 12,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293036/EXPORT_12_Turuncu_Kasa_Gu%CC%88nes%CC%A7_U%CC%88ru%CC%88nleri__1_-mp4_1_1080p_60fps_vp9_2mbps_awthte.webm',
                    title: t('videoShowcase.videos.video12')
                },
                {
                    id: 13,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293038/EXPORT_05_Eksen_Dis%CC%A7_2_May%C4%B1s_Video-mp4_1_1080p_60fps_vp9_2mbps_as6fkn.webm',
                    title: t('videoShowcase.videos.video13')
                },
                {
                    id: 14,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293107/EXPORT_17_vd2_2_-mp4_1_1080p_60fps_vp9_2mbps_cdvupr.webm',
                    title: t('videoShowcase.videos.video14')
                },
                {
                    id: 15,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293040/EXPORT_07_Legend_1__1_-mp4_1_1080p_60fps_vp9_2mbps_d12y8k.webm',
                    title: t('videoShowcase.videos.video15')
                },
                {
                    id: 16,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293099/EXPORT_13_vd1_1_-mp4_1_1080p_60fps_vp9_2mbps_wc1k3v.webm',
                    title: t('videoShowcase.videos.video16')
                },
                {
                    id: 17,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293111/EXPORT_08_mvideo2-mp4_1_1080p_60fps_vp9_2mbps_byezt5.webm',
                    title: t('videoShowcase.videos.video17')
                },
                {
                    id: 18,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293067/EXPORT_14_vd1_2_-mp4_1_1080p_60fps_vp9_2mbps_oppf3h.webm',
                    title: t('videoShowcase.videos.video18')
                },
                {
                    id: 19,
                    src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782293143/EXPORT_19_Zeylandrealty_Video_2-mp4_1_1080p_60fps_vp9_2mbps_bjcria.webm',
                    title: t('videoShowcase.videos.video19')
                }
            ]
        }
    ], [t])

    return (
        <section className="pt-0 pb-10 md:pb-32 md:pt-12 overflow-hidden">
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
                            {t('videoShowcase.title')}
                        </h2>

                        {/* Gradient Line Right */}
                        <div className="w-12 md:w-[60px] h-[1px] bg-gradient-to-r from-white/30 to-transparent" />
                    </div>
                    <p className="mx-auto hidden max-w-2xl text-sm leading-relaxed text-white/50 md:block md:text-base">
                        {t('videoShowcase.description')}
                    </p>
                </motion.div>

                {isMobileViewport ? (
                    <MobileVideoCarousel groups={groups} isMobileViewport={isMobileViewport} />
                ) : (
                    <DesktopVideoCarousel groups={groups} isMobileViewport={isMobileViewport} />
                )}
            </div>
        </section>
    )
}
