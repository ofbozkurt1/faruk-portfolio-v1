/**
 * Preloader Component - Cinematic Counter + Curtain Reveal
 * Premium "Motion Designer" loading experience
 * v3: Ultra-fast version
 */

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true)
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        // Scroll'u kilitle
        document.body.style.overflow = 'hidden'

        const interval = setInterval(() => {
            setCounter((prev) => {
                // HIZ AYARI: 5-20 arası büyük adımlar
                const newCount = prev + Math.floor(Math.random() * 15) + 5

                if (newCount >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return newCount
            })
        }, 60) // Tıklama hızı: 60ms (çok hızlı)

        if (counter === 100) {
            // 100'ü gördükten sonra kısa bekleme
            setTimeout(() => {
                setIsLoading(false)
                document.body.style.overflow = 'auto'
            }, 200)
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
                    // Perdenin kalkış hızı: 0.6s (seri)
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    style={{ willChange: 'transform' }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center"
                    >
                        <div className="text-6xl md:text-9xl font-bold tracking-tighter flex items-start">
                            <span>{counter}</span>
                            <span className="text-2xl md:text-4xl mt-2 md:mt-4">%</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
