import { Art } from './Art'
import { PLink } from './PLink'
import { RankChange } from './bits'
import { imageUrl } from '../_lib/goonj'
import { albumHref, artistHref, trackHref } from '../_lib/paths'
import { count } from '../_lib/format'

/** One track row everywhere: rank · art · title over one meta line · one trailing figure. */
export function TrackRow({ item, rank, showChange = false, trailing, meta }) {
  return (
    <PLink href={trackHref(item.key ?? item.trackKey)} className='row-link flex items-center gap-4 -mx-2.5 px-2.5 py-2 min-w-0'>
      {rank != null && (
        <div className='w-8 shrink-0 flex flex-col items-center'>
          <span className='display text-[22px] text-m-on-surface-variant'>{rank}</span>
          <RankChange rank={item.rank} prevRank={item.prevRank} show={showChange} />
        </div>
      )}
      <Art
        src={imageUrl('album', item.albumKey, 128)}
        label={item.album || item.name || item.title}
        className='size-14 rounded-xl shrink-0 shadow-md shadow-black/15'
      />
      <div className='min-w-0 flex-1'>
        <div className='font-bold text-[16px] sm:text-[17px] leading-snug truncate'>{item.name ?? item.title}</div>
        <div className='text-[14px] text-m-on-surface-variant truncate'>{meta ?? [item.artist, item.album].filter(Boolean).join(' · ')}</div>
      </div>
      <div className='shrink-0 text-right text-[13px] text-m-on-surface-variant'>{trailing ?? <PlayCount n={item.plays} />}</div>
    </PLink>
  )
}

/** "16 plays" with the number set large. */
export function PlayCount({ n }) {
  return (
    <span className='flex items-baseline gap-1 justify-end'>
      <span className='display text-[20px] text-m-on-surface'>{count(n)}</span>
      {n === 1 ? 'play' : 'plays'}
    </span>
  )
}

/** Art-led tiles for artists (round) and albums. */
export function Tile({ item, kind, rank, showChange = false }) {
  const isArtist = kind === 'artists'
  return (
    <PLink href={isArtist ? artistHref(item.key) : albumHref(item.key)} className='block min-w-0 group'>
      <div className='overflow-hidden rounded-2xl'>
        <Art
          src={isArtist ? imageUrl('artist', item.key, 256) : imageUrl('album', item.albumKey || item.key, 256)}
          label={item.name}
          className={`tile-art w-full aspect-square ${isArtist ? 'rounded-full' : 'rounded-2xl'}`}
          round={isArtist}
        />
      </div>
      <div className={`mt-2.5 min-w-0 ${isArtist ? 'text-center' : ''}`}>
        <div className={`flex items-baseline gap-1.5 min-w-0 ${isArtist ? 'justify-center' : ''}`}>
          {rank != null && <span className='display text-[16px] text-m-on-surface-variant'>{rank}</span>}
          <span className='font-bold text-[15px] truncate'>{item.name}</span>
        </div>
        <div className={`flex items-center gap-1.5 ${isArtist ? 'justify-center' : ''}`}>
          <span className='meta truncate'>
            {!isArtist && item.artist ? `${item.artist} · ` : ''}
            {count(item.plays)} {item.plays === 1 ? 'play' : 'plays'}
          </span>
          <RankChange rank={item.rank} prevRank={item.prevRank} show={showChange} />
        </div>
      </div>
    </PLink>
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
