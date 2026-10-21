'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { Lyrics } from './Lyrics'

const REPEAT_NEXT = { off: 'all', all: 'one', one: 'off' }
const REPEAT_LABEL = { off: 'Repeat off', all: 'Repeat all', one: 'Repeat one' }

/**
 * The player. Each song brings its colours (an M3 scheme from its cover,
 * made on the server) and its blurred cover as the backdrop; names link to
 * their pages when there are any. Keys: space, ←/→ 5s, N/P, S, R, M.
 */
export function Player({ songs }) {
  const audioRef = useRef(null)
  const controls = useRef(null)
  const wantsPlay = useRef(false)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [time, setTime] = useState(0)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState('all')
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [mini, setMini] = useState(false)
  const [line, setLine] = useState(null)
  // Two backdrop layers, so one song's cover fades into the next.
  const [layers, setLayers] = useState({ front: 0, art: [songs[0].blur, null] })

  const song = songs[index]
  const duration = song.duration

  const go = useCallback(
    (i, play = true) => {
      const next = (i + songs.length) % songs.length
      wantsPlay.current = play
      setIndex(next)
      setTime(0)
      setStarted(false)
      setLayers((l) => {
        const front = 1 - l.front
        const art = [...l.art]
        art[front] = songs[next].blur
        return { front, art }
      })
    },
    [songs]
  )

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (a.paused) a.play().catch(() => {})
    else a.pause()
  }, [])

  const next = useCallback(
    (ended = false) => {
      const a = audioRef.current
      if (ended && repeat === 'one') {
        a.currentTime = 0
        a.play().catch(() => {})
        return
      }
      if (shuffle && songs.length > 1) {
        let j
        do j = Math.floor(Math.random() * songs.length)
        while (j === index)
        return go(j)
      }
      if (ended && repeat === 'off' && index === songs.length - 1) return
      go(index + 1)
    },
    [go, index, repeat, shuffle, songs.length]
  )

  const prev = useCallback(() => {
    const a = audioRef.current
    if (a.currentTime > 3) a.currentTime = 0
    else go(index - 1)
  }, [go, index])

  // A new song plays when asked to (picked, next, ended); not on first load.
  useEffect(() => {
    if (wantsPlay.current) audioRef.current?.play().catch(() => {})
  }, [index])

  useEffect(() => {
    document.title = `${song.title} · Player · Music · Snehil Shah`
    if (!('mediaSession' in navigator)) return
    navigator.mediaSession.metadata = new MediaMetadata({
      title: song.title,
      artist: song.artists.join(', '),
      album: song.album ?? '',
      artwork: [{ src: song.cover, sizes: '512x512', type: 'image/jpeg' }]
    })
  }, [song])

  // Lock screen, headphones, and the keyboard.
  const actions = useRef({})
  useEffect(() => {
    actions.current = { toggle, next, prev }
  })
  useEffect(() => {
    const a = audioRef.current
    if ('mediaSession' in navigator) {
      const ms = navigator.mediaSession
      ms.setActionHandler('play', () => a.play())
      ms.setActionHandler('pause', () => a.pause())
      ms.setActionHandler('nexttrack', () => actions.current.next())
      ms.setActionHandler('previoustrack', () => actions.current.prev())
      ms.setActionHandler('seekto', (d) => (a.currentTime = d.seekTime))
    }
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest('input:not([type=range]), textarea, [contenteditable]')) return
      const k = e.key.toLowerCase()
      const onControl = e.target.closest('button, a, input')
      if (k === ' ' && !onControl) {
        e.preventDefault()
        actions.current.toggle()
      } else if (k === 'arrowright' && !onControl) a.currentTime = Math.min(a.currentTime + 5, a.duration || 0)
      else if (k === 'arrowleft' && !onControl) a.currentTime = Math.max(a.currentTime - 5, 0)
      else if (k === 'n') actions.current.next()
      else if (k === 'p') actions.current.prev()
      else if (k === 's') setShuffle((s) => !s)
      else if (k === 'r') setRepeat((r) => REPEAT_NEXT[r])
      else if (k === 'm') setMuted((m) => !m)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if ('mediaSession' in navigator) {
        for (const action of ['play', 'pause', 'nexttrack', 'previoustrack', 'seekto']) navigator.mediaSession.setActionHandler(action, null)
      }
    }
  }, [])

  useEffect(() => {
    audioRef.current.volume = volume
    audioRef.current.muted = muted
  }, [volume, muted])

  // The mini player shows once the card's controls have scrolled out of view.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setMini(!e.isIntersecting))
    io.observe(controls.current)
    return () => io.disconnect()
  }, [])

  const seek = (v) => {
    audioRef.current.currentTime = v
    setTime(v)
  }
  const state = playing ? 'playing' : started ? 'paused' : 'ready'
  const pct = `${Math.min((time / duration) * 100, 100)}%`
  const shown = muted ? 0 : volume

  return (
    <div className='pl'>
      <style>{themeCss(song.theme)}</style>
      <div className='pl-backdrop' aria-hidden>
        {layers.art.map((art, i) => (
          <div key={i} className={i === layers.front ? 'on' : ''} style={art ? { backgroundImage: `url(${art})` } : undefined} />
        ))}
      </div>

      <article className={`np pl-card ${state}`} aria-label='Player'>
        <div className='np-aura' aria-hidden>
          <div style={{ backgroundImage: `url("${song.cover}")` }} />
        </div>
        <div className='pl-grid'>
          <div className='pl-cover'>
            <img key={song.id} src={song.cover} alt={`${song.album ?? song.title} cover`} className='pl-art' />
            <span className='np-badge'>
              {playing ? <span className='np-live' /> : <Pause size={12} strokeWidth={2.5} fill='currentColor' aria-hidden />}
              <span className='label'>{playing ? 'Playing' : 'Paused'}</span>
            </span>
          </div>
          <div key={song.id} className='pl-text np-in'>
            <h1 className='pl-title display'>
              <Name href={song.href.track}>{song.title}</Name>
            </h1>
            <p className='pl-sub'>
              by{' '}
              {song.artists.map((a, i) => (
                <span key={a}>
                  {i > 0 && ', '}
                  <Name href={song.href.artists[i]} strong>
                    {a}
                  </Name>
                </span>
              ))}
            </p>
            {song.album && (
              <p className='pl-sub'>
                on{' '}
                <Name href={song.href.album} strong>
                  {song.album}
                </Name>
              </p>
            )}
          </div>
          <div className='pl-seek tabular-nums'>
            <span>{clock(time)}</span>
            <input
              type='range'
              className='pl-range'
              min={0}
              max={duration}
              step={0.1}
              value={time}
              onChange={(e) => seek(Number(e.target.value))}
              style={{ '--p': pct }}
              aria-label='Seek'
              aria-valuetext={`${clock(time)} of ${clock(duration)}`}
            />
            <span>{clock(duration)}</span>
          </div>
          <div className='pl-ctl' ref={controls}>
            <button type='button' className='pl-ib' aria-pressed={shuffle} aria-label='Shuffle' title='Shuffle (S)' onClick={() => setShuffle((s) => !s)}>
              <Shuffle size={20} />
            </button>
            <button type='button' className='pl-ib big' aria-label='Previous' title='Previous (P)' onClick={prev}>
              <SkipBack size={24} fill='currentColor' />
            </button>
            <PlayButton playing={playing} onClick={toggle} />
            <button type='button' className='pl-ib big' aria-label='Next' title='Next (N)' onClick={() => next()}>
              <SkipForward size={24} fill='currentColor' />
            </button>
            <button
              type='button'
              className='pl-ib'
              aria-pressed={repeat !== 'off'}
              aria-label={REPEAT_LABEL[repeat]}
              title='Repeat (R)'
              onClick={() => setRepeat((r) => REPEAT_NEXT[r])}
            >
              {repeat === 'one' ? <Repeat1 size={20} /> : <Repeat size={20} />}
            </button>
            <div className='pl-vol'>
              <button type='button' className='pl-ib' aria-label={muted ? 'Unmute' : 'Mute'} title='Mute (M)' onClick={() => setMuted((m) => !m)}>
                {shown === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type='range'
                className='pl-range'
                min={0}
                max={1}
                step={0.01}
                value={shown}
                onChange={(e) => {
                  setVolume(Number(e.target.value))
                  setMuted(false)
                }}
                style={{ '--p': `${shown * 100}%` }}
                aria-label='Volume'
              />
            </div>
          </div>
        </div>
      </article>

      <div className='pl-cols'>
        <section className='mt-16 min-w-0'>
          <h2 className='h2 group-head pl-head'>
            Songs{' '}
            <span className='meta font-[family-name:var(--font-product-sans)] text-[14px]'>
              {songs.length} songs · {clock(songs.reduce((t, s) => t + s.duration, 0))}
            </span>
          </h2>
          <div className='mt-4'>
            {songs.map((s, i) => {
              const current = i === index
              return (
                <button
                  type='button'
                  key={s.id}
                  className='pl-row'
                  aria-current={current ? 'true' : undefined}
                  onClick={() => (current ? toggle() : go(i))}
                >
                  <span className='n'>
                    {current ? (
                      <span className={`np-eq${playing ? '' : ' still'}`} aria-hidden>
                        <i />
                        <i />
                        <i />
                        <i />
                      </span>
                    ) : (
                      <span className='rank'>{i + 1}</span>
                    )}
                  </span>
                  <span className='art'>
                    <img src={s.cover} alt='' loading='lazy' decoding='async' />
                    <span aria-hidden>
                      <Play size={20} fill='currentColor' />
                    </span>
                  </span>
                  <span className='t'>
                    <b>{s.title}</b>
                    <span>
                      {names(s.artists)}
                      {s.album && s.album !== s.title ? ` · ${s.album}` : ''}
                    </span>
                  </span>
                  <span className='d tabular-nums'>{clock(s.duration)}</span>
                </button>
              )
            })}
          </div>
        </section>
        <section className='mt-16 min-w-0 pl-lyrics-group'>
          <h2 className='h2 group-head pl-head'>
            Lyrics {song.synced && <span className='pl-tag'>Synced</span>}
          </h2>
          <Lyrics key={song.id} song={song} audioRef={audioRef} playing={playing} onLine={setLine} />
        </section>
      </div>

      <div className={`pl-mini${mini ? ' on' : ''}`} aria-hidden={!mini}>
        <img src={song.cover} alt='' />
        <button
          type='button'
          className='t'
          tabIndex={mini ? 0 : -1}
          onClick={() => controls.current.scrollIntoView({ behavior: 'smooth', block: 'center' })}
        >
          <b>{song.title}</b>
          <span>{line ?? names(song.artists)}</span>
        </button>
        <button type='button' className='pl-ib' aria-label='Next' tabIndex={mini ? 0 : -1} onClick={() => next()}>
          <SkipForward size={22} fill='currentColor' />
        </button>
        <PlayButton playing={playing} onClick={toggle} tabIndex={mini ? 0 : -1} small />
        <div className='bar'>
          <div style={{ width: pct }} />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={song.audio}
        preload='metadata'
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onPlay={() => {
          setPlaying(true)
          setStarted(true)
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => next(true)}
      />
    </div>
  )
}

function PlayButton({ playing, onClick, small, tabIndex }) {
  const size = small ? 22 : 26
  return (
    <button
      type='button'
      className={`pl-play${playing ? ' on' : ''}`}
      aria-label={playing ? 'Pause' : 'Play'}
      title={small ? undefined : 'Play / pause (Space)'}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {playing ? <Pause size={size} fill='currentColor' strokeWidth={0} /> : <Play size={size} fill='currentColor' strokeWidth={0} />}
    </button>
  )
}

/** A name that links to its page here when there is one. */
function Name({ href, strong, children }) {
  if (href) {
    return (
      <Link href={href} prefetch={false}>
        {children}
      </Link>
    )
  }
  return strong ? <b>{children}</b> : children
}

function themeCss({ light, dark }) {
  return `#goonj{${light}color-scheme:light}@media (prefers-color-scheme:dark){#goonj{${dark}color-scheme:dark}}`
}

function clock(s) {
  const n = Math.max(0, Math.floor(s || 0))
  return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`
}

function names(a) {
  return a.length < 2 ? a[0] : `${a.slice(0, -1).join(', ')} & ${a.at(-1)}`
}
