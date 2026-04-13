/**
 * Preloader Component - Cinematic Counter + Curtain Reveal
 * Premium "Motion Designer" loading experience
 * Duration: ~2 seconds
 */

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const toolIcons = [
    { src: '/gorseller/iconlar/photoshop.svg', alt: 'Photoshop' },
    { src: '/gorseller/iconlar/after-effects.svg', alt: 'After Effects' },
    { src: '/gorseller/iconlar/illustrator.svg', alt: 'Illustrator' },
    { src: '/gorseller/iconlar/premiere-pro.svg', alt: 'Premiere Pro' },
]

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true)
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        if (!isLoading) return undefined

        document.body.style.overflow = 'hidden'

        const interval = setInterval(() => {
            setCounter((previous) => {
                const nextCount = previous + Math.floor(Math.random() * 5) + 6
                if (nextCount >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return nextCount
            })
        }, 90)

        return () => clearInterval(interval)
    }, [isLoading])

    useEffect(() => {
        if (!isLoading || counter !== 100) return undefined

        const closeTimer = setTimeout(() => {
            setIsLoading(false)
            document.body.style.overflow = 'auto'
        }, 300)

        return () => clearTimeout(closeTimer)
    }, [counter, isLoading])

    useEffect(
        () => () => {
            document.body.style.overflow = ''
        },
        []
    )

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
                    initial={{ y: 0 }}
                    exit={{ y: '-100vh' }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    style={{ willChange: 'transform' }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-start text-7xl leading-none font-bold tracking-tighter md:text-[140px]">
                            <span>{counter}</span>
                            <span className="mt-2 text-2xl md:mt-4 md:text-4xl">%</span>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6 text-sm font-medium tracking-[0.3em] text-white/60 uppercase md:text-lg"
                        >
                            Ömer Faruk Bozkurt
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-2 text-xs tracking-[0.2em] text-white/40 md:text-sm"
                        >
                            MOTION & GRAPHIC DESIGNER
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 flex items-center gap-4"
                        >
                            {toolIcons.map((icon) => (
                                <img
                                    key={icon.src}
                                    src={icon.src}
                                    alt={icon.alt}
                                    loading="lazy"
                                    decoding="async"
                                    fetchPriority="low"
                                    className="h-7 w-7 opacity-50 md:h-9 md:w-9"
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
