import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { categoryLabel, formatPrice } from '../data/catalog.js'
import { useCart } from '../context/CartContext.jsx'
import PlaceholderMedia from './PlaceholderMedia.jsx'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1">
      <PlaceholderMedia className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow">{categoryLabel(product.category)}</p>
          <span className="rounded-full bg-brand-pale px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-widest text-brand-blue">
            Placeholder
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl font-extrabold text-brand-navy">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">{product.description}</p>
        <p className="mt-4 font-bold text-brand-blue">{formatPrice(product.price)}</p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            to={`/products/${product.id}`}
            className="btn-ghost flex-1 text-sm"
            aria-label={`See details for ${product.name}`}
          >
            See details
          </Link>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-pale px-4 py-3 text-sm font-bold text-brand-navy transition hover:bg-brand-blue hover:text-white"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={16} aria-hidden="true" /> Add
          </button>
        </div>
      </div>
    </article>
  )
}
