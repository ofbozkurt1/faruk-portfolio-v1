/**
 * ProjectCard Component - PHASE 39 FIXED
 * Mobile overlay ON IMAGE with gradient, Desktop unchanged.
 */

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getStackImages } from '../../utils/imagePath'
import { cn } from '../../utils/cn'
import { usePortfolioStore } from '../../stores/portfolioStore'

const iconMap = {
    illustrator: { type: 'image', value: '/gorseller/iconlar/illustrator.svg' },
    photoshop: { type: 'image', value: '/gorseller/iconlar/photoshop.svg' },
    aftereffects: { type: 'image', value: '/gorseller/iconlar/after-effects.svg' },
    premiere: { type: 'image', value: '/gorseller/iconlar/premiere-pro.svg' }
}

export default function ProjectCard({ project, onClick, isReversed, cardIndex = 0, className, onInteraction, priority = false }) {
    const { t } = useTranslation()
    const { id, title, category, year, description, techStack = [], postCount = 5, storyCount = 0, stackFormat: originalStackFormat = 'post', brandColor = '#9333EA' } = project
    // FORCE 'hybrid' for Adana Napoli to match Hacı Hakkı Usta exactly
    const stackFormat = (title === 'Adana Napoli' || title === 'Hacı Hakkı Usta') ? 'hybrid' : originalStackFormat
    const stackImages = getStackImages(id, postCount, storyCount, stackFormat)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const [isPaused, setIsPaused] = useState(false)

    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { amount: 0.3 })

    const { setActiveProject, clearActiveProject } = usePortfolioStore()

    // Check mobile with resize listener to prevent stale state
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const isStoryOnlyFormat = stackFormat === 'story'

    // RESPONSIVE SIZING STRATEGY:
    // Mobile: UNIFIED (All cards are 4:5 aspect, 300px width)
    // Desktop: ORIGINAL (Stories are 9:16, Posts are 4:5, varying widths)
    const aspectClass = isStoryOnlyFormat ? 'aspect-[4/5] md:aspect-[9/16]' : 'aspect-[4/5]'

    const widthClass = isStoryOnlyFormat
        ? 'w-[300px] md:w-72 lg:w-80'
        : 'w-[300px] md:w-96 lg:w-[420px]'

    const direction = cardIndex % 2 === 0 ? 1 : -1

    useEffect(() => {
        if (!isInView || isPaused) return // Pause if not in view or user is touching
        const intervalTime = isMobile ? 2000 : 4000 // Fast for mobile, standard for desktop
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % stackImages.length)
        }, intervalTime)
        return () => clearInterval(interval)
    }, [isInView, stackImages.length, isMobile, isPaused])

    const getImageOrder = (originalIndex) => {
        return (originalIndex - activeIndex + stackImages.length) % stackImages.length
    }

    return (
        <div
            ref={cardRef}
            className={cn(
                "flex flex-col lg:flex-row items-center gap-12 lg:gap-28",
                isReversed && "lg:flex-row-reverse",
                className
            )}
            // Pause slideshow on interaction
            onTouchStart={() => {
                setIsPaused(true)
                onInteraction?.(true)
            }}
            onTouchEnd={() => {
                setIsPaused(false)
                onInteraction?.(false)
            }}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
            <div
                className="relative cursor-pointer group flex-shrink-0"
                onClick={() => onClick?.(project)}
                onMouseEnter={() => {
                    if (!isMobile) {
                        setIsHovered(true)
                        setActiveProject(id, brandColor)
                    }
                }}
                onMouseLeave={() => {
                    if (!isMobile) {
                        setIsHovered(false)
                        clearActiveProject()
                    }
                }}
                style={{
                    transform: isHovered && !isMobile ? 'translateY(-5px)' : 'translateY(0)',
                    transition: 'transform 0.2s ease-out'
                }}
            >
                {/* IMAGE STACK CONTAINER */}
                <div className={`relative ${aspectClass} ${widthClass} md:overflow-visible rounded-xl md:rounded-none`}>
                    {stackImages.map((imageData, originalIndex) => {
                        const { src, type } = imageData
                        const orderIndex = getImageOrder(originalIndex)

                        const isStory = type === 'story'
                        const cardAspect = isStory ? '9/16' : '4/5'

                        // Use cached isMobile value
                        const rotations = isMobile ? [-1.5, -0.5, 0, 0.5, 1.5] : [-4, -2, 0, 2, 4]
                        const baseRotation = (rotations[orderIndex] || 0) * direction
                        const hoverRotation = baseRotation * 1.5

                        // Mobile: almost no scale difference
                        const scales = isMobile ? [1, 0.98, 0.96, 0.94, 0.92] : [1, 0.96, 0.92, 0.88, 0.84]
                        const scale = scales[orderIndex] || 0.9

                        // Mobile: NO Y movement (cards stay at same level)
                        const baseYValues = isMobile ? [0, 0, 0, 0, 0] : [0, 10, 20, 30, 40]
                        const hoverYValues = isMobile ? [0, 0, 0, 0, 0] : [0, -10, -20, -30, -40]
                        const baseY = baseYValues[orderIndex] || 50
                        const hoverY = hoverYValues[orderIndex] || -50

                        const isVisibleMobile = isMobile ? orderIndex === 0 : true // Mobile optimization: Only rendering top card improves FPS massively

                        return (
                            <div
                                key={src}
                                className="absolute rounded-lg overflow-hidden shadow-xl select-none" // Added select-none
                                style={{
                                    // Mobile Perf: Hide background cards completely
                                    display: isVisibleMobile ? 'block' : 'none',
                                    // ... existing styles ...
                                    aspectRatio: stackFormat === 'hybrid' ? cardAspect : undefined,
                                    inset: stackFormat === 'hybrid' ? 'auto' : 0,
                                    top: stackFormat === 'hybrid' ? 0 : undefined,
                                    left: stackFormat === 'hybrid' ? '50%' : undefined,
                                    height: stackFormat === 'hybrid' ? '100%' : undefined,
                                    transform: stackFormat === 'hybrid'
                                        ? `translateX(-50%) rotate(${isHovered ? hoverRotation : baseRotation}deg) scale(${scale}) translateY(${isHovered ? hoverY : baseY}px)`
                                        : `rotate(${isHovered ? hoverRotation : baseRotation}deg) scale(${scale}) translateY(${isHovered ? hoverY : baseY}px)`,
                                    opacity: 1,
                                    zIndex: 10 - orderIndex,
                                    transformOrigin: 'center bottom',
                                    transition: isHovered
                                        ? 'transform 0.25s cubic-bezier(0.2, 0, 0, 1), opacity 0.25s ease-out'
                                        : 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 1.5s ease-out'
                                }}
                            >
                                <img
                                    src={src}
                                    alt={`${title} - ${originalIndex + 1}`}
                                    className={cn(
                                        "w-full h-full select-none pointer-events-none md:pointer-events-auto",
                                        // Image-Level Logic: If this specific image is a Story (regardless of project type),
                                        // FIT it into the container on Mobile (!object-contain).
                                        // Desktop always fills the area (cover).
                                        (isStory) ? "!object-contain md:!object-cover bg-zinc-900 md:bg-transparent" : "object-cover"
                                    )}
                                    loading={priority && orderIndex === 0 ? "eager" : "lazy"}
                                    decoding={priority ? "sync" : "async"}
                                    draggable={false} // Prevent native drag
                                    onDragStart={(e) => e.preventDefault()}
                                />
                                {orderIndex > 0 && (
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            backgroundColor: `rgba(0,0,0,${isHovered ? 0.05 : 0.15})`,
                                            transition: 'background-color 0.25s'
                                        }}
                                    />
                                )}
                            </div>
                        )
                    })}

                    {/* MOBILE CONTENT - CONDITIONAL RENDERING FOR PERFORMANCE */}
                    {isMobile && (
                        <>
                            {/* MOBILE OVERLAY - Gradient extends to sides */}
                            <div className="absolute -bottom-20 -left-32 -right-32 h-80 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />

                            {/* MOBILE CONTENT - Extended beyond image bounds */}
                            <div className="absolute -bottom-16 -left-4 -right-4 z-20">
                                {/* Content */}
                                <div className="relative z-10 px-4 pb-1">
                                    <div className="flex flex-nowrap justify-between items-end w-full gap-4">
                                        <div className="flex flex-col gap-1 flex-1 min-w-0 pr-4">
                                            <span className="text-[10px] tracking-[0.15em] font-medium text-white/50 uppercase font-mono whitespace-nowrap">
                                                {category} — {year}
                                            </span>
                                            {/* Reverted to text-2xl since width is back to 300px */}
                                            <h3 className="text-2xl font-bold text-white leading-tight">
                                                {title}
                                            </h3>
                                            <div className="flex flex-nowrap gap-2 mt-1 overflow-hidden">
                                                {techStack.map((tech) => {
                                                    const iconData = iconMap[tech]
                                                    if (!iconData) return null
                                                    const toolNames = {
                                                        photoshop: 'Photoshop',
                                                        illustrator: 'Illustrator',
                                                        aftereffects: 'After Effects',
                                                        premiere: 'Premiere',
                                                        indesign: 'InDesign',
                                                        figma: 'Figma'
                                                    }
                                                    return (
                                                        <div
                                                            key={tech}
                                                            className={cn("flex items-center gap-1.5 bg-white/10 rounded-full border border-white/10", isStoryOnlyFormat ? "px-2 py-0.5" : "px-2.5 py-1")}
                                                        >
                                                            <img src={iconData.value} alt={tech} className="w-3 h-3 object-contain opacity-80" />
                                                            <span className="text-[9px] font-medium text-white/70">
                                                                {toolNames[tech] || tech}
                                                            </span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        {/* Mobile Explore Button with Curved Text */}
                                        <div className="flex-shrink-0 relative w-14 h-14 flex items-center justify-center">
                                            <svg className="absolute inset-0 w-14 h-14 animate-[spin_8s_linear_infinite]" viewBox="0 0 100 100">
                                                <defs>
                                                    <path id="circlePath" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                                                </defs>
                                                <text className="fill-white/50" style={{ fontSize: '9px', letterSpacing: '0.12em', fontWeight: 500 }}>
                                                    <textPath href="#circlePath">
                                                        PROJEYİ · İNCELE · PROJEYİ · İNCELE ·
                                                    </textPath>
                                                </text>
                                            </svg>
                                            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M7 17L17 7" />
                                                    <path d="M7 7h10v10" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* DESKTOP EXPLORE BUTTON */}
                <div className="mt-24 text-center relative z-20 hidden md:block">
                    <span className="explore-pill">
                        <span className="explore-text">{t('portfolio.explore', 'Click to explore')}</span>
                        <span className="explore-arrow">→</span>
                    </span>
                </div>

                <style>{`
                    .explore-pill {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        padding: 10px 24px;
                        background: rgba(20,20,25,0.9);
                        border: 1px solid rgba(255,255,255,0.12);
                        border-radius: 50px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        position: relative;
                        overflow: hidden;
                    }
                    .explore-pill::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
                        animation: explore-shimmer 2.5s ease-in-out infinite;
                    }
                    @keyframes explore-shimmer {
                        0% { left: -100%; }
                        100% { left: 100%; }
                    }
                    .explore-pill:hover {
                        background: rgba(255,255,255,0.08);
                        border-color: rgba(255,255,255,0.2);
                        transform: translateY(-2px);
                    }
                    .explore-text {
                        background: linear-gradient(90deg, #555, #fff, #555);
                        background-size: 200% 100%;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        animation: explore-shine 2.5s ease-in-out infinite;
                        font-weight: 500;
                        font-size: 11px;
                        text-transform: uppercase;
                        letter-spacing: 0.12em;
                    }
                    .explore-arrow {
                        color: rgba(255,255,255,0.4);
                        font-size: 14px;
                        transition: transform 0.3s ease, color 0.3s ease;
                    }
                    .explore-pill:hover .explore-arrow {
                        transform: translateX(4px);
                        color: #fff;
                    }
                    @keyframes explore-shine {
                        0% { background-position: 200% 0; }
                        100% { background-position: -200% 0; }
                    }
                `}</style>
            </div>

            {/* DESKTOP CONTENT */}
            <div className={cn("hidden md:block flex-1 max-w-2xl", isReversed ? "lg:text-right" : "text-left")}>
                <p
                    style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        fontSize: 12,
                        fontWeight: 500,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.45)',
                    }}
                    className="mb-3 md:mb-5"
                >
                    {category} — {year}
                </p>

                <h3
                    className="project-title-gradient mb-3 md:mb-6"
                    style={{
                        fontSize: 'clamp(42px, 6vw, 72px)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: isHovered ? brandColor : '#F2F2F2',
                        transition: 'color 0.4s ease'
                    }}
                >
                    {title}
                </h3>

                <div
                    className="divider-line hidden md:block"
                    style={{
                        width: '100%',
                        maxWidth: 140,
                        height: 2,
                        background: isHovered
                            ? `linear-gradient(90deg, ${brandColor}, transparent)`
                            : 'linear-gradient(90deg, rgba(255,255,255,0.4), transparent)',
                        marginBottom: 24,
                        marginLeft: isReversed ? 'auto' : 0,
                        marginRight: isReversed ? 0 : 'auto',
                        boxShadow: isHovered ? `0 0 20px ${brandColor}50` : 'none',
                        transition: 'background 0.4s ease, box-shadow 0.4s ease'
                    }}
                />

                <div
                    className={cn("hidden md:flex gap-8 mb-8", isReversed && "lg:justify-end")}
                    style={{ flexWrap: 'wrap' }}
                >
                    <div>
                        <span style={{
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: 10,
                            fontWeight: 500,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.35)',
                            display: 'block',
                            marginBottom: 6
                        }}>
                            Role
                        </span>
                        <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>
                            {project.role || 'Design'}
                        </span>
                    </div>
                    <div style={{ width: 1, background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />
                    <div>
                        <span style={{
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: 10,
                            fontWeight: 500,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.35)',
                            display: 'block',
                            marginBottom: 6
                        }}>
                            Deliverables
                        </span>
                        <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>
                            {project.deliverables || 'Visual Content'}
                        </span>
                    </div>
                </div>

                <p
                    className="hidden md:block"
                    style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: 16,
                        lineHeight: 1.8,
                        marginBottom: 28
                    }}
                >
                    {description}
                </p>

                <div className={cn("flex items-center gap-3 flex-wrap mt-4 md:mt-0", isReversed && "lg:justify-end")}>
                    {techStack.map((tech) => {
                        const iconData = iconMap[tech]
                        if (!iconData) return null

                        const brandColors = {
                            photoshop: '#31A8FF',
                            illustrator: '#FF9A00',
                            aftereffects: '#9999FF',
                            premiere: '#9999FF'
                        }
                        const techBrandColor = brandColors[tech] || '#fff'
                        const toolNames = {
                            photoshop: 'Photoshop',
                            illustrator: 'Illustrator',
                            aftereffects: 'After Effects',
                            premiere: 'Premiere'
                        }

                        return (
                            <div
                                key={tech}
                                className="tech-pill"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    padding: '10px 20px',
                                    borderRadius: 50,
                                    background: 'rgba(20,20,25,0.9)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'default'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = techBrandColor
                                    e.currentTarget.style.boxShadow = `0 0 20px ${techBrandColor}30`
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                            >
                                <img
                                    src={iconData.value}
                                    alt={tech}
                                    style={{ width: 18, height: 18, objectFit: 'contain' }}
                                />
                                <span style={{
                                    fontSize: 12,
                                    fontWeight: 500,
                                    color: 'rgba(255,255,255,0.6)',
                                    letterSpacing: '0.02em'
                                }}>
                                    {toolNames[tech]}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
