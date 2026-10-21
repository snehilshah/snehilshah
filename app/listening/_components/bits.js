import { PLink as Link } from './PLink'
import { ArrowDown, ArrowUp, Disc3, MicVocal, Music2 } from 'lucide-react'
import { RANGES } from '../_lib/goonj'
import { withRange } from '../_lib/paths'
import { count, totalTime } from '../_lib/format'

/** Range chips; the current one filled. */
export function RangeTabs({ path, range, extra = [] }) {
  const all = [...RANGES, ...extra]
  return (
    <div className='flex gap-1.5 overflow-x-auto no-scrollbar max-w-full'>
      {all.map((r) => (
        <Link key={r.key} href={withRange(path, r.key)} scroll={false} className='chip' aria-current={r.key === range ? 'true' : undefined}>
          {r.label}
        </Link>
      ))}
    </div>
  )
}

/** A page's title row: the h1, with range chips beside it (under it on phones). */
export function PageHead({ title, children }) {
  return (
    <header className='mt-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-4'>
      <h1 className='h1 break-words min-w-0'>{title}</h1>
      {children}
    </header>
  )
}

/** A group of sections: an h2 over a hairline. */
export function Group({ title, children }) {
  return (
    <section className='mt-16'>
      <h2 className='h2 group-head'>{title}</h2>
      {children}
    </section>
  )
}

/** One list or chart: an h3 and its content. Inside a Group. */
export function Section({ title, action, children, className = '' }) {
  return (
    <section className={`mt-8 min-w-0 ${className}`}>
      <div className='flex items-baseline justify-between gap-4 mb-3'>
        <h3 className='h3'>{title}</h3>
        {action}
      </div>
      {children}
    </section>
  )
}

export function More({ href, children = 'See all' }) {
  return (
    <Link href={href} className='text-[14px] font-medium text-m-primary hover:underline shrink-0'>
      {children}
    </Link>
  )
}

/** Rank change against the previous period: ▲3, ▼2, or nothing. */
export function RankChange({ rank, prevRank, show = true }) {
  if (!show || !prevRank) return null
  const d = prevRank - rank
  if (d === 0) return null
  const Up = d > 0
  return (
    <span className={`inline-flex items-center text-[11px] font-medium ${Up ? 'text-m-primary' : 'text-m-on-surface-variant'}`}>
      {Up ? <ArrowUp size={11} strokeWidth={2.5} /> : <ArrowDown size={11} strokeWidth={2.5} />}
      {Math.abs(d)}
    </span>
  )
}

/** A small tonal badge (counts, sources). */
export function Badge({ children }) {
  return (
    <span className='text-[11px] rounded-full px-2 py-0.5 bg-m-secondary-container text-m-on-secondary-container whitespace-nowrap'>
      {children}
    </span>
  )
}

/** Big figures as segmented tiles. items: [{ label, value, sub }] */
export function Figures({ items, cols = 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6' }) {
  return (
    <div className={`segmented ${cols}`}>
      {items.map((f) => (
        <div key={f.label} className='px-4 py-4 min-w-0'>
          <div
            className={`num big whitespace-nowrap ${
              typeof f.value === 'string' && f.value.length > 8 ? 'text-[24px] sm:text-[28px]' : 'text-[32px] sm:text-[38px]'
            }`}
          >
            {f.value}
          </div>
          <div className='flex items-center gap-2 mt-2 min-w-0'>
            <span className='meta truncate'>{f.label}</span>
            {f.sub && <span className='text-[11px] text-m-on-surface-variant whitespace-nowrap'>{f.sub}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

const HOUR = 3600000
const DAY = 86400000
const TONES = ['primary', 'secondary', 'tertiary', 'secondary', 'primary']
const istDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' })

/**
 * Totals for each calendar period (today, this week, this month, this
 * year, all time), whatever the page's range. periods: [{ key, label, from, to, totals }].
 * musicDays: the dates ("2026-10-21") with plays; musicHours: today's hours (0–23) with plays.
 */
export function Periods({ periods, musicDays = new Set(), musicHours = new Set() }) {
  // All time ends now, by Goonj's clock.
  const now = periods.find((p) => p.allTime)?.to ?? periods.at(-1)?.to
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3'>
      {periods.map((p, i) => (
        <Period key={p.key} period={p} tone={TONES[i % TONES.length]} now={now} musicDays={musicDays} musicHours={musicHours} />
      ))}
    </div>
  )
}

function Period({ period: p, tone, now, musicDays, musicHours }) {
  const t = p.totals
  const [time, timeUnit] = totalTime(t.listenedMs).split(' ')
  const span = p.allTime ? 0 : Math.round((p.to - p.from) / DAY)
  const sofar = (size) => Math.max(1, Math.ceil((Math.min(now, p.to) - p.from) / size))
  let meter = null
  if (span === 1) {
    // Today: an hour a segment.
    const elapsed = Math.min(24, sofar(HOUR))
    const on = Array.from({ length: 24 }, (_, h) => musicHours.has(h))
    meter = <Meter on={on} elapsed={elapsed} count={on.filter(Boolean).length} word='hour' />
  } else if (span > 1 && span <= 31) {
    // A week or month: a day a segment, lit on the days with music.
    const elapsed = Math.min(span, sofar(DAY))
    const on = Array.from({ length: span }, (_, d) => musicDays.has(istDate.format(p.from + d * DAY + 12 * HOUR)))
    const lit = on.filter(Boolean).length
    // Fall back to the period's own count if the daily list is missing.
    meter = <Meter on={lit ? on : on.map((_, d) => d < t.activeDays)} elapsed={elapsed} count={lit || Math.min(t.activeDays, elapsed)} word='day' />
  } else if (span > 31) {
    const elapsed = Math.min(span, sofar(DAY))
    meter = <Meter elapsed={elapsed} count={Math.min(t.activeDays, elapsed)} word='day' />
  }
  return (
    <div className={`period ${p.allTime ? 'max-sm:col-span-2' : ''}`} data-key={p.key} data-tone={tone} data-all={p.allTime || undefined}>
      <span className='period-disc' aria-hidden />
      <p className='period-label'>{p.label}</p>
      <p className='num big text-[38px] sm:text-[44px] mt-5 whitespace-nowrap'>{count(t.plays)}</p>
      <p className='meta mt-1.5 whitespace-nowrap'>
        {t.plays === 1 ? 'play' : 'plays'} · <span className='num text-[14px] text-current'>{time}</span> {timeUnit}
      </p>
      {meter}
      <dl className='period-stats'>
        <Stat icon={Music2} n={t.tracks} word='track' />
        <Stat icon={MicVocal} n={t.artists} word='artist' />
        <Stat icon={Disc3} n={t.albums} word='album' />
      </dl>
    </div>
  )
}

/** Segments lit where there was music (`on`), dimmer past `elapsed`; a plain bar without `on`. */
function Meter({ on, elapsed, count: lit, word }) {
  return (
    <div className='mt-4 mb-4'>
      {on ? (
        <div className='period-meter' aria-hidden>
          {on.map((yes, i) => (
            <i key={i} data-on={yes || undefined} data-future={i >= elapsed || undefined} />
          ))}
        </div>
      ) : (
        <div className='period-meter bar' aria-hidden>
          <i style={{ width: `${(lit / elapsed) * 100}%` }} />
        </div>
      )}
      <p className='meta mt-2 text-[12px]'>
        <span className='num text-[13px] text-current'>{lit}</span> of {elapsed} {word}s with music
      </p>
    </div>
  )
}

/** A count with its icon; the word is for screen readers and on hover. */
function Stat({ icon: Icon, n, word }) {
  const label = `${count(n)} ${n === 1 ? word : `${word}s`}`
  return (
    <div title={label}>
      <dt className='sr-only'>{n === 1 ? word : `${word}s`}</dt>
      <Icon size={14} strokeWidth={2.25} aria-hidden />
      <dd className='num'>{count(n)}</dd>
    </div>
  )
}
