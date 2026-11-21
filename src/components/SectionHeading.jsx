export default function SectionHeading({ eyebrow, title, children, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-title mt-3">{title}</h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-brand-navy/75">{children}</p>}
    </div>
  )
}
