import Link from 'next/link'
import { Shell } from '../_components/Shell'
import { Badge, PageHead } from '../_components/bits'
import { TrackRow } from '../_components/rows'
import { recent, imageBytes } from '../_lib/goonj'
import { date, time, listening } from '../_lib/format'
import { href } from '../_lib/paths'

const dayKey = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' })
const PAGE = 150

/** Every play, newest first, by day; before pages back from a startedAt. */
export async function HistoryPage({ before }) {
  const { items } = await recent(before, PAGE)
  const art = imageBytes('album', items[0]?.albumKey)
  const groups = []
  for (const r of items) {
    const k = dayKey.format(new Date(r.startedAt))
    if (groups.at(-1)?.key !== k) groups.push({ key: k, at: r.startedAt, items: [], ms: 0 })
    groups.at(-1).items.push(r)
    groups.at(-1).ms += r.listenedMs
  }
  return (
    <Shell art={art} active='/history'>
      <PageHead title='History' />
      {groups.map((g) => (
        <section key={g.key} className='mt-10'>
          <div className='flex items-baseline justify-between gap-4 mb-2 group-head'>
            <h2 className='h3'>{date(g.at)}</h2>
            <span className='meta'>{listening(g.ms)}</span>
          </div>
          <div className='mt-2'>
            {g.items.map((r) => (
              <TrackRow
                key={r.id}
                item={r}
                meta={r.artist}
                trailing={
                  <span className='flex flex-col items-end gap-0.5'>
                    {time(r.startedAt)}
                    {r.skipped && <Badge>skipped</Badge>}
                  </span>
                }
              />
            ))}
          </div>
        </section>
      ))}
      {items.length === PAGE && (
        <Link href={`${href('/history')}?before=${items.at(-1).startedAt}`} className='inline-block mt-10 font-medium text-m-primary'>
          Older
        </Link>
      )}
      {items.length === 0 && <p className='meta mt-8 text-[15px]'>Nothing yet.</p>}
    </Shell>
  )
}
