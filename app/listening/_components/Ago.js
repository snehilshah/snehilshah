'use client'
import { useSyncExternalStore } from 'react'
import { ago } from '../_lib/format'

// The clock, to the minute: the server renders without one (pages are
// cached), the browser fills it in and ticks each minute.
const subscribe = (tick) => {
  const id = setInterval(tick, 60000)
  return () => clearInterval(id)
}
const minute = () => Math.floor(Date.now() / 60000) * 60000

/** "12m ago", worked out in the browser: pages are cached, the clock isn't. */
export function Ago({ at }) {
  const now = useSyncExternalStore(subscribe, minute, () => null)
  return <span suppressHydrationWarning>{ago(at, now ?? undefined)}</span>
}
