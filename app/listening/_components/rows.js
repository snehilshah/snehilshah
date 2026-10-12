import Link from 'next/link'
import { Art } from './Art'
import { RankChange } from './bits'
import { imageUrl } from '../_lib/goonj'
import { albumHref, artistHref, trackHref } from '../_lib/paths'
import { plays } from '../_lib/format'

/** One track row everywhere: art · title · one meta line · one trailing figure. */
export function TrackRow({ item, rank, showChange = false, trailing, meta }) {
  return (
    <Link href={trackHref(item.key ?? item.trackKey)} className='row-link flex items-center gap-3 -mx-2 px-2 py-1.5 min-w-0'>
      {rank != null && (
        <div className='w-7 shrink-0 flex flex-col items-center'>
          <span className='name text-[15px] text-m-on-surface-variant'>{rank}</span>
          <RankChange rank={item.rank} prevRank={item.prevRank} show={showChange} />
        </div>
      )}
      <Art
        src={imageUrl('album', item.albumKey)}
        label={item.album || item.name || item.title}
        className='size-12 rounded-lg shrink-0'
      />
      <div className='min-w-0 flex-1'>
        <div className='name text-[15px] truncate'>{item.name ?? item.title}</div>
        <div className='meta truncate'>{meta ?? [item.artist, item.album].filter(Boolean).join(' · ')}</div>
      </div>
      <div className='meta shrink-0 text-right'>{trailing ?? plays(item.plays)}</div>
    </Link>
  )
}

/** Art-led tiles for artists (round) and albums. */
export function Tile({ item, kind, rank, showChange = false }) {
  const isArtist = kind === 'artists'
  return (
    <Link href={isArtist ? artistHref(item.key) : albumHref(item.key)} className='block min-w-0 group'>
      <div className='overflow-hidden rounded-2xl'>
        <Art
          src={isArtist ? imageUrl('artist', item.key) : imageUrl('album', item.albumKey || item.key)}
          label={item.name}
          className={`tile-art w-full aspect-square ${isArtist ? 'rounded-full' : 'rounded-2xl'}`}
          round={isArtist}
        />
      </div>
      <div className={`mt-2.5 min-w-0 ${isArtist ? 'text-center' : ''}`}>
        <div className={`flex items-center gap-1.5 min-w-0 ${isArtist ? 'justify-center' : ''}`}>
          {rank != null && <span className='name text-[14px] text-m-on-surface-variant'>{rank}</span>}
          <span className='name text-[15px] truncate'>{item.name}</span>
        </div>
        <div className={`flex items-center gap-1.5 ${isArtist ? 'justify-center' : ''}`}>
          <span className='meta truncate'>
            {!isArtist && item.artist ? `${item.artist} · ` : ''}
            {plays(item.plays)}
          </span>
          <RankChange rank={item.rank} prevRank={item.prevRank} show={showChange} />
        </div>
      </div>
    </Link>
  )
}

export function TileGrid({ items, kind, ranked = false, showChange = false, cols }) {
  return (
    <div className={`grid gap-x-4 gap-y-6 ${cols ?? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'}`}>
      {items.map((it, i) => (
        <Tile key={it.key} item={it} kind={kind} rank={ranked ? i + 1 : null} showChange={showChange} />
      ))}
    </div>
  )
}

/** A horizontal shelf of tiles that scrolls on narrow screens. */
export function Shelf({ items, kind }) {
  return (
    <div className='flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 snap-x'>
      {items.map((it) => (
        <div key={it.key} className='w-[136px] shrink-0 snap-start'>
          <Tile item={it} kind={kind} />
        </div>
      ))}
    </div>
  )
}
