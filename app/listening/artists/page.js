import { Shell } from '../_components/Shell'
import { RangeTabs } from '../_components/bits'
import { TileGrid } from '../_components/rows'
import { topList, imageBytes, rangeKey } from '../_lib/goonj'

export const metadata = { title: 'Artists' }

export default async function Artists({ searchParams }) {
  const range = rangeKey((await searchParams).range)
  const { items, range: r } = await topList('artists', range, 100)
  const art = await imageBytes('artist', items[0]?.key)
  return (
    <Shell art={art} active='/artists'>
      <h1 className='display text-[40px] mt-10'>Artists</h1>
      <div className='mt-4 mb-8'>
        <RangeTabs path='/artists' range={range} />
      </div>
      {items.length ? (
        <TileGrid items={items} kind='artists' ranked showChange={!r.allTime} cols='grid-cols-2 sm:grid-cols-4 lg:grid-cols-6' />
      ) : (
        <p className='meta text-[15px]'>Nothing played in this period.</p>
      )}
    </Shell>
  )
}
