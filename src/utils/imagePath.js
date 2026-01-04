/**
 * Image Path Generator Utility
 * Dynamically generates image paths based on project ID
 * 
 * Naming Convention:
 * - Posts: pst1.webp, pst2.webp, ...
 * - Long Posts (3-panel): pstlng1.webp, pstlng2.webp, ...
 * - Stories: str1.webp, str2.webp, ...
 */

/**
 * Get a single post image path
 * @param {string} projectId - The project folder name
 * @param {number} imageNumber - The image number (1-indexed)
 * @returns {string} Image path
 */
export function getPostImage(projectId, imageNumber) {
    return `/gorseller/${projectId}/pst${imageNumber}.webp`
}

/**
 * Get a single long post image path (3-panel posts)
 * @param {string} projectId - The project folder name
 * @param {number} imageNumber - The image number (1-indexed)
 * @returns {string} Image path
 */
export function getLongPostImage(projectId, imageNumber) {
    return `/gorseller/${projectId}/pstlng${imageNumber}.webp`
}

/**
 * Get a single story image path
 * @param {string} projectId - The project folder name
 * @param {number} imageNumber - The image number (1-indexed)
 * @returns {string} Image path
 */
export function getStoryImage(projectId, imageNumber) {
    return `/gorseller/${projectId}/str${imageNumber}.webp`
}

/**
 * Get the cover image (first post) for a project
 * @param {string} projectId - The project folder name
 * @returns {string} Cover image path
 */
export function getProjectCover(projectId) {
    return getPostImage(projectId, 1)
}

/**
 * Get stack preview images for a project
 * Uses posts first, then fills with stories if needed (max 5 images)
 * @param {string} projectId - The project folder name
 * @param {number} postCount - Number of posts available
 * @param {number} storyCount - Number of stories available (optional)
 * @param {string} stackFormat - 'post' (default), 'story' (only stories), or 'hybrid'
 * @returns {Array} Array of {src, type} objects
 */
export function getStackImages(projectId, postCount = 5, storyCount = 0, stackFormat = 'post') {
    const images = []
    const maxImages = 5

    // If stackFormat is 'story', only use stories
    if (stackFormat === 'story') {
        const storiesToAdd = Math.min(storyCount, maxImages)
        for (let i = 1; i <= storiesToAdd; i++) {
            images.push({ src: getStoryImage(projectId, i), type: 'story' })
        }
        return images
    }

    // Default & Hybrid: First add posts
    const postsToAdd = Math.min(postCount, maxImages)
    for (let i = 1; i <= postsToAdd; i++) {
        images.push({ src: getPostImage(projectId, i), type: 'post' })
    }

    // If we need more (or hybrid), add stories
    if (images.length < maxImages && storyCount > 0) {
        const storiesToAdd = Math.min(storyCount, maxImages - images.length)
        for (let i = 1; i <= storiesToAdd; i++) {
            images.push({ src: getStoryImage(projectId, i), type: 'story' })
        }
    }

    return images
}

/**
 * Get all post images for a project
 * @param {string} projectId - The project folder name
 * @param {number} postCount - Number of posts
 * @returns {string[]} Array of post image paths
 */
export function getPostImages(projectId, postCount) {
    if (!postCount || postCount <= 0) return []
    return Array.from({ length: postCount }, (_, index) =>
        `/gorseller/${projectId}/pst${index + 1}.webp`
    )
}

/**
 * Get all long post images for a project (3-panel panoramic posts)
 * @param {string} projectId - The project folder name
 * @param {number} longPostCount - Number of long posts
 * @returns {string[]} Array of long post image paths
 */
export function getLongPostImages(projectId, longPostCount) {
    if (!longPostCount || longPostCount <= 0) return []
    return Array.from({ length: longPostCount }, (_, index) =>
        `/gorseller/${projectId}/pstlng${index + 1}.webp`
    )
}

/**
 * Get all story images for a project
 * @param {string} projectId - The project folder name
 * @param {number} storyCount - Number of stories
 * @returns {string[]} Array of story image paths
 */
export function getStoryImages(projectId, storyCount) {
    if (!storyCount || storyCount <= 0) return []
    return Array.from({ length: storyCount }, (_, index) =>
        `/gorseller/${projectId}/str${index + 1}.webp`
    )
}

/**
 * Get all project images categorized
 * @param {string} projectId - The project folder name
 * @param {number} postCount - Number of posts
 * @param {number} longPostCount - Number of long posts
 * @param {number} storyCount - Number of stories
 * @returns {Object} { posts: string[], longPosts: string[], stories: string[] }
 */
export function getAllProjectImages(projectId, postCount, longPostCount, storyCount) {
    return {
        longPosts: getLongPostImages(projectId, longPostCount),
        posts: getPostImages(projectId, postCount),
        stories: getStoryImages(projectId, storyCount)
    }
}
