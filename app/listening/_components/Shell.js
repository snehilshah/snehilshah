import { PLink as Link } from './PLink'
import { Suspense } from 'react'
import { themeCss, seedFrom, backdrop } from '../_lib/theme'
import { href } from '../_lib/paths'
import { ActiveTab } from './ActiveTab'

const NAV = [
  ['/', 'Overview'],
  ['/artists', 'Artists'],
  ['/albums', 'Albums'],
  ['/tracks', 'Tracks'],
  ['/history', 'History'],
  ['/player', 'Player']
]

/**
 * Every page: colours and backdrop from its art (bytes of a cover or photo),
 * the name (back to the main site), "music" (home here), the section tabs
 * centred, and the content on the
 * 16px edge. A page that changes its art as it goes (the player) draws its
 * own backdrop and colours instead (ownBackdrop).
 */
const fallbackTheme = themeCss(0xff6b5b95, '#goonj')

// Artwork is decoration: stream it independently of the navigation and data.
async function Artwork({ art }) {
  const bytes = await art
  const [seed, blur] = await Promise.all([seedFrom(bytes), backdrop(bytes)])
  return (
    <>
      <style>{themeCss(seed, '#goonj')}</style>
      {blur && <div className='art' style={{ backgroundImage: `url(${blur})` }} />}
    </>
  )
}

export function Shell({ art, active, ownBackdrop = false, children }) {
  return (
    <div className='goonj' id='goonj'>
      <style>{fallbackTheme}</style>
      <div className='goonj-backdrop'>
        {!ownBackdrop && (
          <Suspense fallback={null}>
            <Artwork art={art} />
          </Suspense>
        )}
        <div className='scrim' />
        <div className='grain' />
      </div>
      <div className='mx-auto max-w-[1120px] px-4 pb-24'>
        <nav className='grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center pt-6 pb-2'>
          <p className='display text-[20px] whitespace-nowrap sm:justify-self-start'>
            <a href='https://www.snehilshah.com' className='hover:underline'>
              Snehil Shah
            </a>{' '}
            <Link href={href('/')} className='font-normal text-m-on-surface-variant hover:text-m-on-surface'>
              / music
            </Link>
          </p>
          <div className='tabs'>
            {NAV.map(([path, label]) => (
              <Link key={path} href={href(path)} aria-current={active === path ? 'page' : undefined}>
                {label}
              </Link>
            ))}
          </div>
          <ActiveTab />
        </nav>
        {children}
        <footer className='mt-24 pt-6 border-t border-m-outline-variant/60 flex flex-wrap justify-between gap-x-6 gap-y-2 text-[14px] text-m-on-surface-variant'>
          <Link href={href('/docs')} className='font-medium hover:text-m-on-surface'>
            How it works
          </Link>
          <form action='/api/listening/access' method='post'>
            <input type='hidden' name='intent' value='lock' />
            <button type='submit' className='hover:text-m-on-surface cursor-pointer'>Lock music</button>
          </form>
          <a href='https://www.snehilshah.com' className='hover:text-m-on-surface'>
            snehilshah.com
          </a>
        </footer>
      </div>
    </div>
  )
}
