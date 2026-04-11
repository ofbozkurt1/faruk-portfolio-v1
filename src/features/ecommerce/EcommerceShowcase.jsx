import { useEffect, useMemo, useState } from 'react'

// EcommerceShowcase.jsx
// Phase 7 - Curated hero slider + on-demand deep-dive grid

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

// Tier 1: exact 12-item hero order
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

// Tier 3: categorized deep-dive gallery data
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
`

function buildSrc(brandKey, fileName) {
  return `${BRAND_BASES[brandKey]}${fileName}`
}

export default function EcommerceShowcase() {
  const [showExpandedGrid, setShowExpandedGrid] = useState(false)
  const [brokenImageKeys, setBrokenImageKeys] = useState(() => new Set())

  const heroImages = useMemo(
    () =>
      HERO_SLIDER_ORDER.map((item, index) => ({
        id: `${item.brand}-${item.file}-${index}`,
        brand: item.brand,
        src: buildSrc(item.brand, item.file),
      })),
    []
  )

  useEffect(() => {
    if (!showExpandedGrid) return undefined

    const prevOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowExpandedGrid(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [showExpandedGrid])

  const expandedGroups = useMemo(
    () =>
      EXPANDED_GALLERY_ORDER.map((group) => ({
        ...group,
        files: group.files.filter((fileName) => !brokenImageKeys.has(`${group.brand}-${fileName}`)),
      })).filter((group) => group.files.length > 0),
    [brokenImageKeys]
  )

  const handleExpandedImageError = (brandKey, fileName) => {
    const key = `${brandKey}-${fileName}`
    setBrokenImageKeys((previous) => {
      if (previous.has(key)) return previous
      const next = new Set(previous)
      next.add(key)
      return next
    })
  }

  return (
    <section id="ecommerce" className="relative w-full overflow-hidden pt-20 pb-10">
      <style>{MARQUEE_STYLE}</style>

      <div className="text-center mb-12 px-8">
        <div className="flex items-center justify-center gap-6 mb-6">
          <div
            style={{
              width: 60,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))',
            }}
          />
          <h2
            className="text-6xl font-bold tracking-tighter text-gray-100"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {'E-Ticaret G\u00f6rselleri'}
          </h2>
          <div
            style={{
              width: 60,
              height: 1,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)',
            }}
          />
        </div>
        <p
          className="text-gray-500 tracking-wide text-base mt-2"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          {'Estetik tasar\u0131m\u0131n, d\u00f6n\u00fc\u015f\u00fcm odakl\u0131 \u00fcr\u00fcn g\u00f6rselle\u015ftirmesiyle bulu\u015ftu\u011fu yer.'}
        </p>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div className="ec-marquee-track flex gap-12 w-max">
          {heroImages.map((item, i) => (
            <div
              key={`a-${item.id}`}
              className="shrink-0 h-[500px] w-auto overflow-hidden rounded-lg"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img
                src={item.src}
                alt={`${BRAND_LABELS[item.brand]} - Hero ${i + 1}`}
                loading="lazy"
                decoding="async"
                style={{
                  height: '500px',
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease',
                  borderRadius: '0.5rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              />
            </div>
          ))}

          {heroImages.map((item, i) => (
            <div
              key={`b-${item.id}`}
              className="shrink-0 h-[500px] w-auto overflow-hidden rounded-lg"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img
                src={item.src}
                alt={`${BRAND_LABELS[item.brand]} - Hero ${i + 1}`}
                loading="lazy"
                decoding="async"
                style={{
                  height: '500px',
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease',
                  borderRadius: '0.5rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center flex-wrap gap-3 mt-20 px-8">
        {Object.entries(BRAND_LABELS).map(([brandKey, brandLabel]) => (
          <button
            key={brandKey}
            className="px-5 py-2 rounded-full border border-white/10 bg-transparent text-sm text-gray-400 tracking-wide cursor-pointer transition-all duration-300 hover:bg-[#f3f4f6] hover:text-[#050505] hover:border-transparent"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {brandLabel}
          </button>
        ))}
      </div>

      <div className="mt-12 px-8 flex justify-center">
        <button
          type="button"
          onClick={() => setShowExpandedGrid((prev) => !prev)}
          className="group relative inline-flex items-center gap-3 px-9 py-3 rounded-full border border-white/20 bg-gradient-to-r from-white/10 to-white/5 text-gray-100 text-sm tracking-[0.08em] uppercase transition-all duration-300 hover:from-white hover:to-white hover:text-black hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          {'Daha Fazla Projeye G\u00f6z At'}
          <span className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1">{'\u2192'}</span>
        </button>
      </div>

      {showExpandedGrid && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-[1px] px-4 md:px-8 py-6 md:py-10 overflow-y-scroll overflow-x-hidden overscroll-y-none pointer-events-auto"
          data-lenis-prevent="true"
          onWheel={(event) => event.stopPropagation()}
          onTouchMove={(event) => event.stopPropagation()}
        >
          <div className="max-w-7xl mx-auto">
            <div className="sticky top-0 z-20 mb-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/70 px-5 py-4 backdrop-blur-xl">
              <div>
                <h3
                  className="text-gray-100 text-lg md:text-xl tracking-wide"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {'E-Ticaret Proje Galerisi'}
                </h3>
                <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {'Marka bazl\u0131 t\u00fcm kampanya g\u00f6rselleri'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowExpandedGrid(false)}
                className="h-10 w-10 rounded-full border border-white/20 text-white/80 hover:bg-white hover:text-black transition-colors"
                aria-label="Popup kapat"
              >
                {'\u00d7'}
              </button>
            </div>

            <div className="space-y-10">
              {expandedGroups.map((group) => (
                <div key={group.brand}>
                  <h4
                    className="text-gray-300 text-sm tracking-[0.22em] uppercase mb-4"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {BRAND_LABELS[group.brand]}
                  </h4>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {group.files.map((fileName, index) => {
                      const src = buildSrc(group.brand, fileName)
                      return (
                        <div
                          key={`${group.brand}-${fileName}-${index}`}
                          className="rounded-xl overflow-hidden border border-white/10 bg-black/30"
                        >
                          <img
                            src={src}
                            alt={`${BRAND_LABELS[group.brand]} ${fileName}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                            onError={() => handleExpandedImageError(group.brand, fileName)}
                          />
                        </div>
                      )
                    })}
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
