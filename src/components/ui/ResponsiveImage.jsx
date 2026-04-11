/**
 * ResponsiveImage Component
 * Serves optimized images for mobile devices while maintaining desktop quality
 * 
 * @param {string} src - Desktop/default image path
 * @param {string} mobileSrc - Optional mobile-optimized image path
 * @param {string} alt - Image alt text
 * @param {string} className - Tailwind classes
 * @param {string} sizes - Sizes attribute for responsive images
 * @param {boolean} priority - If true, uses eager loading (for Hero/LCP)
 * @param {object} style - Inline styles
 */

import { useState } from 'react'

const NOVASTRA_CLOUD_PREFIXES = [
    'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775630739/',
    'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775632273/',
    'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775660462/%C4%B0mage/google-yorumlar/google-pst-webp/',
    'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775660428/%C4%B0mage/google-yorumlar/google-str-webp/',
    'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775729245/%C4%B0mage/adana-napoli/adana-napoli-%20pst-webp/',
    'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775729316/%C4%B0mage/adana-napoli/adana-napoli-%20str-webp/',
    'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/vivacar/vivacar-pst-webp/',
    'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/hac%C4%B1hakk%C4%B1/hac%C4%B1hakk%C4%B1-pst/',
    'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/hac%C4%B1hakk%C4%B1/hac%C4%B1hakk%C4%B1-str/',
    'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/aktet/aktet-pst-webp/',
    'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/t%C4%B1rnaktrend/t%C4%B1rnaktrend-pst-webp/',
    'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/bbstransfer/bbstransfer-pst-webp/',
    'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/kumrualt%C4%B1/kumrualt%C4%B1-pst-webp/',
]

export default function ResponsiveImage({
    src,
    mobileSrc,
    alt = '',
    className = '',
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    priority = false,
    style = {},
    ...props
}) {
    const [mobileError, setMobileError] = useState(false)

    // Auto-generate mobile src if not provided
    // Converts: /gorseller/novastra/pst1.webp
    // To: /gorseller/mobilgorseller/mobilnovastra/pst1.webp
    const generatedMobileSrc = mobileSrc || generateMobilePath(src)

    // Use desktop src if mobile failed to load
    const finalMobileSrc = mobileError ? null : generatedMobileSrc

    const isNovastraCloudAsset = typeof src === 'string' &&
        NOVASTRA_CLOUD_PREFIXES.some((prefix) => src.startsWith(prefix))

    const loading = isNovastraCloudAsset ? 'lazy' : (priority ? 'eager' : 'lazy')
    const decoding = isNovastraCloudAsset ? 'async' : (priority ? 'sync' : 'async')
    const fetchPriority = isNovastraCloudAsset ? 'auto' : (priority ? 'high' : 'auto')

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
                src={src}
                alt={alt}
                className={className}
                style={style}
                sizes={sizes}
                loading={loading}
                decoding={decoding}
                fetchpriority={fetchPriority}
                onError={(e) => {
                    // If mobile image fails, mark error (will use desktop)
                    if (finalMobileSrc) {
                        setMobileError(true)
                    }
                }}
                {...props}
            />
        </picture>
    )
}

/**
 * Generates mobile image path from desktop path
 * Example: /gorseller/novastra/pst1.webp
 * Output: /gorseller/mobilgorseller/mobilnovastra/pst1.webp
 */
function generateMobilePath(desktopPath) {
    if (!desktopPath || typeof desktopPath !== 'string') return null

    // Extract project name from path
    // Pattern: /gorseller/{projectName}/{imageName}
    const match = desktopPath.match(/\/gorseller\/([^\/]+)\//)

    if (!match) return null

    const projectName = match[1]
    const imageName = desktopPath.split('/').pop()

    // Skip if already a mobile path or slider image
    if (projectName.startsWith('mobil') || projectName === 'slidergorseller') {
        return null
    }

    // Construct mobile path
    return `/gorseller/mobilgorseller/mobil${projectName}/${imageName}`
}
