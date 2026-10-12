import Link from 'next/link'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { RANGES } from '../_lib/goonj'
import { withRange } from '../_lib/paths'

/** Title tabs: the current one in full ink, the rest quieter. No pill, no underline. */
export function RangeTabs({ path, range, extra = [] }) {
  const all = [...RANGES, ...extra]
  return (
    <div className='flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 py-1'>
      {all.map((r) => (
        <Link
          key={r.key}
          href={withRange(path, r.key)}
          scroll={false}
          className={`name text-[15px] shrink-0 transition-colors ${
            r.key === range ? 'text-m-on-surface' : 'text-m-on-surface-variant hover:text-m-on-surface'
          }`}
        >
          {r.label}
        </Link>
      ))}
    </div>
  )
}

/** A section: a label plus space. Hidden when empty. */
export function Section({ title, action, children, className = '' }) {
  return (
    <section className={`mt-12 ${className}`}>
      <div className='flex items-baseline justify-between gap-4 mb-4'>
        <h2 className='display text-[24px]'>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

export function More({ href, children = 'See all' }) {
  return (
    <Link href={href} className='meta hover:text-m-on-surface transition-colors shrink-0'>
      {children}
    </Link>
  )
}

/** Rank change against the previous period: ▲3, ▼2, new, or nothing. */
export function RankChange({ rank, prevRank, show = true }) {
  if (!show) return null
  if (!prevRank)
    return (
      <span className='text-[11px] font-medium rounded-full px-1.5 py-px bg-m-tertiary-container text-m-on-tertiary-container'>
        new
      </span>
    )
  const d = prevRank - rank
  if (d === 0) return null
  const Up = d > 0
  return (
    <span className={`inline-flex items-center text-[11px] ${Up ? 'text-m-primary' : 'text-m-on-surface-variant'}`}>
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
          <div className='display text-[28px] whitespace-nowrap'>{f.value}</div>
          <div className='flex items-center gap-2 mt-1.5 min-w-0'>
            <span className='meta truncate'>{f.label}</span>
            {f.sub && <span className='text-[11px] text-m-on-surface-variant whitespace-nowrap'>{f.sub}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
