'use client'
import { useEffect, useState } from 'react'
import { ago } from '../_lib/format'

/** "12m ago", worked out in the browser: pages are cached, the clock isn't. */
export function Ago({ at }) {
  const [now, setNow] = useState(null)
  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 60000)
    return () => clearInterval(id)
  }, [])
  return <span suppressHydrationWarning>{ago(at, now ?? undefined)}</span>
}
