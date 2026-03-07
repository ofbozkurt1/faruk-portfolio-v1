// EcommerceShowcase.jsx
// Phase 53 — Desktop-only E-Commerce Infinite Marquee Showcase

const BRANDS = [
  'Aura Kulaklık',
  'Lynxa',
  'Rox Hair',
  'Velor Saat',
  'Veltor Tras',
  'Zaya Çanta',
]

// 2 images per brand, shuffled into a mixed (non-grouped) order
const ECOMMERCE_IMAGES = [
  '/gorseller/e-ticaret-gorseller/aurakulaklık/pst1.webp',
  '/gorseller/e-ticaret-gorseller/lynxa/pst2.webp',
  '/gorseller/e-ticaret-gorseller/velorsaat/pst1.webp',
  '/gorseller/e-ticaret-gorseller/roxhair/pst3.webp',
  '/gorseller/e-ticaret-gorseller/veltortras/pst2.webp',
  '/gorseller/e-ticaret-gorseller/zayacanta/pst1.webp',
  '/gorseller/e-ticaret-gorseller/aurakulaklık/pst4.webp',
  '/gorseller/e-ticaret-gorseller/velorsaat/pst3.webp',
  '/gorseller/e-ticaret-gorseller/lynxa/pst1.webp',
  '/gorseller/e-ticaret-gorseller/roxhair/pst1.webp',
  '/gorseller/e-ticaret-gorseller/zayacanta/pst2.webp',
  '/gorseller/e-ticaret-gorseller/veltortras/pst1.webp',
]

// Inline @keyframes — guaranteed to work regardless of Tailwind JIT/HMR cache
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

export default function EcommerceShowcase() {
  return (
    <section
      id="ecommerce"
      className="relative w-full overflow-hidden py-32"
    >
      {/* Injected keyframes */}
      <style>{MARQUEE_STYLE}</style>

      {/* ─── Section Header ─── */}
      <div className="text-center mb-16 px-8">
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
            E-Commerce &amp; Product Design
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
          Where aesthetic design meets conversion-driven product visualization.
        </p>
      </div>

      {/* ─── Marquee Slider Wrapper — edge fade mask ─── */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        {/* Scrolling track — images duplicated for seamless loop */}
        <div className="ec-marquee-track flex gap-12 w-max">

          {/* Set A */}
          {ECOMMERCE_IMAGES.map((src, i) => (
            <div
              key={`a-${i}`}
              className="shrink-0 h-[500px] w-auto overflow-hidden rounded-lg"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img
                src={src}
                alt={`E-commerce design ${i + 1}`}
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
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
              />
            </div>
          ))}

          {/* Set B — duplicate for seamless loop */}
          {ECOMMERCE_IMAGES.map((src, i) => (
            <div
              key={`b-${i}`}
              className="shrink-0 h-[500px] w-auto overflow-hidden rounded-lg"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img
                src={src}
                alt={`E-commerce design ${i + 1}`}
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
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ─── Brand Pill Navigation ─── */}
      <div className="flex items-center justify-center flex-wrap gap-3 mt-20 px-8">
        {BRANDS.map((brand) => (
          <button
            key={brand}
            className="px-5 py-2 rounded-full border border-white/10 bg-transparent text-sm text-gray-400 tracking-wide cursor-pointer transition-all duration-300 hover:bg-[#f3f4f6] hover:text-[#050505] hover:border-transparent"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {brand}
          </button>
        ))}
      </div>
    </section>
  )
}
