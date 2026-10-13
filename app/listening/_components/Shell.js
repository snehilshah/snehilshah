import Link from 'next/link'
import { themeCss, seedFrom, backdrop } from '../_lib/theme'
import { href } from '../_lib/paths'

const NAV = [
  ['/', 'Overview'],
  ['/artists', 'Artists'],
  ['/albums', 'Albums'],
  ['/tracks', 'Tracks'],
  ['/history', 'History']
]

/**
 * Every page: colours and backdrop from its art (bytes of a cover or photo),
 * the name (back to the main site), "music" (home here), the section tabs
 * centred, and the content on the
 * 16px edge.
 */
export async function Shell({ art, active, children }) {
  const seed = await seedFrom(art)
  const blur = await backdrop(art)
  return (
    <div className='goonj' id='goonj'>
      <style>{themeCss(seed, '#goonj')}</style>
      <div className='goonj-backdrop'>
        {blur && <div className='art' style={{ backgroundImage: `url(${blur})` }} />}
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
        </nav>
        {children}
        <footer className='mt-24 pt-6 border-t border-m-outline-variant/60 flex flex-wrap justify-between gap-x-6 gap-y-2 text-[14px] text-m-on-surface-variant'>
          <Link href={href('/docs')} className='font-medium hover:text-m-on-surface'>
            How it works
          </Link>
          <a href='https://www.snehilshah.com' className='hover:text-m-on-surface'>
            snehilshah.com
          </a>
        </footer>
      </div>
    </div>
  )
}
