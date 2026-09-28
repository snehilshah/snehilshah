'use client'

import { useEffect, useRef } from 'react'

export default function TimelineProgress() {
  const progressRef = useRef(null)

  useEffect(() => {
    const progressLine = progressRef.current
    const container = progressLine?.closest('#positions')
    if (!container) return

    let frame = 0
    let active = false
    const update = () => {
      frame = 0
      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const scrollRange = Math.max(1, rect.height - viewportHeight * 0.4)
      const progress = Math.max(0, Math.min(1, (viewportHeight * 0.1 - rect.top) / scrollRange))

      progressLine.style.transform = `scaleY(${progress})`
      progressLine.style.opacity = Math.min(1, progress * 10)
    }
    const scheduleUpdate = () => {
      if (active && !frame) frame = requestAnimationFrame(update)
    }

    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(container)
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting
        if (active) {
          window.addEventListener('scroll', scheduleUpdate, { passive: true })
          scheduleUpdate()
        } else {
          window.removeEventListener('scroll', scheduleUpdate)
        }
      },
      { rootMargin: '200px' }
    )
    intersectionObserver.observe(container)
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={progressRef}
      style={{ transform: 'scaleY(0)', opacity: 0 }}
      className='absolute inset-0 origin-top rounded-full bg-gradient-to-t from-cyan-500 via-[#0097A7] to-cyan-200'
    />
  )
}
