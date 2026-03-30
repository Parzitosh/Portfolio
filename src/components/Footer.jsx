import { Github, Linkedin } from 'lucide-react'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
}

function Footer({ siteConfig }) {
  return (
    <footer className="px-5 pb-10 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 rounded-[2rem] border border-white/10 bg-white/5 px-6 py-5 text-center backdrop-blur-xl md:flex-row md:text-left">
        <p className="text-sm text-white/55">
          © {new Date().getFullYear()} {siteConfig.name}. Built with React, Tailwind CSS, and
          GSAP.
        </p>

        <div className="flex items-center gap-3">
          {siteConfig.socialLinks.map((link) => {
            const Icon = iconMap[link.icon]

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="rounded-full border border-white/10 bg-slate-950/50 p-3 text-white/70 transition hover:-translate-y-1 hover:border-cyan/25 hover:text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]"
              >
                <Icon size={16} />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
