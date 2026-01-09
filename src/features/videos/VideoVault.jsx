/**
 * VideoVault Component - Phase 48: Mobile Tabbed Interface
 * Mobile: Single tabbed view (saves vertical space)
 * Desktop: Unchanged - stacked layout
 */

import React, { useRef, useEffect, memo, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// Video data - 4 groups
const groups = [
    {
        id: 'hype',
        tabLabel: 'HYPE',
        title: 'HYPE & EVENTS',
        desc: 'Capturing the raw energy of the moment.',
        videos: [
            { id: 1, src: '/videolar/vd1.mp4', title: 'Summer Vibes' },
            { id: 2, src: '/videolar/vd2.mp4', title: 'Night Life' }
        ]
    },
    {
        id: 'commercial',
        tabLabel: 'TİCARİ',
        title: 'COMMERCIAL',
        desc: 'Brand storytelling and product showcase.',
        videos: [
            { id: 3, src: '/videolar/vd3.mp4', title: 'Brand Story' },
            { id: 4, src: '/videolar/vd4.mp4', title: 'Product Launch' }
        ]
    },
    {
        id: 'social',
        tabLabel: 'SOCIAL',
        title: 'SOCIAL EDITS',
        desc: 'Short-form content designed to engage.',
        videos: [
            { id: 5, src: '/videolar/vd5.mp4', title: 'Reels Edit' },
            { id: 6, src: '/videolar/vd6.mp4', title: 'TikTok Style' }
        ]
    },
    {
        id: 'aerial',
        tabLabel: 'DRONE',
        title: 'AERIAL & DRONE',
        desc: 'Cinematic perspectives from the sky.',
        videos: [
            { id: 7, src: '/videolar/drn1.mp4', title: 'City Flyover' },
            { id: 8, src: '/videolar/drn2.mp4', title: 'Nature Shot' }
        ]
    }
]

// Simple Video Card - Memoized
const VideoCard = memo(function VideoCard({ video }) {
    const ref = useRef(null)
    const videoRef = useRef(null)
    const isInView = useInView(ref, { amount: 0.6 })

    useEffect(() => {
        if (!videoRef.current) return
        if (isInView) {
            videoRef.current.play().catch(() => { })
        } else {
            videoRef.current.pause()
        }
    }, [isInView])

    return (
        <div
            ref={ref}
            style={{
                position: 'relative',
                aspectRatio: '9/16',
                borderRadius: 16,
                overflow: 'hidden',
                background: 'rgba(0,0,0,0.3)'
            }}
        >
            <video
                ref={videoRef}
                src={video.src}
                muted
                loop
                playsInline
                preload="none"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '40px 16px 16px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                }}
            >
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {video.title}
                </span>
            </div>
        </div>
    )
})

// ============ MOBILE TABBED VIEW ============
function MobileVideoTabs() {
    const [activeTab, setActiveTab] = useState(0)
    const activeGroup = groups[activeTab]

    return (
        <div className="md:hidden">
            {/* Tab Buttons */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {groups.map((group, idx) => (
                    <button
                        key={group.id}
                        onClick={() => setActiveTab(idx)}
                        className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeTab === idx
                                ? 'bg-white text-black'
                                : 'bg-white/10 text-white/60'
                            }`}
                    >
                        {group.tabLabel}
                    </button>
                ))}
            </div>

            {/* Active Content */}
            <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">{activeGroup.title}</h3>
                <p className="text-sm text-white/50">{activeGroup.desc}</p>
            </div>

            {/* Video Carousel */}
            <div
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                {activeGroup.videos.map((video) => (
                    <div
                        key={video.id}
                        className="flex-shrink-0 snap-center"
                        style={{ width: '70vw', maxWidth: '280px' }}
                    >
                        <VideoCard video={video} />
                    </div>
                ))}
            </div>
        </div>
    )
}

// ============ DESKTOP VIEW (UNCHANGED) ============
function DesktopVideoGroups() {
    return (
        <div className="hidden md:block space-y-24">
            {groups.map((group, index) => {
                const isReversed = index % 2 === 1
                return (
                    <motion.div
                        key={group.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex gap-16 items-center"
                        style={{ flexDirection: isReversed ? 'row-reverse' : 'row' }}
                    >
                        {/* Videos */}
                        <div className="grid grid-cols-2 gap-5 w-[45%]">
                            {group.videos.map((video, idx) => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
                                Video Work — 2024
                            </span>
                            <h3 className="text-4xl font-bold text-white mt-2 mb-4">{group.title}</h3>
                            <p className="text-[15px] text-white/50 max-w-[380px]">{group.desc}</p>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}

// ============ MAIN COMPONENT ============
export default function VideoVault() {
    const { t } = useTranslation()

    return (
        <section className="py-16 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-24"
                >
                    <div className="flex items-center justify-center gap-4 md:gap-6 mb-2 md:mb-4">
                        <div className="w-10 md:w-[60px] h-[1px] bg-gradient-to-r from-transparent to-white/30" />
                        <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-white">
                            {t('videoShowcase.title', 'Video Showcase')}
                        </h2>
                        <div className="w-10 md:w-[60px] h-[1px] bg-gradient-to-l from-transparent to-white/30" />
                    </div>
                    <p className="text-white/40 text-sm md:text-base">
                        {t('videoShowcase.subtitle', 'Vertical stories that captivate')}
                    </p>
                </motion.div>

                {/* Mobile: Tabbed Interface */}
                <MobileVideoTabs />

                {/* Desktop: Stacked Layout */}
                <DesktopVideoGroups />
            </div>
        </section>
    )
}
