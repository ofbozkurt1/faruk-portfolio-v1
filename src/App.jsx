import { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Hero } from './features/hero'
import StackView from './features/portfolio/StackView'
import { SkillsView } from './features/skills'
import { ServicesView } from './features/services'
import { Header, Footer } from './components/layout'
import { AtmosphericBackground } from './components/ui'
import SideNav from './components/ui/SideNav'
import WipeTransition from './components/ui/WipeTransition'
import Preloader from './components/ui/Preloader'
import { getAdaptiveRootMargin, useNearViewport, usePrefersReducedMotion } from './hooks'
import { lockBodyScroll } from './utils/scrollLock'

const EcommerceShowcase = lazy(() => import('./features/ecommerce/EcommerceShowcase'))
const MotionShowcase = lazy(() => import('./features/motion/MotionShowcase'))
const InstagramShowcase = lazy(() => import('./features/instagram/InstagramShowcase'))
const VideoVault = lazy(() => import('./features/videos/VideoVault'))
const GridView = lazy(() => import('./features/portfolio/GridView'))

function SectionFallback({ className = 'h-px' }) {
    return <div className={`${className} w-full`} aria-hidden="true" />
}

function DeferredSectionMount({
    children,
    deferOnDesktop = true,
    fallbackClassName = 'h-px',
    isMobileViewport,
}) {
    const shouldDefer = isMobileViewport || deferOnDesktop
    const { ref, isNearViewport } = useNearViewport({
        enabled: shouldDefer,
        initialInView: !shouldDefer,
        once: true,
        rootMargin: getAdaptiveRootMargin('1200px 0px', '800px 0px'),
        threshold: 0.01,
    })

    const shouldRender = !shouldDefer || isNearViewport

    return (
        <div ref={ref} className="w-full">
            {shouldRender ? (
                <Suspense fallback={<SectionFallback className={fallbackClassName} />}>
                    {children}
                </Suspense>
            ) : (
                <SectionFallback className={fallbackClassName} />
            )}
        </div>
    )
}

function App() {
    const { t } = useTranslation()
    const prefersReducedMotion = usePrefersReducedMotion()
    const [selectedProject, setSelectedProject] = useState(null)
    const [lenis, setLenis] = useState(null)
    const [isMobileViewport, setIsMobileViewport] = useState(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return false
        }
        return window.matchMedia('(max-width: 767.98px)').matches
    })

    // PHASE 45: Conditional rendering based on screen size
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            setIsDesktop(true)
            return undefined
        }

        const mediaQuery = window.matchMedia('(max-width: 767.98px)')
        const handleViewportChange = (event) => {
            setIsMobileViewport(event.matches)
            setIsDesktop(!event.matches)
        }

        setIsMobileViewport(mediaQuery.matches)
        setIsDesktop(!mediaQuery.matches)

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleViewportChange)
            return () => mediaQuery.removeEventListener('change', handleViewportChange)
        }

        mediaQuery.addListener(handleViewportChange)
        return () => mediaQuery.removeListener(handleViewportChange)
    }, [])

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (isMobileViewport || prefersReducedMotion) {
            setLenis(null)
            return undefined
        }

        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
            lerp: 0.1,
            wheelMultiplier: 1,
        })

        // Force scroll to top after Lenis init
        lenisInstance.scrollTo(0, { immediate: true })

        setLenis(lenisInstance)
        let rafId = null

        function raf(time) {
            lenisInstance.raf(time)
            rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)

        return () => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId)
            }
            lenisInstance.destroy()
            setLenis(null)
        }
    }, [isMobileViewport, prefersReducedMotion])

    useEffect(() => {
        if (selectedProject) {
            lenis?.stop()
            return lockBodyScroll('portfolio-modal')
        }

        lenis?.start()
        return undefined
    }, [selectedProject, lenis])

    return (
        <>
            {/* Premium Preloader - Counter + Curtain Reveal */}
            {!isMobileViewport && <Preloader />}

            {/* Cinematic Language Transition */}
            <WipeTransition />

            {!isMobileViewport && <AtmosphericBackground />}

            {/* PHASE 45: TRUE Conditional Render - SideNav NOT in DOM on mobile */}
            {isDesktop && <SideNav />}

            <div className="relative min-h-screen w-full overflow-x-hidden">
                <Header />
                <Hero />

                {/* Skills Section - Responsive padding */}
                <section id="skills" className="relative w-full pt-0 pb-10 md:py-32 container-padding">
                    <SkillsView />
                </section>

                {/* PHASE 45: Divider removed from DOM on mobile */}
                {isDesktop && (
                    <div className="container-padding">
                        <div className="luxury-divider" />
                    </div>
                )}

                {/* Services Section */}
                <section id="services" className="container-padding">
                    <ServicesView />
                </section>



                <section id="portfolio" className="relative w-full pt-0 pb-10 md:py-32 container-padding">
                    {/* Portfolio Header - Clean Single Line */}
                    <div className="text-center mb-1 md:mb-24">
                        <div className="flex items-center justify-center gap-3 md:gap-6 mb-1 md:mb-8">
                            <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))' }} />
                            <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-[#F2F2F2]">
                                {t('portfolio.title', 'Portfolio')}
                            </h2>
                            <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)' }} />
                        </div>
                    </div>
                    <StackView onProjectClick={setSelectedProject} className="-mt-6" />
                </section>

                {selectedProject && (
                    <Suspense fallback={<SectionFallback />}>
                        <GridView
                            project={selectedProject}
                            isOpen={!!selectedProject}
                            onClose={() => setSelectedProject(null)}
                        />
                    </Suspense>
                )}

                {/* Phase 53: E-Commerce & Product Design Section */}
                <DeferredSectionMount
                    isMobileViewport={isMobileViewport}
                    fallbackClassName="min-h-[620px] md:min-h-[760px]"
                >
                    <EcommerceShowcase />
                </DeferredSectionMount>

                <DeferredSectionMount
                    isMobileViewport={isMobileViewport}
                    fallbackClassName="min-h-[520px] md:min-h-[720px]"
                >
                    <MotionShowcase />
                </DeferredSectionMount>

                {/* Video Showcase Section */}
                <section id="videos" className="container-padding">
                    <DeferredSectionMount
                        deferOnDesktop={false}
                        isMobileViewport={isMobileViewport}
                        fallbackClassName="min-h-[620px]"
                    >
                        <VideoVault />
                    </DeferredSectionMount>
                </section>

                <DeferredSectionMount
                    isMobileViewport={isMobileViewport}
                    fallbackClassName="min-h-[620px]"
                >
                    <InstagramShowcase />
                </DeferredSectionMount>

                {/* Contact Section - wraps Footer */}
                <section id="contact">
                    <Footer />
                </section>
            </div>
        </>
    )
}

export default App

