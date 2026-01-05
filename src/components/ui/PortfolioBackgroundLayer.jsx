/**
 * PortfolioBackgroundLayer Component
 * Dynamic background that responds to portfolio hover
 * Performance optimized: CSS-only, GPU-accelerated opacity
 * z-index: 0 - stays BEHIND content, only affects background
 */

import { motion } from 'framer-motion'
import { usePortfolioStore } from '../../stores/portfolioStore'

export default function PortfolioBackgroundLayer() {
    const { activeProjectColor } = usePortfolioStore()

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden'
            }}
        >
            {/* Dynamic color background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeProjectColor ? 1 : 0 }}
                transition={{ duration: 0.5, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    inset: '-10%',
                    background: activeProjectColor
                        ? `radial-gradient(ellipse at center, ${activeProjectColor}35 0%, ${activeProjectColor}15 40%, transparent 75%)`
                        : 'transparent',
                    willChange: 'opacity',
                    pointerEvents: 'none'
                }}
            />

            {/* Right side accent glow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeProjectColor ? 0.5 : 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'absolute',
                    right: '-20%',
                    top: '10%',
                    width: '60vw',
                    height: '60vw',
                    background: activeProjectColor
                        ? `radial-gradient(circle, ${activeProjectColor}30 0%, transparent 70%)`
                        : 'transparent',
                    willChange: 'opacity',
                    pointerEvents: 'none'
                }}
            />
        </div>
    )
}
