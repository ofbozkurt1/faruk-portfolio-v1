import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { getAdaptiveRootMargin, useAutoSnapCarousel, useIsMobileViewport } from '../../hooks'

const MOTION_POSTERS = [
    {
        title: 'Concert Poster Motion',
        src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/v1775554525/Yener_%C3%87evik_Konser_Afi%C5%9Fi_Motion_nprqao.mp4',
    },
    {
        title: 'DJ Poster Motion',
        src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/v1775554553/Aykut_Elmas_Dj_Afi%C5%9Fi_Main_bp2xha.mp4',
    },
    {
        title: 'Personal Branding Motion',
        src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/v1775554690/Kendini_Pazarlama_Sanat_yl21ua.mp4',
    },
]

const FEATURED_MOTION_VIDEOS = [
    {
        title: 'Motion Video 1',
        src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/Motion/mvideo1.mp4',
    },
    {
        title: 'Motion Video 2',
        src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/Motion/mvideo2.mp4',
    },
    {
        title: 'Motion Video 3',
        src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/Motion/mvideo3.mp4',
    },
]

function playVideo(videoElement) {
    if (!videoElement) return
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

function useObservedVideoSet(itemCount, rootMargin, { eagerLoad = false, disableViewportPause = false } = {}) {
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
    }, [disableViewportPause, inView])

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
    const shouldLoad = isMobileViewport ? mobileQualityTier !== 'none' : videoSet.loaded[index]
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
            <video
                ref={(node) => {
                    videoSet.videoRefs.current[index] = node
                }}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload={shouldLoad ? (isActiveMobile ? 'auto' : isMobileViewport ? 'metadata' : 'auto') : 'none'}
                src={shouldLoad ? resolvedSrc : undefined}
                onLoadedData={() => {
                    if (!isMobileViewport || isActiveMobile) {
                        playVideo(videoSet.videoRefs.current[index])
                    }
                }}
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-xs tracking-[0.22em] text-gray-200">{video.title.toUpperCase()}</p>
            </div>
        </article>
    )
})

const FeaturedVideoCard = memo(function FeaturedVideoCard({
    activeIndex,
    index,
    isMobileViewport,
    itemCount,
    video,
    videoSet,
}) {
    const isActiveMobile = isMobileViewport && index === activeIndex
    const isNeighborMobile = isMobileViewport && (
        index === (activeIndex - 1 + itemCount) % itemCount ||
        index === (activeIndex + 1) % itemCount
    )
    const mobileQualityTier = isActiveMobile ? 'active' : isNeighborMobile ? 'neighbor' : 'none'
    const shouldLoad = isMobileViewport ? mobileQualityTier !== 'none' : videoSet.loaded[index]
    const resolvedSrc = getOptimizedVideoSrc(video.src, isMobileViewport, mobileQualityTier)

    return (
        <article
            ref={(node) => {
                videoSet.cardRefs.current[index] = node
            }}
            className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#090909] shadow-[0_24px_70px_rgba(0,0,0,0.45)] transform-gpu transition-transform duration-300 will-change-transform md:hover:scale-[1.01]"
        >
            <video
                ref={(node) => {
                    videoSet.videoRefs.current[index] = node
                }}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload={shouldLoad ? (isActiveMobile ? 'auto' : isMobileViewport ? 'metadata' : 'auto') : 'none'}
                src={shouldLoad ? resolvedSrc : undefined}
                onLoadedData={() => {
                    if (!isMobileViewport || isActiveMobile) {
                        playVideo(videoSet.videoRefs.current[index])
                    }
                }}
            />
        </article>
    )
})

export default function MotionShowcase() {
    const isMobileViewport = useIsMobileViewport()
    const [posterHoveredIndex, setPosterHoveredIndex] = useState(null)
    const [posterActiveIndex, setPosterActiveIndex] = useState(0)
    const [featuredActiveIndex, setFeaturedActiveIndex] = useState(0)
    const posterTrackRef = useRef(null)
    const featuredTrackRef = useRef(null)
    const intersectionRootMargin = isMobileViewport
        ? '300px 0px'
        : getAdaptiveRootMargin('200px 0px', '300px 0px')

    const posterVideoSet = useObservedVideoSet(MOTION_POSTERS.length, intersectionRootMargin, {
        disableViewportPause: isMobileViewport,
    })
    const featuredVideoSet = useObservedVideoSet(FEATURED_MOTION_VIDEOS.length, intersectionRootMargin, {
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

    const {
        handleScroll: handleFeaturedTrackScroll,
        onUserInteractEnd: onFeaturedTrackInteractEnd,
        onUserInteractStart: onFeaturedTrackInteractStart,
    } = useAutoSnapCarousel({
        containerRef: featuredTrackRef,
        activeIndex: featuredActiveIndex,
        setActiveIndex: setFeaturedActiveIndex,
        itemCount: FEATURED_MOTION_VIDEOS.length,
        enabled: isMobileViewport,
        intervalMs: 5000,
        pauseAfterInteractionMs: 8000,
    })

    const handlePosterLeave = useCallback(() => {
        setPosterHoveredIndex(null)
    }, [])

    useEffect(() => {
        if (!isMobileViewport) return
        posterVideoSet.videoRefs.current.forEach((videoElement, index) => {
            if (!videoElement) return
            if (index === posterActiveIndex) {
                playVideo(videoElement)
                return
            }
            videoElement.pause()
        })
    }, [isMobileViewport, posterActiveIndex, posterVideoSet.loaded, posterVideoSet.videoRefs])

    useEffect(() => {
        if (!isMobileViewport) return
        featuredVideoSet.videoRefs.current.forEach((videoElement, index) => {
            if (!videoElement) return
            if (index === featuredActiveIndex) {
                playVideo(videoElement)
                return
            }
            videoElement.pause()
        })
    }, [featuredActiveIndex, featuredVideoSet.loaded, featuredVideoSet.videoRefs, isMobileViewport])

    return (
        <section id="motion-showcase" className="relative w-full pb-24 pt-12 md:pb-32 md:pt-14">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="mb-8 text-center md:mb-14">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-100 md:text-6xl">{'Hareketli Tasar\u0131mlar'}</h2>
                    <p className="mx-auto mt-4 max-w-3xl text-sm tracking-wide text-gray-400 md:text-base">
                        {'Kayd\u0131rma tetiklemeli, CDN destekli motion i\u00e7erikleri ile ak\u0131c\u0131 ve premium bir video vitrini.'}
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
                                setHoveredIndex={setPosterHoveredIndex}
                                video={video}
                                videoSet={posterVideoSet}
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-14 md:mt-24">
                    <div className="mb-8 text-center md:mb-10">
                        <h3 className="text-3xl font-bold tracking-tight text-gray-100 md:text-6xl">{'D\u0130NAM\u0130K V\u0130DEOLAR'}</h3>
                        <p className="mx-auto mt-4 max-w-3xl text-sm tracking-wide text-gray-400 md:text-base">
                            {'Y\u00fcksek bitrate motion \u00e7al\u0131\u015fmalar\u0131n\u0131n optimize CDN teslimi'}
                        </p>
                    </div>

                    <div
                        ref={featuredTrackRef}
                        className="touch-scroll-native -mx-4 flex gap-4 overflow-x-auto px-4 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0"
                        onScroll={handleFeaturedTrackScroll}
                        onTouchStart={onFeaturedTrackInteractStart}
                        onTouchEnd={onFeaturedTrackInteractEnd}
                        onPointerDown={onFeaturedTrackInteractStart}
                        onPointerUp={onFeaturedTrackInteractEnd}
                        onWheel={() => {
                            onFeaturedTrackInteractStart()
                            onFeaturedTrackInteractEnd()
                        }}
                    >
                        {FEATURED_MOTION_VIDEOS.map((video, index) => (
                            <div key={video.src} className="w-[78vw] max-w-[340px] shrink-0 snap-center md:w-full md:max-w-none md:shrink md:snap-none">
                                <FeaturedVideoCard
                                    activeIndex={featuredActiveIndex}
                                    index={index}
                                    isMobileViewport={isMobileViewport}
                                    itemCount={FEATURED_MOTION_VIDEOS.length}
                                    video={video}
                                    videoSet={featuredVideoSet}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
