/**
 * ServicesView Component - Phase 20 Optimized
 * Uses Zustand store for global state
 * No local AnimatePresence for backgrounds (moved to App level)
 */

import { motion } from 'framer-motion'
import { useServiceStore } from '../../stores/serviceStore'

const services = [
    {
        id: 1,
        number: '01',
        title: 'Motion Graphics',
        description: 'Bringing static visuals to life with fluid dynamics and storytelling.',
        tags: ['Commercials', 'Explainers', 'Social Media'],
        color: '#9333EA'
    },
    {
        id: 2,
        number: '02',
        title: 'Brand Identity',
        description: 'Building memorable visual systems that stand the test of time.',
        tags: ['Logo Design', 'Typography', 'Guidelines'],
        color: '#3B82F6'
    },
    {
        id: 3,
        number: '03',
        title: 'UI/UX Animation',
        description: 'Enhancing user experience through micro-interactions and smooth transitions.',
        tags: ['App Prototypes', 'Web Interaction', 'Lottie'],
        color: '#EC4899'
    },
    {
        id: 4,
        number: '04',
        title: 'Video Editing',
        description: 'Crafting rhythmic narratives from raw footage to final master.',
        tags: ['Color Grading', 'Sound Design', 'Post-Production'],
        color: '#F97316'
    }
]

export default function ServicesView() {
    const { activeServiceIndex, setActiveService, clearActiveService } = useServiceStore()

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Section Header - CENTERED */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))' }} />
                        <h2
                            style={{
                                fontSize: 'clamp(28px, 4vw, 42px)',
                                fontWeight: 700,
                                letterSpacing: '-0.02em',
                                color: '#F2F2F2'
                            }}
                        >
                            Services
                        </h2>
                        <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)' }} />
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
                        What I bring to the table
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
                                    opacity: activeServiceIndex === null || activeServiceIndex === index ? 1 : 0.3,
                                    x: activeServiceIndex === index ? 20 : 0
                                }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="py-8 md:py-10"
                            >
                                {/* Row Content - Grid Layout */}
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr auto',
                                        alignItems: 'center',
                                        gap: 40
                                    }}>
                                    {/* Left: Number + Title */}
                                    <div className="flex items-center gap-5">
                                        <span
                                            style={{
                                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                                fontSize: 12,
                                                color: activeServiceIndex === index ? service.color : 'rgba(255,255,255,0.3)',
                                                transition: 'color 0.3s ease',
                                                minWidth: 20
                                            }}
                                        >
                                            {service.number}
                                        </span>
                                        <h3
                                            style={{
                                                fontSize: 'clamp(28px, 4vw, 48px)',
                                                fontWeight: 700,
                                                letterSpacing: '-0.03em',
                                                color: activeServiceIndex === index ? service.color : '#F2F2F2',
                                                transition: 'color 0.3s ease',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Right: Decorative Icon + Description + Tags */}
                                    <div style={{ width: 340, flexShrink: 0 }}>
                                        {/* Description with decorative symbol */}
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                                            {/* Abstract Decorative Symbol */}
                                            <span
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
                                            <p
                                                style={{
                                                    color: 'rgba(255,255,255,0.5)',
                                                    fontSize: 13,
                                                    lineHeight: 1.6,
                                                    textAlign: 'left'
                                                }}
                                            >
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Glass Pill Tags - Horizontal Row */}
                                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
                                            {service.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    style={{
                                                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                                        fontSize: 9,
                                                        fontWeight: 500,
                                                        letterSpacing: '0.08em',
                                                        textTransform: 'uppercase',
                                                        color: activeServiceIndex === index ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                                                        padding: '5px 10px',
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

                                {/* Hover Indicator Line */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: activeServiceIndex === index ? 1 : 0 }}
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
