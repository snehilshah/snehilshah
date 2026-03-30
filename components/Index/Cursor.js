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
        // Use translate3d for hardware acceleration instead of top/left
        cursorRef.current.style.transform = `translate3d(${displayedMouse.current.x}px, ${displayedMouse.current.y}px, 0) translate(-50%, -50%)`
      }
    }

    updateMouse()

    // Cleanup to prevent memory leaks and redundant listeners
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      // Removed -translate-x-1/2 -translate-y-1/2 from classes, handled in translate3d transform
      // Removed fixed position offsets, keeping top-0 left-0 to set origin
      className='w-6 h-6 bg-transparent border-2 border-cyan-200 rounded-full fixed top-0 left-0 z-50 pointer-events-none hidden transition duration-75'
    ></div>
  )
}

export default Cursor
