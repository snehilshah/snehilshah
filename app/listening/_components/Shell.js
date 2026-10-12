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
 * the name (back to the main site) and section tabs, and the content on the
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
        <nav className='flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 pb-2'>
          <a href='https://www.snehilshah.com' className='display text-[20px] whitespace-nowrap'>
            Snehil Shah <span className='font-normal text-m-on-surface-variant'>/ music</span>
          </a>
          <div className='tabs'>
            {NAV.map(([path, label]) => (
              <Link key={path} href={href(path)} aria-current={active === path ? 'page' : undefined}>
                {label}
              </Link>
            ))}
          </div>
        </nav>
        {children}
      </div>
    </div>
  )
}
