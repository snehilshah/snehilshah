'use client'
import { useEffect, useRef } from 'react'

const Cursor = () => {
  const isFirstMove = useRef(true)

  const cursorRef = useRef()

  const realMouse = useRef({
    x: 0,
    y: 0
  })
  const displayedMouse = useRef({
    x: 0,
    y: 0
  })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = e => {
      if (cursorRef.current) {
        if (isFirstMove.current) {
          cursorRef.current.style.display = 'block'
          displayedMouse.current.x = e.clientX
          displayedMouse.current.y = e.clientY
          isFirstMove.current = false
        }

        realMouse.current.x = e.clientX
        realMouse.current.y = e.clientY
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    let animationFrameId
    const updateMouse = () => {
      animationFrameId = requestAnimationFrame(updateMouse)

      displayedMouse.current.x +=
        (realMouse.current.x - displayedMouse.current.x) * 0.2
      displayedMouse.current.y +=
        (realMouse.current.y - displayedMouse.current.y) * 0.8

      if (cursorRef.current) {
        // Use transform instead of left/top to avoid layout thrashing and utilize hardware acceleration
        cursorRef.current.style.transform = `translate3d(${displayedMouse.current.x - 12}px, ${displayedMouse.current.y - 12}px, 0)`
      }
    }

    updateMouse()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className='w-6 h-6 bg-transparent border-2 border-cyan-200 rounded-full fixed z-50 top-0 left-0 pointer-events-none hidden'
    ></div>
  )
}

export default Cursor
