// Charts are plain SVG and CSS, drawn on the server (no chart library),
// like Geet's Canvas charts.
import { hourLabel, weekday, listening, count, isoDay, month } from '../_lib/format'

/** Hour × weekday listening clock. clock.ms[day][hour], 0 = Monday. */
export function ListeningClock({ clock }) {
  const max = Math.max(1, ...clock.ms.flat())
  const peak = clock.ms.flatMap((hours, d) => hours.map((ms, h) => ({ d, h, ms }))).sort((a, b) => b.ms - a.ms)[0]
  return (
    <div>
      <div className='overflow-x-auto no-scrollbar -mx-4 px-4'>
        <div className='grid gap-[3px] min-w-[560px]' style={{ gridTemplateColumns: '32px repeat(24, 1fr)' }}>
          <div />
          {Array.from({ length: 24 }, (_, h) => (
            <div key={h} className='text-[10px] text-m-on-surface-variant text-center whitespace-nowrap'>
              {h % 3 === 0 ? hourLabel(h) : ''}
            </div>
          ))}
          {clock.ms.map((hours, d) => [
            <div key={`l${d}`} className='text-[11px] text-m-on-surface-variant self-center'>
              {weekday(d)}
            </div>,
            ...hours.map((ms, h) => (
              <div
                key={`${d}-${h}`}
                title={`${weekday(d)} ${hourLabel(h)}: ${listening(ms)}`}
                className='aspect-square rounded-[4px]'
                style={{
                  background: ms
                    ? `color-mix(in oklab, var(--m-primary) ${Math.round(12 + 88 * Math.sqrt(ms / max))}%, var(--m-surface-container-high))`
                    : 'var(--m-surface-container-high)'
                }}
              />
            ))
          ])}
        </div>
      </div>
      {peak?.ms > 0 && (
        <p className='meta mt-3'>
          Busiest: {weekday(peak.d)} around {hourLabel(peak.h)}
        </p>
      )}
    </div>
  )
}

/** A year of days, GitHub style. days: [{date, plays, listenedMs}] over the last ~365 days. */
export function YearCalendar({ days, end = new Date() }) {
  const byDate = new Map(days.map((d) => [d.date, d]))
  const max = Math.max(1, ...days.map((d) => d.plays))
  // Start on the Monday 52 weeks back.
  const last = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()))
  const start = new Date(last)
  start.setUTCDate(start.getUTCDate() - 7 * 52 - ((last.getUTCDay() + 6) % 7))
  const weeks = []
  for (let d = new Date(start); d <= last; d.setUTCDate(d.getUTCDate() + 1)) {
    const iso = d.toISOString().slice(0, 10)
    const w = Math.floor((d - start) / (7 * 86400000))
    ;(weeks[w] ??= []).push({ iso, day: byDate.get(iso), first: d.getUTCDate() === 1 })
  }
  return (
    <div className='overflow-x-auto no-scrollbar -mx-4 px-4'>
      <div className='flex gap-[3px] min-w-[640px]'>
        {weeks.map((week, i) => (
          <div key={i} className='flex-1 min-w-0 flex flex-col gap-[3px]'>
            <div className='h-4 text-[10px] text-m-on-surface-variant whitespace-nowrap overflow-visible'>
              {week.find((c) => c.first) ? month(week.find((c) => c.first).iso) : ''}
            </div>
            {week.map((c) => (
              <div
                key={c.iso}
                title={`${isoDay(c.iso)}: ${c.day ? `${count(c.day.plays)} plays, ${listening(c.day.listenedMs)}` : 'nothing'}`}
                className='aspect-square rounded-[3px]'
                style={{
                  background: c.day?.plays
                    ? `color-mix(in oklab, var(--m-primary) ${Math.round(18 + 82 * Math.sqrt(c.day.plays / max))}%, var(--m-surface-container-high))`
                    : 'var(--m-surface-container-high)'
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Vertical bars over time. points: [{start, plays, listenedMs}] */
export function Bars({ points, label = (p) => month(p.start), value = (p) => p.listenedMs, format = listening, height = 140 }) {
  const max = Math.max(1, ...points.map(value))
  const best = points.reduce((a, p) => (value(p) > value(a ?? p) ? p : a), points[0])
  return (
    <div>
      <div className='flex items-end gap-[3px]' style={{ height }}>
        {points.map((p) => (
          <div key={p.start} className='flex-1 min-w-0 h-full flex flex-col justify-end' title={`${label(p)}: ${format(value(p))}`}>
            <div
              className='rounded-t-[6px] rounded-b-[2px]'
              style={{
                height: `${Math.max(2, (value(p) / max) * 100)}%`,
                background: p === best ? 'var(--m-primary)' : 'color-mix(in oklab, var(--m-primary) 45%, var(--m-surface-container-high))'
              }}
            />
          </div>
        ))}
      </div>
      <div className='flex gap-[3px] mt-1.5'>
        {points.map((p, i) => (
          <div key={p.start} className='flex-1 min-w-0 text-[10px] text-m-on-surface-variant text-center truncate'>
            {points.length <= 14 || i % Math.ceil(points.length / 12) === 0 ? label(p) : ''}
          </div>
        ))}
      </div>
    </div>
  )
}

/** One bar split into shares (devices, outputs), with a legend. items: [{key,name,listenedMs,plays}] */
export function Split({ items }) {
  const total = items.reduce((s, i) => s + i.listenedMs, 0) || 1
  const tones = ['var(--m-primary)', 'var(--m-tertiary)', 'var(--m-secondary)', 'var(--m-outline)', 'var(--m-outline-variant)']
  return (
    <div>
      <div className='flex h-3 gap-[2px] rounded-full overflow-hidden'>
        {items.map((it, i) => (
          <div key={it.key} style={{ width: `${(it.listenedMs / total) * 100}%`, background: tones[i % tones.length] }} />
        ))}
      </div>
      <div className='mt-3 grid gap-2 sm:grid-cols-2'>
        {items.map((it, i) => (
          <div key={it.key} className='flex items-center gap-2.5 min-w-0'>
            <span className='size-2.5 rounded-full shrink-0' style={{ background: tones[i % tones.length] }} />
            <span className='name text-[14px] truncate'>{it.name}</span>
            <span className='meta ml-auto shrink-0'>
              {listening(it.listenedMs)} · {Math.round((it.listenedMs / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
