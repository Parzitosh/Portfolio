import { forwardRef, useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import gsap from 'gsap'
import { Github, Linkedin, Mail, Send } from 'lucide-react'
import SectionHeading from './SectionHeading'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
}

const contactEmail = 'jamwalparitosh@gmail.com'

const initialFormState = {
  name: '',
  email: '',
  message: '',
}

const initialErrors = {
  name: '',
  email: '',
  message: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const Contact = forwardRef(function Contact({ siteConfig }, ref) {
  const [formState, setFormState] = useState(initialFormState)
  const [errors, setErrors] = useState(initialErrors)
  const [submitState, setSubmitState] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const formRef = useRef(null)
  const statusRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion) return

      const fields = gsap.utils.toArray('[data-contact-field]')
      gsap.fromTo(
        fields,
        { opacity: 0, y: 18, force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [ref])

  useEffect(() => {
    if (!statusRef.current || submitState === 'idle') return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const animation = gsap.fromTo(
      statusRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
    )

    return () => animation.kill()
  }, [submitState])

  const validateForm = () => {
    const nextErrors = {
      name: formState.name.trim() ? '' : 'Name is required.',
      email: '',
      message: '',
    }

    if (!formState.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailPattern.test(formState.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!formState.message.trim()) {
      nextErrors.message = 'Message is required.'
    } else if (formState.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters.'
    }

    setErrors(nextErrors)
    return !Object.values(nextErrors).some(Boolean)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    if (submitState !== 'idle') setSubmitState('idle')
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      setSubmitState('error')
      setErrorMessage('Please fix the form errors and try again.')
      return
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setSubmitState('error')
      setErrorMessage('EmailJS environment variables are missing. Add them to .env and restart the dev server.')
      return
    }

    try {
      setSubmitState('sending')
      setErrorMessage('')
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formState.name.trim(),
          from_email: formState.email.trim(),
          message: formState.message.trim(),
        },
        publicKey,
      )
      setSubmitState('success')
      setFormState(initialFormState)
      setErrors(initialErrors)
    } catch (error) {
      setSubmitState('error')
      const detail = typeof error?.text === 'string' && error.text ? ` (${error.text})` : ''
      setErrorMessage(`EmailJS could not send the message${detail}. Verify your service, template, and public key.`)
    }
  }

  return (
    <section id="contact" ref={ref} data-reveal className="px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="rounded-[2rem] border border-white/12 bg-white/10 p-8 shadow-glass backdrop-blur-2xl">
          <SectionHeading eyebrow="Contact" title="Open to backend, blockchain, and product engineering conversations." />
          <p className="mt-6 text-base leading-8 text-slate-300">
            If you are hiring, collaborating, or exploring a technical build, feel free to reach
            out. I’m especially interested in backend systems, blockchain products, and applied AI
            tools with real user value.
          </p>

          <a
            href={`mailto:${contactEmail}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-4 py-2 text-sm font-medium text-cyan-50 transition hover:border-cyan/40 hover:bg-cyan/15"
          >
            <Mail size={16} />
            {contactEmail}
          </a>

          <div className="mt-8 space-y-4">
            {siteConfig.socialLinks.map((link) => {
              const Icon = iconMap[link.icon]

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-4 transition hover:border-cyan/30 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-2xl border border-white/10 bg-white/10 p-3 text-cyan-100">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-white">{link.label}</p>
                      <p className="text-sm text-white/50">{link.displayText}</p>
                    </div>
                  </div>
                  <span className="text-sm text-cyan-100">Visit</span>
                </a>
              )
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/12 bg-slate-950/55 p-8 shadow-glass backdrop-blur-2xl">
          <form ref={formRef} className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div data-contact-field className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/70">Your Name</span>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  className={`w-full rounded-2xl border bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:bg-white/10 ${
                    errors.name ? 'border-rose-400/60' : 'border-white/10 focus:border-cyan/30'
                  }`}
                />
                {errors.name ? (
                  <span className="mt-2 block text-sm text-rose-300">{errors.name}</span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/70">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  className={`w-full rounded-2xl border bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:bg-white/10 ${
                    errors.email ? 'border-rose-400/60' : 'border-white/10 focus:border-cyan/30'
                  }`}
                />
                {errors.email ? (
                  <span className="mt-2 block text-sm text-rose-300">{errors.email}</span>
                ) : null}
              </label>
            </div>

            <label data-contact-field className="block">
              <span className="mb-2 block text-sm font-medium text-white/70">Message</span>
              <textarea
                name="message"
                rows="6"
                value={formState.message}
                onChange={handleChange}
                placeholder="Tell me about the role, project, or collaboration."
                aria-invalid={Boolean(errors.message)}
                className={`w-full rounded-[1.5rem] border bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:bg-white/10 ${
                  errors.message ? 'border-rose-400/60' : 'border-white/10 focus:border-cyan/30'
                }`}
              />
              {errors.message ? (
                <span className="mt-2 block text-sm text-rose-300">{errors.message}</span>
              ) : null}
            </label>

            <button
              data-contact-field
              type="submit"
              disabled={submitState === 'sending'}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:scale-100"
            >
              {submitState === 'sending'
                ? 'Sending...'
                : submitState === 'success'
                  ? 'Message Sent ✅'
                  : submitState === 'error'
                    ? 'Failed to send ❌'
                    : 'Send Message'}
              <Send size={18} />
            </button>

            {submitState === 'success' ? (
              <p
                ref={statusRef}
                className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"
              >
                Message sent successfully. I&apos;ll get back to you at the email you provided.
              </p>
            ) : null}

            {submitState === 'error' ? (
              <p
                ref={statusRef}
                className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm leading-6 text-rose-100"
              >
                {errorMessage || 'I couldn\'t send the message.'} You can also email{' '}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-semibold text-white underline underline-offset-4"
                >
                  {contactEmail}
                </a>
                {' '}directly.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  )
})

export default Contact
