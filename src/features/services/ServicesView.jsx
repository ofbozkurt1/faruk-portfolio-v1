/**
 * ServicesView Component - Phase 31: Kinetic Typography
 * Uses Zustand store for global state
 * Clean hover animations without floating previews
 */

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useServiceStore } from '../../stores/serviceStore'

const services = [
    {
        id: 1,
        number: '01',
        titleKey: 'services.socialMedia.title',
        descKey: 'services.socialMedia.description',
        tags: ['Instagram Grid', 'Story Sets', 'Campaigns'],
        color: '#9333EA'
    },
    {
        id: 2,
        number: '02',
        titleKey: 'services.motionDesign.title',
        descKey: 'services.motionDesign.description',
        tags: ['2D Animation', 'Logo Reveal', 'Kinetic Typo'],
        color: '#3B82F6'
    },
    {
        id: 3,
        number: '03',
        titleKey: 'services.brandIdentity.title',
        descKey: 'services.brandIdentity.description',
        tags: ['Logo Design', 'Style Guide', 'Business Cards'],
        color: '#F97316'
    },
    {
        id: 4,
        number: '04',
        titleKey: 'services.videoEditing.title',
        descKey: 'services.videoEditing.description',
        tags: ['Reels & TikTok', 'Color Grading', 'Sound Design'],
        color: '#EC4899'
    }
]

export default function ServicesView() {
    const { t } = useTranslation()
    const { activeServiceIndex, pendingServiceIndex, setActiveService, clearActiveService } = useServiceStore()

    // Use pendingServiceIndex for immediate local UI feedback
    const hoveredIndex = pendingServiceIndex

    return (
        <section className="relative py-10 md:py-24 overflow-hidden">
            {/* CSS for Kinetic Typography */}
            <style>{`
                .service-title {
                    letter-spacing: -0.03em;
                    transition: letter-spacing 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
                                color 0.3s ease,
                                text-shadow 0.3s ease;
                }
                @media (min-width: 768px) {
                    .service-title.active {
                        letter-spacing: 0.05em;
                        text-shadow: 0 0 40px currentColor;
                    }
                }
                @media (max-width: 767px) {
                    .service-title.active {
                        letter-spacing: 0em; /* Less dramatic on mobile */
                    }
                }
            `}</style>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Section Header - CENTERED */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 md:mb-16 text-center"
                >
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))' }} />
                        <h2
                            className="text-3xl md:text-5xl font-bold tracking-tight text-[#F2F2F2]"
                        >
                            {t('services.title', 'Services')}
                        </h2>
                        <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)' }} />
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
                        {t('services.subtitle', 'What I bring to the table')}
                    </p>
                </motion.div>

                {/* Services List */}
                <div className="space-y-0">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            onMouseEnter={() => setActiveService(index)}
                            onMouseLeave={clearActiveService}
                            style={{
                                borderBottom: '1px solid rgba(255,255,255,0.08)',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                        >
                            <motion.div
                                animate={{
                                    opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.3,
                                    x: hoveredIndex === index ? (window.innerWidth >= 768 ? 20 : 0) : 0
                                }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="py-6 md:py-10"
                            >
                                {/* Row Content - Grid Layout */}
                                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 lg:gap-10 items-start lg:items-center">
                                    {/* Left: Number + Title (Kinetic Typography) */}
                                    <div className="flex items-center gap-0 md:gap-5">
                                        <span
                                            className="hidden md:block" // Hidden on Mobile
                                            style={{
                                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                                fontSize: 12,
                                                color: hoveredIndex === index ? service.color : 'rgba(255,255,255,0.3)',
                                                transition: 'color 0.3s ease',
                                                minWidth: 20
                                            }}
                                        >
                                            {service.number}
                                        </span>
                                        <h3
                                            className={`service-title ${hoveredIndex === index ? 'active' : ''} whitespace-normal lg:whitespace-nowrap`}
                                            style={{
                                                fontSize: 'clamp(24px, 5vw, 48px)',
                                                fontWeight: 700,
                                                color: hoveredIndex === index ? service.color : '#F2F2F2',
                                                lineHeight: 1.1
                                            }}
                                        >
                                            {t(service.titleKey)}
                                        </h3>
                                    </div>

                                    {/* Right: Description + Tags */}
                                    <div className="w-full lg:w-[340px] flex-shrink-0">
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                            {/* Abstract Decorative Symbol - Left Column - HIDDEN ON MOBILE */}
                                            <span
                                                className="hidden md:block"
                                                style={{
                                                    fontSize: 14,
                                                    color: service.color,
                                                    opacity: 0.8,
                                                    marginTop: 3,
                                                    width: 16,
                                                    textAlign: 'center',
                                                    flexShrink: 0
                                                }}
                                            >
                                                {index === 0 && '▶'}
                                                {index === 1 && '◆'}
                                                {index === 2 && '★'}
                                                {index === 3 && '●'}
                                            </span>

                                            {/* Right Column: Text + Tags */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                                <p
                                                    style={{
                                                        color: 'rgba(255,255,255,0.5)',
                                                        fontSize: 14,
                                                        lineHeight: 1.6,
                                                        textAlign: 'left',
                                                        margin: 0
                                                    }}
                                                >
                                                    {t(service.descKey)}
                                                </p>

                                                {/* Glass Pill Tags - Aligned with text */}
                                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                    {service.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            style={{
                                                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                                                fontSize: 10,
                                                                fontWeight: 500,
                                                                letterSpacing: '0.08em',
                                                                textTransform: 'uppercase',
                                                                color: activeServiceIndex === index ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                                                                padding: '6px 12px',
                                                                background: activeServiceIndex === index ? `${service.color}15` : 'rgba(255,255,255,0.03)',
                                                                border: `1px solid ${activeServiceIndex === index ? `${service.color}50` : 'rgba(255,255,255,0.08)'}`,
                                                                borderRadius: 50,
                                                                transition: 'all 0.3s ease',
                                                                whiteSpace: 'nowrap'
                                                            }}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Indicator Line */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        position: 'absolute',
                                        bottom: -1,
                                        left: 0,
                                        width: '100%',
                                        height: 2,
                                        background: `linear-gradient(90deg, ${service.color}, transparent)`,
                                        transformOrigin: 'left'
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
