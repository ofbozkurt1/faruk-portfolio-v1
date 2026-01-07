/**
 * ServiceBackgroundLayer - PHASE 35 OPTIMIZED
 * Uses AnimatePresence to mount ONLY the active background layer
 * Prevents 4 parallel DOM elements from existing simultaneously
 */

import { motion, AnimatePresence } from 'framer-motion'
import { useServiceStore } from '../../stores/serviceStore'

// Service colors
const serviceColors = [
    '#9333EA', // 01 Social Media Design - Purple
    '#3B82F6', // 02 Motion Design - Blue
    '#F97316', // 03 Brand Identity - Orange
    '#EC4899'  // 04 Video Editing - Pink
]

const serviceNumbers = ['01', '02', '03', '04']

// Tool icons for each service
const serviceIcons = [
    ['/gorseller/iconlar/photoshop.svg', '/gorseller/iconlar/illustrator.svg'], // 01 Social Media
    ['/gorseller/iconlar/after-effects.svg'], // 02 Motion Design
    ['/gorseller/iconlar/illustrator.svg', '/gorseller/iconlar/photoshop.svg'], // 03 Brand Identity
    ['/gorseller/iconlar/premiere-pro.svg', '/gorseller/iconlar/after-effects.svg'] // 04 Video Editing
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
            {/* Only render active background - not all 4 simultaneously */}
            <AnimatePresence mode="wait">
                {activeServiceIndex !== null && (
                    <motion.div
                        key={`bg-${activeServiceIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            inset: '-10%',
                            background: `radial-gradient(ellipse at center, ${serviceColors[activeServiceIndex]}35 0%, ${serviceColors[activeServiceIndex]}15 40%, transparent 75%)`,
                            willChange: 'opacity',
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Only render active number & icons */}
            <AnimatePresence mode="wait">
                {activeServiceIndex !== null && (
                    <motion.div
                        key={`num-${activeServiceIndex}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
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
                                color: serviceColors[activeServiceIndex],
                                opacity: 0.9,
                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                lineHeight: 1
                            }}
                        >
                            {serviceNumbers[activeServiceIndex]}
                        </span>

                        {/* Tool Icons */}
                        <div style={{ display: 'flex', gap: 16 }}>
                            {serviceIcons[activeServiceIndex].map((icon, iconIdx) => (
                                <motion.img
                                    key={iconIdx}
                                    src={icon}
                                    alt=""
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 0.9, y: 0 }}
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
                )}
            </AnimatePresence>

            {/* Accent color glow - only when active */}
            <AnimatePresence>
                {activeServiceIndex !== null && (
                    <motion.div
                        key="glow"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 0.6,
                            y: `${activeServiceIndex * 20}%`
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        style={{
                            position: 'absolute',
                            top: '0%',
                            right: '-20%',
                            width: '70vw',
                            height: '70vw',
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${serviceColors[activeServiceIndex]}40 0%, transparent 70%)`,
                            willChange: 'opacity, transform',
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
