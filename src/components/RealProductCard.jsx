import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import NotifyMe from './NotifyMe.jsx'

export default function RealProductCard({ product }) {
  return (
    <article className="card-surface flex h-full flex-col overflow-hidden">
      <Link to={`/products/${product.slug}`} className="block bg-white p-4">
        <img
          src={product.gallery[0].src}
          alt={product.gallery[0].alt}
          loading="lazy"
          className="aspect-[4/3] w-full object-contain"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{product.category}</p>
        <h3 className="mt-2 font-display text-2xl font-extrabold">{product.name}</h3>
        <p className="mt-1 font-bold text-brand-blue">{product.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-brand-navy/70">{product.oneLiner}</p>
        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Link to={`/products/${product.slug}`} className="btn-primary w-full text-sm">
            Explore {product.name} <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <NotifyMe product={product.name} compact />
        </div>
      </div>
    </article>
  )
}
