/**
 * HeroBackground - Ghost Reel Animation
 * Subtle auto-scrolling project images in the background
 * CSS-only animations for performance
 * 
 * Both sides have mixed content: 1 column stories + 1 column posts
 * Images from optimized slider directory
 */

import ResponsiveImage from '../../components/ui/ResponsiveImage'

const HeroBackground = () => {
    // POST images - Left Side
    const postImagesLeft = [
        '/gorseller/slidergorseller/pst1.webp',
        '/gorseller/slidergorseller/pst2.webp',
        '/gorseller/slidergorseller/pst3.webp',
        '/gorseller/slidergorseller/pst4.webp',
        '/gorseller/slidergorseller/pst5.webp',
        '/gorseller/slidergorseller/pst6.webp',
        '/gorseller/slidergorseller/pst7.webp',
        '/gorseller/slidergorseller/pst8.webp',
        '/gorseller/slidergorseller/pst9.webp',
        '/gorseller/slidergorseller/pst10.webp',
    ]

    // POST images - Right Side
    const postImagesRight = [
        '/gorseller/slidergorseller/pst11.webp',
        '/gorseller/slidergorseller/pst12.webp',
        '/gorseller/slidergorseller/pst13.webp',
        '/gorseller/slidergorseller/pst14.webp',
        '/gorseller/slidergorseller/pst15.webp',
        '/gorseller/slidergorseller/pst16.webp',
        '/gorseller/slidergorseller/pst17.webp',
        '/gorseller/slidergorseller/pst18.webp',
        '/gorseller/slidergorseller/pst19.webp',
        '/gorseller/slidergorseller/pst20.webp',
    ]

    // STORY images - Left Side
    const storyImagesLeft = [
        '/gorseller/slidergorseller/str1.webp',
        '/gorseller/slidergorseller/str2.webp',
        '/gorseller/slidergorseller/str3.webp',
        '/gorseller/slidergorseller/str4.webp',
        '/gorseller/slidergorseller/str5.webp',
        '/gorseller/slidergorseller/str6.webp',
    ]

    // STORY images - Right Side
    const storyImagesRight = [
        '/gorseller/slidergorseller/str7.webp',
        '/gorseller/slidergorseller/str8.webp',
        '/gorseller/slidergorseller/str9.webp',
        '/gorseller/slidergorseller/str10.webp',
        '/gorseller/slidergorseller/str11.webp',
        '/gorseller/slidergorseller/str12.webp',
    ]

    return (
        <>
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
                    width: 28%;
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
                    width: 28%;
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
                    will-change: transform;
                }

                .ghost-column-story {
                    width: 100px;
                }

                .ghost-column-post {
                    width: 130px;
                }

                .ghost-column-inner {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .scroll-up .ghost-column-inner {
                    animation: scrollUp 45s linear infinite;
                    will-change: transform;
                }

                .scroll-down .ghost-column-inner {
                    animation: scrollDown 40s linear infinite;
                    will-change: transform;
                }

                .ghost-image {
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                    border-radius: 10px;
                    opacity: 0.08;
                    filter: grayscale(100%);
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
            <div className="ghost-reel-left" aria-hidden="true">
                <div className="ghost-columns-left">
                    {/* Posts - Scrolls Up */}
                    <div className="ghost-column ghost-column-post scroll-up">
                        <div className="ghost-column-inner">
                            {postImagesLeft.map((src, idx) => (
                                <ResponsiveImage
                                    key={`lp-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-post"
                                    priority={idx < 2} // First 2 images for LCP
                                />
                            ))}
                            {postImagesLeft.map((src, idx) => (
                                <ResponsiveImage
                                    key={`lp-dup-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-post"
                                    priority={false}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Stories - Scrolls Down */}
                    <div className="ghost-column ghost-column-story scroll-down">
                        <div className="ghost-column-inner">
                            {storyImagesLeft.map((src, idx) => (
                                <ResponsiveImage
                                    key={`ls-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-story"
                                    priority={false}
                                />
                            ))}
                            {storyImagesLeft.map((src, idx) => (
                                <ResponsiveImage
                                    key={`ls-dup-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-story"
                                    priority={false}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE - Post column + Story column */}
            <div className="ghost-reel-right" aria-hidden="true">
                <div className="ghost-columns-right">
                    {/* Posts - Scrolls Up */}
                    <div className="ghost-column ghost-column-post scroll-up">
                        <div className="ghost-column-inner">
                            {postImagesRight.map((src, idx) => (
                                <ResponsiveImage
                                    key={`rp-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-post"
                                    priority={idx < 2}
                                />
                            ))}
                            {postImagesRight.map((src, idx) => (
                                <ResponsiveImage
                                    key={`rp-dup-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-post"
                                    priority={false}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Stories - Scrolls Down */}
                    <div className="ghost-column ghost-column-story scroll-down">
                        <div className="ghost-column-inner">
                            {storyImagesRight.map((src, idx) => (
                                <ResponsiveImage
                                    key={`rs-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-story"
                                    priority={false}
                                />
                            ))}
                            {storyImagesRight.map((src, idx) => (
                                <ResponsiveImage
                                    key={`rs-dup-${idx}`}
                                    src={src}
                                    alt=""
                                    className="ghost-image ghost-image-story"
                                    priority={false}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroBackground
