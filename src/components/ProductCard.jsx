import { Link } from 'react-router-dom'
import { formatPrice } from '../data/catalog.js'

export default function ProductCard({ product }) {
  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-brand-pale to-brand-light">
        <span className="rounded-full bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-brand-blue">
          Placeholder image
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">Placeholder product</p>
        <h3 className="mt-2 font-display text-xl font-extrabold text-brand-navy">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">{product.description}</p>
        <p className="mt-4 font-bold text-brand-blue">{formatPrice(product.price)}</p>
        <Link
          to={`/products/${product.id}`}
          className="btn-ghost mt-5 w-full text-sm"
          aria-label={`See details for ${product.name}`}
        >
          See details
        </Link>
      </div>
    </article>
  )
}
