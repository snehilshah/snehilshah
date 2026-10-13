'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Pause } from 'lucide-react'
import { Art } from './Art'
import { Ago } from './Ago'
import { duration } from '../_lib/format'
import { albumHref, artistHref, trackHref } from '../_lib/paths'

/**
 * What's playing right now, pushed by Goonj as it changes (server-sent
 * events; nothing polls, and the stream is open only while the page is on
 * screen). Goonj sends one device: a playing one before a paused one,
 * the first to start among players, the last to pause otherwise. The state
 * sits on the cover as a badge; nothing playing shows the last play, dimmed.
 * When the track
 * changes, the page's stats refresh a few seconds later, once that play
 * has landed.
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
        const track = s.items[0]?.trackKey ?? ''
        if (seen !== null && track !== seen) {
          clearTimeout(refresh)
          refresh = setTimeout(() => router.refresh(), 10000)
        }
        seen = track
      }
    }
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

  if (!snap) return <div className='np h-[172px] sm:h-[240px] opacity-0' aria-hidden />
  const n = snap.items[0]
  if (n) return <Card n={n} api={api} skew={skew} />
  if (!last) return null
  return (
    <Card
      api={api}
      skew={skew}
      n={{ ...last, state: 'idle', trackKey: last.trackKey, title: last.title, artistKey: last.artistKey }}
    />
  )
}

function Card({ n, api, skew }) {
  const state = n.state
  const playing = state === 'playing'
  const idle = state === 'idle'
  const [now, setNow] = useState(() => Date.now() + skew.current)
  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setNow(Date.now() + skew.current), 1000)
    return () => clearInterval(id)
  }, [playing, skew])
  const pos = Math.min(n.positionMs + (playing ? Math.max(now - n.at, 0) : 0), n.durationMs || Infinity)
  const frac = n.durationMs ? pos / n.durationMs : 0
  const cover = n.albumKey ? `${api}/v1/images/album/${encodeURIComponent(n.albumKey)}?s=512` : null
  const device = n.device || ''

  return (
    <article className={`np ${state}`}>
      {cover && (
        <div className='np-aura' aria-hidden>
          <div key={cover} style={{ backgroundImage: `url("${cover}")` }} />
        </div>
      )}
      <div className='flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7'>
        <Link href={trackHref(n.trackKey)} className='relative shrink-0 self-start sm:self-auto'>
          <Art key={n.trackKey} src={cover} label={n.album || n.title} className='np-art np-in' />
          {!idle && (
            <span className='np-badge'>
              {playing ? <span className='np-live' /> : <Pause size={12} strokeWidth={2.5} fill='currentColor' aria-hidden />}
              <span className='sr-only'>{playing ? 'Playing' : 'Paused'}{device && ' on my'} </span>
              <span className='label'>{device || (playing ? 'Playing' : 'Paused')}</span>
            </span>
          )}
        </Link>
        <div className='min-w-0 flex-1'>
          <div key={n.trackKey} className='np-in'>
            <Link
              href={trackHref(n.trackKey)}
              className={`display block truncate hover:underline ${idle ? 'text-[24px] sm:text-[28px]' : 'text-[28px] sm:text-[38px]'}`}
            >
              {n.title}
            </Link>
            <p className='text-[15px] sm:text-[16px] text-m-on-surface-variant truncate mt-1'>
              by{' '}
              <Link href={artistHref(n.artistKey)} className='font-medium text-m-on-surface hover:underline'>
                {n.artist}
              </Link>
            </p>
            {!idle && n.album && (
              <p className='text-[15px] sm:text-[16px] text-m-on-surface-variant truncate'>
                on{' '}
                <Link href={albumHref(n.albumKey)} className='font-medium text-m-on-surface hover:underline'>
                  {n.album}
                </Link>
              </p>
            )}
          </div>
          {idle ? (
            <p className='meta text-[14px] mt-3'>
              Last played <Ago at={n.startedAt} />
            </p>
          ) : (
            n.durationMs > 0 && (
              <div className='mt-5 flex items-center gap-3 text-[13px] text-m-on-surface-variant tabular-nums'>
                <span className='np-eq' aria-hidden>
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span>{duration(pos)}</span>
                <div className='np-track flex-1'>
                  <div className='np-fill' style={{ width: `${frac * 100}%` }} />
                </div>
                <span>{duration(n.durationMs)}</span>
              </div>
            )
          )}
        </div>
      </div>
    </article>
  )
}
