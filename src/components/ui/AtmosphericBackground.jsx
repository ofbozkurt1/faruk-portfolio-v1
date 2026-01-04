/**
 * AtmosphericBackground Component - OPTIMIZED
 * Reduced from 4 orbs to 2 for better performance
 * Static gradients with minimal CSS animations
 */

export default function AtmosphericBackground() {
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
                @keyframes breatheOpacity {
                    0%, 20% { opacity: 0.7; }
                    50% { opacity: 0.3; }
                    80%, 100% { opacity: 0.7; }
                }
            `}</style>

            {/* Base Dark Background */}
            <div style={{ position: 'absolute', inset: 0, backgroundColor: '#050505' }} />

            {/* Single Orb - Top Left (Purple) */}
            <div
                style={{
                    position: 'absolute',
                    top: '-15%',
                    left: '-15%',
                    width: '55vw',
                    height: '55vw',
                    background: 'radial-gradient(circle, rgba(120,40,180,0.4) 0%, rgba(120,40,180,0.1) 40%, transparent 70%)',
                    animation: 'breatheOpacity 12s ease-in-out infinite',
                    willChange: 'opacity'
                }}
            />

            {/* Single Orb - Bottom Right (Crimson) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-15%',
                    right: '-15%',
                    width: '55vw',
                    height: '55vw',
                    background: 'radial-gradient(circle, rgba(180,30,60,0.35) 0%, rgba(180,30,60,0.1) 40%, transparent 70%)',
                    animation: 'breatheOpacity 12s ease-in-out infinite',
                    animationDelay: '-6s',
                    willChange: 'opacity'
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
