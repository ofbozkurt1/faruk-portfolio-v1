const PROFILE_IMAGE = '/gorseller/profil/ppwebp1.webp'

const INSTAGRAM_POSTS = [
  '/gorseller/intagramgorseller/pst1.webp',
  '/gorseller/intagramgorseller/pst2.webp',
  '/gorseller/intagramgorseller/pst3.webp',
  '/gorseller/intagramgorseller/pst4.webp',
  '/gorseller/intagramgorseller/pst1.webp',
  '/gorseller/intagramgorseller/pst2.webp',
  '/gorseller/intagramgorseller/pst3.webp',
  '/gorseller/intagramgorseller/pst4.webp',
  '/gorseller/intagramgorseller/pst1.webp',
]

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  )
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-4 3v-6.5A8.5 8.5 0 1 1 21 11.5Z" />
    </svg>
  )
}

export default function InstagramShowcase() {
  return (
    <section id="instagram-showcase" className="relative w-full py-24 container-padding">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start gap-8">
          <div className="h-32 w-32 shrink-0 rounded-full border-2 border-gray-800 p-1">
            <img
              src={PROFILE_IMAGE}
              alt="graphic.faruk profile"
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-gray-100">graphic.faruk</h2>
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-400" aria-hidden="true" />
            </div>

            <div className="mt-4 flex items-center gap-8 text-sm text-gray-300">
              <p><span className="font-semibold text-gray-100">148</span> Posts</p>
              <p><span className="font-semibold text-gray-100">42.8K</span> Followers</p>
              <p><span className="font-semibold text-gray-100">1,204</span> Following</p>
            </div>

            <div className="mt-4 space-y-1 text-gray-400">
              <p>Design · Branding · Marketing</p>
              <p>I design to make your brand stand out.</p>
              <p>Ready to stand out? Let&apos;s work together.</p>
            </div>

            <button
              type="button"
              className="mt-6 rounded-md bg-white px-6 py-2 font-medium text-black transition-colors duration-300 hover:bg-gray-200"
            >
              Takip Et
            </button>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="grid grid-cols-3 gap-3">
            {INSTAGRAM_POSTS.map((src, index) => (
              <article key={`${src}-${index}`} className="group relative aspect-square overflow-hidden rounded-md border border-white/10 bg-[#0a0a0a]">
                <img
                  src={src}
                  alt={`Instagram post ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center gap-6 bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/50 group-hover:opacity-100">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <HeartIcon />
                    <span>12.4K</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CommentIcon />
                    <span>382</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
