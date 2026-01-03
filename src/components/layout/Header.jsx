/**
 * Header Component
 * Scroll-based active section detection
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

    // Scroll-based section detection
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY + 150 // Offset for header height
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight

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

        // Default to first section
        if (sections.length > 0) {
            setActiveSection(sections[0].id)
        }
    }, [])

    useEffect(() => {
        handleScroll() // Initial check
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
                backgroundColor: 'rgba(5, 5, 5, 0.95)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}
        >
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
            <nav style={{ display: 'flex', gap: 40 }}>
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

            {/* Right: Let's Talk Button */}
            <a
                href="#contact"
                onClick={(e) => handleClick(e, '#contact')}
                style={{
                    padding: '10px 24px',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#F2F2F2',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 50,
                    transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.6)'
                    e.target.style.boxShadow = '0 0 15px rgba(255,255,255,0.3)'
                }}
                onMouseLeave={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.2)'
                    e.target.style.boxShadow = 'none'
                }}
            >
                Let's Talk
            </a>
        </motion.header>
    )
}
