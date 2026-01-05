/**
 * ServiceBackgroundLayer - Performance Optimized
 * CSS-only patterns, no images, no blend modes, no backdrop-filter
 * Uses will-change: opacity for GPU acceleration
 * Includes: Number watermark + Tool logos + Full color background
 */

import { motion } from 'framer-motion'
import { useServiceStore } from '../../stores/serviceStore'

// Service colors
const serviceColors = [
    '#9333EA', // 01 Motion Graphics - Purple
    '#3B82F6', // 02 Brand Identity - Blue
    '#EC4899', // 03 UI/UX Animation - Pink
    '#F97316'  // 04 Video Editing - Orange
]

const serviceNumbers = ['01', '02', '03', '04']

// Tool icons for each service (using existing project icons)
const serviceIcons = [
    ['/gorseller/iconlar/after-effects.svg'], // 01 Motion Graphics
    ['/gorseller/iconlar/photoshop.svg', '/gorseller/iconlar/illustrator.svg'], // 02 Brand Identity
    ['/gorseller/iconlar/after-effects.svg'], // 03 UI/UX Animation (Lottie exports from AE)
    ['/gorseller/iconlar/premiere-pro.svg'] // 04 Video Editing
]

export default function ServiceBackgroundLayer() {
    const activeServiceIndex = useServiceStore((state) => state.activeServiceIndex)

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none',
                overflow: 'hidden'
            }}
        >
            {/* Full color background for each service - SOFTER */}
            {serviceColors.map((color, index) => (
                <motion.div
                    key={`bg-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeServiceIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: 'linear' }}
                    style={{
                        position: 'absolute',
                        inset: '-10%',
                        background: `radial-gradient(ellipse at center, ${color}35 0%, ${color}15 40%, transparent 75%)`,
                        willChange: 'opacity',
                        pointerEvents: 'none'
                    }}
                />
            ))}

            {/* Large Number Watermark + Tool Icons */}
            {serviceNumbers.map((number, index) => (
                <motion.div
                    key={`num-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: activeServiceIndex === index ? 1 : 0,
                        scale: activeServiceIndex === index ? 1 : 0.8
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '8%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 20,
                        pointerEvents: 'none',
                        zIndex: 0,
                        willChange: 'opacity, transform'
                    }}
                >
                    {/* Number */}
                    <span
                        style={{
                            fontSize: 'clamp(150px, 25vw, 300px)',
                            fontWeight: 900,
                            color: serviceColors[index],
                            opacity: 0.9,
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            lineHeight: 1
                        }}
                    >
                        {number}
                    </span>

                    {/* Tool Icons */}
                    <div style={{ display: 'flex', gap: 16 }}>
                        {serviceIcons[index].map((icon, iconIdx) => (
                            <motion.img
                                key={iconIdx}
                                src={icon}
                                alt=""
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: activeServiceIndex === index ? 0.9 : 0,
                                    y: activeServiceIndex === index ? 0 : 20
                                }}
                                transition={{ duration: 0.4, delay: iconIdx * 0.1 }}
                                style={{
                                    width: 'clamp(50px, 6vw, 80px)',
                                    height: 'clamp(50px, 6vw, 80px)',
                                    willChange: 'opacity, transform'
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            ))}

            {/* Accent color glow - larger and more visible */}
            <motion.div
                animate={{
                    opacity: activeServiceIndex !== null ? 0.6 : 0,
                    y: activeServiceIndex !== null ? `${activeServiceIndex * 20}%` : '50%'
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                    position: 'absolute',
                    top: '0%',
                    right: '-20%',
                    width: '70vw',
                    height: '70vw',
                    borderRadius: '50%',
                    background: activeServiceIndex !== null
                        ? `radial-gradient(circle, ${serviceColors[activeServiceIndex]}40 0%, transparent 70%)`
                        : 'transparent',
                    willChange: 'opacity, transform',
                    pointerEvents: 'none'
                }}
            />
        </div>
    )
}
