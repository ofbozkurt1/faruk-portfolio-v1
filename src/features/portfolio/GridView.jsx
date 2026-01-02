/**
 * GridView Component
 * Full-screen overlay showing all project images in masonry grid
 * Slides up from bottom with spring physics
 */

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { getProjectImages } from '../../utils/imagePath'
import { cn } from '../../utils/cn'

// Spring physics for Silent Luxury motion
const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 1.2
}

// Backdrop animation
const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.4 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3, delay: 0.2 }
    }
}

// Main container - slides up from bottom
const containerVariants = {
    hidden: {
        opacity: 0,
        y: "100%"
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            ...springConfig,
            staggerChildren: 0.03,
            delayChildren: 0.2
        }
    },
    exit: {
        opacity: 0,
        y: "50%",
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 30
        }
    }
}

// Individual image animation
const imageVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            ...springConfig
        }
    }
}

// Close button animation
const closeButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { delay: 0.5 }
    },
    exit: { opacity: 0, scale: 0.8 }
}

export default function GridView({ project, isOpen, onClose }) {
    if (!project) return null

    const { id, title, category, year, imageCount, description, credits } = project
    const images = getProjectImages(id, imageCount)

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 bg-richBlack/98 z-40"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                    />

                    {/* Grid Container */}
                    <motion.div
                        key="grid-container"
                        className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Close Button - Fixed */}
                        <motion.button
                            variants={closeButtonVariants}
                            className={cn(
                                "fixed top-8 right-8 z-[60]",
                                "p-4 rounded-full",
                                "bg-accent/50 hover:bg-accent/80",
                                "text-offWhite",
                                "transition-colors duration-300"
                            )}
                            onClick={onClose}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Close gallery"
                        >
                            <X size={24} strokeWidth={1.5} />
                        </motion.button>

                        {/* Inner Content */}
                        <div className="min-h-screen">
                            {/* Header */}
                            <motion.header
                                className="container-padding pt-24 pb-16 sticky top-0 bg-gradient-to-b from-richBlack via-richBlack to-transparent z-10"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <p className="meta-wide mb-3 text-dimGray">{category} — {year}</p>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium heading-tight text-offWhite">
                                    {title}
                                </h2>
                                {description && (
                                    <p className="mt-4 text-dimGray max-w-2xl text-lg">{description}</p>
                                )}
                                {credits && (
                                    <p className="meta-wide mt-4 text-dimGray/70">{credits}</p>
                                )}
                            </motion.header>

                            {/* Masonry Grid */}
                            <div className="container-padding pb-24">
                                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6">
                                    {images.map((src, index) => (
                                        <motion.div
                                            key={src}
                                            className="mb-4 md:mb-6 break-inside-avoid"
                                            variants={imageVariants}
                                        >
                                            <motion.img
                                                src={src}
                                                alt={`${title} - Image ${index + 1}`}
                                                loading={index < 6 ? "eager" : "lazy"}
                                                className="w-full h-auto rounded-sm"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ type: "spring", ...springConfig }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer spacer for scroll */}
                            <div className="h-20" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
