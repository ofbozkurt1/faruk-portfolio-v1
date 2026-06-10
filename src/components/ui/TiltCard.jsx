/**
 * TiltCard Component - PHASE 35 OPTIMIZED
 * 3D Tilt Effect with Framer Motion
 * NO useState for mouse position - uses CSS Variables (ZERO re-renders)
 */

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard({
    children,
    className = '',
    glowColor = 'rgba(255,255,255,0.15)',
    borderColor = null,
    intensity = 15,
    isMobile = false,
    springConfig = { stiffness: 150, damping: 20 }
}) {
    const cardRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    useEffect(() => {
        if (isMobile) {
            mouseX.set(0)
            mouseY.set(0)
            setIsHovered(false)
        }
    }, [isMobile, mouseX, mouseY])

    // Spring physics for smooth rotation
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), springConfig)
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), springConfig)

    const handleMouseMove = (e) => {
        // Performance Guard: Disable logic on mobile
        if (isMobile || !cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Normalized position (-0.5 to 0.5)
        const normalizedX = (e.clientX - centerX) / rect.width
        const normalizedY = (e.clientY - centerY) / rect.height

        mouseX.set(normalizedX)
        mouseY.set(normalizedY)

        // Spotlight position via CSS Variables (NO STATE UPDATE)
        const spotX = Math.round(((e.clientX - rect.left) / rect.width) * 100)
        const spotY = Math.round(((e.clientY - rect.top) / rect.height) * 100)
        cardRef.current.style.setProperty('--spot-x', `${spotX}%`)
        cardRef.current.style.setProperty('--spot-y', `${spotY}%`)
    }

    const handleMouseLeave = () => {
        if (isMobile) return
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
        if (cardRef.current) {
            cardRef.current.style.setProperty('--spot-x', '50%')
            cardRef.current.style.setProperty('--spot-y', '50%')
        }
    }

    // Dynamic border color
    const activeBorderColor = borderColor
        ? (isHovered && !isMobile ? borderColor : 'rgba(255,255,255,0.08)')
        : 'rgba(255,255,255,0.08)'

    // Mobile Static Gradient vs Desktop Dynamic Spotlight
    const backgroundGradient = isMobile
        ? `radial-gradient(circle at 50% 0%, ${glowColor} 0%, transparent 60%)` // Fixed top glow
        : `radial-gradient(circle at var(--spot-x) var(--spot-y), ${glowColor} 0%, transparent 60%)`

    return (
        <motion.div
            ref={cardRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                // Disable 3D tilt on mobile
                rotateX: isMobile ? 0 : rotateX,
                rotateY: isMobile ? 0 : rotateY,
                transformStyle: 'preserve-3d',
                transformPerspective: 1000,
                position: 'relative',
                background: 'rgba(18, 18, 22, 0.92)',
                border: `1px solid ${activeBorderColor}`,
                borderRadius: 16,
                overflow: 'hidden',
                willChange: 'transform',
                transition: 'border-color 0.3s ease',
                // CSS Variable defaults
                '--spot-x': '50%',
                '--spot-y': '50%'
            }}
        >
            {/* Spotlight / Static Glow */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: isMobile ? 0.6 : (isHovered ? 1 : 0), // Always show subtle glow on mobile
                    background: backgroundGradient,
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s ease'
                }}
            />

            {/* Border Glow on Hover (Desktop Only) */}
            {!isMobile && (
                <div
                    style={{
                        position: 'absolute',
                        inset: -1,
                        borderRadius: 17,
                        opacity: isHovered ? 1 : 0,
                        background: `linear-gradient(135deg, ${glowColor}, transparent 50%)`,
                        pointerEvents: 'none',
                        transition: 'opacity 0.3s ease',
                        zIndex: -1
                    }}
                />
            )}

            {/* Content with Z-translate for parallax (Reduced on mobile) */}
            <div
                style={{
                    position: 'relative',
                    transform: isMobile ? 'none' : 'translateZ(20px)',
                    transformStyle: 'preserve-3d',
                    height: '100%'
                }}
            >
                {children}
            </div>
        </motion.div>
    )
}
