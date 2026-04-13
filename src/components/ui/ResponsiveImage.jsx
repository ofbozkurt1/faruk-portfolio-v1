/**
 * ResponsiveImage Component
 * Serves responsive images with optional mobile source and safe fallback support.
 * 
 * @param {string} src - Desktop/default image path
 * @param {string} mobileSrc - Optional mobile-optimized image path
 * @param {string} fallbackSrc - Optional fallback source if src fails
 * @param {string} alt - Image alt text
 * @param {string} className - Tailwind classes
 * @param {string} sizes - Sizes attribute for responsive images
 * @param {boolean} priority - If true, uses eager loading (for Hero/LCP)
 * @param {object} style - Inline styles
 */

import { useEffect, useState } from 'react'

export default function ResponsiveImage({
    src,
    mobileSrc,
    fallbackSrc,
    alt = '',
    className = '',
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    priority = false,
    style = {},
    ...props
}) {
    const [activeSrc, setActiveSrc] = useState(src)
    const finalMobileSrc = mobileSrc || null

    const loading = priority ? 'eager' : 'lazy'
    const decoding = 'async'
    const fetchPriority = priority ? 'high' : 'auto'

    useEffect(() => {
        setActiveSrc(src)
    }, [src])

    return (
        <picture>
            {/* Mobile: Serve optimized images for screens <= 768px */}
            {finalMobileSrc && (
                <source
                    media="(max-width: 768px)"
                    srcSet={finalMobileSrc}
                />
            )}

            {/* Desktop: Fallback to original high-quality image */}
            <img
                src={activeSrc}
                alt={alt}
                className={className}
                style={style}
                sizes={sizes}
                loading={loading}
                decoding={decoding}
                fetchPriority={fetchPriority}
                onError={() => {
                    if (fallbackSrc && activeSrc !== fallbackSrc) {
                        setActiveSrc(fallbackSrc)
                    }
                }}
                {...props}
            />
        </picture>
    )
}
