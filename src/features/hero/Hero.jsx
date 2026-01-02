/**
 * Hero Component
 * Tight layout: Text Left, LARGE Portrait Right
 * Minimal gap between elements
 */

import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

// Spring physics for Silent Luxury motion
const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 1.2
}

// Staggered text animation
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

const textVariants = {
    hidden: {
        opacity: 0,
        y: 25
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            ...springConfig
        }
    }
}

const imageVariants = {
    hidden: {
        opacity: 0,
        scale: 1.03
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            ...springConfig,
            delay: 0.2
        }
    }
}

export default function Hero({ className }) {
    return (
        <section
            className={cn(
                "min-h-[80vh] flex items-center",
                "container-padding pt-20 pb-8",
                className
            )}
        >
            {/* Tight horizontal layout with minimal gap */}
            <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 w-full items-center justify-center">

                {/* Left: Text Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-shrink-0 lg:max-w-md"
                >
                    <motion.p
                        variants={textVariants}
                        className="meta-wide mb-3 text-dimGray"
                    >
                        Motion & Graphic Designer
                    </motion.p>

                    <motion.h1
                        variants={textVariants}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold heading-tight text-offWhite leading-[1.1]"
                    >
                        ÖMER FARUK<br />BOZKURT
                    </motion.h1>

                    <motion.p
                        variants={textVariants}
                        className="mt-4 text-dimGray max-w-sm text-sm leading-relaxed"
                    >
                        Creating immersive visual experiences through motion and design.
                    </motion.p>

                    <motion.div
                        variants={textVariants}
                        className="mt-5 flex items-center gap-5"
                    >
                        <a
                            href="#works"
                            className="meta-wide text-offWhite hover:text-dimGray transition-colors duration-300"
                        >
                            Works ↓
                        </a>
                        <a
                            href="#skills"
                            className="meta-wide text-dimGray hover:text-offWhite transition-colors duration-300"
                        >
                            Skills
                        </a>
                        <a
                            href="mailto:contact@ofarukbozkurt.com"
                            className="meta-wide text-dimGray hover:text-offWhite transition-colors duration-300"
                        >
                            Contact
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right: LARGE Circular Portrait Image */}
                <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-shrink-0"
                >
                    <div className="relative group">
                        {/* Large Circular Image Container */}
                        <div className="relative overflow-hidden rounded-full w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px]">
                            <img
                                src="/gorseller/profil/ben.webp"
                                alt="Ömer Faruk Bozkurt - Motion & Graphic Designer"
                                className={cn(
                                    "w-full h-full",
                                    "object-cover",
                                    "filter grayscale transition-all duration-700 ease-out",
                                    "group-hover:grayscale-0 group-hover:scale-[1.03]"
                                )}
                                loading="eager"
                                fetchPriority="high"
                            />

                            {/* Subtle overlay */}
                            <div
                                className={cn(
                                    "absolute inset-0",
                                    "bg-gradient-to-br from-richBlack/10 to-transparent",
                                    "transition-opacity duration-700",
                                    "group-hover:opacity-0"
                                )}
                            />
                        </div>

                        {/* Decorative circular border */}
                        <motion.div
                            className="absolute -inset-3 border border-accent/30 rounded-full -z-10"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        />

                        {/* Outer glow ring */}
                        <motion.div
                            className="absolute -inset-6 border border-accent/10 rounded-full -z-20"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
