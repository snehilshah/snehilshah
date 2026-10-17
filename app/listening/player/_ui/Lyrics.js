'use client'
import { memo, useEffect, useRef, useState } from 'react'
import { ArrowDown, Music } from 'lucide-react'

/**
 * The words. Synced lyrics follow the song: the current line sits a third of
 * the way down, lit; a click on a line jumps there. Scrolling by hand stops
 * the following until "Back to the song", or a few quiet seconds. Lines are
 * lit by toggling classes in an animation frame, not by re-rendering.
 */
export const Lyrics = memo(function Lyrics({ song, audioRef, playing, onLine }) {
  const scroller = useRef(null)
  const follow = useRef(true)
  const active = useRef(-2)
  const timer = useRef(null)
  const [away, setAway] = useState(false)
  const items = song.synced

  // A new song starts at the top, following. (Before the effect below, which then scrolls to its line.)
  useEffect(() => {
    active.current = -2
    follow.current = true
    clearTimeout(timer.current)
    scroller.current?.scrollTo({ top: 0 })
    if (!items) onLine(null)
  }, [song, items, onLine])

  // Light the line (or break, or word) at the current time.
  useEffect(() => {
    const el = scroller.current
    const audio = audioRef.current
    if (!items || !el || !audio) return
    const lines = el.children
    const tick = (force) => {
      const t = audio.currentTime
      let a = -1
      for (let i = 0; i < items.length && items[i].t <= t + 0.1; i++) a = i
      if (a !== active.current || force === true) {
        for (let i = 0; i < lines.length; i++) lines[i].classList.toggle('on', i === a)
        active.current = a
        if (follow.current) toActive(el, a)
        onLine(items[a] && !items[a].gap ? items[a].text : null)
      }
      const it = items[a]
      if (it?.gap) {
        const p = (t - it.t) / Math.max(it.end - it.t, 0.1)
        lines[a].querySelectorAll('i').forEach((d, j) => d.classList.toggle('lit', p > (j + 0.5) / 3.5))
      } else if (it?.words) {
        lines[a].querySelectorAll('span').forEach((w, j) => w.classList.toggle('sung', it.words[j].t <= t))
      }
    }
    let raf
    const loop = () => {
      tick()
      if (!audio.paused) raf = requestAnimationFrame(loop)
    }
    tick(true)
    if (playing) loop()
    audio.addEventListener('seeked', tick)
    return () => {
      cancelAnimationFrame(raf)
      audio.removeEventListener('seeked', tick)
    }
  }, [items, playing, audioRef, onLine])

  useEffect(() => () => clearTimeout(timer.current), [])

  const resume = () => {
    clearTimeout(timer.current)
    follow.current = true
    setAway(false)
    toActive(scroller.current, active.current)
  }
  const pause = () => {
    if (!items) return
    follow.current = false
    setAway(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (!audioRef.current?.paused) resume()
    }, 5000)
  }
  const jump = (e) => {
    const line = e.target.closest('[data-t]')
    if (!line || !audioRef.current) return
    audioRef.current.currentTime = Number(line.dataset.t)
    audioRef.current.play().catch(() => {})
    resume()
  }

  const plain = song.lyrics.trim().split('\n')
  const mode = items ? 'synced' : plain.length > 2 ? 'plain' : 'none'

  return (
    <div className='lyr' data-mode={mode}>
      <div
        ref={scroller}
        className='lyr-scroll'
        onWheel={pause}
        onTouchMove={pause}
        onKeyDown={(e) => ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key) && pause()}
        onClick={items ? jump : undefined}
        tabIndex={mode === 'none' ? undefined : 0}
        aria-label='Lyrics'
      >
        {mode === 'synced' &&
          items.map((it, i) =>
            it.gap ? (
              <div key={`${song.id}-${i}`} className='ln gap' aria-hidden>
                <i />
                <i />
                <i />
              </div>
            ) : (
              <p key={`${song.id}-${i}`} className={`ln${it.words ? ' words' : ''}`} data-t={it.t}>
                {it.words ? it.words.map((w, j) => <span key={j}>{w.text}</span>) : it.text}
              </p>
            )
          )}
        {mode === 'plain' &&
          plain.map((l, i) =>
            l.trim() ? (
              <p key={`${song.id}-${i}`} className='ln'>
                {l}
              </p>
            ) : (
              <div key={`${song.id}-${i}`} className='stanza' />
            )
          )}
        {mode === 'none' && (
          <div className='lyr-empty'>
            <Music size={28} aria-hidden className='opacity-60' />
            No lyrics for this one yet.
          </div>
        )}
      </div>
      {items && (
        <button type='button' className={`lyr-resume${away ? ' on' : ''}`} onClick={resume} tabIndex={away ? 0 : -1}>
          <ArrowDown size={16} strokeWidth={2.2} aria-hidden />
          Back to the song
        </button>
      )}
    </div>
  )
})

function toActive(el, index, instant) {
  const line = el?.children[Math.max(index, 0)]
  if (!line) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollTo({ top: line.offsetTop - el.clientHeight * 0.32, behavior: instant || reduce ? 'auto' : 'smooth' })
}
