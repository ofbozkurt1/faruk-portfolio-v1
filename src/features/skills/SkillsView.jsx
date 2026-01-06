/**
 * SkillsView Component - Phase 14
 * Bento Grid Layout with 3D Tilt Cards
 * Apple-style asymmetrical grid showing proficiency hierarchy
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import TiltCard from '../../components/ui/TiltCard'
import { cn } from '../../utils/cn'

// Skills data with hierarchy
const skills = [
    {
        id: 'photoshop',
        name: 'Photoshop',
        icon: '/gorseller/iconlar/photoshop.svg',
        level: 'MASTERY',
        years: '8+ Years',
        color: '#005AFF',
        glowColor: 'rgba(0, 90, 255, 0.35)',
        gridArea: 'ps',
        size: 'large'
    },
    {
        id: 'aftereffects',
        name: 'After Effects',
        icon: '/gorseller/iconlar/after-effects.svg',
        level: 'EXPERT',
        years: '6+ Years',
        color: '#1200FF',
        glowColor: 'rgba(18, 0, 255, 0.35)',
        gridArea: 'ae',
        size: 'tall'
    },
    {
        id: 'illustrator',
        name: 'Illustrator',
        icon: '/gorseller/iconlar/illustrator.svg',
        level: 'ADVANCED',
        years: '5+ Years',
        color: '#FF6B00',
        glowColor: 'rgba(255, 107, 0, 0.35)',
        gridArea: 'ai',
        size: 'medium'
    },
    {
        id: 'premiere',
        name: 'Premiere Pro',
        icon: '/gorseller/iconlar/premiere-pro.svg',
        level: 'PRO',
        years: '5+ Years',
        color: '#FF0080',
        glowColor: 'rgba(255, 0, 128, 0.35)',
        gridArea: 'pr',
        size: 'medium'
    }
]

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
}

// Micro-Tool SVG Indicators
const MicroTools = {
    photoshop: ({ color, isHovered }) => (
        // Stacked Layers (Compositing)
        <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.5">
            <rect x="8" y="22" width="24" height="6" rx="1"
                stroke={isHovered ? color : 'rgba(255,255,255,0.2)'}
                style={{ transition: 'stroke 0.3s' }}
            />
            <rect x="10" y="14" width="20" height="6" rx="1"
                stroke={isHovered ? color : 'rgba(255,255,255,0.15)'}
                style={{ transition: 'stroke 0.3s' }}
            />
            <rect x="12" y="6" width="16" height="6" rx="1"
                stroke={isHovered ? color : 'rgba(255,255,255,0.1)'}
                style={{ transition: 'stroke 0.3s' }}
            />
        </svg>
    ),
    aftereffects: ({ color, isHovered }) => (
        // Keyframes on Timeline (Motion)
        <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.5">
            <line x1="4" y1="20" x2="36" y2="20"
                stroke={isHovered ? color : 'rgba(255,255,255,0.15)'}
                style={{ transition: 'stroke 0.3s' }}
            />
            <rect x="6" y="14" width="8" height="8" rx="1" transform="rotate(45 10 18)"
                stroke={isHovered ? color : 'rgba(255,255,255,0.25)'}
                fill={isHovered ? `${color}30` : 'transparent'}
                style={{ transition: 'stroke 0.3s, fill 0.3s' }}
            />
            <rect x="16" y="14" width="8" height="8" rx="1" transform="rotate(45 20 18)"
                stroke={isHovered ? color : 'rgba(255,255,255,0.2)'}
                style={{ transition: 'stroke 0.3s' }}
            />
            <rect x="26" y="14" width="8" height="8" rx="1" transform="rotate(45 30 18)"
                stroke={isHovered ? color : 'rgba(255,255,255,0.25)'}
                fill={isHovered ? `${color}30` : 'transparent'}
                style={{ transition: 'stroke 0.3s, fill 0.3s' }}
            />
        </svg>
    ),
    illustrator: ({ color, isHovered }) => (
        // Bezier Curve with Handles (Vector Precision)
        <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.5">
            <path d="M6 30 Q20 6, 34 30"
                stroke={isHovered ? color : 'rgba(255,255,255,0.2)'}
                strokeLinecap="round"
                style={{ transition: 'stroke 0.3s' }}
            />
            {/* Anchor Points */}
            <circle cx="6" cy="30" r="3"
                stroke={isHovered ? color : 'rgba(255,255,255,0.3)'}
                fill={isHovered ? color : 'transparent'}
                style={{ transition: 'stroke 0.3s, fill 0.3s' }}
            />
            <circle cx="34" cy="30" r="3"
                stroke={isHovered ? color : 'rgba(255,255,255,0.3)'}
                fill={isHovered ? color : 'transparent'}
                style={{ transition: 'stroke 0.3s, fill 0.3s' }}
            />
            {/* Control Handle */}
            <line x1="6" y1="30" x2="14" y2="14"
                stroke={isHovered ? color : 'rgba(255,255,255,0.15)'}
                strokeDasharray="2 2"
                style={{ transition: 'stroke 0.3s' }}
            />
            <circle cx="14" cy="14" r="2"
                stroke={isHovered ? color : 'rgba(255,255,255,0.2)'}
                style={{ transition: 'stroke 0.3s' }}
            />
        </svg>
    ),
    premiere: ({ color, isHovered }) => (
        // Timeline with Razor/Playhead (Editing)
        <svg viewBox="0 0 40 40" fill="none" strokeWidth="1.5">
            {/* Timeline Tracks */}
            <rect x="4" y="10" width="14" height="5" rx="1"
                stroke={isHovered ? color : 'rgba(255,255,255,0.2)'}
                fill={isHovered ? `${color}20` : 'transparent'}
                style={{ transition: 'stroke 0.3s, fill 0.3s' }}
            />
            <rect x="22" y="10" width="14" height="5" rx="1"
                stroke={isHovered ? color : 'rgba(255,255,255,0.15)'}
                style={{ transition: 'stroke 0.3s' }}
            />
            <rect x="4" y="18" width="20" height="5" rx="1"
                stroke={isHovered ? color : 'rgba(255,255,255,0.15)'}
                style={{ transition: 'stroke 0.3s' }}
            />
            <rect x="10" y="26" width="26" height="5" rx="1"
                stroke={isHovered ? color : 'rgba(255,255,255,0.2)'}
                fill={isHovered ? `${color}20` : 'transparent'}
                style={{ transition: 'stroke 0.3s, fill 0.3s' }}
            />
            {/* Playhead */}
            <line x1="20" y1="6" x2="20" y2="34"
                stroke={isHovered ? color : 'rgba(255,255,255,0.3)'}
                strokeWidth="2"
                style={{ transition: 'stroke 0.3s' }}
            />
            <polygon points="20,4 17,8 23,8"
                fill={isHovered ? color : 'rgba(255,255,255,0.3)'}
                style={{ transition: 'fill 0.3s' }}
            />
        </svg>
    )
}

function SkillBentoCard({ skill }) {
    const isLarge = skill.size === 'large'
    const isTall = skill.size === 'tall'
    const [isHovered, setIsHovered] = useState(false)
    const MicroTool = MicroTools[skill.id]

    return (
        <motion.div
            variants={cardVariants}
            style={{ gridArea: skill.gridArea }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <TiltCard
                glowColor={skill.glowColor}
                borderColor={skill.color}
                intensity={isLarge ? 8 : 12}
                className="h-full"
            >
                <div
                    className="relative h-full p-6 md:p-8 flex flex-col justify-between overflow-hidden"
                    style={{ minHeight: isLarge ? 280 : isTall ? 320 : 200 }}
                >
                    {/* Giant Watermark - Tool's Own Logo */}
                    <div
                        className="absolute pointer-events-none z-0"
                        style={{
                            right: isLarge ? -40 : -30,
                            bottom: isLarge ? -40 : -30,
                            width: isLarge ? 240 : 180,
                            height: isLarge ? 240 : 180,
                            opacity: 0.03,
                            transform: 'rotate(-12deg)',
                            filter: 'blur(1px)'
                        }}
                    >
                        <img
                            src={skill.icon}
                            alt=""
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                            }}
                        />
                    </div>

                    {/* Top: Icon + Micro-Tool + Years */}
                    <div className="relative z-10 flex justify-between items-start">
                        <div
                            style={{
                                width: isLarge ? 64 : 48,
                                height: isLarge ? 64 : 48,
                                borderRadius: 12,
                                overflow: 'hidden',
                                transform: 'translateZ(30px)'
                            }}
                        >
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>

                        {/* Right Side: Micro-Tool + Years Badge */}
                        <div className="flex items-center gap-3" style={{ transform: 'translateZ(25px)' }}>
                            {/* Micro-Tool Indicator */}
                            {MicroTool && (
                                <div style={{ width: isLarge ? 40 : 32, height: isLarge ? 40 : 32 }}>
                                    <MicroTool color={skill.color} isHovered={isHovered} />
                                </div>
                            )}

                            {/* Years Badge */}
                            <span
                                style={{
                                    fontSize: 11,
                                    fontWeight: 500,
                                    letterSpacing: '0.05em',
                                    color: 'rgba(255,255,255,0.4)',
                                    padding: '4px 10px',
                                    borderRadius: 20,
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)'
                                }}
                            >
                                {skill.years}
                            </span>
                        </div>
                    </div>

                    {/* Bottom: Name & Level */}
                    <div
                        className="relative z-10 flex items-end justify-between"
                        style={{ transform: 'translateZ(25px)' }}
                    >
                        <h3
                            style={{
                                fontSize: isLarge ? 28 : 22,
                                fontWeight: 700,
                                letterSpacing: '-0.02em',
                                color: '#F2F2F2',
                                margin: 0
                            }}
                        >
                            {skill.name}
                        </h3>

                        <span
                            style={{
                                fontFamily: 'monospace',
                                fontSize: isLarge ? 12 : 10,
                                fontWeight: 600,
                                letterSpacing: '0.15em',
                                color: skill.color,
                                textTransform: 'uppercase'
                            }}
                        >
                            {skill.level}
                        </span>
                    </div>
                </div>
            </TiltCard>
        </motion.div>
    )
}


export default function SkillsView({ className }) {
    const { t } = useTranslation()

    return (
        <motion.div
            className={cn("w-full", className)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Header - Clean Single Line */}
            <motion.div variants={cardVariants} className="text-center mb-16">
                <div className="flex items-center justify-center gap-6">
                    <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))' }} />
                    <h2
                        style={{
                            fontSize: 'clamp(28px, 4vw, 42px)',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            color: '#F2F2F2'
                        }}
                    >
                        {t('skills.title', 'Skills')}
                    </h2>
                    <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)' }} />
                </div>
            </motion.div>

            {/* Bento Grid - 12 Column Desktop */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gridTemplateRows: 'auto auto',
                    gridTemplateAreas: `
                        "ps ps ps ps ps ps ps ae ae ae ae ae"
                        "ai ai ai ai ai ai pr pr pr pr pr pr"
                    `,
                    gap: 20,
                    maxWidth: 1200,
                    margin: '0 auto'
                }}
                className="hidden md:grid"
            >
                {skills.map((skill) => (
                    <SkillBentoCard key={skill.id} skill={skill} />
                ))}
            </div>

            {/* Mobile: Stacked */}
            <div
                className="md:hidden flex flex-col gap-4"
                style={{ maxWidth: 500, margin: '0 auto' }}
            >
                {skills.map((skill) => (
                    <motion.div key={skill.id} variants={cardVariants}>
                        <TiltCard
                            glowColor={skill.glowColor}
                            intensity={10}
                        >
                            <div className="p-5 flex items-center gap-4">
                                <div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 10,
                                        overflow: 'hidden',
                                        flexShrink: 0
                                    }}
                                >
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 700,
                                            color: '#F2F2F2',
                                            margin: 0,
                                            marginBottom: 4
                                        }}
                                    >
                                        {skill.name}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <span
                                            style={{
                                                fontFamily: 'monospace',
                                                fontSize: 10,
                                                fontWeight: 600,
                                                letterSpacing: '0.1em',
                                                color: skill.color
                                            }}
                                        >
                                            {skill.level}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 10,
                                                color: 'rgba(255,255,255,0.4)'
                                            }}
                                        >
                                            {skill.years}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
