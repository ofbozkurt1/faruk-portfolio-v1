import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import ResponsiveImage from '../../components/ui/ResponsiveImage'

const PROFILE_IMAGE = '/gorseller/profil/ppwebp1.webp'

const INSTAGRAM_POSTS = [
    {
        id: 'ig-pst-1',
        src: '/gorseller/intagramgorseller/pst1.webp',
    },
    {
        id: 'ig-pst-2',
        src: '/gorseller/intagramgorseller/pst2.webp',
    },
    {
        id: 'ig-pst-3',
        src: '/gorseller/intagramgorseller/pst3.webp',
    },
    {
        id: 'ig-pst-4',
        src: '/gorseller/intagramgorseller/pst4.webp',
    },
    {
        id: 'ig-pst-5',
        src: '/gorseller/intagramgorseller/pst5.webp',
    },
    {
        id: 'ig-pst-6',
        src: '/gorseller/intagramgorseller/pst6.webp',
    },
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

function VerifiedIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-sky-400 md:h-6 md:w-6" aria-label="Verified account" role="img">
            <path
                fill="currentColor"
                d="M12 2.2l2.4 1.7 3-.2 1.1 2.8 2.5 1.7-.9 2.9.9 2.9-2.5 1.7-1.1 2.8-3-.2-2.4 1.7-2.4-1.7-3 .2-1.1-2.8L3 14.1l.9-2.9L3 8.3l2.5-1.7 1.1-2.8 3 .2L12 2.2z"
            />
            <path
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.2 12.2l2.4 2.3 5.2-5.4"
            />
        </svg>
    )
}

const InstagramPostCard = memo(function InstagramPostCard({ alt, post }) {
    return (
        <article className="group relative aspect-[4/5] overflow-hidden rounded-md border border-white/10 bg-[#0a0a0a]">
            <ResponsiveImage
                src={post.src}
                alt={alt}
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
    )
})

export default function InstagramShowcase() {
    const { t } = useTranslation()

    return (
        <section id="instagram-showcase" className="relative w-full py-14 md:py-24 container-padding">
            <div className="mx-auto max-w-4xl">
                <div className="flex flex-col items-start gap-6 md:flex-row md:gap-10">
                    <div className="h-28 w-28 shrink-0 rounded-full border-2 border-gray-700 p-1.5 md:h-56 md:w-56">
                        <ResponsiveImage
                            src={PROFILE_IMAGE}
                            alt={t('instagramShowcase.profileAlt', 'graphic.faruk profile')}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 md:gap-4">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-100 md:text-5xl">grafikfaruk</h2>
                            <VerifiedIcon />
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-300 md:mt-6 md:flex md:items-center md:gap-10 md:text-base">
                            <p><span className="font-semibold text-gray-100">148</span> {t('instagramShowcase.posts', 'Posts')}</p>
                            <p><span className="font-semibold text-gray-100">1217</span> {t('instagramShowcase.followers', 'Followers')}</p>
                            <p><span className="font-semibold text-gray-100">1,204</span> {t('instagramShowcase.following', 'Following')}</p>
                        </div>

                        <div className="mt-4 space-y-2 text-sm text-gray-400 md:mt-5 md:text-lg">
                            <p>{t('instagramShowcase.bioLine1', 'Design · Branding · Marketing')}</p>
                            <p>{t('instagramShowcase.bioLine2', 'I design to make your brand stand out.')}</p>
                            <p>{t('instagramShowcase.bioLine3', "Ready to stand out? Let's work together.")}</p>
                        </div>

                        <button
                            type="button"
                            className="mt-6 min-h-[44px] rounded-md bg-white px-6 py-2 text-sm font-medium text-black transition-colors duration-300 hover:bg-gray-200 md:mt-7 md:px-8 md:py-3 md:text-base"
                        >
                            {t('instagramShowcase.follow', 'Takip Et')}
                        </button>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6 md:mt-12 md:pt-8">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                        {INSTAGRAM_POSTS.map((post, index) => (
                            <InstagramPostCard
                                key={post.id}
                                alt={t('instagramShowcase.postAlt', { number: index + 1 })}
                                post={post}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
