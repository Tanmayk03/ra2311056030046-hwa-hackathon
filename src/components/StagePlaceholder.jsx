import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function StagePlaceholder({ title, note }) {
  return (
    <section className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Coming in the next stage</p>
      <h1 className="section-title mt-3">{title}</h1>
      <p className="mt-4 max-w-xl text-lg text-brand-navy/70">
        {note ?? 'This page is being built next. The navigation and homepage are ready.'}
      </p>
      <Link to="/" className="btn-primary mt-8">
        <ArrowLeft size={18} aria-hidden="true" /> Back to home
      </Link>
    </section>
  )
}
