/**
 * SkillsView Component
 * Custom SVG icons from /gorseller/iconlar
 * Wider layout
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

// Skills with custom icon paths
const coreSkills = [
    {
        name: "PHOTOSHOP",
        icon: "/gorseller/iconlar/photoshop.svg",
        level: 85,
        color: "#31A8FF"
    },
    {
        name: "ILLUSTRATOR",
        icon: "/gorseller/iconlar/illustrator.svg",
        level: 85,
        color: "#FF9A00"
    },
    {
        name: "AFTER EFFECTS",
        icon: "/gorseller/iconlar/after-effects.svg",
        level: 95,
        color: "#9999FF"
    },
    {
        name: "PREMIERE PRO",
        icon: "/gorseller/iconlar/premiere-pro.svg",
        level: 90,
        color: "#9999FF"
    }
]

// Container animation
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
}

function SkillCard({ skill, index }) {
    const [isHovered, setIsHovered] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)

    return (
        <motion.div
            variants={cardVariants}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="p-6 rounded-xl"
            style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                borderColor: isHovered ? `${skill.color}30` : 'rgba(255,255,255,0.08)',
                boxShadow: isHovered ? `0 0 30px ${skill.color}15` : 'none'
            }}
        >
            <div className="flex items-center gap-5 mb-5">
                {/* Custom SVG Icon */}
                <div
                    style={{
                        width: 48,
                        height: 48,
                        filter: isHovered || hasAnimated ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.5)',
                        opacity: isHovered || hasAnimated ? 1 : 0.5,
                        transition: 'filter 0.4s ease, opacity 0.4s ease'
                    }}
                >
                    <img
                        src={skill.icon}
                        alt={skill.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>

                {/* Name & Percentage */}
                <div className="flex-1 flex items-center justify-between">
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            color: isHovered ? '#F2F2F2' : '#888',
                            transition: 'color 0.3s'
                        }}
                    >
                        {skill.name}
                    </span>
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: 15,
                            fontWeight: 600,
                            color: isHovered ? skill.color : '#555',
                            transition: 'color 0.3s'
                        }}
                    >
                        {skill.level}%
                    </span>
                </div>
            </div>

            {/* Neon Progress Bar */}
            <div
                style={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    overflow: 'hidden'
                }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1,
                        delay: index * 0.15 + 0.3,
                        ease: "easeOut"
                    }}
                    onAnimationComplete={() => setHasAnimated(true)}
                    style={{
                        height: '100%',
                        borderRadius: 4,
                        backgroundColor: skill.color,
                        boxShadow: `0 0 12px ${skill.color}, 0 0 24px ${skill.color}50`
                    }}
                />
            </div>
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
            viewport={{ once: true, margin: "-50px" }}
        >
            {/* Header */}
            <motion.div variants={cardVariants} className="text-center mb-12">
                <p
                    style={{
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#666',
                        marginBottom: 12
                    }}
                >
                    Technical Expertise
                </p>
                <h2
                    style={{
                        fontSize: 'clamp(28px, 4vw, 40px)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: '#F2F2F2'
                    }}
                >
                    Core Tools
                </h2>
            </motion.div>

            {/* 2x2 Grid - WIDER (1100px) */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 24,
                    maxWidth: 1100,
                    margin: '0 auto'
                }}
            >
                {coreSkills.map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
            </div>
        </motion.div>
    )
}
