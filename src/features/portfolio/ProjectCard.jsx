/**
 * ProjectCard Component
 * Alternating rotation (left/right), but same upward lift on hover
 * Now with global hover state for background effects
 */

import { useState, useEffect } from 'react'
import { getStackImages } from '../../utils/imagePath'
import { cn } from '../../utils/cn'
import { usePortfolioStore } from '../../stores/portfolioStore'

const iconMap = {
    illustrator: { type: 'image', value: '/gorseller/iconlar/illustrator.svg' },
    photoshop: { type: 'image', value: '/gorseller/iconlar/photoshop.svg' },
    aftereffects: { type: 'image', value: '/gorseller/iconlar/after-effects.svg' },
    premiere: { type: 'image', value: '/gorseller/iconlar/premiere-pro.svg' }
}

export default function ProjectCard({ project, onClick, isReversed, cardIndex = 0, className }) {
    const { id, title, category, year, description, techStack = [], postCount = 5, storyCount = 0, stackFormat = 'post', brandColor = '#9333EA' } = project
    const stackImages = getStackImages(id, postCount, storyCount, stackFormat)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    const { setActiveProject, clearActiveProject } = usePortfolioStore()

    // Determine aspect ratio based on stackFormat
    // 'story' = only stories (9/16 vertical)
    // 'post' or 'hybrid' = posts or mixed (4/5 horizontal)
    const isStoryOnlyFormat = stackFormat === 'story'
    const aspectClass = isStoryOnlyFormat ? 'aspect-[9/16]' : 'aspect-[4/5]'
    const widthClass = isStoryOnlyFormat ? 'w-64 md:w-72 lg:w-80' : 'w-80 md:w-96 lg:w-[420px]'

    // Direction for rotation only (left/right lean)
    const direction = cardIndex % 2 === 0 ? 1 : -1

    // Auto-rotate images every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % stackImages.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [stackImages.length])

    const getImageOrder = (originalIndex) => {
        return (originalIndex - activeIndex + stackImages.length) % stackImages.length
    }

    return (
        <article
            className={cn(
                "flex flex-col lg:flex-row items-center gap-12 lg:gap-28",
                isReversed && "lg:flex-row-reverse",
                className
            )}
        >
            <div
                className="relative cursor-pointer group flex-shrink-0"
                onClick={() => onClick?.(project)}
                onMouseEnter={() => {
                    setIsHovered(true)
                    setActiveProject(id, brandColor)
                }}
                onMouseLeave={() => {
                    setIsHovered(false)
                    clearActiveProject()
                }}
                style={{
                    transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
                    transition: 'transform 0.2s ease-out'
                }}
            >
                <div className={`relative ${aspectClass} ${widthClass}`}>
                    {stackImages.map((imageData, originalIndex) => {
                        const { src, type } = imageData
                        const orderIndex = getImageOrder(originalIndex)

                        // For hybrid: each card has its own aspect ratio
                        const isStory = type === 'story'
                        const cardAspect = isStory ? '9/16' : '4/5'

                        // Rotation direction alternates (left/right lean) - extended for 5 cards
                        const rotations = [-4, -2, 0, 2, 4]
                        const baseRotation = (rotations[orderIndex] || 0) * direction
                        const hoverRotation = baseRotation * 1.5

                        const scales = [1, 0.96, 0.92, 0.88, 0.84]
                        const scale = scales[orderIndex] || 0.8

                        // Y movement for 5 cards
                        const baseYValues = [0, 10, 20, 30, 40]
                        const hoverYValues = [0, -10, -20, -30, -40]
                        const baseY = baseYValues[orderIndex] || 50
                        const hoverY = hoverYValues[orderIndex] || -50

                        const opacity = 1 // Always full opacity as requested

                        return (
                            <div
                                key={src}
                                className="absolute rounded-lg overflow-hidden shadow-xl"
                                style={{
                                    aspectRatio: stackFormat === 'hybrid' ? cardAspect : undefined,
                                    inset: stackFormat === 'hybrid' ? 'auto' : 0,
                                    top: stackFormat === 'hybrid' ? 0 : undefined,
                                    left: stackFormat === 'hybrid' ? '50%' : undefined,
                                    height: stackFormat === 'hybrid' ? '100%' : undefined,
                                    transform: stackFormat === 'hybrid'
                                        ? `translateX(-50%) rotate(${isHovered ? hoverRotation : baseRotation}deg) scale(${scale}) translateY(${isHovered ? hoverY : baseY}px)`
                                        : `rotate(${isHovered ? hoverRotation : baseRotation}deg) scale(${scale}) translateY(${isHovered ? hoverY : baseY}px)`,
                                    opacity: opacity,
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
                                    className="w-full h-full object-cover"
                                    loading="lazy"
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
                </div>
                <div className="mt-24 text-center relative z-20">
                    <span className="explore-pill">
                        <span className="explore-text">Click to explore</span>
                        <span className="explore-arrow">→</span>
                    </span>
                </div>

                <style>{`
                    .explore-pill {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        padding: 10px 24px;
                        background: rgba(255,255,255,0.03);
                        backdrop-filter: blur(8px);
                        -webkit-backdrop-filter: blur(8px);
                        border: 1px solid rgba(255,255,255,0.08);
                        border-radius: 50px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        position: relative;
                        overflow: hidden;
                        white-space: nowrap;
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
                        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
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

            <div className={cn("flex-1 max-w-2xl", isReversed ? "lg:text-right" : "text-left")}>
                {/* Top Label: Category — Year (Monospace) */}
                <p
                    style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        fontSize: 12,
                        fontWeight: 500,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.45)',
                        marginBottom: 20
                    }}
                >
                    {category} — {year}
                </p>

                {/* Title with color change on hover */}
                <h3
                    className="project-title-gradient"
                    style={{
                        fontSize: 'clamp(42px, 6vw, 72px)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        marginBottom: 24,
                        color: isHovered ? brandColor : '#F2F2F2',
                        transition: 'color 0.4s ease'
                    }}
                >
                    {title}
                </h3>

                {/* Animated Divider with color change */}
                <div
                    className="divider-line"
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

                {/* Metadata Grid (Spec Sheet) */}
                <div
                    className={cn("flex gap-8 mb-8", isReversed && "lg:justify-end")}
                    style={{ flexWrap: 'wrap' }}
                >
                    <div>
                        <span
                            style={{
                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                fontSize: 10,
                                fontWeight: 500,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.35)',
                                display: 'block',
                                marginBottom: 6
                            }}
                        >
                            Role
                        </span>
                        <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>
                            {project.role || 'Design'}
                        </span>
                    </div>
                    <div style={{ width: 1, background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />
                    <div>
                        <span
                            style={{
                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                fontSize: 10,
                                fontWeight: 500,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.35)',
                                display: 'block',
                                marginBottom: 6
                            }}
                        >
                            Deliverables
                        </span>
                        <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>
                            {project.deliverables || 'Visual Content'}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 16,
                    lineHeight: 1.8,
                    marginBottom: 28
                }}>
                    {description}
                </p>

                {/* Tech Stack - Glassmorphic Pills */}
                <div className={cn("flex items-center gap-3 flex-wrap", isReversed && "lg:justify-end")}>
                    {techStack.map((tech) => {
                        const iconData = iconMap[tech]
                        if (!iconData) return null

                        // Brand colors for hover
                        const brandColors = {
                            photoshop: '#31A8FF',
                            illustrator: '#FF9A00',
                            aftereffects: '#9999FF',
                            premiere: '#9999FF'
                        }
                        const brandColor = brandColors[tech] || '#fff'

                        // Tool display names
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
                                    background: 'rgba(255,255,255,0.03)',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'default',
                                    ['--brand-color']: brandColor
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = brandColor
                                    e.currentTarget.style.boxShadow = `0 0 20px ${brandColor}30`
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
        </article>
    )
}
