/**
 * GridView Component
 * Scroll düzeltilmiş - Lenis'ten bağımsız
 */

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { getProjectImages } from '../../utils/imagePath'

function GridViewContent({ project, onClose }) {
    const scrollContainerRef = useRef(null)
    const { id, title, category, year, imageCount, description } = project
    const images = getProjectImages(id, imageCount)

    // ESC tuşu ile kapatma
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose])

    // Wheel event'i doğrudan yakala
    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        const handleWheel = (e) => {
            e.stopPropagation()
            container.scrollTop += e.deltaY
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

                    {/* Image Grid - 3 columns */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 20
                    }}>
                        {images.map((src, index) => (
                            <motion.div
                                key={src}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.06 }}
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
