import Link from 'next/link'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { RANGES } from '../_lib/goonj'
import { withRange } from '../_lib/paths'

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
export function PageHead({ title, eyebrow, children }) {
  return (
    <header className='mt-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-4'>
      <div className='min-w-0'>
        {eyebrow && <p className='meta mb-1'>{eyebrow}</p>}
        <h1 className='h1 break-words'>{title}</h1>
      </div>
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
          <div className='display text-[30px] sm:text-[34px] whitespace-nowrap'>{f.value}</div>
          <div className='flex items-center gap-2 mt-1 min-w-0'>
            <span className='meta truncate'>{f.label}</span>
            {f.sub && <span className='text-[11px] text-m-on-surface-variant whitespace-nowrap'>{f.sub}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
