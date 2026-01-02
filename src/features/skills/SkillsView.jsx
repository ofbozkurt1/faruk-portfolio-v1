/**
 * SkillsView Component
 * Focused display of 4 core Adobe tools with animated glowing progress bars
 * Dark luxury aesthetic
 */

import { motion } from 'framer-motion'
import {
    SiAdobeaftereffects,
    SiAdobepremierepro,
    SiAdobephotoshop,
    SiAdobeillustrator
} from 'react-icons/si'
import { cn } from '../../utils/cn'

// Core skills data - focused & curated
const coreSkills = [
    { name: "After Effects", icon: SiAdobeaftereffects, level: 95, color: "#9999FF" },
    { name: "Premiere Pro", icon: SiAdobepremierepro, level: 90, color: "#9999FF" },
    { name: "Photoshop", icon: SiAdobephotoshop, level: 85, color: "#31A8FF" },
    { name: "Illustrator", icon: SiAdobeillustrator, level: 85, color: "#FF9A00" }
]

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 25
        }
    }
}

function SkillBar({ skill, index }) {
    const IconComponent = skill.icon

    return (
        <motion.div
            variants={itemVariants}
            className="group"
        >
            <div className="flex items-center gap-4 mb-3">
                {/* Icon */}
                <div
                    className="p-2.5 rounded-lg glass-subtle"
                    style={{
                        boxShadow: `0 0 20px ${skill.color}15`
                    }}
                >
                    <IconComponent
                        size={24}
                        style={{ color: skill.color }}
                    />
                </div>

                {/* Name & Percentage */}
                <div className="flex-1 flex items-center justify-between">
                    <span className="text-offWhite font-medium">{skill.name}</span>
                    <span
                        className="meta-wide"
                        style={{ color: skill.color }}
                    >
                        {skill.level}%
                    </span>
                </div>
            </div>

            {/* Progress Bar Track */}
            <div className="h-1.5 bg-accent/30 rounded-full overflow-hidden">
                {/* Animated Fill with Glow */}
                <motion.div
                    className="h-full rounded-full relative"
                    style={{
                        background: `linear-gradient(90deg, ${skill.color}40 0%, ${skill.color} 100%)`,
                        boxShadow: `0 0 15px ${skill.color}50, 0 0 30px ${skill.color}20`
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
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
            className={cn("max-w-2xl mx-auto", className)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-12">
                <p className="meta-wide mb-3 text-dimGray">Expertise</p>
                <h2 className="text-3xl md:text-4xl font-bold heading-tight text-offWhite">
                    Core Tools
                </h2>
            </motion.div>

            {/* Skill Bars */}
            <div className="space-y-8">
                {coreSkills.map((skill, index) => (
                    <SkillBar
                        key={skill.name}
                        skill={skill}
                        index={index}
                    />
                ))}
            </div>
        </motion.div>
    )
}
