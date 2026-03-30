function SectionHeading({ eyebrow, title, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={alignment}>
      <p className="text-sm uppercase tracking-[0.35em] text-cyan/75">{eyebrow}</p>
      <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
        {title}
      </h2>
    </div>
  )
}

export default SectionHeading
