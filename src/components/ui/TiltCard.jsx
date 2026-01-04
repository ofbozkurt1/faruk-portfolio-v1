/**
 * TiltCard Component
 * 3D Tilt Effect with Framer Motion
 * Glassmorphism + Mouse-following spotlight + Dynamic Border
 */

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard({
    children,
    className = '',
    glowColor = 'rgba(255,255,255,0.15)',
    borderColor = null, // Brand color for hover border
    intensity = 15,
    springConfig = { stiffness: 150, damping: 20 }
}) {
    const cardRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    // Mouse position relative to card center
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Spotlight position (0-100%)
    const spotlightX = useMotionValue(50)
    const spotlightY = useMotionValue(50)

    // Spring physics for smooth rotation
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), springConfig)
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), springConfig)

    const handleMouseMove = (e) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Normalized position (-0.5 to 0.5)
        const normalizedX = (e.clientX - centerX) / rect.width
        const normalizedY = (e.clientY - centerY) / rect.height

        mouseX.set(normalizedX)
        mouseY.set(normalizedY)

        // Spotlight position (0-100%)
        const spotX = ((e.clientX - rect.left) / rect.width) * 100
        const spotY = ((e.clientY - rect.top) / rect.height) * 100
        spotlightX.set(spotX)
        spotlightY.set(spotY)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
        spotlightX.set(50)
        spotlightY.set(50)
    }

    // Dynamic border color
    const activeBorderColor = borderColor
        ? (isHovered ? borderColor : 'rgba(255,255,255,0.08)')
        : 'rgba(255,255,255,0.08)'

    return (
        <motion.div
            ref={cardRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                transformPerspective: 1000,
                position: 'relative',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: `1px solid ${activeBorderColor}`,
                borderRadius: 16,
                overflow: 'hidden',
                willChange: 'transform',
                transition: 'border-color 0.3s ease'
            }}
        >
            {/* Spotlight Glow Effect */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: isHovered ? 1 : 0,
                    background: useTransform(
                        [spotlightX, spotlightY],
                        ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${glowColor} 0%, transparent 60%)`
                    ),
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s ease'
                }}
            />

            {/* Border Glow on Hover */}
            <motion.div
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

            {/* Content with Z-translate for parallax */}
            <div
                style={{
                    position: 'relative',
                    transform: 'translateZ(20px)',
                    transformStyle: 'preserve-3d',
                    height: '100%'
                }}
            >
                {children}
            </div>
        </motion.div>
    )
}
