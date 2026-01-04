/**
 * StackView Component
 * Passes cardIndex to ProjectCard for alternating direction
 */

import ProjectCard from './ProjectCard'
import { PROJECTS } from '../../data/projects'
import { cn } from '../../utils/cn'

export default function StackView({ onProjectClick, className }) {
    return (
        <div className={cn("flex flex-col gap-32 md:gap-40 max-w-6xl mx-auto px-4 lg:px-0", className)}>
            {PROJECTS.map((project, index) => (
                <div key={project.id}>
                    <ProjectCard
                        project={project}
                        onClick={onProjectClick}
                        isReversed={index % 2 === 1}
                        cardIndex={index}
                    />

                    {index < PROJECTS.length - 1 && (
                        <div className="luxury-divider mt-32 md:mt-40" />
                    )}
                </div>
            ))}
        </div>
    )
}
