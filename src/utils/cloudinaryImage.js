const CLOUDINARY_IMAGE_UPLOAD_PREFIX = 'https://res.cloudinary.com/'
const IMAGE_UPLOAD_MARKER = '/image/upload/'
const VERSION_SEGMENT_PATTERN = /^v\d+$/
const TRANSFORM_TOKEN_PATTERN = /^[a-z]+_[^/]+$/i

function splitPathAndTail(value) {
    const separatorIndex = value.search(/[?#]/)

    if (separatorIndex === -1) {
        return [value, '']
    }

    return [value.slice(0, separatorIndex), value.slice(separatorIndex)]
}

function isTransformSegment(segment) {
    if (!segment || VERSION_SEGMENT_PATTERN.test(segment) || segment.includes('.')) {
        return false
    }

    return segment.split(',').every((token) => TRANSFORM_TOKEN_PATTERN.test(token))
}

function hasTransformToken(segments, prefix) {
    return segments
        .flatMap((segment) => segment.split(','))
        .some((token) => token.startsWith(prefix))
}

export function withCloudinaryImageTransform(src, {
    width,
    height,
    crop,
    quality = 'auto',
    format = 'auto',
    dpr,
} = {}) {
    if (!src || typeof src !== 'string') return src
    if (!src.startsWith(CLOUDINARY_IMAGE_UPLOAD_PREFIX)) return src
    if (!src.includes(IMAGE_UPLOAD_MARKER)) return src

    const markerIndex = src.indexOf(IMAGE_UPLOAD_MARKER)
    const prefix = src.slice(0, markerIndex + IMAGE_UPLOAD_MARKER.length)
    const suffix = src.slice(markerIndex + IMAGE_UPLOAD_MARKER.length)
    const [pathPart, tail] = splitPathAndTail(suffix)
    const hasTrailingSlash = pathPart.endsWith('/')
    const segments = pathPart.split('/').filter(Boolean)

    if (segments.length === 0) return src

    let assetStartIndex = segments.findIndex((segment) => !isTransformSegment(segment))
    if (assetStartIndex === -1) {
        assetStartIndex = segments.length
    }

    const transformSegments = segments.slice(0, assetStartIndex)
    const assetSegments = segments.slice(assetStartIndex)
    const additions = []
    const resizeTransforms = []

    if (quality && !hasTransformToken(transformSegments, 'q_')) {
        additions.push(`q_${quality}`)
    }

    if (format && !hasTransformToken(transformSegments, 'f_')) {
        additions.push(`f_${format}`)
    }

    if (crop && !hasTransformToken(transformSegments, 'c_')) {
        resizeTransforms.push(`c_${crop}`)
    }

    if (width && !hasTransformToken(transformSegments, 'w_')) {
        resizeTransforms.push(`w_${width}`)
    }

    if (height && !hasTransformToken(transformSegments, 'h_')) {
        resizeTransforms.push(`h_${height}`)
    }

    if (dpr && !hasTransformToken(transformSegments, 'dpr_')) {
        resizeTransforms.push(`dpr_${dpr}`)
    }

    if (resizeTransforms.length > 0) {
        additions.push(resizeTransforms.join(','))
    }

    if (additions.length === 0) return src

    return `${prefix}${[...transformSegments, ...additions, ...assetSegments].join('/')}${hasTrailingSlash ? '/' : ''}${tail}`
}
