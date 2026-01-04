/**
 * Image Path Generator Utility
 * Dynamically generates image paths based on project ID and count
 */

/**
 * Generate an array of image paths for a project
 * @param {string} projectId - The project folder name (e.g., "novastra")
 * @param {number} count - Number of images to generate paths for
 * @returns {string[]} Array of image paths
 * 
 * @example
 * getProjectImages("novastra", 6)
 * // Returns: ["/gorseller/novastra/1.webp", "/gorseller/novastra/2.webp", ...]
 */
export function getProjectImages(projectId, count) {
    return Array.from({ length: count }, (_, index) =>
        `/gorseller/${projectId}/${index + 1}.webp`
    )
}

/**
 * Get a single image path for a project
 * @param {string} projectId - The project folder name
 * @param {number} imageNumber - The image number (1-indexed)
 * @returns {string} Image path
 */
export function getProjectImage(projectId, imageNumber) {
    return `/gorseller/${projectId}/${imageNumber}.webp`
}

/**
 * Get the cover image (first image) for a project
 * @param {string} projectId - The project folder name
 * @returns {string} Cover image path
 */
export function getProjectCover(projectId) {
    return getProjectImage(projectId, 1)
}

/**
 * Get stack preview images (first 5 images) for a project
 * @param {string} projectId - The project folder name
 * @returns {string[]} Array of 5 image paths
 */
export function getStackImages(projectId) {
    return [
        getProjectImage(projectId, 1),
        getProjectImage(projectId, 2),
        getProjectImage(projectId, 3),
        getProjectImage(projectId, 4),
        getProjectImage(projectId, 5)
    ]
}

/**
 * Get post images for a project
 * @param {string} projectId - The project folder name
 * @param {Object} postsRange - { start: number, end: number }
 * @returns {string[]} Array of post image paths
 */
export function getPostImages(projectId, postsRange) {
    if (!postsRange) return []
    const { start, end } = postsRange
    return Array.from({ length: end - start + 1 }, (_, index) =>
        `/gorseller/${projectId}/${start + index}.webp`
    )
}

/**
 * Get story images for a project
 * @param {string} projectId - The project folder name
 * @param {Object} storiesRange - { start: number, end: number }
 * @returns {string[]} Array of story image paths
 */
export function getStoryImages(projectId, storiesRange) {
    if (!storiesRange) return []
    const { start, end } = storiesRange
    return Array.from({ length: end - start + 1 }, (_, index) =>
        `/gorseller/${projectId}/${start + index}.webp`
    )
}
