import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Sparkles, ShieldCheck } from 'lucide-react'
import DoorIntro from '../components/DoorIntro.jsx'
import RetrieverCompanion from '../components/RetrieverCompanion.jsx'
import HeroProductSlideshow from '../components/HeroProductSlideshow.jsx'
import AwayBehaviours from '../components/AwayBehaviours.jsx'
import ProductFamily from '../components/ProductFamily.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

const values = [
  {
    icon: Sparkles,
    title: 'Playful',
    copy: 'Curiosity and a little mischief are part of the fun.',
  },
  {
    icon: Heart,
    title: 'Premium',
    copy: 'Considered design for companions who deserve the good stuff.',
  },
  {
    icon: ShieldCheck,
    title: 'Friendly & trustworthy',
    copy: 'A brand built on care, clarity and honest information.',
  },
]

export default function Home() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      {!introDone && <DoorIntro onFinish={() => setIntroDone(true)} />}
      {introDone && <RetrieverCompanion />}

      <section id="hero" className="relative overflow-hidden bg-brand-navy text-white">
        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-blue/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-brand-cyan/20 blur-3xl" />
        <div className="page-shell relative grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="eyebrow text-brand-light">Premium dog enrichment</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              A little adventure while you&apos;re away.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-light/90">
              Happy While Away makes everyday moments more interesting for curious dogs —
              playful, thoughtful enrichment for the hours you&apos;re not together.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/shop" className="btn-primary">
                Shop now <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link to="/about" className="btn-ghost border-white text-white hover:bg-white hover:text-brand-navy">
                Our story
              </Link>
            </div>
          </div>

          <div className="relative flex min-h-80 items-end justify-center sm:min-h-96">
            <div className="absolute bottom-0 h-80 w-56 overflow-hidden rounded-t-[7rem] border-4 border-brand-cyan/50 bg-gradient-to-b from-[#ffdca5] via-[#ffeecb] to-white shadow-glow sm:h-96 sm:w-72">
              <HeroProductSlideshow />
            </div>
          </div>
        </div>
      </section>

      <AwayBehaviours />

      <ProductFamily />

      <section id="brand" className="bg-white py-20 sm:py-24">
        <div className="page-shell">
          <SectionHeading eyebrow="Who we are" title="Made for the moments you're not there" align="center">
            Our brand is playful, premium, modern, friendly and trustworthy — a little adventure
            for the dogs who wait by the door.
          </SectionHeading>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="card-surface p-7 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-pale text-brand-blue">
                  <Icon size={26} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-extrabold">{title}</h3>
                <p className="mt-2 text-brand-navy/70">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
