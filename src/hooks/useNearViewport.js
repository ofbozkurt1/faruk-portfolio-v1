import { useEffect, useRef, useState } from 'react'

const MOBILE_VIEWPORT_QUERY = '(max-width: 767.98px)'

export function getAdaptiveRootMargin(desktopMargin = '200px 0px', mobileMargin = '300px 0px') {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return desktopMargin
    }
    return window.matchMedia(MOBILE_VIEWPORT_QUERY).matches ? mobileMargin : desktopMargin
}

export function useIsMobileViewport() {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return false
        }
        return window.matchMedia(MOBILE_VIEWPORT_QUERY).matches
    })

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return undefined
        }

        const mediaQuery = window.matchMedia(MOBILE_VIEWPORT_QUERY)
        const handleChange = (event) => setIsMobile(event.matches)

        setIsMobile(mediaQuery.matches)

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleChange)
            return () => mediaQuery.removeEventListener('change', handleChange)
        }

        mediaQuery.addListener(handleChange)
        return () => mediaQuery.removeListener(handleChange)
    }, [])

    return isMobile
}

export function useNearViewport({
    rootMargin,
    threshold = 0.01,
    once = true,
    enabled = true,
    initialInView = false
} = {}) {
    const ref = useRef(null)
    const [isNearViewport, setIsNearViewport] = useState(initialInView)
    const resolvedRootMargin = rootMargin ?? getAdaptiveRootMargin()

    useEffect(() => {
        if (!enabled) return undefined
        if (once && isNearViewport) return undefined

        const node = ref.current
        if (!node) return undefined

        if (typeof IntersectionObserver === 'undefined') {
            setIsNearViewport(true)
            return undefined
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsNearViewport(true)
                        if (once) {
                            observer.unobserve(entry.target)
                        }
                        return
                    }

                    if (!once) {
                        setIsNearViewport(false)
                    }
                })
            },
            { rootMargin: resolvedRootMargin, threshold }
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [enabled, isNearViewport, once, resolvedRootMargin, threshold])

    return { ref, isNearViewport }
}
