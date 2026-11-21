import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2, ShoppingBag } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import { formatPrice } from '../data/catalog.js'

export default function OrderConfirmation() {
  const { state } = useLocation()
  const order = state?.order

  if (!order) {
    return (
      <>
        <PageHero
          eyebrow="Order confirmation"
          title="No recent demo order found"
          intro="Order details are shown here right after you place a demo order. They are not stored after you leave this page."
        />
        <div className="page-shell py-16">
          <Link to="/shop" className="btn-primary">
            <ShoppingBag size={18} aria-hidden="true" /> Browse the shop
          </Link>
        </div>
      </>
    )
  }

  const items = Array.isArray(order.items) ? order.items : []

  return (
    <>
      <PageHero
        eyebrow="Demo order placed"
        title="Thanks — your demo order is in"
        intro="This confirmation is for demonstration only. No payment was taken and no real order was sent."
      />

      <section className="page-shell py-12 sm:py-16">
        <div className="card-surface mx-auto max-w-2xl p-7 sm:p-10">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-pale text-brand-blue">
            <CheckCircle2 size={32} aria-hidden="true" />
          </span>
          <p className="eyebrow mt-6">Demo reference</p>
          <p className="mt-2 font-display text-3xl font-extrabold tracking-tight text-brand-navy">
            {order.orderId ?? order.reference ?? 'HWA-DEMO'}
          </p>

          <div className="mt-8 rounded-3xl bg-brand-pale/70 p-5">
            <p className="text-sm font-extrabold text-brand-navy">
              {order.message ?? 'Demo order received. No payment was processed.'}
            </p>
            {order.receivedAt && (
              <p className="mt-1 text-sm text-brand-navy/70">
                Received {new Date(order.receivedAt).toLocaleString()}
              </p>
            )}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl font-extrabold">Items in this demo order</h2>
            {items.length > 0 ? (
              <ul className="mt-4 divide-y divide-brand-light">
                {items.map((item, index) => (
                  <li key={item.id ?? index} className="flex justify-between gap-4 py-3 text-sm">
                    <span className="text-brand-navy/80">
                      {item.name} <span className="font-bold">× {item.quantity}</span>
                    </span>
                    <span className="shrink-0 font-bold text-brand-blue">{formatPrice(item.price)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-brand-navy/70">No items were included in this demo order.</p>
            )}
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/shop" className="btn-primary">
              Keep browsing
            </Link>
            <Link to="/" className="btn-ghost">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
