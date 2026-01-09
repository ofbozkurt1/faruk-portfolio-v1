import { useState, useRef, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../../data/projects'
import { cn } from '../../utils/cn'

export default function StackView({ onProjectClick, className }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const scrollContainerRef = useRef(null)
    const timeoutRef = useRef(null)
    const isTouchingRef = useRef(false)

    // Check mobile state
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Prepare list for Infinite Scroll (Mobile Only)
    // Add Clone of First Project to the end
    const displayProjects = isMobile
        ? [...PROJECTS, { ...PROJECTS[0], id: `clone-${PROJECTS[0].id}`, isClone: true }]
        : PROJECTS

    // Scroll Listener Logic
    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container || !isMobile) return

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft
            const width = container.offsetWidth
            const gap = 64 // gap-16 (4rem)
            const stride = width + gap

            if (width === 0) return

            const rawIndex = Math.round(scrollLeft / stride)

            // Adjust active dot index
            setActiveIndex(rawIndex % PROJECTS.length)

            // INFINITE LOOP RESET LOGIC
            // Only reset if:
            // 1. We actally reached the Clone position (precise pixel check)
            // 2. User is NOT touching (don't interrupt swipe)
            const clonePosition = stride * PROJECTS.length
            const isAtClone = Math.abs(scrollLeft - clonePosition) < 10

            if (isAtClone && !isTouchingRef.current) {
                if (timeoutRef.current) clearTimeout(timeoutRef.current)
                timeoutRef.current = setTimeout(() => {
                    // Instantly, silently jump to real first item (index 0)
                    container.scrollTo({ left: 0, behavior: 'auto' })
                }, 50)
            }
        }

        container.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            container.removeEventListener('scroll', handleScroll)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [isMobile])

    // Manual / Auto Slide Logic
    const handleNextSlide = () => {
        if (!scrollContainerRef.current) return
        const container = scrollContainerRef.current
        const width = container.offsetWidth
        const gap = 64 // gap-16

        container.scrollBy({ left: width + gap, behavior: 'smooth' })
    }

    // Auto Play (Mobile Only)
    useEffect(() => {
        if (!isMobile) return
        const interval = setInterval(() => {
            // Only auto-scroll if user is not touching
            if (!isTouchingRef.current) {
                handleNextSlide()
            }
        }, 2500)
        return () => clearInterval(interval)
    }, [isMobile, activeIndex])

    return (
        <div className={cn("relative w-full", className)}>
            <div
                ref={scrollContainerRef}
                onTouchStart={() => { isTouchingRef.current = true }}
                onTouchEnd={() => { isTouchingRef.current = false }}
                className={cn(
                    // Mobile: Snap Scroll
                    "flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide pb-32",
                    "gap-16 px-4 -mx-4",

                    // Desktop: Reset to Vertical Stack
                    "md:flex-col md:overflow-visible md:pb-0 md:gap-40 md:block",
                    "md:max-w-6xl md:mx-auto md:px-4 lg:px-0"
                )}
            >
                {displayProjects.map((project, index) => {
                    // Correct index for props (handle clone)
                    const realIndex = index % PROJECTS.length

                    return (
                        <div
                            key={project.id}
                            className={cn(
                                // Mobile Wrapper
                                "min-w-[100vw] flex-shrink-0 snap-center flex justify-center items-start pt-0 px-0",
                                // Desktop Wrapper
                                "md:min-w-0 md:w-auto md:flex-shrink-1 md:snap-align-none md:block md:p-0 md:mb-40"
                            )}
                            style={{ marginBottom: (!isMobile && index === PROJECTS.length - 1) ? 0 : undefined }}
                        >
                            <ProjectCard
                                project={project}
                                onClick={onProjectClick}
                                cardIndex={realIndex} // Use real index for direction/colors
                                isReversed={realIndex % 2 === 1}
                                onInteraction={(isActive) => { isTouchingRef.current = isActive }}
                            />
                        </div>
                    )
                })}
            </div>

            {/* Mobile Navigation Indicator */}
            <div
                className={cn(
                    "absolute left-1/2 -translate-x-1/2 md:hidden z-20 flex flex-row items-center gap-3 transition-all duration-500 ease-in-out",
                    "bottom-1"
                )}
            >
                {/* Dots */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 shadow-lg">
                    {PROJECTS.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-500 ease-out",
                                activeIndex === index
                                    ? "w-6 bg-gradient-to-r from-white to-white/80 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                    : "w-1.5 bg-white/20 hover:bg-white/40"
                            )}
                        />
                    ))}
                </div>

                {/* Swipe Button */}
                <button
                    onClick={handleNextSlide}
                    className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 active:scale-95 transition-all border border-white/10 shadow-lg"
                >
                    <span className="text-[10px] font-medium text-white/80 tracking-widest uppercase">KAYDIR</span>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white/80 group-hover:translate-x-0.5 transition-transform"
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
