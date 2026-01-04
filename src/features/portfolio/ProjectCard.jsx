/**
 * ProjectCard Component
 * Alternating rotation (left/right), but same upward lift on hover
 */

import { useState, useEffect } from 'react'
import { getStackImages } from '../../utils/imagePath'
import { cn } from '../../utils/cn'

const iconMap = {
    illustrator: { type: 'image', value: '/gorseller/iconlar/illustrator.svg' },
    photoshop: { type: 'image', value: '/gorseller/iconlar/photoshop.svg' },
    aftereffects: { type: 'image', value: '/gorseller/iconlar/after-effects.svg' },
    premiere: { type: 'image', value: '/gorseller/iconlar/premiere-pro.svg' }
}

export default function ProjectCard({ project, onClick, isReversed, cardIndex = 0, className }) {
    const { id, title, category, year, description, techStack = [], postCount = 5, storyCount = 0, stackFormat = 'post' } = project
    const stackImages = getStackImages(id, postCount, storyCount, stackFormat)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    // Determine aspect ratio based on stackFormat
    // 'story' = only stories (9/16 vertical)
    // 'post' or 'hybrid' = posts or mixed (4/5 horizontal)
    const isStoryOnlyFormat = stackFormat === 'story'
    const aspectClass = isStoryOnlyFormat ? 'aspect-[9/16]' : 'aspect-[4/5]'
    const widthClass = isStoryOnlyFormat ? 'w-56 md:w-64 lg:w-72' : 'w-72 md:w-80 lg:w-96'

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
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
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

            <div className={cn("flex-1 max-w-xl", isReversed ? "lg:text-right" : "text-left")}>
                <p className="meta-wide mb-4 text-dimGray">{category} — {year}</p>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-tight text-offWhite mb-6">{title}</h3>
                <p className="text-dimGray text-base leading-relaxed mb-8">{description}</p>
                <div className={cn("flex items-center gap-4", isReversed && "lg:justify-end")}>
                    {techStack.map((tech) => {
                        const iconData = iconMap[tech]
                        if (!iconData) return null

                        return (
                            <div
                                key={tech}
                                className="p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/15 transition-colors"
                                title={tech}
                            >
                                {iconData.type === 'component' ? (
                                    <iconData.value size={22} className="text-dimGray" />
                                ) : (
                                    <img
                                        src={iconData.value}
                                        alt={tech}
                                        className="w-[22px] h-[22px] object-contain"
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </article>
    )
}
