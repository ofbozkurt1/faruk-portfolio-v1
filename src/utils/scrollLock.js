const activeLocks = new Set()
let previousBodyOverflow = ''
let previousHtmlOverflow = ''

export function lockBodyScroll(lockId) {
    if (typeof document === 'undefined' || !lockId) {
        return () => {}
    }

    if (activeLocks.size === 0) {
        previousBodyOverflow = document.body.style.overflow
        previousHtmlOverflow = document.documentElement.style.overflow
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'
    }

    activeLocks.add(lockId)
    return () => unlockBodyScroll(lockId)
}

export function unlockBodyScroll(lockId) {
    if (typeof document === 'undefined' || !lockId) {
        return
    }

    activeLocks.delete(lockId)

    if (activeLocks.size === 0) {
        document.body.style.overflow = previousBodyOverflow
        document.documentElement.style.overflow = previousHtmlOverflow
        previousBodyOverflow = ''
        previousHtmlOverflow = ''
    }
}
