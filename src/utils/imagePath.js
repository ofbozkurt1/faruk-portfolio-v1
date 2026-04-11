/**
 * Image Path Generator Utility
 * Dynamically generates image paths based on project ID
 * 
 * Naming Convention:
 * - Posts: pst1.webp, pst2.webp, ...
 * - Long Posts (3-panel): pstlng1.webp, pstlng2.webp, ...
 * - Stories: str1.webp, str2.webp, ...
 */

const CLOUD_PROJECT_ASSETS = {
    novastra: {
        postBase: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775630739/',
        storyBase: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775632273/',
    },
    googleyorumlar: {
        postBase: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775660462/%C4%B0mage/google-yorumlar/google-pst-webp/',
        storyBase: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775660428/%C4%B0mage/google-yorumlar/google-str-webp/',
    },
    adananapoli: {
        postBase: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775729245/%C4%B0mage/adana-napoli/adana-napoli-%20pst-webp/',
        storyBase: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/v1775729316/%C4%B0mage/adana-napoli/adana-napoli-%20str-webp/',
    },
    vivacar: {
        postBase: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/vivacar/vivacar-pst-webp/',
    },
    'hacıhakkıusta': {
        postBase: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/hac%C4%B1hakk%C4%B1/hac%C4%B1hakk%C4%B1-pst/',
        storyBase: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/hac%C4%B1hakk%C4%B1/hac%C4%B1hakk%C4%B1-str/',
    },
    akdenizetkinlik: {
        postBase: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/aktet/aktet-pst-webp/',
    },
    'tırnaktrend': {
        postBase: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/t%C4%B1rnaktrend/t%C4%B1rnaktrend-pst-webp/',
    },
    bbstransfer: {
        postBase: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/bbstransfer/bbstransfer-pst-webp/',
    },
    'kumrualtı': {
        postBase: 'https://res.cloudinary.com/dbr7bx7u5/image/upload/q_auto/f_auto/%C4%B0mage/kumrualt%C4%B1/kumrualt%C4%B1-pst-webp/',
    },
}
function getCloudProjectConfig(projectId) {
    return CLOUD_PROJECT_ASSETS[String(projectId).toLowerCase()] || null
}

function getCloudImagePath(projectId, type, imageNumber) {
    const config = getCloudProjectConfig(projectId)
    if (!config) return null

    const isStory = type === 'story'
    const baseUrl = isStory ? config.storyBase : config.postBase
    if (!baseUrl) return null

    return `${baseUrl}${isStory ? 'str' : 'pst'}${imageNumber}.webp`
}

/**
 * Get a single post image path
 * @param {string} projectId - The project folder name
 * @param {number} imageNumber - The image number (1-indexed)
 * @returns {string} Image path
 */
export function getPostImage(projectId, imageNumber) {
    const cloudPostPath = getCloudImagePath(projectId, 'post', imageNumber)
    if (cloudPostPath) return cloudPostPath
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
    const cloudStoryPath = getCloudImagePath(projectId, 'story', imageNumber)
    if (cloudStoryPath) return cloudStoryPath
    return `/gorseller/${projectId}/str${imageNumber}.webp`
}

/**
 * Get a single image path by type
 * @param {string} projectId - The project folder name
 * @param {string} type - 'post', 'longPost', or 'story'
 * @param {number} imageNumber - The image number (1-indexed)
 * @returns {string} Image path
 */
export function getProjectImagePath(projectId, type, imageNumber) {
    switch (type) {
        case 'longPost':
            return `/gorseller/${projectId}/pstlng${imageNumber}.webp`
        case 'story':
            return getStoryImage(projectId, imageNumber)
        case 'post':
        default:
            return getPostImage(projectId, imageNumber)
    }
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
    return Array.from({ length: postCount }, (_, index) => getPostImage(projectId, index + 1))
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
    return Array.from({ length: storyCount }, (_, index) => getStoryImage(projectId, index + 1))
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

