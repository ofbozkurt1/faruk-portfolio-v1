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
function ImageCard({ src, alt, index, type = 'post' }) {
    const isLong = type === 'longPost'

    return (
        <motion.div
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
                gridColumn: isLong ? '1 / -1' : 'auto'
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

function GridViewContent({ project, onClose }) {
    const { t } = useTranslation()
    // scrollContainerRef removed - using native scroll on motion.div wrapper
    const {
        id, title, category, year, description,
        postCount = 0, longPostCount = 0, storyCount = 0,
        customOrder, client, role, deliverables,
        techStack = [], identity, brandColor
    } = project

    const longPostImages = getLongPostImages(id, longPostCount)
    const postImages = getPostImages(id, postCount)
    const storyImages = getStoryImages(id, storyCount)

    // Custom ordered images for projects with customOrder
    const orderedImages = useMemo(() => {
        if (!customOrder) return null

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
    }, [id, customOrder])

    // ESC tuşu ile kapatma
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
            // 🛑 STOP LENIS FROM STEALING SCROLL EVENTS
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
                className="fixed top-6 right-6 z-[10000] w-12 h-12 rounded-full bg-white/10 border border-white/10 cursor-pointer text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
                <X size={20} />
            </motion.button>

            {/* SCROLL CONTENT WRAPPER - py-24 ensures content is taller than viewport */}
            <div className="min-h-full w-full px-[5%] py-24">

                {/* CONTENT CARD */}
                <div className="relative z-10 w-full max-w-[1400px] mx-auto">

                    {/* ═══════════════ HERO SECTION - ENHANCED ═══════════════ */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'relative',
                            padding: '40px 0 60px',
                            marginBottom: 40,
                            textAlign: 'center'
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
                                style={{
                                    display: 'inline-block',
                                    padding: '10px 24px',
                                    background: `linear-gradient(135deg, ${brandColor}20 0%, rgba(255,255,255,0.05) 100%)`,
                                    border: `1px solid ${brandColor}50`,
                                    borderRadius: 50,
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                    fontSize: 11,
                                    letterSpacing: '0.2em',
                                    color: brandColor,
                                    textTransform: 'uppercase',
                                    marginBottom: 32
                                }}
                            >
                                {category}
                            </motion.span>

                            {/* Animated Title with Gradient */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                                style={{
                                    fontSize: 'clamp(52px, 9vw, 88px)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.04em',
                                    background: `linear-gradient(135deg, ${brandColor} 0%, #F2F2F2 50%, ${brandColor} 100%)`,
                                    backgroundSize: '200% 200%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    margin: 0,
                                    marginBottom: 28,
                                    animation: 'titleShine 5s ease-in-out infinite'
                                }}
                            >
                                {title}
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
                                        maxWidth: 650,
                                        margin: '0 auto'
                                    }}
                                >
                                    {description}
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

                    {/* ═══════════════ META SECTION ═══════════════ */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 p-[30px] md:p-[40px] mb-20 relative overflow-hidden rounded-[20px]"
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

                        <MetaItem label={t('caseStudy.client', 'Client')} value={client || title} delay={0.6} brandColor={brandColor} />
                        <MetaItem label={t('caseStudy.services', 'Services')} value={role || 'Design'} delay={0.7} brandColor={brandColor} />
                        <MetaItem label={t('caseStudy.year', 'Year')} value={year} delay={0.8} brandColor={brandColor} />

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

                    {/* ═══════════════ GALLERY SECTION ═══════════════ */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h3
                            style={{
                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                fontSize: 11,
                                letterSpacing: '0.25em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.4)',
                                marginBottom: 40
                            }}
                        >
                            {t('caseStudy.gallery', 'Gallery')}
                        </h3>

                        {/* Custom Order Gallery */}
                        {orderedImages && orderedImages.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {orderedImages.map((img, idx) => (
                                    <ImageCard
                                        key={img.src}
                                        src={img.src}
                                        alt={`${title} ${idx + 1}`}
                                        index={idx}
                                        type={img.type}
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
                                                    alt={`${title} Long ${idx + 1}`}
                                                    index={idx}
                                                    type="longPost"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Posts Grid - 3 per row */}
                                {postImages.length > 0 && (
                                    <div style={{ marginBottom: storyImages.length > 0 ? 60 : 0 }}>
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
                                            {t('caseStudy.posts', 'Posts')}
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {postImages.map((src, idx) => (
                                                <ImageCard
                                                    key={src}
                                                    src={src}
                                                    alt={`${title} ${idx + 1}`}
                                                    index={idx}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Stories Grid - 4 per row */}
                                {storyImages.length > 0 && (
                                    <div>
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
                                            {t('caseStudy.stories', 'Stories')}
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
                                            {storyImages.map((src, idx) => (
                                                <ImageCard
                                                    key={src}
                                                    src={src}
                                                    alt={`${title} Story ${idx + 1}`}
                                                    index={postImages.length + idx}
                                                />
                                            ))}
                                        </div>
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
