/**
 * HeroBackground - Ghost Reel Animation
 * Subtle auto-scrolling project images in the background
 * CSS-only animations for performance
 * 
 * Both sides have mixed content: 1 column stories + 1 column posts
 * Images from ALL projects for variety
 */

const HeroBackground = () => {
    // POST images from ALL projects - mixed variety
    const postImagesLeft = [
        '/gorseller/novastra/pst1.webp',
        '/gorseller/akdenizetkinlik/pst3.webp',
        '/gorseller/googleyorumlar/pst5.webp',
        '/gorseller/adananapoli/pst1.webp',
        '/gorseller/kumrualtı/pst1.webp',
        '/gorseller/hacıhakkıusta/pst1.webp',
        '/gorseller/tırnaktrend/pst1.webp',
        '/gorseller/bbstransfer/pst1.webp',
    ]

    const postImagesRight = [
        '/gorseller/akdenizetkinlik/pst1.webp',
        '/gorseller/novastra/pst4.webp',
        '/gorseller/googleyorumlar/pst2.webp',
        '/gorseller/kumrualtı/pst2.webp',
        '/gorseller/adananapoli/pst2.webp',
        '/gorseller/tırnaktrend/pst2.webp',
        '/gorseller/akdenizetkinlik/pst7.webp',
        '/gorseller/novastra/pst6.webp',
    ]

    // STORY images - vertical format (from projects that have stories)
    const storyImagesLeft = [
        '/gorseller/novastra/str1.webp',
        '/gorseller/adananapoli/str2.webp',
        '/gorseller/novastra/str5.webp',
        '/gorseller/hacıhakkıusta/str1.webp',
        '/gorseller/adananapoli/str4.webp',
        '/gorseller/novastra/str9.webp',
    ]

    const storyImagesRight = [
        '/gorseller/novastra/str3.webp',
        '/gorseller/adananapoli/str1.webp',
        '/gorseller/novastra/str7.webp',
        '/gorseller/hacıhakkıusta/str2.webp',
        '/gorseller/adananapoli/str3.webp',
        '/gorseller/novastra/str11.webp',
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
            <div className="ghost-reel-left">
                <div className="ghost-columns-left">
                    {/* Posts - Scrolls Up */}
                    <div className="ghost-column ghost-column-post scroll-up">
                        <div className="ghost-column-inner">
                            {postImagesLeft.map((src, idx) => (
                                <img key={`lp-${idx}`} src={src} alt="" className="ghost-image ghost-image-post" loading="lazy" />
                            ))}
                            {postImagesLeft.map((src, idx) => (
                                <img key={`lp-dup-${idx}`} src={src} alt="" className="ghost-image ghost-image-post" loading="lazy" />
                            ))}
                        </div>
                    </div>

                    {/* Stories - Scrolls Down */}
                    <div className="ghost-column ghost-column-story scroll-down">
                        <div className="ghost-column-inner">
                            {storyImagesLeft.map((src, idx) => (
                                <img key={`ls-${idx}`} src={src} alt="" className="ghost-image ghost-image-story" loading="lazy" />
                            ))}
                            {storyImagesLeft.map((src, idx) => (
                                <img key={`ls-dup-${idx}`} src={src} alt="" className="ghost-image ghost-image-story" loading="lazy" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE - Post column + Story column (swapped) */}
            <div className="ghost-reel-right">
                <div className="ghost-columns-right">
                    {/* Posts - Scrolls Up */}
                    <div className="ghost-column ghost-column-post scroll-up">
                        <div className="ghost-column-inner">
                            {postImagesRight.map((src, idx) => (
                                <img key={`rp-${idx}`} src={src} alt="" className="ghost-image ghost-image-post" loading="lazy" />
                            ))}
                            {postImagesRight.map((src, idx) => (
                                <img key={`rp-dup-${idx}`} src={src} alt="" className="ghost-image ghost-image-post" loading="lazy" />
                            ))}
                        </div>
                    </div>

                    {/* Stories - Scrolls Down */}
                    <div className="ghost-column ghost-column-story scroll-down">
                        <div className="ghost-column-inner">
                            {storyImagesRight.map((src, idx) => (
                                <img key={`rs-${idx}`} src={src} alt="" className="ghost-image ghost-image-story" loading="lazy" />
                            ))}
                            {storyImagesRight.map((src, idx) => (
                                <img key={`rs-dup-${idx}`} src={src} alt="" className="ghost-image ghost-image-story" loading="lazy" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroBackground
