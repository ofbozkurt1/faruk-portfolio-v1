/**
 * Hero Component - PHASE 35 OPTIMIZED
 * Smart animation: pauses when scrolled out of view
 */

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import { FaBehance, FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { cn } from '../../utils/cn'
import HeroBackground from './HeroBackground'
import ResponsiveImage from '../../components/ui/ResponsiveImage'
import { lockBodyScroll } from '../../utils/scrollLock'
import { usePrefersReducedMotion } from '../../hooks'

// Detect mobile for LCP optimization
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768


// Mobile: No container animation for instant LCP
const containerVariantsMobile = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 }
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
}

// Mobile: No animations for instant LCP
const itemVariantsMobile = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
}

// Mobile: No letter animation
const letterVariantsMobile = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
}

// Letter animation variants - NO BLUR for performance
const letterVariants = {
    hidden: {
        opacity: 0,
        y: 40
        // NO filter: blur - too expensive for 17 elements
    },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.04,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }),
    exit: (i) => ({
        opacity: 0,
        y: -20,
        transition: {
            delay: i * 0.02,
            duration: 0.3
        }
    })
}

const firstName = "ÖMER FARUK"
const lastName = "BOZKURT"

export default function Hero({ className }) {
    const { t } = useTranslation()
    const prefersReducedMotion = usePrefersReducedMotion()
    const [animationKey, setAnimationKey] = useState(0)
    const [isPhotoHovered, setIsPhotoHovered] = useState(false)
    const [mobile] = useState(() => isMobile())
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Active variants based on device
    const activeContainerVariants = (mobile || prefersReducedMotion) ? containerVariantsMobile : containerVariants
    const activeItemVariants = (mobile || prefersReducedMotion) ? itemVariantsMobile : itemVariants
    const activeLetterVariants = (mobile || prefersReducedMotion) ? letterVariantsMobile : letterVariants

    // Visibility tracking for smart animation
    const heroRef = useRef(null)
    const isInView = useInView(heroRef, { amount: 0.3 })

    // Body scroll lock specifically for modal
    useEffect(() => {
        if (!isModalOpen) return undefined
        return lockBodyScroll('hero-about-modal')
    }, [isModalOpen])

    // Replay animation only when VISIBLE
    useEffect(() => {
        if (!isInView || prefersReducedMotion) return // Don't run timer when off-screen or motion is reduced

        const interval = setInterval(() => {
            setAnimationKey(prev => prev + 1)
        }, 6000)
        return () => clearInterval(interval)
    }, [isInView, prefersReducedMotion])

    const renderAnimatedText = (text, offset = 0) => (
        <span style={{ display: 'inline-block' }}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={`${animationKey}-${i}`}
                    custom={i + offset}
                    variants={activeLetterVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        display: 'inline-block',
                        whiteSpace: char === ' ' ? 'pre' : 'normal'
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    )

    return (
        <section
            ref={heroRef}
            id="about"
            className={cn(
                "min-h-[85vh] md:min-h-screen flex flex-col items-center justify-center relative overflow-hidden",
                "container-padding pt-24 pb-8 md:pt-28 md:pb-20",
                className
            )}
        >
            {/* Ghost Reel Background - Desktop Only */}
            {!mobile && <HeroBackground isActive={isInView && !prefersReducedMotion} />}

            <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-28 w-full items-center justify-center relative z-10">

                {/* Text Content */}
                <motion.div
                    variants={activeContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-shrink-0 lg:max-w-lg text-center lg:text-left items-center lg:items-start flex flex-col"
                >
                    {/* Name with dynamic letter animation - Single line on mobile */}
                    {/* Name with dynamic letter animation - Single line on mobile */}
                    {/* Name with dynamic letter animation - Single line on mobile */}
                    <motion.h1
                        variants={activeItemVariants}
                        className="text-[clamp(26px,6.5vw,80px)] md:text-7xl font-extrabold tracking-[-0.03em] leading-[1.1] text-[#F2F2F2] whitespace-nowrap opacity-100 md:opacity-0 mb-1 md:mb-0"
                    >
                        {mobile ? (
                            `${firstName} ${lastName}`
                        ) : (
                            <>
                                {renderAnimatedText(firstName)}
                                {/* Space between names on mobile, break on desktop */}
                                <span className="md:hidden"> </span>
                                <br className="hidden md:block" />
                                {renderAnimatedText(lastName, firstName.length)}
                            </>
                        )}
                    </motion.h1>

                    {/* Title below name - Matched width via spacing */}
                    <motion.p
                        variants={activeItemVariants}
                        className="mt-1 mb-2 md:mt-6 md:mb-6 text-[13px] md:text-xl font-semibold tracking-[0.4em] md:tracking-[0.25em] uppercase text-center lg:text-left w-full"
                        style={{
                            background: 'linear-gradient(90deg, #888, #fff, #888)',
                            backgroundSize: '200% 100%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: (prefersReducedMotion || !isInView) ? 'none' : 'title-shine 4s ease-in-out infinite',
                            opacity: 1 // Ensure instant visibility on mobile
                        }}
                    >
                        {t('hero.role', 'Motion & Graphic Designer')}
                    </motion.p>

                    {/* Separator line - Mobile only for visual hierarchy */}
                    <motion.div
                        variants={activeItemVariants}
                        className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent my-3 md:hidden"
                    />

                    <motion.p
                        variants={activeItemVariants}
                        className="text-gray-300 font-medium max-w-[85vw] md:max-w-none md:whitespace-nowrap text-sm md:text-lg leading-relaxed opacity-100 md:opacity-0 text-center lg:text-left"
                    >
                        {t('hero.description', 'Creating immersive visual experiences through motion and design.')}
                    </motion.p>

                    {/* Action Buttons - CV + Who Am I */}
                    <motion.div variants={activeItemVariants} className="mt-6 md:mt-8 flex flex-row items-center justify-center lg:justify-start gap-3 md:gap-4 w-full md:w-auto">
                        <a href="mailto:work@ofbozkurt.com?subject=CV%20Talebi" className="hero-download-btn">
                            <div className="btn-wrapper">
                                <div className="btn-text">{t('hero.downloadCV', 'CV Talep Et')}</div>
                                <span className="btn-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" />
                                    </svg>
                                </span>
                            </div>
                        </a>

                        {/* Who Am I Button */}
                        <button type="button" onClick={() => setIsModalOpen(true)} className="hero-about-btn">
                            <span>{t('hero.whoAmI', 'Ben Kimim?')}</span>
                        </button>
                    </motion.div>

                    {/* Button Styles - Outline Dark Theme */}
                    <style>{`
                        @keyframes blink {
                            0%, 50% { opacity: 1; }
                            51%, 100% { opacity: 0; }
                        }
                        
                        @keyframes title-shine {
                            0% { background-position: 200% 0; }
                            100% { background-position: -200% 0; }
                        }
                        
                        /* --- SHARED BUTTON STYLES --- */
                        .btn-wrapper, .btn-text, .btn-icon {
                            overflow: hidden;
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            left: 0;
                            color: #F2F2F2;
                            pointer-events: none;
                        }

                        .btn-text {
                            top: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                            font-size: 11px;
                            font-weight: 500;
                            letter-spacing: 0.1em;
                            text-transform: uppercase;
                            transition: top 0.4s ease;
                        }

                        .btn-icon {
                            color: #050505;
                            top: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: top 0.4s ease;
                        }

                        /* --- HERO DOWNLOAD BTN --- */
                        .hero-download-btn {
                            --width: 180px; /* Further Reduced for Desktop */
                            --height: 48px;
                            width: var(--width);
                            height: var(--height);
                            background: transparent;
                            border: 1px solid rgba(255,255,255,0.25);
                            position: relative;
                            text-align: center;
                            border-radius: 50px;
                            transition: all 0.4s ease;
                            display: block;
                            text-decoration: none;
                            overflow: hidden;
                            cursor: pointer;
                        }

                        .hero-download-btn::before {
                            content: "";
                            position: absolute;
                            width: 0;
                            height: 0;
                            background-color: #F2F2F2;
                            border-radius: 50%;
                            left: 50%;
                            bottom: 0;
                            transform: translate(-50%, 50%);
                            transition: all 0.5s ease;
                            z-index: -1;
                        }

                        .hero-download-btn:hover { border-color: #F2F2F2; }
                        .hero-download-btn:hover::before { width: 300px; height: 300px; }
                        .hero-download-btn:hover .btn-text { top: -100%; }
                        .hero-download-btn:hover .btn-icon { top: 0; }
                        .hero-download-btn:active { transform: scale(0.98); }

                        /* About Button */
                        .hero-about-btn {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 180px; 
                            height: 48px; 
                            background: transparent;
                            border: 1px solid #F2F2F2;
                            border-radius: 9999px;
                            color: #F2F2F2;
                            font-size: 11px;
                            font-weight: 500;
                            letter-spacing: 0.1em;
                            text-transform: uppercase;
                            text-decoration: none;
                            transition: all 0.3s ease;
                            position: relative;
                            overflow: hidden;
                            z-index: 1;
                        }

                        .hero-about-btn::before {
                            content: "";
                            position: absolute;
                            width: 0;
                            height: 0;
                            background-color: #F2F2F2;
                            border-radius: 50%;
                            left: 50%;
                            bottom: 0;
                            transform: translate(-50%, 50%);
                            transition: all 0.5s ease;
                            z-index: -1;
                        }

                        .hero-about-btn:hover {
                            border-color: #F2F2F2;
                            color: #0A0A0A;
                        }
                        
                        /* Force span color change */
                        .hero-about-btn:hover span {
                            color: #0A0A0A;
                            position: relative;
                            z-index: 2;
                        }

                        .hero-about-btn:hover::before {
                            width: 300px;
                            height: 300px;
                        }

                        /* Mobile Adjustments */
                        @media (max-width: 768px) {
                            .hero-download-btn {
                                --width: 140px;
                            }
                            .hero-about-btn {
                                width: 140px;
                            }
                        }
                    `}</style>
                </motion.div>

                {/* Profile Photo - CSS Float Animation (Performance Optimized) */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex-shrink-0 relative"
                    onMouseEnter={() => setIsPhotoHovered(true)}
                    onMouseLeave={() => setIsPhotoHovered(false)}
                >
                    {/* CSS Keyframes for Float - Cheaper than Framer Motion */}
                    <style>{`
                        @keyframes float-photo {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-10px); }
                        }
                    `}</style>

                    {/* Floating Photo Container - Pure CSS Animation */}
                    <div
                        className="w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden relative border border-black"
                        style={{
                            animation: (prefersReducedMotion || !isInView) ? 'none' : 'float-photo 4s ease-in-out infinite',
                            transform: isPhotoHovered ? 'scale(1.03)' : 'scale(1)',
                            transition: 'transform 0.4s ease',
                            willChange: (prefersReducedMotion || !isInView) ? 'auto' : 'transform'
                        }}
                    >
                        <ResponsiveImage
                            src="/gorseller/profil/ppwebp1.webp"
                            mobileSrc="/gorseller/profil/ppwebp1.webp"
                            alt="Ömer Faruk Bozkurt"
                            sizes="(max-width: 768px) 280px, 420px"
                            width="420"
                            height="420"
                            priority={true}
                            className="w-full h-full object-cover transition-transform duration-400"
                            style={{
                                transform: isPhotoHovered ? 'scale(1.1) scaleX(-1)' : 'scale(1) scaleX(-1)'
                            }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator - Larger on mobile */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="relative md:absolute mt-8 md:mt-0 md:bottom-10 md:left-1/2 md:-translate-x-1/2 flex justify-center w-full md:w-auto"
            >
                <motion.div
                    animate={prefersReducedMotion ? { y: 0 } : { y: [0, 10, 0] }}
                    transition={(prefersReducedMotion || !isInView) ? { duration: 0 } : { duration: 1.5, repeat: Infinity }}
                >
                    <FiChevronDown className="w-12 h-12 md:w-9 md:h-9" color="#666" />
                </motion.div>
            </motion.div>

            {/* Who Am I Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                        onTouchMove={(e) => e.preventDefault()}
                        data-lenis-prevent="true"
                        className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 touch-none overscroll-none"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                            className="bg-[#0A0A0A] border border-white/10 p-6 md:p-10 rounded-3xl max-w-2xl w-full relative shadow-[0_0_50px_rgba(0,0,0,0.5)] max-h-[85vh] overflow-y-auto overscroll-contain"
                        >
                            {/* Header */}
                            <div className="mb-8 relative flex items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-3xl font-bold text-white tracking-tight">{t('hero.modal.title')}</h3>
                                    <div className="h-[2px] w-12 bg-white/20"></div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    aria-label={t('common.close', 'Close')}
                                    className="text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full cursor-pointer"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                </button>
                            </div>

                            {/* Bio */}
                            <div className="space-y-6 mb-10">
                                <p className="text-gray-300 text-lg leading-relaxed font-light">
                                    {t('hero.modal.p1')}
                                </p>
                                <p className="text-gray-300 text-lg leading-relaxed font-light">
                                    {t('hero.modal.p2')}
                                </p>
                                <p className="text-gray-300 text-lg leading-relaxed font-light">
                                    {t('hero.modal.p3')}
                                </p>
                            </div>

                            {/* Footer (Contact) - ONLY SOCIALS + WhatsApp */}
                            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex flex-col gap-3 items-center md:items-start w-full">
                                    <h4 className="text-xs font-medium text-white/40 uppercase tracking-widest">{t('hero.modal.contactTitle')}</h4>
                                    <div className="flex items-center gap-3">
                                        <a href="https://www.instagram.com/of.bozkurt/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all border border-white/5 hover:border-white/20 hover:scale-110">
                                            <FaInstagram size={20} />
                                        </a>
                                        <a href="https://www.linkedin.com/in/ömer-faruk-bozkurt-45299530b" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all border border-white/5 hover:border-white/20 hover:scale-110">
                                            <FaLinkedinIn size={20} />
                                        </a>
                                        <a href="https://www.behance.net/ofbozkurt" target="_blank" rel="noopener noreferrer" aria-label="Behance" className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all border border-white/5 hover:border-white/20 hover:scale-110">
                                            <FaBehance size={20} />
                                        </a>
                                        <a href="https://wa.me/905076267821" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all border border-white/5 hover:border-white/20 hover:scale-110">
                                            <FaWhatsapp size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
