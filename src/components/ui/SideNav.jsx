/**
 * SideNav Component
 * Section indicator dots - auto-hide when not scrolling
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useActiveSection, usePrefersReducedMotion } from '../../hooks'

const sections = [
    { id: 'about', labelKey: 'nav.about' },
    { id: 'skills', labelKey: 'nav.skills' },
    { id: 'services', labelKey: 'nav.services' },
    { id: 'portfolio', labelKey: 'nav.work' },
    { id: 'contact', labelKey: 'nav.contact' }
]

export default function SideNav() {
    const { t } = useTranslation()
    const prefersReducedMotion = usePrefersReducedMotion()
    const activeSection = useActiveSection()
    const [isVisible, setIsVisible] = useState(false)
    const hideTimeout = useRef(null)

    // Scroll detection
    const handleScroll = useCallback(() => {
        // Show nav on scroll
        setIsVisible(true)

        // Clear existing timeout
        if (hideTimeout.current) {
            clearTimeout(hideTimeout.current)
        }

        // Hide after 2 seconds of no scrolling
        hideTimeout.current = setTimeout(() => {
            setIsVisible(false)
        }, 2000)

    }, [])

    useEffect(() => {
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (hideTimeout.current) {
                clearTimeout(hideTimeout.current)
            }
        }
    }, [handleScroll])

    const scrollToSection = (id) => {
        const el = document.querySelector(`#${id}`)
        if (el) {
            const top = el.offsetTop - 80
            window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
        }
    }

    return (
        <div
            style={{
                position: 'fixed',
                right: 24,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => {
                hideTimeout.current = setTimeout(() => {
                    setIsVisible(false)
                }, 1000)
            }}
        >
            {sections.map((section) => {
                const isActive = activeSection === section.id
                return (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        aria-label={t(section.labelKey)}
                        style={{
                            width: isActive ? 10 : 8,
                            height: isActive ? 10 : 8,
                            borderRadius: '50%',
                            border: 'none',
                            background: isActive ? '#F2F2F2' : 'rgba(255,255,255,0.25)',
                            boxShadow: isActive ? '0 0 10px rgba(255,255,255,0.5)' : 'none',
                            cursor: 'pointer',
                            padding: 0,
                            transition: 'all 0.3s ease'
                        }}
                    />
                )
            })}
        </div>
    )
}
