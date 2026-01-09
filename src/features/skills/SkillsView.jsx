/**
 * SkillsView Component - Phase 35 OPTIMIZED
 * Bento Grid Layout with 3D Tilt Cards
 * React.memo for list items
 */

import React, { useState, memo, useRef } from 'react'
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

// Memoized to prevent re-renders from parent
const SkillBentoCard = memo(function SkillBentoCard({ skill }) {
    const isLarge = skill.size === 'large'
    const isTall = skill.size === 'tall'
    const [isHovered, setIsHovered] = useState(false)
    const hoverTimeoutRef = useRef(null)
    const MicroTool = MicroTools[skill.id]

    // Hover with 1 second delay
    const handleMouseEnter = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovered(true)
        }, 1000) // 1 second delay
    }

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
            hoverTimeoutRef.current = null
        }
        setIsHovered(false)
    }

    return (
        <motion.div
            variants={cardVariants}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // Remove inline gridArea, use class for desktop styling
            className={`h-full area-${skill.gridArea}`}
        >
            <TiltCard
                glowColor={skill.glowColor}
                borderColor={skill.color}
                intensity={isLarge ? 8 : 12}
                className="h-full"
            >
                <div
                    className={cn(
                        "relative h-full flex flex-col justify-between overflow-hidden",
                        "p-5 md:p-6", // Reduced desktop padding to p-6 (24px) for better alignment
                        // MOBILE: Fixed height of 160px
                        // DESKTOP: Dynamic height based on bento size (Must be h-full to fill grid cell)
                        "h-[160px] md:h-full",
                        isLarge ? "md:min-h-[280px]" : isTall ? "md:min-h-[320px]" : "md:min-h-[200px]"
                    )}
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
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Top: Icon + Micro-Tool + Years */}
                    <div className="relative z-10 flex justify-between items-start">
                        <div
                            className={cn(
                                "rounded-xl overflow-hidden",
                                "w-10 h-10 md:w-12 md:h-12 lg:w-[64px] lg:h-[64px]"
                            )}
                            style={{ transform: 'translateZ(30px)' }}
                        >
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Right Side: Micro-Tool + Years Badge */}
                        <div className="flex items-center gap-3" style={{ transform: 'translateZ(25px)' }}>
                            {/* Micro-Tool Indicator */}
                            {MicroTool && (
                                <div className={cn("hidden xs:block", isLarge ? "w-8 h-8 md:w-10 md:h-10" : "w-6 h-6 md:w-8 md:h-8")}>
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
                        className="relative z-10 flex items-end justify-between mt-auto"
                        style={{ transform: 'translateZ(25px)' }}
                    >
                        <h3
                            className={cn(
                                "font-bold tracking-tight text-[#F2F2F2] m-0",
                                // Sligtly reduced large text size for better balance
                                isLarge ? "text-2xl md:text-[26px]" : "text-lg md:text-[22px]"
                            )}
                        >
                            {skill.name}
                        </h3>

                        <span
                            className="font-mono font-semibold tracking-widest uppercase"
                            style={{
                                color: skill.color,
                                fontSize: isLarge ? (window.innerWidth < 768 ? '10px' : '12px') : '10px',
                                letterSpacing: '0.15em'
                            }}
                        >
                            {skill.level}
                        </span>
                    </div>
                </div>
            </TiltCard>
        </motion.div>
    )
})


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
            <motion.div variants={cardVariants} className="text-center mb-10 md:mb-16">
                <div className="flex items-center justify-center gap-6">
                    <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))' }} />
                    <h2
                        className="text-3xl md:text-5xl font-bold tracking-tight text-[#F2F2F2]"
                    >
                        {t('skills.title', 'Skills')}
                    </h2>
                    <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)' }} />
                </div>
            </motion.div>

            {/* Unified Responsive Bento Grid 
                MOBILE: max-w-md mx-auto prevents cards from stretching too wide on phones.
            */}
            <div className="bento-grid w-full max-w-md md:max-w-6xl mx-auto px-6 md:px-20 lg:px-0">
                {skills.map((skill) => (
                    <SkillBentoCard key={skill.id} skill={skill} />
                ))}
            </div>

            <style>{`
                .bento-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 24px;
                }
                
                @media (min-width: 768px) {
                    .bento-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 24px;
                    }
                }

                @media (min-width: 1024px) {
                    .bento-grid {
                        grid-template-columns: repeat(12, 1fr);
                        grid-template-rows: auto auto;
                        grid-template-areas: 
                            "ps ps ps ps ps ps ps ae ae ae ae ae"
                            "ai ai ai ai ai ai pr pr pr pr pr pr";
                        gap: 20px;
                    }

                    /* Grid Areas - Assigned ONLY on desktop */
                    .area-ps { grid-area: ps; }
                    .area-ae { grid-area: ae; }
                    .area-ai { grid-area: ai; }
                    .area-pr { grid-area: pr; }
                }
            `}</style>
        </motion.div>
    )
}

