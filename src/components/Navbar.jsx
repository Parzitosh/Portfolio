import { useEffect, useState } from 'react'
import { Download, ExternalLink, Menu, X } from 'lucide-react'
import { navLinks } from '../data/siteConfig'

function Navbar({ sections, resumeHref }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (key) => {
    sections[key]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-slate-950/70 shadow-glass backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="font-display text-lg font-semibold tracking-[0.25em] text-white"
        >
          PARZ
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.key}
              type="button"
              onClick={() => handleNavClick(link.key)}
              className="text-sm font-medium text-white/70 transition hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <a
            href={resumeHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-cyan/15"
          >
            <ExternalLink size={16} />
            View Resume
          </a>
          <a
            href={resumeHref}
            download
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-2xl"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>

        <button
          type="button"
          className="rounded-full border border-white/10 bg-white/10 p-2 text-white md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.key}
                type="button"
                onClick={() => handleNavClick(link.key)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-white/80 transition hover:bg-white/10"
              >
                {link.label}
              </button>
            ))}
            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-cyan/30 bg-white/10 px-4 py-3 text-sm font-semibold text-white"
            >
              View Resume
            </a>
            <a
              href={resumeHref}
              download
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-semibold text-slate-950"
            >
              Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
