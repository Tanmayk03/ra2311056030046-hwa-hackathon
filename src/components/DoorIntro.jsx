import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function DoorIntro({ onFinish }) {
  const reduce = useReducedMotion()
  const [opening, setOpening] = useState(false)
  const enterRef = useRef(null)

  useEffect(() => {
    enterRef.current?.focus()
  }, [])

  function openDoor() {
    if (reduce) {
      onFinish()
      return
    }
    setOpening(true)
    window.setTimeout(onFinish, 1500)
  }

  const panel = 'absolute inset-y-0 w-1/2 bg-gradient-to-br from-brand-blue via-brand-blue to-brand-navy shadow-2xl'
  const panelMotion = {
    animate: { x: opening ? '-102%' : '0%' },
    transition: { duration: 1.15, ease: [0.76, 0, 0.24, 1] },
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-brand-blue"
      role="dialog"
      aria-modal="true"
      aria-label="Opening the Happy While Away storefront"
      animate={{ opacity: opening ? 0.2 : 1 }}
      transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.6 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 62%, rgba(255,214,150,0.98) 0%, rgba(255,246,220,0.9) 22%, rgba(196,232,252,0.75) 48%, rgba(23,109,185,0.9) 100%)',
        }}
      />

      <motion.div
        className={`${panel} left-0 border-r-2 border-brand-cyan/40`}
        {...panelMotion}
      >
        <div className="absolute inset-4 rounded-3xl border border-brand-light/20" />
        <div className="absolute right-6 top-1/2 h-14 w-2 -translate-y-1/2 rounded-full bg-brand-cyan/80 shadow-glow" />
      </motion.div>

      <motion.div
        className={`${panel} right-0 border-l-2 border-brand-cyan/40`}
        animate={{ x: opening ? '102%' : '0%' }}
        transition={panelMotion.transition}
      >
        <div className="absolute inset-4 rounded-3xl border border-brand-light/20" />
        <div className="absolute left-6 top-1/2 h-14 w-2 -translate-y-1/2 rounded-full bg-brand-cyan/80 shadow-glow" />
      </motion.div>

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
        animate={{ opacity: opening ? 0 : 1, y: opening ? -24 : 0 }}
        transition={{ duration: reduce ? 0 : 0.45 }}
      >
        <p className="eyebrow text-brand-light">Welcome to</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
          Happy While Away
        </h1>
        <p className="mt-4 max-w-md text-lg text-brand-light sm:text-xl">
          A little adventure while you&apos;re away.
        </p>
        <button ref={enterRef} type="button" onClick={openDoor} className="btn-primary mt-9 bg-white text-brand-navy hover:bg-brand-pale">
          Open the door <ArrowRight size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onFinish}
          className="mt-5 rounded text-sm font-bold text-brand-light underline decoration-brand-light/50 underline-offset-4 hover:text-white"
        >
          Skip intro
        </button>
      </motion.div>
    </motion.div>
  )
}
