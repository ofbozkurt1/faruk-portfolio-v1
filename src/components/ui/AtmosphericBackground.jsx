/**
 * AtmosphericBackground Component
 * STATIC gradients - no animations for performance
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
                    0%, 15% { opacity: 0.8; transform: scale(1); }
                    40%, 60% { opacity: 0; transform: scale(1.1); }
                    85%, 100% { opacity: 0.8; transform: scale(1); }
                }
            `}</style>

            {/* Base */}
            <div style={{ position: 'absolute', inset: 0, backgroundColor: '#050505' }} />

            {/* Position 1 (Top Left) */}
            <div style={{ position: 'absolute', top: '-15%', left: '-15%', width: '60vw', height: '60vw' }}>
                {/* Purple Phase (Starts Visible) */}
                <div
                    style={{
                        position: 'absolute', inset: 0,
                        background: 'radial-gradient(circle, rgba(120,40,180,0.5) 0%, rgba(120,40,180,0.15) 35%, transparent 70%)',
                        animation: 'breatheOpacity 14s ease-in-out infinite',
                        willChange: 'opacity, transform'
                    }}
                />
                {/* Crimson Phase (Starts Invisible - Delayed) */}
                <div
                    style={{
                        position: 'absolute', inset: 0,
                        background: 'radial-gradient(circle, rgba(180,30,60,0.45) 0%, rgba(180,30,60,0.15) 35%, transparent 70%)',
                        animation: 'breatheOpacity 14s ease-in-out infinite',
                        animationDelay: '-7s', /* Half of 14s */
                        willChange: 'opacity, transform'
                    }}
                />
            </div>

            {/* Position 2 (Bottom Right) */}
            <div style={{ position: 'absolute', bottom: '-15%', right: '-15%', width: '60vw', height: '60vw' }}>
                {/* Crimson Phase (Starts Visible) */}
                <div
                    style={{
                        position: 'absolute', inset: 0,
                        background: 'radial-gradient(circle, rgba(180,30,60,0.45) 0%, rgba(180,30,60,0.15) 35%, transparent 70%)',
                        animation: 'breatheOpacity 14s ease-in-out infinite',
                        willChange: 'opacity, transform'
                    }}
                />
                {/* Purple Phase (Starts Invisible - Delayed) */}
                <div
                    style={{
                        position: 'absolute', inset: 0,
                        background: 'radial-gradient(circle, rgba(120,40,180,0.5) 0%, rgba(180,30,60,0.15) 35%, transparent 70%)',
                        animation: 'breatheOpacity 14s ease-in-out infinite',
                        animationDelay: '-7s', /* Half of 14s */
                        willChange: 'opacity, transform'
                    }}
                />
            </div>

            {/* Strong Vignette - Spotlight Effect */}
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
