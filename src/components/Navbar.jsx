import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

function navClass({ isActive }) {
  return `rounded-full px-3 py-2 text-sm font-bold transition-colors sm:text-base ${
    isActive
      ? 'bg-brand-blue text-white'
      : 'text-brand-navy/80 hover:bg-brand-pale hover:text-brand-navy'
  }`
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()

  useEffect(() => {
    setOpen(false)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-brand-light/70 bg-white/90 backdrop-blur-md">
      <div className="page-shell flex h-20 items-center justify-between gap-4 py-3">
        <Link
          to="/"
          className="inline-flex items-center rounded-2xl bg-brand-pale px-3 py-1.5"
          aria-label="Happy While Away home"
        >
          <img
            src="/logo.png"
            alt="Happy While Away"
            className="h-auto w-[120px] sm:w-[140px]"
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-full border border-brand-light bg-brand-pale px-4 py-2 font-bold text-brand-navy transition hover:border-brand-blue"
            aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
          >
            <ShoppingBag size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-cyan px-1 text-xs font-extrabold text-white">
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-light text-brand-navy md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        hidden={!open}
        className="border-t border-brand-light bg-white md:hidden"
      >
        <div className="page-shell flex flex-col gap-1 py-4">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navClass} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
