import { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { Hero } from './features/hero'
import { StackView, GridView } from './features/portfolio'
import { SkillsView } from './features/skills'
import { Header, Footer } from './components/layout'
import { AtmosphericBackground, CustomCursor } from './components/ui'
import SideNav from './components/ui/SideNav'

function App() {
    const [selectedProject, setSelectedProject] = useState(null)
    const [lenis, setLenis] = useState(null)

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 1.5,
            lerp: 0.08,
            wheelMultiplier: 0.8,
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
            if (selectedProject) lenis.stop()
            else lenis.start()
        }
    }, [selectedProject, lenis])

    return (
        <>
            <AtmosphericBackground />
            <CustomCursor />
            <SideNav />

            <div className="relative min-h-screen">
                <Header />
                <Hero />

                <section id="skills" className="section-spacing container-padding">
                    <SkillsView />
                </section>

                <div className="container-padding">
                    <div className="luxury-divider" />
                </div>

                <section id="portfolio" className="section-spacing-lg container-padding">
                    {/* Portfolio Header - Clean Single Line */}
                    <div className="text-center mb-24">
                        <div className="flex items-center justify-center gap-6 mb-8">
                            <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))' }} />
                            <h2
                                style={{
                                    fontSize: 'clamp(36px, 5vw, 56px)',
                                    fontWeight: 700,
                                    letterSpacing: '-0.02em',
                                    color: '#F2F2F2'
                                }}
                            >
                                Portfolio
                            </h2>
                            <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)' }} />
                        </div>
                    </div>
                    <StackView onProjectClick={setSelectedProject} />
                </section>

                <GridView
                    project={selectedProject}
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                />

                {/* Contact Section - wraps Footer */}
                <section id="contact">
                    <Footer />
                </section>
            </div>
        </>
    )
}

export default App
