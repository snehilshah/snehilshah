import Link from 'next/link'
import { Shell } from './_components/Shell'
import { Art } from './_components/Art'
import { Figures, More, RangeTabs, Section, Badge } from './_components/bits'
import { TrackRow, TileGrid, Shelf } from './_components/rows'
import { Bars, ListeningClock, Split, YearCalendar } from './_components/charts'
import { overview, days, series, rediscover, imageBytes, imageUrl, rangeKey, RANGES } from './_lib/goonj'
import { ago, count, delta, hours, isoDay, listening, percent, plays } from './_lib/format'
import { artistHref, href, withRange } from './_lib/paths'

export default async function Overview({ searchParams }) {
  const range = rangeKey((await searchParams).range)
  const [o, year, months, again] = await Promise.all([
    overview(range, 10),
    days('365d'),
    series(range === 'all' ? 'all' : '365d', 'month'),
    rediscover(12)
  ])
  const t = o.totals
  const p = o.prevTotals
  const hero = o.topArtists[0]
  const art = (await imageBytes('artist', hero?.key)) ?? (await imageBytes('album', o.topTracks[0]?.albumKey))
  const label = RANGES.find((r) => r.key === range)?.label ?? o.range.label
  const empty = t.plays === 0

  return (
    <Shell art={art} active='/'>
      <header className='mt-10 flex flex-col sm:flex-row sm:items-end gap-6 rise'>
        {hero && (
          <Link href={artistHref(hero.key)} className='shrink-0'>
            <Art src={imageUrl('artist', hero.key)} label={hero.name} round className='size-36 sm:size-44 shadow-2xl shadow-black/20' />
          </Link>
        )}
        <div className='min-w-0'>
          <p className='meta'>{hero ? `Top artist · ${label.toLowerCase() === 'all time' ? 'all time' : label.toLowerCase()}` : label}</p>
          <h1 className='display text-[44px] sm:text-[64px] mt-1 break-words'>
            {hero ? <Link href={artistHref(hero.key)}>{hero.name}</Link> : 'Listening'}
          </h1>
          {hero && (
            <p className='meta mt-2 text-[14px]'>
              {plays(hero.plays)} · {listening(hero.listenedMs)}
              {o.topTracks[0] && <> · most played: {o.topTracks[0].name}</>}
            </p>
          )}
        </div>
      </header>

      <div className='mt-8'>
        <RangeTabs path='/' range={range} />
      </div>

      {empty ? (
        <p className='meta mt-10 text-[15px]'>Nothing played in this period.</p>
      ) : (
        <>
          <div className='mt-5 rise' style={{ animationDelay: '60ms' }}>
            <Figures
              items={[
                { label: 'plays', value: count(t.plays), sub: delta(t.plays, p?.plays) },
                { label: 'hours', value: hours(t.listenedMs), sub: delta(t.listenedMs, p?.listenedMs) },
                { label: 'tracks', value: count(t.tracks), sub: delta(t.tracks, p?.tracks) },
                { label: 'artists', value: count(t.artists), sub: delta(t.artists, p?.artists) },
                { label: 'days listening', value: count(t.activeDays) },
                { label: o.streaks.current ? 'day streak' : 'longest streak', value: count(o.streaks.current || o.streaks.longest) }
              ]}
            />
            {t.importedPlays > 0 && <p className='meta mt-2'>Includes {count(t.importedPlays)} plays from before per-play history</p>}
          </div>

          <Section title='Top tracks' action={<More href={withRange('/tracks', range)} />}>
            <div className='grid md:grid-cols-2 gap-x-8'>
              {o.topTracks.map((it, i) => (
                <TrackRow key={it.key} item={it} rank={i + 1} showChange={!o.range.allTime} />
              ))}
            </div>
          </Section>

          <Section title='Top artists' action={<More href={withRange('/artists', range)} />}>
            <TileGrid items={o.topArtists.slice(0, 10)} kind='artists' ranked showChange={!o.range.allTime} />
          </Section>

          <Section title='Top albums' action={<More href={withRange('/albums', range)} />}>
            <TileGrid items={o.topAlbums.slice(0, 10)} kind='albums' ranked showChange={!o.range.allTime} />
          </Section>

          {o.topGenres.length > 0 && (
            <Section title='Genres'>
              <div className='flex flex-wrap gap-2'>
                {o.topGenres.map((g, i) => (
                  <span
                    key={g.key}
                    className={`name rounded-full px-4 py-2 text-[14px] ${
                      i === 0 ? 'bg-m-primary text-m-on-primary' : 'bg-m-secondary-container text-m-on-secondary-container'
                    }`}
                  >
                    {g.name} <span className='opacity-70 font-normal'>{percent(g.plays / t.plays)}</span>
                  </span>
                ))}
              </div>
            </Section>
          )}

          <Section title='When I listen'>
            <ListeningClock clock={o.clock} />
          </Section>
        </>
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
        <>
          {(o.newArtists.length > 0 || o.newTracks.length > 0) && (
            <Section title='New to me'>
              {o.newArtists.length > 0 && <Shelf items={o.newArtists} kind='artists' />}
              {o.newTracks.length > 0 && (
                <div className='grid md:grid-cols-2 gap-x-8 mt-6'>
                  {o.newTracks.slice(0, 8).map((it) => (
                    <TrackRow key={it.key} item={it} />
                  ))}
                </div>
              )}
            </Section>
          )}

          <div className='grid lg:grid-cols-2 gap-x-10'>
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
                  <TrackRow key={it.key} item={it} trailing={plays(it.plays)} />
                ))}
              </Section>
            )}
          </div>

          <div className='grid lg:grid-cols-2 gap-x-10'>
            {o.devices.length > 0 && (
              <Section title='Devices'>
                <Split items={o.devices} />
              </Section>
            )}
            {o.outputs.length > 0 && (
              <Section title='Heard through'>
                <Split items={o.outputs.slice(0, 6)} />
              </Section>
            )}
          </div>

          <Section title='Habits'>
            <Figures
              cols='grid-cols-2 lg:grid-cols-4'
              items={[
                { label: 'busiest day', value: o.busiestDay ? listening(o.busiestDay.listenedMs) : '–', sub: o.busiestDay && isoDay(o.busiestDay.date) },
                { label: 'longest streak', value: `${count(o.streaks.longest)}d`, sub: o.streaks.longestFrom && isoDay(o.streaks.longestFrom) },
                { label: 'skipped', value: percent(o.rates.skipRate) },
                { label: 'heard through', value: percent(o.rates.completion) }
              ]}
            />
          </Section>
        </>
      )}

      {o.recent.length > 0 && (
        <Section title='Recently played' action={<More href={href('/history')} />}>
          <div className='grid md:grid-cols-2 gap-x-8'>
            {o.recent.map((r) => (
              <TrackRow
                key={r.id}
                item={r}
                meta={`${r.artist} · ${r.device}`}
                trailing={
                  <span className='flex flex-col items-end gap-0.5'>
                    {ago(r.startedAt)}
                    {r.skipped && <Badge>skipped</Badge>}
                  </span>
                }
              />
            ))}
          </div>
        </Section>
      )}
    </Shell>
  )
}

export async function generateMetadata({ searchParams }) {
  const range = rangeKey((await searchParams).range)
  const label = RANGES.find((r) => r.key === range)?.label ?? range
  return { title: { absolute: range === '30d' ? 'Listening · Snehil Shah' : `Listening · ${label} · Snehil Shah` } }
}
