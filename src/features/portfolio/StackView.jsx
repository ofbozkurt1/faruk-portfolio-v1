/**
 * StackView Component
 * GPU-OPTIMIZED vertical list with proper layer hints
 */

import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../../data/projects'
import { cn } from '../../utils/cn'

// Optimized stagger animation
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.05
        }
    }
}

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 25,
            mass: 1
        }
    }
}

export default function StackView({ onProjectClick, className }) {
    return (
        <motion.div
            className={cn(
                "flex flex-col gap-24 md:gap-32",
                "gpu-layer", // GPU acceleration
                className
            )}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ willChange: 'transform' }}
        >
            {PROJECTS.map((project, index) => (
                <motion.div
                    key={project.id}
                    variants={itemVariants}
                    style={{ willChange: 'transform, opacity' }}
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
