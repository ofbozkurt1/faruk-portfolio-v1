/**
 * GridView Component
 * Scroll düzeltilmiş - Lenis'ten bağımsız
 * Long Posts, Posts ve Stories ayrı bölümler halinde gösteriliyor
 * customOrder desteği: Projeye özel sıralama
 */

import { useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { getPostImages, getLongPostImages, getStoryImages, getProjectImagePath } from '../../utils/imagePath'

function GridViewContent({ project, onClose }) {
    const scrollContainerRef = useRef(null)
    const { id, title, category, year, postCount = 0, longPostCount = 0, storyCount = 0, description, customOrder } = project

    const longPostImages = getLongPostImages(id, longPostCount)
    const postImages = getPostImages(id, postCount)
    const storyImages = getStoryImages(id, storyCount)

    // Custom ordered images for projects with customOrder
    const orderedImages = useMemo(() => {
        if (!customOrder) return null

        return customOrder.map(item => {
            if (item.type === 'longPost') {
                return {
                    src: getProjectImagePath(id, 'longPost', item.index),
                    type: 'longPost'
                }
            } else if (item.type === 'post') {
                return {
                    src: getProjectImagePath(id, 'post', item.index),
                    type: 'post'
                }
            } else if (item.type === 'story') {
                return {
                    src: getProjectImagePath(id, 'story', item.index),
                    type: 'story'
                }
            }
            return null
        }).filter(Boolean)
    }, [id, customOrder])

    // ESC tuşu ile kapatma
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose])

    // Smooth scroll with easing
    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        let targetScrollTop = container.scrollTop
        let isScrolling = false

        const smoothScroll = () => {
            const diff = targetScrollTop - container.scrollTop
            const ease = 0.12 // Lower = smoother (0.08-0.15 range)

            if (Math.abs(diff) > 0.5) {
                container.scrollTop += diff * ease
                requestAnimationFrame(smoothScroll)
            } else {
                container.scrollTop = targetScrollTop
                isScrolling = false
            }
        }

        const handleWheel = (e) => {
            e.preventDefault()
            e.stopPropagation()

            // Add to target scroll position
            targetScrollTop += e.deltaY * 1.5 // Multiplier for scroll speed

            // Clamp to valid scroll range
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
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                backgroundColor: '#0a0a0a'
            }}
        >
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
                <button
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                        zIndex: 100000,
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <X size={24} />
                </button>

                {/* Content */}
                <div style={{
                    padding: '80px 5% 100px',
                    maxWidth: 1400,
                    margin: '0 auto'
                }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: 50 }}>
                        <p style={{
                            color: '#888',
                            fontSize: 12,
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            marginBottom: 16
                        }}>
                            {category} — {year}
                        </p>

                        <h2 style={{
                            color: '#fff',
                            fontSize: 42,
                            fontWeight: 700,
                            margin: 0
                        }}>
                            {title}
                        </h2>

                        {description && (
                            <p style={{
                                color: '#777',
                                fontSize: 16,
                                maxWidth: 600,
                                margin: '20px auto 0',
                                lineHeight: 1.7
                            }}>
                                {description}
                            </p>
                        )}
                    </div>

                    {/* CUSTOM ORDER VIEW - For projects with specific layout */}
                    {orderedImages && orderedImages.length > 0 ? (
                        <>
                            <h3 style={{
                                color: '#888',
                                fontSize: 14,
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                marginBottom: 24,
                                paddingBottom: 12,
                                borderBottom: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                Gallery
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                {(() => {
                                    const elements = []
                                    let currentPosts = []
                                    let groupIndex = 0

                                    orderedImages.forEach((img, index) => {
                                        if (img.type === 'longPost') {
                                            // Flush any accumulated posts first
                                            if (currentPosts.length > 0) {
                                                elements.push(
                                                    <div key={`post-group-${groupIndex}`} style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                                        gap: 20
                                                    }}>
                                                        {currentPosts.map((pImg, pIdx) => (
                                                            <motion.div
                                                                key={pImg.src}
                                                                initial={{ opacity: 0, y: 30 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: pIdx * 0.05 }}
                                                                style={{
                                                                    borderRadius: 12,
                                                                    overflow: 'hidden',
                                                                    backgroundColor: '#1a1a1a'
                                                                }}
                                                            >
                                                                <img
                                                                    src={pImg.src}
                                                                    alt={`${title} Post`}
                                                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                                                />
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                )
                                                currentPosts = []
                                                groupIndex++
                                            }

                                            // Render long post full-width
                                            elements.push(
                                                <motion.div
                                                    key={img.src}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 }}
                                                    style={{
                                                        borderRadius: 12,
                                                        overflow: 'hidden',
                                                        backgroundColor: '#1a1a1a'
                                                    }}
                                                >
                                                    <img
                                                        src={img.src}
                                                        alt={`${title} Featured`}
                                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                                    />
                                                </motion.div>
                                            )
                                        } else {
                                            // Accumulate posts for grid
                                            currentPosts.push(img)
                                        }
                                    })

                                    // Flush remaining posts
                                    if (currentPosts.length > 0) {
                                        elements.push(
                                            <div key={`post-group-${groupIndex}`} style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(3, 1fr)',
                                                gap: 20
                                            }}>
                                                {currentPosts.map((pImg, pIdx) => (
                                                    <motion.div
                                                        key={pImg.src}
                                                        initial={{ opacity: 0, y: 30 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: pIdx * 0.05 }}
                                                        style={{
                                                            borderRadius: 12,
                                                            overflow: 'hidden',
                                                            backgroundColor: '#1a1a1a'
                                                        }}
                                                    >
                                                        <img
                                                            src={pImg.src}
                                                            alt={`${title} Post`}
                                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )
                                    }

                                    return elements
                                })()}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* LONG POSTS Section (3-panel panoramic) */}
                            {longPostImages.length > 0 && (
                                <>
                                    <h3 style={{
                                        color: '#888',
                                        fontSize: 14,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em',
                                        marginBottom: 24,
                                        paddingBottom: 12,
                                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        Featured Posts
                                    </h3>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 24,
                                        marginBottom: 60
                                    }}>
                                        {longPostImages.map((src, index) => (
                                            <motion.div
                                                key={src}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                style={{
                                                    borderRadius: 12,
                                                    overflow: 'hidden',
                                                    backgroundColor: '#1a1a1a'
                                                }}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`${title} Featured ${index + 1}`}
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        display: 'block'
                                                    }}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* POSTS Section */}
                            {postImages.length > 0 && (
                                <>
                                    <h3 style={{
                                        color: '#888',
                                        fontSize: 14,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em',
                                        marginBottom: 24,
                                        paddingBottom: 12,
                                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        Posts
                                    </h3>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: 20,
                                        marginBottom: 60
                                    }}>
                                        {postImages.map((src, index) => (
                                            <motion.div
                                                key={src}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                style={{
                                                    borderRadius: 12,
                                                    overflow: 'hidden',
                                                    backgroundColor: '#1a1a1a'
                                                }}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`${title} ${index + 1}`}
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        display: 'block'
                                                    }}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* STORIES Section */}
                            {storyImages.length > 0 && (
                                <>
                                    <h3 style={{
                                        color: '#888',
                                        fontSize: 14,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em',
                                        marginBottom: 24,
                                        paddingBottom: 12,
                                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        Stories
                                    </h3>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(5, 1fr)',
                                        gap: 16
                                    }}>
                                        {storyImages.map((src, index) => (
                                            <motion.div
                                                key={src}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (postImages.length + index) * 0.04 }}
                                                style={{
                                                    borderRadius: 12,
                                                    overflow: 'hidden',
                                                    backgroundColor: '#1a1a1a'
                                                }}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`${title} Story ${index + 1}`}
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        display: 'block'
                                                    }}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
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
