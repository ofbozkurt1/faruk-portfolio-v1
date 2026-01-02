/**
 * Hero Component
 * Renkli profil fotoğrafı, geniş boşluk
 */

import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

// Spring physics
const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 1.2
}

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
}

const textVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", ...springConfig }
    }
}

const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", ...springConfig, delay: 0.2 }
    }
}

export default function Hero({ className }) {
    return (
        <section
            className={cn(
                "min-h-[85vh] flex items-center",
                "container-padding pt-20 pb-8",
                className
            )}
        >
            {/* DAHA FAZLA BOŞLUK: lg:gap-24 */}
            <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-24 w-full items-center justify-center">

                {/* Left: Text Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-shrink-0 lg:max-w-lg text-center lg:text-left"
                >
                    <motion.p
                        variants={textVariants}
                        className="meta-wide mb-4 text-dimGray"
                    >
                        Motion & Graphic Designer
                    </motion.p>

                    <motion.h1
                        variants={textVariants}
                        style={{
                            fontSize: 'clamp(42px, 7vw, 72px)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.05,
                            color: '#F2F2F2'
                        }}
                    >
                        ÖMER FARUK<br />BOZKURT
                    </motion.h1>

                    <motion.p
                        variants={textVariants}
                        className="mt-5 text-dimGray max-w-md text-base leading-relaxed mx-auto lg:mx-0"
                    >
                        Creating immersive visual experiences through motion and design.
                    </motion.p>

                    <motion.div
                        variants={textVariants}
                        className="mt-6 flex items-center justify-center lg:justify-start gap-6"
                    >
                        <a href="#works" className="meta-wide text-offWhite hover:text-dimGray transition-colors duration-300">
                            Works ↓
                        </a>
                        <a href="#skills" className="meta-wide text-dimGray hover:text-offWhite transition-colors duration-300">
                            Skills
                        </a>
                        <a href="mailto:contact@ofarukbozkurt.com" className="meta-wide text-dimGray hover:text-offWhite transition-colors duration-300">
                            Contact
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right: Profil Fotoğrafı - RENKLİ */}
                <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-shrink-0 relative"
                >
                    {/* Hafif Işık Hüzmesi */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: -25,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(88,28,135,0.12) 0%, rgba(120,20,40,0.08) 40%, transparent 70%)',
                            zIndex: 0
                        }}
                    />

                    {/* Profil Fotoğrafı */}
                    <div
                        style={{
                            position: 'relative',
                            width: 'clamp(280px, 35vw, 400px)',
                            height: 'clamp(280px, 35vw, 400px)',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            zIndex: 1,
                            border: '2px solid rgba(255,255,255,0.08)'
                        }}
                    >
                        {/* GRAYSCALE KALDIRILDI - ORJİNAL RENK */}
                        <img
                            src="/gorseller/profil/ben.webp"
                            alt="Ömer Faruk Bozkurt"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block'
                            }}
                            loading="eager"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
