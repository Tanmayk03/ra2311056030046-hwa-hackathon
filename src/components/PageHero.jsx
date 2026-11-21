import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PageHero({ eyebrow, title, intro, children }) {
  return (
    <section className="relative overflow-hidden border-b border-brand-light/70 bg-white">
      <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-brand-light/60 blur-3xl" />
      <div className="page-shell relative py-14 sm:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full text-sm font-bold text-brand-blue transition hover:text-brand-navy"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Home
        </Link>
        <p className="eyebrow mt-8">{eyebrow}</p>
        <h1 className="section-title mt-3 max-w-3xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-navy/75">{intro}</p>}
        {children}
      </div>
    </section>
  )
}
