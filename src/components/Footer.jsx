import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About us' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
  { to: '/cart', label: 'Cart' },
]

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-navy text-white">
      <div className="page-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <img src="/logo.png" alt="Happy While Away" className="h-auto w-56" />
          <p className="mt-3 max-w-sm text-brand-light/90">
            A little adventure while you&apos;re away. Premium dog enrichment for curious companions.
          </p>
        </div>
        <div>
          <h2 className="eyebrow text-brand-light">Explore</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link className="rounded text-white/90 hover:text-brand-cyan" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="eyebrow text-brand-light">A note on this store</h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-light/90">
            This is a demonstration storefront. Product details and prices shown here are placeholders until confirmed.
            No real payment is processed.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-brand-light/70">
        © {new Date().getFullYear()} Happy While Away
      </div>
    </footer>
  )
}
