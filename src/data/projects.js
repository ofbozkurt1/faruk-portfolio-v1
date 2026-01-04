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
        role: "Visual Design",
        deliverables: "Logo, Brand Kit",
        postCount: 7,
        longPostCount: 0,
        storyCount: 11,
        description: "Premium brand identity design with a focus on minimalist luxury aesthetics. Complete visual system including logo, typography, and brand guidelines.",
        credits: "Art Direction: Faruk",
        techStack: ["illustrator", "photoshop"]
    },
    {
        id: "googleyorumlar",
        title: "Google Yorumlar",
        category: "Social Media",
        year: "2024",
        role: "Content Design",
        deliverables: "Posts, Templates",
        postCount: 11,
        longPostCount: 0,
        storyCount: 0,
        description: "Social media campaign design for Google reviews engagement. Dynamic motion graphics and eye-catching visual content optimized for multiple platforms.",
        credits: "Design & Motion: Faruk",
        techStack: ["photoshop", "illustrator"]
    },
    {
        id: "adananapoli",
        title: "Adana Napoli",
        category: "Social Media",
        year: "2024",
        role: "Social Design",
        deliverables: "Posts, Stories",
        postCount: 2,
        longPostCount: 1,
        storyCount: 5,
        stackFormat: 'story',
        description: "Social media content design for Adana Napoli restaurant. Eye-catching posts and engaging story content for Instagram presence.",
        credits: "Design: Faruk",
        techStack: ["photoshop", "illustrator"]
    },
    {
        id: "hacıhakkıusta",
        title: "Hacı Hakkı Usta",
        category: "Social Media",
        year: "2024",
        role: "Social Design",
        deliverables: "Posts, Stories",
        postCount: 2,
        longPostCount: 0,
        storyCount: 2,
        stackFormat: 'hybrid',
        description: "Traditional Turkish restaurant social media presence. Authentic food photography and engaging content design.",
        credits: "Design: Faruk",
        techStack: ["photoshop", "illustrator"]
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
