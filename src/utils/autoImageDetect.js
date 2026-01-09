/**
 * Auto Image Detection Utility
 * Uses Vite's import.meta.glob to automatically detect images in project folders
 * 
 * How it works:
 * - Scans /public/gorseller/{projectId}/ folders at build time
 * - Counts pst*.webp, pstlng*.webp, str*.webp files automatically
 * - No need to manually update postCount, longPostCount, storyCount
 */

// Import all webp images from gorseller folder at build time
const allImages = import.meta.glob('/public/gorseller/**/*.webp', { eager: false })

/**
 * Parse image paths and count by project
 */
function parseImageCounts() {
    const projectCounts = {}

    Object.keys(allImages).forEach(path => {
        // Extract project ID and file name from path
        // Path format: /public/gorseller/{projectId}/{filename}.webp
        const match = path.match(/\/public\/gorseller\/([^/]+)\/([^/]+)\.webp$/)
        if (!match) return

        const [, projectId, filename] = match

        // Initialize project if not exists
        if (!projectCounts[projectId]) {
            projectCounts[projectId] = {
                postCount: 0,
                longPostCount: 0,
                storyCount: 0
            }
        }

        // Count by file type
        if (filename.startsWith('pstlng')) {
            projectCounts[projectId].longPostCount++
        } else if (filename.startsWith('pst')) {
            projectCounts[projectId].postCount++
        } else if (filename.startsWith('str')) {
            projectCounts[projectId].storyCount++
        }
    })

    return projectCounts
}

// Parse once at module load
const imageCounts = parseImageCounts()

/**
 * Get auto-detected image counts for a project
 * @param {string} projectId - The project folder name
 * @returns {Object} { postCount, longPostCount, storyCount }
 */
export function getAutoImageCounts(projectId) {
    return imageCounts[projectId] || { postCount: 0, longPostCount: 0, storyCount: 0 }
}

/**
 * Get all detected project IDs
 * @returns {string[]} Array of project IDs
 */
export function getDetectedProjects() {
    return Object.keys(imageCounts)
}

/**
 * Log all detected images (for debugging)
 */
export function logImageCounts() {
    console.log('📁 Auto-detected image counts:')
    Object.entries(imageCounts).forEach(([projectId, counts]) => {
        console.log(`  ${projectId}: posts=${counts.postCount}, longPosts=${counts.longPostCount}, stories=${counts.storyCount}`)
    })
}

export { imageCounts }
