import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Shell } from '../_components/Shell'
import { Art } from '../_components/Art'
import { Ago } from '../_components/Ago'
import { Figures, Group, More, PageHead, Periods, RangeTabs, Section, Badge } from '../_components/bits'
import { TrackRow, TileGrid, Shelf } from '../_components/rows'
import { Bars, ListeningClock, Split, YearCalendar } from '../_components/charts'
import { NowPlaying } from '../_components/NowPlaying'
import { API, overview, days, series, rediscover, imageBytes, imageUrl, rangeTitle } from '../_lib/goonj'
import { count, delta, isoDay, listening, percent, plays, timeFigure, unit } from '../_lib/format'
import { artistHref, href, withRange } from '../_lib/paths'

export async function OverviewPage({ range }) {
  const [o, year, months, again] = await Promise.all([
    overview(range, 10),
    days('365d'),
    series(range === 'all' ? 'all' : '365d', 'month'),
    rediscover(12)
  ])
  if (!o) notFound()
  const t = o.totals
  const p = o.prevTotals
  const hero = o.topArtists[0]
  const art = (await imageBytes('artist', hero?.key)) ?? (await imageBytes('album', o.topTracks[0]?.albumKey))
  const empty = t.plays === 0
  const showChange = !o.range.allTime && p?.plays > 0

  return (
    <Shell art={art} active='/'>
      <div className='mt-8'>
        <NowPlaying api={API} last={o.recent[0]} />
      </div>

      {o.periods?.length > 0 && (
        <div className='mt-6 rise'>
          <Periods periods={o.periods} />
        </div>
      )}

      <PageHead title={rangeTitle(range)}>
        <RangeTabs path='/' range={range} />
      </PageHead>

      {empty ? (
        <p className='meta mt-8 text-[15px]'>Nothing played in this period.</p>
      ) : (
        <>
          <div className='mt-6 rise'>
            <Figures
              items={[
                { label: 'plays', value: count(t.plays), sub: delta(t.plays, p?.plays) },
                { ...timeFigure(t.listenedMs), sub: delta(t.listenedMs, p?.listenedMs) },
                { label: 'tracks', value: count(t.tracks), sub: delta(t.tracks, p?.tracks) },
                { label: 'artists', value: count(t.artists), sub: delta(t.artists, p?.artists) },
                { label: 'albums', value: count(t.albums), sub: delta(t.albums, p?.albums) },
                { label: 'days listening', value: count(t.activeDays) }
              ]}
            />
            {t.importedPlays > 0 && <p className='meta mt-2'>Includes {plays(t.importedPlays)} from before per-play history</p>}
          </div>

          {hero && (
            <Link
              href={artistHref(hero.key)}
              className='mt-3 flex items-center gap-5 p-4 rounded-[24px] bg-m-surface-container-high/80 rise'
              style={{ animationDelay: '60ms' }}
            >
              <Art src={imageUrl('artist', hero.key, 256)} label={hero.name} round className='size-20 sm:size-24 shrink-0' />
              <div className='min-w-0'>
                <p className='h2 truncate'>{hero.name}</p>
                <p className='meta text-[14px] truncate mt-1'>
                  Top artist · {plays(hero.plays)} · {listening(hero.listenedMs)}
                </p>
                {o.topTracks[0] && <p className='meta text-[14px] truncate'>Most played track: {o.topTracks[0].name}</p>}
              </div>
            </Link>
          )}

          <Group title='Most played'>
            <Section title='Tracks' action={<More href={withRange('/tracks', range)} />}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8'>
                {o.topTracks.map((it, i) => (
                  <TrackRow key={it.key} item={it} rank={i + 1} showChange={showChange} />
                ))}
              </div>
            </Section>
            <Section title='Artists' action={<More href={withRange('/artists', range)} />}>
              <TileGrid items={o.topArtists.slice(0, 10)} kind='artists' ranked showChange={showChange} />
            </Section>
            <Section title='Albums' action={<More href={withRange('/albums', range)} />}>
              <TileGrid items={o.topAlbums.slice(0, 10)} kind='albums' ranked showChange={showChange} />
            </Section>
            {o.topGenres.length > 0 && (
              <Section title='Genres'>
                <div className='flex flex-wrap gap-2'>
                  {o.topGenres.map((g, i) => (
                    <span
                      key={g.key}
                      className={`font-medium rounded-full px-4 py-2 text-[14px] ${
                        i === 0 ? 'bg-m-primary text-m-on-primary' : 'bg-m-secondary-container text-m-on-secondary-container'
                      }`}
                    >
                      {g.name} <span className='opacity-70 font-normal'>{percent(g.plays / t.plays)}</span>
                    </span>
                  ))}
                </div>
              </Section>
            )}
          </Group>
        </>
      )}

      <Group title='Habits'>
        {!empty && (
          <Section title='When I listen'>
            <ListeningClock clock={o.clock} />
          </Section>
        )}
        {year.days.length > 0 && (
          <Section title='The last year'>
            <YearCalendar days={year.days} />
          </Section>
        )}
        {months.points.length > 1 && (
          <Section title='Hours by month'>
            <Bars points={months.points.slice(-24)} />
          </Section>
        )}
        {!empty && (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-10'>
            {o.outputs.length > 0 && (
              <Section title='Heard through'>
                <Split items={o.outputs.slice(0, 6)} />
              </Section>
            )}
            <Section title='In numbers'>
              <Figures
                cols='grid-cols-2'
                items={[
                  { label: 'busiest day', value: o.busiestDay ? listening(o.busiestDay.listenedMs, 1) : '–', sub: o.busiestDay && isoDay(o.busiestDay.date) },
                  { label: 'a day, on average', value: listening(t.listenedMs / Math.max(t.activeDays, 1), 1) },
                  { label: 'current streak', value: unit(o.streaks.current, 'day') },
                  { label: 'longest streak', value: unit(o.streaks.longest, 'day'), sub: o.streaks.longestFrom && isoDay(o.streaks.longestFrom) },
                  { label: 'skipped', value: percent(o.rates.skipRate) },
                  { label: 'heard through', value: percent(o.rates.completion) }
                ]}
              />
            </Section>
          </div>
        )}
      </Group>

      <Group title='Lately'>
        {!empty && o.newArtists.length > 0 && (
          <Section title='New artists'>
            <Shelf items={o.newArtists} kind='artists' />
          </Section>
        )}
        {!empty && o.newTracks.length > 0 && (
          <Section title='New tracks'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8'>
              {o.newTracks.slice(0, 8).map((it) => (
                <TrackRow key={it.key} item={it} />
              ))}
            </div>
          </Section>
        )}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-10'>
          {again.onRepeat.length > 0 && (
            <Section title='On repeat'>
              {again.onRepeat.slice(0, 6).map((it) => (
                <TrackRow key={it.key} item={it} trailing={`${count(it.plays)} in 2 weeks`} />
              ))}
            </Section>
          )}
          {again.forgotten.length > 0 && (
            <Section title='Not lately'>
              {again.forgotten.slice(0, 6).map((it) => (
                <TrackRow key={it.key} item={it} />
              ))}
            </Section>
          )}
        </div>
        {o.recent.length > 0 && (
          <Section title='Recently played' action={<More href={href('/history')}>History</More>}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8'>
              {o.recent.map((r) => (
                <TrackRow
                  key={r.id}
                  item={r}
                  meta={r.artist}
                  trailing={
                    <span className='flex flex-col items-end gap-0.5'>
                      <Ago at={r.startedAt} />
                      {r.skipped && <Badge>skipped</Badge>}
                    </span>
                  }
                />
              ))}
            </div>
          </Section>
        )}
      </Group>
    </Shell>
  )
}

export function overviewTitle(range) {
  return { title: { absolute: range === '30d' ? 'Music · Snehil Shah' : `Music · ${rangeTitle(range)} · Snehil Shah` } }
}
