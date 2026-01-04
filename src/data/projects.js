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
        postCount: 7,       // pst1.webp - pst7.webp
        longPostCount: 0,   // No long posts
        storyCount: 11,     // str1.webp - str11.webp
        description: "Premium brand identity design with a focus on minimalist luxury aesthetics. Complete visual system including logo, typography, and brand guidelines.",
        credits: "Art Direction: Faruk",
        techStack: ["figma", "illustrator", "photoshop"]
    },
    {
        id: "googleyorumlar",
        title: "Google Yorumlar",
        category: "Social Media",
        year: "2024",
        postCount: 11,      // pst1.webp - pst11.webp
        longPostCount: 0,   // No long posts
        storyCount: 0,      // No stories
        description: "Social media campaign design for Google reviews engagement. Dynamic motion graphics and eye-catching visual content optimized for multiple platforms.",
        credits: "Design & Motion: Faruk",
        techStack: ["photoshop", "illustrator"]
    },
    {
        id: "adananapoli",
        title: "Adana Napoli",
        category: "Social Media",
        year: "2024",
        postCount: 2,       // pst1.webp - pst2.webp
        longPostCount: 1,   // pstlng1.webp (3-panel panoramic)
        storyCount: 5,      // str1.webp - str5.webp
        stackFormat: 'story', // StackView'da sadece story göster (dikey format)
        description: "Social media content design for Adana Napoli restaurant. Eye-catching posts and engaging story content for Instagram presence.",
        credits: "Design: Faruk",
        techStack: ["photoshop", "illustrator"]
    },
    {
        id: "hacıhakkıusta",
        title: "Hacı Hakkı Usta",
        category: "Social Media",
        year: "2024",
        postCount: 2,       // pst1.webp - pst2.webp
        longPostCount: 0,   // No long posts
        storyCount: 2,      // str1.webp - str2.webp
        stackFormat: 'hybrid', // Postlar 4/5, Storyler 9/16 birlikte
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
