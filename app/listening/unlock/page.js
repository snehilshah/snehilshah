import './unlock.css'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { backdrop, seedFrom, themeCss } from '../_lib/theme'
import { BirthdayForm } from './BirthdayForm'

export const metadata = {
  title: 'Know me?',
  robots: { index: false, follow: false }
}

// Local decorative artwork only; no listening data is fetched before entry.
// Worked out once per server, as the page itself renders per request.
let art
function gateArt() {
  art ??= readFile(path.join(process.cwd(), 'public/music/cover/1.jpg'))
    .then(async bytes => {
      const [blur, seed] = await Promise.all([backdrop(bytes), seedFrom(bytes)])
      return { blur, css: themeCss(seed, '#goonj') }
    })
    .catch(error => {
      art = undefined
      throw error
    })
  return art
}

const first = value => (Array.isArray(value) ? value[0] : value)

export default async function UnlockPage({ searchParams }) {
  // Read on the server so the form is in the first paint, not swapped in after hydration.
  const [{ blur, css }, params] = await Promise.all([gateArt(), searchParams])
  return (
    <div className='goonj music-gate' id='goonj'>
      <style>{css}</style>
      <div className='goonj-backdrop gate-backdrop' aria-hidden='true'>
        <div className='art' style={{ backgroundImage: `url(${blur})` }} />
        <div className='gate-glow' />
        <div className='scrim' />
        <div className='grain' />
      </div>
      <header className='gate-header'>
        <a className='display' href='https://www.snehilshah.com'>
          Snehil Shah <span>/ music</span>
        </a>
      </header>
      <main className='gate-main'>
        <section className='gate-card' aria-labelledby='gate-title'>
          <h1 id='gate-title' className='display'>
            To know me, or not to know me?
          </h1>
          <BirthdayForm
            next={first(params.next) || ''}
            initialError={first(params.error) || null}
          />
        </section>
      </main>
    </div>
  )
}
