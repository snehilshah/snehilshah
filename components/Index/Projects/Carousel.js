'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, animate } from 'motion/react'
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react'

export default function Carousel({ children }) {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const x = useMotionValue(0)
  const [maxDrag, setMaxDrag] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!track || !viewport) return

    const measure = () => {
      const overflow = track.scrollWidth - viewport.offsetWidth
      const next = overflow > 0 ? overflow : 0
      setMaxDrag(next)
      // keep position inside the new bounds after a resize
      if (x.get() < -next) animate(x, -next, { duration: 0.2 })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [x])

  const step = direction => {
    const viewport = viewportRef.current?.offsetWidth ?? 0
    const delta = viewport * 0.8 * direction
    const next = Math.min(0, Math.max(-maxDrag, x.get() + delta))
    animate(x, next, { type: 'spring', stiffness: 300, damping: 40 })
  }

  return (
    <div className='relative'>
      <div className='mb-4 flex gap-2'>
        <button
          type='button'
          onClick={() => step(1)}
          aria-label='Previous projects'
          className='rounded-md p-1 text-gray-300 transition-colors hover:text-cyan-300'
        >
          <SquareChevronLeft className='h-8 w-8' />
        </button>
        <button
          type='button'
          onClick={() => step(-1)}
          aria-label='Next projects'
          className='rounded-md p-1 text-gray-300 transition-colors hover:text-cyan-300'
        >
          <SquareChevronRight className='h-8 w-8' />
        </button>
      </div>

      <div ref={viewportRef} className='overflow-hidden'>
        <motion.div
          ref={trackRef}
          style={{ x }}
          drag='x'
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.08}
          className='flex w-max cursor-grab gap-6 pb-4 active:cursor-grabbing'
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
