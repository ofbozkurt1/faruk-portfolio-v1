import { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { useTranslation } from 'react-i18next'
import { Hero } from './features/hero'
import { StackView, GridView } from './features/portfolio'
import { SkillsView } from './features/skills'
import { ServicesView } from './features/services'
import { VideoVault } from './features/videos'
import EcommerceShowcase from './features/ecommerce/EcommerceShowcase'
import MotionShowcase from './features/motion/MotionShowcase'
import InstagramShowcase from './features/instagram/InstagramShowcase'
import { Header, Footer } from './components/layout'
import { AtmosphericBackground, CustomCursor } from './components/ui'
import ServiceBackgroundLayer from './components/ui/ServiceBackgroundLayer'
import PortfolioBackgroundLayer from './components/ui/PortfolioBackgroundLayer'
import SideNav from './components/ui/SideNav'
import WipeTransition from './components/ui/WipeTransition'
import Preloader from './components/ui/Preloader'

function App() {
    const { t } = useTranslation()
    const [selectedProject, setSelectedProject] = useState(null)
    const [lenis, setLenis] = useState(null)

    // PHASE 45: Conditional rendering based on screen size
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 768)
        checkDesktop()
        window.addEventListener('resize', checkDesktop)
        return () => window.removeEventListener('resize', checkDesktop)
    }, [])

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
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

        function raf(time) {
            lenisInstance.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        return () => lenisInstance.destroy()
    }, [])

    useEffect(() => {
        if (lenis) {
            if (selectedProject) {
                lenis.stop()
                document.body.style.overflow = 'hidden'
            } else {
                lenis.start()
                document.body.style.overflow = ''
            }
        }
    }, [selectedProject, lenis])

    return (
        <>
            {/* Premium Preloader - Counter + Curtain Reveal */}
            <Preloader />

            {/* Cinematic Language Transition */}
            <WipeTransition />

            <AtmosphericBackground />
            <ServiceBackgroundLayer />
            <PortfolioBackgroundLayer />
            <CustomCursor />

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

                <GridView
                    project={selectedProject}
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                />

                {/* â”€â”€â”€ Phase 53: E-Commerce & Product Design Section â”€â”€â”€ */}
                <EcommerceShowcase />
                <MotionShowcase />
                <InstagramShowcase />

                {/* Video Showcase Section */}
                <section id="videos" className="container-padding">
                    <VideoVault />
                </section>

                {/* Contact Section - wraps Footer */}
                <section id="contact">
                    <Footer />
                </section>
            </div>
        </>
    )
}

export default App



