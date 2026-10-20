import './unlock.css'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { backdrop, seedFrom, themeCss } from '../_lib/theme'
import { BirthdayForm } from './BirthdayForm'

export const metadata = {
  title: 'Know me?',
  robots: { index: false, follow: false }
}

export default async function UnlockPage() {
  // Local decorative artwork only. No listening data is fetched before entry.
  const bytes = await readFile(
    path.join(process.cwd(), 'public/music/cover/1.jpg')
  )
  const [blur, seed] = await Promise.all([backdrop(bytes), seedFrom(bytes)])
  return (
    <div className='goonj music-gate' id='goonj'>
      <style>{themeCss(seed, '#goonj')}</style>
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
          <BirthdayForm />
        </section>
      </main>
    </div>
  )
}
