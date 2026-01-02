/**
 * ProjectCard Component
 * NO glass container around images - clean look
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    SiAdobeaftereffects,
    SiAdobepremierepro,
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiFigma
} from 'react-icons/si'
import { getStackImages } from '../../utils/imagePath'
import { cn } from '../../utils/cn'

// Optimized spring config
const springConfig = {
    stiffness: 120,
    damping: 25,
    mass: 1
}

// Real icon mapping
const iconMap = {
    figma: SiFigma,
    illustrator: SiAdobeillustrator,
    photoshop: SiAdobephotoshop,
    aftereffects: SiAdobeaftereffects,
    premiere: SiAdobepremierepro
}

// Random rotation values
const getStackRotation = (index) => {
    const rotations = [-2.5, 0.5, 2]
    return rotations[index] || 0
}

const getStackScale = (index) => {
    const scales = [1, 0.97, 0.94]
    return scales[index] || 1
}

// ImageWithFallback component
function ImageWithFallback({ src, alt, className, isFirst, ...props }) {
    const [hasError, setHasError] = useState(false)

    if (hasError) {
        return (
            <div className={cn("bg-accent/30 flex items-center justify-center", className)}>
                <span className="meta-wide text-dimGray">Görsel yüklenemedi</span>
            </div>
        )
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setHasError(true)}
            loading={isFirst ? "eager" : "lazy"}
            decoding="async"
            {...props}
        />
    )
}

export default function ProjectCard({ project, onClick, isReversed, className }) {
    const { id, title, category, year, description, techStack = [] } = project
    const stackImages = getStackImages(id)

    return (
        <motion.article
            className={cn(
                "flex flex-col lg:flex-row items-center gap-12 lg:gap-20",
                isReversed && "lg:flex-row-reverse",
                "gpu-layer",
                className
            )}
        >
            {/* LEFT: Stacked Card Visual - NO glass container */}
            <motion.div
                className="relative cursor-pointer group flex-shrink-0 gpu-layer"
                onClick={() => onClick?.(project)}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", ...springConfig }}
                style={{ willChange: 'transform' }}
            >
                {/* Direct stacked images - no wrapper */}
                <div className="relative aspect-[4/5] w-72 md:w-80 lg:w-96">
                    {[...stackImages].reverse().map((src, reverseIndex) => {
                        const index = stackImages.length - 1 - reverseIndex
                        const rotation = getStackRotation(index)
                        const scale = getStackScale(index)

                        return (
                            <motion.div
                                key={src}
                                className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl gpu-layer"
                                style={{
                                    zIndex: 3 - index,
                                    transformOrigin: 'center bottom',
                                    rotate: rotation,
                                    scale: scale,
                                    willChange: 'transform'
                                }}
                                whileHover={{
                                    rotate: rotation * 1.8,
                                    y: index === 0 ? 0 : (index * -10),
                                }}
                                transition={{ type: "spring", ...springConfig }}
                            >
                                <ImageWithFallback
                                    src={src}
                                    alt={`${title} - Image ${index + 1}`}
                                    isFirst={index === 0}
                                    className="w-full h-full object-cover"
                                />
                                {index > 0 && <div className="absolute inset-0 bg-richBlack/20" />}
                            </motion.div>
                        )
                    })}
                </div>

                {/* Click hint */}
                <p className="meta-wide text-center mt-5 text-dimGray/50 group-hover:text-dimGray transition-colors duration-300">
                    Click to explore →
                </p>
            </motion.div>

            {/* RIGHT: Metadata */}
            <div className={cn(
                "flex-1 max-w-xl",
                isReversed ? "lg:text-right" : "text-left"
            )}>
                <p className="meta-wide mb-4 text-dimGray">{category} — {year}</p>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-tight text-offWhite mb-6 text-glow">
                    {title}
                </h3>

                <p className="text-dimGray text-base leading-relaxed mb-8">
                    {description}
                </p>

                {/* Tech Stack Icons */}
                <div className={cn(
                    "flex items-center gap-4",
                    isReversed && "lg:justify-end"
                )}>
                    {techStack.map((tech) => {
                        const IconComponent = iconMap[tech]
                        if (!IconComponent) return null

                        return (
                            <motion.div
                                key={tech}
                                className="group p-3 bg-accent/20 rounded-lg border border-white/5 hover:border-white/15 transition-colors duration-200"
                                whileHover={{ scale: 1.1, y: -2 }}
                                transition={{ type: "spring", ...springConfig }}
                                title={tech}
                                style={{ willChange: 'transform' }}
                            >
                                <IconComponent
                                    size={22}
                                    className="text-dimGray group-hover:text-offWhite transition-colors duration-200"
                                />
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </motion.article>
    )
}
