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
            {/* Base */}
            <div style={{ position: 'absolute', inset: 0, backgroundColor: '#050505' }} />

            {/* Purple Orb - STATIC */}
            <div
                style={{
                    position: 'absolute',
                    top: '-30%',
                    left: '-20%',
                    width: '80vw',
                    height: '80vw',
                    background: 'radial-gradient(circle, rgba(88,28,135,0.35) 0%, rgba(88,28,135,0.1) 35%, transparent 70%)',
                    transform: 'translateZ(0)'
                }}
            />

            {/* Crimson Orb - STATIC */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-30%',
                    right: '-20%',
                    width: '80vw',
                    height: '80vw',
                    background: 'radial-gradient(circle, rgba(120,20,40,0.3) 0%, rgba(120,20,40,0.08) 35%, transparent 70%)',
                    transform: 'translateZ(0)'
                }}
            />

            {/* Noise Overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.03,
                    mixBlendMode: 'overlay',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat'
                }}
            />
        </div>
    )
}
