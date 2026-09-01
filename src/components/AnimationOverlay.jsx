import { useEffect, useRef } from 'react'

export default function AnimationOverlay({ animType, label, onDone }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    if (animType === 'rose') {
      // 30 rose petals falling
      for (let i = 0; i < 30; i++) {
        const el = document.createElement('div')
        el.className = 'anim-particle'
        el.textContent = ['🌹', '🌸', '🌺', '💐'][Math.floor(Math.random() * 4)]
        el.style.left = `${Math.random() * 100}vw`
        el.style.animationDuration = `${1.5 + Math.random() * 2}s`
        el.style.animationDelay = `${Math.random() * 1.2}s`
        container.appendChild(el)
      }
    } else if (animType === 'fist') {
      for (let i = 0; i < 8; i++) {
        const el = document.createElement('div')
        el.className = 'anim-fist'
        el.textContent = '✊'
        el.style.left = `${15 + Math.random() * 70}vw`
        el.style.top = `${20 + Math.random() * 50}vh`
        el.style.animationDelay = `${i * 0.15}s`
        container.appendChild(el)
      }
    } else if (animType === 'family') {
      const emojis = ['👨‍👩‍👧‍👦', '🏠', '❤️', '🎉']
      emojis.forEach((e, i) => {
        const el = document.createElement('div')
        el.className = 'anim-family'
        el.textContent = e
        el.style.left = `${15 + i * 20}vw`
        el.style.top = `${30 + (i % 2) * 20}vh`
        el.style.animationDelay = `${i * 0.2}s`
        container.appendChild(el)
      })
    } else if (animType === 'knight') {
      const el = document.createElement('div')
      el.className = 'anim-knight'
      el.textContent = '⚔️'
      container.appendChild(el)
    }

    const timer = setTimeout(onDone, 2800)
    return () => clearTimeout(timer)
  }, [animType, onDone])

  return (
    <div className="animation-overlay" role="status" aria-live="polite" aria-label={label}>
      <div className="animation-container" ref={containerRef} />
      <div className="animation-label">{label}</div>
    </div>
  )
}
