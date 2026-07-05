/**
 * GridView Component - Phase 25: Case Study Format
 * Premium project detail page with:
 * - Meta section (client, role, year, tools)
 * - Visual Identity section (color palette, typography)
 * - Enhanced image gallery with animations
 */

import { memo, useCallback, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getPostImages, getLongPostImages, getStoryImages, getProjectImagePath } from '../../utils/imagePath'
import ResponsiveImage from '../../components/ui/ResponsiveImage'
import { Footer } from '../../components/layout'
import { getAdaptiveRootMargin, useNearViewport, usePrefersReducedMotion } from '../../hooks'
import { withCloudinaryImageTransform } from '../../utils/cloudinaryImage'

function CloseIcon({ className }) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            fill="none"
            focusable="false"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}

// Tool icon mapping
const toolIcons = {
    illustrator: '/gorseller/iconlar/illustrator.svg',
    photoshop: '/gorseller/iconlar/photoshop.svg',
    aftereffects: '/gorseller/iconlar/after-effects.svg',
    premiere: '/gorseller/iconlar/premiere-pro.svg',
    figma: '/gorseller/iconlar/pen-tool.svg'
}

const NOVASTRA_POST_FILES = [
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
]
const NOVASTRA_STORY_FILES = [
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292540/str7_izypqe.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292542/str2_anlm1x.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292542/str4_owjtjn.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292543/str6_ogla4j.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292544/str5_gb2500.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292544/str3_py3e47.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292545/str1_kto9wc.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292546/str8_jkpoae.webp',
]
const NOVASTRA_TRIPLE_STORY_ASSET = 'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292550/3str_pzomcv.webp'
const GOOGLE_YORUMLAR_POST_FILES = [
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291445/pst5_lw5ydh.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291463/pst2_tetvw1.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291448/pst1_dooeaa.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291446/pst3_whxnb7.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291466/pst6_k48ue8.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291450/pst8_ugof87.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291452/pst10_ut2svt.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291458/pst9_scyqrv.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291462/pst4_fg6ppb.webp',
]
const GOOGLE_YORUMLAR_STORY_FILES = [
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291472/str2_pzgcvw.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291473/str4_r6clzs.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291476/str1_yelr1p.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291474/str3_e6ouni.webp',
]
const ADANA_NAPOLI_POST_FILES = [
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291202/pst1_hhyxbb.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291202/pst2_rynj6n.webp',
]
const ADANA_NAPOLI_STORY_FILES = [
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291227/str1_vccn4j.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291204/str2_sozwnr.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291224/str3_lau44b.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291222/str4_rpnwj5.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291222/str5_lkuofd.webp',
]
const ADANA_NAPOLI_TRIPLE_STORY_ASSET = 'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291226/pstlng1_nfj0h6.webp'
const VIVACAR_POST_FILES = [
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292574/pst2_wq83u5.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292576/pst3_rjtumk.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782292577/pst1_uhcldd.webp',
]
const HACI_HAKKI_USTA_POST_FILES = [
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291136/pst1_jzm9gt.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291138/pst2_dhecld.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291144/pst3_bd5cpg.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291146/pst4_xmptvo.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291148/pst5_qaofac.webp',
]
const HACI_HAKKI_USTA_STORY_FILES = [
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291136/str2_gxedof.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291138/str1_x9vppf.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291145/str3_h4lkxk.webp',
]
const AKDENIZ_ETKINLIK_POST_FILES = [
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
]
const LUNA_MOBILYA_POST_FILES = [
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291496/pst4_wy0ccn.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291492/pst9_wkomwa.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291505/pst7_h8iap4.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291508/pst1_wbydmx.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291508/pst5_hk5akt.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291495/pst8_lhdake.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291501/pst3_zx2bgb.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291502/pst6_mdjy0w.webp',
    'https://res.cloudinary.com/dncvyujpl/image/upload/v1782291511/pst2_uhfae2.webp',
]
const BLANK_IMAGE_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
const MODAL_DETAIL_IMAGE_TRANSFORM = {
    width: 960,
    crop: 'limit',
    quality: 'auto',
    format: 'auto',
    dpr: 'auto',
}
const MODAL_LARGE_IMAGE_TRANSFORM = {
    width: 1400,
    crop: 'limit',
    quality: 'auto',
    format: 'auto',
    dpr: 'auto',
}

function getModalImageSrc(src, isLarge = false) {
    return withCloudinaryImageTransform(
        src,
        isLarge ? MODAL_LARGE_IMAGE_TRANSFORM : MODAL_DETAIL_IMAGE_TRANSFORM
    )
}

const PROJECT_MEDIA_CONFIG = {
    novastra: {
        postFiles: NOVASTRA_POST_FILES,
        storyFiles: NOVASTRA_STORY_FILES,
        imageOrder: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        storyOrder: [
            1,
            2,
            3,
            { type: 'triple-seamless', combined: true, src: NOVASTRA_TRIPLE_STORY_ASSET },
            4,
            5,
            6,
            7,
            8,
        ],
    },
    googleyorumlar: {
        postFiles: GOOGLE_YORUMLAR_POST_FILES,
        storyFiles: GOOGLE_YORUMLAR_STORY_FILES,
        imageOrder: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        storyOrder: [1, 2, 3, 4],
    },
    adananapoli: {
        postFiles: ADANA_NAPOLI_POST_FILES,
        storyFiles: ADANA_NAPOLI_STORY_FILES,
        tripleStory: ADANA_NAPOLI_TRIPLE_STORY_ASSET,
        imageOrder: ['3pst1', 1, 2],
        storyOrder: [
            1,
            2,
            3,
            4,
            5,
            { type: 'triple-seamless', combined: true, src: ADANA_NAPOLI_TRIPLE_STORY_ASSET },
        ],
    },
    vivacar: {
        postFiles: VIVACAR_POST_FILES,
        imageOrder: [1, 2, 3],
    },
    hacıhakkıusta: {
        postFiles: HACI_HAKKI_USTA_POST_FILES,
        storyFiles: HACI_HAKKI_USTA_STORY_FILES,
        imageOrder: [1, 2, 3, 4, 5],
        storyOrder: [1, 2, 3],
    },
    akdenizetkinlik: {
        postFiles: AKDENIZ_ETKINLIK_POST_FILES,
        imageOrder: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
    'luna-mobilya': {
        postFiles: LUNA_MOBILYA_POST_FILES,
        imageOrder: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
}
// Meta Item Component - Enhanced with brand color
const MetaItem = memo(function MetaItem({ label, value, delay = 0, brandColor = '#9333EA' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            style={{ position: 'relative', cursor: 'default' }}
        >
            <span
                style={{
                    display: 'block',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: brandColor,
                    marginBottom: 10,
                    opacity: 0.9
                }}
            >
                {label}
            </span>
            <span style={{
                fontSize: 16,
                color: '#F2F2F2',
                fontWeight: 500
            }}>{value}</span>
        </motion.div>
    )
})

const DeferredResponsiveImage = memo(function DeferredResponsiveImage({
    src,
    alt,
    priority = false,
    style,
}) {
    const { ref, isNearViewport } = useNearViewport({
        rootMargin: getAdaptiveRootMargin('200px 0px', '300px 0px'),
        threshold: 0.01,
        once: true,
        initialInView: priority,
    })

    return (
        <div ref={ref} style={{ width: '100%', height: '100%' }}>
            <ResponsiveImage
                src={isNearViewport ? src : BLANK_IMAGE_SRC}
                alt={alt}
                priority={priority}
                style={style}
            />
        </div>
    )
})

// Image Card Component
const ImageCard = memo(function ImageCard({ src, alt, index, type = 'post', className }) {
    const isLong = type === 'longPost'

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            whileTap={{ y: -8 }}
            style={{
                borderRadius: 16,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                width: isLong ? '100%' : undefined, // Ensure full width for long posts
            }}
        >
            <DeferredResponsiveImage
                src={src}
                alt={alt}
                priority={index < 4}
                style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                }}
            />
        </motion.div>
    )
})

const CombinedTriplePostCard = memo(function CombinedTriplePostCard({ src, alt, index, className }) {
    const positions = ['left', 'center', 'right']
    const { ref, isNearViewport } = useNearViewport({
        rootMargin: getAdaptiveRootMargin('200px 0px', '300px 0px'),
        threshold: 0.01,
        once: true,
        initialInView: index < 2,
    })

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            style={{
                borderRadius: 16,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {positions.map((position, sliceIndex) => (
                    <div key={`${position}-${sliceIndex}`} className="relative aspect-[4/5] overflow-hidden">
                        <img
                            src={isNearViewport ? src : BLANK_IMAGE_SRC}
                            alt={`${alt} Slice ${sliceIndex + 1}`}
                            loading="lazy"
                            decoding="async"
                            fetchPriority={index < 2 ? 'high' : 'low'}
                            width={1080}
                            height={1350}
                            className={[
                                'h-full w-full object-cover',
                                position === 'left' ? 'object-left' : position === 'right' ? 'object-right' : 'object-center',
                            ].join(' ')}
                            style={{ display: 'block' }}
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    )
})

const CombinedTripleStoryCard = memo(function CombinedTripleStoryCard({ src, alt, index, className }) {
    const positions = ['left', 'center', 'right']
    const { ref, isNearViewport } = useNearViewport({
        rootMargin: getAdaptiveRootMargin('200px 0px', '300px 0px'),
        threshold: 0.01,
        once: true,
        initialInView: index < 2,
    })

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            style={{
                borderRadius: 16,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {positions.map((position, sliceIndex) => (
                    <div key={`${position}-${sliceIndex}`} className="relative aspect-[9/16] overflow-hidden">
                        <img
                            src={isNearViewport ? src : BLANK_IMAGE_SRC}
                            alt={`${alt} Slice ${sliceIndex + 1}`}
                            loading="lazy"
                            decoding="async"
                            fetchPriority={index < 2 ? 'high' : 'low'}
                            width={1080}
                            height={1920}
                            className={[
                                'h-full w-full object-cover',
                                position === 'left' ? 'object-left' : position === 'right' ? 'object-right' : 'object-center',
                            ].join(' ')}
                            style={{ display: 'block' }}
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    )
})

function GridViewContent({ project, onClose }) {
    const { t } = useTranslation()
    const prefersReducedMotion = usePrefersReducedMotion()
    // scrollContainerRef removed - using native scroll on motion.div wrapper
    const {
        id, title, category, year, description,
        postCount = 0, longPostCount = 0, storyCount = 0,
        customOrder, client, role,
        techStack = [], brandColor
    } = project

    // Dynamic Localization
    const projectKey = `projects.${id}`
    const translatedTitle = t(`${projectKey}.title`, title)
    const translatedCategory = t(`${projectKey}.category`, category)
    const translatedRole = t(`${projectKey}.role`, role)
    const translatedDescription = t(`${projectKey}.description`, description)
    const translatedYear = t(`${projectKey}.year`, year)

    const projectMedia = PROJECT_MEDIA_CONFIG[id] || null
    const imageOrder = projectMedia?.imageOrder || null
    const storyOrder = projectMedia?.storyOrder || null
    const activePostBaseUrl = projectMedia?.postBase || null
    const activeStoryBaseUrl = projectMedia?.storyBase || null
    const activePostFiles = projectMedia?.postFiles || null
    const activeStoryFiles = projectMedia?.storyFiles || null

    const longPostImages = useMemo(() => getLongPostImages(id, longPostCount), [id, longPostCount])

    const postItems = useMemo(() => {
        if (imageOrder && (activePostFiles || activePostBaseUrl)) {
            return imageOrder
                .map((entry) => {
                    if (typeof entry === 'number') {
                        const rawSrc = activePostFiles ? activePostFiles[entry - 1] : `${activePostBaseUrl}pst${entry}.webp`
                        return {
                            type: 'post',
                            combined: false,
                            postNumber: entry,
                            src: getModalImageSrc(rawSrc),
                        }
                    }

                    if (typeof entry === 'string' && entry.toLowerCase().includes('3pst')) {
                        const tripleSrc = projectMedia?.tripleStory || `${activePostBaseUrl}${entry}.webp`
                        return {
                            type: 'triple-post',
                            combined: true,
                            src: getModalImageSrc(tripleSrc, true),
                        }
                    }

                    if (entry && entry.combined && entry.type === 'triple-post' && entry.src) {
                        return {
                            type: entry.type,
                            combined: true,
                            src: getModalImageSrc(entry.src, true),
                        }
                    }

                    return null
                })
                .filter(Boolean)
        }

        return getPostImages(id, postCount).map((src, idx) => ({
            type: 'post',
            combined: false,
            postNumber: idx + 1,
            src,
        }))
    }, [activePostBaseUrl, activePostFiles, id, imageOrder, postCount, projectMedia?.tripleStory])

    const storyItems = useMemo(() => {
        if (storyOrder && (activeStoryFiles || activeStoryBaseUrl)) {
            return storyOrder
                .map((entry) => {
                    if (typeof entry === 'number') {
                        const rawSrc = activeStoryFiles ? activeStoryFiles[entry - 1] : `${activeStoryBaseUrl}str${entry}.webp`
                        return {
                            type: 'story',
                            combined: false,
                            storyNumber: entry,
                            src: getModalImageSrc(rawSrc),
                        }
                    }

                    if (entry && entry.combined && entry.type === 'triple-seamless' && entry.src) {
                        return {
                            type: entry.type,
                            combined: true,
                            src: getModalImageSrc(entry.src, true),
                        }
                    }

                    return null
                })
                .filter(Boolean)
        }

        return getStoryImages(id, storyCount).map((src, idx) => ({
            type: 'story',
            combined: false,
            storyNumber: idx + 1,
            src,
        }))
    }, [activeStoryBaseUrl, activeStoryFiles, id, storyCount, storyOrder])

    const singleStoryItems = useMemo(
        () => storyItems.filter((item) => !item.combined),
        [storyItems]
    )
    const combinedStoryItems = useMemo(
        () => storyItems.filter((item) => item.combined),
        [storyItems]
    )

    // Custom ordered images for projects with customOrder
    const orderedImages = useMemo(() => {
        if (!customOrder || projectMedia?.imageOrder || projectMedia?.storyOrder) return null

        return customOrder.map(item => {
            if (item.type === 'longPost') {
                return { src: getProjectImagePath(id, 'longPost', item.index), type: 'longPost' }
            } else if (item.type === 'post') {
                return { src: getProjectImagePath(id, 'post', item.index), type: 'post' }
            } else if (item.type === 'story') {
                return { src: getProjectImagePath(id, 'story', item.index), type: 'story' }
            }
            return null
        }).filter(Boolean)
    }, [id, customOrder, projectMedia])

    const stopLenisEventPropagation = useCallback((event) => {
        event.stopPropagation()
    }, [])

    // ESC key closes modal
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose])

    return (
        // LENIS BYPASS: data-lenis-prevent stops Lenis from hijacking scroll
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] h-[100dvh] w-screen overflow-y-scroll overflow-x-hidden bg-[#0a0a0a] overscroll-y-none pointer-events-auto"
            // STOP LENIS FROM STEALING SCROLL EVENTS
            data-lenis-prevent="true"
            onWheel={stopLenisEventPropagation}
            onTouchMove={stopLenisEventPropagation}
        >
            {/* Close Button - Fixed position, always visible */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                onClick={onClose}
                className="fixed top-8 right-4 md:top-6 md:right-6 z-[10000] w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/10 cursor-pointer text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
                <CloseIcon className="md:w-5 md:h-5" />
            </motion.button>

            {/* SCROLL CONTENT WRAPPER - py-24 ensures content is taller than viewport */}
            <div className="min-h-full w-full px-6 md:px-[5%] py-8 md:py-12">

                {/* CONTENT CARD */}
                <div className="relative z-10 w-full max-w-[1400px] mx-auto">

                    {/* HERO SECTION - ENHANCED */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-left md:text-center relative pt-0 pb-8 md:pt-10 md:pb-8 mb-0 md:mb-6"
                        style={{
                            position: 'relative',
                        }}
                    >
                        {/* Static Gradient Background - No animation for performance */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-100px',
                                left: '-30%',
                                right: '-30%',
                                bottom: '-50px',
                                background: `radial-gradient(ellipse 80% 50% at 50% 30%, ${brandColor}30 0%, transparent 70%)`,
                                pointerEvents: 'none'
                            }}
                        />

                        {/* Static Glow - No blur for performance */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-20%',
                                right: '5%',
                                width: 350,
                                height: 350,
                                borderRadius: '50%',
                                background: `radial-gradient(circle, ${brandColor}20 0%, transparent 60%)`,
                                pointerEvents: 'none'
                            }}
                        />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            {/* Category Badge with Glow */}
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="px-4 py-2 md:px-8 md:py-3 mb-4 md:mb-8 inline-block text-[10px] md:text-[12px]"
                                style={{
                                    // Padding handled by class
                                    background: `linear-gradient(135deg, ${brandColor}20 0%, rgba(255,255,255,0.05) 100%)`,
                                    border: `1px solid ${brandColor}50`,
                                    borderRadius: 50,
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                    // fontSize handled by class
                                    letterSpacing: '0.2em',
                                    color: brandColor,
                                    textTransform: 'uppercase',
                                    // Margin handled by class
                                }}
                            >
                                {translatedCategory}
                            </motion.span>

                            {/* Animated Title with Gradient */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                                style={{
                                    fontSize: 'clamp(32px, 9vw, 88px)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.04em',
                                    background: `linear-gradient(135deg, ${brandColor} 0%, #F2F2F2 50%, ${brandColor} 100%)`,
                                    backgroundSize: '200% 200%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    margin: 0,
                                    // Margin bottom handled by class
                                    animation: prefersReducedMotion ? 'none' : 'titleShine 5s ease-in-out infinite'
                                }}
                                className="mb-6 md:mb-10"
                            >
                                {translatedTitle}
                            </motion.h1>

                            {/* Description */}
                            {description && (
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    style={{
                                        fontSize: 18,
                                        lineHeight: 1.8,
                                        color: 'rgba(255,255,255,0.55)',
                                        // maxWidth handled by class
                                    }}
                                    className="mx-0 md:mx-auto md:text-center block max-w-[650px] md:max-w-[1000px]"
                                >
                                    {translatedDescription}
                                </motion.p>
                            )}
                        </div>

                        {/* CSS Animation */}
                        <style>{`
                            @keyframes titleShine {
                                0%, 100% { background-position: 0% 50%; }
                                50% { background-position: 100% 50%; }
                            }
                        `}</style>
                    </motion.div>

                    {/* META SECTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 p-5 md:p-[40px] mb-8 md:mb-20 relative overflow-hidden rounded-[20px]"
                        style={{
                            background: `linear-gradient(135deg, rgba(20,20,25,0.9) 0%, rgba(20,20,25,0.95) 100%)`,
                            border: `1px solid ${brandColor}25`
                        }}
                    >
                        {/* Corner Glow */}
                        <div
                            style={{
                                position: 'absolute',
                                top: -60,
                                right: -60,
                                width: 180,
                                height: 180,
                                background: `radial-gradient(circle, ${brandColor}30 0%, transparent 70%)`,
                                pointerEvents: 'none'
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                bottom: -40,
                                left: -40,
                                width: 120,
                                height: 120,
                                background: `radial-gradient(circle, ${brandColor}15 0%, transparent 70%)`,
                                pointerEvents: 'none'
                            }}
                        />

                        <MetaItem label={t('caseStudy.client', 'Client')} value={client || translatedTitle} delay={0.6} brandColor={brandColor} />
                        <MetaItem label={t('caseStudy.services', 'Services')} value={translatedRole || 'Design'} delay={0.7} brandColor={brandColor} />
                        <MetaItem label={t('caseStudy.year', 'Year')} value={translatedYear} delay={0.8} brandColor={brandColor} />

                        {/* Toolkit */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                            style={{ position: 'relative' }}
                        >
                            <span
                                style={{
                                    display: 'block',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                    fontSize: 10,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: brandColor,
                                    marginBottom: 10,
                                    opacity: 0.9
                                }}
                            >
                                {t('caseStudy.toolkit', 'Toolkit')}
                            </span>
                            <div style={{ display: 'flex', gap: 10 }}>
                                {techStack.map((tool) => (
                                    <motion.div
                                        key={tool}
                                        whileHover={{ scale: 1.15, y: -3 }}
                                        style={{
                                            width: 38,
                                            height: 38,
                                            borderRadius: 10,
                                            background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, ${brandColor}15 100%)`,
                                            border: `1px solid ${brandColor}30`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img
                                            src={toolIcons[tool]}
                                            alt={tool}
                                            loading="lazy"
                                            decoding="async"
                                            fetchPriority="low"
                                            style={{ width: 22, height: 22 }}
                                            onError={(e) => { e.target.style.display = 'none' }}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* GALLERY SECTION */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >


                        {/* Custom Order Gallery */}
                        {orderedImages && orderedImages.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                                {orderedImages.map((img, idx) => (
                                    <ImageCard
                                        key={img.src}
                                        src={img.src}
                                        alt={`${translatedTitle} ${idx + 1}`}
                                        index={idx}
                                        type={img.type}
                                        className={
                                            img.type === 'longPost'
                                                ? "w-full"
                                                : img.type === 'story'
                                                    ? "w-[calc(50%-8px)] md:w-[calc(25%-21px)]" // Story sizing
                                                    : "w-[calc(50%-8px)] md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]" // Post sizing
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <>
                                {/* Long Posts - Full Width */}
                                {longPostImages.length > 0 && (
                                    <div style={{ marginBottom: 48 }}>
                                        <h4
                                            style={{
                                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                                fontSize: 10,
                                                letterSpacing: '0.2em',
                                                textTransform: 'uppercase',
                                                color: 'rgba(255,255,255,0.3)',
                                                marginBottom: 24
                                            }}
                                        >
                                            {t('caseStudy.featured', 'Featured')}
                                        </h4>
                                        <div className="flex flex-col gap-8">
                                            {longPostImages.map((src, idx) => (
                                                <ImageCard
                                                    key={src}
                                                    src={src}
                                                    alt={`${translatedTitle} Long ${idx + 1}`}
                                                    index={idx}
                                                    type="longPost"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Posts Grid - 3 per row */}
                                {postItems.length > 0 && (
                                    <div style={{ marginBottom: storyItems.length > 0 ? 60 : 0 }}>
                                        <h4
                                            style={{
                                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                                fontSize: 14,
                                                fontWeight: 600,
                                                letterSpacing: '0.15em',
                                                textTransform: 'uppercase',
                                                color: 'rgba(255,255,255,0.8)',
                                                marginBottom: 24
                                            }}
                                        >
                                            {t('caseStudy.posts', 'Posts')}
                                        </h4>
                                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                                            {postItems.map((item, idx) => (
                                                item.combined ? (
                                                    <CombinedTriplePostCard
                                                        key={`${item.type}-${item.src}`}
                                                        src={item.src}
                                                        alt={`${translatedTitle} Combined Post`}
                                                        index={idx}
                                                        className="w-full"
                                                    />
                                                ) : (
                                                    <ImageCard
                                                        key={item.src}
                                                        src={item.src}
                                                        alt={`${translatedTitle} ${item.postNumber}`}
                                                        index={idx}
                                                        className="w-[calc(50%-8px)] md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
                                                    />
                                                )
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Stories Grid - 4 per row */}
                                {storyItems.length > 0 && (
                                    <div>
                                        <h4
                                            style={{
                                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                                fontSize: 14,
                                                fontWeight: 600,
                                                letterSpacing: '0.15em',
                                                textTransform: 'uppercase',
                                                color: 'rgba(255,255,255,0.8)',
                                                marginBottom: 24
                                            }}
                                        >
                                            {t('caseStudy.stories', 'Stories')}
                                        </h4>
                                        {singleStoryItems.length > 0 && (
                                            <div className="flex flex-wrap justify-center gap-4 md:gap-7">
                                                {singleStoryItems.map((item, idx) => (
                                                    <ImageCard
                                                        key={item.src}
                                                        src={item.src}
                                                        alt={`${translatedTitle} Story ${item.storyNumber}`}
                                                        index={postItems.length + idx}
                                                        className="w-[calc(50%-8px)] md:w-[calc(25%-21px)]"
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {combinedStoryItems.length > 0 && (
                                            <div className="mt-4 md:mt-7 flex flex-col gap-4 md:gap-7">
                                                {combinedStoryItems.map((item, idx) => (
                                                    <CombinedTripleStoryCard
                                                        key={`${item.type}-${item.src}`}
                                                        src={item.src}
                                                        alt={`${translatedTitle} Combined Story`}
                                                        index={postItems.length + singleStoryItems.length + idx}
                                                        className="w-full"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>
                </div>

                <Footer id={`project-contact-${id}`} compact className="mt-16 md:mt-24" />
            </div>
        </motion.div>
    )
}

export default function GridView({ project, isOpen, onClose }) {
    if (!isOpen || !project) return null

    return createPortal(
        <AnimatePresence>
            <GridViewContent project={project} onClose={onClose} />
        </AnimatePresence>,
        document.body
    )
}

