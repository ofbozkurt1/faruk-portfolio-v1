import { useState, useRef, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../../data/projects'
import { cn } from '../../utils/cn'

export default function StackView({ onProjectClick, className }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollContainerRef = useRef(null)

    // Scroll Listener for Active Dot
    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft
            const width = container.offsetWidth
            const index = Math.round(scrollLeft / width)
            setActiveIndex(index)
        }

        container.addEventListener('scroll', handleScroll, { passive: true })
        return () => container.removeEventListener('scroll', handleScroll)
    }, [])

    // Function to handle manual slide via button with LOOP support
    const handleNextSlide = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current
            const width = container.offsetWidth

            // Check if activeIndex is last item (Loop Logic)
            if (activeIndex === PROJECTS.length - 1) {
                container.scrollTo({ left: 0, behavior: 'smooth' })
            } else {
                // Scroll one slide width
                container.scrollBy({ left: width, behavior: 'smooth' })
            }
        }
    }

    // Auto Play - 3 seconds Loop
    useEffect(() => {
        // Only run on mobile (detected by scroll capability or resizing logic, but here simple interval)
        // If user interacts, timer resets automatically due to dependency changes
        const interval = setInterval(() => {
            // We need to check if we should auto-scroll (e.g. not hovering)
            // But for simple request: just loop.
            // Check if window is mobile width to avoid desktop scroll
            if (window.innerWidth < 768) {
                handleNextSlide()
            }
        }, 3000)
        return () => clearInterval(interval)
    }, [activeIndex]) // Re-run effect when index changes (resets timer)

    return (
        <div className={cn("relative w-full", className)}>
            {/* CAROUSEL (Mobile) / STACK (Desktop) CONTAINER */}
            <div
                ref={scrollContainerRef}
                className={cn(
                    // BASE (Mobile): Horizontal Scroll Layout
                    "flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide pb-32",
                    "gap-16 px-4 -mx-4", // Increased gap significantly to prevent next slide from overlapping floating buttons

                    // DESKTOP OVERRIDE: Reset EVERYTHING to vertical stack and center content
                    "md:flex-col md:overflow-visible md:pb-0 md:gap-40 md:block",
                    // Restore original Desktop container constraints
                    "md:max-w-6xl md:mx-auto md:px-4 lg:px-0"
                )}
            >
                {/* 
                   IMPORTANT: Desktop styles must completely override mobile styles to prevent layout shifts.
                   Mobile: Slide Wrapper (100vw, Snap)
                   Desktop: Standard Block (No width constraints)
                */}
                {PROJECTS.map((project, index) => (
                    <div
                        key={project.id}
                        className={cn(
                            // MOBILE STYLES
                            // Removed h-full to stop vertical bounce, kept items-start for top alignment
                            "min-w-[100vw] flex-shrink-0 snap-center flex justify-center items-start pt-0 px-0",

                            // DESKTOP RESET STYLES
                            // Removed divider, added bottom margin for spacing instead
                            "md:min-w-0 md:w-auto md:flex-shrink-1 md:snap-align-none md:block md:p-0 md:mb-40"
                        )}
                        // Remove margin from last item on desktop
                        style={{ marginBottom: index === PROJECTS.length - 1 ? 0 : undefined }}
                    >
                        <ProjectCard
                            project={project}
                            onClick={onProjectClick}
                            cardIndex={index}
                            isReversed={index % 2 === 1}
                        />

                        {/* Divider removed as requested */}
                    </div>
                ))}
            </div>

            {/* MOBILE ONLY: Modern Navigation Indicator */}
            {/* Fixed Positioning: Placed at bottom-8 to sit below the card content */}
            <div
                className={cn(
                    "absolute left-1/2 -translate-x-1/2 md:hidden z-20 flex flex-row items-center gap-3 transition-all duration-500 ease-in-out",
                    "bottom-1"
                )}
            >
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
                {/* Explicit Swipe Button */}
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

            {/* Floating Arrow Removed */}
        </div>
    )
}
