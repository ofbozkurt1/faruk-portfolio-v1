/**
 * ProjectCard Component
 * Alternating rotation (left/right), but same upward lift on hover
 */

import { useState, useEffect } from 'react'
import {
    SiAdobeaftereffects,
    SiAdobepremierepro,
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiFigma
} from 'react-icons/si'
import { getStackImages } from '../../utils/imagePath'
import { cn } from '../../utils/cn'

const iconMap = {
    figma: SiFigma,
    illustrator: SiAdobeillustrator,
    photoshop: SiAdobephotoshop,
    aftereffects: SiAdobeaftereffects,
    premiere: SiAdobepremierepro
}

export default function ProjectCard({ project, onClick, isReversed, cardIndex = 0, className }) {
    const { id, title, category, year, description, techStack = [] } = project
    const stackImages = getStackImages(id)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

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
                "flex flex-col lg:flex-row items-center gap-12 lg:gap-20",
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
                <div className="relative aspect-[4/5] w-72 md:w-80 lg:w-96">
                    {stackImages.map((src, originalIndex) => {
                        const orderIndex = getImageOrder(originalIndex)

                        // Rotation direction alternates (left/right lean)
                        const baseRotation = [-3, 0, 3][orderIndex] * direction || 0
                        const hoverRotation = baseRotation * 1.5

                        const scale = [1, 0.95, 0.9][orderIndex] || 0.85

                        // Y movement is ALWAYS upward on hover (same for all cards)
                        const baseY = [0, 12, 24][orderIndex] || 32
                        const hoverY = [0, -12, -24][orderIndex] || -32

                        const opacity = isHovered ? [1, 0.9, 0.8][orderIndex] : [1, 0.8, 0.65][orderIndex]

                        return (
                            <div
                                key={src}
                                className="absolute inset-0 rounded-lg overflow-hidden shadow-xl"
                                style={{
                                    transform: `rotate(${isHovered ? hoverRotation : baseRotation}deg) scale(${scale}) translateY(${isHovered ? hoverY : baseY}px)`,
                                    opacity: opacity,
                                    zIndex: 10 - orderIndex,
                                    transformOrigin: 'center bottom',
                                    transition: 'transform 0.25s ease-out, opacity 0.25s ease-out'
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
                <p className="meta-wide text-center mt-12 text-dimGray/50 group-hover:text-dimGray transition-colors relative z-20">
                    Click to explore →
                </p>
            </div>

            <div className={cn("flex-1 max-w-xl", isReversed ? "lg:text-right" : "text-left")}>
                <p className="meta-wide mb-4 text-dimGray">{category} — {year}</p>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-tight text-offWhite mb-6">{title}</h3>
                <p className="text-dimGray text-base leading-relaxed mb-8">{description}</p>
                <div className={cn("flex items-center gap-4", isReversed && "lg:justify-end")}>
                    {techStack.map((tech) => {
                        const IconComponent = iconMap[tech]
                        if (!IconComponent) return null
                        return (
                            <div
                                key={tech}
                                className="p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/15 transition-colors"
                            >
                                <IconComponent size={22} className="text-dimGray" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </article>
    )
}
