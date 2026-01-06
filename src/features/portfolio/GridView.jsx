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

// Tool icon mapping
const toolIcons = {
    illustrator: '/gorseller/iconlar/illustrator.svg',
    photoshop: '/gorseller/iconlar/photoshop.svg',
    aftereffects: '/gorseller/iconlar/after-effects.svg',
    premiere: '/gorseller/iconlar/premiere-pro.svg',
    figma: '/gorseller/iconlar/figma.svg'
}

// Meta Item Component
function MetaItem({ label, value, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            <span
                style={{
                    display: 'block',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: 8
                }}
            >
                {label}
            </span>
            <span style={{ fontSize: 15, color: '#F2F2F2' }}>{value}</span>
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
                    border: color.code === '#FFFFFF' ? '1px solid rgba(255,255,255,0.2)' : 'none',
                    boxShadow: `0 4px 20px ${color.code}40`
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
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                gridColumn: isLong ? '1 / -1' : 'auto'
            }}
        >
            <img
                src={src}
                alt={alt}
                loading="lazy"
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
    const scrollContainerRef = useRef(null)
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

    // Smooth scroll
    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        let targetScrollTop = container.scrollTop
        let isScrolling = false

        const smoothScroll = () => {
            const diff = targetScrollTop - container.scrollTop
            if (Math.abs(diff) > 0.5) {
                container.scrollTop += diff * 0.12
                requestAnimationFrame(smoothScroll)
            } else {
                container.scrollTop = targetScrollTop
                isScrolling = false
            }
        }

        const handleWheel = (e) => {
            e.preventDefault()
            e.stopPropagation()
            targetScrollTop += e.deltaY * 1.5
            const maxScroll = container.scrollHeight - container.clientHeight
            targetScrollTop = Math.max(0, Math.min(targetScrollTop, maxScroll))
            if (!isScrolling) {
                isScrolling = true
                requestAnimationFrame(smoothScroll)
            }
        }

        container.addEventListener('wheel', handleWheel, { passive: false })
        return () => container.removeEventListener('wheel', handleWheel)
    }, [])

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: '#0a0a0a' }}>
            {/* Scrollable Container */}
            <div
                ref={scrollContainerRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {/* Close Button */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        top: 24,
                        right: 24,
                        zIndex: 100000,
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        cursor: 'pointer',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <X size={20} />
                </motion.button>

                {/* Content */}
                <div style={{ padding: '100px 5% 120px', maxWidth: 1400, margin: '0 auto' }}>

                    {/* ═══════════════ HERO SECTION ═══════════════ */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: 60 }}
                    >
                        {/* Category Badge */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                display: 'inline-block',
                                padding: '8px 20px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 50,
                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                fontSize: 11,
                                letterSpacing: '0.15em',
                                color: 'rgba(255,255,255,0.6)',
                                textTransform: 'uppercase',
                                marginBottom: 24
                            }}
                        >
                            {category}
                        </motion.span>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                fontSize: 'clamp(48px, 8vw, 80px)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: brandColor || '#F2F2F2',
                                margin: 0,
                                marginBottom: 24
                            }}
                        >
                            {title}
                        </motion.h1>

                        {/* Description */}
                        {description && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                style={{
                                    fontSize: 17,
                                    lineHeight: 1.8,
                                    color: 'rgba(255,255,255,0.5)',
                                    maxWidth: 600,
                                    margin: '0 auto'
                                }}
                            >
                                {description}
                            </motion.p>
                        )}
                    </motion.div>

                    {/* ═══════════════ META SECTION ═══════════════ */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: 32,
                            padding: '32px 0',
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            marginBottom: 80
                        }}
                    >
                        <MetaItem label={t('caseStudy.client', 'Client')} value={client || title} delay={0.5} />
                        <MetaItem label={t('caseStudy.services', 'Services')} value={role || 'Design'} delay={0.6} />
                        <MetaItem label={t('caseStudy.year', 'Year')} value={year} delay={0.7} />

                        {/* Toolkit */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <span
                                style={{
                                    display: 'block',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                    fontSize: 10,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(255,255,255,0.4)',
                                    marginBottom: 8
                                }}
                            >
                                {t('caseStudy.toolkit', 'Toolkit')}
                            </span>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {techStack.map((tool, idx) => (
                                    <motion.div
                                        key={tool}
                                        whileHover={{ scale: 1.15, y: -2 }}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 8,
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
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

                    {/* ═══════════════ VISUAL IDENTITY SECTION ═══════════════ */}
                    {identity && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            style={{ marginBottom: 80 }}
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
                                {t('caseStudy.visualIdentity', 'Visual Identity')}
                            </h3>

                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: identity.logo ? '1fr 1.5fr 1fr' : '1fr 1fr',
                                    gap: 40,
                                    padding: 40,
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: 20
                                }}
                            >
                                {/* Brand Logo */}
                                {identity.logo && (
                                    <div>
                                        <span
                                            style={{
                                                display: 'block',
                                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                                fontSize: 10,
                                                letterSpacing: '0.15em',
                                                color: 'rgba(255,255,255,0.3)',
                                                marginBottom: 24
                                            }}
                                        >
                                            {t('caseStudy.brandMark', 'Brand Mark')}
                                        </span>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            whileHover={{ scale: 1.05 }}
                                            style={{
                                                width: 160,
                                                height: 160,
                                                borderRadius: 20,
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 16
                                            }}
                                        >
                                            <img
                                                src={identity.logo}
                                                alt={`${title} Logo`}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain'
                                                }}
                                                onError={(e) => { e.target.parentElement.style.display = 'none' }}
                                            />
                                        </motion.div>
                                    </div>
                                )}

                                {/* Color Palette */}
                                <div>
                                    <span
                                        style={{
                                            display: 'block',
                                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                            fontSize: 10,
                                            letterSpacing: '0.15em',
                                            color: 'rgba(255,255,255,0.3)',
                                            marginBottom: 24
                                        }}
                                    >
                                        {t('caseStudy.colorPalette', 'Color Palette')}
                                    </span>
                                    <div style={{ display: 'flex', gap: 20 }}>
                                        {identity.colors.map((color, idx) => (
                                            <ColorSwatch key={color.code} color={color} index={idx} />
                                        ))}
                                    </div>
                                </div>

                                {/* Typography */}
                                <div>
                                    <span
                                        style={{
                                            display: 'block',
                                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                            fontSize: 10,
                                            letterSpacing: '0.15em',
                                            color: 'rgba(255,255,255,0.3)',
                                            marginBottom: 24
                                        }}
                                    >
                                        {t('caseStudy.typography', 'Typography')}
                                    </span>
                                    <TypographyDisplay
                                        fontFamily={identity.fontFamily}
                                        fontStyle={identity.fontStyle}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

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
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
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
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
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
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'center',
                                            gap: 32
                                        }}>
                                            {postImages.map((src, idx) => (
                                                <div key={src} style={{ width: 'calc(33.333% - 22px)' }}>
                                                    <ImageCard
                                                        src={src}
                                                        alt={`${title} ${idx + 1}`}
                                                        index={idx}
                                                    />
                                                </div>
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
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'center',
                                            gap: 28
                                        }}>
                                            {storyImages.map((src, idx) => (
                                                <div key={src} style={{ width: 'calc(25% - 21px)' }}>
                                                    <ImageCard
                                                        src={src}
                                                        alt={`${title} Story ${idx + 1}`}
                                                        index={postImages.length + idx}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
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
