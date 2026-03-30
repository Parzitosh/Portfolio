import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { projects } from './data/projects'
import { siteConfig } from './data/siteConfig'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)

  const sections = useMemo(
    () => ({
      home: homeRef,
      about: aboutRef,
      projects: projectsRef,
      contact: contactRef,
    }),
    [],
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const revealedSections = gsap.utils.toArray('[data-reveal]')
      const cards = gsap.utils.toArray('[data-project-card]')

      if (reducedMotion) {
        gsap.set([...revealedSections, ...cards], { clearProps: 'all', opacity: 1, y: 0 })
        return
      }

      revealedSections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 28, force3D: true },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              once: true,
            },
          },
        )
      })

      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24, force3D: true },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power2.out',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: '#projects-grid',
              start: 'top 82%',
              once: true,
            },
          },
        )
      }
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="absolute left-[-10%] top-16 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
        <div className="absolute right-[-5%] top-1/3 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-80 w-80 rounded-full bg-peach/20 blur-3xl" />
      </div>

      <Navbar sections={sections} resumeHref={siteConfig.resumePath} />

      <main>
        <Hero ref={homeRef} sections={sections} siteConfig={siteConfig} />
        <About ref={aboutRef} skills={siteConfig.skills} bio={siteConfig.bio} />
        <Projects ref={projectsRef} projects={projects} />
        <Contact ref={contactRef} siteConfig={siteConfig} />
      </main>

      <Footer siteConfig={siteConfig} />
    </div>
  )
}

export default App
