/**
 * SkillsView Component
 * 2x2 Grid - DAHA GENİŞ layout
 */

import { motion } from 'framer-motion'
import {
    SiAdobeaftereffects,
    SiAdobepremierepro,
    SiAdobephotoshop,
    SiAdobeillustrator
} from 'react-icons/si'
import { cn } from '../../utils/cn'

// Core skills data
const coreSkills = [
    { name: "After Effects", icon: SiAdobeaftereffects, level: 95, color: "#9999FF" },
    { name: "Premiere Pro", icon: SiAdobepremierepro, level: 90, color: "#9999FF" },
    { name: "Photoshop", icon: SiAdobephotoshop, level: 85, color: "#31A8FF" },
    { name: "Illustrator", icon: SiAdobeillustrator, level: 85, color: "#FF9A00" }
]

// Animation
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    }
}

function SkillCard({ skill, index }) {
    const IconComponent = skill.icon

    return (
        <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl"
            style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)'
            }}
        >
            <div className="flex items-center gap-4 mb-4">
                <div
                    className="p-3 rounded-lg"
                    style={{
                        backgroundColor: `${skill.color}15`,
                        boxShadow: `0 0 20px ${skill.color}10`
                    }}
                >
                    <IconComponent size={32} style={{ color: skill.color }} />
                </div>

                <div className="flex-1">
                    <span className="text-offWhite font-medium text-lg">{skill.name}</span>
                </div>

                <span
                    className="text-base font-semibold"
                    style={{ color: skill.color }}
                >
                    {skill.level}%
                </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <motion.div
                    className="h-full rounded-full"
                    style={{
                        background: `linear-gradient(90deg, ${skill.color}50 0%, ${skill.color} 100%)`,
                        boxShadow: `0 0 12px ${skill.color}40`
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{
                        type: "spring",
                        stiffness: 40,
                        damping: 15,
                        delay: index * 0.1 + 0.3
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
            <motion.div variants={itemVariants} className="text-center mb-10">
                <p className="meta-wide mb-3 text-dimGray">Expertise</p>
                <h2 className="text-3xl md:text-4xl font-bold heading-tight text-offWhite">
                    Core Tools
                </h2>
            </motion.div>

            {/* 2x2 Grid - DAHA GENİŞ: maxWidth 1100px */}
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
