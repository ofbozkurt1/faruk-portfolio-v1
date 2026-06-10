/**
 * AtmosphericBackground Component - OPTIMIZED
 * Cross-fade color swap using layered opacity animation
 * Pure CSS, no gradient animation (more performant)
 */

import { usePrefersReducedMotion } from '../../hooks'

export default function AtmosphericBackground() {
    const prefersReducedMotion = usePrefersReducedMotion()

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: -1,
                overflow: 'hidden',
                pointerEvents: 'none'
            }}
        >
            <style>{`
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0.7; }
                    25% { opacity: 0; }
                    50% { opacity: 0; }
                    75% { opacity: 0.7; }
                }
                @keyframes fadeOutIn {
                    0%, 100% { opacity: 0; }
                    25% { opacity: 0.7; }
                    50% { opacity: 0.7; }
                    75% { opacity: 0; }
                }
            `}</style>

            {/* Base Background with Top Purple Glow */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 40, 180, 0.2), transparent 70%), #000000'
                }}
            />

            {/* Grain texture - requires actual noise.png file in public folder */}
            {/* TODO: Add noise.png to /public/gorseller/ for grain effect */}

            {/* === TOP LEFT POSITION === */}
            {/* Purple Layer */}
            <div
                style={{
                    position: 'absolute',
                    top: '-15%',
                    left: '-15%',
                    width: '55vw',
                    height: '55vw',
                    background: 'radial-gradient(circle, rgba(120,40,180,0.5) 0%, rgba(120,40,180,0.15) 40%, transparent 70%)',
                    animation: prefersReducedMotion ? 'none' : 'fadeInOut 20s ease-in-out infinite',
                    opacity: prefersReducedMotion ? 0.7 : undefined,
                    willChange: prefersReducedMotion ? 'auto' : 'opacity'
                }}
            />
            {/* Crimson Layer (same position, opposite timing) */}
            <div
                style={{
                    position: 'absolute',
                    top: '-15%',
                    left: '-15%',
                    width: '55vw',
                    height: '55vw',
                    background: 'radial-gradient(circle, rgba(180,30,60,0.5) 0%, rgba(180,30,60,0.15) 40%, transparent 70%)',
                    animation: prefersReducedMotion ? 'none' : 'fadeOutIn 20s ease-in-out infinite',
                    opacity: prefersReducedMotion ? 0 : undefined,
                    willChange: prefersReducedMotion ? 'auto' : 'opacity'
                }}
            />

            {/* === BOTTOM RIGHT POSITION === */}
            {/* Crimson Layer */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-15%',
                    right: '-15%',
                    width: '55vw',
                    height: '55vw',
                    background: 'radial-gradient(circle, rgba(180,30,60,0.45) 0%, rgba(180,30,60,0.12) 40%, transparent 70%)',
                    animation: prefersReducedMotion ? 'none' : 'fadeInOut 20s ease-in-out infinite',
                    opacity: prefersReducedMotion ? 0.7 : undefined,
                    willChange: prefersReducedMotion ? 'auto' : 'opacity'
                }}
            />
            {/* Purple Layer (same position, opposite timing) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-15%',
                    right: '-15%',
                    width: '55vw',
                    height: '55vw',
                    background: 'radial-gradient(circle, rgba(120,40,180,0.45) 0%, rgba(120,40,180,0.12) 40%, transparent 70%)',
                    animation: prefersReducedMotion ? 'none' : 'fadeOutIn 20s ease-in-out infinite',
                    opacity: prefersReducedMotion ? 0 : undefined,
                    willChange: prefersReducedMotion ? 'auto' : 'opacity'
                }}
            />

            {/* Vignette - Spotlight Effect */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(5,5,5,0.4) 60%, rgba(5,5,5,0.95) 100%)',
                    zIndex: 30,
                    pointerEvents: 'none'
                }}
            />
        </div>
    )
}
