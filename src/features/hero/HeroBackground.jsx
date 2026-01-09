/**
 * HeroBackground - Ghost Reel Animation
 * OPTIMIZED: Added isInView guard to pause animations when off-screen
 */

import { useRef } from 'react'
import { useInView } from 'framer-motion'

const HeroBackground = () => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { amount: 0.1 })

    // POST images - Left Side
    const postImagesLeft = [
        '/gorseller/slidergorseller/pst1.webp',
        '/gorseller/slidergorseller/pst2.webp',
        '/gorseller/slidergorseller/pst3.webp',
        '/gorseller/slidergorseller/pst4.webp',
        '/gorseller/slidergorseller/pst5.webp',
    ]

    // POST images - Right Side
    const postImagesRight = [
        '/gorseller/slidergorseller/pst11.webp',
        '/gorseller/slidergorseller/pst12.webp',
        '/gorseller/slidergorseller/pst13.webp',
        '/gorseller/slidergorseller/pst14.webp',
        '/gorseller/slidergorseller/pst15.webp',
    ]

    // STORY images - Left Side (reduced)
    const storyImagesLeft = [
        '/gorseller/slidergorseller/str1.webp',
        '/gorseller/slidergorseller/str2.webp',
        '/gorseller/slidergorseller/str3.webp',
    ]

    // STORY images - Right Side (reduced)
    const storyImagesRight = [
        '/gorseller/slidergorseller/str7.webp',
        '/gorseller/slidergorseller/str8.webp',
        '/gorseller/slidergorseller/str9.webp',
    ]

    return (
        <div ref={containerRef}>
            {/* CSS Keyframes */}
            <style>{`
                @keyframes scrollUp {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                
                @keyframes scrollDown {
                    0% { transform: translateY(-50%); }
                    100% { transform: translateY(0); }
                }

                /* LEFT SIDE */
                .ghost-reel-left {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    width: 24%;
                    overflow: hidden;
                    z-index: 0;
                    transform: rotate(6deg) scale(1.1);
                    transform-origin: left center;
                    mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 15%, rgba(0,0,0,0.5) 85%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 15%, rgba(0,0,0,0.5) 85%, transparent 100%);
                }

                /* RIGHT SIDE */
                .ghost-reel-right {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 24%;
                    overflow: hidden;
                    z-index: 0;
                    transform: rotate(-6deg) scale(1.1);
                    transform-origin: right center;
                    mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 15%, rgba(0,0,0,0.5) 85%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 15%, rgba(0,0,0,0.5) 85%, transparent 100%);
                }

                .ghost-columns-left {
                    display: flex;
                    gap: 12px;
                    height: 100%;
                    padding-left: 20px;
                    justify-content: flex-start;
                }

                .ghost-columns-right {
                    display: flex;
                    gap: 12px;
                    height: 100%;
                    padding-right: 20px;
                    justify-content: flex-end;
                }

                .ghost-column {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    flex-shrink: 0;
                }

                .ghost-column-story {
                    width: 90px;
                }

                .ghost-column-post {
                    width: 120px;
                }

                .ghost-column-inner {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                /* ANIMATION ONLY WHEN IN VIEW */
                .ghost-reel-active .scroll-up .ghost-column-inner {
                    animation: scrollUp 50s linear infinite;
                }

                .ghost-reel-active .scroll-down .ghost-column-inner {
                    animation: scrollDown 45s linear infinite;
                }

                /* PAUSED WHEN NOT IN VIEW */
                .ghost-reel-paused .ghost-column-inner {
                    animation: none !important;
                }

                .ghost-image {
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                    border-radius: 10px;
                    opacity: 0.06;
                    flex-shrink: 0;
                }

                .ghost-image-story {
                    aspect-ratio: 9/16;
                }

                .ghost-image-post {
                    aspect-ratio: 4/5;
                }

                /* Hide on mobile/tablet */
                @media (max-width: 1024px) {
                    .ghost-reel-left,
                    .ghost-reel-right {
                        display: none;
                    }
                }
            `}</style>

            {/* LEFT SIDE - Post column + Story column */}
            <div className={`ghost-reel-left ${isInView ? 'ghost-reel-active' : 'ghost-reel-paused'}`} aria-hidden="true">
                <div className="ghost-columns-left">
                    {/* Posts - Scrolls Up */}
                    <div className="ghost-column ghost-column-post scroll-up">
                        <div className="ghost-column-inner">
                            {postImagesLeft.map((src, idx) => (
                                <img
                                    key={`lp-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-post"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ))}
                            {postImagesLeft.map((src, idx) => (
                                <img
                                    key={`lp-dup-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-post"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Stories - Scrolls Down */}
                    <div className="ghost-column ghost-column-story scroll-down">
                        <div className="ghost-column-inner">
                            {storyImagesLeft.map((src, idx) => (
                                <img
                                    key={`ls-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-story"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ))}
                            {storyImagesLeft.map((src, idx) => (
                                <img
                                    key={`ls-dup-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-story"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE - Post column + Story column */}
            <div className={`ghost-reel-right ${isInView ? 'ghost-reel-active' : 'ghost-reel-paused'}`} aria-hidden="true">
                <div className="ghost-columns-right">
                    {/* Posts - Scrolls Up */}
                    <div className="ghost-column ghost-column-post scroll-up">
                        <div className="ghost-column-inner">
                            {postImagesRight.map((src, idx) => (
                                <img
                                    key={`rp-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-post"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ))}
                            {postImagesRight.map((src, idx) => (
                                <img
                                    key={`rp-dup-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-post"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Stories - Scrolls Down */}
                    <div className="ghost-column ghost-column-story scroll-down">
                        <div className="ghost-column-inner">
                            {storyImagesRight.map((src, idx) => (
                                <img
                                    key={`rs-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-story"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ))}
                            {storyImagesRight.map((src, idx) => (
                                <img
                                    key={`rs-dup-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-story"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBackground
