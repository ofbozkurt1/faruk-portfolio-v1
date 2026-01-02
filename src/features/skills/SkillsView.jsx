/**
 * SkillsView Component
 * Categorized skills with REAL Adobe brand icons
 * Using react-icons/si for Simple Icons
 */

import { motion } from 'framer-motion'
import {
    SiAdobeaftereffects,
    SiAdobepremierepro,
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiFigma,
    SiBlender,
    SiCinema4D,
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiReact,
    SiNotion
} from 'react-icons/si'
import { cn } from '../../utils/cn'

// Spring physics
const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 1.2
}

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", ...springConfig }
    }
}

// Skills data with real icons
const SKILLS_DATA = [
    {
        category: "Motion",
        tools: [
            { name: "After Effects", icon: SiAdobeaftereffects, brandColor: "#9999FF" },
            { name: "Premiere Pro", icon: SiAdobepremierepro, brandColor: "#9999FF" },
            { name: "Cinema 4D", icon: SiCinema4D, brandColor: "#011A6A" },
            { name: "Blender", icon: SiBlender, brandColor: "#F5792A" }
        ]
    },
    {
        category: "Design",
        tools: [
            { name: "Figma", icon: SiFigma, brandColor: "#F24E1E" },
            { name: "Illustrator", icon: SiAdobeillustrator, brandColor: "#FF9A00" },
            { name: "Photoshop", icon: SiAdobephotoshop, brandColor: "#31A8FF" }
        ]
    },
    {
        category: "Development",
        tools: [
            { name: "HTML", icon: SiHtml5, brandColor: "#E34F26" },
            { name: "CSS", icon: SiCss3, brandColor: "#1572B6" },
            { name: "JavaScript", icon: SiJavascript, brandColor: "#F7DF1E" },
            { name: "React", icon: SiReact, brandColor: "#61DAFB" }
        ]
    }
]

function ToolIcon({ tool }) {
    const IconComponent = tool.icon

    return (
        <motion.div
            className="group flex flex-col items-center gap-2"
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: "spring", ...springConfig }}
        >
            <div className="p-4 bg-accent/20 rounded-xl border border-accent/20 group-hover:border-accent/40 transition-all duration-300">
                <IconComponent
                    size={32}
                    className="text-dimGray group-hover:text-offWhite transition-colors duration-300"
                    style={{
                        '--brand-color': tool.brandColor
                    }}
                />
            </div>
            <span className="text-xs text-dimGray group-hover:text-offWhite transition-colors duration-300">
                {tool.name}
            </span>
        </motion.div>
    )
}

function SkillCategory({ category, tools }) {
    return (
        <motion.div
            variants={itemVariants}
            className="flex flex-col"
        >
            <h3 className="text-lg font-medium text-offWhite heading-tight mb-6">{category}</h3>
            <div className="flex flex-wrap gap-6">
                {tools.map((tool) => (
                    <ToolIcon key={tool.name} tool={tool} />
                ))}
            </div>
        </motion.div>
    )
}

export default function SkillsView({ className }) {
    return (
        <motion.div
            className={cn("", className)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-12">
                <p className="meta-wide mb-3 text-dimGray">Expertise</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold heading-tight text-offWhite">
                    Skills & Tools
                </h2>
                <p className="mt-4 text-dimGray max-w-lg text-base">
                    A blend of motion graphics, visual design, and front-end development skills.
                </p>
            </motion.div>

            {/* Skills Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                {SKILLS_DATA.map((category) => (
                    <SkillCategory
                        key={category.category}
                        category={category.category}
                        tools={category.tools}
                    />
                ))}
            </div>

            {/* Workflow Tools */}
            <motion.div
                variants={itemVariants}
                className="mt-16 pt-8 border-t border-accent/20"
            >
                <p className="meta-wide mb-6 text-dimGray">Workflow</p>
                <div className="flex flex-wrap gap-3">
                    {['Notion', 'Slack', 'Discord', 'Google Workspace', 'Trello'].map((tool) => (
                        <span
                            key={tool}
                            className="px-4 py-2 bg-accent/15 rounded-full text-sm text-dimGray hover:text-offWhite hover:bg-accent/25 transition-all duration-300"
                        >
                            {tool}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}
