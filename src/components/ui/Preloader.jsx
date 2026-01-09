/**
 * Preloader Component - Cinematic Counter + Curtain Reveal
 * Premium "Motion Designer" loading experience
 * Optimized for GPU acceleration and mobile browsers
 */

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true)
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        // Mobil tarayıcılarda scroll'u engelle (Yükleme bitene kadar)
        document.body.style.overflow = 'hidden'

        const interval = setInterval(() => {
            setCounter((prev) => {
                const newCount = prev + Math.floor(Math.random() * 10) + 1
                if (newCount >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return newCount
            })
        }, 120) // Biraz daha hızlı, daha akıcı

        if (counter === 100) {
            setTimeout(() => {
                setIsLoading(false)
                // Yükleme bitince scroll'u serbest bırak
                document.body.style.overflow = 'auto'
            }, 500)
        }

        return () => clearInterval(interval)
    }, [counter])

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    /* OPTİMİZASYON 1: z-index çok yüksek olsun ve fixed kalsın */
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"

                    /* OPTİMİZASYON 2: Initial ve Exit değerleri */
                    initial={{ y: 0 }}
                    exit={{ y: '-100vh' }}

                    /* OPTİMİZASYON 3: Animasyon Eğrisi (Ease) */
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}

                    /* OPTİMİZASYON 4: CSS ile GPU Zorlama */
                    style={{ willChange: 'transform' }}
                >
                    {/* İçerik Container */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <div className="text-6xl md:text-9xl font-bold tracking-tighter flex items-start">
                            <span>{counter}</span>
                            <span className="text-2xl md:text-4xl mt-2 md:mt-4">%</span>
                        </div>

                        <div className="mt-4 text-xs md:text-sm uppercase tracking-[0.2em] text-gray-500 font-medium">
                            Faruk Bozkurt • Portfolio
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
