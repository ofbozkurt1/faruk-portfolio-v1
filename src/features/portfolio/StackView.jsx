/**
 * StackView Component
 * Displays all projects as vertical stack with metadata
 * Each project: LEFT (stacked cards) | RIGHT (title, description, tech icons)
 */

import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../../data/projects'
import { cn } from '../../utils/cn'

// Stagger animation for stack items
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.98
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1.2
        }
    }
}

export default function StackView({ onProjectClick, className }) {
    return (
        <motion.div
            className={cn(
                "flex flex-col gap-24 md:gap-32",
                className
            )}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {PROJECTS.map((project, index) => (
                <motion.div
                    key={project.id}
                    variants={itemVariants}
                >
                    <ProjectCard
                        project={project}
                        onClick={onProjectClick}
                        isReversed={index % 2 === 1}
                    />

                    {/* Divider between projects */}
                    {index < PROJECTS.length - 1 && (
                        <div className="luxury-divider mt-24 md:mt-32" />
                    )}
                </motion.div>
            ))}
        </motion.div>
    )
}
