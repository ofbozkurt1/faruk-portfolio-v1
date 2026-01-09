/**
 * WipeTransition Component - Cinematic Language Switch
 * Elegant full-screen overlay with refined typography
 * Slow-in, fast-out easing for dynamic feel
 */

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguageTransitionStore } from '../../stores/languageTransitionStore'

// Slow enter, fast exit
const wipeVariants = {
    initial: { x: '-100%' },
    animate: {
        x: '0%',
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
        x: '100%',
        transition: { duration: 0.2, ease: [0.55, 0, 1, 0.45] }
    }
}

const languageLabels = {
    tr: { name: 'Türkçe', flag: '🇹🇷', sub: 'Dil Değiştirildi', code: 'TR' },
    en: { name: 'English', flag: '🇬🇧', sub: 'Language Changed', code: 'EN' }
}

export default function WipeTransition() {
    const { i18n } = useTranslation()
    const { isTransitioning, pendingLanguage, endTransition } = useLanguageTransitionStore()

    useEffect(() => {
        if (isTransitioning && pendingLanguage) {
            // MOBILE FIX: Save current scroll position
            const savedScrollY = window.scrollY

            const switchTimer = setTimeout(() => {
                i18n.changeLanguage(pendingLanguage)

                // Restore scroll position after language change
                requestAnimationFrame(() => {
                    window.scrollTo(0, savedScrollY)
                })
            }, 350)

            const endTimer = setTimeout(() => {
                endTransition()
                // Double-check scroll position after transition ends
                requestAnimationFrame(() => {
                    window.scrollTo(0, savedScrollY)
                })
            }, 600)

            return () => {
                clearTimeout(switchTimer)
                clearTimeout(endTimer)
            }
        }
    }, [isTransitioning, pendingLanguage, i18n, endTransition])

    const lang = pendingLanguage ? languageLabels[pendingLanguage] : null

    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    key="wipe"
                    variants={wipeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: '#050505',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 0
                    }}
                >
                    {/* Corner accent - Top Left */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'absolute',
                            top: 40,
                            left: 40,
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: 11,
                            letterSpacing: '0.3em',
                            color: 'rgba(255,255,255,0.3)'
                        }}
                    >
                        OFB PORTFOLIO
                    </motion.div>

                    {/* Corner accent - Top Right */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'absolute',
                            top: 40,
                            right: 40,
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: 11,
                            letterSpacing: '0.3em',
                            color: 'rgba(255,255,255,0.3)'
                        }}
                    >
                        {lang?.code}
                    </motion.div>

                    {/* Flag with scale animation */}
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.15, ease: 'backOut' }}
                        style={{ fontSize: 56, marginBottom: 8 }}
                    >
                        {lang?.flag}
                    </motion.span>

                    {/* Language Name - Large */}
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            color: '#F2F2F2',
                            fontSize: 'clamp(48px, 8vw, 72px)',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase'
                        }}
                    >
                        {lang?.name}
                    </motion.span>

                    {/* Decorative lines - Left and Right */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 24, marginBottom: 16 }}>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3, delay: 0.25 }}
                            style={{
                                width: 80,
                                height: 1,
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4))',
                                transformOrigin: 'right'
                            }}
                        />
                        <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.6, scale: 1 }}
                            transition={{ duration: 0.2, delay: 0.28 }}
                            style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                        >
                            ◆
                        </motion.span>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3, delay: 0.25 }}
                            style={{
                                width: 80,
                                height: 1,
                                background: 'linear-gradient(90deg, rgba(255,255,255,0.4), transparent)',
                                transformOrigin: 'left'
                            }}
                        />
                    </div>

                    {/* Subtitle */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        style={{
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: 12,
                            letterSpacing: '0.25em',
                            color: 'rgba(255,255,255,0.5)',
                            textTransform: 'uppercase'
                        }}
                    >
                        {lang?.sub}
                    </motion.span>

                    {/* Bottom accent */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: 10,
                            letterSpacing: '0.2em',
                            color: 'rgba(255,255,255,0.2)'
                        }}
                    >
                        2026
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
