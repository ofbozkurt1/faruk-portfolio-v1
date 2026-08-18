import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getAdaptiveRootMargin, useAutoSnapCarousel, useIsMobileViewport, usePrefersReducedMotion } from '../../hooks'

const DISABLE_VIDEO_MEDIA_FOR_PERF_TEST = true

const MOTION_POSTERS = [
    {
        title: 'Concert Poster Motion',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782292911/Yener-Cevik_cloud_eulj7c.webm',
        perfTestEnabled: true,
    },
    {
        title: 'DJ Poster Motion',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1782292990/Aykut_ara3dt.webm',
        perfTestEnabled: true,
    },
    {
        title: 'Personal Branding Motion',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1786795456/Fever_Party_Afi%C5%9F_son_0908_kc5ewv.webm',
        perfTestEnabled: true,
    },
    {
        title: 'Pearl White Party Motion',
        src: 'https://res.cloudinary.com/dncvyujpl/video/upload/v1787091869/White_Party_Son_01_Webm_uq3ykr.webm',
        perfTestEnabled: true,
    },
]

function playVideo(videoElement) {
    if (!videoElement) return
    const isPerfTestVideo = videoElement.dataset.perfTestVideo === 'true'
    if (DISABLE_VIDEO_MEDIA_FOR_PERF_TEST && !isPerfTestVideo) return
    const playPromise = videoElement.play()
    if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => { })
    }
}

function getOptimizedVideoSrc(src, isMobileViewport, qualityTier = 'neighbor') {
    if (!isMobileViewport || typeof src !== 'string') return src

    if (!src.includes('/q_auto/f_auto/')) {
        return src
    }

    if (qualityTier === 'active') {
        return src.replace('/q_auto/f_auto/', '/q_auto:good/f_auto/dpr_auto/w_720/')
    }

    return src.replace('/q_auto/f_auto/', '/q_auto:eco/f_auto/w_480/')
}

function useObservedVideoSet(itemCount, rootMargin, { eagerLoad = false, disablePlayback = false, disableViewportPause = false } = {}) {
    const [loaded, setLoaded] = useState(() => Array.from({ length: itemCount }, () => eagerLoad))
    const [inView, setInView] = useState(() => Array.from({ length: itemCount }, () => false))
    const cardRefs = useRef([])
    const videoRefs = useRef([])

    useEffect(() => {
        if (!eagerLoad) return
        setLoaded(Array.from({ length: itemCount }, () => true))
    }, [eagerLoad, itemCount])

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') {
            setLoaded(Array.from({ length: itemCount }, () => true))
            setInView(Array.from({ length: itemCount }, () => true))
            return undefined
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.getAttribute('data-motion-index'))
                    if (Number.isNaN(index)) return

                    setInView((previous) => {
                        if (previous[index] === entry.isIntersecting) return previous
                        const next = [...previous]
                        next[index] = entry.isIntersecting
                        return next
                    })

                    if (entry.isIntersecting) {
                        setLoaded((previous) => {
                            if (previous[index]) return previous
                            const next = [...previous]
                            next[index] = true
                            return next
                        })
                    }
                })
            },
            {
                threshold: 0.08,
                rootMargin,
            }
        )

        cardRefs.current.forEach((node, index) => {
            if (!node) return
            node.setAttribute('data-motion-index', String(index))
            observer.observe(node)
        })

        return () => observer.disconnect()
    }, [itemCount, rootMargin])

    useEffect(() => {
        if (disablePlayback) {
            videoRefs.current.forEach((videoElement) => {
                if (videoElement) {
                    videoElement.pause()
                }
            })
            return undefined
        }

        if (disableViewportPause) return undefined

        inView.forEach((visible, index) => {
            const videoElement = videoRefs.current[index]
            if (!videoElement) return
            if (visible) {
                playVideo(videoElement)
                return
            }
            videoElement.pause()
        })
        return undefined
    }, [disablePlayback, disableViewportPause, inView])

    useEffect(() => () => {
        videoRefs.current.forEach((videoElement) => {
            if (videoElement) {
                videoElement.pause()
            }
        })
    }, [])

    return { cardRefs, inView, loaded, videoRefs }
}

const PosterCard = memo(function PosterCard({
    activeIndex,
    disableHover,
    hoveredIndex,
    itemCount,
    index,
    isMobileViewport,
    prefersReducedMotion,
    setHoveredIndex,
    video,
    videoSet,
}) {
    const isHovered = !disableHover && hoveredIndex === index
    const shouldDim = !disableHover && hoveredIndex !== null && hoveredIndex !== index
    const isActiveMobile = isMobileViewport && index === activeIndex
    const isNeighborMobile = isMobileViewport && (
        index === (activeIndex - 1 + itemCount) % itemCount ||
        index === (activeIndex + 1) % itemCount
    )
    const mobileQualityTier = isActiveMobile ? 'active' : isNeighborMobile ? 'neighbor' : 'none'
    const isImage = video.type === 'image'
    const isPerfTestVideo = video.perfTestEnabled === true
    const shouldLoad = isPerfTestVideo && !prefersReducedMotion && (isMobileViewport ? mobileQualityTier !== 'none' : videoSet.loaded[index])
    const resolvedSrc = getOptimizedVideoSrc(video.src, isMobileViewport, mobileQualityTier)

    return (
        <article
            ref={(node) => {
                videoSet.cardRefs.current[index] = node
            }}
            onMouseEnter={disableHover ? undefined : () => setHoveredIndex(index)}
            className={[
                'relative aspect-[9/16] h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#090909]',
                'transform-gpu shadow-[0_24px_70px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out will-change-transform',
                isHovered ? 'scale-[1.03] opacity-100' : 'scale-100',
                shouldDim ? 'opacity-40' : 'opacity-100',
            ].join(' ')}
        >
            {isImage ? (
                <img
                    className="h-full w-full object-cover"
                    src={video.src}
                    alt={video.title}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                />
            ) : (
                <video
                    ref={(node) => {
                        videoSet.videoRefs.current[index] = node
                    }}
                    className="h-full w-full object-cover"
                    autoPlay={isPerfTestVideo && !prefersReducedMotion}
                    data-perf-test-video={isPerfTestVideo ? 'true' : undefined}
                    muted
                    loop
                    playsInline
                    preload={shouldLoad ? 'metadata' : 'none'}
                    src={shouldLoad ? resolvedSrc : undefined}
                    onLoadedData={() => {
                        if (!prefersReducedMotion && (!isMobileViewport || isActiveMobile)) {
                            playVideo(videoSet.videoRefs.current[index])
                        }
                    }}
                />
            )}

        </article>
    )
})

export default function MotionShowcase() {
    const { t } = useTranslation()
    const isMobileViewport = useIsMobileViewport()
    const prefersReducedMotion = usePrefersReducedMotion()
    const [posterHoveredIndex, setPosterHoveredIndex] = useState(null)
    const [posterActiveIndex, setPosterActiveIndex] = useState(0)
    const posterTrackRef = useRef(null)
    const intersectionRootMargin = isMobileViewport
        ? '300px 0px'
        : getAdaptiveRootMargin('200px 0px', '300px 0px')

    const posterVideoSet = useObservedVideoSet(MOTION_POSTERS.length, intersectionRootMargin, {
        disablePlayback: prefersReducedMotion,
        disableViewportPause: isMobileViewport,
    })

    const {
        handleScroll: handlePosterTrackScroll,
        onUserInteractEnd: onPosterTrackInteractEnd,
        onUserInteractStart: onPosterTrackInteractStart,
    } = useAutoSnapCarousel({
        containerRef: posterTrackRef,
        activeIndex: posterActiveIndex,
        setActiveIndex: setPosterActiveIndex,
        itemCount: MOTION_POSTERS.length,
        enabled: isMobileViewport,
        intervalMs: 5000,
        pauseAfterInteractionMs: 8000,
    })

    const handlePosterLeave = useCallback(() => {
        setPosterHoveredIndex(null)
    }, [])

    useEffect(() => {
        if (!isMobileViewport || prefersReducedMotion) return
        posterVideoSet.videoRefs.current.forEach((videoElement, index) => {
            if (!videoElement) return
            if (index === posterActiveIndex) {
                playVideo(videoElement)
                return
            }
            videoElement.pause()
        })
    }, [isMobileViewport, posterActiveIndex, posterVideoSet.loaded, posterVideoSet.videoRefs, prefersReducedMotion])

    return (
        <section id="motion-showcase" className="relative w-full pb-24 pt-12 md:pb-16 md:pt-14">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="mb-6 text-center md:mb-12">
                    <div className="mb-1 flex items-center justify-center gap-3 md:mb-4 md:gap-6">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/30 md:w-[60px]" />
                        <h2 className="text-2xl font-bold tracking-tight text-gray-100 md:text-5xl">
                            {t('motionShowcase.title', 'Hareketli Afişler')}
                        </h2>
                        <div className="h-px w-12 bg-gradient-to-r from-white/30 to-transparent md:w-[60px]" />
                    </div>
                    <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-400 md:text-base">
                        {t('motionShowcase.description')}
                    </p>
                </div>

                <div
                    ref={posterTrackRef}
                    className="touch-scroll-native -mx-4 flex gap-4 overflow-x-auto px-4 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0"
                    onMouseLeave={isMobileViewport ? undefined : handlePosterLeave}
                    onScroll={handlePosterTrackScroll}
                    onTouchStart={onPosterTrackInteractStart}
                    onTouchEnd={onPosterTrackInteractEnd}
                    onPointerDown={onPosterTrackInteractStart}
                    onPointerUp={onPosterTrackInteractEnd}
                    onWheel={() => {
                        onPosterTrackInteractStart()
                        onPosterTrackInteractEnd()
                    }}
                >
                    {MOTION_POSTERS.map((video, index) => (
                        <div key={video.src} className="w-[78vw] max-w-[340px] shrink-0 snap-center md:w-full md:max-w-none md:shrink md:snap-none">
                            <PosterCard
                                activeIndex={posterActiveIndex}
                                disableHover={isMobileViewport}
                                hoveredIndex={posterHoveredIndex}
                                itemCount={MOTION_POSTERS.length}
                                index={index}
                                isMobileViewport={isMobileViewport}
                                prefersReducedMotion={prefersReducedMotion}
                                setHoveredIndex={setPosterHoveredIndex}
                                video={video}
                                videoSet={posterVideoSet}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
