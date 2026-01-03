import { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { Hero } from './features/hero'
import { StackView, GridView } from './features/portfolio'
import { SkillsView } from './features/skills'
import { Header, Footer } from './components/layout'
import { AtmosphericBackground, CustomCursor } from './components/ui'

function App() {
    const [selectedProject, setSelectedProject] = useState(null)
    const [lenis, setLenis] = useState(null)

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
                    <p className="meta-wide mb-16">Selected Works</p>
                    <StackView onProjectClick={setSelectedProject} />
                </section>

                <GridView
                    project={selectedProject}
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                />

                <Footer />
            </div>
        </>
    )
}

export default App
