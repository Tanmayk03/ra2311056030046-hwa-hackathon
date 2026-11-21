import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import PlaceholderMedia from '../components/PlaceholderMedia.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useCart } from '../context/CartContext.jsx'
import { categoryLabel, formatPrice, getProduct, products } from '../data/catalog.js'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <>
        <PageHero
          eyebrow="Not found"
          title="We couldn't find that product"
          intro="The item may have been moved, or this placeholder link may be out of date."
        />
        <div className="page-shell py-16">
          <Link to="/shop" className="btn-primary">
            <ArrowLeft size={18} aria-hidden="true" /> Back to shop
          </Link>
        </div>
      </>
    )
  }

  const related = products.filter((item) => item.id !== product.id).slice(0, 2)

  function handleAdd() {
    addItem(product, quantity)
    setAdded(true)
  }

  return (
    <>
      <PageHero eyebrow={categoryLabel(product.category)} title={product.name} />

      <section className="page-shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <PlaceholderMedia className="aspect-[4/3] rounded-4xl border border-brand-light/70 shadow-soft" />

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-brand-pale px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-brand-blue">
                Placeholder product
              </span>
              <span className="text-sm font-bold text-brand-navy/60">{categoryLabel(product.category)}</span>
            </div>

            <p className="mt-6 font-display text-3xl font-extrabold text-brand-navy">
              {formatPrice(product.price)}
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-brand-navy/75">{product.description}</p>

            <div className="mt-8 rounded-3xl border border-brand-light bg-brand-pale/60 p-5 text-sm leading-relaxed text-brand-navy/75">
              <p className="font-extrabold text-brand-navy">Before you order</p>
              <p className="mt-1">
                Product details and pricing are unconfirmed placeholders. The demo checkout does not
                take payment or arrange delivery.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-full border border-brand-light bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-l-full text-brand-navy transition hover:bg-brand-pale"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} aria-hidden="true" />
                </button>
                <span className="w-10 text-center font-extrabold" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.min(99, value + 1))}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-r-full text-brand-navy transition hover:bg-brand-pale"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} aria-hidden="true" />
                </button>
              </div>

              <button type="button" onClick={handleAdd} className="btn-primary">
                <ShoppingBag size={18} aria-hidden="true" /> Add to cart
              </button>

              {added && (
                <span className="inline-flex items-center gap-2 font-bold text-brand-blue" role="status">
                  <Check size={18} aria-hidden="true" /> Added
                </span>
              )}
            </div>

            <Link to="/cart" className="mt-6 inline-block font-bold text-brand-blue underline underline-offset-4">
              View cart
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">More placeholders</p>
              <h2 className="section-title mt-3 text-2xl sm:text-3xl">Keep exploring</h2>
            </div>
            <Link to="/shop" className="btn-ghost">
              Shop all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
