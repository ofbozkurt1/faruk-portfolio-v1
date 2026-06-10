import { useEffect, useState } from 'react'

const SECTION_IDS = ['about', 'skills', 'services', 'portfolio', 'contact']

let activeSection = 'about'
let frameId = null
const subscribers = new Set()

function notify(nextSection) {
    if (nextSection === activeSection) return
    activeSection = nextSection
    subscribers.forEach((subscriber) => subscriber(nextSection))
}

function calculateActiveSection() {
    frameId = null

    const scrollY = window.scrollY + 150
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    if (scrollY + windowHeight >= documentHeight - 100) {
        notify('contact')
        return
    }

    for (let index = SECTION_IDS.length - 1; index >= 0; index -= 1) {
        const section = document.getElementById(SECTION_IDS[index])
        if (section && scrollY >= section.offsetTop) {
            notify(SECTION_IDS[index])
            return
        }
    }

    notify('about')
}

function scheduleCalculation() {
    if (frameId !== null) return
    frameId = window.requestAnimationFrame(calculateActiveSection)
}

function subscribe(subscriber) {
    subscribers.add(subscriber)
    subscriber(activeSection)

    if (subscribers.size === 1) {
        window.addEventListener('scroll', scheduleCalculation, { passive: true })
        window.addEventListener('resize', scheduleCalculation)
        scheduleCalculation()
    }

    return () => {
        subscribers.delete(subscriber)
        if (subscribers.size > 0) return

        window.removeEventListener('scroll', scheduleCalculation)
        window.removeEventListener('resize', scheduleCalculation)
        if (frameId !== null) {
            window.cancelAnimationFrame(frameId)
            frameId = null
        }
    }
}

export function useActiveSection() {
    const [section, setSection] = useState(activeSection)

    useEffect(() => subscribe(setSection), [])

    return section
}
