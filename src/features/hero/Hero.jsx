/**
 * Hero Component
 * Dynamic letter animation, Download CV button
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

// Letter animation variants
const letterVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        filter: 'blur(10px)'
    },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            delay: i * 0.04,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }),
    exit: (i) => ({
        opacity: 0,
        y: -30,
        filter: 'blur(5px)',
        transition: {
            delay: i * 0.02,
            duration: 0.3
        }
    })
}

const firstName = "ÖMER FARUK"
const lastName = "BOZKURT"

export default function Hero({ className }) {
    const [animationKey, setAnimationKey] = useState(0)
    const [isPhotoHovered, setIsPhotoHovered] = useState(false)

    // Replay animation every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationKey(prev => prev + 1)
        }, 6000)
        return () => clearInterval(interval)
    }, [])

    const renderAnimatedText = (text, offset = 0) => (
        <span style={{ display: 'inline-block' }}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={`${animationKey}-${i}`}
                    custom={i + offset}
                    variants={letterVariants}
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
            id="about"
            className={cn(
                "min-h-screen flex flex-col items-center justify-center relative",
                "container-padding pt-28 pb-20",
                className
            )}
        >
            <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-28 w-full items-center justify-center">

                {/* Text Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-shrink-0 lg:max-w-lg text-center lg:text-left"
                >
                    {/* Name with dynamic letter animation */}
                    <motion.h1
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(38px, 6vw, 68px)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            color: '#F2F2F2',
                            minHeight: 'clamp(84px, 13vw, 150px)'
                        }}
                    >
                        {renderAnimatedText(firstName)}
                        <br />
                        {renderAnimatedText(lastName, firstName.length)}
                    </motion.h1>

                    {/* Title below name - More prominent */}
                    <motion.p
                        variants={itemVariants}
                        className="mt-6 mb-6"
                        style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            background: 'linear-gradient(90deg, #888, #fff, #888)',
                            backgroundSize: '200% 100%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: 'title-shine 4s ease-in-out infinite'
                        }}
                    >
                        Motion & Graphic Designer
                    </motion.p>

                    <motion.p
                        variants={itemVariants}
                        className="text-dimGray max-w-md text-base leading-relaxed mx-auto lg:mx-0"
                    >
                        Creating immersive visual experiences through motion and design.
                    </motion.p>

                    {/* Download CV Button + Social Icons */}
                    <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center lg:justify-start gap-6">
                        <a href="/cv.pdf" download className="download-btn">
                            <div className="btn-wrapper">
                                <div className="btn-text">Download CV</div>
                                <span className="btn-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" />
                                    </svg>
                                </span>
                            </div>
                        </a>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
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
                        </div>
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
                    `}</style>
                </motion.div>

                {/* Profile Photo - Clean with Float & Zoom */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex-shrink-0 relative"
                    onMouseEnter={() => setIsPhotoHovered(true)}
                    onMouseLeave={() => setIsPhotoHovered(false)}
                >
                    {/* Floating Photo Container */}
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            position: 'relative',
                            width: 'clamp(300px, 35vw, 420px)',
                            height: 'clamp(300px, 35vw, 420px)',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            transform: isPhotoHovered ? 'scale(1.03)' : 'scale(1)',
                            transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
                        }}
                    >
                        <img
                            src="/gorseller/profil/ben.webp"
                            alt="Ömer Faruk Bozkurt"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.4s ease',
                                transform: isPhotoHovered ? 'scale(1.1)' : 'scale(1)'
                            }}
                        />
                    </motion.div>
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
