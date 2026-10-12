import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Shell } from './Shell'
import { Art } from './Art'
import { Ago } from './Ago'
import { Figures, Group, Section, Badge } from './bits'
import { TrackRow, TileGrid } from './rows'
import { Bars, ListeningClock } from './charts'
import { entity, imageBytes, imageUrl, recent } from '../_lib/goonj'
import { count, date, duration, fullDate, hours, listening, monthYear, month, plays, time } from '../_lib/format'
import { albumHref, artistHref } from '../_lib/paths'

const ACTIVE = { artists: '/artists', albums: '/albums', tracks: '/tracks' }
const ord = (n) => `${count(n)}${n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'}`

export async function EntityPage({ kind, entityKey }) {
  const e = await entity(kind, entityKey)
  if (!e) notFound()
  const isArtist = kind === 'artists'
  const art = isArtist ? await imageBytes('artist', e.key) : await imageBytes('album', e.albumKey || e.key)
  const recentPlays = kind === 'tracks' ? (await recent(undefined, 12, e.key)).items : []
  const kindLabel = { artists: 'Artist', albums: 'Album', tracks: 'Track' }[kind]

  return (
    <Shell art={art} active={ACTIVE[kind]}>
      <header className='mt-12 flex flex-col sm:flex-row sm:items-end gap-6 rise'>
        <Art
          src={isArtist ? imageUrl('artist', e.key, 512) : imageUrl('album', e.albumKey || e.key, 512)}
          label={e.name}
          round={isArtist}
          className={`size-44 sm:size-52 shrink-0 shadow-2xl shadow-black/20 ${isArtist ? '' : 'rounded-[28px]'}`}
        />
        <div className='min-w-0'>
          <p className='meta'>
            {kindLabel}
            {e.rank ? ` · #${e.rank} all time` : ''}
          </p>
          <h1 className='h1 mt-1 break-words'>{e.name}</h1>
          <p className='meta mt-2 text-[14px] flex flex-wrap gap-x-1.5'>
            {e.artist &&
              (e.artistKey ? (
                <Link href={artistHref(e.artistKey)} className='hover:text-m-on-surface'>
                  {e.artist}
                </Link>
              ) : (
                <span>{e.artist}</span>
              ))}
            {kind === 'tracks' && e.album && (
              <>
                <span>·</span>
                <Link href={albumHref(e.albumKey)} className='hover:text-m-on-surface'>
                  {e.album}
                </Link>
              </>
            )}
            {e.year > 0 && <span>· {e.year}</span>}
            {e.durationMs > 0 && <span>· {duration(e.durationMs)}</span>}
            {e.genre && <span>· {e.genre}</span>}
          </p>
        </div>
      </header>

      <div className='mt-8 rise' style={{ animationDelay: '60ms' }}>
        <Figures
          items={[
            { label: 'plays', value: count(e.plays) },
            { label: 'hours', value: hours(e.listenedMs) },
            { label: 'first heard', value: e.firstPlayedAt ? date(e.firstPlayedAt) : '–' },
            { label: 'last heard', value: e.lastPlayedAt ? <Ago at={e.lastPlayedAt} /> : '–' },
            { label: 'skips', value: count(e.skips) },
            { label: 'all-time rank', value: e.rank ? `#${e.rank}` : '–' }
          ]}
        />
        {e.importedPlays > 0 && <p className='meta mt-2'>Includes {count(e.importedPlays)} plays from before per-play history</p>}
      </div>

      {(e.topTracks?.length > 0 || e.topAlbums?.length > 0) && (
        <Group title='Most played'>
          {e.topTracks?.length > 0 && (
            <Section title='Tracks'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8'>
                {e.topTracks.slice(0, 20).map((t, i) => (
                  <TrackRow key={t.key} item={t} rank={i + 1} meta={kind === 'albums' ? t.artist : t.album} />
                ))}
              </div>
            </Section>
          )}
          {e.topAlbums?.length > 0 && (
            <Section title='Albums'>
              <TileGrid items={e.topAlbums.map((a) => ({ ...a, artist: '' }))} kind='albums' />
            </Section>
          )}
        </Group>
      )}

      <Group title='Over time'>
        {e.months.length > 1 && (
          <Section title='Plays by month'>
            <Bars points={e.months} value={(p) => p.plays} format={plays} label={(p) => month(p.start)} height={120} />
            <p className='meta mt-2'>Since {monthYear(e.months[0].start)}</p>
          </Section>
        )}
        {e.plays - e.importedPlays > 0 && (
          <Section title='When I listen'>
            <ListeningClock clock={e.clock} />
          </Section>
        )}
        {e.milestones.length > 0 && (
          <Section title='Milestones'>
            <ol className='segmented grid-cols-1'>
              {e.milestones.map((m) => (
                <li key={m.n} className='flex items-center gap-3 px-4 py-3 min-w-0'>
                  <span className='display text-[20px] w-14 shrink-0'>{ord(m.n)}</span>
                  <span className='font-medium text-[15px] truncate flex-1'>{m.title}</span>
                  <span className='meta shrink-0'>{fullDate(m.at)}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}
        {recentPlays.length > 0 && (
          <Section title='Recent plays'>
            {recentPlays.map((r) => (
              <div key={r.id} className='flex items-center gap-3 py-2 min-w-0'>
                <span className='font-medium text-[15px] w-28 shrink-0'>{date(r.startedAt)}</span>
                <span className='meta'>{time(r.startedAt)}</span>
                <span className='meta ml-auto shrink-0'>{listening(r.listenedMs)}</span>
                {r.skipped && <Badge>skipped</Badge>}
              </div>
            ))}
          </Section>
        )}
      </Group>
    </Shell>
  )
}
