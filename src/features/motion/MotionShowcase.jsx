import { useEffect, useRef, useState } from 'react'

const MOTION_VIDEOS = [
  {
    title: 'Concert Poster Motion',
    src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/v1775554525/Yener_%C3%87evik_Konser_Afi%C5%9Fi_Motion_nprqao.mp4',
  },
  {
    title: 'DJ Poster Motion',
    src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/v1775554553/Aykut_Elmas_Dj_Afi%C5%9Fi_Main_bp2xha.mp4',
  },
  {
    title: 'Personal Branding Motion',
    src: 'https://res.cloudinary.com/dbr7bx7u5/video/upload/q_auto/f_auto/v1775554690/Kendini_Pazarlama_Sanat_yl21ua.mp4',
  },
]

function playVideo(videoEl) {
  if (!videoEl) return
  const playPromise = videoEl.play()
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {})
  }
}

export default function MotionShowcase() {
  const [loaded, setLoaded] = useState(() => MOTION_VIDEOS.map(() => false))
  const [inView, setInView] = useState(() => MOTION_VIDEOS.map(() => false))
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const cardRefs = useRef([])
  const videoRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-motion-index'))
          if (Number.isNaN(index)) return

          setInView((prev) => {
            if (prev[index] === entry.isIntersecting) return prev
            const next = [...prev]
            next[index] = entry.isIntersecting
            return next
          })

          if (entry.isIntersecting) {
            setLoaded((prev) => {
              if (prev[index]) return prev
              const next = [...prev]
              next[index] = true
              return next
            })
          }
        })
      },
      {
        threshold: 0.35,
        rootMargin: '160px 0px',
      },
    )

    cardRefs.current.forEach((node, index) => {
      if (!node) return
      node.setAttribute('data-motion-index', String(index))
      observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    inView.forEach((visible, index) => {
      const videoEl = videoRefs.current[index]
      if (!videoEl) return
      if (visible) {
        playVideo(videoEl)
      } else {
        videoEl.pause()
      }
    })
  }, [inView, loaded])

  return (
    <section id="motion-showcase" className="relative w-full pt-14 pb-32">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-14 text-center">
          <h2 className="text-6xl font-bold tracking-tight text-gray-100">{'Hareketli Tasar\u0131mlar'}</h2>
          <p className="mt-4 text-base tracking-wide text-gray-400">
            {'Kayd\u0131rma tetiklemeli, CDN destekli motion i\u00e7erikleri ile ak\u0131c\u0131 ve premium bir video vitrini.'}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8" onMouseLeave={() => setHoveredIndex(null)}>
          {MOTION_VIDEOS.map((video, index) => {
            const isHovered = hoveredIndex === index
            const shouldDim = hoveredIndex !== null && hoveredIndex !== index

            return (
              <article
                key={video.src}
                ref={(node) => {
                  cardRefs.current[index] = node
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                className={[
                  'aspect-[9/16] w-full h-full relative overflow-hidden rounded-2xl border border-white/10 bg-[#090909]',
                  'shadow-[0_24px_70px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out',
                  isHovered ? 'scale-[1.03] opacity-100' : 'scale-100',
                  shouldDim ? 'opacity-40' : 'opacity-100',
                ].join(' ')}
              >
                <video
                  ref={(node) => {
                    videoRefs.current[index] = node
                  }}
                  className="h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="none"
                  src={loaded[index] ? video.src : undefined}
                  onLoadedData={() => {
                    if (inView[index]) {
                      playVideo(videoRefs.current[index])
                    }
                  }}
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-xs tracking-[0.22em] text-gray-200">{video.title.toUpperCase()}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
