import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { getAdaptiveRootMargin, useNearViewport } from '../../hooks'

const BLANK_IMAGE_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

const BRAND_BASES = {
    lynxaskin: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/e-t%C4%B1caret/lynxaskin-pst-webp/',
    aurakulaklik: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/e-t%C4%B1caret/aurakulakl%C4%B1k-pst-webp/',
    velorsaat: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/e-t%C4%B1caret/velorsaat-pst-webp/',
    roxhair: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/e-t%C4%B1caret/roxhair-pst-webp/',
    veltortras: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/e-t%C4%B1caret/veltortras-pst-webp/',
    zayacanta: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/e-t%C4%B1caret/zayacanta-pst-webp/',
}

const BRAND_LABELS = {
    lynxaskin: 'Lynxa Skin',
    aurakulaklik: 'Aura Kulakl\u0131k',
    velorsaat: 'Velor Saat',
    roxhair: 'Rox Hair',
    veltortras: 'Veltor Tra\u015f',
    zayacanta: 'Zaya \u00c7anta',
}

const HERO_SLIDER_ORDER = [
    { brand: 'roxhair', file: 'pst4.webp' },
    { brand: 'zayacanta', file: 'pst1.webp' },
    { brand: 'veltortras', file: 'pst1.webp' },
    { brand: 'lynxaskin', file: 'pst3.webp' },
    { brand: 'aurakulaklik', file: 'pst6.webp' },
    { brand: 'roxhair', file: 'pst2.webp' },
    { brand: 'lynxaskin', file: 'pst2.webp' },
    { brand: 'velorsaat', file: 'pst1.webp' },
    { brand: 'aurakulaklik', file: 'pst2.webp' },
    { brand: 'veltortras', file: 'pst2.webp' },
    { brand: 'velorsaat', file: 'pst4.webp' },
    { brand: 'zayacanta', file: 'pst2.webp' },
]

const EXPANDED_GALLERY_ORDER = [
    { brand: 'roxhair', files: ['pst1.webp', 'pst2.webp', 'pst3.webp', 'pst4.webp'] },
    { brand: 'zayacanta', files: ['pst1.webp', 'pst2.webp'] },
    { brand: 'veltortras', files: ['pst1.webp', 'pst2.webp', 'pst3.webp'] },
    { brand: 'lynxaskin', files: ['pst1.webp', 'pst2.webp', 'pst3.webp'] },
    { brand: 'aurakulaklik', files: ['pst1.webp', 'pst2.webp', 'pst3.webp', 'pst4.webp', 'pst5.webp', 'pst6.webp'] },
    { brand: 'velorsaat', files: ['pst1.webp', 'pst2.webp', 'pst3.webp', 'pst4.webp'] },
]

const MARQUEE_STYLE = `
  @keyframes marqueeScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .ec-marquee-track {
    animation: marqueeScroll 35s linear infinite;
  }
  .ec-marquee-track:hover {
    animation-play-state: paused;
  }
  .ec-marquee-track-paused {
    animation-play-state: paused !important;
  }
`

function buildSrc(brandKey, fileName) {
    return `${BRAND_BASES[brandKey]}${fileName}`
}

const DeferredImage = memo(function DeferredImage({
    src,
    alt,
    className,
    style,
    priority = false,
    width = 1080,
    height = 1350,
    onError,
}) {
    const { ref, isNearViewport } = useNearViewport({
        rootMargin: getAdaptiveRootMargin('200px 0px', '300px 0px'),
        threshold: 0.01,
        once: true,
        initialInView: priority,
    })

    return (
        <img
            ref={ref}
            src={isNearViewport ? src : BLANK_IMAGE_SRC}
            alt={alt}
            loading="lazy"
            decoding="async"
            fetchPriority={priority ? 'high' : 'low'}
            width={width}
            height={height}
            className={className}
            style={style}
            onError={isNearViewport ? onError : undefined}
        />
    )
})

const HeroImageCard = memo(function HeroImageCard({ item, index, duplicateKey }) {
    return (
        <div
            className="shrink-0 h-[500px] w-auto overflow-hidden rounded-lg transform-gpu"
            style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}
        >
            <DeferredImage
                src={item.src}
                alt={`${BRAND_LABELS[item.brand]} - Hero ${index + 1}`}
                priority={duplicateKey === 'a' && index < 2}
                className="transform-gpu transition-transform duration-300 hover:scale-[1.03]"
                style={{
                    borderRadius: '0.5rem',
                    display: 'block',
                    height: '500px',
                    objectFit: 'contain',
                    width: 'auto',
                }}
            />
        </div>
    )
})

const MobileHeroCard = memo(function MobileHeroCard({ item, index }) {
    return (
        <article className="aspect-[4/5] w-[82vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-xl border border-white/10 bg-[#080808] shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
            <DeferredImage
                src={item.src}
                alt={`${BRAND_LABELS[item.brand]} - Mobil ${index + 1}`}
                priority={index < 2}
                className="h-full w-full object-cover"
            />
        </article>
    )
})

const ExpandedImageCard = memo(function ExpandedImageCard({ brand, fileName, onError }) {
    const src = buildSrc(brand, fileName)

    return (
        <div className="aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-black/30">
            <DeferredImage
                src={src}
                alt={`${BRAND_LABELS[brand]} ${fileName}`}
                onError={() => onError(brand, fileName)}
                className="h-full w-full object-cover"
                priority={false}
            />
        </div>
    )
})

export default function EcommerceShowcase() {
    const [showExpandedGrid, setShowExpandedGrid] = useState(false)
    const [brokenImageKeys, setBrokenImageKeys] = useState(() => new Set())
    const { ref: marqueeViewportRef, isNearViewport: isMarqueeActive } = useNearViewport({
        rootMargin: getAdaptiveRootMargin('150px 0px', '300px 0px'),
        threshold: 0.01,
        once: false,
        initialInView: true,
    })

    const heroImages = useMemo(
        () =>
            HERO_SLIDER_ORDER.map((item, index) => ({
                id: `${item.brand}-${item.file}-${index}`,
                brand: item.brand,
                src: buildSrc(item.brand, item.file),
            })),
        []
    )

    const closeExpandedGrid = useCallback(() => {
        setShowExpandedGrid(false)
    }, [])

    const toggleExpandedGrid = useCallback(() => {
        setShowExpandedGrid((previous) => !previous)
    }, [])

    useEffect(() => {
        if (!showExpandedGrid) return undefined

        const previousBodyOverflow = document.body.style.overflow
        const previousHtmlOverflow = document.documentElement.style.overflow

        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeExpandedGrid()
            }
        }

        window.addEventListener('keydown', onKeyDown)

        return () => {
            document.body.style.overflow = previousBodyOverflow
            document.documentElement.style.overflow = previousHtmlOverflow
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [closeExpandedGrid, showExpandedGrid])

    const expandedGroups = useMemo(() => {
        if (!showExpandedGrid) return []

        return EXPANDED_GALLERY_ORDER
            .map((group) => ({
                ...group,
                files: group.files.filter((fileName) => !brokenImageKeys.has(`${group.brand}-${fileName}`)),
            }))
            .filter((group) => group.files.length > 0)
    }, [brokenImageKeys, showExpandedGrid])

    const handleExpandedImageError = useCallback((brandKey, fileName) => {
        const key = `${brandKey}-${fileName}`
        setBrokenImageKeys((previous) => {
            if (previous.has(key)) return previous
            const next = new Set(previous)
            next.add(key)
            return next
        })
    }, [])

    return (
        <section id="ecommerce" className="relative w-full overflow-hidden pb-10 pt-12 md:pt-20">
            <style>{MARQUEE_STYLE}</style>

            <div className="mb-8 px-4 text-center md:mb-12 md:px-8">
                <div className="mb-4 flex items-center justify-center gap-3 md:mb-6 md:gap-6">
                    <div
                        className="h-[1px] w-10 md:w-[60px]"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))' }}
                    />
                    <h2 className="text-2xl font-bold tracking-tight text-gray-100 md:text-6xl" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {'E-Ticaret G\u00f6rselleri'}
                    </h2>
                    <div
                        className="h-[1px] w-10 md:w-[60px]"
                        style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)' }}
                    />
                </div>
                <p className="mx-auto mt-2 max-w-2xl text-sm tracking-wide text-gray-500 md:text-base" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    {'Estetik tasar\u0131m\u0131n, d\u00f6n\u00fc\u015f\u00fcm odakl\u0131 \u00fcr\u00fcn g\u00f6rselle\u015ftirmesiyle bulu\u015ftu\u011fu yer.'}
                </p>
            </div>

            <div
                ref={marqueeViewportRef}
                className="relative hidden overflow-hidden md:block"
                style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                    maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                }}
            >
                <div className={`ec-marquee-track flex w-max gap-12 ${isMarqueeActive ? '' : 'ec-marquee-track-paused'}`}>
                    {heroImages.map((item, index) => (
                        <HeroImageCard key={`a-${item.id}`} item={item} index={index} duplicateKey="a" />
                    ))}
                    {heroImages.map((item, index) => (
                        <HeroImageCard key={`b-${item.id}`} item={item} index={index} duplicateKey="b" />
                    ))}
                </div>
            </div>

            <div className="block md:hidden">
                <div className="touch-scroll-native -mx-4 flex gap-4 overflow-x-auto px-4 snap-x snap-mandatory">
                    {heroImages.map((item, index) => (
                        <MobileHeroCard key={`mobile-${item.id}`} item={item} index={index} />
                    ))}
                </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-2 px-4 md:mt-20 md:gap-3 md:px-8">
                {Object.entries(BRAND_LABELS).map(([brandKey, brandLabel]) => (
                    <button
                        key={brandKey}
                        type="button"
                        className="min-h-[44px] rounded-full border border-white/10 bg-transparent px-4 py-2 text-xs tracking-wide text-gray-400 transition-all duration-300 hover:border-transparent hover:bg-[#f3f4f6] hover:text-[#050505] md:px-5 md:text-sm"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                        {brandLabel}
                    </button>
                ))}
            </div>

            <div className="mt-10 flex justify-center px-4 md:mt-12 md:px-8">
                <button
                    type="button"
                    onClick={toggleExpandedGrid}
                    className="group relative inline-flex min-h-[44px] items-center gap-3 rounded-full border border-white/20 bg-gradient-to-r from-white/10 to-white/5 px-6 py-3 text-xs tracking-[0.08em] text-gray-100 uppercase transition-all duration-300 hover:from-white hover:to-white hover:border-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] md:px-9 md:text-sm"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                    {'Daha Fazla Projeye G\u00f6z At'}
                    <span className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1">{'\u2192'}</span>
                </button>
            </div>

            {showExpandedGrid && (
                <div
                    className="fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden bg-black/95 px-4 py-6 backdrop-blur-[1px] md:px-8 md:py-10"
                    data-lenis-prevent="true"
                    style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain', touchAction: 'pan-y' }}
                    onClick={closeExpandedGrid}
                >
                    <div className="mx-auto max-w-7xl" onClick={(event) => event.stopPropagation()}>
                        <div className="sticky top-0 z-20 mb-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/75 px-4 py-4 backdrop-blur-xl md:px-5">
                            <div>
                                <h3 className="text-base tracking-wide text-gray-100 md:text-xl" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                                    {'E-Ticaret Proje Galerisi'}
                                </h3>
                                <p className="mt-1 text-xs text-gray-400 md:text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                                    {'Marka bazl\u0131 t\u00fcm kampanya g\u00f6rselleri'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closeExpandedGrid}
                                className="h-11 w-11 rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white hover:text-black"
                                aria-label="Popup kapat"
                            >
                                {'\u00d7'}
                            </button>
                        </div>

                        <div className="space-y-10">
                            {expandedGroups.map((group) => (
                                <div key={group.brand}>
                                    <h4 className="mb-4 text-xs tracking-[0.22em] text-gray-300 uppercase md:text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                                        {BRAND_LABELS[group.brand]}
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                                        {group.files.map((fileName) => (
                                            <ExpandedImageCard
                                                key={`${group.brand}-${fileName}`}
                                                brand={group.brand}
                                                fileName={fileName}
                                                onError={handleExpandedImageError}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
