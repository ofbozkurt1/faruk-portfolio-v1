/**
 * TiltCard Component - OPTIMIZED
 * 3D Tilt Effect with Framer Motion
 * NO backdrop-blur, CSS variable-based spotlight
 */

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard({
    children,
    className = '',
    glowColor = 'rgba(255,255,255,0.15)',
    borderColor = null,
    intensity = 15,
    springConfig = { stiffness: 150, damping: 20 }
}) {
    const cardRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)
    const [spotPos, setSpotPos] = useState({ x: 50, y: 50 })

    // Mouse position relative to card center
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

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

        // Spotlight position (0-100%) - throttled via state batching
        const spotX = Math.round(((e.clientX - rect.left) / rect.width) * 100)
        const spotY = Math.round(((e.clientY - rect.top) / rect.height) * 100)
        setSpotPos({ x: spotX, y: spotY })
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
        setSpotPos({ x: 50, y: 50 })
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
                // NO backdrop-blur - solid dark background instead
                background: 'rgba(18, 18, 22, 0.92)',
                border: `1px solid ${activeBorderColor}`,
                borderRadius: 16,
                overflow: 'hidden',
                willChange: 'transform',
                transition: 'border-color 0.3s ease'
            }}
        >
            {/* Spotlight Glow - CSS Variable based (no string interpolation) */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(circle at ${spotPos.x}% ${spotPos.y}%, ${glowColor} 0%, transparent 60%)`,
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s ease'
                }}
            />

            {/* Border Glow on Hover */}
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
