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
 * the section nav, and the content on the 16px edge.
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
        <nav className='flex items-center gap-5 overflow-x-auto no-scrollbar pt-6 pb-2 -mx-4 px-4'>
          <Link href={href('/')} className='display text-[22px] mr-2 shrink-0'>
            Listening
          </Link>
          {NAV.map(([path, label]) => (
            <Link
              key={path}
              href={href(path)}
              className={`name text-[15px] shrink-0 transition-colors ${
                active === path ? 'text-m-on-surface' : 'text-m-on-surface-variant hover:text-m-on-surface'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  )
}
