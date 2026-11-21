import { PawPrint } from 'lucide-react'

export default function PlaceholderMedia({ label = 'Placeholder image', className = '' }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-pale via-brand-light to-brand-pale ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/50 blur-2xl" />
      <div className="absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-brand-cyan/20 blur-2xl" />
      <div className="relative flex flex-col items-center gap-2 rounded-3xl border border-white/80 bg-white/75 px-5 py-4 text-center shadow-soft">
        <PawPrint size={26} className="text-brand-blue" aria-hidden="true" />
        <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-brand-navy/70">
          {label}
        </span>
      </div>
    </div>
  )
}
