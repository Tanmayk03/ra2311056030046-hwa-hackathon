import { useEffect, useRef, useState } from 'react'
import sitting from '../assets/retriever/golden-retriever.svg?raw'
import standing from '../assets/retriever/golden-retriever-standing-wag.svg?raw'
import headTilt from '../assets/retriever/golden-retriever-head-tilt.svg?raw'
import lying from '../assets/retriever/golden-retriever-lying.svg?raw'
import playful from '../assets/retriever/golden-retriever-playful.svg?raw'
import '../styles/away-behaviours.css'

const clean = (svg) => svg.replace(/^<\?xml[^>]*\?>\s*/, '')

const behaviours = [
  {
    id: 'exploring',
    title: 'Exploring',
    copy: 'A nose-led wander turns an ordinary room into new territory.',
    pose: standing,
  },
  {
    id: 'searching',
    title: 'Searching for food',
    copy: 'Following a scent or working something out gives their clever brain a job.',
    pose: headTilt,
  },
  {
    id: 'observing',
    title: 'Observing',
    copy: 'A watch by the window, a familiar sound, a quiet check-in with their world.',
    pose: sitting,
  },
  {
    id: 'playing',
    title: 'Playing',
    copy: 'A favourite toy or a sudden burst of zoomies turns waiting into movement.',
    pose: playful,
  },
  {
    id: 'resting',
    title: 'Resting',
    copy: 'After the excitement, a soft spot lets them settle and recharge.',
    pose: lying,
  },
]

function BehaviourCard({ behaviour, index }) {
  const [active, setActive] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  function react() {
    setActive(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setActive(false), 1000)
  }

  return (
    <button
      type="button"
      className={`hwa-card${active ? ' is-active' : ''}`}
      data-behaviour={behaviour.id}
      onPointerEnter={react}
      onFocus={react}
      onClick={react}
      aria-label={`${behaviour.title}. ${behaviour.copy}`}
    >
      <span className="hwa-card__art">
        <span className="hwa-card__number">{String(index + 1).padStart(2, '0')}</span>
        <span className="hwa-card__svg" dangerouslySetInnerHTML={{ __html: clean(behaviour.pose) }} />
      </span>
      <span className="hwa-card__body">
        <span className="hwa-card__title">{behaviour.title}</span>
        <span className="hwa-card__copy">{behaviour.copy}</span>
        <span className="hwa-card__hint">Hover or tap to say hello</span>
      </span>
    </button>
  )
}

export default function AwayBehaviours() {
  return (
    <section id="away" className="bg-white py-20 sm:py-24">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">A day in their life</p>
          <h2 className="section-title mt-3">What Happens When You&apos;re Away?</h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-navy/75">
            Dogs fill the hours in their own small ways. Here are five everyday moments our retriever
            knows well — hover or tap each one to see them react.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {behaviours.map((behaviour, index) => (
            <BehaviourCard key={behaviour.id} behaviour={behaviour} index={index} />
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-4xl bg-brand-navy px-7 py-11 text-center text-white sm:px-12 sm:py-14">
          <p className="eyebrow text-brand-light">A little more, while you&apos;re away</p>
          <p className="mx-auto mt-5 max-w-3xl font-display text-2xl font-extrabold leading-snug sm:text-3xl">
            They can&apos;t spend every moment with you. But they can spend more moments doing what
            dogs love — following a scent, solving a little puzzle, watching the world go by, then
            curling up somewhere safe.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-brand-light/90">
            More chances to explore. More permission to relax. That&apos;s the little adventure we
            believe every companion deserves.
          </p>
        </div>
      </div>
    </section>
  )
}
