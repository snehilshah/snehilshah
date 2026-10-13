import { Shell } from '../_components/Shell'
import { Group, Section } from '../_components/bits'
import { href } from '../_lib/paths'

export const metadata = { title: 'How it works' }

// How plays are counted, what the numbers mean, and how a device joins.
// Keep in step with the rules in Goonj (internal/track, internal/stats),
// Geet's PlayTracker and goonj-mpd.

const SCENARIOS = [
  ['Skipped after 5 seconds', 'Not recorded', 'Under 10 seconds and never counted: flicking through the queue.'],
  ['Skipped after 30 seconds', 'Skip', 'Moved on before it counted. The 30 seconds still add to time listened.'],
  ['Skipped after 1 minute 10 seconds', 'Play', 'Past the count point (1 minute 3 seconds), so it counts. A counted play is never a skip.'],
  ['Played to the end', 'Play', ''],
  ['Paused halfway, finished an hour later', 'One play', 'Pausing keeps the same play open; only time with sound adds up.'],
  ['Seeked to 3:00 and let it finish', 'Time only', 'Heard 30 seconds, under the count point, and it ended on its own, so it is neither a play nor a skip.'],
  ['Seeked back and heard a part twice', 'Play', 'Time listened is time with sound, so hearing a part again adds to it.'],
  ['On repeat three times', 'Three plays', 'Each run from the top is a new play.'],
  ['A 15 second intro, played in full', 'Time only', 'Tracks under 20 seconds never count.'],
  ['The same song on the phone and a computer at once', 'Two plays', 'Every device’s play counts, with its own time.'],
  ['Played with no internet', 'Play, later', 'Kept on the device and sent when it is back online.']
]

const MEANINGS = [
  ['Plays', 'Counted plays. Skips and short listens are not plays.'],
  ['Time listened', 'All time with sound, skips included.'],
  ['Tracks, artists, albums', 'How many different ones had at least one counted play. Artists are the main credits, not featured ones.'],
  ['Days listening and streaks', 'Days with at least one counted play, by Indian time (a day starts at midnight in India).'],
  ['Today, this week, this month, this year', 'Calendar periods by Indian time; a week starts on Monday.'],
  ['7 days, 30 days, 90 days, year', 'Rolling: that many days up to today. Rank arrows compare with the same number of days before.'],
  ['All time', 'Includes play counts imported from before per-play history began. Their time is estimated as plays × track length, and they appear in no other period.'],
  ['Skipped', 'Skips ÷ (plays + skips).'],
  ['Heard through', 'On average, how much of each counted track was heard.'],
  ['New artists and new tracks', 'First ever counted play in the period, and not in the imported history.'],
  ['On repeat', 'At least 3 plays in the last 14 days.'],
  ['Not lately', 'At least 5 plays all time and none in the last 90 days.']
]

export default function Docs() {
  return (
    <Shell>
      <header className='mt-12'>
        <h1 className='h1'>How it works</h1>
        <p className='mt-3 text-[16px] text-m-on-surface-variant max-w-[640px]'>
          Every device I listen on reports to one place, Goonj, and this site reads from it. These are the rules it uses.
        </p>
      </header>

      <Group title='Plays and skips'>
        <Section title='The rules'>
          <ul className='space-y-3 text-[16px] leading-relaxed max-w-[720px]'>
            <Rule title='Time listened only grows while sound plays.'>Pauses, buffering and seeks add nothing.</Rule>
            <Rule title='A play counts at 30% of the track.'>
              It needs at least 20 seconds and never more than 4 minutes: a 3 minute 30 second song counts at 1 minute 3 seconds, a 20 minute
              mix at 4 minutes. Tracks under 20 seconds never count.
            </Rule>
            <Rule title='A skip is moving on before it counted.'>
              Next, previous, or picking another track. Once a play has counted it stays a play, however it ends. A track that ends on its own
              is never a skip.
            </Rule>
            <Rule title='Under 10 seconds is not recorded.'>A listen that short which never counted is flicking through, not a skip.</Rule>
            <Rule title='Same rules everywhere.'>The phone, the computers and the server all apply them, so a play means the same wherever it happened.</Rule>
          </ul>
        </Section>

        <Section title='Examples'>
          <p className='meta text-[14px] mb-3'>For a 3 minute 30 second song, which counts at 1 minute 3 seconds.</p>
          <ul className='segmented grid-cols-1'>
            {SCENARIOS.map(([what, result, why]) => (
              <li key={what} className='px-4 py-3 grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_140px_minmax(0,3fr)] gap-x-6 gap-y-1'>
                <span className='font-medium text-[15px]'>{what}</span>
                <span className='text-[15px] text-m-primary font-medium'>{result}</span>
                <span className='text-[14px] text-m-on-surface-variant'>{why}</span>
              </li>
            ))}
          </ul>
        </Section>
      </Group>

      <Group title='What the numbers mean'>
        <dl className='mt-8 segmented grid-cols-1'>
          {MEANINGS.map(([term, meaning]) => (
            <div key={term} className='px-4 py-3 grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,5fr)] gap-x-6 gap-y-1'>
              <dt className='font-medium text-[15px]'>{term}</dt>
              <dd className='text-[15px] text-m-on-surface-variant'>{meaning}</dd>
            </div>
          ))}
        </dl>
      </Group>

      <Group title='Now playing'>
        <ul className='mt-8 space-y-3 text-[16px] leading-relaxed max-w-[720px]'>
          <Rule title='Sent on change, not streamed.'>
            A device tells Goonj when the track, play or pause, or position changes, and this page hears about it at once. Nothing is sent
            while nothing changes; the progress bar moves in your browser.
          </Rule>
          <Rule title='One device at a time.'>
            A device that is playing always wins over one that is paused. If two are playing, the one that started first keeps the spot. If
            nothing is playing, the one paused most recently is shown.
          </Rule>
          <Rule title='It goes away on its own.'>
            A paused device drops off after 10 minutes, and a playing one 2 minutes after its track should have ended, in case the device went
            quiet. Then the card shows the last thing played.
          </Rule>
          <Rule title='Only the kind of device is shown.'>A phone or a computer, never its name.</Rule>
        </ul>
      </Group>

      <Group title='How fast it updates'>
        <ul className='mt-8 space-y-3 text-[16px] leading-relaxed max-w-[720px]'>
          <Rule title='Plays arrive as they end.'>
            The phone sends each play as it finishes; computers do the same. Offline, plays wait on the device and go up when it is back
            online (the phone also tries when Geet starts).
          </Rule>
          <Rule title='The site refreshes itself.'>New plays rebuild these pages within seconds. Nothing on any device checks on a timer.</Rule>
        </ul>
      </Group>

      <Group title='Adding a device'>
        <p className='mt-8 text-[16px] leading-relaxed max-w-[720px]'>
          There is nothing to set up on the server: a new device registers itself the first time it sends a play. Each one needs the write key,
          which is private and not on this page. It is in local.properties where Geet is built, and in the config of any computer already set up.
        </p>
        <Section title='A phone, with Geet'>
          <ol className='steps'>
            <li>
              Add <code>GOONJ_KEY=&lt;write key&gt;</code> to Geet’s <code>local.properties</code> (it is never committed). The server address
              defaults to <code>https://goonj.snehilshah.com</code>.
            </li>
            <li>
              Build and install the release: <code>./gradlew :app:assembleRelease</code>.
            </li>
            <li>
              Open Geet and play something. It makes its own device id, sends its earlier history once, and from then on every play and the
              now playing card.
            </li>
          </ol>
          <p className='meta text-[14px] mt-3'>A phone restored from a backup counts as a new device: the device id is never backed up.</p>
        </Section>
        <Section title='A computer, with MPD'>
          <ol className='steps'>
            <li>MPD needs to be running; any client works (rmpc, mpc).</li>
            <li>
              Get the Goonj code and run <code>make install-mpd KEY=&lt;write key&gt;</code>. It builds goonj-mpd with Go, or uses a{' '}
              <code>goonj-mpd</code> from the latest release placed in <code>deploy/</code>.
            </li>
            <li>
              That installs a user service (<code>systemctl --user status goonj-mpd</code>) that finds MPD by itself (or uses{' '}
              <code>MPD_HOST</code>), makes a device id and starts reporting. It also sends each album’s embedded cover once, without changing
              any file.
            </li>
          </ol>
        </Section>
        <Section title='Checking it worked'>
          <p className='text-[16px] leading-relaxed max-w-[720px]'>
            Play a song: the card at the top of the{' '}
            <a href={href('/')} className='text-m-primary font-medium hover:underline'>
              overview
            </a>{' '}
            shows it straight away, and once it ends it appears under Recently played.
          </p>
        </Section>
      </Group>
    </Shell>
  )
}

function Rule({ title, children }) {
  return (
    <li>
      <span className='font-medium'>{title}</span> <span className='text-m-on-surface-variant'>{children}</span>
    </li>
  )
}
