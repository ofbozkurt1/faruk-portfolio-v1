/**
 * Image Path Generator Utility
 * Dynamically generates image paths based on project ID
 * 
 * Naming Convention:
 * - Posts: pst1.webp, pst2.webp, ...
 * - Long Posts (3-panel): pstlng1.webp, pstlng2.webp, ...
 * - Stories: str1.webp, str2.webp, ...
 */

import { withCloudinaryImageTransform } from './cloudinaryImage'

const PORTFOLIO_PREVIEW_IMAGE_TRANSFORM = {
    width: 640,
    crop: 'limit',
    quality: 'auto',
    format: 'auto',
    dpr: 'auto',
}

const CLOUD_PROJECT_ASSETS = {
    novastra: {
        postFiles: [
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292523/pst1_sa7lh7.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292529/pst5_lppbt6.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292524/pst2_rgvhde.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292531/pst8_thj1wc.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292525/pst4_ikgsxd.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292518/pst7_s7bpfq.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292521/pst6_wvqylo.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292520/pst10_uvjtei.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292520/pst9_rswn6e.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292523/pst11_okmcne.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292523/pst12_b1ujsw.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292525/pst3_dyviod.webp',
        ],
        storyFiles: [
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292540/str7_izypqe.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292542/str2_anlm1x.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292542/str4_owjtjn.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292543/str6_ogla4j.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292544/str5_gb2500.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292544/str3_py3e47.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292545/str1_kto9wc.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292546/str8_jkpoae.webp',
        ],
        tripleStory: 'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292550/3str_pzomcv.webp',
    },
    googleyorumlar: {
        postFiles: [
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291445/pst5_lw5ydh.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291463/pst2_tetvw1.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291448/pst1_dooeaa.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291446/pst3_whxnb7.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291466/pst6_k48ue8.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291450/pst8_ugof87.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291452/pst10_ut2svt.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291458/pst9_scyqrv.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291462/pst4_fg6ppb.webp',
        ],
        storyFiles: [
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291472/str2_pzgcvw.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291473/str4_r6clzs.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291476/str1_yelr1p.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291474/str3_e6ouni.webp',
        ],
    },
    adananapoli: {
        postFiles: [
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291202/pst1_hhyxbb.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291202/pst2_rynj6n.webp',
        ],
        storyFiles: [
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291227/str1_vccn4j.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291204/str2_sozwnr.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291224/str3_lau44b.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291222/str4_rpnwj5.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291222/str5_lkuofd.webp',
        ],
        tripleStory: 'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291226/pstlng1_nfj0h6.webp',
    },
    vivacar: {
        postFiles: [
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292574/pst2_wq83u5.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292576/pst3_rjtumk.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292577/pst1_uhcldd.webp',
        ],
    },
    hacıhakkıusta: {
        postFiles: [
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291136/pst1_jzm9gt.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291138/pst2_dhecld.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291144/pst3_bd5cpg.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291146/pst4_xmptvo.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291148/pst5_qaofac.webp',
        ],
        storyFiles: [
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291136/str2_gxedof.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291138/str1_x9vppf.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291145/str3_h4lkxk.webp',
        ],
    },
    akdenizetkinlik: {
        postFiles: [
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291371/pst1_pjwf1v.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291363/pst8_l6g4e2.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291362/pst15_bekdmp.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291375/pst10_uukrkd.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291347/pst12_bw13xf.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291348/pst4_d6mtiw.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291352/pst2_vk2lmw.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291353/pst3_jdku5i.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291355/pst14_tzomhv.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291357/pst11_bgx0yk.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291362/pst6_rn5g9b.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291362/pst13_sucwlg.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291371/pst5_ujdujt.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291375/pst7_rp8fln.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291378/pst9_r9bmre.webp',
        ],
    },
    'luna-mobilya': {
        postFiles: [
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291496/pst4_wy0ccn.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291492/pst9_wkomwa.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291505/pst7_h8iap4.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291508/pst1_wbydmx.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291508/pst5_hk5akt.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291495/pst8_lhdake.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291501/pst3_zx2bgb.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291502/pst6_mdjy0w.webp',
            'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291511/pst2_uhfae2.webp',
        ],
    },
}
function getCloudProjectConfig(projectId) {
    return CLOUD_PROJECT_ASSETS[String(projectId).toLowerCase()] || null
}

function getCloudImagePath(projectId, type, imageNumber) {
    const config = getCloudProjectConfig(projectId)
    if (!config) return null

    const exactFiles = type === 'story' ? config.storyFiles : config.postFiles
    if (Array.isArray(exactFiles)) {
        const exactSrc = exactFiles[imageNumber - 1]
        if (exactSrc) {
            return withCloudinaryImageTransform(exactSrc, PORTFOLIO_PREVIEW_IMAGE_TRANSFORM)
        }
    }

    const isStory = type === 'story'
    const baseUrl = isStory ? config.storyBase : config.postBase
    if (!baseUrl) return null

    return withCloudinaryImageTransform(
        `${baseUrl}${isStory ? 'str' : 'pst'}${imageNumber}.webp`,
        PORTFOLIO_PREVIEW_IMAGE_TRANSFORM
    )
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


