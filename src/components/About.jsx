import { forwardRef } from 'react'
import SectionHeading from './SectionHeading'

const About = forwardRef(function About({ skills, bio }, ref) {
  return (
    <section id="about" ref={ref} data-reveal className="px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/12 bg-white/10 p-8 shadow-glass backdrop-blur-2xl">
          <SectionHeading
            eyebrow="About"
            title="Engineering backend systems and blockchain products with a recruiter-friendly edge."
          />
          <p className="mt-6 text-base leading-8 text-slate-300">{bio}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-5">
              <p className="font-display text-lg font-semibold text-white">What I Build</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                DApps, AI-powered tools, backend-heavy platforms, and full-stack systems with clear
                technical tradeoffs.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-5">
              <p className="font-display text-lg font-semibold text-white">What I Bring</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                System design thinking, API craftsmanship, and problem solving grounded in practical
                implementation.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/12 bg-slate-950/50 p-8 shadow-glass backdrop-blur-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan/75">Core Skills</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan/30 hover:bg-white/10 hover:shadow-[0_0_35px_rgba(34,211,238,0.12)]"
              >
                <p className="font-display text-lg font-semibold text-white">{skill.name}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-2 text-xs font-medium text-white/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default About
