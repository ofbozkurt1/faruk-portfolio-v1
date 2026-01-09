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

            {/* MOBILE ONLY: Dots Indicator */}
            <div className="flex justify-center gap-2 md:hidden mt-2">
                {PROJECTS.map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            activeIndex === index
                                ? "bg-white w-4"
                                : "bg-white/20"
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
