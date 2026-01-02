import { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { Hero } from './features/hero'
import { StackView, GridView } from './features/portfolio'
import { SkillsView } from './features/skills'
import { Navbar, Footer } from './components/layout'
import { AtmosphericBackground } from './components/ui'

function App() {
    // Track which project is selected for Grid view
    const [selectedProject, setSelectedProject] = useState(null)
    const [lenis, setLenis] = useState(null)

    // Initialize Lenis Smooth Scroll with OPTIMIZED settings
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
            infinite: false,
        })

        setLenis(lenisInstance)

        function raf(time) {
            lenisInstance.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenisInstance.destroy()
        }
    }, [])

    // Lock scroll when grid is open
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

    // Handle project click - open grid view
    const handleProjectClick = (project) => {
        setSelectedProject(project)
    }

    // Handle grid close
    const handleCloseGrid = () => {
        setSelectedProject(null)
    }

    return (
        <>
            {/* Atmospheric Background */}
            <AtmosphericBackground />

            <div className="relative min-h-screen gpu-accelerated">
                <Navbar />

                {/* Hero Section */}
                <Hero />

                {/* Skills Section - Immediately after Hero */}
                <section id="skills" className="section-spacing container-padding">
                    <SkillsView />
                </section>

                {/* Divider */}
                <div className="container-padding">
                    <div className="luxury-divider" />
                </div>

                {/* Projects Section */}
                <section id="works" className="section-spacing-lg container-padding">
                    <p className="meta-wide mb-16 text-glow">Selected Works</p>
                    <StackView onProjectClick={handleProjectClick} />
                </section>

                {/* Grid View Overlay */}
                <GridView
                    project={selectedProject}
                    isOpen={!!selectedProject}
                    onClose={handleCloseGrid}
                />

                <Footer />
            </div>
        </>
    )
}

export default App
