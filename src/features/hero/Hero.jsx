/**
 * Hero Component
 */

import { motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import { cn } from '../../utils/cn'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
}

export default function Hero({ className }) {
    return (
        <section
            id="about"
            className={cn(
                "min-h-[90vh] flex flex-col items-center justify-center relative",
                "container-padding pt-24 pb-16",
                className
            )}
        >
            <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-24 w-full items-center justify-center">

                {/* Text Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-shrink-0 lg:max-w-lg text-center lg:text-left"
                >
                    <motion.p
                        variants={itemVariants}
                        className="meta-wide mb-4 text-dimGray"
                    >
                        Motion & Graphic Designer
                    </motion.p>

                    <motion.h1
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(38px, 6vw, 68px)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            color: '#F2F2F2'
                        }}
                    >
                        ÖMER FARUK<br />BOZKURT
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="mt-5 text-dimGray max-w-md text-base leading-relaxed mx-auto lg:mx-0"
                    >
                        Creating immersive visual experiences through motion and design.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="mt-6 flex items-center justify-center lg:justify-start gap-6"
                    >
                        <a href="#portfolio" className="meta-wide text-offWhite hover:text-dimGray transition-colors">Works ↓</a>
                        <a href="#skills" className="meta-wide text-dimGray hover:text-offWhite transition-colors">Skills</a>
                        <a href="#contact" className="meta-wide text-dimGray hover:text-offWhite transition-colors">Contact</a>
                    </motion.div>
                </motion.div>

                {/* Profile Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex-shrink-0 relative"
                >
                    <div
                        style={{
                            position: 'absolute',
                            inset: -25,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(88,28,135,0.12) 0%, rgba(120,20,40,0.08) 40%, transparent 70%)'
                        }}
                    />
                    <div
                        style={{
                            position: 'relative',
                            width: 'clamp(260px, 32vw, 380px)',
                            height: 'clamp(260px, 32vw, 380px)',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '2px solid rgba(255,255,255,0.08)'
                        }}
                    >
                        <img
                            src="/gorseller/profil/ben.webp"
                            alt="Ömer Faruk Bozkurt"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }}
            >
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <FiChevronDown size={28} color="#888" />
                </motion.div>
            </motion.div>
        </section>
    )
}
