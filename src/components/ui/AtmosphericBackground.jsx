/**
 * AtmosphericBackground Component
 * ZERO-BLUR OPTIMIZED - Uses pre-blurred radial gradients
 * No filter:blur() - pure CSS gradients for maximum performance
 */

export default function AtmosphericBackground() {
    return (
        <div
            className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
            style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
            }}
        >
            {/* Layer 1: Base - Deep Rich Black */}
            <div className="absolute inset-0 bg-[#050505]" />

            {/* Layer 2: Pre-Blurred Gradient Orbs (NO filter:blur) */}

            {/* Top-Left: Deep Violet/Purple Orb - Large & Soft */}
            <div
                className="absolute"
                style={{
                    top: '-30%',
                    left: '-20%',
                    width: '90vw',
                    height: '90vw',
                    background: 'radial-gradient(circle, rgba(88,28,135,0.45) 0%, rgba(88,28,135,0.15) 35%, rgba(88,28,135,0) 70%)',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                }}
            />

            {/* Center: Subtle Purple Wash */}
            <div
                className="absolute"
                style={{
                    top: '20%',
                    left: '10%',
                    width: '80vw',
                    height: '80vw',
                    background: 'radial-gradient(circle, rgba(75,20,100,0.2) 0%, rgba(75,20,100,0) 60%)',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                }}
            />

            {/* Bottom-Right: Dark Crimson/Red Orb - Large & Soft */}
            <div
                className="absolute"
                style={{
                    bottom: '-30%',
                    right: '-20%',
                    width: '90vw',
                    height: '90vw',
                    background: 'radial-gradient(circle, rgba(120,20,40,0.4) 0%, rgba(120,20,40,0.12) 35%, rgba(120,20,40,0) 70%)',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                }}
            />

            {/* Bottom-Left: Secondary Crimson Accent */}
            <div
                className="absolute"
                style={{
                    bottom: '5%',
                    left: '0%',
                    width: '50vw',
                    height: '50vw',
                    background: 'radial-gradient(circle, rgba(100,15,35,0.18) 0%, rgba(100,15,35,0) 60%)',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                }}
            />

            {/* Top-Right: Accent Purple */}
            <div
                className="absolute"
                style={{
                    top: '0%',
                    right: '5%',
                    width: '45vw',
                    height: '45vw',
                    background: 'radial-gradient(circle, rgba(70,25,110,0.15) 0%, rgba(70,25,110,0) 55%)',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                }}
            />

            {/* Layer 3: Noise Texture Overlay - Pure opacity, no filters */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.04,
                    mixBlendMode: 'overlay',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                }}
            />
        </div>
    )
}
