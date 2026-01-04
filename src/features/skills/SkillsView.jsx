/**
 * SkillsView Component - Phase 14
 * Bento Grid Layout with 3D Tilt Cards
 * Apple-style asymmetrical grid showing proficiency hierarchy
 */

import { motion } from 'framer-motion'
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

function SkillBentoCard({ skill }) {
    const isLarge = skill.size === 'large'
    const isTall = skill.size === 'tall'

    return (
        <motion.div
            variants={cardVariants}
            style={{ gridArea: skill.gridArea }}
        >
            <TiltCard
                glowColor={skill.glowColor}
                intensity={isLarge ? 8 : 12}
                className="h-full"
            >
                <div
                    className="relative h-full p-6 md:p-8 flex flex-col justify-between"
                    style={{ minHeight: isLarge ? 280 : isTall ? 320 : 200 }}
                >
                    {/* Background Decoration - Faded Icon */}
                    <div
                        style={{
                            position: 'absolute',
                            right: isLarge ? -20 : -10,
                            bottom: isLarge ? -20 : -10,
                            width: isLarge ? '60%' : '50%',
                            height: isLarge ? '80%' : '70%',
                            opacity: 0.05,
                            pointerEvents: 'none'
                        }}
                    >
                        <img
                            src={skill.icon}
                            alt=""
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                filter: 'blur(1px)'
                            }}
                        />
                    </div>

                    {/* Top: Icon */}
                    <div className="flex justify-between items-start">
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
                                border: '1px solid rgba(255,255,255,0.08)',
                                transform: 'translateZ(25px)'
                            }}
                        >
                            {skill.years}
                        </span>
                    </div>

                    {/* Bottom: Name & Level */}
                    <div
                        className="flex items-end justify-between"
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
    return (
        <motion.div
            className={cn("w-full", className)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Header */}
            <motion.div variants={cardVariants} className="text-center mb-12">
                <p
                    style={{
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#666',
                        marginBottom: 12
                    }}
                >
                    Technical Expertise
                </p>
                <h2
                    style={{
                        fontSize: 'clamp(28px, 4vw, 42px)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: '#F2F2F2'
                    }}
                >
                    Skills
                </h2>
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
