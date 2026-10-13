import Link from 'next/link'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { RANGES } from '../_lib/goonj'
import { withRange } from '../_lib/paths'
import { count, totalTime, unit } from '../_lib/format'

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
            className={`display whitespace-nowrap ${
              typeof f.value === 'string' && f.value.length > 8 ? 'text-[24px] sm:text-[28px] leading-[1.3]' : 'text-[30px] sm:text-[34px]'
            }`}
          >
            {f.value}
          </div>
          <div className='flex items-center gap-2 mt-1 min-w-0'>
            <span className='meta truncate'>{f.label}</span>
            {f.sub && <span className='text-[11px] text-m-on-surface-variant whitespace-nowrap'>{f.sub}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Totals for each calendar period (today, this week, this month, this
 * year, all time), whatever the page's range. periods: [{ key, label, totals }]
 */
export function Periods({ periods }) {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3'>
      {periods.map((p) => {
        const t = p.totals
        return (
          <div key={p.key} className={`rounded-[24px] bg-m-surface-container-high/80 p-4 min-w-0 ${p.allTime ? 'max-sm:col-span-2' : ''}`}>
            <p className='font-medium text-[15px]'>{p.label}</p>
            <p className='display text-[30px] sm:text-[34px] mt-3 whitespace-nowrap'>{count(t.plays)}</p>
            <p className='meta'>{t.plays === 1 ? 'play' : 'plays'}</p>
            <ul className='mt-3 pt-3 border-t border-m-outline-variant/60 space-y-1 text-[14px] text-m-on-surface-variant'>
              <li>
                <span className='font-medium text-m-on-surface'>{totalTime(t.listenedMs)}</span> listened
              </li>
              <Line n={t.tracks} word='track' />
              <Line n={t.artists} word='artist' />
              <Line n={t.albums} word='album' />
              {!p.allTime && p.key !== 'today' && <Line n={t.activeDays} word='day' after=' with music' />}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

function Line({ n, word, after = '' }) {
  const [num, ...rest] = unit(n, word).split(' ')
  return (
    <li>
      <span className='font-medium text-m-on-surface'>{num}</span> {rest.join(' ')}
      {after}
    </li>
  )
}
