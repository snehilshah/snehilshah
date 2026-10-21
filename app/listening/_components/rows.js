import { Art } from './Art'
import { PLink } from './PLink'
import { RankChange } from './bits'
import { imageUrl } from '../_lib/goonj'
import { albumHref, artistHref, trackHref } from '../_lib/paths'
import { count } from '../_lib/format'

const medal = (rank) => (rank >= 1 && rank <= 3 ? rank : undefined)

/**
 * One track row everywhere: rank · art · title over one meta line · one
 * trailing figure. share (0–1): plays against the list's first, as a hairline.
 */
export function TrackRow({ item, rank, showChange = false, trailing, meta, share }) {
  return (
    <PLink href={trackHref(item.key ?? item.trackKey)} className='row-link flex items-center gap-4 -mx-2.5 px-2.5 py-2 min-w-0'>
      {rank != null && (
        <div className='w-9 shrink-0 flex flex-col items-center gap-1'>
          <span className='rank text-[24px]' data-medal={medal(rank)}>
            {rank}
          </span>
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
        {share > 0 && (
          <div className='row-share' data-medal={medal(rank)} aria-hidden>
            <i style={{ width: `${Math.min(1, share) * 100}%` }} />
          </div>
        )}
      </div>
      <div className='shrink-0 text-right text-[13px] text-m-on-surface-variant'>{trailing ?? <PlayCount n={item.plays} />}</div>
    </PLink>
  )
}

/** A play count: the figure, with a small "plays" (or `detail`) under it. */
export function PlayCount({ n, detail }) {
  return (
    <span className='flex flex-col items-end gap-1 min-w-11'>
      <span className='num text-[21px] text-m-on-surface'>{count(n)}</span>
      <span className='text-[10.5px] font-medium uppercase tracking-[0.08em] leading-none'>{n === 1 ? 'play' : 'plays'}</span>
      {detail && <span className='text-[11px] leading-none'>{detail}</span>}
    </span>
  )
}

/** Art-led tiles for artists (round) and albums. */
export function Tile({ item, kind, rank, showChange = false }) {
  const isArtist = kind === 'artists'
  return (
    <PLink href={isArtist ? artistHref(item.key) : albumHref(item.key)} className='block min-w-0 group'>
      <div className='relative'>
        <div className='overflow-hidden rounded-2xl'>
          <Art
            src={isArtist ? imageUrl('artist', item.key, 256) : imageUrl('album', item.albumKey || item.key, 256)}
            label={item.name}
            className={`tile-art w-full aspect-square ${isArtist ? 'rounded-full' : 'rounded-2xl'}`}
            round={isArtist}
          />
        </div>
        {rank != null && (
          <span className={`tile-rank ${isArtist ? 'round' : ''}`} data-medal={medal(rank)}>
            <span className='sr-only'>Number </span>
            {rank}
          </span>
        )}
      </div>
      <div className={`mt-3 min-w-0 ${isArtist ? 'text-center' : ''}`}>
        <div className='font-bold text-[15px] truncate'>{item.name}</div>
        <div className={`flex items-center gap-1.5 mt-0.5 ${isArtist ? 'justify-center' : ''}`}>
          <span className='meta truncate'>
            {!isArtist && item.artist ? `${item.artist} · ` : ''}
            <span className='num text-[13px] text-m-on-surface'>{count(item.plays)}</span> {item.plays === 1 ? 'play' : 'plays'}
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
