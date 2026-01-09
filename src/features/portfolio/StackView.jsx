import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../../data/projects'
import { cn } from '../../utils/cn'

export default function StackView({ onProjectClick, className }) {
    // Indices for visual feedback
    const [activeIndex, setActiveIndex] = useState(0)

    // Core states
    const [isMobile, setIsMobile] = useState(false)
    const [isReady, setIsReady] = useState(false) // For preventing FOUC/Flash on initial scroll jump

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

    // Prepare list for BIDIRECTIONAL Infinite Scroll (Mobile Only)
    // Structure: [StartClone (Last Project), P0, P1, ..., PN, EndClone (First Project)]
    const displayProjects = isMobile
        ? [
            { ...PROJECTS[PROJECTS.length - 1], id: `clone-start-${PROJECTS[PROJECTS.length - 1].id}`, isClone: true },
            ...PROJECTS,
            { ...PROJECTS[0], id: `clone-end-${PROJECTS[0].id}`, isClone: true }
        ]
        : PROJECTS

    // Initial Scroll Position Handling (Jump to Index 1)
    useEffect(() => {
        if (!isMobile) {
            setIsReady(true)
            return
        }

        const container = scrollContainerRef.current
        if (!container) return

        // Wait a tick to ensure layout is computed
        const timer = setTimeout(() => {
            const width = container.offsetWidth
            const gap = 64
            const stride = width + gap

            // Jump to the First Real Project (Index 1)
            // Because Index 0 is the StartClone
            container.scrollTo({ left: stride, behavior: 'auto' })

            // Reveal content after jump
            requestAnimationFrame(() => setIsReady(true))
        }, 50)

        return () => clearTimeout(timer)
    }, [isMobile])

    // Scroll Listener Logic
    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container || !isMobile) return

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft
            const width = container.offsetWidth
            const gap = 64
            const stride = width + gap

            if (width === 0) return

            const rawIndex = Math.round(scrollLeft / stride)

            // Adjust active dot index
            // List is shifted by 1 due to StartClone.
            // Project 0 is at Index 1.
            // So visual index = (rawIndex - 1)
            // Use modulo to handle clones safely
            const visualIndex = (rawIndex - 1 + PROJECTS.length) % PROJECTS.length
            setActiveIndex(visualIndex)

            // INFINITE LOOP RESET LOGIC (Bidirectional)
            // 1. END LOOP: Reached EndClone (Last Item) -> Jump to Project 0 (Index 1)
            const endClonePos = stride * (displayProjects.length - 1)
            const startClonePos = 0 // Index 0

            const isAtEndClone = Math.abs(scrollLeft - endClonePos) < 10
            const isAtStartClone = Math.abs(scrollLeft - startClonePos) < 10

            // Prevent reset if touching
            if (!isTouchingRef.current) {
                if (isAtEndClone) {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current)
                    timeoutRef.current = setTimeout(() => {
                        // Jump to First Real Project (Index 1)
                        container.scrollTo({ left: stride, behavior: 'auto' })
                    }, 50)
                }
                else if (isAtStartClone) {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current)
                    timeoutRef.current = setTimeout(() => {
                        // Jump to Last Real Project (Index N)
                        // Position = stride * PROJECTS.length
                        // (Explanation: [C(0), P(1x), ... P(Nx), C(N+1)])
                        // We want P(N). There are N projects.
                        // Index in displayProjects is N.
                        // Position = N * stride.
                        const lastRealPos = stride * PROJECTS.length
                        container.scrollTo({ left: lastRealPos, behavior: 'auto' })
                    }, 50)
                }
            }
        }

        container.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            container.removeEventListener('scroll', handleScroll)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [isMobile, displayProjects.length])

    // Manual / Auto Slide Logic
    const handleNextSlide = () => {
        if (!scrollContainerRef.current) return
        const container = scrollContainerRef.current
        const width = container.offsetWidth
        const gap = 64

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
        <div className={cn("relative w-full transition-opacity duration-300", className, isMobile && !isReady ? "opacity-0" : "opacity-100")}>
            <div
                ref={scrollContainerRef}
                onTouchStart={() => { isTouchingRef.current = true }}
                onTouchEnd={() => { isTouchingRef.current = false }}
                // Robust interaction handling
                onMouseDown={() => { isTouchingRef.current = true }}
                onMouseUp={() => { isTouchingRef.current = false }}
                onMouseLeave={() => { isTouchingRef.current = false }}

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
                    // Correct index for props
                    // StartClone is index 0. Real projects start at 1.
                    // If isMobile: Real Index = (index - 1)
                    // But we use modulo logic for safety:
                    const realIndex = isMobile ? (index - 1 + PROJECTS.length) % PROJECTS.length : index

                    // Logic to disable slide for Clones AND their Real Counterparts (at loop junctions)
                    // Clones: index 0 and index (len-1)
                    // Real Counterparts: index 1 (Project 0) and index (len-2) (Project Last)
                    // This ensures absolute sync during reset jumps.
                    const isJunctionCard = isMobile && (
                        index === 0 || // Start Clone
                        index === displayProjects.length - 1 || // End Clone
                        index === 1 || // First Real Project
                        index === displayProjects.length - 2 // Last Real Project
                    )

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
                                cardIndex={realIndex}
                                isReversed={realIndex % 2 === 1}
                                onInteraction={(isActive) => { isTouchingRef.current = isActive }}
                                priority={isJunctionCard} // Eager load all junction cards
                                disableSlide={isJunctionCard} // Disable slide for stability
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
