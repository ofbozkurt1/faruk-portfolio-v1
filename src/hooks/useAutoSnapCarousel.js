import { useCallback, useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function getStride(container) {
    if (!container) return 0

    const firstChild = container.firstElementChild
    if (!firstChild) return container.offsetWidth

    const childWidth = firstChild.getBoundingClientRect().width
    const styles = getComputedStyle(container)
    const gap = parseFloat(styles.columnGap || styles.gap || '0')

    return childWidth + (Number.isNaN(gap) ? 0 : gap)
}

export function useAutoSnapCarousel({
    containerRef,
    activeIndex,
    setActiveIndex,
    itemCount,
    enabled = true,
    intervalMs = 5000,
    pauseAfterInteractionMs = 8000,
    respectReducedMotion = true,
}) {
    const prefersReducedMotion = usePrefersReducedMotion()
    const shouldAutoAdvance = enabled && !(respectReducedMotion && prefersReducedMotion)
    const activeIndexRef = useRef(activeIndex)
    const intervalRef = useRef(null)
    const interactionPauseTimeoutRef = useRef(null)
    const scrollThrottleRef = useRef(null)
    const unlockProgrammaticRef = useRef(null)
    const isPausedRef = useRef(false)
    const isProgrammaticScrollRef = useRef(false)

    useEffect(() => {
        activeIndexRef.current = activeIndex
    }, [activeIndex])

    const clearInteractionPauseTimeout = useCallback(() => {
        if (interactionPauseTimeoutRef.current) {
            clearTimeout(interactionPauseTimeoutRef.current)
            interactionPauseTimeoutRef.current = null
        }
    }, [])

    const scheduleResumeAfterInteraction = useCallback(() => {
        clearInteractionPauseTimeout()
        interactionPauseTimeoutRef.current = setTimeout(() => {
            isPausedRef.current = false
            interactionPauseTimeoutRef.current = null
        }, pauseAfterInteractionMs)
    }, [clearInteractionPauseTimeout, pauseAfterInteractionMs])

    const onUserInteractStart = useCallback(() => {
        if (!enabled) return
        isPausedRef.current = true
        clearInteractionPauseTimeout()
    }, [clearInteractionPauseTimeout, enabled])

    const onUserInteractEnd = useCallback(() => {
        if (!enabled) return
        scheduleResumeAfterInteraction()
    }, [enabled, scheduleResumeAfterInteraction])

    const scrollToIndex = useCallback(
        (index, behavior = 'smooth') => {
            const container = containerRef.current
            if (!container) return

            const stride = getStride(container)
            if (stride <= 0) return

            const boundedIndex = Math.max(0, Math.min(index, Math.max(0, itemCount - 1)))
            isProgrammaticScrollRef.current = true
            container.scrollTo({
                left: boundedIndex * stride,
                behavior: respectReducedMotion && prefersReducedMotion ? 'auto' : behavior,
            })

            if (unlockProgrammaticRef.current) {
                clearTimeout(unlockProgrammaticRef.current)
            }

            unlockProgrammaticRef.current = setTimeout(() => {
                isProgrammaticScrollRef.current = false
                unlockProgrammaticRef.current = null
            }, 500)
        },
        [containerRef, itemCount, prefersReducedMotion, respectReducedMotion]
    )

    const handleScroll = useCallback(() => {
        if (!enabled) return
        const container = containerRef.current
        if (!container) return
        if (isProgrammaticScrollRef.current) return
        if (scrollThrottleRef.current) return

        scrollThrottleRef.current = setTimeout(() => {
            scrollThrottleRef.current = null
            const stride = getStride(container)
            if (stride <= 0) return

            const nextIndex = Math.round(container.scrollLeft / stride)
            if (nextIndex === activeIndexRef.current) return
            if (nextIndex < 0 || nextIndex >= itemCount) return

            setActiveIndex(nextIndex)
        }, 120)
    }, [containerRef, enabled, itemCount, setActiveIndex])

    useEffect(() => {
        if (!shouldAutoAdvance || itemCount <= 1) return undefined

        intervalRef.current = setInterval(() => {
            if (isPausedRef.current) return
            const nextIndex = (activeIndexRef.current + 1) % itemCount
            setActiveIndex(nextIndex)
            scrollToIndex(nextIndex)
        }, intervalMs)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [intervalMs, itemCount, scrollToIndex, setActiveIndex, shouldAutoAdvance])

    useEffect(() => {
        if (!enabled) return undefined
        if (itemCount <= 0) return undefined
        if (activeIndex < itemCount) return undefined

        setActiveIndex(0)
        scrollToIndex(0, 'auto')
        return undefined
    }, [activeIndex, enabled, itemCount, scrollToIndex, setActiveIndex])

    useEffect(() => () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        if (interactionPauseTimeoutRef.current) {
            clearTimeout(interactionPauseTimeoutRef.current)
        }
        if (scrollThrottleRef.current) {
            clearTimeout(scrollThrottleRef.current)
        }
        if (unlockProgrammaticRef.current) {
            clearTimeout(unlockProgrammaticRef.current)
        }
    }, [])

    return {
        onUserInteractEnd,
        onUserInteractStart,
        handleScroll,
        scrollToIndex,
    }
}
