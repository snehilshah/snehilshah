import { notFound } from 'next/navigation'
import { Shell } from '../_components/Shell'
import { PageHead, RangeTabs } from '../_components/bits'
import { PlayCount, TileGrid, TrackRow } from '../_components/rows'
import { RANGES, topList, imageBytes, rangeKey, rangeTitle } from '../_lib/goonj'
import { listening } from '../_lib/format'
import { DEFAULT_RANGE } from '../_lib/paths'

const TITLES = { artists: 'Artists', albums: 'Albums', tracks: 'Tracks' }

/** Artists, albums or tracks ranked over a range. */
export async function TopPage({ kind, range }) {
  if (rangeKey(range, null) !== range) notFound()
  const { items, range: r } = await topList(kind, range, kind === 'tracks' ? 200 : 100)
  const art =
    kind === 'artists' ? await imageBytes('artist', items[0]?.key) : await imageBytes('album', items[0]?.albumKey)
  const showChange = !r.allTime
  return (
    <Shell art={art} active={`/${kind}`}>
      <PageHead title={TITLES[kind]}>
        <RangeTabs path={`/${kind}`} range={range} />
      </PageHead>
      <div className='mt-8'>
        {!items.length ? (
          <p className='meta text-[15px]'>Nothing played in this period.</p>
        ) : kind === 'tracks' ? (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8'>
            {items.map((it) => (
              <TrackRow
                key={it.key}
                item={it}
                rank={it.rank}
                showChange={showChange}
                trailing={
                  <span className='flex flex-col items-end'>
                    <PlayCount n={it.plays} />
                    <span className='text-[11px]'>{listening(it.listenedMs, 1)}</span>
                  </span>
                }
              />
            ))}
          </div>
        ) : (
          <TileGrid items={items} kind={kind} ranked showChange={showChange} cols='grid-cols-2 sm:grid-cols-4 lg:grid-cols-6' />
        )}
      </div>
    </Shell>
  )
}

export const topStaticParams = () => RANGES.filter((r) => r.key !== DEFAULT_RANGE).map((r) => ({ range: r.key }))

export const topTitle = (kind, range) => ({ title: range === DEFAULT_RANGE ? TITLES[kind] : `${TITLES[kind]} · ${rangeTitle(range)}` })
