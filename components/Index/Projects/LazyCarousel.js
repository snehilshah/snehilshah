'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const Carousel = dynamic(() => import('./Carousel'), { ssr: false })

export default function LazyCarousel({ children }) {
  const containerRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px' }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef}>
      {ready ? (
        <Carousel>{children}</Carousel>
      ) : (
        <div className='relative'>
          <div className='mb-4 h-10' />
          <div className='overflow-x-auto rounded-md' role='group' aria-roledescription='carousel' aria-label='Projects'>
            <div className='flex w-max gap-6 pb-4'>{children}</div>
          </div>
        </div>
      )}
    </div>
  )
}
