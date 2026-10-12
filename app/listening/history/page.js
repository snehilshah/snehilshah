import Link from 'next/link'
import { Shell } from '../_components/Shell'
import { Badge } from '../_components/bits'
import { TrackRow } from '../_components/rows'
import { recent, imageBytes } from '../_lib/goonj'
import { date, time, listening } from '../_lib/format'
import { href } from '../_lib/paths'

export const metadata = { title: 'History' }

const dayKey = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' })

export default async function History({ searchParams }) {
  const before = Number((await searchParams).before) || undefined
  const { items } = await recent(before, 150)
  const art = await imageBytes('album', items[0]?.albumKey)
  const groups = []
  for (const r of items) {
    const k = dayKey.format(new Date(r.startedAt))
    if (groups.at(-1)?.key !== k) groups.push({ key: k, at: r.startedAt, items: [], ms: 0 })
    groups.at(-1).items.push(r)
    groups.at(-1).ms += r.listenedMs
  }
  return (
    <Shell art={art} active='/history'>
      <h1 className='display text-[40px] mt-10'>History</h1>
      {groups.map((g) => (
        <section key={g.key} className='mt-10'>
          <div className='flex items-baseline justify-between mb-3'>
            <h2 className='display text-[20px]'>{date(g.at)}</h2>
            <span className='meta'>{listening(g.ms)}</span>
          </div>
          {g.items.map((r) => (
            <TrackRow
              key={r.id}
              item={r}
              meta={`${r.artist} · ${r.device}${r.output && r.output !== 'mpd' ? ` · ${r.output}` : ''}`}
              trailing={
                <span className='flex flex-col items-end gap-0.5'>
                  {time(r.startedAt)}
                  {r.skipped && <Badge>skipped</Badge>}
                </span>
              }
            />
          ))}
        </section>
      ))}
      {items.length === 150 && (
        <Link href={`${href('/history')}?before=${items.at(-1).startedAt}`} className='name inline-block mt-10 text-m-primary'>
          Older
        </Link>
      )}
      {items.length === 0 && <p className='meta mt-8 text-[15px]'>Nothing yet.</p>}
    </Shell>
  )
}
