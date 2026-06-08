import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function BlogTopbar() {
  return (
    <div className='bp-topbar'>
      <Link href='/blogs' className='bp-topbar__brand' title='All posts'>
        <img src='/Logo2Straight.svg' alt='Snehil Shah' />
      </Link>
      <a
        className='bp-topbar__cta'
        href='https://www.snehilshah.com'
        target='_blank'
        rel='noopener noreferrer'
      >
        Portfolio <ArrowUpRight />
      </a>
    </div>
  )
}
