/**
 * Preloader Component - Cinematic Counter + Curtain Reveal
 * Premium "Motion Designer" loading experience
 * Duration: ~2 seconds
 */

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Tool icons
const toolIcons = [
    '/gorseller/iconlar/photoshop.svg',
    '/gorseller/iconlar/after-effects.svg',
    '/gorseller/iconlar/illustrator.svg',
    '/gorseller/iconlar/premiere-pro.svg'
]

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true)
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        const interval = setInterval(() => {
            setCounter((prev) => {
                // ~1.3 saniyede 100'e ulaşır (6-10 arası artış, 90ms aralık)
                const newCount = prev + Math.floor(Math.random() * 5) + 6
                if (newCount >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return newCount
            })
        }, 90) // 90ms aralık

        if (counter === 100) {
            // 100'de 300ms bekle, perde 0.7s = ~2 sn toplam
            setTimeout(() => {
                setIsLoading(false)
                document.body.style.overflow = 'auto'
            }, 300)
        }

        return () => clearInterval(interval)
    }, [counter])

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
                        {/* Sayaç */}
                        <div className="text-7xl md:text-[140px] font-bold tracking-tighter flex items-start leading-none">
                            <span>{counter}</span>
                            <span className="text-2xl md:text-4xl mt-2 md:mt-4">%</span>
                        </div>

                        {/* İsim */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6 text-sm md:text-lg uppercase tracking-[0.3em] text-white/60 font-medium"
                        >
                            Ömer Faruk Bozkurt
                        </motion.div>

                        {/* Alt Yazı */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-2 text-xs md:text-sm tracking-[0.2em] text-white/40"
                        >
                            MOTION & GRAPHIC DESIGNER
                        </motion.div>

                        {/* Tool Icons */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 flex items-center gap-4"
                        >
                            {toolIcons.map((icon, idx) => (
                                <img
                                    key={idx}
                                    src={icon}
                                    alt=""
                                    className="w-7 h-7 md:w-9 md:h-9 opacity-50"
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
