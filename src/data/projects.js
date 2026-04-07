/**
 * Projects Data - The "No-CMS" Local Database
 * Single source of truth for all project data
 * 
 * AUTO IMAGE DETECTION:
 * - postCount, longPostCount, storyCount are now AUTO-DETECTED from files
 * - Just add images to /public/gorseller/{projectId}/ folder
 * - Files: pst1.webp, pst2.webp... (posts), pstlng1.webp... (long posts), str1.webp... (stories)
 */

import { getAutoImageCounts } from '../utils/autoImageDetect'

// Helper to merge auto-detected counts with project data
function withAutoCounts(project) {
    const autoCounts = getAutoImageCounts(project.id)
    return {
        ...project,
        // Auto-detected counts (can be overridden by explicit values)
        postCount: project.postCount ?? autoCounts.postCount,
        longPostCount: project.longPostCount ?? autoCounts.longPostCount,
        storyCount: project.storyCount ?? autoCounts.storyCount
    }
}

const PROJECT_DATA = [
    {
        id: "novastra",
        title: "Novastra",
        brandColor: "#9333EA",
        category: "Branding",
        year: "2024",
        role: "Visual Design",
        deliverables: "Logo, Brand Kit",
        // postCount, longPostCount, storyCount are now auto-detected!
        description: "Premium brand identity design with a focus on minimalist luxury aesthetics. Complete visual system including logo, typography, and brand guidelines.",
        credits: "Art Direction: Faruk",
        techStack: ["illustrator", "photoshop"],
        client: "Novastra Media",
        identity: {
            logo: '/gorseller/novastra/novastralogo.svg',
            colors: [
                { code: "#9333EA", name: "Royal Purple" },
                { code: "#1F1B24", name: "Deep Noir" },
                { code: "#F2F2F2", name: "Cloud White" },
                { code: "#C084FC", name: "Lavender" }
            ],
            fontFamily: "Montserrat",
            fontStyle: "Modern Sans Serif"
        }
    },
    {
        id: "googleyorumlar",
        title: "Google Yorumlar",
        brandColor: "#4285F4",
        category: "Social Media",
        year: "2024",
        role: "Content Design",
        deliverables: "Posts, Templates",
        // Counts auto-detected from files
        description: "Social media campaign design for Google reviews engagement. Dynamic motion graphics and eye-catching visual content optimized for multiple platforms.",
        credits: "Design & Motion: Faruk",
        techStack: ["photoshop", "illustrator"],
        client: "Çeşitli Müşteriler",
        identity: {
            colors: [
                { code: "#4285F4", name: "Google Blue" },
                { code: "#34A853", name: "Google Green" },
                { code: "#FBBC05", name: "Google Yellow" },
                { code: "#EA4335", name: "Google Red" }
            ],
            fontFamily: "Roboto",
            fontStyle: "Google Sans"
        }
    },
    {
        id: "adananapoli",
        title: "Adana Napoli",
        brandColor: "#E53935",
        category: "Social Media",
        year: "2024",
        role: "Social Design",
        deliverables: "Posts, Stories",
        stackFormat: 'story',
        // Counts auto-detected from files
        description: "Social media content design for Adana Napoli restaurant. Eye-catching posts and engaging story content for Instagram presence.",
        credits: "Design: Faruk",
        techStack: ["photoshop", "illustrator"],
        client: "Adana Napoli Restaurant",
        identity: {
            logo: '/gorseller/adananapoli/adananapolilogo.svg',
            colors: [
                { code: "#E53935", name: "Napoli Red" },
                { code: "#1A1A1A", name: "Carbon Black" },
                { code: "#FFFFFF", name: "Pure White" },
                { code: "#FFD54F", name: "Golden" }
            ],
            fontFamily: "Playfair Display",
            fontStyle: "Elegant Serif"
        }
    },
    {
        id: "v\u0131vacar",
        title: "Viva Rent A Car",
        brandColor: "#0EA5E9",
        category: "Social Media",
        year: "2024",
        role: "Social Design",
        deliverables: "Posts",
        // Counts auto-detected from files
        description: "Social media design work for Viva Rent A Car. Premium, trustworthy and conversion-focused automotive campaign visuals.",
        credits: "Design: Faruk",
        techStack: ["photoshop", "illustrator"],
        client: "Viva Rent A Car",
        identity: {
            colors: [
                { code: "#0EA5E9", name: "Sky Blue" },
                { code: "#0B1220", name: "Midnight" },
                { code: "#F2F2F2", name: "Off White" },
                { code: "#1E293B", name: "Slate" }
            ],
            fontFamily: "Inter",
            fontStyle: "Modern Sans"
        }
    },
    {
        id: "hacıhakkıusta",
        title: "Hacı Hakkı Usta",
        brandColor: "#C17F59",
        category: "Social Media",
        year: "2024",
        role: "Social Design",
        deliverables: "Posts, Stories",
        stackFormat: 'hybrid',
        // Counts auto-detected from files
        description: "Traditional Turkish restaurant social media presence. Authentic food photography and engaging content design.",
        credits: "Design: Faruk",
        techStack: ["photoshop", "illustrator"],
        client: "Hacı Hakkı Usta",
        identity: {
            logo: '/gorseller/hacıhakkıusta/hacıhakkıustalogo.svg',
            colors: [
                { code: "#C17F59", name: "Terracotta" },
                { code: "#2D1F1A", name: "Dark Wood" },
                { code: "#F5E6D3", name: "Cream" },
                { code: "#8B4513", name: "Saddle Brown" }
            ],
            fontFamily: "Lora",
            fontStyle: "Traditional Serif"
        }
    },
    {
        id: "akdenizetkinlik",
        title: "Akdeniz Etkinlik",
        brandColor: "#00BCD4",
        category: "Event Design",
        year: "2024",
        role: "Visual Design",
        deliverables: "Posts, Banners",
        // Custom display order for GridView (counts auto-detected)
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
        techStack: ["photoshop", "illustrator"],
        client: "Akdeniz Etkinlik",
        identity: {
            logo: '/gorseller/akdenizetkinlik/akdenizetkinliklogo.svg',
            colors: [
                { code: "#00BCD4", name: "Cyan" },
                { code: "#FF4081", name: "Pink Accent" },
                { code: "#1A1A2E", name: "Midnight" },
                { code: "#FFFFFF", name: "White" }
            ],
            fontFamily: "Poppins",
            fontStyle: "Modern Sans"
        }
    },
    {
        id: "tırnaktrend",
        title: "Tırnak Trend",
        brandColor: "#EC4899",
        category: "Social Media",
        year: "2024",
        role: "Social Design",
        deliverables: "Posts",
        // Counts auto-detected from files
        description: "Social media content design for Tırnak Trend nail salon. Modern and elegant visuals for Instagram presence.",
        credits: "Design: Faruk",
        techStack: ["photoshop", "illustrator"],
        client: "Tırnak Trend",
        identity: {
            colors: [
                { code: "#EC4899", name: "Hot Pink" },
                { code: "#FDF2F8", name: "Blush" },
                { code: "#1F1F1F", name: "Charcoal" },
                { code: "#F472B6", name: "Rose" }
            ],
            fontFamily: "Quicksand",
            fontStyle: "Soft Sans"
        }
    },
    {
        id: "bbstransfer",
        title: "BBS Transfer",
        brandColor: "#1E88E5",
        category: "Social Media",
        year: "2024",
        role: "Social Design",
        deliverables: "Posts",
        // Counts auto-detected from files
        description: "Social media design for BBS Transfer transportation company. Professional and trustworthy visual identity.",
        credits: "Design: Faruk",
        techStack: ["photoshop", "illustrator"],
        client: "BBS Transfer",
        identity: {
            colors: [
                { code: "#1E88E5", name: "Trust Blue" },
                { code: "#0D47A1", name: "Deep Navy" },
                { code: "#FFFFFF", name: "White" },
                { code: "#90CAF9", name: "Sky" }
            ],
            fontFamily: "Inter",
            fontStyle: "Corporate Sans"
        }
    },
    {
        id: "kumrualtı",
        title: "Kumrualtı",
        brandColor: "#F97316",
        category: "Social Media",
        year: "2024",
        role: "Social Design",
        deliverables: "Posts",
        // Counts auto-detected from files
        description: "Social media content design for Kumrualtı restaurant. Appetizing food photography and engaging visual content.",
        credits: "Design: Faruk",
        techStack: ["photoshop", "illustrator"],
        client: "Kumrualtı",
        identity: {
            colors: [
                { code: "#F97316", name: "Tangerine" },
                { code: "#7C2D12", name: "Rust" },
                { code: "#FEF3C7", name: "Cream" },
                { code: "#1C1917", name: "Dark" }
            ],
            fontFamily: "Source Sans Pro",
            fontStyle: "Clean Sans"
        }
    }
]

// Apply auto-detected image counts to all projects
export const PROJECTS = PROJECT_DATA.map(withAutoCounts)

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
