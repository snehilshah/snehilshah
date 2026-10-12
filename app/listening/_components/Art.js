'use client'
import { useEffect, useRef, useState } from 'react'

/** A cover or artist photo from Goonj; a quiet tonal tile when there's none. */
export function Art({ src, alt = '', className = '', round = false, label }) {
  const [failed, setFailed] = useState(!src)
  const ref = useRef(null)
  // An image that failed before hydration never fires onError.
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])
  const shape = round ? 'rounded-full' : ''
  if (failed) {
    return (
      <div
        aria-hidden
        className={`${className} ${shape} grid place-items-center bg-m-secondary-container text-m-on-secondary-container`}
      >
        <span className='name text-[0.9em] opacity-80 select-none'>{initials(label || alt)}</span>
      </div>
    )
  }
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading='lazy'
      decoding='async'
      onError={() => setFailed(true)}
      className={`${className} ${shape} object-cover bg-m-surface-container-high`}
    />
  )
}

function initials(name = '') {
  const words = name.replace(/[^\p{L}\p{N} ]/gu, ' ').trim().split(/\s+/).filter(Boolean)
  return (words[0]?.[0] ?? '♪').toUpperCase() + (words[1]?.[0] ?? '').toUpperCase()
}
