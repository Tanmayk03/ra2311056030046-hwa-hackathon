import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import '../styles/hero-slideshow.css'

const slides = [
  {
    name: 'HABI',
    tagline: 'Their own place to rest, sniff, lick and play',
    image: '/products/hero/habi.webp',
  },
  {
    name: 'PAWCTRL',
    tagline: 'When they settle in, the light softens',
    image: '/products/hero/pawctrl.webp',
  },
  {
    name: 'VOX',
    tagline: 'Your voice, at home with them',
    image: '/products/hero/vox.webp',
  },
]

export default function HeroProductSlideshow() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // A slow, looping slideshow. Clicking a dot or pausing restarts the timer,
  // so every product gets the same time on screen.
  useEffect(() => {
    if (reduce || paused) return undefined
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % slides.length)
    }, 3500)
    return () => window.clearTimeout(timer)
  }, [active, paused, reduce])

  return (
    <div
      className="hero-slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="hero-slideshow-stage">
        {slides.map((slide, index) => (
          <div
            key={slide.name}
            className={`hero-slide${index === active ? ' is-active' : ''}`}
            aria-hidden={index !== active}
          >
            <div className="hero-slide-media">
              <img
                src={slide.image}
                alt={`${slide.name} concept render`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <span className="hero-slide-shadow" aria-hidden="true" />
            </div>
            <div className="hero-slide-label">
              <strong>{slide.name}</strong>
              <span>{slide.tagline}</span>
            </div>
          </div>
        ))}
      </div>

      {!reduce && (
        <div className="hero-slideshow-dots" role="group" aria-label="Choose a product">
          {slides.map((slide, index) => (
            <button
              key={slide.name}
              type="button"
              className={index === active ? 'is-active' : ''}
              onClick={() => setActive(index)}
              aria-label={`Show ${slide.name}`}
              aria-pressed={index === active}
            />
          ))}
        </div>
      )}
    </div>
  )
}
