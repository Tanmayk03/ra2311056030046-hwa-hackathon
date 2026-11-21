import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import sitting from '../assets/retriever/golden-retriever.svg?raw'
import standing from '../assets/retriever/golden-retriever-standing-wag.svg?raw'
import headTilt from '../assets/retriever/golden-retriever-head-tilt.svg?raw'
import lying from '../assets/retriever/golden-retriever-lying.svg?raw'
import playful from '../assets/retriever/golden-retriever-playful.svg?raw'
import '../styles/retriever.css'

const poses = { sitting, standing, headTilt, lying, playful }
const clean = (svg) => svg.replace(/^<\?xml[^>]*\?>\s*/, '')
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const SECTION_POSES = [
  { id: 'hero', pose: 'sitting' },
  { id: 'featured', pose: 'standing' },
  { id: 'brand', pose: 'playful' },
]

export default function RetrieverCompanion() {
  const reduced = useReducedMotion()
  const rootRef = useRef(null)
  const wagTimer = useRef(null)
  const tiltTimer = useRef(null)
  const lookTimer = useRef(null)
  const [phase, setPhase] = useState(reduced ? 'arrived' : 'entering')
  const [sectionPose, setSectionPose] = useState('sitting')
  const [wagging, setWagging] = useState(false)
  const [tilting, setTilting] = useState(false)

  const pose = tilting ? 'headTilt' : phase === 'entering' ? 'standing' : sectionPose
  const markup = useMemo(() => clean(poses[pose]), [pose])

  const triggerWag = useCallback((duration = 900) => {
    window.clearTimeout(wagTimer.current)
    setWagging(true)
    wagTimer.current = window.setTimeout(() => setWagging(false), duration)
  }, [])

  useEffect(() => {
    if (reduced) return undefined

    const frame = window.requestAnimationFrame(() => setPhase('walking'))
    const arrival = window.setTimeout(() => {
      setPhase('arrived')
      triggerWag(1200)
    }, 1700)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(arrival)
      window.clearTimeout(wagTimer.current)
      window.clearTimeout(tiltTimer.current)
      window.clearTimeout(lookTimer.current)
    }
  }, [reduced, triggerWag])

  useEffect(() => {
    if (phase !== 'arrived') return undefined

    const sections = SECTION_POSES.map(({ id }) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const match = SECTION_POSES.find(({ id }) => id === visible.target.id)
        if (match) {
          setSectionPose(match.pose)
          triggerWag(700)
        }
      },
      { threshold: [0.35, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [phase, triggerWag])

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return undefined

    const look = (x, y) => {
      const rect = root.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = clamp((x - cx) / (window.innerWidth / 2), -1, 1)
      const dy = clamp((y - cy) / (window.innerHeight / 2), -1, 1)
      root.style.setProperty('--pupil-x', `${(dx * 5).toFixed(2)}px`)
      root.style.setProperty('--pupil-y', `${(dy * 5).toFixed(2)}px`)
      root.style.setProperty('--head-rot', `${(dx * 5).toFixed(2)}deg`)
      root.style.setProperty('--ear-left-rot', `${(dx * 4).toFixed(2)}deg`)
      root.style.setProperty('--ear-right-rot', `${(-dx * 4).toFixed(2)}deg`)
    }

    const onMove = (event) => {
      if (event.pointerType === 'touch') return
      look(event.clientX, event.clientY)
    }

    const onDown = (event) => {
      if (event.pointerType !== 'touch') return
      look(event.clientX, event.clientY)
      window.clearTimeout(lookTimer.current)
      lookTimer.current = window.setTimeout(() => {
        root.style.setProperty('--pupil-x', '0px')
        root.style.setProperty('--pupil-y', '0px')
        root.style.setProperty('--head-rot', '0deg')
        root.style.setProperty('--ear-left-rot', '0deg')
        root.style.setProperty('--ear-right-rot', '0deg')
      }, 1200)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [reduced])

  function reactToTap() {
    triggerWag(1100)
    if (reduced) return
    window.clearTimeout(tiltTimer.current)
    setTilting(true)
    tiltTimer.current = window.setTimeout(() => setTilting(false), 950)
  }

  return (
    <div
      ref={rootRef}
      className={`hwa-companion is-${phase}${wagging ? ' is-wagging' : ''}${tilting ? ' is-tilting' : ''}`}
      data-pose={pose}
    >
      <button
        type="button"
        className="hwa-figure"
        onClick={reactToTap}
        onPointerEnter={() => phase === 'arrived' && triggerWag(650)}
        aria-label="Say hello to the Happy While Away retriever"
      >
        <span key={pose} className="hwa-svg" dangerouslySetInnerHTML={{ __html: markup }} />
      </button>
    </div>
  )
}
