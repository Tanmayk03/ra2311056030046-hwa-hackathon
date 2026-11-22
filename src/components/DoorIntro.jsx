import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import runningDog from '../assets/retriever/golden-retriever-standing-wag.svg?raw'
import '../styles/door-intro.css'

const dogSvg = runningDog.replace(/^<\?xml[^>]*\?>\s*/, '')

function PawPrint({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <ellipse cx="12" cy="15.5" rx="5.1" ry="4.1" />
      <circle cx="5.4" cy="10.6" r="2.3" />
      <circle cx="9.8" cy="7" r="2.5" />
      <circle cx="14.4" cy="7" r="2.5" />
      <circle cx="18.7" cy="10.6" r="2.3" />
    </svg>
  )
}

export default function DoorIntro({ onFinish }) {
  const reduce = useReducedMotion()
  const [opening, setOpening] = useState(false)
  const [fading, setFading] = useState(false)
  const [hovering, setHovering] = useState(false)
  const enterRef = useRef(null)
  const timers = useRef([])
  const finished = useRef(false)

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    onFinish()
  }, [onFinish])

  const later = useCallback((fn, ms) => {
    timers.current.push(window.setTimeout(fn, ms))
  }, [])

  useEffect(() => {
    enterRef.current?.focus()
    return () => timers.current.forEach((timer) => window.clearTimeout(timer))
  }, [])

  function openDoor() {
    if (reduce) {
      setFading(true)
      later(finish, 320)
      return
    }
    setOpening(true)
    later(() => setFading(true), 950)
    later(finish, 1650)
  }

  function skip() {
    setFading(true)
    later(finish, 240)
  }

  function doorMotion(side) {
    return {
      style: {
        transformOrigin: side === 'left' ? 'left center' : 'right center',
        transformPerspective: 1200,
        backfaceVisibility: 'hidden',
      },
      animate: {
        rotateY: opening ? (side === 'left' ? 100 : -100) : 0,
        boxShadow: opening
          ? '0 26px 70px -12px rgba(2, 12, 24, 0.7)'
          : '0 12px 34px -12px rgba(2, 12, 24, 0.45)',
      },
      transition: { duration: reduce ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] },
    }
  }

  return (
    <motion.div
      className="door-intro"
      role="dialog"
      aria-modal="true"
      aria-label="Opening the Happy While Away storefront"
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: reduce ? 0.3 : 0.7, ease: 'easeOut' }}
    >
      <div className="door-interior" />

      <motion.div
        className="door-burst"
        initial={{ x: '-50%', y: '-50%', opacity: 0, scale: 0.3 }}
        animate={{
          x: '-50%',
          y: '-50%',
          opacity: opening ? 1 : 0,
          scale: opening ? 4.6 : 0.3,
        }}
        transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.55, ease: 'easeOut' }}
      />

      <motion.div className="door-panel door-panel-left" {...doorMotion('left')}>
        <span className="door-inset" />
        <span className="door-inset door-inset-inner" />
        <span className="door-nameplate">Happy While Away</span>
        <span className="door-handle door-handle-left" />
        <span className="door-knob door-knob-left" />
      </motion.div>

      <motion.div className="door-panel door-panel-right" {...doorMotion('right')}>
        <span className="door-inset" />
        <span className="door-inset door-inset-inner" />
        <span className="door-handle door-handle-right" />
        <span className="door-knob door-knob-right" />
      </motion.div>

      <div
        className={`door-seam-glow${hovering && !opening ? ' is-bright' : ''}${opening ? ' is-opening' : ''}`}
      />

      <motion.div
        className="intro-puppy"
        aria-hidden="true"
        initial={{ x: '-50%', y: '-50%', opacity: 0, scale: 0.2, rotate: 0 }}
        animate={
          opening && !reduce
            ? { x: '-150%', y: '-12%', opacity: 1, scale: 1.2, rotate: -7 }
            : { opacity: 0 }
        }
        transition={{ duration: 1, delay: opening && !reduce ? 0.45 : 0, ease: 'easeOut' }}
      >
        <div dangerouslySetInnerHTML={{ __html: dogSvg }} />
      </motion.div>

      <div className="door-ground" aria-hidden="true">
        <PawPrint className="door-paw door-paw-1" />
        <PawPrint className="door-paw door-paw-2" />
        <PawPrint className="door-paw door-paw-3" />
        <PawPrint className="door-paw door-paw-4" />
        <div className="door-mat">
          <span>Welcome</span>
        </div>
      </div>

      <motion.div
        className="door-content"
        animate={{ opacity: fading ? 0 : 1, y: fading ? -16 : 0 }}
        transition={{ duration: reduce ? 0.15 : 0.5 }}
      >
        <p className="eyebrow text-brand-light">Welcome to</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
          Happy While Away
        </h1>
        <p className="mt-4 max-w-md text-lg text-brand-light sm:text-xl">
          A little adventure while you&apos;re away.
        </p>
        <button
          ref={enterRef}
          type="button"
          onClick={openDoor}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
          className="btn-primary mt-9 bg-white text-brand-navy hover:bg-brand-pale"
        >
          Open the door <ArrowRight size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={skip}
          className="mt-5 rounded text-sm font-bold text-brand-light underline decoration-brand-light/50 underline-offset-4 hover:text-white"
        >
          Skip intro
        </button>
      </motion.div>
    </motion.div>
  )
}
