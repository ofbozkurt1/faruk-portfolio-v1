/**
 * GridView Component - Phase 25: Case Study Format
 * Premium project detail page with:
 * - Meta section (client, role, year, tools)
 * - Visual Identity section (color palette, typography)
 * - Enhanced image gallery with animations
 */

import { useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getPostImages, getLongPostImages, getStoryImages, getProjectImagePath } from '../../utils/imagePath'
import ResponsiveImage from '../../components/ui/ResponsiveImage'

// Tool icon mapping
const toolIcons = {
    illustrator: '/gorseller/iconlar/illustrator.svg',
    photoshop: '/gorseller/iconlar/photoshop.svg',
    aftereffects: '/gorseller/iconlar/after-effects.svg',
    premiere: '/gorseller/iconlar/premiere-pro.svg',
    figma: '/gorseller/iconlar/figma.svg'
}

const NOVASTRA_CLOUD_BASE = 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775630739/'
const NOVASTRA_STORY_CLOUD_BASE = 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775632273/'
const NOVASTRA_TRIPLE_STORY_ASSET = 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775650345/3str.webp'
const GOOGLE_YORUMLAR_POST_CLOUD_BASE = 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775660462/%C4%B0mage/google-yorumlar/google-pst-webp/'
const GOOGLE_YORUMLAR_STORY_CLOUD_BASE = 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775660428/%C4%B0mage/google-yorumlar/google-str-webp/'
const ADANA_NAPOLI_POST_CLOUD_BASE = 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775729245/%C4%B0mage/adana-napoli/adana-napoli-%20pst-webp/'
const ADANA_NAPOLI_STORY_CLOUD_BASE = 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775729316/%C4%B0mage/adana-napoli/adana-napoli-%20str-webp/'
const VIVACAR_POST_CLOUD_BASE = 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/vivacar/vivacar-pst-webp/'
const HACI_HAKKI_USTA_POST_CLOUD_BASE = 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/hac%C4%B1hakk%C4%B1/hac%C4%B1hakk%C4%B1-pst/'
const HACI_HAKKI_USTA_STORY_CLOUD_BASE = 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/hac%C4%B1hakk%C4%B1/hac%C4%B1hakk%C4%B1-str/'
const AKDENIZ_ETKINLIK_POST_CLOUD_BASE = 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/aktet/aktet-pst-webp/'
const TIRNAK_TREND_POST_CLOUD_BASE = 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/t%C4%B1rnaktrend/t%C4%B1rnaktrend-pst-webp/'
const BBS_TRANSFER_POST_CLOUD_BASE = 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/bbstransfer/bbstransfer-pst-webp/'
const KUMRUALTI_POST_CLOUD_BASE = 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/kumrualt%C4%B1/kumrualt%C4%B1-pst-webp/'

const PROJECT_MEDIA_CONFIG = {
    novastra: {
        postBase: NOVASTRA_CLOUD_BASE,
        storyBase: NOVASTRA_STORY_CLOUD_BASE,
        imageOrder: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        storyOrder: [
            1,
            2,
            3,
            { type: 'triple-seamless', combined: true, src: NOVASTRA_TRIPLE_STORY_ASSET },
            4,
            5,
            6,
            7,
            8,
        ],
    },
    googleyorumlar: {
        postBase: GOOGLE_YORUMLAR_POST_CLOUD_BASE,
        storyBase: GOOGLE_YORUMLAR_STORY_CLOUD_BASE,
        imageOrder: [1, 2, 3, 4, 5, 6, 7, 8],
        storyOrder: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    adananapoli: {
        postBase: ADANA_NAPOLI_POST_CLOUD_BASE,
        storyBase: ADANA_NAPOLI_STORY_CLOUD_BASE,
        imageOrder: ['3pst1', 1, 2],
        storyOrder: [1, 2, 3, 4, 5],
    },
    vivacar: {
        postBase: VIVACAR_POST_CLOUD_BASE,
        imageOrder: [1, 2, 3],
    },
    'hacıhakkıusta': {
        postBase: HACI_HAKKI_USTA_POST_CLOUD_BASE,
        storyBase: HACI_HAKKI_USTA_STORY_CLOUD_BASE,
        imageOrder: [1, 2, 3, 4, 5],
        storyOrder: [1, 2],
    },
    akdenizetkinlik: {
        postBase: AKDENIZ_ETKINLIK_POST_CLOUD_BASE,
        imageOrder: ['3pst1', 1, 2, 3, '3pst2', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
    'tırnaktrend': {
        postBase: TIRNAK_TREND_POST_CLOUD_BASE,
        imageOrder: [1, 2, 3],
    },
    bbstransfer: {
        postBase: BBS_TRANSFER_POST_CLOUD_BASE,
        imageOrder: [1, 2],
    },
    'kumrualtı': {
        postBase: KUMRUALTI_POST_CLOUD_BASE,
        imageOrder: [1, 2, 3],
    },
}
// Meta Item Component - Enhanced with brand color
function MetaItem({ label, value, delay = 0, brandColor = '#9333EA' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            style={{ position: 'relative', cursor: 'default' }}
        >
            <span
                style={{
                    display: 'block',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: brandColor,
                    marginBottom: 10,
                    opacity: 0.9
                }}
            >
                {label}
            </span>
            <span style={{
                fontSize: 16,
                color: '#F2F2F2',
                fontWeight: 500
            }}>{value}</span>
        </motion.div>
    )
}

// Color Swatch Component
function ColorSwatch({ color, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.1, y: -4 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer'
            }}
        >
            <div
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: color.code,
                    border: color.code === '#FFFFFF' ? '1px solid rgba(255,255,255,0.2)' : 'none'
                }}
            />
            <span
                style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    fontSize: 9,
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.5)'
                }}
            >
                {color.code}
            </span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                {color.name}
            </span>
        </motion.div>
    )
}

// Typography Display Component
function TypographyDisplay({ fontFamily, fontStyle }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20
            }}
        >
            <span
                style={{
                    fontSize: 80,
                    fontWeight: 700,
                    color: '#F2F2F2',
                    lineHeight: 1
                }}
            >
                Aa
            </span>
            <div>
                <span style={{ fontSize: 22, color: '#F2F2F2', display: 'block', fontWeight: 600 }}>
                    {fontFamily}
                </span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4, display: 'block' }}>
                    {fontStyle}
                </span>
            </div>
        </motion.div>
    )
}

// Image Card Component
function ImageCard({ src, alt, index, type = 'post', className }) {
    const isLong = type === 'longPost'

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            style={{
                borderRadius: 16,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                width: isLong ? '100%' : undefined // Ensure full width for long posts
            }}
        >
            <ResponsiveImage
                src={src}
                alt={alt}
                priority={index < 4}
                style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                }}
            />
        </motion.div>
    )
}

function CombinedTriplePostCard({ src, alt, index, className }) {
    const positions = ['left', 'center', 'right']

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            style={{
                borderRadius: 16,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {positions.map((position, sliceIndex) => (
                    <div key={`${position}-${sliceIndex}`} className="relative aspect-[4/5] overflow-hidden">
                        <img
                            src={src}
                            alt={`${alt} Slice ${sliceIndex + 1}`}
                            loading="lazy"
                            decoding="async"
                            className={[
                                'h-full w-full object-cover',
                                position === 'left' ? 'object-left' : position === 'right' ? 'object-right' : 'object-center',
                            ].join(' ')}
                            style={{ display: 'block' }}
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

function CombinedTripleStoryCard({ src, alt, index, className }) {
    const positions = ['left', 'center', 'right']

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            style={{
                borderRadius: 16,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {positions.map((position, sliceIndex) => (
                    <div key={`${position}-${sliceIndex}`} className="relative aspect-[9/16] overflow-hidden">
                        <img
                            src={src}
                            alt={`${alt} Slice ${sliceIndex + 1}`}
                            loading="lazy"
                            decoding="async"
                            className={[
                                'h-full w-full object-cover',
                                position === 'left' ? 'object-left' : position === 'right' ? 'object-right' : 'object-center',
                            ].join(' ')}
                            style={{ display: 'block' }}
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

function GridViewContent({ project, onClose }) {
    const { t } = useTranslation()
    // scrollContainerRef removed - using native scroll on motion.div wrapper
    const {
        id, title, category, year, description,
        postCount = 0, longPostCount = 0, storyCount = 0,
        customOrder, client, role, deliverables,
        techStack = [], identity, brandColor
    } = project

    // Dynamic Localization
    const projectKey = `projects.${id}`
    const translatedTitle = t(`${projectKey}.title`, title)
    const translatedCategory = t(`${projectKey}.category`, category)
    const translatedRole = t(`${projectKey}.role`, role)
    const translatedDeliverables = t(`${projectKey}.deliverables`, deliverables)
    const translatedDescription = t(`${projectKey}.description`, description)
    const translatedYear = t(`${projectKey}.year`, year)

    const projectMedia = PROJECT_MEDIA_CONFIG[id] || null
    const imageOrder = projectMedia?.imageOrder || null
    const storyOrder = projectMedia?.storyOrder || null
    const activePostBaseUrl = projectMedia?.postBase || null
    const activeStoryBaseUrl = projectMedia?.storyBase || null

    const longPostImages = getLongPostImages(id, longPostCount)
    const postItems = imageOrder && activePostBaseUrl
        ? imageOrder.map((entry) => {
            if (typeof entry === 'number') {
                return {
                    type: 'post',
                    combined: false,
                    postNumber: entry,
                    src: `${activePostBaseUrl}pst${entry}.webp`,
                }
            }

            if (typeof entry === 'string' && entry.toLowerCase().includes('3pst')) {
                return {
                    type: 'triple-post',
                    combined: true,
                    src: `${activePostBaseUrl}${entry}.webp`,
                }
            }

            if (entry && entry.combined && entry.type === 'triple-post' && entry.src) {
                return {
                    type: entry.type,
                    combined: true,
                    src: entry.src,
                }
            }

            return null
        }).filter(Boolean)
        : getPostImages(id, postCount).map((src, idx) => ({
            type: 'post',
            combined: false,
            postNumber: idx + 1,
            src,
        }))

    const storyItems = storyOrder && activeStoryBaseUrl
        ? storyOrder.map((entry) => {
            if (typeof entry === 'number') {
                return {
                    type: 'story',
                    combined: false,
                    storyNumber: entry,
                    src: `${activeStoryBaseUrl}str${entry}.webp`,
                }
            }

            if (entry && entry.combined && entry.type === 'triple-seamless' && entry.src) {
                return {
                    type: entry.type,
                    combined: true,
                    src: entry.src,
                }
            }

            return null
        }).filter(Boolean)
        : getStoryImages(id, storyCount).map((src, idx) => ({
            type: 'story',
            combined: false,
            storyNumber: idx + 1,
            src,
        }))

    const singleStoryItems = storyItems.filter((item) => !item.combined)
    const combinedStoryItems = storyItems.filter((item) => item.combined)

    // Custom ordered images for projects with customOrder
    const orderedImages = useMemo(() => {
        if (!customOrder || projectMedia?.imageOrder || projectMedia?.storyOrder) return null

        return customOrder.map(item => {
            if (item.type === 'longPost') {
                return { src: getProjectImagePath(id, 'longPost', item.index), type: 'longPost' }
            } else if (item.type === 'post') {
                return { src: getProjectImagePath(id, 'post', item.index), type: 'post' }
            } else if (item.type === 'story') {
                return { src: getProjectImagePath(id, 'story', item.index), type: 'story' }
            }
            return null
        }).filter(Boolean)
    }, [id, customOrder, projectMedia])

    // ESC key closes modal
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose])

    // DISABLED FOR TESTING - Body scroll lock
    // useEffect(() => {
    //     const originalStyle = document.body.style.overflow
    //     document.body.style.overflow = 'hidden'
    //     return () => {
    //         document.body.style.overflow = originalStyle
    //     }
    // }, [])

    return (
        // LENIS BYPASS: data-lenis-prevent stops Lenis from hijacking scroll
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] h-[100dvh] w-screen overflow-y-scroll overflow-x-hidden bg-[#0a0a0a] overscroll-y-none pointer-events-auto"
            // STOP LENIS FROM STEALING SCROLL EVENTS
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
        >
            {/* Close Button - Fixed position, always visible */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                onClick={onClose}
                className="fixed top-8 right-4 md:top-6 md:right-6 z-[10000] w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/10 cursor-pointer text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
                <X size={16} className="md:w-5 md:h-5" />
            </motion.button>

            {/* SCROLL CONTENT WRAPPER - py-24 ensures content is taller than viewport */}
            <div className="min-h-full w-full px-6 md:px-[5%] py-8 md:py-12">

                {/* CONTENT CARD */}
                <div className="relative z-10 w-full max-w-[1400px] mx-auto">

                    {/* HERO SECTION - ENHANCED */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-left md:text-center relative pt-0 pb-8 md:pt-10 md:pb-8 mb-0 md:mb-6"
                        style={{
                            position: 'relative',
                        }}
                    >
                        {/* Static Gradient Background - No animation for performance */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-100px',
                                left: '-30%',
                                right: '-30%',
                                bottom: '-50px',
                                background: `radial-gradient(ellipse 80% 50% at 50% 30%, ${brandColor}30 0%, transparent 70%)`,
                                pointerEvents: 'none'
                            }}
                        />

                        {/* Static Glow - No blur for performance */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-20%',
                                right: '5%',
                                width: 350,
                                height: 350,
                                borderRadius: '50%',
                                background: `radial-gradient(circle, ${brandColor}20 0%, transparent 60%)`,
                                pointerEvents: 'none'
                            }}
                        />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            {/* Category Badge with Glow */}
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="px-4 py-2 md:px-8 md:py-3 mb-4 md:mb-8 inline-block text-[10px] md:text-[12px]"
                                style={{
                                    // Padding handled by class
                                    background: `linear-gradient(135deg, ${brandColor}20 0%, rgba(255,255,255,0.05) 100%)`,
                                    border: `1px solid ${brandColor}50`,
                                    borderRadius: 50,
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                    // fontSize handled by class
                                    letterSpacing: '0.2em',
                                    color: brandColor,
                                    textTransform: 'uppercase',
                                    // Margin handled by class
                                }}
                            >
                                {translatedCategory}
                            </motion.span>

                            {/* Animated Title with Gradient */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                                style={{
                                    fontSize: 'clamp(32px, 9vw, 88px)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.04em',
                                    background: `linear-gradient(135deg, ${brandColor} 0%, #F2F2F2 50%, ${brandColor} 100%)`,
                                    backgroundSize: '200% 200%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    margin: 0,
                                    // Margin bottom handled by class
                                    animation: 'titleShine 5s ease-in-out infinite'
                                }}
                                className="mb-6 md:mb-10"
                            >
                                {translatedTitle}
                            </motion.h1>

                            {/* Description */}
                            {description && (
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    style={{
                                        fontSize: 18,
                                        lineHeight: 1.8,
                                        color: 'rgba(255,255,255,0.55)',
                                        color: 'rgba(255,255,255,0.55)',
                                        // maxWidth handled by class
                                    }}
                                    className="mx-0 md:mx-auto md:text-center block max-w-[650px] md:max-w-[1000px]"
                                >
                                    {translatedDescription}
                                </motion.p>
                            )}
                        </div>

                        {/* CSS Animation */}
                        <style>{`
                            @keyframes titleShine {
                                0%, 100% { background-position: 0% 50%; }
                                50% { background-position: 100% 50%; }
                            }
                        `}</style>
                    </motion.div>

                    {/* META SECTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 p-5 md:p-[40px] mb-8 md:mb-20 relative overflow-hidden rounded-[20px]"
                        style={{
                            background: `linear-gradient(135deg, rgba(20,20,25,0.9) 0%, rgba(20,20,25,0.95) 100%)`,
                            border: `1px solid ${brandColor}25`
                        }}
                    >
                        {/* Corner Glow */}
                        <div
                            style={{
                                position: 'absolute',
                                top: -60,
                                right: -60,
                                width: 180,
                                height: 180,
                                background: `radial-gradient(circle, ${brandColor}30 0%, transparent 70%)`,
                                pointerEvents: 'none'
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                bottom: -40,
                                left: -40,
                                width: 120,
                                height: 120,
                                background: `radial-gradient(circle, ${brandColor}15 0%, transparent 70%)`,
                                pointerEvents: 'none'
                            }}
                        />

                        <MetaItem label={t('caseStudy.client', 'Client')} value={client || translatedTitle} delay={0.6} brandColor={brandColor} />
                        <MetaItem label={t('caseStudy.services', 'Services')} value={translatedRole || 'Design'} delay={0.7} brandColor={brandColor} />
                        <MetaItem label={t('caseStudy.year', 'Year')} value={translatedYear} delay={0.8} brandColor={brandColor} />

                        {/* Toolkit */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                            style={{ position: 'relative' }}
                        >
                            <span
                                style={{
                                    display: 'block',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                    fontSize: 10,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: brandColor,
                                    marginBottom: 10,
                                    opacity: 0.9
                                }}
                            >
                                {t('caseStudy.toolkit', 'Toolkit')}
                            </span>
                            <div style={{ display: 'flex', gap: 10 }}>
                                {techStack.map((tool, idx) => (
                                    <motion.div
                                        key={tool}
                                        whileHover={{ scale: 1.15, y: -3 }}
                                        style={{
                                            width: 38,
                                            height: 38,
                                            borderRadius: 10,
                                            background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, ${brandColor}15 100%)`,
                                            border: `1px solid ${brandColor}30`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img
                                            src={toolIcons[tool]}
                                            alt={tool}
                                            style={{ width: 22, height: 22 }}
                                            onError={(e) => { e.target.style.display = 'none' }}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* GALLERY SECTION */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >


                        {/* Custom Order Gallery */}
                        {orderedImages && orderedImages.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                                {orderedImages.map((img, idx) => (
                                    <ImageCard
                                        key={img.src}
                                        src={img.src}
                                        alt={`${translatedTitle} ${idx + 1}`}
                                        index={idx}
                                        type={img.type}
                                        className={
                                            img.type === 'longPost'
                                                ? "w-full"
                                                : img.type === 'story'
                                                    ? "w-[calc(50%-8px)] md:w-[calc(25%-21px)]" // Story sizing
                                                    : "w-[calc(50%-8px)] md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]" // Post sizing
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <>
                                {/* Long Posts - Full Width */}
                                {longPostImages.length > 0 && (
                                    <div style={{ marginBottom: 48 }}>
                                        <h4
                                            style={{
                                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                                fontSize: 10,
                                                letterSpacing: '0.2em',
                                                textTransform: 'uppercase',
                                                color: 'rgba(255,255,255,0.3)',
                                                marginBottom: 24
                                            }}
                                        >
                                            {t('caseStudy.featured', 'Featured')}
                                        </h4>
                                        <div className="flex flex-col gap-8">
                                            {longPostImages.map((src, idx) => (
                                                <ImageCard
                                                    key={src}
                                                    src={src}
                                                    alt={`${translatedTitle} Long ${idx + 1}`}
                                                    index={idx}
                                                    type="longPost"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Posts Grid - 3 per row */}
                                {postItems.length > 0 && (
                                    <div style={{ marginBottom: storyItems.length > 0 ? 60 : 0 }}>
                                        <h4
                                            style={{
                                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                                fontSize: 14,
                                                fontWeight: 600,
                                                letterSpacing: '0.15em',
                                                textTransform: 'uppercase',
                                                color: 'rgba(255,255,255,0.8)',
                                                marginBottom: 24
                                            }}
                                        >
                                            {t('caseStudy.posts', 'Posts')}
                                        </h4>
                                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                                            {postItems.map((item, idx) => (
                                                item.combined ? (
                                                    <CombinedTriplePostCard
                                                        key={`${item.type}-${item.src}`}
                                                        src={item.src}
                                                        alt={`${translatedTitle} Combined Post`}
                                                        index={idx}
                                                        className="w-full"
                                                    />
                                                ) : (
                                                    <ImageCard
                                                        key={item.src}
                                                        src={item.src}
                                                        alt={`${translatedTitle} ${item.postNumber}`}
                                                        index={idx}
                                                        className="w-[calc(50%-8px)] md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
                                                    />
                                                )
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Stories Grid - 4 per row */}
                                {storyItems.length > 0 && (
                                    <div>
                                        <h4
                                            style={{
                                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                                fontSize: 14,
                                                fontWeight: 600,
                                                letterSpacing: '0.15em',
                                                textTransform: 'uppercase',
                                                color: 'rgba(255,255,255,0.8)',
                                                marginBottom: 24
                                            }}
                                        >
                                            {t('caseStudy.stories', 'Stories')}
                                        </h4>
                                        {singleStoryItems.length > 0 && (
                                            <div className="flex flex-wrap justify-center gap-4 md:gap-7">
                                                {singleStoryItems.map((item, idx) => (
                                                    <ImageCard
                                                        key={item.src}
                                                        src={item.src}
                                                        alt={`${translatedTitle} Story ${item.storyNumber}`}
                                                        index={postItems.length + idx}
                                                        className="w-[calc(50%-8px)] md:w-[calc(25%-21px)]"
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {combinedStoryItems.length > 0 && (
                                            <div className="mt-4 md:mt-7 flex flex-col gap-4 md:gap-7">
                                                {combinedStoryItems.map((item, idx) => (
                                                    <CombinedTripleStoryCard
                                                        key={`${item.type}-${item.src}`}
                                                        src={item.src}
                                                        alt={`${translatedTitle} Combined Story`}
                                                        index={postItems.length + singleStoryItems.length + idx}
                                                        className="w-full"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default function GridView({ project, isOpen, onClose }) {
    if (!isOpen || !project) return null

    return createPortal(
        <AnimatePresence>
            <GridViewContent project={project} onClose={onClose} />
        </AnimatePresence>,
        document.body
    )
}

