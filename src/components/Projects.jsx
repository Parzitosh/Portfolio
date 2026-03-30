import { forwardRef } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import SectionHeading from './SectionHeading'

const Projects = forwardRef(function Projects({ projects }, ref) {
  return (
    <section id="projects" ref={ref} data-reveal className="px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work spanning blockchain infrastructure, AI workflows, and backend-led product engineering."
          align="center"
        />

        <div id="projects-grid" className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              data-project-card
              className="group gpu-card rounded-[2rem] border border-white/12 bg-white/10 p-6 shadow-glass backdrop-blur-2xl transition duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan/30 hover:bg-white/15 hover:shadow-[0_0_28px_rgba(34,211,238,0.12)]"
            >
              <div className="flex h-full flex-col">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
                    {project.category}
                  </span>
                  <span className="text-sm text-white/40">{project.year}</span>
                </div>

                <h3 className="font-display text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-white/65">{project.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-2 text-xs font-medium text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {project.liveDemo ? (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition duration-200 hover:shadow-xl"
                    >
                      Live Demo
                      <ArrowUpRight size={16} />
                    </a>
                  ) : null}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-white/15"
                  >
                    GitHub
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Projects
