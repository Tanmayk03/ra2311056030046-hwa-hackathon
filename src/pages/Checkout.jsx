import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, LockKeyhole, ShoppingBag } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../data/catalog.js'

export default function Checkout() {
  const { items, count, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', note: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (items.length === 0) {
      setError('Add a placeholder item to your cart before checking out.')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { name: form.name.trim(), email: form.email.trim() },
          items,
          note: form.note.trim(),
          demo: true,
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'The demo order could not be placed. Please try again.')
      }

      clearCart()
      navigate('/order-confirmation', { state: { order: data }, replace: true })
    } catch (requestError) {
      setError(requestError.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Demo checkout"
        title="Checkout"
        intro="This is a prototype checkout. No payment is taken, no personal details are stored, and no real order is placed."
      />

      <section className="page-shell py-12 sm:py-16">
        {items.length === 0 ? (
          <div className="card-surface p-12 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-pale text-brand-blue">
              <ShoppingBag size={28} aria-hidden="true" />
            </span>
            <p className="mt-6 font-display text-2xl font-extrabold">Nothing to check out yet</p>
            <p className="mt-2 text-brand-navy/70">Add a placeholder item to your cart first.</p>
            <Link to="/shop" className="btn-primary mt-8">
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8">
              <h2 className="font-display text-2xl font-extrabold">Your details</h2>
              <p className="mt-2 text-sm text-brand-navy/70">
                These details are used only to demonstrate the form. They are not saved.
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="checkout-name" className="text-sm font-extrabold">
                    Name
                  </label>
                  <input
                    id="checkout-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={updateField}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-2xl border border-brand-light bg-white px-4 py-3 text-brand-navy"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-email" className="text-sm font-extrabold">
                    Email
                  </label>
                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={updateField}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-2xl border border-brand-light bg-white px-4 py-3 text-brand-navy"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="checkout-note" className="text-sm font-extrabold">
                  Note <span className="font-medium text-brand-navy/60">(optional)</span>
                </label>
                <textarea
                  id="checkout-note"
                  name="note"
                  rows="4"
                  value={form.note}
                  onChange={updateField}
                  placeholder="Anything you'd like to note?"
                  className="mt-2 w-full resize-y rounded-2xl border border-brand-light bg-white px-4 py-3 text-brand-navy"
                />
              </div>

              {error && (
                <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700" role="alert">
                  {error}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button type="submit" disabled={submitting} className="btn-primary disabled:cursor-wait disabled:opacity-60">
                  {submitting ? 'Placing demo order…' : 'Place demo order'}
                </button>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy/70">
                  <LockKeyhole size={16} aria-hidden="true" /> No payment details needed
                </span>
              </div>

              <Link
                to="/cart"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-blue underline underline-offset-4"
              >
                <ArrowLeft size={16} aria-hidden="true" /> Back to cart
              </Link>
            </form>

            <aside className="card-surface h-fit p-6 sm:p-7 lg:sticky lg:top-28">
              <h2 className="font-display text-2xl font-extrabold">Order summary</h2>
              <ul className="mt-5 space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between gap-4 text-sm">
                    <span className="text-brand-navy/80">
                      {item.name} <span className="font-bold">× {item.quantity}</span>
                    </span>
                    <span className="shrink-0 font-bold text-brand-navy">{formatPrice(item.price)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex justify-between gap-4 border-t border-brand-light pt-5 text-sm font-extrabold">
                <span>{count} {count === 1 ? 'item' : 'items'}</span>
                <span className="text-brand-blue">Price to be confirmed</span>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-brand-navy/60">
                Product details, pricing and delivery are still to be confirmed. This demo only shows
                how checkout works.
              </p>
            </aside>
          </div>
        )}
      </section>
    </>
  )
}
