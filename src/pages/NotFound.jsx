import { Link } from 'react-router-dom'
import { PawPrint } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <PawPrint size={56} className="text-brand-cyan" aria-hidden="true" />
      <p className="eyebrow mt-6">404</p>
      <h1 className="section-title mt-3">This trail went quiet.</h1>
      <p className="mt-4 max-w-md text-lg text-brand-navy/70">
        We couldn&apos;t find that page. Let&apos;s get you back to the good stuff.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </section>
  )
}
