import { Link } from 'react-router-dom'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import PlaceholderMedia from '../components/PlaceholderMedia.jsx'
import { useCart } from '../context/CartContext.jsx'
import { categoryLabel, formatPrice } from '../data/catalog.js'

export default function Cart() {
  const { items, count, updateQuantity, removeItem, clearCart } = useCart()

  const knownTotal = items.reduce(
    (total, item) => total + (item.price == null ? 0 : item.price * item.quantity),
    0,
  )
  const hasKnownPrices = items.some((item) => item.price != null)

  return (
    <>
      <PageHero
        eyebrow="Your basket"
        title="Your cart"
        intro="Review your placeholder items and adjust quantities. Your cart is saved in this browser."
      />

      <section className="page-shell py-12 sm:py-16">
        {items.length === 0 ? (
          <div className="card-surface p-12 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-pale text-brand-blue">
              <ShoppingBag size={28} aria-hidden="true" />
            </span>
            <p className="mt-6 font-display text-2xl font-extrabold">Your cart is empty</p>
            <p className="mt-2 text-brand-navy/70">
              Browse the placeholder collection and add an item to see the cart in action.
            </p>
            <Link to="/shop" className="btn-primary mt-8">
              Browse the shop <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="font-extrabold text-brand-navy" aria-live="polite">
                  {count} {count === 1 ? 'item' : 'items'} in your cart
                </p>
                <button
                  type="button"
                  onClick={clearCart}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy/70 transition hover:text-brand-blue"
                >
                  <Trash2 size={16} aria-hidden="true" /> Clear cart
                </button>
              </div>

              <ul className="mt-5 space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="card-surface flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:p-5">
                    <PlaceholderMedia className="h-28 w-full shrink-0 rounded-2xl sm:w-36" />
                    <div className="flex-1">
                      <p className="eyebrow">{categoryLabel(item.category)}</p>
                      <h2 className="mt-1 font-display text-lg font-extrabold">{item.name}</h2>
                      <p className="mt-1 text-sm font-bold text-brand-blue">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="inline-flex items-center rounded-full border border-brand-light bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-l-full transition hover:bg-brand-pale"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={16} aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center font-extrabold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-r-full transition hover:bg-brand-pale"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={16} aria-hidden="true" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-sm font-bold text-brand-navy/60 underline underline-offset-4 transition hover:text-brand-blue"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="card-surface h-fit p-6 sm:p-7 lg:sticky lg:top-28">
              <h2 className="font-display text-2xl font-extrabold">Order summary</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-brand-navy/70">Items</dt>
                  <dd className="font-extrabold">{count}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-brand-navy/70">Subtotal</dt>
                  <dd className="font-extrabold">
                    {hasKnownPrices ? `$${knownTotal.toFixed(2)}` : 'Price to be confirmed'}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-brand-navy/70">Delivery</dt>
                  <dd className="font-extrabold">To be confirmed</dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-brand-light pt-5">
                <p className="text-sm text-brand-navy/70">Total</p>
                <p className="mt-1 font-display text-2xl font-extrabold text-brand-blue">
                  {hasKnownPrices ? `$${knownTotal.toFixed(2)}` : 'To be confirmed'}
                </p>
              </div>
              <Link to="/checkout" className="btn-primary mt-7 w-full">
                Continue to demo checkout <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <p className="mt-4 text-xs leading-relaxed text-brand-navy/60">
                Demo checkout only. No payment is taken and no order is sent to a real store.
              </p>
            </aside>
          </div>
        )}
      </section>
    </>
  )
}
