/**
 * Projects Data - The "No-CMS" Local Database
 * Single source of truth for all project data
 */

export const PROJECTS = [
    {
        id: "novastra",
        title: "Novastra",
        brandColor: "#9333EA",
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
        brandColor: "#4285F4",
        category: "Social Media",
        year: "2024",
        role: "Content Design",
        deliverables: "Posts, Templates",
        postCount: 14,
        longPostCount: 0,
        storyCount: 0,
        description: "Social media campaign design for Google reviews engagement. Dynamic motion graphics and eye-catching visual content optimized for multiple platforms.",
        credits: "Design & Motion: Faruk",
        techStack: ["photoshop", "illustrator"]
    },
    {
        id: "adananapoli",
        title: "Adana Napoli",
        brandColor: "#E53935",
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
        brandColor: "#C17F59",
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
    },
    {
        id: "akdenizetkinlik",
        title: "Akdeniz Etkinlik",
        brandColor: "#00BCD4",
        category: "Event Design",
        year: "2024",
        role: "Visual Design",
        deliverables: "Posts, Banners",
        postCount: 15,
        longPostCount: 2,
        storyCount: 0,
        // Custom display order for GridView: pstlng1, pst1-3, pstlng2, pst4-6, then remaining
        customOrder: [
            { type: 'longPost', index: 1 },
            { type: 'post', index: 1 },
            { type: 'post', index: 2 },
            { type: 'post', index: 3 },
            { type: 'longPost', index: 2 },
            { type: 'post', index: 4 },
            { type: 'post', index: 5 },
            { type: 'post', index: 6 },
            { type: 'post', index: 7 },
            { type: 'post', index: 8 },
            { type: 'post', index: 9 },
            { type: 'post', index: 10 },
            { type: 'post', index: 11 },
            { type: 'post', index: 12 },
            { type: 'post', index: 13 },
            { type: 'post', index: 14 },
            { type: 'post', index: 15 }
        ],
        description: "Event branding and promotional design for Akdeniz Etkinlik. Eye-catching visuals for concerts, festivals, and special events.",
        credits: "Design: Faruk",
        techStack: ["photoshop", "illustrator"]
    },
    {
        id: "tırnaktrend",
        title: "Tırnak Trend",
        brandColor: "#EC4899",
        category: "Social Media",
        year: "2024",
        role: "Social Design",
        deliverables: "Posts",
        postCount: 3,
        longPostCount: 0,
        storyCount: 0,
        description: "Social media content design for Tırnak Trend nail salon. Modern and elegant visuals for Instagram presence.",
        credits: "Design: Faruk",
        techStack: ["photoshop", "illustrator"]
    },
    {
        id: "bbstransfer",
        title: "BBS Transfer",
        brandColor: "#1E88E5",
        category: "Social Media",
        year: "2024",
        role: "Social Design",
        deliverables: "Posts",
        postCount: 2,
        longPostCount: 0,
        storyCount: 0,
        description: "Social media design for BBS Transfer transportation company. Professional and trustworthy visual identity.",
        credits: "Design: Faruk",
        techStack: ["photoshop", "illustrator"]
    },
    {
        id: "kumrualtı",
        title: "Kumrualtı",
        brandColor: "#F97316",
        category: "Social Media",
        year: "2024",
        role: "Social Design",
        deliverables: "Posts",
        postCount: 3,
        longPostCount: 0,
        storyCount: 0,
        description: "Social media content design for Kumrualtı restaurant. Appetizing food photography and engaging visual content.",
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
