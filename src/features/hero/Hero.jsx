/**
 * Hero Component
 * Typewriter animation, Download CV button
 */

import { useState, useEffect } from 'react'
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

const fullName = "ÖMER FARUK BOZKURT"

export default function Hero({ className }) {
    const [displayedText, setDisplayedText] = useState(fullName)
    const [isTyping, setIsTyping] = useState(false)
    const [isPhotoHovered, setIsPhotoHovered] = useState(false)

    // Retype animation every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTyping(true)
            setDisplayedText("")

            let charIndex = 0
            const typeInterval = setInterval(() => {
                if (charIndex < fullName.length) {
                    setDisplayedText(fullName.slice(0, charIndex + 1))
                    charIndex++
                } else {
                    clearInterval(typeInterval)
                    setIsTyping(false)
                }
            }, 50)

        }, 5000)

        return () => clearInterval(interval)
    }, [])

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
                    {/* Name with typewriter animation */}
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
                        {displayedText.includes('BOZKURT')
                            ? <>ÖMER FARUK<br />BOZKURT</>
                            : displayedText.includes('FARUK')
                                ? <>ÖMER FARUK<br />{displayedText.slice(11)}</>
                                : displayedText
                        }
                        {isTyping && (
                            <span style={{
                                borderRight: '3px solid #F2F2F2',
                                marginLeft: 2,
                                animation: 'blink 0.5s infinite'
                            }} />
                        )}
                    </motion.h1>

                    {/* Title below name */}
                    <motion.p
                        variants={itemVariants}
                        className="meta-wide mt-4 mb-5"
                        style={{ color: '#888' }}
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
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Behance">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                                </svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
                        
                        .download-btn {
                            --width: 150px;
                            --height: 44px;
                            width: var(--width);
                            height: var(--height);
                            background: transparent;
                            border: 1px solid rgba(255,255,255,0.25);
                            position: relative;
                            text-align: center;
                            border-radius: 12px;
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
                            width: 42px;
                            height: 42px;
                            border-radius: 10px;
                            background: rgba(255,255,255,0.05);
                            border: 1px solid rgba(255,255,255,0.1);
                            color: #F2F2F2;
                            transition: all 0.3s ease;
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

                {/* Profile Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex-shrink-0 relative"
                    onMouseEnter={() => setIsPhotoHovered(true)}
                    onMouseLeave={() => setIsPhotoHovered(false)}
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
                            transform: isPhotoHovered ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.3s ease'
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
