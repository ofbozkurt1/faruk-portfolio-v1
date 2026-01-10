/**
 * Hero Component - PHASE 35 OPTIMIZED
 * Smart animation: pauses when scrolled out of view
 */

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { cn } from '../../utils/cn'
import HeroBackground from './HeroBackground'
import ResponsiveImage from '../../components/ui/ResponsiveImage'

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
    const [animationKey, setAnimationKey] = useState(0)
    const [isPhotoHovered, setIsPhotoHovered] = useState(false)
    const [mobile, setMobile] = useState(false)

    // Detect mobile on mount
    useEffect(() => {
        setMobile(isMobile())
    }, [])

    // Active variants based on device
    const activeContainerVariants = mobile ? containerVariantsMobile : containerVariants
    const activeItemVariants = mobile ? itemVariantsMobile : itemVariants
    const activeLetterVariants = mobile ? letterVariantsMobile : letterVariants

    // Visibility tracking for smart animation
    const heroRef = useRef(null)
    const isInView = useInView(heroRef, { amount: 0.3 })

    // Replay animation only when VISIBLE
    useEffect(() => {
        if (!isInView) return // Don't run timer when off-screen

        const interval = setInterval(() => {
            setAnimationKey(prev => prev + 1)
        }, 6000)
        return () => clearInterval(interval)
    }, [isInView])

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
            <HeroBackground />

            <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-28 w-full items-center justify-center relative z-10">

                {/* Text Content */}
                <motion.div
                    variants={activeContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-shrink-0 lg:max-w-lg text-center lg:text-left items-center lg:items-start flex flex-col"
                >
                    {/* Name with dynamic letter animation - Single line on mobile */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-[clamp(26px,6.5vw,80px)] md:text-7xl font-extrabold tracking-[-0.03em] leading-[1.1] text-[#F2F2F2] whitespace-nowrap"
                    >
                        {renderAnimatedText(firstName)}
                        {/* Space between names on mobile, break on desktop */}
                        <span className="md:hidden"> </span>
                        <br className="hidden md:block" />
                        {renderAnimatedText(lastName, firstName.length)}
                    </motion.h1>

                    {/* Title below name */}
                    <motion.p
                        variants={activeItemVariants}
                        className="mt-2 md:mt-6 mb-2 md:mb-6"
                        style={{
                            fontSize: '11px',
                            fontWeight: 500,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            background: 'linear-gradient(90deg, #888, #fff, #888)',
                            backgroundSize: '200% 100%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: 'title-shine 4s ease-in-out infinite',
                            opacity: 1 // Ensure instant visibility on mobile
                        }}
                    >
                        {t('hero.role', 'Motion & Graphic Designer')}
                    </motion.p>

                    {/* Separator line - Mobile only for visual hierarchy */}
                    <motion.div
                        variants={activeItemVariants}
                        className="w-10 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mb-2 md:hidden"
                    />

                    <motion.p
                        variants={activeItemVariants}
                        className="text-dimGray max-w-xs md:max-w-md text-sm md:text-base leading-relaxed opacity-100 md:opacity-0"
                    >
                        {t('hero.description', 'Creating immersive visual experiences through motion and design.')}
                    </motion.p>

                    {/* Action Buttons - CV + About (Mobile: side by side) */}
                    <motion.div variants={activeItemVariants} className="mt-4 md:mt-8 flex items-center justify-center lg:justify-start gap-3 md:gap-4">
                        <a href="/cv.pdf" download className="download-btn">
                            <div className="btn-wrapper">
                                <div className="btn-text">{t('hero.downloadCV', 'Download CV')}</div>
                                <span className="btn-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" />
                                    </svg>
                                </span>
                            </div>
                        </a>

                        {/* About Button - Mobile only */}
                        <a href="#about" className="about-btn md:hidden">
                            <span>{t('hero.about', 'Hakkımda')}</span>
                        </a>
                    </motion.div>

                    {/* Social Icons - Desktop: inline, Mobile: bottom centered */}
                    <motion.div
                        variants={itemVariants}
                        className="hidden md:flex items-center gap-4 mt-4"
                    >
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Behance">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 448 512" fill="currentColor">
                                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                            </svg>
                        </a>
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
                        
                        .download-btn {
                            --width: 150px;
                            --height: 44px;
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
                        }

                        .btn-wrapper, .btn-text, .btn-icon {
                            overflow: hidden;
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            left: 0;
                            color: #F2F2F2;
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
                        }

                        .btn-text, .btn-icon {
                            transition: top 0.4s ease;
                        }

                        .btn-icon {
                            color: #050505;
                            top: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .download-btn::before {
                            content: "";
                            position: absolute;
                            width: 0;
                            height: 0;
                            background-color: #F2F2F2;
                            border-radius: 50%;
                            left: 50%;
                            bottom: 0;
                            transform: translate(-50%, 50%);
                            transition: all 0.4s ease;
                            z-index: -1;
                        }

                        .download-btn:hover {
                            border-color: #F2F2F2;
                        }

                        .download-btn:hover::before {
                            width: 200px;
                            height: 200px;
                        }

                        .download-btn:hover .btn-text {
                            top: -100%;
                        }

                        .download-btn:hover .btn-icon {
                            top: 0;
                        }
                        
                        .download-btn:active {
                            transform: scale(0.98);
                        }
                        
                        .social-icon {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 46px;
                            height: 46px;
                            border-radius: 50%;
                            background: rgba(255,255,255,0.05);
                            border: 1px solid rgba(255,255,255,0.1);
                            color: #F2F2F2;
                            transition: all 0.3s ease;
                        }
                        
                        .social-icon svg {
                            width: 18px;
                            height: 18px;
                        }
                        
                        .social-icon:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
                        }
                        
                        .social-icon[aria-label="LinkedIn"]:hover {
                            background: #0A66C2;
                            border-color: #0A66C2;
                        }
                        
                        .social-icon[aria-label="Behance"]:hover {
                            background: #1769FF;
                            border-color: #1769FF;
                        }
                        
                        .social-icon[aria-label="Instagram"]:hover {
                            background: linear-gradient(135deg, #833AB4, #C13584, #E1306C, #FD1D1D);
                            border-color: #C13584;
                        }

                        .whatsapp-icon:hover {
                            background: #25D366;
                            border-color: #25D366;
                        }

                        /* About Button - matches download-btn style */
                        .about-btn {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 150px; /* Default desktop width */
                            height: 44px; /* Match download-btn height */
                            background: transparent;
                            border: 1px solid rgba(255,255,255,0.25);
                            border-radius: 50px;
                            color: #F2F2F2;
                            font-size: 11px;
                            font-weight: 500;
                            letter-spacing: 0.1em;
                            text-transform: uppercase;
                            text-decoration: none;
                            transition: all 0.3s ease;
                        }

                        .about-btn:hover {
                            border-color: #F2F2F2;
                            background: rgba(255,255,255,0.05);
                        }

                        /* Mobile Adjustments */
                        @media (max-width: 768px) {
                            .download-btn {
                                --width: 136px;
                            }
                            .about-btn {
                                width: 136px;
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
                        className="w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden relative"
                        style={{
                            animation: 'float-photo 4s ease-in-out infinite',
                            transform: isPhotoHovered ? 'scale(1.03)' : 'scale(1)',
                            transition: 'transform 0.4s ease',
                            willChange: 'transform'
                        }}
                    >
                        <ResponsiveImage
                            src="/gorseller/profil/ben.webp"
                            mobileSrc="/gorseller/mobilgorseller/mobilprofil/ben.webp"
                            alt="Ömer Faruk Bozkurt"
                            sizes="(max-width: 768px) 280px, 420px"
                            width="420"
                            height="420"
                            priority={true}
                            className="w-full h-full object-cover transition-transform duration-400"
                            style={{
                                transform: isPhotoHovered ? 'scale(1.1)' : 'scale(1)'
                            }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Mobile Social Icons - Bottom Centered with WhatsApp */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex md:hidden items-center justify-center gap-4 mt-6"
            >
                <a href="https://wa.me/905551234567" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp-icon" aria-label="WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                </a>
                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Behance">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                    </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 448 512" fill="currentColor">
                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                    </svg>
                </a>
            </motion.div>

            {/* Scroll Indicator - Larger on mobile */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="relative md:absolute mt-8 md:mt-0 md:bottom-10 md:left-1/2 md:-translate-x-1/2 flex justify-center w-full md:w-auto"
            >
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <FiChevronDown className="w-12 h-12 md:w-9 md:h-9" color="#666" />
                </motion.div>
            </motion.div>
        </section>
    )
}
