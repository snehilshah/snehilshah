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

    let animationFrameId;

    const onMouseMove = e => {
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

    // Using { passive: true } to improve scrolling performance
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const updateMouse = () => {
      animationFrameId = requestAnimationFrame(updateMouse)

      displayedMouse.current.x +=
        (realMouse.current.x - displayedMouse.current.x) * 0.2
      displayedMouse.current.y +=
        (realMouse.current.y - displayedMouse.current.y) * 0.8

      if (cursorRef.current) {
        cursorRef.current.style.left = `${displayedMouse.current.x}px`
        cursorRef.current.style.top = `${displayedMouse.current.y}px`
      }
    }

    updateMouse()

    // Added cleanup function to prevent memory leaks on unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className='w-6 h-6 bg-transparent border-2 border-cyan-200 rounded-full fixed z-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden transition duration-75'
    ></div>
  )
}

export default Cursor
