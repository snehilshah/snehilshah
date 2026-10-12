'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Art } from './Art'
import { ago, duration } from '../_lib/format'
import { artistHref, trackHref } from '../_lib/paths'

/**
 * What's playing right now, on any device, pushed by Goonj as it changes
 * (server-sent events; nothing polls). When a track ends somewhere, the
 * page's stats refresh a few seconds later, once that play has landed.
 */
export function NowPlaying({ api, last }) {
  const [snap, setSnap] = useState(null)
  const skew = useRef(0)
  const router = useRouter()

  useEffect(() => {
    let es
    let refresh
    let seen = null
    const open = () => {
      es = new EventSource(`${api}/v1/now/stream`)
      es.onmessage = (e) => {
        const s = JSON.parse(e.data)
        skew.current = s.at - Date.now()
        setSnap(s)
        const tracks = s.items.map((i) => `${i.device}/${i.trackKey}`).join()
        if (seen !== null && tracks !== seen) {
          clearTimeout(refresh)
          refresh = setTimeout(() => router.refresh(), 10000)
        }
        seen = tracks
      }
    }
    // Only while the page is on screen.
    const onVisibility = () => {
      if (document.hidden) {
        es?.close()
        es = null
      } else if (!es) {
        seen = null
        open()
        router.refresh()
      }
    }
    open()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      es?.close()
      clearTimeout(refresh)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [api, router])

  if (!snap) return <div className='now-card h-[88px] opacity-0' aria-hidden />
  if (snap.items.length === 0) {
    return (
      <div className='now-card flex items-center gap-3 px-4 py-3 rise'>
        <span className='now-dot' />
        <p className='meta text-[14px] truncate'>
          Not playing
          {last && (
            <>
              {' · last: '}
              <Link href={trackHref(last.trackKey)} className='text-m-on-surface hover:underline'>
                {last.title}
              </Link>
              {` by ${last.artist}, ${ago(last.startedAt)}`}
            </>
          )}
        </p>
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-2'>
      {snap.items.map((n) => (
        <Playing key={n.device} n={n} api={api} skew={skew} />
      ))}
    </div>
  )
}

function Playing({ n, api, skew }) {
  const playing = n.state === 'playing'
  const [now, setNow] = useState(() => Date.now() + skew.current)
  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setNow(Date.now() + skew.current), 1000)
    return () => clearInterval(id)
  }, [playing, skew])
  const pos = Math.min(n.positionMs + (playing ? Math.max(now - n.at, 0) : 0), n.durationMs || Infinity)
  const frac = n.durationMs ? pos / n.durationMs : 0

  return (
    <div className='now-card flex items-center gap-4 p-3 pr-5 rise'>
      <Link href={trackHref(n.trackKey)} className='shrink-0'>
        <Art
          key={n.albumKey}
          src={n.albumKey ? `${api}/v1/images/album/${encodeURIComponent(n.albumKey)}` : null}
          label={n.album || n.title}
          className='size-16 rounded-xl'
        />
      </Link>
      <div className='min-w-0 flex-1'>
        <p className='meta flex items-center gap-2'>
          <Bars on={playing} />
          {playing ? 'Playing' : 'Paused'} on {n.device}
        </p>
        <Link href={trackHref(n.trackKey)} className='name block text-[17px] truncate mt-0.5 hover:underline'>
          {n.title}
        </Link>
        <Link href={artistHref(n.artistKey)} className='meta block truncate hover:text-m-on-surface'>
          {n.artist}
        </Link>
        {n.durationMs > 0 && (
          <div className='mt-2 flex items-center gap-3'>
            <div className='h-1 flex-1 rounded-full bg-m-on-surface/10 overflow-hidden'>
              <div className='h-full rounded-full bg-m-primary transition-[width] duration-1000 ease-linear' style={{ width: `${frac * 100}%` }} />
            </div>
            <span className='meta tabular-nums text-[12px]'>
              {duration(pos)} / {duration(n.durationMs)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

/** Three bars that move while music plays and rest when paused. */
function Bars({ on }) {
  return (
    <span className={`now-bars ${on ? 'on' : ''}`} aria-hidden>
      <i />
      <i />
      <i />
    </span>
  )
}
