/**
 * Header Component
 * Animated gradient, scroll-based opacity
 */

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' }
]

export default function Header() {
    const [activeSection, setActiveSection] = useState('about')
    const [scrolled, setScrolled] = useState(false)

    // Scroll-based section detection
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY + 150
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight

        // Check if scrolled for opacity change
        setScrolled(window.scrollY > 50)

        // Check if at bottom of page - contact section
        if (scrollY + windowHeight >= documentHeight - 100) {
            setActiveSection('contact')
            return
        }

        // Get all section positions
        const sections = navLinks.map(link => {
            const el = document.querySelector(link.href)
            if (el) {
                return {
                    id: link.href.replace('#', ''),
                    top: el.offsetTop,
                    bottom: el.offsetTop + el.offsetHeight
                }
            }
            return null
        }).filter(Boolean)

        // Find current section
        for (let i = sections.length - 1; i >= 0; i--) {
            if (scrollY >= sections[i].top) {
                setActiveSection(sections[i].id)
                return
            }
        }

        if (sections.length > 0) {
            setActiveSection(sections[0].id)
        }
    }, [])

    useEffect(() => {
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    const handleClick = (e, href) => {
        e.preventDefault()
        const section = document.querySelector(href)
        if (section) {
            const top = section.offsetTop - 80
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '14px 5vw',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                overflow: 'hidden'
            }}
        >
            {/* Dark base background - uses opacity for smooth transition */}
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
                style={{
                    fontSize: 20,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: '#F2F2F2',
                    textDecoration: 'none'
                }}
            >
                OFB
            </a>

            {/* Center: Navigation */}
            <nav style={{
                display: 'flex',
                gap: 40,
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)'
            }}>
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

                            {/* Active indicator line with glow */}
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

            {/* Right side: Language Switch + Let's Talk */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                {/* Language Switch */}
                <div className="lang-switch">
                    <button className="lang-btn active">EN</button>
                    <span style={{ color: '#444', fontSize: 12 }}>|</span>
                    <button className="lang-btn">TR</button>
                </div>

                {/* Let's Talk Button */}
                <a
                    href="#contact"
                    onClick={(e) => handleClick(e, '#contact')}
                    className="lets-talk-btn"
                >
                    Let's Talk
                </a>
            </div>

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
        </motion.header>
    )
}
