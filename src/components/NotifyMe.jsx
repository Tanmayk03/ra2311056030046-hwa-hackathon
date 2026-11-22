import { useState } from 'react'
import { Bell, CheckCircle2 } from 'lucide-react'

export default function NotifyMe({ product, compact = false }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setStatus('')
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Please try again.')
      }
      setStatus('Thanks — we’ll let you know. (Demo only; no email is sent.)')
      setEmail('')
    } catch (error) {
      setStatus(error.message || 'Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const baseClass = compact
    ? 'inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand-blue px-4 py-2.5 text-sm font-bold text-brand-blue transition hover:bg-brand-blue hover:text-white'
    : 'btn-primary'

  if (!open) {
    return (
      <button type="button" className={baseClass} onClick={() => setOpen(true)}>
        <Bell size={compact ? 15 : 18} aria-hidden="true" /> coming soon / notify me
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-brand-light bg-white p-4">
      <label htmlFor={`notify-${product}`} className="text-sm font-extrabold text-brand-navy">
        Get a note when {product} is ready
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id={`notify-${product}`}
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-full border border-brand-light bg-brand-pale px-4 py-2.5 text-sm"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60"
        >
          {submitting ? 'Sending…' : 'Notify me'}
        </button>
      </div>
      {status && (
        <p className="mt-2 flex items-center gap-2 text-xs font-bold text-brand-blue" role="status">
          <CheckCircle2 size={14} aria-hidden="true" /> {status}
        </p>
      )}
      <button
        type="button"
        onClick={() => {
          setOpen(false)
          setStatus('')
        }}
        className="mt-2 text-xs font-bold text-brand-navy/60 underline underline-offset-4"
      >
        Cancel
      </button>
    </form>
  )
}
