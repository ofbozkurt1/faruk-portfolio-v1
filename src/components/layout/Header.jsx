/**
 * Header Component - OPTIMIZED
 * Throttled scroll handler, passive listeners
 * i18n support with cinematic wipe transition
 */

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLanguageTransitionStore } from '../../stores/languageTransitionStore'
import { lockBodyScroll } from '../../utils/scrollLock'
import { useActiveSection, usePrefersReducedMotion } from '../../hooks'

// Navigation links - will use translation keys
const getNavLinks = (t) => [
    { label: t('nav.about', 'About'), href: '#about' },
    { label: t('nav.skills', 'Skills'), href: '#skills' },
    { label: t('nav.services', 'Services'), href: '#services' },
    { label: t('nav.work', 'Portfolio'), href: '#portfolio' },
    { label: t('nav.contact', 'Contact'), href: '#contact' }
]

export default function Header() {
    const { t, i18n } = useTranslation()
    const { startTransition } = useLanguageTransitionStore()
    const prefersReducedMotion = usePrefersReducedMotion()
    const activeSection = useActiveSection()
    const [scrolled, setScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Memoize navLinks based on current language
    const navLinks = useMemo(() => getNavLinks(t), [t])

    // Lock body scroll when menu is open
    useEffect(() => {
        if (!isMenuOpen) return undefined
        return lockBodyScroll('mobile-menu')
    }, [isMenuOpen])

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleClick = (e, href) => {
        e.preventDefault()
        setIsMenuOpen(false) // Close mobile menu
        const section = document.querySelector(href)
        if (section) {
            const top = section.offsetTop - 80
            window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
        }
    }

    // Language Toggle Component (Reusable with Mobile Variation)
    const LanguageToggle = ({ isMobile = false }) => {
        // Mobile: Close menu and change language
        const handleMobileLanguageChange = (lang) => {
            if (i18n.language !== lang) {
                setIsMenuOpen(false) // Close menu first
                setTimeout(() => {
                    startTransition(lang) // Then start transition
                }, 100)
            }
        }

        if (isMobile) {
            return (
                <div className="flex items-center bg-black/40 border border-white/20 rounded-full p-1">
                    <button
                        onClick={() => handleMobileLanguageChange('tr')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${i18n.language === 'tr'
                            ? 'bg-[#F2F2F2] text-black shadow-lg'
                            : 'text-[#F2F2F2]/60 hover:text-[#F2F2F2]'
                            }`}
                    >
                        TR
                    </button>
                    <button
                        onClick={() => handleMobileLanguageChange('en')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${i18n.language === 'en'
                            ? 'bg-[#F2F2F2] text-black shadow-lg'
                            : 'text-[#F2F2F2]/60 hover:text-[#F2F2F2]'
                            }`}
                    >
                        EN
                    </button>
                </div>
            )
        }

        return (
            <div className="lang-switch">
                <button
                    className={`lang-btn ${i18n.language === 'tr' ? 'active' : ''}`}
                    onClick={() => i18n.language !== 'tr' && startTransition('tr')}
                >
                    TR
                </button>
                <span style={{ color: '#444', fontSize: 12 }}>|</span>
                <button
                    className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                    onClick={() => i18n.language !== 'en' && startTransition('en')}
                >
                    EN
                </button>
            </div>
        )
    }

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="fixed top-0 left-0 right-0 z-[1000] px-[5vw] py-4 flex justify-between items-center"
            >
                {/* Dark base background */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, rgba(5,5,5,0.95) 0%, rgba(25,8,12,0.95) 50%, rgba(5,5,5,0.95) 100%)',
                        opacity: scrolled ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                        zIndex: -1
                    }}
                />

                {/* Left: OFB Logo */}
                <a
                    href="#about"
                    onClick={(e) => handleClick(e, '#about')}
                    className="text-xl font-bold tracking-[0.1em] text-[#F2F2F2] no-underline relative z-50"
                >
                    OFB
                </a>

                {/* Desktop: Navigation (Center) */}
                <nav className="hidden md:flex gap-10 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.replace('#', '')

                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                style={{
                                    position: 'relative',
                                    color: isActive ? '#F2F2F2' : '#666',
                                    fontSize: 13,
                                    fontWeight: 500,
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    textDecoration: 'none',
                                    padding: '8px 0',
                                    transition: 'color 0.3s'
                                }}
                            >
                                {link.label}
                                <span
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: 2,
                                        background: '#F2F2F2',
                                        borderRadius: 1,
                                        boxShadow: '0 0 8px rgba(255,255,255,0.6), 0 0 12px rgba(255,255,255,0.3)',
                                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                                        opacity: isActive ? 1 : 0,
                                        transition: 'transform 0.3s, opacity 0.3s'
                                    }}
                                />
                            </a>
                        )
                    })}
                </nav>

                {/* Desktop: Right side */}
                <div className="hidden md:flex items-center gap-6">
                    <LanguageToggle />
                    <a href="https://wa.me/905076267821" target="_blank" rel="noopener noreferrer" className="lets-talk-btn">
                        {t('nav.letsTalk', "Let's Talk")}
                    </a>
                </div>

                {/* Mobile: Hamburger Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? t('common.closeMenu') : t('common.openMenu')}
                    className="md:hidden relative z-50 p-2 text-[#F2F2F2]"
                >
                    <div className="flex flex-col gap-[6px] items-end">
                        <motion.span
                            animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
                            className="w-6 h-[2px] bg-white block"
                        />
                        <motion.span
                            animate={{ opacity: isMenuOpen ? 0 : 1 }}
                            className="w-4 h-[2px] bg-white block"
                        />
                        <motion.span
                            animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
                            className="w-6 h-[2px] bg-white block"
                        />
                    </div>
                </button>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[900] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center py-10 md:hidden overflow-hidden"
                    >
                        {/* Mobile Lang Switch - Closer to menu */}
                        <div className="mb-8 flex-shrink-0">
                            <LanguageToggle isMobile />
                        </div>

                        <nav className="flex flex-col items-center justify-center gap-8 w-full px-4 flex-shrink-0">
                            {navLinks.map((link, i) => {
                                const isActive = activeSection === link.href.replace('#', '')
                                return (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        onClick={(e) => handleClick(e, link.href)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                        className={`relative text-center w-full max-w-[300px] text-2xl sm:text-3xl font-bold tracking-widest uppercase ${isActive ? 'text-white' : 'text-zinc-500'}`}
                                        style={{ wordBreak: 'break-word' }}
                                    >
                                        <span className="relative inline-block pb-1">
                                            {link.label}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="mobileActiveLine"
                                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                        </span>
                                    </motion.a>
                                )
                            })}
                        </nav>

                        <motion.a
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            href="https://wa.me/905076267821"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lets-talk-btn mt-10 !px-8 !py-3 !text-sm flex-shrink-0"
                        >
                            {t('nav.letsTalk', "Let's Talk")}
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Let's Talk Button Styles */}
            <style>{`
                .lets-talk-btn {
                    padding: 10px 24px;
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #F2F2F2;
                    text-decoration: none;
                    border: 1px solid rgba(255,255,255,0.25);
                    border-radius: 50px;
                    background: transparent;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.5s ease;
                    z-index: 1;
                }
                
                .lets-talk-btn::before {
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
                
                .lets-talk-btn:hover::before {
                    width: 200px;
                    height: 200px;
                }
                
                .lets-talk-btn:hover {
                    color: #050505;
                    border-color: #F2F2F2;
                    transform: scale(1.05);
                }
                
                .lets-talk-btn:active {
                    transform: scale(0.98);
                }
                
                .lang-switch {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .lang-btn {
                    background: none;
                    border: none;
                    color: #666;
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.1em;
                    cursor: pointer;
                    padding: 6px 8px;
                    transition: all 0.3s ease;
                }
                
                .lang-btn:hover {
                    color: #F2F2F2;
                }
                
                .lang-btn.active {
                    color: #F2F2F2;
                }
            `}</style>
        </>
    )
}
