/**
 * Projects Data - The "No-CMS" Local Database
 * Single source of truth for all project data
 */

export const PROJECTS = [
    {
        id: "novastra",
        title: "Novastra",
        category: "Branding",
        year: "2024",
        imageCount: 18,
        posts: { start: 1, end: 7 },      // Posts: 1.webp - 7.webp
        stories: { start: 8, end: 18 },   // Stories: 8.webp - 18.webp
        description: "Premium brand identity design with a focus on minimalist luxury aesthetics. Complete visual system including logo, typography, and brand guidelines.",
        credits: "Art Direction: Faruk",
        techStack: ["figma", "illustrator", "photoshop"]
    },
    {
        id: "googleyorumlar",
        title: "Google Yorumlar",
        category: "Social Media",
        year: "2024",
        imageCount: 11,
        description: "Social media campaign design for Google reviews engagement. Dynamic motion graphics and eye-catching visual content optimized for multiple platforms.",
        credits: "Design & Motion: Faruk",
        techStack: ["aftereffects", "premiere", "figma"]
    }
]

/**
 * Get a single project by ID
 * @param {string} id - Project ID
 * @returns {Object|undefined} Project data or undefined if not found
 */
export function getProjectById(id) {
    return PROJECTS.find(project => project.id === id)
}

/**
 * Tech stack icon mapping
 */
export const TECH_ICONS = {
    figma: "Figma",
    illustrator: "PenTool",
    photoshop: "Image",
    aftereffects: "Video",
    premiere: "Film",
    code: "Code",
    react: "Code"
}
