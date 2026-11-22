import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { productOrder, realProducts } from '../data/realProducts.js'
import NotifyMe from './NotifyMe.jsx'

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
          {productOrder.map((slug) => {
            const product = realProducts[slug]
            return (
              <article key={slug} className="card-surface flex h-full flex-col overflow-hidden">
                <Link to={`/products/${slug}`} className="block bg-white p-4">
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
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy/70">
                    {product.oneLiner}
                  </p>
                  <div className="mt-auto flex flex-col gap-3 pt-6">
                    <Link to={`/products/${slug}`} className="btn-primary w-full text-sm">
                      Explore {product.name} <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                    <NotifyMe product={product.name} compact />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
