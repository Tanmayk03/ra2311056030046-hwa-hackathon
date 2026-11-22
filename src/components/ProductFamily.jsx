import { productOrder, realProducts } from '../data/realProducts.js'
import RealProductCard from './RealProductCard.jsx'

export default function ProductFamily() {
  return (
    <section id="products" className="bg-brand-pale py-20 sm:py-24">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Meet the family</p>
          <h2 className="section-title mt-3">Three ways to make time apart a little richer</h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-navy/75">
            HABI, PAWCTRL and VOX are designed to work together — or stand on their own. Explore
            each one below. Product details are proposed and pricing is coming soon.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {productOrder.map((slug) => (
            <RealProductCard key={slug} product={realProducts[slug]} />
          ))}
        </div>
      </div>
    </section>
  )
}
