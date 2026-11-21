import { Heart, Play, ShieldCheck, Sparkles } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

const values = [
  {
    icon: Sparkles,
    title: 'Playful',
    copy: 'Curiosity and a little mischief are part of the fun. Enrichment should feel like an invitation, not a chore.',
  },
  {
    icon: Heart,
    title: 'Premium',
    copy: 'Considered design and a friendly, modern feel for companions who deserve the good stuff.',
  },
  {
    icon: Play,
    title: 'Everyday adventure',
    copy: 'Small moments of discovery can make the hours apart a little more interesting.',
  },
  {
    icon: ShieldCheck,
    title: 'Trustworthy',
    copy: 'Clear information, honest placeholders and no invented claims about products or delivery.',
  },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="Made for the moments you're not there"
        intro="Happy While Away is a premium dog enrichment brand built around one simple idea: the time apart can still hold a little adventure."
      />

      <section className="page-shell py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="The idea" title="A little adventure while you're away">
              Dogs notice the small things — the door, the lead, the quiet house. We think those
              moments can be met with something playful and thoughtful instead.
            </SectionHeading>
            <p className="mt-6 leading-relaxed text-brand-navy/75">
              This site is a demonstration storefront. The collection, photography and prices shown
              here are placeholders until real product information is confirmed. What is real is the
              feeling behind the brand: modern, friendly and quietly devoted to curious companions.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-brand-light/50 blur-2xl" />
            <div className="relative rounded-4xl border border-brand-light bg-white p-9 shadow-soft">
              <p className="font-display text-3xl font-extrabold leading-snug text-brand-navy">
                “A little adventure while you&apos;re away.”
              </p>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
                Happy While Away
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="page-shell">
          <SectionHeading eyebrow="What we value" title="Playful, premium, friendly" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="card-surface p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pale text-brand-blue">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/70">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
