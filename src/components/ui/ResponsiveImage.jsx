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
    // Auto-generate mobile src if not provided
    // Converts: /gorseller/novastra/pst1.webp
    // To: /gorseller/mobilgorseller/mobilnovastra/pst1.webp
    const generatedMobileSrc = mobileSrc || generateMobilePath(src)

    const loading = priority ? 'eager' : 'lazy'
    const decoding = priority ? 'sync' : 'async'
    const fetchPriority = priority ? 'high' : 'auto'

    return (
        <picture>
            {/* Mobile: Serve optimized images for screens <= 768px */}
            {generatedMobileSrc && (
                <source
                    media="(max-width: 768px)"
                    srcSet={generatedMobileSrc}
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
