import { forwardRef, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, Download, ExternalLink, Github, Linkedin } from 'lucide-react'

const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
}

const Hero = forwardRef(function Hero({ sections, siteConfig }, ref) {
  const orbLeft = useRef(null)
  const orbRight = useRef(null)
  const heroCopy = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      gsap.fromTo(
        heroCopy.current.children,
        { opacity: 0, y: 18, force3D: true },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 0.08 },
      )

      if (!reducedMotion && window.innerWidth >= 1024) {
        gsap.to(orbLeft.current, {
          y: -10,
          x: 8,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          force3D: true,
        })

        gsap.to(orbRight.current, {
          y: 12,
          x: -8,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          force3D: true,
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center px-5 pb-16 pt-28 sm:px-6 lg:px-8"
    >
      <div
        ref={orbLeft}
        className="absolute left-[8%] top-28 hidden h-40 w-40 rounded-full border border-white/10 bg-white/10 blur-3xl lg:block"
      />
      <div
        ref={orbRight}
        className="absolute bottom-24 right-[10%] hidden h-56 w-56 rounded-full bg-cyan/15 blur-3xl lg:block"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div ref={heroCopy} className="space-y-7">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-mist shadow-glass backdrop-blur-xl">
            {siteConfig.heroEyebrow}
          </span>
          <div className="space-y-5">
            <p className="font-display text-sm uppercase tracking-[0.4em] text-cyan/80">
              Hi, I&apos;m {siteConfig.name}
            </p>
            <h1 className="max-w-3xl font-display text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
              {siteConfig.heroTitle}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {siteConfig.tagline}. {siteConfig.heroDescription}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() =>
                sections.projects?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl"
            >
              View Projects
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </button>
            <a
              href={siteConfig.resumePath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white shadow-glass backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:bg-white/15"
            >
              <ExternalLink size={18} />
              View Resume
            </a>
            <a
              href={siteConfig.resumePath}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan/25 bg-cyan/15 px-6 py-3 font-semibold text-white shadow-glass backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan/45 hover:bg-cyan/20"
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {siteConfig.socialLinks.map((link) => {
              const Icon = socialIconMap[link.icon]

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/35 px-4 py-2 text-sm font-medium text-white/80 transition duration-200 hover:-translate-y-1 hover:border-cyan/30 hover:bg-white/10 hover:text-white"
                >
                  <Icon size={16} />
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan/25 via-white/5 to-fuchsia-500/20 blur-2xl" />
          <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-glass backdrop-blur-2xl">
            <div className="mb-10 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-300" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">Primary Focus</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-white">
                  {siteConfig.currentFocus}
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {siteConfig.highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition duration-200 hover:border-cyan/25 hover:bg-white/10"
                  >
                    <p className="text-base font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-sm text-white/60">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-cyan/20 bg-cyan/10 p-4 text-sm leading-7 text-cyan-50">
                Backend development with Node.js, Flask, APIs, and databases, paired with smart
                contract systems and Web3-powered product thinking.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default Hero
