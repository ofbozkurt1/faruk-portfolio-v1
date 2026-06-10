import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../../data/projects'
import { cn } from '../../utils/cn'
import { useIsMobileViewport, useNearViewport, usePrefersReducedMotion } from '../../hooks'

export default function StackView({ onProjectClick, className }) {
    const { t } = useTranslation()
    const prefersReducedMotion = usePrefersReducedMotion()
    const [activeIndex, setActiveIndex] = useState(0)
    const isMobile = useIsMobileViewport()
    const { ref: viewportRef, isNearViewport: isPortfolioVisible } = useNearViewport({
        enabled: isMobile,
        initialInView: false,
        once: false,
        rootMargin: '0px',
        threshold: 0.1,
    })
    const [activatedProjectIds, setActivatedProjectIds] = useState(() => new Set())
    const scrollContainerRef = useRef(null)
    const isTouchingRef = useRef(false)
    const touchStartX = useRef(0)

    useEffect(() => {
        if (!isMobile || PROJECTS.length === 0) return

        const nearbyIndexes = [
            (activeIndex - 1 + PROJECTS.length) % PROJECTS.length,
            activeIndex,
            (activeIndex + 1) % PROJECTS.length,
        ]

        setActivatedProjectIds((previous) => {
            const next = new Set(previous)
            let changed = false

            nearbyIndexes.forEach((index) => {
                const projectId = PROJECTS[index]?.id
                if (projectId && !next.has(projectId)) {
                    next.add(projectId)
                    changed = true
                }
            })

            return changed ? next : previous
        })
    }, [activeIndex, isMobile])

    // Handle touch for loop detection
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX
        isTouchingRef.current = true
    }

    const handleTouchEnd = (e) => {
        isTouchingRef.current = false
        const touchEndX = e.changedTouches[0].clientX
        const swipeDistance = touchStartX.current - touchEndX // Positive = swipe left (forward)

        // If on last project and swiped left (trying to go forward), loop to start
        if (activeIndex >= PROJECTS.length - 1 && swipeDistance > 50) {
            setTimeout(() => {
                scrollContainerRef.current?.scrollTo({ left: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
            }, 100)
        }
    }

    // Simple Scroll Listener - Just track active index for dots
    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container || !isMobile) return

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft
            const width = container.offsetWidth
            const gap = 64
            const stride = width + gap

            if (width === 0) return
            const index = Math.round(scrollLeft / stride)
            setActiveIndex(Math.min(index, PROJECTS.length - 1))
        }

        container.addEventListener('scroll', handleScroll, { passive: true })
        return () => container.removeEventListener('scroll', handleScroll)
    }, [isMobile])

    // Simple Next Slide - With Loop
    const handleNextSlide = useCallback(() => {
        if (!scrollContainerRef.current) return
        const container = scrollContainerRef.current
        const width = container.offsetWidth
        const gap = 64

        // If at last slide, go back to start
        if (activeIndex >= PROJECTS.length - 1) {
            container.scrollTo({ left: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
        } else {
            container.scrollBy({ left: width + gap, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
        }
    }, [activeIndex, prefersReducedMotion])

    const handleProjectInteraction = useCallback((active) => {
        isTouchingRef.current = active
    }, [])

    // Auto Play (Mobile Only) - Simple Loop
    useEffect(() => {
        if (!isMobile || !isPortfolioVisible || prefersReducedMotion) return

        const interval = setInterval(() => {
            if (!isTouchingRef.current) {
                handleNextSlide()
            }
        }, 3000)

        return () => clearInterval(interval)
    }, [isMobile, isPortfolioVisible, handleNextSlide, prefersReducedMotion])

    return (
        <div ref={viewportRef} className={cn("relative w-full", className)}>
            <div
                ref={scrollContainerRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className={cn(
                    // Mobile: Simple Horizontal Scroll
                    "touch-scroll-native flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide pb-32",
                    "gap-16 px-4 -mx-4",

                    // Desktop: Vertical Stack
                    "md:flex-col md:overflow-visible md:pb-0 md:gap-40 md:block",
                    "md:max-w-6xl md:mx-auto md:px-4 lg:px-0"
                )}
            >
                {PROJECTS.map((project, index) => (
                    <div
                        key={project.id}
                        className={cn(
                            // Mobile
                            "min-w-[100vw] flex-shrink-0 snap-center flex justify-center items-start pt-0 px-0",
                            // Desktop
                            "md:min-w-0 md:w-auto md:flex-shrink-1 md:snap-align-none md:block md:p-0 md:mb-40"
                        )}
                        style={{ marginBottom: (!isMobile && index === PROJECTS.length - 1) ? 0 : undefined }}
                    >
                        <ProjectCard
                            project={project}
                            onClick={onProjectClick}
                            cardIndex={index}
                            isReversed={index % 2 === 1}
                            isMobileViewport={isMobile}
                            loadMedia={!isMobile || activatedProjectIds.has(project.id)}
                            onInteraction={handleProjectInteraction}
                            priority={isMobile && index === activeIndex}
                        />
                    </div>
                ))}
            </div>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    "absolute left-1/2 -translate-x-1/2 md:hidden z-20 flex flex-row items-center gap-3",
                    "bottom-0"
                )}
            >
                {/* Dots */}
                <div className="flex items-center gap-2 px-4 h-9 rounded-full bg-zinc-900 border border-white/10 shadow-lg">
                    {PROJECTS.map((project, index) => (
                        <div
                            key={project.id}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                activeIndex === index
                                    ? "w-6 bg-white"
                                    : "w-1.5 bg-white/30"
                            )}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNextSlide}
                    className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900 px-4 py-2 shadow-lg transition-transform active:scale-95"
                >
                    <span className="text-[10px] font-medium text-white/80 tracking-widest uppercase">{t('common.swipe')}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
