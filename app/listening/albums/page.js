import { Shell } from '../_components/Shell'
import { RangeTabs } from '../_components/bits'
import { TileGrid } from '../_components/rows'
import { topList, imageBytes, rangeKey } from '../_lib/goonj'

export const metadata = { title: 'Albums' }

export default async function Albums({ searchParams }) {
  const range = rangeKey((await searchParams).range)
  const { items, range: r } = await topList('albums', range, 100)
  const art = await imageBytes('album', items[0]?.albumKey)
  return (
    <Shell art={art} active='/albums'>
      <h1 className='display text-[40px] mt-10'>Albums</h1>
      <div className='mt-4 mb-8'>
        <RangeTabs path='/albums' range={range} />
      </div>
      {items.length ? (
        <TileGrid items={items} kind='albums' ranked showChange={!r.allTime} cols='grid-cols-2 sm:grid-cols-4 lg:grid-cols-6' />
      ) : (
        <p className='meta text-[15px]'>Nothing played in this period.</p>
      )}
    </Shell>
  )
}
