import { useState } from 'react'
import { CheckCircle2, Mail } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'The demo message could not be sent. Please try again.')
      }
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch (requestError) {
      setError(requestError.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Say hello"
        title="Contact"
        intro="Questions about the site or the placeholder range? Send a demo message using the form below."
      />

      <section className="page-shell py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <form onSubmit={handleSubmit} className="card-surface p-7 sm:p-9">
            <h2 className="font-display text-2xl font-extrabold">Send a demo message</h2>
            <p className="mt-2 text-sm text-brand-navy/70">
              This form demonstrates a working submission. No email is sent and no details are stored.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="text-sm font-extrabold">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={updateField}
                  placeholder="Your name"
                  className="mt-2 w-full rounded-2xl border border-brand-light bg-white px-4 py-3"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm font-extrabold">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-brand-light bg-white px-4 py-3"
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="contact-message" className="text-sm font-extrabold">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows="6"
                required
                value={form.message}
                onChange={updateField}
                placeholder="What's on your mind?"
                className="mt-2 w-full resize-y rounded-2xl border border-brand-light bg-white px-4 py-3"
              />
            </div>

            {error && (
              <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700" role="alert">
                {error}
              </p>
            )}

            {sent && (
              <p className="mt-5 flex items-center gap-2 rounded-2xl bg-brand-pale px-4 py-3 text-sm font-bold text-brand-blue" role="status">
                <CheckCircle2 size={18} aria-hidden="true" /> Demo message received. No email was sent.
              </p>
            )}

            <button type="submit" disabled={submitting} className="btn-primary mt-8 disabled:cursor-wait disabled:opacity-60">
              {submitting ? 'Sending…' : 'Send demo message'}
            </button>
          </form>

          <aside className="card-surface h-fit p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pale text-brand-blue">
              <Mail size={22} aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-display text-xl font-extrabold">A note on contact</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">
              No contact address has been supplied for this demo, so this form does not send email.
              It simply shows that the submission works end to end.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brand-navy/70">
              Product details and prices are still placeholders, so questions about specific items
              cannot be answered yet.
            </p>
          </aside>
        </div>
      </section>
    </>
  )
}
