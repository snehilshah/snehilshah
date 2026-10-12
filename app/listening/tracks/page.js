import { Shell } from '../_components/Shell'
import { RangeTabs } from '../_components/bits'
import { TrackRow } from '../_components/rows'
import { topList, imageBytes, rangeKey } from '../_lib/goonj'
import { listening, plays } from '../_lib/format'

export const metadata = { title: 'Tracks' }

export default async function Tracks({ searchParams }) {
  const range = rangeKey((await searchParams).range)
  const { items, range: r } = await topList('tracks', range, 200)
  const art = await imageBytes('album', items[0]?.albumKey)
  return (
    <Shell art={art} active='/tracks'>
      <h1 className='display text-[40px] mt-10'>Tracks</h1>
      <div className='mt-4 mb-6'>
        <RangeTabs path='/tracks' range={range} />
      </div>
      {items.length ? (
        <div className='grid lg:grid-cols-2 gap-x-8'>
          {items.map((it) => (
            <TrackRow
              key={it.key}
              item={it}
              rank={it.rank}
              showChange={!r.allTime}
              trailing={
                <span className='flex flex-col items-end'>
                  <span>{plays(it.plays)}</span>
                  <span className='text-[11px]'>{listening(it.listenedMs)}</span>
                </span>
              }
            />
          ))}
        </div>
      ) : (
        <p className='meta text-[15px]'>Nothing played in this period.</p>
      )}
    </Shell>
  )
}
